import Blog from "@/components/Blog/Blog";
import HeroPage from "@/components/Hero/HeroPage";
import Tabs from "@/components/Tabs/Tabs";
import { getBlogPosts } from "@/lib/services/blogs.service";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Insights, Projects, and Innovations",
  description:
    "Discover the latest updates, projects, success stories, and technology insights from Abyssinia Software Solutions. Stay informed about our innovative work and industry trends.",
  keywords: [
    "Abyssinia Software Solutions blog",
    "technology blog Ethiopia",
    "software development insights",
    "latest tech projects",
    "Abyssinia Software Solutions updates",
    "case studies Abyssinia Software",
    "ERP solutions Ethiopia",
    "custom software development stories",
    "mobile app development projects",
    "website design case studies",
    "IT services blog",
    "digital transformation tips",
    "tech industry news Africa",
    "software innovation Ethiopia",
  ],
  openGraph: {
    title: "Insights, Projects, and Innovations",
    description:
      "Explore Abyssinia Software Solutions' blogs featuring tech innovations, project highlights, and thought leadership in the software industry.",
    url: "https://abyssiniasoftware.com/blogs",
    type: "website",
    siteName: "Abyssinia Software Solutions",
    images: [
      {
        url: "https://abyssiniasoftware.com/blogs-opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Abyssinia Software Solutions Blog Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights, Projects, and Innovations",
    description:
      "Stay updated with our latest projects, success stories, and tech insights. Abyssinia Software Solutions delivers innovation and expertise.",
    site: "@abyssiniasoft",
    images: ["https://abyssiniasoftware.com/blogs-opengraph-image.png"],
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  authors: [{ name: "Abyssinia Software Solutions" }],
};

export default async function page() {
  const blogPosts = await getBlogPosts();
  return (
    <div>
      <HeroPage
        title="Blogs"
        description="Explore Recently posted blog with Abyssinia Software Solution"
        image="/images/hero-blogs.png"
      />
      <div className="relative bg-white py-14">
        <Tabs />
      </div>
      <div className="relative min-h-[50vh] bg-white py-10 px-3">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Blog key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
