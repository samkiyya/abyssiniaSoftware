import React from "react";
import Service from "./Service";
// import InteractiveScroll from "../Animation/InteractiveScroll";
import { getServices } from "@/lib/services/services.service";

export default async function Services({
  title,
  length,
}: {
  title?: string;
  length?: number;
}) {
  const services = await getServices();
  return (
    <div className="mx-auto px-4 py-24 bg-white flex flex-col items-center justify-center pb-8">
      <h2 className="text-4xl font-bold text-light_primary mb-2">{title}</h2>
      {/* <InteractiveScroll> */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.slice(0, length).map((service, index) => (
          <Service key={index} service={service} />
        ))}
      </div>
      {/* </InteractiveScroll> */}
    </div>
  );
}
