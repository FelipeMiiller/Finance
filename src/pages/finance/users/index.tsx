import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserList } from "../../../components/dashboard/UserList";
import Pagination from "../../../components/Form/pagination";
import { HeaderDashboard } from "../../../components/Headers/Dashboard";
import ModalUserRegister from "../../../components/modals/registerUser";
import { SideBar } from "../../../components/SideBar";
import useAuth, { UseAuthType } from "../../../contexts/AuthContex";
import { CompanyType, UserType } from "../../../types";

Users.auth = true;
export default function Users() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { status, session, signOut, user, setCompany, company } =useAuth() as UseAuthType;
  const [companyList, setCompanyList] = useState<CompanyType | undefined>();

  useEffect(() => {
    setCompanyList(user.companies.find((item) => item.id === company));
  }, [company]);

  const buttonModalRegister = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Head>
        <title>Dashboard | Finance</title>
      </Head>

      <div className="w-screen h-screen bg-gray-900 ">
        <div
          className={"max-w-7xl h-screen bg-gray-900 mx-auto" + " flex     "}
        >
          <SideBar />
          <main
            className={"w-auto h-[calc(100vh_-_5rem)]    " + " flex flex-col  "}
          >
            <HeaderDashboard />

            <div
              className={
                " w-auto h-[calc(100vh_-_5rem)] flex  flex-col " +
                " text-slate-200 "
              }
            >
              <div className="flex flex-col mt-6 ml-40 mr-auto overflow-x-auto bg-gray-800 border-4 border-transparent text-slate-200 rounded-xl">
                <div className="flex items-center justify-between h-12 mx-2 ">
                  <h2 className="my-auto font-bold">Usuarios</h2>

                  <button
                    className={
                      "px-2 p-1 my-auto  rounded-md  bg-pink-700 hover:bg-pink-600 transition duration-150 ease-in-out" +
                      " "
                    }
                    onClick={buttonModalRegister}
                  >
                    Cadastrar
                  </button>
                  {isModalVisible ? (
                    <ModalUserRegister
                      onClose={() => setIsModalVisible(false)}
                    />
                  ) : null}
                </div>

                <div className="inline-block min-w-full px-2 py-2 ">
                  <div className="overflow-hidden ">
                    <table className="min-w-full ">
                      <thead className="">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-4 text-base font-semibold text-left text-slate-200"
                          >
                            <input type="checkbox" />
                          </th>
                          <th
                            scope="col"
                            colSpan={"2"}
                            className="px-6 py-4 text-base font-semibold text-left text-slate-200"
                          >
                            Usuario
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-4 text-base font-semibold text-left text-slate-200"
                          >
                            Permissão
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-4 text-base font-semibold text-left text-slate-200"
                          >
                            Data de Cadastro
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-base font-semibold text-left text-slate-200"
                          >
                            Configuração
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {companyList?.users.map((user) => {
                          console.log(user);
                          return (
                            <>
                              <tr className="border-b ">
                                <td className="px-6 py-4 text-sm font-light text-slate-200 whitespace-nowrap">
                                  <input type="checkbox" />
                                </td>

                                <td className="py-4 pl-6 text-sm font-medium text-slate-200 whitespace-nowrap">
                               
                                  <img
                                    className="w-8 h-8 rounded-full"
                                    src={user.user.image}
                                    alt="user"
                                  />
                                </td>

                                <td className="px-3 py-4 text-sm font-medium text-slate-200 whitespace-nowrap">
                                  <p>{user.user.name}</p>
                                  <p className="mt-[0.1] text-xs font-light">
                                    {user.user.email}
                                  </p>
                                </td>
                                <td className="px-6 py-4 text-sm font-light text-slate-200 whitespace-nowrap">
                                  {user.permission}
                                </td>
                                <td className="px-6 py-4 text-sm font-light text-slate-200 whitespace-nowrap">
                                  {String(user.dateCreated)}
                                </td>
                                <td className="px-6 py-4 text-sm font-light text-slate-200 whitespace-nowrap">
                                  @mdo
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>

                    <Pagination />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
