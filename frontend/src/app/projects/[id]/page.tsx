import HeroPage from "@/components/Hero/HeroPage";
import MarkDownPreview from "@/components/MarkDownPreview";
import Tabs from "@/components/Tabs/Tabs";
import { getProject, getProjects } from "@/lib/services/project.service";
import { Project } from "@/types/project.type";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  const res = await getProjects();
  return res
    .slice(0, 50)
    .map((project: Project) => ({ id: project.id.toString() }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const project: Project | null = await getProject(id);

  if (!project) {
    return {
      title: "project Not Found",
      description: "The requested project post could not be found.",
    };
  }

  return {
    title: `${project.name} - Project`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      url: `https://abyssiniasoftware.com/projects/${id}`,
      type: "article",
      images: [
        {
          url: project.imageUrl,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: [project.imageUrl],
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const project: Project | null = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="">
      <HeroPage
        title={project.name}
        description={project.description}
        image={project.imageUrl}
      />
      <div className="relative bg-white py-8">
        <Tabs />
      </div>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mb-8">
            <Image
              src={project.imageUrl}
              alt={project.name}
              width={1000}
              height={500}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {project.name}
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {project.category.name}
              </span>
            </div>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-gray-600 my-5 capitalize">
            {project.description}
          </p>
          <div className="prose prose-lg max-w-none">
            <MarkDownPreview content={project.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
