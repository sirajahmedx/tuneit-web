import { AppSidebar } from "@/components/dashboard/app-sidebar";
import BreadCrumb from "@/components/dashboard/breadcrumb";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex h-screen">
          <SidebarTrigger className="-ml-1" />
          <AppSidebar />
          <div className="flex-1 flex flex-col overflow-hidden ">
            <div className="flex-1 overflow-x-hidden overflow-y-auto">
              <div className="mx-auto px-3 py-8">
                <BreadCrumb />
                {children}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
