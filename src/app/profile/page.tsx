
import { Settings, Award, Clock, BookOpen, Star, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/layout/BottomNav";

const stats = [
  { label: "Completed", value: "42", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Avg Score", value: "78%", icon: Award, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Hours spent", value: "12.5", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
];

const favoriteSubjects = [
  { id: "math", name: "Mathematics", mastery: 85 },
  { id: "history", name: "Modern History", mastery: 92 },
  { id: "physics", name: "Physics", mastery: 64 },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">My Profile</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* User Card */}
      <div className="flex items-center gap-4 bg-card p-4 rounded-3xl shadow-sm border border-border/30">
        <Avatar className="h-20 w-20 border-4 border-background">
          <AvatarImage src="https://picsum.photos/seed/user123/200/200" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-sm text-muted-foreground">Premium Scholar</p>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3].map(i => (
              <Star key={i} className="h-3 w-3 text-primary fill-primary" />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="flex flex-col items-center gap-2 p-3 bg-card rounded-2xl shadow-sm border border-border/30"
          >
            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mastery Sections */}
      <section>
        <h3 className="text-lg font-bold font-headline mb-4">Subject Mastery</h3>
        <div className="flex flex-col gap-4">
          {favoriteSubjects.map((subject) => (
            <div key={subject.id} className="bg-card p-4 rounded-2xl shadow-sm border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{subject.name}</span>
                <span className="text-xs font-bold text-primary">{subject.mastery}%</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-1000" 
                  style={{ width: `${subject.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Settings List */}
      <section>
        <h3 className="text-lg font-bold font-headline mb-4">Account</h3>
        <div className="flex flex-col gap-2">
          {["Privacy Settings", "Help Center", "Logout"].map((item) => (
            <Button 
              key={item} 
              variant="ghost" 
              className={cn(
                "w-full justify-between h-14 rounded-2xl px-4 font-medium hover:bg-card border border-transparent hover:border-border/30",
                item === "Logout" ? "text-destructive" : ""
              )}
            >
              {item}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
