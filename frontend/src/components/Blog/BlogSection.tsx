import { getBlogPosts } from "@/lib/services/blogs.service";
import Blog from "./Blog";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function BlogSection() {
  const response = await getBlogPosts();
  const blogPosts = response;
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-light_primary">Blogs</h2>
          <p className="text-gray-600">
            Stay informed with the latest insights, project highlights, and
            technology trends from Abyssinia Software Solutions. Discover how
            innovation drives success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Blog key={post.id} post={post} />
          ))}
        </div>
        <div className="pt-10 flex justify-center">
          <Link href="/blogs" className="py-6 text-center">
            <Button
              variant="outline"
              className="text-white font-semibold bg-light_primary hover:bg-light_primary/70 outline-none"
            >
              More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
