"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Quote, Star } from "lucide-react";
import { Testimonials } from "@/types/testimony.type";

// interface Testimonialx {
//   id: number;
//   name: string;
//   role: string;
//   image: string;
//   rating: number;
//   quote: string;
// }

export default function TestimonialsU({
  testimonials,
}: {
  testimonials: Testimonials[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logosPerSlide, setLogosPerSlide] = useState(3);

  useEffect(() => {
    const updateLogosPerSlide = () => {
      if (window.innerWidth >= 768) {
        setLogosPerSlide(3);
      } else if (window.innerWidth >= 640) {
        setLogosPerSlide(2);
      } else {
        setLogosPerSlide(1);
      }
    };

    updateLogosPerSlide();
    window.addEventListener("resize", updateLogosPerSlide);
    return () => window.removeEventListener("resize", updateLogosPerSlide);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + logosPerSlide
  );

  // Rotate to the start if necessary
  if (visibleTestimonials.length < logosPerSlide) {
    visibleTestimonials.push(
      ...testimonials.slice(0, logosPerSlide - visibleTestimonials.length)
    );
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl text-light_primary font-extrabold my-8 text-text-muted mb-8 text-center">
          Testimonials
        </h2>
        <div className="relative overflow-hidden">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-8 px-4">
            {visibleTestimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white p-4 shadow-md w-full h-full"
              >
                <CardContent className="flex flex-col items-center text-center pt-0">
                  <div className="flex">
                    <div className="relative w-12 h-12 mx-2 bg-green-300 rounded-full">
                      <Image
                        src={testimonial.image || "/placeholder.jpg"}
                        alt={testimonial.company}
                        fill
                        className="rounded-full w-12 h-12  object-cover bg-red-400"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-1">
                        {testimonial.company}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {testimonial.company}
                      </p>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 italic text-sm flex gap-2">
                    <Quote className="w-4 h-4 text-light_primary shrink-0" />
                    <span>{testimonial.description}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={`test-${index}`}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  currentIndex === index ? "bg-gray-800" : "bg-gray-300"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
