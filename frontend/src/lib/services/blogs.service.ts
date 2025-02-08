import { GetBlogResponse, GetBlogsResponse } from "@/types/blog.type";

export async function getBlogPosts() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/blogs`);
    if (!response.ok) {
      return [];
    }
    const res: GetBlogsResponse = await response.json();
    return res.blogs;
  } catch (error) {
    console.log("error fetching blog posts", error);
    // return [];
    throw new Error("Error fetching blog posts");
  }
}
export async function getBlogPost(id: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/blogs/${id}`);
    if (!response.ok) {
      return null;
    }
    const res: GetBlogResponse = await response.json();
    // Delay the return by 5 second
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return res.blog;
  } catch (error) {
    console.log("error fetching blog post", error);
    // return [];
    throw new Error("Error fetching blog post");
  }
}
