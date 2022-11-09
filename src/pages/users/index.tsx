import Head from 'next/head'
import { UserList } from '../../components/dashboard/UserList'
import { HeaderDashboard } from '../../components/Headers/Dashboard'
import { SideBar } from '../../components/SideBar'




export default function dashboard() {
  return (
    <>
      <Head>
        <title>Users | Finance</title>
      </Head>

<div className=' w-screen h-screen bg-gray-900'>


      <div className={"max-w-7xl h-screen bg-gray-900 mx-auto" + " flex     "}>
      
      <SideBar/>
      <main className={"w-auto h-[calc(100vh_-_5rem)]    " + " flex flex-col  "}>
      <HeaderDashboard/>

     

       <UserList/>


      
      </main>
      </div>
</div>
    </>
    )
   
}
