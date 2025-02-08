import CompaniesState from "@/components/Companies/CompaniesState";
import ContactUsForm from "@/components/ContactUs/ContactUsSection";
import FaqSection from "@/components/Faq/FaqSection";
import HeroPage from "@/components/Hero/HeroPage";
import Partners from "@/components/Partners/Partners";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about Abyssinia Software, our mission, values, and the team dedicated to delivering top-notch software solutions.",
  keywords: [
    "About Abyssinia Software",
    "Software Development Ethiopia",
    "Custom Software Solutions",
    "Software Company Addis Ababa",
    "Innovative Software Services",
  ],
  authors: [{ name: "Abyssinia Software" }],
  openGraph: {
    title: "About Us",
    description:
      "Discover the story behind Abyssinia Software and meet the people who bring innovation to life through technology.",
    url: "https://abyssiniasoftware.com/about",
    type: "website",
    images: [
      {
        url: "https://abyssiniasoftware.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Abyssinia Software Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us",
    description:
      "Discover the story behind Abyssinia Software and meet the people who bring innovation to life through technology.",
    images: ["https://abyssiniasoftware.com/opengraph-image.png"],
  },
};

export default function page() {
  return (
    <div className="">
      <HeroPage
        title="About Abyssinia Software"
        description="Leading Technology Solutions Provider in Ethiopia"
        image="/image/hero-contact-us.png"
      />
      <div className="relative py-20 bg-white flex flex-col items-center px-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-2">
          <div className="relative min-h-52 min-w-24 h-full w-full p-3 rounded-md">
            <Image
              src="/logo2.jpg"
              alt="About Us Abyssinia Software"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div>
            <div className="py-5 text-xl">
              <p className="text-light_primary font-semibold">
                About Abyssinia Software
              </p>
              <p className="text-3xl sm:text-5xl text-slate-950 font-bold">
                Leading Technology Solutions Provider in Ethiopia
              </p>
              <p className="p-2 border-l-8 rounded-md text-sm font-medium border-blue-950 my-2">
                Abyssinia Software is a premier technology solutions provider
                based in Addis Ababa, Ethiopia. We specialize in a wide range of
                services including web development, mobile app development, ERP
                systems, school management systems, and building information
                management systems.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CompaniesState />
      <Partners />
      <FaqSection />
      <ContactUsForm />
    </div>
  );
}
