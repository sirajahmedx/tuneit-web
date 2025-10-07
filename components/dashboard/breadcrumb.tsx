"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

function BreadCrumb() {
  const pathname = usePathname();

  function getPathSegments(path: string): string[] {
    return path.split("/").filter(Boolean);
  }

  const segments = getPathSegments(pathname);
  console.log(segments);

  if (segments.length < 2) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-4">
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem
                className={
                  index === segments.length - 1 ? "" : "hidden md:block"
                }
              >
                {index === segments.length - 1 ? (
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={`/${segments.slice(0, index + 1).join("/")}`}
                  >
                    {segment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < segments.length - 1 && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumb;
