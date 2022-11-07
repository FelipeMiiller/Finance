import Head from 'next/head'
import Image from 'next/image'
import { HeaderHome } from '../components/Headers/Home'


export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Finance</title>
      </Head>
      <HeaderHome/>
      <main className={"max-w-6xl h-[calc(100vh_-_5rem)]  mx-auto my-0  px-0 py-8 " + " flex   justify-between content-center "}>
        <section className={"max-w-2xl my-32  " + " space-y-4 text-slate-200 font-medium"}>
          <span className='  text-4xl'>
            👏 Olá, Bem vindo
            </span>
          <h1 className=' font-dancing text-7xl'>
            Sistema de Controle Contabil em <span className='text-cyan-300 '>NextJs</span> .
          </h1>
          <p className='  text-2xl  '>
            Cadastre sua Empresa e venha conferir !
          </p>
          
        </section>

        <img  src="./images/avatar.svg" alt="Girl coding" />
      </main>
    </>
    )
   
}
