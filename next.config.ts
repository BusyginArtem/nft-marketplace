import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.blockfrost.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
