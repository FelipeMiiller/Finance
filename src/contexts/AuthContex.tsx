
import { api } from "../services/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import {signIn, signOut as sigOutAuth, useSession } from "next-auth/react"
import { userFaunaDBType } from "../types/faunadb";
import { useRouter } from "next/router";
import { UserDataFull } from "../types";
import { convertToObject } from "typescript";

export const AuthContext = createContext({});



interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = (props: AuthProviderProps) => {
 
  const { data: session, status } = useSession();
  const signed = !!session?.user;
  const [user, setUser] = useState<UserDataFull>();
  const [company, setCompany] = useState();
  const isAuthorization = !!session?.user && status=="authenticated";
  const isPermissions = !!user?.permissions;
  let expires =session?.expires;

 

  useEffect(() => {
    setUser(
      localStorage.getItem("user_bd") ?? JSON.parse(localStorage.getItem("user_bd"))
        
    );
  }, []);

  useEffect(() => {
    if (!isPermissions) {
      fetchFaunaData();
    }

    if (!company && isPermissions) {
      setCompany(user?.companies[0].id);
    }
  }, [user, status]);


 const fetchFaunaData = async() =>{
  console.log(isPermissions)
      await api.post('api/user/login')
      .then((response) =>{
        let resp = response?.data;
        sessionStorage.setItem("user_bd", JSON.stringify(resp));
        setUser(resp)
      })
      .catch(function (error) {
        console.log(error);
      });
 }



  const signOut = () => {
    setUser(undefined);
    sigOutAuth();
    localStorage.removeItem("user_bd");
  };

  return (
    <AuthContext.Provider
      value={{
        setCompany,
        company,
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
  company: string,
  setCompany: (company: string) => void,
  session:any;
  expires:string | undefined
  user: UserDataFull;
  signed:boolean;
  isAuthorization:boolean;
  signOut: () => void;
  status: "authenticated" | "loading" | "unauthenticated"
};

