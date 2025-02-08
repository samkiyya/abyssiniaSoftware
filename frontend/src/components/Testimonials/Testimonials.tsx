import React from "react";
import TestimonialsU from "./TestmonialsU";
import { getTestimony } from "@/lib/services/testmonies.service";

export default async function Testimonials() {
  const testimonials = await getTestimony();
  if (!testimonials || testimonials.length === 0) {
    return <></>;
  }
  return (
    <>
      <TestimonialsU testimonials={testimonials} />
    </>
  );
}
