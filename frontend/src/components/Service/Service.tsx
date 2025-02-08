import React from "react";
import Link from "next/link";
import { Service as ServiceType } from "@/types/service.type";
import Image from "next/image";

export default function Service({ service }: { service: ServiceType }) {
  return (
    <div className="bg-white p-6 max-w-sm rounded-lg min-h-72 shadow-lg flex flex-col items-center text-center">
      <Link href={`/services/${service.id}`}>
        <div className="grow flex flex-col items-center justify-center">
          {/* <Icon className="w-12 h-12 mb-4 text-light_primary" /> */}
          <div className="relative rounded-[10px] overflow-hidde h-32 w-36">
            <Image
              src={service.image}
              alt="Abyssinia"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
            <div className="-z-10 h-full w-full flex bg-gray-200 justify-center items-center">
              Abyssinia Software Solutions
            </div>
          </div>

          <h3 className="text-xl px-2 font-semibold mb-2 text-light_primary">
            {service.title}
          </h3>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">
          {service.description}
        </p>
      </Link>
    </div>
  );
}
