"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Sanctuary Application Runtime Error]:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#fbf8f3] px-4 py-16 text-slate-900">
      <div className="max-w-xl mx-auto text-center space-y-6">
        {/* Error Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/10">
          <AlertTriangle className="w-10 h-10" />
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-black uppercase tracking-wider">
            Temporary System Interruption
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Peace Be With You
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            We encountered an unexpected error while loading this page. Our technical team has been notified. You may retry or return to the main sanctuary.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={() => reset()}
            className="w-full sm:w-auto bg-[#ff6b35] hover:bg-[#ea580c] text-white font-bold rounded-full px-7 py-3 text-xs sm:text-sm shadow-md shadow-orange-500/20"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            <span>Try Again</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border-slate-200 font-bold rounded-full px-6 py-3 text-xs sm:text-sm"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2 text-[#ff6b35]" />
              <span>Return Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
