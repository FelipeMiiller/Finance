

import {FaGoogle} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import {signIn } from "next-auth/react"
import useAuth, { UseAuthType } from '../../contexts/AuthContex';









export function SignInButton() {
  const {status,session,signOut}= useAuth() as UseAuthType ;


//console.log(status)
//console.log(session?.user)


  return status === "authenticated" ? ( 
   <button type="button" className={" flex px-4 p-2 my-auto  items-center justify-between bg-gray-800 text-slate-100 rounded-full hover:bg-gray-700 transition duration-150 ease-in-out space-x-1"}
   onClick={()=> signOut()}>

    <FaGoogle color="#04d361"/>
    <span>{session?.user?.name}</span>
    <FiX color='#737380' className={""}/>
   </button>
  ):( 
    <button type="button" className={" flex px-4 p-2 my-auto  items-center  justify-between bg-gray-800 text-slate-100 rounded-full hover:bg-gray-700 transition duration-150 ease-in-out space-x-1"} 
    onClick={()=>signIn('google')}  >
      
     <FaGoogle color="#eba417"/>
     <span>Sign in with Google</span> 
    </button>
   );
}
