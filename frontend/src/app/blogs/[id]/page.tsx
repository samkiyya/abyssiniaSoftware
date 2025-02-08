import HeroPage from "@/components/Hero/HeroPage";
import Tabs from "@/components/Tabs/Tabs";
import { getBlogPost } from "@/lib/services/blogs.service";
import { Blog } from "@/types/blog.type";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import BlogLayout from "./BlogLayout";
import MarkDownPreview from "@/components/MarkDownPreview";

export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/blogs`);
    const res = await response.json();
    return res.blogs
      .slice(0, 50)
      .map((blog: Blog) => ({ id: blog.id.toString() }));
  } catch (error) {
    console.log("error fetching blogs", error);
    return [];
  }
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const blog: Blog | null = await getBlogPost(id);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.title} - Blog`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://abyssiniasoftware.com/blogs/${id}`,
      type: "article",
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const blog: Blog | null = await getBlogPost(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="">
      <HeroPage
        title={blog.title}
        description={blog.description}
        image={blog.image}
      />
      <div className="relative bg-white py-8">
        <Tabs />
      </div>
      <BlogLayout>
        <div className="bg-white py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="mb-8">
              <Image
                src={blog.image}
                alt={blog.title}
                width={1000}
                height={500}
                className="rounded-lg object-cover w-full h-[400px]"
              />
            </div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {blog.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <span>{new Date(blog.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {blog.category.name}
                </span>
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-gray-600 my-5 capitalize">
              {blog.description}
            </p>
            <div className="prose prose-lg max-w-none">
              <MarkDownPreview content={blog.content} />
            </div>
          </div>
        </div>
      </BlogLayout>
    </div>
  );
}
