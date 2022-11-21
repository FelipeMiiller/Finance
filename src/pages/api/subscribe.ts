import { NextApiRequest, NextApiResponse } from "next";
import { IsNull, query as q } from "faunadb";
import { fauna } from "../../services/fauna";

import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { companyFaunaDBType, userFaunaDBType } from "../../types/faunadb";


type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};



interface userFaunaType {
  ref: {
    id: string;
  };
  data: {
    id: string;
    name: string;
    email: string;
    image: string;
    stripe_customer_id: string;
  };
}



type postType = {

  document:string;
  company: string;
  email:string; 
  dateCreated:Date;
}


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (request: NextApiRequest, response: NextApiResponse) => {


  if (request.method === "POST") {
 
   const requestSubscribe:postType=request.body;
   //console.log(requestSubscribe)
  
 
    
try {
  let userFaunaDB:userFaunaDBType = {}
  let companyFaunaDB:companyFaunaDBType = {}
 
  
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
               date:requestSubscribe.dateCreated
             },
           }),
           "usuario ja cadastrado"
         )
       )
       .then()
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
                 q.Index("company_by_document"),
                 q.Casefold(requestSubscribe.document)
               )
             )
           ),
           q.Create(q.Collection("companies"), {
             data: {
              name: requestSubscribe.company,
                 document: requestSubscribe.document,
                 email: requestSubscribe.email,
                 dateCreated:requestSubscribe.dateCreated
             },
           }),
           "empresa ja cadastrada"
         )
       )
       .then()
       .catch((err) =>
         console.error(
           "Error: [%s] %s: %s",
           err.name,
           err.message,
           err.errors()[0].description
         )
       );
 
       

       await fauna
         .query([
           q.Get(q.Match(q.Index("user_by_email"), requestSubscribe.email)),
           q.Get(
             q.Match(q.Index("company_by_document"), requestSubscribe.document)
           ),
         ])
         .then((ret:any) => {
          let data = ret.map((item:any) => {
            return {
              id: item.ref.id,
              ...item.data,
            };
          });
           userFaunaDB = data[0];
           companyFaunaDB = data[1];
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
                   q.Index("permission_by_companyId"),
                   q.Casefold(companyFaunaDB.id)
                 )
               )
             ),
             q.Create(q.Collection("permissions"), {
               data: {
                 companyId:companyFaunaDB.id,
                 permission:"admin",
                 dateCreated:requestSubscribe.dateCreated,
                 userId:userFaunaDB.id
                
               },
             }),
           "Empresa já Cadastrada"
           )
         )
         .then()
         .catch((err) =>
           console.error(
             "Error: [%s] %s: %s",
             err.name,
             err.message,
             err.errors()[0].description
           )
         );
       
   

       return true;
      } catch {
        return false;
      }


  









   response.status(200).end("Conta criada");
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};
