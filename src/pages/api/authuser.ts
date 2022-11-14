import { NextApiRequest, NextApiResponse } from "next";
import { IsNull, query as q } from "faunadb";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { companyFaunaDB } from "../../types/faunadb";

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
  const session = await unstable_getServerSession(request, response, authOptions)

  console.log(session)

  if (request.method === "POST") {
   
   const requestSubscribe:postType=request.body;
   console.log(requestSubscribe)
  









   response.status(200).end("Conta criada");
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};
