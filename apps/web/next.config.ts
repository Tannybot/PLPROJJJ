import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@plass/recommendation"],
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"]
  }
};

export default nextConfig;
