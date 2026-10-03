import React from "react";
import Link from "next/link";
import { Mountain, Flame, Moon, Compass, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrayerMountain() {
  return (
    <section className="relative py-20 lg:py-24 bg-[#fbf8f3] text-slate-900 overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-xs font-bold uppercase tracking-widest shadow-sm">
              <Mountain className="h-3.5 w-3.5" />
              <span>Sacred Mountain of Encounter</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight leading-tight">
                The 24/7 Prayer Mountain &amp; Sacred Retreat Ground
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Modeled after the ancient scriptural altars of fasting and divine visitation, our
              consecrated Prayer Mountain serves as an unbroken altar of fire where believers
              separate themselves from worldly noise to seek the face of Almighty God.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#ff6b35]">
                    <Flame className="h-4 w-4" />
                  </div>
                  <span>Consecrated Fasting Retreats</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dedicated cabins and prayer rooms for 3, 7, and 21-day dry and water fasts with
                  pastoral spiritual guidance.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#ff6b35]">
                    <Moon className="h-4 w-4" />
                  </div>
                  <span>Weekly All-Night Kesha Vigils</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every Friday midnight until dawn—intensive spiritual warfare, apostolic praise,
                  and deliverance under the open heaven.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold rounded-full shadow-lg shadow-orange-500/20 px-8 py-6 text-sm"
                asChild
              >
                <Link href="/contact">
                  Learn About Prayer Retreats
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-800 bg-white hover:bg-slate-50 font-bold rounded-full px-8 py-6 text-sm shadow-sm"
                asChild
              >
                <Link href="/prayer-request">
                  Send Altar Petition
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Testimonial & Scripture Plate */}
          <div className="lg:col-span-5">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-[#0f172a] text-white border border-slate-800 shadow-2xl space-y-6 text-center">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[#ff6b35] shadow-inner">
                <Mountain className="h-8 w-8" />
              </div>

              <blockquote className="space-y-3">
                <p className="font-serif italic text-lg sm:text-xl text-white/95 leading-relaxed">
                  &ldquo;And it shall come to pass in the last days, that the mountain of the
                  LORD&apos;s house shall be established in the top of the mountains, and shall
                  be exalted above the hills; and all nations shall flow unto it.&rdquo;
                </p>
                <footer className="text-xs uppercase font-bold text-[#ff6b35] tracking-widest">
                  — Isaiah 2:2 (KJV)
                </footer>
              </blockquote>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
                Open 365 days a year for solitary communion, ministry retreats, and divine
                encounters. Located on the serene sacred prayer grounds.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
