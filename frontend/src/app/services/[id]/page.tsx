import HeroPage from "@/components/Hero/HeroPage";
import MarkDownPreview from "@/components/MarkDownPreview";
import Tabs from "@/components/Tabs/Tabs";
import { getService } from "@/lib/services/services.service";
import { Service } from "@/types/service.type";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  const response = await fetch(`${process.env.BACKEND_URL}/service`);
  const res = await response.json();
  return res.services
    .slice(0, 50)
    .map((service: Service) => ({ id: service.id.toString() }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const service: Service | null = await getService(id);

  if (!service) {
    return {
      title: "service Not Found",
      description: "The requested service post could not be found.",
    };
  }

  return {
    title: `${service.title}`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://abyssiniasoftware.com/services/${id}`,
      type: "article",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const service: Service | null = await getService(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="">
      <HeroPage
        title={service.title}
        description={service.description}
        image={service.image}
      />
      <div className="relative bg-white py-8">
        <Tabs />
      </div>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mb-8">
            <Image
              src={service.image}
              alt={service.title}
              width={1000}
              height={500}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {service.title}
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>{new Date(service.time).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {service.category.name}
              </span>
            </div>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-gray-600 my-5 capitalize">
            {service.description}
          </p>
          <div className="prose prose-lg max-w-none">
            <MarkDownPreview content={service.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
