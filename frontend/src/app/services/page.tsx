import InteractiveScroll from "@/components/Animation/InteractiveScroll";
import ContactUsForm from "@/components/ContactUs/ContactUsSection";
import HeroPage from "@/components/Hero/HeroPage";
import Partners from "@/components/Partners/Partners";
import Service from "@/components/Service/Service";
import Tabs from "@/components/Tabs/Tabs";
import { getServices } from "@/lib/services/services.service";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore our range of services, including Web Design, App Development, SEO Optimization, Software as a Service, Technology Consulting, Software Development Training, and Software Security Testing. Enhance your business with our expert solutions.",
  openGraph: {
    title: "Our Services",
    description:
      "Explore our range of services, including Web Design, App Development, SEO Optimization, Software as a Service, Technology Consulting, Software Development Training, and Software Security Testing.",
    url: "https://abyssiniasoftware.com/services",
    type: "website",
    images: [
      {
        url: "https://abyssiniasoftware.com/opengraph-image.png",
        width: 800,
        height: 600,
        alt: "Services Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services",
    description:
      "Explore our range of services, including Web Design, App Development, SEO Optimization, Software as a Service, Technology Consulting, Software Development Training, and Software Security Testing.",
    images: ["https://abyssiniasoftware.com/opengraph-image.png"],
  },
};

export default async function Page() {
  const services = await getServices();

  return (
    <div className="relative">
      <HeroPage
        title="Services"
        description="We offer a wide range of services to help you grow your business."
        image="/images/hero-services.png"
      />
      <div className="relative bg-white py-8">
        <Tabs />
      </div>
      <div className="">
        {/* <Services /> */}
        <div className="py-20 bg-white">
          <InteractiveScroll>
            <div className="max-w-5xl pb-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Service key={index} service={service} />
              ))}
            </div>
            <Partners />
            <ContactUsForm />
          </InteractiveScroll>
        </div>
      </div>
    </div>
  );
}
