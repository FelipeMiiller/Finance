
import { api } from "../services/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { userFaunaDBType } from "../types/faunadb";
import { useRouter } from "next/router";

export const AuthContext = createContext({});



interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = (props: AuthProviderProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const signed = !!session?.user;
  const [user, setUser] = useState<UserTypes>();
  let expires:(undefined | Date | null)= null;


  useEffect(() => {
    setUser(localStorage.getItem("user_bd") ? JSON.parse(localStorage.getItem("user_bd") || ""): null);
    
  }, []);





   function authRedirect() {
    console.log(session);
    expires= new Date(session?.expires);

    if (signed && status === "authenticated") {

      await api.post('api/user',{
        session.user.email
      })
      .then((response) =>{
        let resp = response?.data;
        sessionStorage.setItem("user_bd", JSON.stringify(resp));
        setUser(resp)
      })
      .catch(function (error) {
        console.log(error);
      });



      router.push("/finance/dashboard");

    }






  }





  const signout = () => {
    setUser(undefined);
    signOut();
    localStorage.removeItem("user_bd");
  };

  return (
    <AuthContext.Provider
      value={{
        signed,
        user,
        authRedirect,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};;




export default function useAuth()  {
  const context = useContext(AuthContext);

  return context;
};




export type UseAuthType = {
  user: userFaunaDBType;
  signed:boolean;
  authRedirect: () => Promise<void>;
  signout: () => void;
  getBusiness: () => Promise<void>;
  userBusiness:userBusinessType;


};


export interface UserTypes {
  email: string;
  expiraEm: Date;
  id: string;
  nome: string;
  tipoDeAcesso: string;
  token: string;
  negocioId: string;
  contadorId: string;
  permissoes: {
    empresa: string;
    empresaId: string;
    id: string;
    permissao: string;
    sistema: string;
    sistemaId: string;
    usuario: string;
    usuarioId: string;
  }[];
}

export interface userBusinessType {
  empresas: any;
  id: string;
  idDoContador: string;
  nome: string;
  proprietario: string;
  contatoProprietario: string;

  usuarios: {
    id: string;
    idDoNegocio: string;
    nome: string;
    email: string;
    tipoDeAcesso: string;
    permissoes: {
      id: string;
      empresaId: string;
      empresa: string;
      usuarioId: string;
      usuario: string;
      sistemaId: string;
      sistema: string;
      permissao: string;
    }[];

    empresas:{
      id: string;
      razaoSocial: string;
      nomeFantasia: string;
      cnpj: string;
      idDoEndereco: string;
      idDoNegocio: string;
    }[];
    sistemas: {
      id: string;
      nome: string;
    }[];
  }[];
}
