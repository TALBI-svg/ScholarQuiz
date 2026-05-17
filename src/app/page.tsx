"use client";

import { useState } from "react";
import { Search, Play, BookOpen, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { BottomNav } from "@/components/layout/BottomNav";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const categories = [
  { id: "dev", name: "MINISTERE DE LA JUSTICE Date : 07/01/2024 Dev", count: "120+ Questions", color: "bg-blue-100" },
  { id: "physics", name: "Physics", count: "85+ Questions", color: "bg-purple-100" },
  { id: "history", name: "History", count: "200+ Questions", color: "bg-orange-100" },
  { id: "biology", name: "Biology", count: "90+ Questions", color: "bg-green-100" },
  { id: "literature", name: "Literature", count: "150+ Questions", color: "bg-red-100" },
  { id: "chemistry", name: "Chemistry", count: "110+ Questions", color: "bg-cyan-100" },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Header - Mobile Only */}
      <div className="flex items-center justify-between md:hidden">
        <div>
          <h1 className="text-xl font-bold font-headline text-primary">Preparer au Concours</h1>
          <p className="text-muted-foreground text-xs">Prepare for your success</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Star className="text-primary h-5 w-5 fill-primary" />
        </div>
      </div>

      {/* Hero Action */}
      <Card className="bg-card text-card-foreground border-none overflow-hidden shadow-md relative">
        <CardContent className="p-6 md:p-10">
          <div className="relative z-10 flex flex-col gap-4 max-w-full md:max-w-[60%]">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Ready to practice for your next concours?</h2>
            <p className="text-muted-foreground text-sm md:text-base">Jump into a quick AI-powered quiz session tailored to your current level and targets.</p>
            <Link href="/quiz/dev">
              <Button variant="default" size="lg" className="mt-2 w-fit rounded-full gap-2 font-semibold px-8 shadow-sm">
                <Play className="h-5 w-5 fill-current" /> Start Practice
              </Button>
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 opacity-5 md:opacity-10 pointer-events-none hidden sm:block">
            <BookOpen className="h-48 w-48 md:h-64 md:w-64 -rotate-12 translate-x-8 translate-y-8" />
          </div>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for subjects, topics, or previous concours..." 
          className="pl-12 h-14 rounded-2xl bg-card border-none shadow-sm text-base w-full"
        />
      </div>

      {/* Categories */}
      <section id="categories">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold font-headline">Concours Categories</h3>
          <Button variant="link" className="text-primary p-0">See all</Button>
        </div>
        
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredCategories.map((category) => {
              const img = PlaceHolderImages.find(p => p.id === category.id) || PlaceHolderImages.find(p => p.id === 'dev');
              return (
                <Link key={category.id} href={`/quiz/${category.id}`}>
                  <Card className="bg-card shadow-sm hover:shadow-md transition-all border border-border/50 rounded-3xl overflow-hidden cursor-pointer group">
                    <div className="relative h-40 md:h-48 w-full bg-accent/5">
                      <Image 
                        src={img?.imageUrl || ""} 
                        alt={category.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={img?.imageHint}
                      />
                    </div>
                    <CardContent className="p-3">
                      <p className="font-bold text-[10px] md:text-xs leading-tight min-h-[3rem] line-clamp-3">{category.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{category.count}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-3xl shadow-sm">
            <p className="text-muted-foreground">No categories found matching "{searchQuery}"</p>
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
}
