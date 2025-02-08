"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Slider } from "@/types/slider.type";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState<Slider[]>([]);

  if (currentSlide === -17) {
    setIsAutoPlaying(true);
  }

  useEffect(() => {
    const fetchSliders = async () => {
      const response = await fetch(
        "https://backend.abyssiniasoftware.com/api/slider"
      );
      const { sliders } = await response.json();
      console.log(sliders);
      setSlides(sliders);
    };

    fetchSliders();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (slides.length === 0) {
    return (
      <div className="relative h-[50vh] sm:h-[65vh] md:h-[75vh] w-full overflow-hidden  p-10 px-20 py-10 mt-8">
        <div className="absolute inset-0 flex items-center justify-center px-16">
          <div className="relative w-[100vw] h-[50vh] sm:h-[65vh] md:h-[75vh]">
            <div className="absolute inset-0 top-0 p-6 flex flex-col justify-center items-center w-full h-full">
              <div
                className="space-y-6 max-w-xl"
                onClick={() => console.log("clicked")}
              >
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white capitalize">
                  Abyssinia Software{" "}
                  <span className="block text-light_primary">Solution</span>
                </h1>

                <p className="text-sm sm:text-lg font-semibold text-gray-300 max-w-2xl line-clamp-2">
                  We provide software solutions for your business. Our services
                  include web development, mobile development, and custom
                  software development.
                </p>
                {/* <SocialIcons /> */}
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="text-white p-2 sm:p-4 text-sm sm:text-base bg-light_primary hover:bg-light_primary/70 outline-none"
                  >
                    <Link
                      href="/contact-us"
                      className="w-full h-full flex items-center justify-center"
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[50vh] sm:h-[65vh] md:h-[75vh] w-full overflow-hidden  p-10 px-20 py-10 mt-8">
      <div className="absolute inset-0 flex items-center justify-center px-16">
        {slides.map((slide, index) => {
          let offset = index - currentSlide;
          if (offset < -2) offset += slides.length;
          if (offset > 2) offset -= slides.length;

          return (
            <div
              key={index}
              className={cn(
                "absolute w-full transition-all duration-700",
                "overflow-hidden shadow-2xl",
                "transform-gpu",
                offset === 0 && "z-20",
                offset === -1 &&
                  "-translate-x-[65%]  scale-75 opacity-60 z-10 blur-md",
                offset === 1 &&
                  "translate-x-[65%] scale-75 opacity-60 z-10 blur-md",
                offset === -2 &&
                  "-translate-x-[105%]  scale-50 opacity-30 blur-md",
                offset === 2 &&
                  "translate-x-[105%] scale-50 opacity-30 blur-sm",
                Math.abs(offset) > 2 && "opacity-0"
              )}
            >
              <div className="relative w-[100vw] h-[50vh] sm:h-[65vh] md:h-[75vh]">
                <Image
                  fill
                  src={`${slide.image}`}
                  alt={slide.title}
                  className="h-full w-full object-cover brightness-50"
                />
                <div className="absolute inset-0 top-0 p-6 flex flex-col justify-center items-center w-full h-full">
                  <div
                    className="space-y-6 max-w-xl"
                    onClick={() => console.log("clicked")}
                  >
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white capitalize">
                      {(() => {
                        const words = slide.title.trim().split(" ");
                        console.log(words);
                        const lastWord = words.pop();
                        const titleWithoutLastWord = words.join(" ");
                        return (
                          <>
                            {titleWithoutLastWord}
                            <span className="block text-light_primary">
                              {" "}
                              {lastWord}{" "}
                            </span>
                          </>
                        );
                      })()}
                    </h1>

                    <p className="text-sm sm:text-lg font-semibold text-gray-300 max-w-2xl line-clamp-2">
                      {slide.description}
                    </p>
                    {/* <SocialIcons /> */}
                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        className="text-white p-2 sm:p-4 text-sm sm:text-base bg-light_primary hover:bg-light_primary/70 outline-none"
                      >
                        <Link
                          href="/contact-us"
                          className="w-full h-full flex items-center justify-center"
                        >
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
