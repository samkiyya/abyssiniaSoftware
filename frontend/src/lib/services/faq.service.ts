import { GetFaqsResponse } from "@/types/faq.type";

export async function getFaq() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/faq`);
    if (!response.ok) {
      return [];
    }
    const res: GetFaqsResponse = await response.json();
    return res.faqs;
  } catch (error) {
    console.log("error fetching faq posts", error);
    throw new Error("Error fetching faq posts");
    // return [];
  }
}
