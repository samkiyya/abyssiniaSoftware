export interface Testimonials {
  id: string;
  description: string;
  service: string;
  company: string;
  image: string;
}

export interface GetTestimonialsResponse {
  testimonies: Testimonials[];
}
