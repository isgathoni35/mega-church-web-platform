import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/children",
        destination: "/orphanage",
        permanent: true,
      },
      {
        source: "/childrens-home",
        destination: "/orphanage",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

