
import { useEffect } from 'react';
import useAuth, { UseAuthType } from '../../contexts/AuthContex';
import { SignInButton } from '../Form/SignInButton';















export function HeaderHome() {

  const {authRedirect}= useAuth() as UseAuthType ;
  

  useEffect(() => {
   authRedirect();
   
    
  }, [])





  return (
    <header className={"h-20 w-screem bg-black border-b"} >
      <div className={"h-20 max-w-6xl      " + " flex justify-between content-center mx-auto px-2 " }>
        <h1 className={"my-auto text-4xl text-slate-200 font-dancing"}>DashFinance</h1>

       
         
        <SignInButton/>
      </div>
    </header>
  );
}
