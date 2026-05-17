
import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'ScholarQuiz | Concours Exam Prep',
  description: 'A modern mobile-first quiz app for students preparing for concours exams.',
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
      <body className="font-body antialiased min-h-screen bg-background text-foreground pb-20 sm:pb-0">
        <main className="max-w-md mx-auto min-h-screen bg-background shadow-xl sm:border-x border-border/50 relative">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
