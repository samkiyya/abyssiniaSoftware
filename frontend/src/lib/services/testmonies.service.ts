import { GetTestimonialsResponse } from "@/types/testimony.type";

export async function getTestimony() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/testimony`);
    if (!response.ok) {
      return [];
    }
    const res: GetTestimonialsResponse = await response.json();
    return res.testimonies;
  } catch (error) {
    console.log("error fetching faq posts", error);
    throw new Error("Error fetching faq posts");
    // return [];
  }
}
