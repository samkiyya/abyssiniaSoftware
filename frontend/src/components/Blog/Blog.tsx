import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Blog as BlogType } from "@/types/blog.type";

export default function Blog({ post }: { post: BlogType }) {
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Card className="overflow-hidden group">
      <Link href={`/blogs/${post.id}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div>
          <CardHeader className="p-4">
            <Badge variant="outline" className="w-fit mb-2">
              {post.category.name}
            </Badge>
            <h3 className="text-lg font-semibold text-light_secondary/80 mb-2 line-clamp-2 group-hover:text-light_primary transition-all duration-200">
              {post.title}
            </h3>
            <CardContent className="p-0 flex items-center justify-between text-sm text-gray-600">
              <span>Abyssinia Software</span>
              <span>{formattedDate}</span>
            </CardContent>
          </CardHeader>
        </div>
      </Link>
    </Card>
  );
}
