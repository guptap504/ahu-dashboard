import { IconBuilding, IconHelp, IconHome, IconSearch, IconSettings } from "@tabler/icons-react";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Prashant Gupta",
    email: "prashant@garvata.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Portfolio",
      url: "/",
      icon: IconHome,
      isActive: true,
    },
    // {
    //   title: "AHU Units",
    //   url: "#",
    //   icon: IconWind,
    //   items: [
    //     {
    //       title: "All Units",
    //       url: "/",
    //     },
    //     {
    //       title: "Online Units",
    //       url: "#",
    //     },
    //     {
    //       title: "Offline Units",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartBar,
    //   items: [
    //     {
    //       title: "Performance",
    //       url: "#",
    //     },
    //     {
    //       title: "Energy Usage",
    //       url: "#",
    //     },
    //     {
    //       title: "Efficiency",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="/">
                <div className="flex items-center gap-2">
                  <IconBuilding className="size-5" />
                  <span className="text-base font-semibold">Garvata</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
