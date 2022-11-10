import Head from "next/head";
import { UserList } from "../dashboard/UserList";
import Pagination from "./pagination";
import { HeaderDashboard } from "../Headers/Dashboard";
import { SideBar } from "../SideBar";

import { useForm } from "react-hook-form";
import { useState } from "react";



export default function ModalCompanyRegister({ onClose = () => { }}) {
  const [isIsCnpjVisible, setIsCnpjVisible] = useState(false);
  const {register,reset,handleSubmit,formState: { errors }} = useForm();

  function onSubmit(userData) 
  {
    console.log(userData);
  }
  
  const onError = (errors, e) => console.log(errors, e);





  
  return (
    <>
    
        <div className="z-10 p-4 ml-2 bg-gray-800 rounded-lg w-96">
          <form onSubmit={handleSubmit(onSubmit, onError)} className="grid grid-cols-2 gap-1">
            <div className="relative w-full mb-3 ">
              <label
                className="block mb-2 text-xs font-bold text-white uppercase"
                htmlFor="grid-password"
              >
                Empresa
              </label>
              <input
                type="text"
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-gray-700 border-0 rounded shadow placeholder-blueGray-300 text-slate-900 focus:outline-none focus:ring"
                placeholder="Nome"
                {...register("name", { required: true })}
              />
            </div>
            <div className="relative w-full mb-3 ">
              <label
                className="block mb-2 text-xs font-bold text-white uppercase"
                htmlFor="grid-password"
              >
                CNPJ
              </label>
              <input
                type="text"
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-gray-700 border-0 rounded shadow placeholder-blueGray-300 text-slate-900 focus:outline-none focus:ring"
                placeholder="Nome"
                {...register("name", { required: true })}
              />
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-xs font-bold text-white uppercase"
                htmlFor="grid-password"
              >
                Email
              </label>
              <input
                type="text"
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-gray-700 border-0 rounded shadow placeholder-blueGray-300 text-slate-900 focus:outline-none focus:ring"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>

          

            <div>
              <label className="flex flex-col w-full mt-4 cursor-point">
                <span className="ml-2 text-sm font-semibold text-slate-900">
                  <span className="text-lightBlue-500">
                    <p> {} mensagem de erro</p>
                    
                  </span>
                </span>



                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-gray-600 rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none "
                >
                  Salvar
                </button>
              </label>
            </div>

           
          </form>
        </div>
      
    </>
  );
}
