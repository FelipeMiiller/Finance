
import { useEffect } from 'react';

import { SignInButton } from '../Form/SignInButton';















export function HeaderHome() {

 



  return (
    <header className={"h-20 w-screem bg-black border-b"} >
      <div className={"h-20 max-w-6xl      " + " flex justify-between content-center mx-auto px-2 " }>
        <h1 className={"my-auto text-4xl text-slate-200 font-dancing"}>DashFinance</h1>

       
         
        <SignInButton/>
      </div>
    </header>
  );
}
