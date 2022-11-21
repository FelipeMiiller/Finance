
import { api } from "../services/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import {signIn, signOut as sigOutAuth, useSession } from "next-auth/react"
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
  const isAuthorization = !!session?.user && status=="authenticated";
  const isPermissions = !!user?.permissoes;
  let expires =session?.expires;

  //console.log(status)
 // console.log(isAuthorization)


  useEffect(() => {
    setUser(localStorage.getItem("user_bd") ? JSON.parse(localStorage.getItem("user_bd") || ""): null);

  }, []);


  
   useEffect( () => {
   fetchFaunaData()


  }, [session,status]);




 const fetchFaunaData = async() =>{
  
 

    if( isAuthorization && !isPermissions ) 
    {

      await api.post('api/user/login')
      .then((response) =>{
        let resp = response?.data;
        console.log(response?.data)
        sessionStorage.setItem("user_bd", JSON.stringify(resp));
        setUser(resp)
      })
      .catch(function (error) {
        console.log(error);
      });




    }





 }





  const signOut = () => {
    setUser(undefined);
    sigOutAuth();
    localStorage.removeItem("user_bd");
  };

  return (
    <AuthContext.Provider
      value={{
        expires,
        signed,
        user,
        session,
        signOut,
        status,
        isAuthorization
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};




export default function useAuth()  {
  const context = useContext(AuthContext);

  return context;
};




export type UseAuthType = {
  session:any;
  expires:string | undefined
  user: userFaunaDBType;
  signed:boolean;
  isAuthorization:boolean;
  //getSession: (session:any) => Promise<void>;
  signOut: () => void;
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
