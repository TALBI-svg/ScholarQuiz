"use client";

import React, { createContext, useContext, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  startNavigation: (href: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // We can use this to wrap navigation calls
  const startNavigation = (href: string) => {
    setIsLoading(true);
    // In a real Next.js app, we might use router.push inside startTransition
    // but for this simple implementation, we'll just set the state.
    window.location.href = href;
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, startNavigation }}>
      {children}
      {(isLoading || isPending) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <h2 className="text-xl font-bold">Chargement du concours...</h2>
            <p className="text-muted-foreground">Préparation de vos questions de haute qualité.</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
