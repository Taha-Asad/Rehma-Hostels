import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.ts": ["@swc/jest"],
      "*.tsx": ["@swc/jest"],
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "framer-motion",
    ],
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
  compiler:
    process.env.NODE_ENV === "production" ? { removeConsole: true } : {},
  compress: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "https",
        hostname: "46avwlzt0a.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "*utfs.io",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",
      },
    ],
  },
  output: "standalone",
};

export default withBundleAnalyzer(nextConfig);
