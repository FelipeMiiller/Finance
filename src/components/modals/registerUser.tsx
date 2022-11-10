import Head from "next/head";
import { UserList } from "../dashboard/UserList";
import Pagination from "../Form/pagination";
import { HeaderDashboard } from "../Headers/Dashboard";
import { SideBar } from "../SideBar";

import { useForm } from "react-hook-form";
import { useState } from "react";

export const reporPermissionsCreate = [
  {
    Value: 0,
    Label: "Leitor",
  },
  {
    Value: 2,
    Label: "Editor",
  },
];

export default function ModalUserRegister({ onClose = () => { }}) {
  const [isIsCnpjVisible, setIsCnpjVisible] = useState(false);
  const {register,reset,handleSubmit,formState: { errors }} = useForm();

  function onSubmit(userData) 
  {
    console.log(userData);
  }
  
  const onError = (errors, e) => console.log(errors, e);





  
  return (
    <>
      <div id="parent" className="modalParent" >
        <div className="p-4 bg-gray-700 rounded-lg w-60">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="relative w-full mb-3 ">
              <label
                className="block mb-2 text-xs font-bold text-white uppercase"
                htmlFor="grid-password"
              >
                Nome
              </label>
              <input
                type="text"
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-slate-900 focus:outline-none focus:ring"
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
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-slate-900 focus:outline-none focus:ring"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-xs font-bold text-white uppercase"
                htmlFor="grid-password"
              >
                Password
              </label>

              <input
                type="password"
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-slate-900 focus:outline-none focus:ring"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-xs font-bold text-white uppercase"
                htmlFor="grid-password"
              >
                Permissão
              </label>

              <select
                className="w-full px-3 py-3 text-sm bg-white border-0 text-slate-900 focus:outline-none "
                {...register("permission", { required: true })}
              >
                <option value="...">...</option>
                {reporPermissionsCreate.map((item) => {
                  return (
                    <option key={item.Value} value={item.Value}>
                      {item.Label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="ml-2 text-sm font-semibold text-slate-900">
                  <span className="text-lightBlue-500">
                    <p> {} mensagem de erro</p>
                  </span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-center">
              <div
                className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                role="group"
              >
                <button
                  type="submit"
                  className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                >
                  Salvar
                </button>

                <button
                  type="button"
                  className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                  onClick={()=>onClose()}
                >
                  Fechar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
