import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { permissionFaunaDBType, userFaunaDBType } from "../../../types/faunadb";

import { UserDataFull } from "../../../types";







/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (request: NextApiRequest, response: NextApiResponse) => { 
    const session = await unstable_getServerSession(request, response, authOptions) 
   // const validated = (new Date(expires)) > (new Date())
    
    console.log(session)
  
    if (request.method === "POST"   ) {
       
  
     response.status(200).json("foi");
    
    } else {
      response.setHeader("Allow", "POST");
      response.status(405).end("Method not allowed");
    }
  };
  