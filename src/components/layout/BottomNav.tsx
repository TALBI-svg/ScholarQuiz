"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, href: "/dashboard" },
  { label: "Quizzes", icon: BookOpen, href: "/dashboard#categories" },
];

export function BottomNav() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-card border-t border-border px-8 py-4 z-50 flex items-center justify-around md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
