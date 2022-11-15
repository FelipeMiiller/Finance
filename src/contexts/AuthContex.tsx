
import { api } from "../services/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import {signIn, signOut, useSession } from "next-auth/react"
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
  const isUser = !user;
  let expires:(undefined | Date | null)= null;


  useEffect(() => {
    setUser(localStorage.getItem("user_bd") ? JSON.parse(localStorage.getItem("user_bd") || ""): null);



    
  }, []);







  
  useEffect(() => {
  
   if(!isUser && status==="authenticated" ) 
   {
    await api.post('api/authuser')
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
    
  }, [signed,status]);



 

   async function getSession(session) {
    
    console.log(session)

    if (signed && status === "authenticated") {

      
    

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
        getSession,
        signout,
        status
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
  getSession: (session:any) => Promise<void>;
  signout: () => void;
  getBusiness: () => Promise<void>;
  userBusiness:userBusinessType;
  status: "authenticated" | "loading" | "unauthenticated"

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
