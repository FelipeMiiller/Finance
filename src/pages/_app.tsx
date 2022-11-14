import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider ,  useSession  } from "next-auth/react"

import { useRouter } from 'next/router';
import { NextComponentType } from 'next';
import { NextPageContextCustom } from '../types';
import { ReactNode, useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContex';

interface AppPropsCustom {

  Component: NextComponentType<NextPageContextCustom, any, any>

  pageProps:any;
}



export default function App({ Component, pageProps }:AppPropsCustom) {
  return  (
   
    < SessionProvider session={pageProps.session}>
         <AuthProvider>
    {Component.auth ? (
        <Auth>
          <Component {...pageProps} />      
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
      </AuthProvider>
      </ SessionProvider>
    
  );
}





interface Props {
  children: React.ReactNode;
}

function Auth ({ children }:Props)  {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isUser = !!session?.user


  useEffect(() => {
    if (status === "loading" ) return
    if (!isUser) router.push("/")

  }, [isUser, status])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}