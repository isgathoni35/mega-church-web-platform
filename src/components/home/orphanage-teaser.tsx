import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrphanageTeaser() {
  return (
    <section className="py-16 bg-secondary/60 text-foreground border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 overflow-hidden shadow-2xl border-2 border-accent/40">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider">
                <Heart className="h-3.5 w-3.5 fill-current" />
                <span>Heavens Gates Compassion Wing</span>
              </div>

              <div className="space-y-1">
                <span className="font-script text-2xl sm:text-3xl text-accent block">
                  A Haven of Hope
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Discover Our Children&apos;s Home
                </h3>
              </div>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Rescuing, sheltering, and raising orphaned and vulnerable children with the
                unconditional love of Christ. Providing daily nutrition, 100% schooling, and
                family warmth.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-accent font-semibold">
                <span className="flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5" /> 60+ Sheltered Children
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> 100% In School
                </span>
              </div>
            </div>

            {/* Right Action */}
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-accent hover:brightness-105 text-accent-foreground font-bold shadow-xl px-8 py-6 text-base"
                asChild
              >
                <Link href="/orphanage">
                  Discover Our Children&apos;s Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
