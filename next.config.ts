import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/Favorites",
        destination: "/Favorites/Favorites",
      },
      {
        source: "/Login",
        destination: "/Login/Login",
      },
    ];
  },
};

module.exports = nextConfig;
