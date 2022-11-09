
import { SignInButton } from '../../SignInButton';

import {BiSearch} from 'react-icons/bi'




const  UsersApi=[{

id:1,
name:"Felipe Miiller",
email:"felipe@gmail.com",
acive:true


  
}]




export function UserList() {

const color= "dark"
  
  return (
    <div className={" w-auto h-[calc(100vh_-_5rem)] " + 
    " text-slate-200  flex  flex-col  "} >

       
<div className="flex flex-col mt-6 ml-40 mr-auto overflow-x-auto border-4 border-transparent bg-gra-800 text-slate-200 rounded-xl">
 
  <div className="flex justify-between mx-2 ">

    <h2 className="my-auto font-bold">Usuarios</h2>
    
     <button  className={"px-2 p-1 my-auto  rounded-full  bg-pink-700 hover:bg-pink-600 transition duration-150 ease-in-out"
      + " "}>
      Cadastrar
     </button>
  </div>

    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-4 text-sm font-medium text-left text-gray-900">
                Usuario
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium text-left text-gray-900">
                Permissão
              </th>
           
              <th scope="col" className="px-6 py-4 text-sm font-medium text-left text-gray-900">
                Data de Cadastro
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium text-left text-gray-900">
                Configuração
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100 border-b">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
              <p>Felipe Miiller</p>
              <p className='mt-[0.1] text-xs font-light'>Felipemiiller@gmail.com</p>
              </td>
              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                Mark
              </td>
              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                Otto
              </td>
              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                @mdo
              </td>
              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                @mdo
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">2</td>
              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                Jacob
              </td>
              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                Thornton
              </td>
              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                @fat
              </td>
              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                @fat
              </td>
            </tr>
            <tr className="bg-gray-100 border-b">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">3</td>
              <td colSpan={2} className="px-6 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap">
                Larry the Bird
              </td>
              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                @twitter
              </td>
              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                @twitter
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
   
  </div>
</div>
    
 

    </div>
  );
}
