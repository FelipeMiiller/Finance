import Head from 'next/head'
import Image from 'next/image'
import { UserList } from '../../components/dashboard/UserList'
import { HeaderDashboard } from '../../components/Headers/Dashboard'
import { SideBar } from '../../components/SideBar'




export default function dashboard() {
  return (
    <>
      <Head>
        <title>DashBoard | Finance</title>
      </Head>



      <div className={"w-screen h-screen bg-gray-900 " + " flex     "}>
      
      <SideBar/>
      <main className={"w-[calc(100vw_-_14rem)] h-[calc(100vh_-_5rem)]    " + " flex flex-col  "}>
      <HeaderDashboard/>

      <div className={"flex flex-1"}>

       <UserList/>


      </div>
      </main>
      </div>
    </>
    )
   
}
