import User from "@/app/models/User";
import UserInfo from "@/app/models/UserInfo";
import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import clientPromise from "@/libs/mongoConnect";
// import GithubProvider from "next-auth/providers/github";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "text@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        // console.log(credentials, "credentials");

        // const { email, password } = credentials;

        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({ email });
        const passwordOk = bcrypt.compareSync(password, user.password);
        // console.log(passwordOk, "password");
        if (user && passwordOk) {
          // console.log(user, "user");
          return user;
        }

        // if (user) {
        //   return user;
        // } else {
        //   return null;
        // }

        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

// export default NextAuth(authOptions);

export { handler as GET, handler as POST };
