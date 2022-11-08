
import { SignInButton } from '../../SignInButton';

import {BiSearch} from 'react-icons/bi'









export function HeaderDashboard() {
  return (
    <header className={"h-20 w-[calc(100vw_-_14rem)] bg-gray-900 "} >
      <div className={" h-20 w-[calc(100vw_-_14rem)]   " + " flex justify-between content-center mx-auto px-4 " }>
       
      <div className="flex items-center justify-between p-2 px-4 my-auto space-x-1 transition duration-150 ease-in-out rounded-full bg-gray-800 hover:bg-gray-700">
      <BiSearch  color="#e2e8f0"/>
      <input type="search" className="border-0 bg-gray-800 text-slate-200 hover:bg-gray-700 rounded-full focus:outline-0 "/>
       </div>
       
         
        <SignInButton/>
      </div>
    </header>
  );
}
