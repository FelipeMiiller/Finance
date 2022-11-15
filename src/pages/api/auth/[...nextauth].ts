import { If, query as q, query } from "faunadb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { fauna } from "../../../services/fauna";
import { userFaunaDBType } from "../../../types/faunadb";




export const authOptions = {
 
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
  ],
  callbacks: {
    async signIn(user:userProviderType) {
      const isAllowedToSignIn = true;

   

      if (isAllowedToSignIn) {
        let status: boolean = true;
        let userFaunaDB:(userFaunaDBType | object)

        await fauna
          .query(q.Get(q.Match(q.Index("user_by_email"), user.profile.email)))
          .then((ret) => userFaunaDB=ret)
          .catch((err) => {
            console.log("🚀 ~ file: [...nextauth].ts ~ line 33 [%s] %s: %s",
            err.name,
            err.message,
            err.errors()[0].description);
            	
          })

        await fauna
          .query(
            q.If(q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.profile.email))
              )),
              false,
              q.Update(q.Ref(q.Collection("users"), userFaunaDB.ref.id), {
                data: {
                  name: user.profile.name,
                  image: user.profile.image,
                  emailVerified: user.profile.email_verified,
                },
              }),
            )
          )
          .then((ret) => {
            console.log(ret);
          })
          .catch((err) => {
            console.log(err);
          });

        return status;
      } else {
        
        return false;
        
      }
    },
  },
};
export default NextAuth(authOptions);












type userProviderType = {
  
  profile: {
    name: string;
    email: string;
    image: string;
    email_verified: boolean;
    picture: string;
  };

}