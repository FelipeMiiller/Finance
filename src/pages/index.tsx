import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { HeaderHome } from '../components/Headers/Home'
import ModalCompanyRegister from '../components/Form/registerCompany';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useAuth, { UseAuthType } from '../contexts/AuthContex';


export default function Home() {
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  const {authRedirect, signed}= useAuth() as UseAuthType ;
  
  


  useEffect(() => {
    if (status === "authenticated" && signed ){
      authRedirect()

      router.push("/finance/dashboard")
      
    }
  }, [isUser,status]);

  
  

  const buttonModalRegister = () => {
    setIsModalVisible(!isModalVisible);
   
    
  }





  
  return (
    <>
      <Head>
        <title>Home | Finance</title>
      </Head>
      <HeaderHome />
      <main
        className={
          "max-w-6xl h-[calc(100vh_-_5rem)]  mx-auto my-0  px-0 py-8  " +
          " flex   justify-between content-center "
        }
      >
        <section
          className={
            "max-w-2xl my-32  " + " space-y-4 text-slate-200 font-medium"
          }
        >
          <span className="text-4xl ">👏 Olá, Bem vindo</span>
          <h1 className=" font-dancing text-7xl">
            Sistema de Controle Contabil em{" "}
            <span className="text-cyan-300 ">NextJs</span> .
          </h1>
          <p className="text-2xl ">Cadastre sua Empresa e venha conferir !</p>

        <button  onClick={buttonModalRegister} 
          className={
            "h-16 w-64 flex     items-center justify-center  rounded-full text-4xl font-light bg-[#eba417]" +" " } >
          Submit
        </button>

        {isModalVisible ? (
          <ModalCompanyRegister onClose={() => setIsModalVisible(false)} />
        ) : null}


          
        </section>
      
        <img src="./images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
   
}
