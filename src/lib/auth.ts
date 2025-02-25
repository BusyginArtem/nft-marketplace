import NextAuth from "next-auth";
import type { MongoClient } from "mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { /*client,*/ connectMongoDb } from "@/lib/mongodb";
import env from "@/env";
import { verifyPasswords } from "@/lib/auth-password";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { UserEntity } from "@/lib/definitions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth-error",
    signIn: "/auth-error",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log('credentials >>>>>>>>>>>>>>>>>>>>>', credentials)
        console.log("req >>>>>>>>>>>>>>>>>>>>>", req);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        let conn: MongoClient | undefined;
        let user: UserEntity | null = null;

        try {
          conn = await connectMongoDb();

          if (!conn) {
            throw new Error("Could not connect to database.");
          }

          const db = conn.db();

          user = await db.collection<UserEntity>("users").findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isMatch = await verifyPasswords(credentials.password as string, user.password);

          if (!isMatch) {
            throw new Error("Email or password is incorrect.");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authentication failed");
        } finally {
          conn?.close();
        }
      },
    }),
  ],
});
