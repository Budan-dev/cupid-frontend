import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Communities",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Messages",
    url: "#",
    icon: Calendar,
  },
  //   {
  //     title: "",
  //     url: "#",
  //     icon: Search,
  //   },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-64 h-screen flex-shrink-0 bg-[--sidebar-bg-light] dark:bg-[--sidebar-bg-dark] text-[--sidebar-text-light] dark:text-[--sidebar-text-dark] border-r border-gray-200 dark:border-slate-800 transition-colors duration-200">
      <SidebarContent>
        <div className="h-full flex flex-col items-center justify-start px-4 py-6">
          <div className="w-full mb-6 flex items-center justify-center">
            <a
              href="#"
              className="text-lg font-bold tracking-wide text-gray-800 dark:text-white"
            >
              Cupid Heart
            </a>
          </div>

          <SidebarGroup className="w-full">
            <SidebarGroupContent>
              <SidebarMenu className="w-full space-y-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <a href={item.url} className="w-full flex items-center">
                        <item.icon className="w-5 h-5 flex-shrink-0 text-gray-700 dark:text-slate-300" />
                        <span className="ml-3 text-sm font-medium">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
