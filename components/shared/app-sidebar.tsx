"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardSquare01Icon,
  MapsSearchIcon,
  Settings01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const sidebarNavigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: DashboardSquare01Icon,
  },
  {
    title: "Locations",
    href: "/locations",
    icon: MapsSearchIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings01Icon,
  },
  {
    title: "About",
    href: "/about",
    icon: UserCircleIcon,
  },
];

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-3">
          {sidebarNavigation.map((item) => (
            <Link key={item.title} href={item.href} className="inline-block">
              <SidebarMenuItem className="flex items-center justify-start">
                <SidebarMenuButton
                  tooltip={item.title}
                  size={"lg"}
                  className={cn(pathname === item.href && "bg-sidebar-accent", "cursor-pointer")}
                >
                  {item.icon && (
                    <HugeiconsIcon
                      icon={item.icon}
                      size={128}
                      strokeWidth={2}
                    />
                  )}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <a
          href="https://github.com/Mangesh636"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SidebarMenuButton size="lg" className="cursor-pointer">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={"https://github.com/mangesh636.png"}
                alt={"Mangesh Bhardwaj"}
              />
              <AvatarFallback className="rounded-lg">MB</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Mangesh Bhardwaj</span>
            </div>
          </SidebarMenuButton>
        </a>
      </SidebarFooter>
    </Sidebar>
  );
};
