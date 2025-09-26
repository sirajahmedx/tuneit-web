// import { redirect } from "next/navigation";
// import React from "react";

// interface LayoutProps {
//   children: React.ReactNode;
//   params: Promise<{ role: string }>;
// }

// export default async function Layout({ children, params }: LayoutProps) {
//   const { role } = await params;
//   if (role !== "admin") {
//     redirect(`/dashboard/${role}`);
//   }
//   return <>{children}</>;
// }
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
