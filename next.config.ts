import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/Favorites",
        destination: "/Favorites/Favorites",
      },
    ];
  },
};

module.exports = nextConfig;
