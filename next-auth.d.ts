import { Session as DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      address: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    address: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    address: string | null;
  }
}
