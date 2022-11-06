

import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import {signIn, signOut, useSession } from "next-auth/react"








export function SignInButton() {

const { data: session, status } = useSession()
//console.log(status)
//console.log(session?.user)


  return status === "authenticated" ? ( 
   <button type="button" className={" flex px-4 m-4 space-x-1 items-center justify-between bg-zinc-900 text-slate-100 rounded-full hover:bg-zinc-800 transition duration-150 ease-in-out"}
   onClick={()=> signOut()}>

    <FaGithub color="#04d361"/>
    {session?.user?.name}
    <FiX color='#737380' className={""}/>
   </button>
  ):( 
    <button type="button" className={" flex px-4 m-4 space-x-1 items-center  justify-between bg-zinc-900 text-slate-100 rounded-full hover:bg-zinc-800 transition duration-150 ease-in-out"} 
    onClick={()=>signIn('github')}  >
      
     <FaGithub color="#eba417"/>
     Sign in with Github
    </button>
   );
}
