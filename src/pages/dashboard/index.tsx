import Head from 'next/head'
import Image from 'next/image'
import { HeaderDashboard } from '../../components/Headers/Dashboard'
import { SideBar } from '../../components/SideBar'




export default function dashboard() {
  return (
    <>
      <Head>
        <title>DashBoard | Finance</title>
      </Head>



      <div className={"w-screen h-screen " + " flex     "}>
      
      <SideBar/>
      <main className={"w-[calc(100vw_-_14rem)] h-[calc(100vh_-_5rem)]    " + " flex     "}>
      <HeaderDashboard/>
      </main>
      </div>
    </>
    )
   
}
