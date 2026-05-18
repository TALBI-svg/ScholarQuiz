import { Settings, Award, Clock, BookOpen, Star, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Completed", value: "42", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Avg Score", value: "78%", icon: Award, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Hours spent", value: "12.5", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
];

const favoriteSubjects = [
  { id: "math", name: "Mathematics", mastery: 85 },
  { id: "history", name: "Modern History", mastery: 92 },
  { id: "physics", name: "Physics", mastery: 64 },
  { id: "literature", name: "Literature", mastery: 77 },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">My Profile</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      {/* User Card */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-card p-6 md:p-8 rounded-[2rem] shadow-sm border border-border/30">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
          <AvatarImage src="https://picsum.photos/seed/user123/200/200" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold">John Doe</h2>
          <p className="text-base text-muted-foreground font-medium">Premium Scholar • Class of 2025</p>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="h-4 w-4 text-primary fill-primary" />
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-4 rounded-full px-6">Edit Profile</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="flex flex-row md:flex-col items-center gap-4 p-5 bg-card rounded-3xl shadow-sm border border-border/30"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-left md:text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Mastery Sections */}
        <section>
          <h3 className="text-xl font-bold font-headline mb-6">Subject Mastery</h3>
          <div className="flex flex-col gap-4">
            {favoriteSubjects.map((subject) => (
              <div key={subject.id} className="bg-card p-5 rounded-2xl shadow-sm border border-border/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm md:text-base">{subject.name}</span>
                  <span className="text-xs md:text-sm font-bold text-primary">{subject.mastery}%</span>
                </div>
                <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--primary),0.3)]" 
                    style={{ width: `${subject.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Settings List */}
        <section>
          <h3 className="text-xl font-bold font-headline mb-6">Account Settings</h3>
          <div className="flex flex-col gap-3">
            {[
              "Privacy & Security", 
              "Subscription Plan", 
              "Notification Preferences",
              "Help & Support", 
              "Logout"
            ].map((item) => (
              <Button 
                key={item} 
                variant="ghost" 
                className={cn(
                  "w-full justify-between h-14 rounded-2xl px-6 font-semibold hover:bg-card border border-transparent hover:border-border/30 text-base",
                  item === "Logout" ? "text-destructive hover:text-destructive hover:bg-destructive/5" : ""
                )}
              >
                {item}
                <ChevronRight className="h-5 w-5 opacity-50" />
              </Button>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
