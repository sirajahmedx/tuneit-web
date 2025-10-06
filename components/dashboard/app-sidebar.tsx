"use client";

import {
  Briefcase,
  CircleDollarSign,
  History,
  Home,
  Search,
  Star,
  User,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Services",
      url: "/services",
      icon: Briefcase,
      isActive: true,
      items: [
        {
          title: "Active Services",
          url: "/",
          icon: CircleDollarSign,
        },
        {
          title: "Service History",
          url: "/",
          icon: History,
        },
      ],
    },
  ],
  links: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">TuneIt</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu className="space-y-1">
          {data.links.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="gap-4 px-3">
                <a href={item.url} className="flex items-center py-2">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="mt-4">
          <NavMain items={data.navMain} />
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
