import BlogSection from "@/components/Blog/BlogSection";
import ContactUsForm from "@/components/ContactUs/ContactUsSection";
import HeroPage from "@/components/Hero/HeroPage";
import Tabs from "@/components/Tabs/Tabs";
import { Metadata } from "next";
import React from "react";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact us for inquiries, support, or feedback. We're here to help!",
  openGraph: {
    title: "Contact Us",
    description:
      "Contact us for inquiries, support, or feedback. We're here to help!",
    url: "https://abyssiniasoftware.com/contact-us",
    type: "website",
    images: [
      {
        url: "https://abyssiniasoftware.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Us Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | My Website",
    description:
      "Contact us for inquiries, support, or feedback. We're here to help!",
    images: ["https://abyssiniasoftware.com/opengraph-image.png"],
  },
};

export default function Page() {
  return (
    <div>
      <HeroPage
        title="Contact Us"
        description="Get in touch with us"
        image="/image/hero-contact-us.png"
      />
      <div className="relative py-20 bg-white">
        <div className="relative py-10">
          <Tabs />
        </div>
        <ContactUsForm />
      </div>
      <BlogSection />
    </div>
  );
}
