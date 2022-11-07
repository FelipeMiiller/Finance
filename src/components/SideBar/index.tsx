import Link from "next/link";
import dashboard from "../../pages/dashboard";




const dashboardLinks= [
  {
  slug:"/",
  name:"Dashboard",
 },
 {
  slug:"pagar",
  name:"Contas a Pagar",
 },
 {
  slug:"receber",
  name:"Contas a Receber",
 },
 {
  slug:"usuarios",
  name:"Usuarios",
 },

]











export function SideBar() {
  return (
    <aside className={"h-screen border-r w-56 bg-gray-700 my-0  px-0 text-slate-200   "} >
     
       
         <div className={"h-20  border-b flex pl-2"}>
         <h1 className={"my-auto text-4xl font-dancing"}>DashBoard</h1>

         </div >
       
         <div className={" pl-2"}>


            <ul className={ "flex-col flex flex-col list-none space-y-2 mx-6 mt-8"}>
            
            {dashboardLinks.map((dash) => (
        <li key={dash.slug} className="items-center bg-gray-400 p-2  rounded-lg hover:bg-gray-700 hover:border-2 hover:border-slate-200 transition duration-150 ease-in-out">
          <Link href={`/dashboard/${dash.slug}`}>
            {dash.name}
          </Link>
        </li>
            )) }
            </ul>
            <hr className="my-4 w-full "  />

           

          


         </div>
       
    </aside>
  );
}
