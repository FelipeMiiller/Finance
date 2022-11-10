
import React, { createContext, useEffect, useState } from "react";
import apiEasyTax from "../services/apiEasyTax.js";
import apiWmsAuth from "../services/apiAuth.js";
import { reporPermissions } from "../services/repositorio/reporUsers.js";

export const AuthContextEasy = createContext({});

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

interface AuthProviderEasyProps {
  children: React.ReactNode; // 👈️ added type for children
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


export const AuthProviderEasy = (props: AuthProviderEasyProps) => {
  const [user, setUser] = useState<UserTypes>();
  const [userBusiness, setUserBusiness] = useState<userBusinessType>();

  useEffect(() => {
    const usersStorage = localStorage.getItem("users_bd") ? JSON.parse(localStorage.getItem("users_bd") || "") : "Não encontrado !";
    setUser(usersStorage);

    const userBusiness = sessionStorage.getItem("userBusiness_bd")? JSON.parse(sessionStorage.getItem("userBusiness_bd") || "") : "Não encontrado !"; 
    setUserBusiness(userBusiness);


  }, []);




  const signin = async (data: { email: string; password: string }) => {
    let resp: any;

    await apiWmsAuth
      .post(`auth/login`, data)
      .then((response) => {
        resp = response?.data?.result;
        localStorage.setItem("users_bd", JSON.stringify(resp));
        setUser(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBusiness = async () => {
    await apiWmsAuth
      .get(`business/${user?.negocioId}`, {
        headers: {
          Authorization: ` bearer ${user?.token}`,
        },
      })
      .then((response) => {
        let resp = response?.data;
        sessionStorage.setItem("userBusiness_bd", JSON.stringify(resp));
        setUserBusiness(resp);
      })
      .catch((error) => {
        console.log(error);
       
      });
  };

  const signout = () => {
    setUser(undefined);
    localStorage.removeItem("users_bd");
  };




  return (
    <AuthContextEasy.Provider
      value={{
        user,
        signed: !!user,
        signin,
        signout,
        getBusiness,
        userBusiness,
      }}
    >
      {props.children}
    </AuthContextEasy.Provider>
  );
};
