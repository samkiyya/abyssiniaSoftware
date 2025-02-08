export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface GetFaqsResponse {
  faqs: Faq[];
}
