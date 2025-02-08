"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";

export default function Tabs() {
  const path = usePathname();
  const pathSegments = path.split("/").filter(Boolean); // Split path into segments and remove empty strings

  const renderBreadcrumbs = () => {
    // Always start with "Home"
    const homeBreadcrumb = (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-base text-light_primary">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.length > 0 && <BreadcrumbSeparator />}
      </>
    );

    const isLastSegment = (index: number) => index === pathSegments.length - 1;

    // Check if the second segment is "blog," "service," or "project"
    if (
      pathSegments.length > 1 &&
      ["blogs", "services", "projects"].includes(pathSegments[0])
    ) {
      return (
        <>
          {homeBreadcrumb}
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${pathSegments.slice(0, 1).join("/")}`}
              className="text-base text-light_primary capitalize font-bold"
            >
              {pathSegments[0]}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </>
      );
    }

    if (pathSegments.length === 1) {
      // Single segment (e.g., "/service")
      return (
        <>
          {homeBreadcrumb}
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${pathSegments[0]}`}
              className={`text-base text-light_primary capitalize ${
                isLastSegment(0) ? "font-bold" : ""
              }`}
            >
              {pathSegments[0]}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </>
      );
    } else if (pathSegments.length === 2) {
      // Two segments (e.g., "/service/something")
      return (
        <>
          {homeBreadcrumb}
          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  className={`text-base text-light_primary capitalize ${
                    isLastSegment(index) ? "font-bold" : ""
                  }`}
                >
                  {segment}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </>
      );
    } else if (pathSegments.length > 2) {
      // More than two segments (e.g., "/service/something/extra")
      return (
        <>
          {homeBreadcrumb}
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4 text-light_primary" />
                <span className="sr-only text-light_primary">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {pathSegments.slice(1, -1).map((segment, index) => (
                  <DropdownMenuItem key={index} className="capitalize">
                    {segment}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathSegments.slice(-2).map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/${pathSegments.slice(0, -2 + index + 1).join("/")}`}
                  className={`text-base text-light_primary capitalize ${
                    isLastSegment(pathSegments.length - 2 + index)
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {segment}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </>
      );
    }

    return null;
  };

  return (
    <div className="text-base px-5 absolute inset-0 left-5 top-14">
      <Breadcrumb>
        <BreadcrumbList className="items-center">
          {renderBreadcrumbs()}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
