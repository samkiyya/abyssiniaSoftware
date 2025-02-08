"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Partner } from "@/types/partners.type";

export default function Partners() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logosPerSlide, setLogosPerSlide] = useState(4); // Default for large screens
  const [partners, setPartners] = useState<Partner[]>([]);

  const totalSlides = Math.ceil(partners.length / logosPerSlide);

  useEffect(() => {
    const fetchPartners = async () => {
      const response = await fetch(
        "https://backend.abyssiniasoftware.com/api/partner"
      );
      const data: Partner[] = await response.json();
      setPartners(data);
    };
    fetchPartners();
  }, []);

  useEffect(() => {
    const updateLogosPerSlide = () => {
      if (window.innerWidth >= 768) {
        setLogosPerSlide(4);
      } else if (window.innerWidth >= 640) {
        setLogosPerSlide(3);
      } else {
        setLogosPerSlide(2);
      }
    };

    updateLogosPerSlide();
    window.addEventListener("resize", updateLogosPerSlide);
    return () => window.removeEventListener("resize", updateLogosPerSlide);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const slides = Array.from({ length: totalSlides }, (_, index) =>
    partners.slice(index * logosPerSlide, (index + 1) * logosPerSlide)
  );

  if (partners.length === 0) {
    return <></>;
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
      <p className="text-3xl font-semibold text-center my-10 text-light_primary ">
        Partners
      </p>
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full flex justify-center items-center gap-8 px-4"
              >
                {slide.map((logo, index) => (
                  <div
                    key={index}
                    className="w-full md:w-auto flex flex-col justify-center items-center"
                  >
                    <div className="relative h-40 w-40 md:h-44 md:w-44 lg:h-48 lg:w-48 overflow-hidden">
                      <Image
                        src={logo.logoUrl}
                        alt={logo.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="my-1 capitalize text-lg font-semibold text-center text-balance max-w-xs">
                        {logo.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  currentSlide === index ? "bg-gray-800" : "bg-gray-300"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
