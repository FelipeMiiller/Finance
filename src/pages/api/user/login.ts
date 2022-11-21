import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { permissionFaunaDBType, userFaunaDBType } from "../../../types/faunadb";

import { UserDataFull } from "../../../types";








/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (request: NextApiRequest, response: NextApiResponse) => { 
  const{user, expires} = await unstable_getServerSession(request, response, authOptions) 
  const validated = (new Date(expires)) > (new Date())
  
  

  if (request.method === "POST" &&   validated) {
   let userFaunaDB:userFaunaDBType ;
   let permissionFaunaDB:permissionFaunaDBType;
   let  userPermissions: never[]=[];
   let userCompaniesRef: never[]=[];
   let  userCompanies: any[]=[];
   let usersId: any[]=[];
   let userUsers: never[]=[];
   let permissions: any[]=[];
   let permissionsId:[]=[];


          await fauna
            .query(q.Get(q.Match(q.Index("user_by_email"), user.email)))
            .then((ret:any) => {
              let data = ret.data;
              userFaunaDB = {
                id: ret.ref.id,
                ...data
              };
            })
            .catch((err) => {
              console.log(
                "🚀 ~ file: authuser.ts ~ line 59 [%s] %s: %s",
                err.name,
                err.message,
                err.errors()[0].description
              );
            });

          await fauna
            .query(
              q.Map(
                q.Paginate(
                  q.Match(q.Index("permission_by_userId"), userFaunaDB.id)
                ),
                q.Lambda("permissions", q.Get(q.Var("permissions")))
              )
            )
            .then((ret: any) => {
              userPermissions = ret.data.map((permission:any) => {
                return {
                  id: permission.ref.id,
                  ...permission.data,
                };
              });
            })
            .catch((err) =>
              console.error(
                console.log(
                  "🚀 ~ file: authuser.ts ~ line 79 [%s] %s: %s",
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
                      userPermissions.map((item:any) => item.companyId),
                      q.Lambda(
                        "companies",
                        q. Match(q.Index("company_by_Id"), q.Var("companies"))
                      )
                    )
                  )
                ),
                q.Lambda("X", q.Get(q.Var("X")))
              )
            ).then((ret: any) => {
              userCompanies = ret.data.map((company:any) => {
                return {
                  id: company.ref.id,
                  ...company.data,
                };
              });
            })         
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
                      userCompanies.map((item:any) => item.id),
                      q.Lambda(
                        "permissions",
                        q. Match(q.Index("permission_by_companyId"), q.Var("permissions"))
                      )
                    )
                  )
                ),
                q.Lambda("X", q.Get(q.Var("X")))
              )
            ).then((ret: any) => {
              permissions = ret.data.map((permission:any) => {
                return {
                  id:permission.ref.id,
                  ...permission.data
                };
              });

              usersId= permissions.map((item:any) => item.userId)
              .filter((elem, pos, self) => {
                return self.indexOf(elem) == pos;
              })

            })         
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
                      usersId,
                      q.Lambda("users", q.Match(q.Index("user_by_id"), q.Var("users")))
                    )
                  )
                ),
                q.Lambda("X", q.Get(q.Var("X")))
              )
            ).then(
              (ret: any) =>{
                (userUsers = ret.data.map((user: any) => {
                  return {
                    id: user.ref.id,
                    ...user.data,
                  };
                }))

                     
                permissions = permissions.map((permission: any) => {
                  let userFilter = userUsers.find(
                    (item: any) => item.id === permission.userId
                  );
      
                  return {
                    user: userFilter,
                    permission: permission.permission,
                    id: permission.id,
                    companyId: permission.companyId,
                    dateCreated: permission.dateCreated,
                  };
                })
    
                userCompanies = userCompanies.map((company) => {
                  let permissionFilter = permissions.filter((item: any) => item.companyId === company.id);
                  return {
                    ...company,
                    users: permissionFilter,
                  };
                });

              })
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


    let data: UserDataFull = {
      ...userFaunaDB,
      permissions: userPermissions,
      companies: userCompanies,
    };

   response.status(200).json(data);
  
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};
