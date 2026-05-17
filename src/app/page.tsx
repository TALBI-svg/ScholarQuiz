
import { Search, Play, ChevronRight, BookOpen, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { BottomNav } from "@/components/layout/BottomNav";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const categories = [
  { id: "math", name: "Mathematics", count: "120+ Questions", color: "bg-blue-100" },
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
  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline text-primary">ScholarQuiz</h1>
          <p className="text-muted-foreground text-sm">Prepare for your success</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Star className="text-primary h-5 w-5 fill-primary" />
        </div>
      </div>

      {/* Hero Action */}
      <Card className="bg-primary text-primary-foreground border-none overflow-hidden shadow-lg relative">
        <CardContent className="p-6">
          <div className="relative z-10 flex flex-col gap-2 max-w-[70%]">
            <h2 className="text-xl font-bold">Ready to practice?</h2>
            <p className="text-primary-foreground/80 text-sm">Jump into a quick AI-powered quiz session.</p>
            <Link href="/quiz/math">
              <Button variant="secondary" className="mt-2 w-fit rounded-full gap-2 font-semibold">
                <Play className="h-4 w-4 fill-current" /> Start Quiz
              </Button>
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
            <BookOpen className="h-32 w-32 -rotate-12 translate-x-4 translate-y-4" />
          </div>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search for subjects or topics..." 
          className="pl-10 h-12 rounded-xl bg-card border-none shadow-sm"
        />
      </div>

      {/* Categories */}
      <section id="categories">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold font-headline">Exam Categories</h3>
          <Button variant="link" className="text-primary p-0">See all</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => {
            const img = PlaceHolderImages.find(p => p.id === category.id);
            return (
              <Link key={category.id} href={`/quiz/${category.id}`}>
                <Card className="hover:shadow-md transition-all border-none rounded-2xl overflow-hidden cursor-pointer group">
                  <div className="relative h-24 w-full">
                    <Image 
                      src={img?.imageUrl || ""} 
                      alt={category.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform"
                      data-ai-hint={img?.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  <CardContent className="p-3">
                    <p className="font-semibold text-sm">{category.name}</p>
                    <p className="text-[10px] text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Quizzes */}
      <section>
        <h3 className="text-lg font-bold font-headline mb-4">Recent Quizzes</h3>
        <div className="flex flex-col gap-3">
          {recentQuizzes.map((quiz) => (
            <div 
              key={quiz.id} 
              className="flex items-center justify-between p-4 bg-card rounded-2xl shadow-sm border border-border/30"
            >
              <div className="flex gap-3 items-center">
                <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{quiz.title}</p>
                  <p className="text-[10px] text-muted-foreground">{quiz.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                  {quiz.score}
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
