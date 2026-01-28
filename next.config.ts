import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {},
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      // Ignore noisy files that can trigger dev reload loops.
      ignored: ["**/.git/**", "**/.logs/**", "**/dev.db"],
    };
    return config;
  },
};

export default nextConfig;
