import { Project, Category } from "@/types/project.type";

export async function getProjects() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/project`);
    if (!response.ok) {
      return [];
    }
    const res: Project[] = await response.json();
    return res;
  } catch (error) {
    console.log("error fetching projects", error);
    // return [];
    throw new Error("Error fetching projects");
  }
}

export async function getProject(id: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/project/${id}`);
    if (!response.ok) {
      return null;
    }
    const res: Project = await response.json();
    return res;
  } catch (error) {
    console.log("error fetching project", error);
    // return [];
    throw new Error("Error fetching project");
  }
}

export async function getProjectCategories() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/project/category`);
    if (!response.ok) {
      return [];
    }
    const res: Category[] = await response.json();
    return res;
  } catch (error) {
    console.log("error fetching project categories", error);
    // return [];
    throw new Error("Error fetching project categories");
  }
}
