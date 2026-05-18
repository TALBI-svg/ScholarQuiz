"use client";

import React from "react";
import { User, Bell, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DashboardNavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function DashboardNavbar({ searchQuery, setSearchQuery }: DashboardNavbarProps) {
  return (
    <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md pb-4">
      <nav className="mx-6 pt-4">
        <div className="flex items-center justify-between h-16 px-6 bg-background border border-border/50 rounded-2xl shadow-lg shadow-primary/5">
          {/* Logo & Search */}
          <div className="flex items-center gap-8 flex-1 max-w-3xl">
            <div className="hidden lg:flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-black text-xs">SQ</span>
              </div>
              <span className="font-bold text-sm tracking-tight whitespace-nowrap">ScholarQuiz</span>
            </div>

            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher sur ScholarQuiz..." 
                className="pl-10 h-10 bg-accent/30 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20 w-full"
              />
            </div>
        </div>
      </div>
    </nav>
  </div>
);
}
