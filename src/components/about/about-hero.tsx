import React from "react";
import { Sparkles, History, Flame } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative bg-primary text-primary-foreground py-20 lg:py-28 px-4 sm:px-8 overflow-hidden border-b border-white/10">
      {/* Background radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-primary/60 to-primary pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Milestone Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-sm">
          <History className="h-4 w-4 fill-current" />
          <span>Est. 2000 • 25+ Years of Supernatural Impact</span>
        </div>

        {/* Script Accent */}
        <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent">
          The Story of Divine Mandate
        </p>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          From a Humble Beginning to a Global Ministry of Deliverance
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Discover how God transformed a life and birthed an apostolic movement committed to
          breaking chains, releasing covenant overflow, and manifesting kingdom power across
          nations.
        </p>
      </div>
    </section>
  );
}
