import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import dashboard from "../../pages/dashboard";




const dashboardLinks = [
  {
    slug: "/dashboard",
    name: "Dashboard",
    title:"Geral"
  },
  {
    slug: "relatorio",
    name: "Relatorio",
    title:"Geral"
  },
  {
    slug: "pagar",
    name: "Contas a Pagar",
    title:"Financeiro"
  },
  {
    slug: "receber",
    name: "Contas a Receber",
    title:"Financeiro"
  },
  {
    slug: "users",
    name: "Usuarios",
    title:"Configuações"
  },
];

export function SideBar() {
  let {asPath} = useRouter()
 

console.log(asPath)

  return (
    <aside
      className={
        "h-screen  min-w-[14rem]    my-0  px-0 bg-gray-900 bg-opacity-95 text-slate-200"
      }
    >
      <div className={"h-20  border-b ro flex pl-2"}>
        <h1 className={"my-auto text-3xl "}>DashBoard</h1>
      </div>

    
      <div className={"mx-6 mt-6 pl-2 "}>
        <h2 className={" text-sm text-slate-500 font-bold  "}>Geral</h2>

        <ul className={"flex flex-col list-none  mt-2"}>
          {dashboardLinks.map((dash) => {

            if (dash.title == "Geral") {
              return (
                <li key={dash.slug}
                className={"items-center px-2 py-1  " + " transition duration-150 ease-in-out " +
               ( asPath.indexOf(dash.slug) === -1  ? " hover:text-slate-300" : " text-pink-700 hover:text-pink-500"  ) }
               >
                  
                  <Link  href={`/${dash.slug}`}>{dash.name}</Link>
                </li>
              );
            }
          })}
        </ul>
        <hr className="w-full my-4 " />
      </div>
      <div className={"mx-6 mt-6 pl-2 "}>
        <h2 className={" text-sm text-slate-500 font-bold  "}>Financeiro</h2>

        <ul className={"flex flex-col list-none  mt-2"}>
          {dashboardLinks.map((dash) => {
            if (dash.title == "Financeiro") {
              return (
                <li key={dash.slug}
                className={"items-center px-2 py-1  " + " transition duration-150 ease-in-out " +
               ( asPath.indexOf(dash.slug) === -1  ? " hover:text-slate-300" : " text-pink-700 hover:text-pink-500"  ) }
               >
                  <Link href={`/${dash.slug}`}>{dash.name}</Link>
                </li>
              );
            }
          })}
        </ul>
        <hr className="w-full my-4 " />
      </div>
      <div className={"mx-6 mt-6 pl-2 "}>
        <h2 className={" text-sm text-slate-500 font-bold  "}>Configuações</h2>

        <ul className={"flex flex-col list-none  mt-2"}>
          {dashboardLinks.map((dash) => {
            if (dash.title == "Configuações") {
              return (
                <li key={dash.slug}
                className={"items-center px-2 py-1  " + " transition duration-150 ease-in-out " +
               ( asPath.indexOf(dash.slug) === -1  ? " hover:text-slate-300" : " text-pink-700 hover:text-pink-500"  ) }
               >
                 
                  <Link href={`/${dash.slug}`}>{dash.name}</Link>
                </li>
              );
            }
          })}
        </ul>
        <hr className="w-full my-4 " />
      </div>
    </aside>
  );
}
