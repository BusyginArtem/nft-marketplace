const env = {
  AUTH_SECRET: process.env.AUTH_SECRET as string,
  MONGODB_URI: process.env.MONGODB_URI as string,
  GITHUB_ID: process.env.GITHUB_ID as string,
  GITHUB_SECRET: process.env.GITHUB_SECRET as string,
  BLOCK_FROST_PROJECT_ID: process.env.BLOCK_FROST_PROJECT_ID as string,
};

if (!env.AUTH_SECRET || !env.MONGODB_URI || !env.GITHUB_ID || !env.GITHUB_SECRET || !env.BLOCK_FROST_PROJECT_ID) {
  throw new Error("Missing environment variables");
}

export default env;
