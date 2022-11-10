
import { query as q, query } from "faunadb";
import { fauna } from "../../services/fauna";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { mask, unMask } from 'remask';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


import Email from "next-auth/providers/email";



const schema = yup.object({
  company: yup.string().required(),
  document: yup.string().required(),
  email
}).required();

export default function ModalCompanyRegister({ onClose = () => { }}) {
  const [isIsCnpjVisible, setIsCnpjVisible] = useState(false);
  const {register,reset,handleSubmit,formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  async function onSubmit(userSubmit) 
  {


  console.log(userSubmit);
 let userPost= {
 document: userSubmit.document.replace(/\D/g,""), 
 empresa: userSubmit.empresa.toUpperCase(),
 email:userSubmit.email
 }
   
 console.log(userPost)

  
 try {
  await fauna.query(
      q.If(
        q.Not(
          q.Exists(
            q.Match(q.Index("company_by_cnpj"), q.Casefold(userPost.cnpj))
          ),
        ),
        q.Create(q.Collection("company"), {
          data: userSubmit.cnpj,
        }),
        q.Update(q.Ref(q.Index("user_by_email"), user.user.email), {
          data: {
            name: user.user.name,
            image: user.user.image,
          },
        })
      )
    )
    .then((ret) => console.log(ret))
    .catch((err) =>
      console.error(
        "Error: [%s] %s: %s",
        err.name,
        err.message,
        err.errors()[0].description
      )
    );

  return true;
} catch {
  return false;
}







  }
  
  const onError = (errors, e) => console.log(errors, e);


  
  return (
    <>
    
        <div className="z-10 p-4 ml-2 bg-gray-800 rounded-lg w-96">
          <form onSubmit={handleSubmit(onSubmit, onError)} className="grid grid-cols-2 gap-1">
            <div className="relative w-full mb-3 ">
              <label
                className="block mb-2 text-xs font-bold text-white uppercase"
               
              >
                Empresa
              </label>
              <input
                type="text"
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-gray-700 border-0 rounded shadow placeholder-blueGray-300 text-slate-200 focus:outline-none focus:ring"
                placeholder="Nome"
                {...register("company", { required: true })}
              />
               <p>{errors.company?.message}</p>
            </div>
            <div className="relative w-full mb-3 ">
              <label
                className="block mb-2 text-xs font-bold text-white uppercase"
                
              >
                CNPJ ou CPF
              </label>
              <input
                type="text"
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-gray-700 border-0 rounded shadow placeholder-blueGray-300 text-slate-200 focus:outline-none focus:ring"
                placeholder=" CNPJ ou CPF"
                {...register("document", {
                  required: true, maxLength: 18 ,minLength:14,
                  onChange: (e) => {
                    const OriginalValue = unMask(e.target.value);
                    const MaskValue = mask(OriginalValue,
                      ["999.999.999-99", "99.999.999/9999-99"])
                    reset({ document: MaskValue })
                  }
                }
                
              )}
              />
               <p>{errors.document?.message}</p>
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-xs font-bold text-white uppercase"
               
              >
                Email
              </label>
              <input
                type="text"
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-gray-700 border-0 rounded shadow placeholder-blueGray-300 text-slate-200 focus:outline-none focus:ring"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <p>{errors.email?.message}</p>
            </div>

          

            <div>
              <label className="flex flex-col w-full mt-4 cursor-point">
                <span className="ml-2 text-sm font-semibold text-slate-200">
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
