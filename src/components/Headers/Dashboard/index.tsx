
import { SignInButton } from '../../SignInButton';

import {BiSearch} from 'react-icons/bi'









export function HeaderDashboard() {
  return (
    <header className={"h-20 w-auto bg-gray-900 "} >
      <div className={" h-20 w-auto " + " flex justify-between content-center mx-auto px-4 " }>
       
      <div className="flex items-center justify-between p-2 px-4 my-auto space-x-1 transition duration-150 ease-in-out bg-gray-800 rounded-full hover:bg-gray-700">
      <BiSearch  color="#e2e8f0"/>
      <input type="search" className="bg-gray-800 border-0 rounded-full text-slate-200 hover:bg-gray-700 focus:outline-0 "/>
       </div>
       
         
        <SignInButton/>
      </div>
    </header>
  );
}
