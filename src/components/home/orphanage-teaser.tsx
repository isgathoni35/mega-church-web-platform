import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrphanageTeaser() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-[#fbf8f3] text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl bg-white text-slate-900 p-5 sm:p-8 lg:p-12 overflow-hidden shadow-xl border border-slate-200/80">
          {/* Subtle background warm ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-8">
            {/* Left Content */}
            <div className="space-y-2.5 sm:space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
                <span>Heavens Gates Compassion Wing</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Discover Our Children&apos;s Home
                </h3>
              </div>

              <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                Rescuing, sheltering, and raising orphaned and vulnerable children with the
                unconditional love of Christ. Providing daily nutrition, 100% schooling, and
                family warmth.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-5 pt-1 sm:pt-2 text-xs sm:text-sm text-[#ff6b35] font-bold">
                <span className="flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> 60+ Sheltered Children
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> 100% In School
                </span>
              </div>
            </div>

            {/* Right Action */}
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#ff6b35] hover:bg-[#f25c23] text-white border-0 font-bold shadow-lg shadow-orange-500/20 rounded-full px-6 py-3 sm:px-8 sm:py-6 text-sm sm:text-base h-auto"
                asChild
              >
                <Link href="/orphanage">
                  Visit Children&apos;s Home
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
