
import { SignInButton } from '../../Form/SignInButton';

import {BiSearch} from 'react-icons/bi'
import Pagination from '../../Form/pagination';




const UsersApi = [
  {
    id: 1,
    name: "Felipe Miiller",
    email: "felipe@gmail.com",
    acive: true,
    DataCadastro:"20/02/2022"
  },
  {
    id: 2,
    name: "Yasmin Miiller",
    email: "felipe@gmail.com",
    acive: true,
    DataCadastro:"20/02/2022"
  },
  {
    id: 3,
    name: "Felipe Miiller",
    email: "felipe@gmail.com",
    acive: true,
    DataCadastro:"20/02/2022"
  },
  {
    id: 4,
    name: "Felipe Miiller",
    email: "felipe@gmail.com",
    acive: true,
    DataCadastro:"20/02/2022"
  },
  {
    id: 5,
    name: "Felipe Miiller",
    email: "felipe@gmail.com",
    acive: true,
    DataCadastro:"20/02/2022"
  },
];




export function UserList() {


  
  return (
    <div className={" w-auto h-[calc(100vh_-_5rem)] flex  flex-col " + 
    " text-slate-200    "} >

       
<div className="  flex flex-col mt-6 ml-40 mr-auto overflow-x-auto border-4 border-transparent bg-gray-800 text-slate-200 rounded-xl">
 
  <div className="h-12 flex justify-between mx-2 items-center ">

    <h2 className="my-auto font-bold">Usuarios</h2>
    
     <button  className={"px-2 p-1 my-auto  rounded-md  bg-pink-700 hover:bg-pink-600 transition duration-150 ease-in-out"
      + " "}>
      Cadastrar
     </button>
  </div>

    <div className="inline-block min-w-full py-2 px-2 ">
      <div className="overflow-hidden ">
        <table className="min-w-full ">
          <thead className="">
            <tr >
            <th scope="col" className="px-6 py-4 text-base font-semibold text-left text-slate-200">
            <input type="checkbox"  />
              </th>
              <th scope="col" className="px-6 py-4 text-base font-semibold text-left text-slate-200">
                Usuario
              </th>
              <th scope="col" className="px-6 py-4 text-base font-semibold text-left text-slate-200">
                Permissão
              </th>
           
              <th scope="col" className="px-6 py-4 text-base font-semibold text-left text-slate-200">
                Data de Cadastro
              </th>
              <th scope="col" className="px-6 py-4 text-base font-semibold text-left text-slate-200">
                Configuração
              </th>
            </tr>
          </thead>
          <tbody>
            {UsersApi.map((user)=>{


              return(
               <>
                <tr  className=" border-b">
                <td  className="px-6 py-4 text-sm font-light text-slate-200 whitespace-nowrap">
                <input type="checkbox"/>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-200 whitespace-nowrap">
                  <p>{user.name}</p>
                  <p className='mt-[0.1] text-xs font-light'>{user.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-light text-slate-200 whitespace-nowrap">
                    Mark
                  </td>
                  <td className="px-6 py-4 text-sm font-light text-slate-200 whitespace-nowrap">
                    {user.DataCadastro}
                  </td>
                  <td className="px-6 py-4 text-sm font-light text-slate-200 whitespace-nowrap">
                    @mdo
                  </td>
                  
                </tr>
              </>
              )

            })}
           
          
            
          </tbody>
        </table>

        <Pagination/>
      </div>
   
  </div>
</div>
    
 

    </div>
  );
}
