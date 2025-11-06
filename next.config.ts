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
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "framer-motion",
    ],
  },
  compiler:
    process.env.NODE_ENV === "production" ? { removeConsole: true } : {},
  compress: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  output: "standalone",
};

export default withBundleAnalyzer(nextConfig);
