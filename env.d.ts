// env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    AUTH_SECRET: string;
    MONGODB_URI: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    NEXTAUTH_URL: string;
    NODE_ENV: "development" | "production" | "test"; // Default Next.js environments
  }
}
