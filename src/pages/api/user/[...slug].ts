import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";


import { UserDataFull,UserType } from "../../../types";







/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (request: NextApiRequest, response: NextApiResponse) => { 
    const session = await unstable_getServerSession(request, response, authOptions) 
    const validated = (new Date(session?.expires)) > new Date()
 
    const requestSubscribe=request.body;
    console.log(requestSubscribe)
  
    if (request.method === "POST" &&  validated  && request.query.slug=="create" ) {
    let userData:UserType;
   let message:any;


      await fauna
        .query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(requestSubscribe.email)
                )
              )
            ),
            q.Create(q.Collection("users"), {
              data: {
                email: requestSubscribe.email,
                date: requestSubscribe.dateCreated,
              },
            }),
            q.Get(q.Match(q.Index("user_by_email"), requestSubscribe.email))
          )
        )
        .then((ret: any) => {
          userData = { id: ret.ref.id, ...ret.data };
        })
        .catch((err) =>
          console.error(
            "Error: [%s] %s: %s",
            err.name,
            err.message,
            err.errors()[0].description
          )
        );


      await fauna
      .query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index("permission_by_companyId_and_userId"),[requestSubscribe.company,userData.id]
              )
            )
          ),
          q.Create(q.Collection("permissions"), {
            data: {
              companyId: requestSubscribe.company,
              permission: requestSubscribe.permission,
              dateCreated: requestSubscribe.dateCreated,
              userId: userData.id,
            },
          }),
          false
        )
      )
      .then((ret: any) => {
        if (ret != false) {
          message = {
            success: true,
            message: "User created successfully",
          };
        } else if (ret === false) {
          message = {
            success: false,
            message: "User existed ",
          };
        }
      })
      .catch((err) =>
        console.error(
          "Error: [%s] %s: %s",
          err.name,
          err.message,
          err.errors()[0].description
        )
      );


console.log(message);
       
  
     response.status(200).json(message);
    
    } else {
      response.setHeader("Allow", "POST");
      response.status(405).end("Method not allowed");
    }
  };
  