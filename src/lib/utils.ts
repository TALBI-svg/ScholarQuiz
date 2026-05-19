import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the correct path for an asset, taking into account the basePath for GitHub Pages.
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // Avoid double slashes and ensure path starts with a slash if it's relative
  const normalizedPath = path.startsWith('http') ? path : (path.startsWith('/') ? path : `/${path}`);
  
  if (path.startsWith('http')) return path;
  
  return `${basePath}${normalizedPath}`;
}
