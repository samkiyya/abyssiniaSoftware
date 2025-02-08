import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/", // Allow all routes
    },
    sitemap: "https://www.abyssiniasoftware.com/sitemap.xml",
  };
}
