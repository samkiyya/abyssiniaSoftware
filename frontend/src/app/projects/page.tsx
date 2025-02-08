import ContactUsForm from "@/components/ContactUs/ContactUsSection";
import HeroPage from "@/components/Hero/HeroPage";
import PortfolioSection from "@/components/Portfolio/PortfolioSection";
import Tabs from "@/components/Tabs/Tabs";
import {
  getProjectCategories,
  getProjects,
} from "@/lib/services/project.service";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Latest Projects",
  description: "Explore our latest projects showcasing innovative solutions.",
  openGraph: {
    title: "Our Latest Projects",
    description: "Explore our latest projects showcasing innovative solutions.",
    url: "https://abyssiniasoftware.com/projects",
    type: "website",
    images: [
      {
        url: "https://abyssiniasoftware.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Projects Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Latest Projects",
    description: "Explore our latest projects showcasing innovative solutions.",
    images: ["https://abyssiniasoftware.com/opengraph-image.png"],
  },
};

export default async function page() {
  const categories = await getProjectCategories();
  const projects = await getProjects();

  return (
    <div>
      <HeroPage
        title="Our Latest Projects"
        description=""
        image="/image/hero-project.png"
      />

      <div className="relative pt-10 pb-18 bg-white">
        <Tabs />
        <div className="py-10 relative">
          <PortfolioSection categories={categories} projects={projects} />
        </div>
      </div>
      <ContactUsForm />
    </div>
  );
}
