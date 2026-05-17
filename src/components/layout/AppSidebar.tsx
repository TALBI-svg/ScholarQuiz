
"use client";

import { Home, User, BookOpen, Trophy, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Quizzes", icon: BookOpen, href: "/#categories" },
  { label: "Stats", icon: Trophy, href: "/profile" },
  { label: "Profile", icon: User, href: "/profile" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="hidden md:flex border-r">
      <SidebarHeader className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Star className="text-primary-foreground h-5 w-5 fill-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-headline text-primary">ScholarQuiz</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href} className="flex items-center gap-3 p-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
