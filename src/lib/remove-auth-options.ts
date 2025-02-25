// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
// import { MongoClient } from "mongodb";

// import { client, connectMongoDb } from "@/lib/mongodb";
// import env from "@/env";
// import { verifyPasswords } from "@/lib/auth-password";
// import type { UserEntity } from "@/lib/definitions";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

// export const authOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(client),
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       return { ...token, ...user };
//     },
//     async session({ session, token, user }) {
//       session.user = token as any;
//       return session;
//     },
//   },
//   providers: [
//     GithubProvider({
//       clientId: env.GITHUB_ID,
//       clientSecret: env.GITHUB_SECRET,
//     }),
//     CredentialsProvider({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials, req) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing email or password");
//         }

//         let client: MongoClient | undefined;
//         let user: UserEntity | null = null;

//         try {
//           client = await connectMongoDb();

//           if (!client) {
//             throw new Error("Could not connect to database.");
//           }

//           const db = client.db();

//           user = await db.collection<UserEntity>("users").findOne({
//             email: credentials.email,
//           });

//           if (!user) {
//             throw new Error("User not found");
//           }

//           const isMatch = await verifyPasswords(credentials.password, user.password);

//           if (!isMatch) {
//             throw new Error("Email or password is incorrect.");
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//           };
//         } catch (error) {
//           console.error("Authorization error:", error);
//           throw new Error("Authentication failed");
//         } finally {
//           client?.close();
//         }
//       },
//     }),
//   ],
// };
