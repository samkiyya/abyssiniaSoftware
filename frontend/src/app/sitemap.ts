import { getBlogPosts } from "@/lib/services/blogs.service";
import { getProjects } from "@/lib/services/project.service";
import { getServices } from "@/lib/services/services.service";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_URL environment variable is not set");
  }

  try {
    const [blogs, services, projects] = await Promise.all([
      getBlogPosts(),
      getServices(),
      getProjects(),
    ]);
    console.log("NEXT_PUBLIC_URL:", process.env.NEXT_PUBLIC_URL);
    console.log("Blogs:", blogs);
    console.log("Services:", services);
    console.log("Projects:", projects);

    // Dynamic URLs for blogs, services, and projects
    const blogUrls = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.id}`,
      lastModified: new Date(blog.updatedAt).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    console.log("Blog URLs:", blogUrls);


    const serviceUrls = services.map((service) => ({
      url: `${baseUrl}/services/${service.id}`,
      lastModified: new Date(service.time).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    console.log("Service URLs:", serviceUrls);

    const projectUrls = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: new Date(project.updatedAt).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    console.log("Project URLs:", projectUrls);

    // Static pages with realistic lastModified dates and adjusted changeFrequency
    const staticPages = [
      {
        url: `${baseUrl}`,
        lastModified: new Date("2025-01-01").toISOString(),
        changeFrequency: "weekly" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/about-us`,
        lastModified: new Date("2024-12-01").toISOString(),
        changeFrequency: "yearly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blogs`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact-us`,
        lastModified: new Date("2024-12-01").toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
    ];

    return [...staticPages, ...blogUrls, ...serviceUrls, ...projectUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Fallback sitemap with static pages
    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/about-us`,
        lastModified: new Date().toISOString(),
        changeFrequency: "yearly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact-us`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
    ];
  }
}