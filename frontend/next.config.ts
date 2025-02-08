import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "*",
      "localhost",
      "abyssiniasoftware.backend.senaryore.com",
      "backend.abyssiniasoftware.com",
      "backend.birragroup.com",
      "abyssinia.backend.senaryore.com",
    ],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
