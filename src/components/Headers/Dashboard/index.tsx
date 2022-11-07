
import { SignInButton } from '../../SignInButton';

import {BiSearch} from 'react-icons/bi'









export function HeaderDashboard() {
  return (
    <header className={"h-20 w-[calc(100vw_-_14rem)] bg-black border-b"} >
      <div className={" h-20 w-[calc(100vw_-_14rem)]   " + " flex justify-between content-center mx-auto px-4 " }>
       
      <div className="flex px-4 p-2 my-auto  space-x-1 items-center justify-between bg-zinc-900 rounded-full hover:bg-zinc-800 transition duration-150 ease-in-out">
      <BiSearch  color="#e2e8f0"/>
      <input type="search" className="border-0 bg-zinc-900  text-slate-200 hover:bg-zinc-800 focus:outline-0 "/>
       </div>
       
         
        <SignInButton/>
      </div>
    </header>
  );
}
