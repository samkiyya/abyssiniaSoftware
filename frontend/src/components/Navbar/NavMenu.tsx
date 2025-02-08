"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "FAQs",
    href: "/faqs",
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "Blog Detail Page",
    href: "/blog-detail",
  },
];

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-gray-300">
            Menu
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      )}
                    >
                      <div className="text-sm font-medium leading-none">
                        {item.title}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
