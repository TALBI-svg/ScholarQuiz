import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { LoadingProvider } from "@/components/providers/LoadingProvider";

export const metadata: Metadata = {
  title: 'ScholarQuiz | Concours Prep',
  description: 'A modern mobile-first quiz app for students preparing for concours.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <LoadingProvider>
          <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
            <main className="flex-1 w-full min-h-screen bg-background relative flex flex-col md:px-8 max-w-7xl mx-auto">
              <div className="flex-1 pb-20 md:pb-0">
                {children}
              </div>
              <Footer />
            </main>
            <BottomNav />
          </div>
        </SidebarProvider>
        </LoadingProvider>
        <Toaster />
      </body>
    </html>
  );
}
