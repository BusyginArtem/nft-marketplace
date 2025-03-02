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
  debug: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth-error",
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
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
      async authorize(credentials) {
        const conn: MongoClient | undefined = await connectMongoDb();
        const db = conn.db();

        const user: UserEntity | null = await db.collection<UserEntity>("users").findOne({
          email: credentials.email!,
        });

        if (!user) {
          return null;
        }

        const isMatch = await verifyPasswords(credentials.password as string, user.password);

        if (!isMatch) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
});
