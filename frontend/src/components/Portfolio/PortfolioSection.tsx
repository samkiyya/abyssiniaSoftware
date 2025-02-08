"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Project, Category } from "@/types/project.type";
import Link from "next/link";

export default function PortfolioSection({
  categories,
  projects,
  length,
}: {
  categories: Category[];
  projects: Project[];
  length?: number;
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems: Project[] =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category.name === activeCategory);

  return (
    <section className="py-16 px-4 md:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 text-light_primary max-w-3xl mx-auto items-center">
          <h2 className="text-4xl font-bold mb-2">Our Projects</h2>
          <p className="text-balance">
            Discover the innovative projects our team is working on, from
            advanced tech solutions to creative designs. Each project showcases
            our commitment to excellence and pushing the limits of what&apos;s
            possible. Stay tuned for more exciting updates!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={activeCategory === "All" ? "default" : "outline"}
            className={`
                ${
                  activeCategory === "All"
                    ? "bg-light_primary hover:bg-light_primary/70 text-white"
                    : "hover:bg-light_primary hover:text-white text-light_primary"
                } rounded-[10px]
              `}
            onClick={() => setActiveCategory("All")}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.name ? "default" : "outline"}
              className={`
                ${
                  activeCategory === category.name
                    ? "bg-light_primary hover:bg-light_primary/70 text-white"
                    : "hover:bg-light_primary hover:text-white text-light_primary"
                } rounded-[10px]
              `}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, length).map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <div
                key={project.id}
                className="group min-h-52 relative overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300"
              >
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Bottom-left gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-light_primary/50 to-transparent 
    p-4 text-white opacity-70 group-hover:hidden transition-all duration-300 flex items-end"
                >
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-light_primary/70 opacity-0 transition-all duration-500 group-hover:opacity-100 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.name}
                    </h3>
                    <p>{project.category.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
