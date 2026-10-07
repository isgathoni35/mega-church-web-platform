import React from "react";
import Link from "next/link";
import { Users, Calendar, Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VolunteerCta() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-[#fbf8f3] px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Floating Framed Dark Feature Card */}
        <div className="relative rounded-3xl bg-[#0f172a] text-white p-6 sm:p-12 lg:p-14 text-center overflow-hidden shadow-2xl border border-slate-800 space-y-4 sm:space-y-6">
          {/* Subtle background ambient orange glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#ff6b35]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-3 sm:space-y-5">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
              <Users className="h-3.5 w-3.5" />
              <span>Community &amp; Fellowship Visits</span>
            </div>

            {/* Script Subtitle */}
            <p className="font-script text-2xl sm:text-4xl text-[#ff6b35]">
              Bring Joy &amp; Presence
            </p>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Want to Spend Time With the Children?
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We warmly welcome partners, volunteers, and well-wishers to share a meal,
              mentor the children, celebrate birthdays, and experience the pure joy of
              God&apos;s love together in person.
            </p>

            {/* Visiting Days Badge */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs text-white/90 font-medium">
                <Calendar className="h-3.5 w-3.5 text-[#ff6b35]" />
                <span>Visiting Days: Saturdays &amp; Sundays by Prior Appointment</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold shadow-lg shadow-orange-500/25 px-8 py-3.5 sm:py-6 text-sm sm:text-base rounded-full h-auto transition-all"
                asChild
              >
                <Link href="/orphanage/donate">
                  <Heart className="mr-2 h-4 w-4 fill-current" />
                  <span>Donate to Children&apos;s Home</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 sm:py-6 text-sm sm:text-base rounded-full border border-white/20 h-auto transition-all"
                asChild
              >
                <Link href="/contact?subject=orphanage_visit">
                  <span>Arrange a Visit</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
