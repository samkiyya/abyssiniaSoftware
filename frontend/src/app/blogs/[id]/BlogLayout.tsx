import BlogList from "@/components/Blog/BlogList";
import { getBlogPosts } from "@/lib/services/blogs.service";
import React from "react";

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const blogs = await getBlogPosts();

  return (
    <div className="grid md:grid-cols-[6fr_2fr] bg-white">
      <div>{children}</div>
      <div className="hidden md:block">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Recent Posts</h3>
          <ul className="space-y-2">
            {blogs.slice(0, 5).map((blog) => (
              <BlogList key={blog.id} blog={blog} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
