import { FaGoogle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn } from "next-auth/react";
import useAuth, { UseAuthType } from "../../contexts/AuthContex";

export function SelectCompany() {
  const { status, session, signOut, user ,setCompany } = useAuth() as UseAuthType;

  
  //console.log(session?.user)

  return (
    <>
      <select onChange={(e)=>{setCompany(e.target.value)}}
     
        className={
          " flex px-4 p-2 my-auto  items-center border-gray-800 justify-between bg-gray-900 text-slate-100 rounded-full hover:bg-gray-700 transition duration-150 ease-in-out space-x-1"
        }
        name="cars"
        id="cars"
      >
        {user?.companies.map((company) => {
          return (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
