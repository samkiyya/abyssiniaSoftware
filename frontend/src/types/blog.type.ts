import { Category } from "./project.type";

export interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  category: Category;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetBlogsResponse {
  blogs: Blog[];
}

export interface GetBlogResponse {
  blog: Blog;
}
