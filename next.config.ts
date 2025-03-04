import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
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
