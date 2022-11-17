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
  //console.log(session)
  

  if (request.method === "POST" &&   validated) {
   let userFaunaDB:userFaunaDBType = undefined;
   let permissionFaunaDB:permissionFaunaDBType =undefined;
   let userPermissionsRef: never[]=[]
   let userCompanies: never[]=[]
   

          await fauna
            .query(q.Get(q.Match(q.Index("user_by_email"), user.email)))
            .then((ret) => (userFaunaDB = ret))
            .catch((err) => {
              console.log(
                "🚀 ~ file: authuser.ts ~ line 44 [%s] %s: %s",
                err.name,
                err.message,
                err.errors()[0].description
              );
            });

          await fauna
            .query(
              q.Map(
                q.Paginate(
                  q.Match(q.Index("permission_by_userRef"), userFaunaDB.ref)
                ),
                q.Lambda("permissions", q.Get(q.Var("permissions")))
              )
            )
            .then((ret) => (userPermissionsRef = ret.data))
            .catch((err) =>
              console.error(
                console.log(
                  "🚀 ~ file: authuser.ts ~ line 68 [%s] %s: %s",
                  err.name,
                  err.message,
                  err.errors()[0].description
                )
              )
            );

          await fauna
            .query(
              q.Map(
                q.Paginate(
                  q. Union(
                    q.Map(
                      userPermissionsRef.map(item => item.data.companyRef),
                      q.Lambda(
                        "companies",
                        q. Match(q.Index("company_by_ref"), q.Var("companies"))
                      )
                    )
                  )
                ),
                q.Lambda("X", q.Get(q.Var("X")))
              )
            ).then((ret) => userCompanies=ret.data)
            .catch((err) =>
              console.error(
                console.log(
                  "🚀 ~ file: authuser.ts ~ line 94 [%s] %s: %s",
                  err.name,
                  err.message,
                  err.errors()[0].description
                )
              )
            );

       


           let userPermissions = userPermissionsRef.map((permission) => {
              let dataCompany = userCompanies.find(
                (company) => company.ref.id === permission.data.companyRef.id
              );
              return {
                nameCompany: dataCompany.data.name,
                documentCompany: dataCompany.data.document,
                emailCompany: dataCompany.data.email,
                dateCreatedCompany: dataCompany.data.dateCreated,
                permission: permission.data.permission,
                dateCreatedPermission: permission.data.dateCreated,
              };
            });


       console.log(userPermissions)

   response.status(200).end("Conta criada");
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};
