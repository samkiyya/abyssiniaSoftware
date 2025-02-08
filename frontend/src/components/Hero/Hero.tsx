"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className=" mx-auto grid min-h-[calc(100vh-10rem)] md:grid-cols-2 items-center px-4 z-20">
        <div className="relative hidden md:block">
          {/* <Image
            src="/logo.png"
            alt="AI Technology Illustration"
            width={600}
            height={600}
            className="relative z-10"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />
        </div>

        <div className="space-y-6" onClick={() => console.log("clicked")}>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Abyssinia <span className="">Software</span>
            <span className="block text-light_primary">Solution</span>
          </h1>
          <p className="text-lg text-gray-300">
            Delivering innovative and tailored software solutions designed to
            drive efficiency, scalability, and success for your business.
          </p>
          {/* <SocialIcons /> */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="text-white bg-light_primary hover:bg-light_primary/70 outline-none"
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

      {/* Background Pattern */}
      {/* <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
      </div> */}
    </div>
  );
}
