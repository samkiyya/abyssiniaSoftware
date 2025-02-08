import { Blog } from "@/types/blog.type";
import Link from "next/link";
import React from "react";

export default function BlogList({ blog }: { blog: Blog }) {
  return (
    <div className="h-8 flex items-center pr-3">
      <span className="mr-2 text-blue-400">•</span>
      <Link
        href={`/blogs/${blog.id}`}
        className="text-base font-semibold truncate text-blue-400"
      >
        {blog.title}
      </Link>
    </div>
  );
}
