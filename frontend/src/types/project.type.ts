export interface Project {
  id: number;
  name: string;
  description: string;
  content: string;
  categoryId: number;
  startDate: string;
  endDate: string;
  status: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}
