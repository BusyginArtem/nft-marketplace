import type { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import env from "@/env";

export default {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
