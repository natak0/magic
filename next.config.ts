import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "gatherer.wizards.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.magicthegathering.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
