import { Category } from "./project.type";

export interface Service {
  id: string;
  title: string;
  description: string;
  content: string;
  category: Category;
  time: Date;
  image: string;
  pricing: number;
}

export interface GetServicesResponse {
  services: Service[];
}

export interface GetServiceResponse {
  service: Service;
}
