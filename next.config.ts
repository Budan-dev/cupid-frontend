import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cupid-backend-api.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
