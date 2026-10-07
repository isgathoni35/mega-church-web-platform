import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts a clean direct image URL from raw strings, handling Google Images redirect URLs,
 * search parameters, and query wrappers.
 */
export function extractCleanImageUrl(raw?: string | null): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";

  try {
    if (
      trimmed.includes("google.com/imgres") ||
      trimmed.includes("google.co") ||
      (trimmed.includes("google.") && trimmed.includes("imgurl="))
    ) {
      const urlObj = new URL(trimmed);
      const imgurl = urlObj.searchParams.get("imgurl");
      if (imgurl) {
        return decodeURIComponent(imgurl).trim();
      }
    }
  } catch {
    // If URL parsing fails, proceed with raw trimmed
  }

  return trimmed;
}

