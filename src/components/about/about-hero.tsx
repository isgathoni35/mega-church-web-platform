import React from "react";
import { History } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] text-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-200/80">
      {/* Background warm ambient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-4">
        {/* Milestone Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-xs sm:text-sm font-bold uppercase tracking-widest shadow-sm">
          <History className="h-4 w-4" />
          <span>Est. 2000 • 25+ Years of Supernatural Impact</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          From a Humble Beginning to a Global Ministry of{" "}
          <span className="text-[#ff6b35]">Deliverance</span>
        </h1>
        <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

        {/* Subtext */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Discover how God transformed a life and birthed an apostolic movement committed to
          breaking chains, releasing covenant overflow, and manifesting kingdom power across
          nations.
        </p>
      </div>
    </section>
  );
}
