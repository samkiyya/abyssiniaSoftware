import React from "react";

interface HeroPageProps {
  title: string;
  description: string;
  image: string;
}

export default function HeroPage({ title, description, image }: HeroPageProps) {
  return (
    <div
      className="relative flex items-center justify-center h-[45vh] bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="text-center w-screen h-full flex flex-col items-center justify-center bg-black/50 p-5 rounded-md">
        <h1 className="text-3xl py-2 max-w-2xl line-clamp-2 sm:text-4xl md:text-6xl text-light_primary font-bold mb-2">
          {title}
        </h1>
        <p className="text-lg pb-2 font-medium max-w-3xl line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
