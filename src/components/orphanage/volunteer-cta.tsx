import React from "react";
import Link from "next/link";
import { Users, Calendar, Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VolunteerCta() {
  return (
    <section className="relative py-20 lg:py-24 bg-primary text-primary-foreground overflow-hidden">
      {/* Subtle radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-widest shadow-sm">
          <Users className="h-3.5 w-3.5" />
          <span>Community &amp; Fellowship Visits</span>
        </div>

        <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent">
          Bring Joy &amp; Presence
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Want to Spend Time With the Children?
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Want to spend time with the children or arrange a group visit? We welcome partners,
          volunteers, and well-wishers to share a meal, mentor the children, and experience the pure
          joy of God&apos;s love.
        </p>

        {/* Visit Times Card */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-white/90">
          <Calendar className="h-4 w-4 text-accent" />
          <span>Visiting Days: Saturdays &amp; Sundays by Prior Pastoral Appointment</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold shadow-xl px-8 py-6 text-base"
            asChild
          >
            <Link href="/contact?subject=orphanage_visit">
              Arrange a Visit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="lg"
            className="bg-accent hover:brightness-105 text-accent-foreground font-bold shadow-xl px-8 py-6 text-base"
            asChild
          >
            <Link href="/give?fund=orphanage">
              <Heart className="mr-2 h-4 w-4 fill-current" />
              Sponsor From Afar
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
