import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/publications",
        destination: "/research",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
