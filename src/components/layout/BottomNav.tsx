
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, BookOpen, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Quizzes", icon: BookOpen, href: "/#categories" },
  { label: "Stats", icon: Trophy, href: "/profile" },
  { label: "Profile", icon: User, href: "/profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-card border-t border-border px-6 py-3 z-50 flex items-center justify-between md:hidden">
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
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
