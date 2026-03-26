import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permissive for dev; change to your specific CDN/Backend in production
      },
    ],
  },
};

export default nextConfig;