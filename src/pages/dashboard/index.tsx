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



      <div className={"max-w-7xl h-screen bg-gray-900 mx-auto" + " flex     "}>
      
      <SideBar/>
      <main className={"w-auto h-[calc(100vh_-_5rem)]    " + " flex flex-col  "}>
      <HeaderDashboard/>

     

       <UserList/>


      
      </main>
      </div>
    </>
    )
   
}
