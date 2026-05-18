"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from "next/navigation";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (pathname === "/") return null;

  return (
    <footer className="w-full py-10 px-6 border-t border-border/40 text-center mt-auto pb-32 md:pb-10">
      <p className="text-sm text-muted-foreground">
        &copy; {year || "..."} Preparer au Concours. All rights reserved.
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Developed by{" "}
        <Link 
          href="https://talbi-svg.github.io/AbdelkaderTalbi.github.io/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          DevSphere
        </Link>
      </p>
    </footer>
  );
}
