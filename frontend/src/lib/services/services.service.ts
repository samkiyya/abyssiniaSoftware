import { GetServiceResponse, GetServicesResponse } from "@/types/service.type";

export async function getServices() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/service`);
    if (!response.ok) {
      return [];
    }
    const res: GetServicesResponse = await response.json();
    return res.services;
  } catch (error) {
    console.log("error fetching services", error);
    // return [];
    throw new Error("Error fetching services");
  }
}
export async function getService(id: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/service/${id}`);
    if (!response.ok) {
      return null;
    }
    const res: GetServiceResponse = await response.json();
    // Delay the return by 5 seconds
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return res.service;
  } catch (error) {
    console.log("error fetching service", error);
    // return [];
    throw new Error("Error fetching service");
  }
}
