"use client";

import { useState } from "react";
import { Search, Play, ChevronRight, BookOpen, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { BottomNav } from "@/components/layout/BottomNav";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const categories = [
  { id: "math", name: "MINISTERE DE LA JUSTICE Date : 07/01/2024 Dev", count: "120+ Questions", color: "bg-blue-100" },
  { id: "physics", name: "Physics", count: "85+ Questions", color: "bg-purple-100" },
  { id: "history", name: "History", count: "200+ Questions", color: "bg-orange-100" },
  { id: "biology", name: "Biology", count: "90+ Questions", color: "bg-green-100" },
  { id: "literature", name: "Literature", count: "150+ Questions", color: "bg-red-100" },
  { id: "chemistry", name: "Chemistry", count: "110+ Questions", color: "bg-cyan-100" },
];

const recentQuizzes = [
  { id: "1", title: "General Mathematics", score: "85%", date: "2 days ago" },
  { id: "2", title: "Modern History", score: "92%", date: "Yesterday" },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-6 pb-24 md:pb-8">
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

      {/* Hero Action - White with Shadow */}
      <Card className="bg-card text-card-foreground border-none overflow-hidden shadow-md relative">
        <CardContent className="p-6 md:p-10">
          <div className="relative z-10 flex flex-col gap-4 max-w-full md:max-w-[60%]">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Ready to practice for your next concours?</h2>
            <p className="text-muted-foreground text-sm md:text-base">Jump into a quick AI-powered quiz session tailored to your current level and targets.</p>
            <Link href="/quiz/math">
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
          <Button variant="link" className="text-primary p-0">See all categories</Button>
        </div>
        
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredCategories.map((category) => {
              const img = PlaceHolderImages.find(p => p.id === category.id);
              return (
                <Link key={category.id} href={`/quiz/${category.id}`}>
                  <Card className="bg-card shadow-md hover:shadow-lg transition-all border-none rounded-3xl overflow-hidden cursor-pointer group">
                    <div className="relative h-32 md:h-40 w-full">
                      <Image 
                        src={img?.imageUrl || ""} 
                        alt={category.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={img?.imageHint}
                      />
                      <div className="absolute inset-0 bg-black/5" />
                    </div>
                    <CardContent className="p-4">
                      <p className="font-bold text-[11px] md:text-xs leading-tight min-h-[3rem] line-clamp-none">{category.name}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{category.count}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-3xl shadow-md">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground font-medium">No categories found matching "{searchQuery}"</p>
          </div>
        )}
      </section>

      {/* Recent Quizzes & Stats Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-xl font-bold font-headline mb-4">Recent Activity</h3>
          <div className="flex flex-col gap-3">
            {recentQuizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                className="flex items-center justify-between p-4 bg-card rounded-2xl shadow-sm border border-border/30 hover:bg-accent/5 transition-colors cursor-pointer"
              >
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base">{quiz.title}</p>
                    <p className="text-xs text-muted-foreground">{quiz.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1 text-sm font-bold">
                    {quiz.score}
                  </Badge>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-3xl p-6 flex flex-col justify-center border border-border/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <TrophyIcon className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-bold font-headline">Weekly Progress</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">You've completed 5 quizzes this week. You're in the top 15% of students in your region!</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 0, 0].map((val, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex-1 h-12 rounded-lg",
                  val > 0 ? "bg-primary" : "bg-primary/10"
                )} 
              />
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
