"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "About Us", href: "/about-us" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full py-4 transition-all duration-300 z-50 top-0 ${
        isScrolled
          ? "bg-white shadow-md text-gray-800"
          : "bg-transparent text-white"
      }`}
    >
      <div className="relative gap-8 flex justify-between items-center px-4 md:px-10">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-20 h-14">
            <Image
              src="/logo.png"
              fill
              alt="Abyssinia Software Solutions logo"
              className="object-cover"
            />
          </div>
        </Link>

        <div className="items-center space-x-8 hidden md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`font-semibold transition-all duration-200 ${"hover:text-light_primary/90"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Menu className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <div className="relative w-20 h-14 flex mx-auto">
                    <Image
                      src="/logo.png"
                      fill
                      alt="Abyssinia Software Solutions logo"
                      className="object-cover"
                    />
                  </div>
                </SheetTitle>
                <SheetDescription>
                  Your Trusted software Company
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4 divide-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`font-semibold transition-all duration-200 ${"hover:text-light_primary/90"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
