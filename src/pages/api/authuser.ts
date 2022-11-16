import { NextApiRequest, NextApiResponse } from "next";
import { IsNull, query as q } from "faunadb";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { companyFaunaDB, permissionFaunaDBType, userFaunaDBType } from "../../types/faunadb";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};







/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (request: NextApiRequest, response: NextApiResponse) => {
  const session  = await unstable_getServerSession(request, response, authOptions) 
  const{user, expires} =session
  let userData
  const validated = (new Date(expires)) > (new Date())
  console.log(session)
  

  if (request.method === "POST" &&   validated) {
   let userFaunaDB:userFaunaDBType = undefined;
   let permissionFaunaDB:permissionFaunaDBType =undefined;
    await fauna
          .query(q.Get(q.Match(q.Index("user_by_email"), user.email)))
          .then((ret) => userFaunaDB=ret)
          .catch((err) => {
            console.log("🚀 ~ file: authuser.ts ~ line 44 [%s] %s: %s",
            err.name,
            err.message,
            err.errors()[0].description);
            	
          })


    
          await fauna
          .query(q.Get(q.Match(q.Index("permissions_by_userRef"), userFaunaDB.ref)))
          .then((ret) => permissionFaunaDB=ret)
          .catch((err) => {
            console.log("🚀 ~ file: authuser.ts ~ line 54 [%s] %s: %s",
            err.name,
            err.message,
            err.errors()[0].description);
            	
          })



          await fauna.query(
            q.Get(q.Paginate(q.Match(q.Index('permissions_by_userRef'), userFaunaDB.ref)))
          )
          .then((ret) => console.log(ret))
          .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
          ))





          await fauna
          .query(q.Get(q.Match(q.Index("permissions_by_userRef"), userFaunaDB.ref)))
          .then((ret) => permissionFaunaDB=ret)
          .catch((err) => {
            console.log("🚀 ~ file: authuser.ts ~ line 54 [%s] %s: %s",
            err.name,
            err.message,
            err.errors()[0].description);
            	
          })


      




         console.log(userFaunaDB.ref.id)
       console.log(permissionFaunaDB)


   response.status(200).end("Conta criada");
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};
