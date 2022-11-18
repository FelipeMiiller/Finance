import { NextApiRequest, NextApiResponse } from "next";
import { IsNull, query as q } from "faunadb";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { companyFaunaDB, permissionFaunaDBType, userFaunaDBType } from "../../types/faunadb";
import { isTemplateExpression } from "typescript";

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
   let userCompaniesRef: never[]=[]
   let companiesUsers: never[]=[]
   let usersRef: never[]=[]
   let users: never[]=[]

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
            ).then((ret) => 
              userCompaniesRef = ret.data
            )
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

            await fauna
            .query(
              q.Map(
                q.Paginate(
                  q. Union(
                    q.Map(
                      userPermissionsRef.map(item => item.data.userRef),
                      q.Lambda(
                        "users",
                        q. Match(q.Index("user_by_ref"), q.Var("users"))
                      )
                    )
                  )
                ),
                q.Lambda("X", q.Get(q.Var("X")))
              )
            ).then((ret) => companiesUsers=ret.data)
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
           
          


            await fauna
            .query(
              q.Map(
                q.Paginate(
                  q. Union(
                    q.Map(
                      userCompaniesRef.map(company => company.ref),
                      q.Lambda(
                        "permissions",
                        q. Match(q.Index("permission_by_companyRef"), q.Var("permissions"))
                      )
                    )
                  )
                ),
                q.Lambda("X", q.Get(q.Var("X")))
              )
            ).then((ret) => usersRef = (ret.data).map(item => item.data.userRef))
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


            await fauna
              .query(
                q.Map(
                  q.Paginate(
                    q.Union(
                      q.Map(
                        usersRef
                          .map((item) => item.id)
                          .filter((elem, pos, self) => {
                            return self.indexOf(elem) == pos;
                          }),
                        q.Lambda(
                          "users",
                          q.Match(q.Index("user_by_id"), q.Var("users"))
                        )
                      )
                    )
                  ),
                  q.Lambda("X", q.Get(q.Var("X")))
                )
              )
              .then((ret) => 
                users = ret.data
              )
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


         



            let userCompanies = userCompaniesRef.map((company) => {
              let permissionsMap = userPermissionsRef.filter((permission) =>(permission.data.companyRef.id === company.ref.id)).map((permission) => {
                if (permission.data.companyRef.id === company.ref.id)
                  return {
                    permission: permission.data.permission,
                    dateCreated: permission.data.dateCreated,
                    userRef: permission.data.userRef,
                  };
              });

              let data = {
                id:company.ref.id,
                name: company.data.name,
                document: company.data.document,
                email: company.data.email,
                dateCreated: company.data.dateCreated,
                users: permissionsMap,
              };
              return data;
            });
   
   console.log(userCompanies[0].users)

    

   response.status(200).end("Conta criada");
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};
