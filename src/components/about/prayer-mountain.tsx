import React from "react";
import Link from "next/link";
import { Mountain, Flame, Moon, Compass, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrayerMountain() {
  return (
    <section className="relative py-20 lg:py-28 bg-primary text-primary-foreground overflow-hidden border-t border-white/10">
      {/* Background visual accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-widest shadow-sm">
              <Mountain className="h-3.5 w-3.5 fill-current" />
              <span>Sacred Mountain of Encounter</span>
            </div>

            <div className="space-y-2">
              <span className="font-script text-accent text-3xl sm:text-4xl block">
                The Mountain of the Lord
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                The 24/7 Prayer Mountain &amp; Sacred Retreat Ground
              </h2>
            </div>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              Modeled after the ancient scriptural altars of fasting and divine visitation, our
              consecrated Prayer Mountain serves as an unbroken altar of fire where believers
              separate themselves from worldly noise to seek the face of Almighty God.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                  <Flame className="h-4 w-4" />
                  <span>Consecrated Fasting Retreats</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Dedicated cabins and prayer rooms for 3, 7, and 21-day dry and water fasts with
                  pastoral spiritual guidance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                  <Moon className="h-4 w-4" />
                  <span>Weekly All-Night Kesha Vigils</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Every Friday midnight until dawn—intensive spiritual warfare, apostolic praise,
                  and deliverance under the open heaven.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-accent hover:brightness-105 text-accent-foreground font-bold shadow-xl px-8"
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
                className="border-white/30 text-white hover:bg-white/10 font-semibold"
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
            <div className="relative p-8 rounded-3xl bg-black/30 border-2 border-accent/40 shadow-2xl backdrop-blur-md space-y-6 text-center">
              <div className="h-16 w-16 mx-auto rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-accent shadow-inner">
                <Mountain className="h-8 w-8" />
              </div>

              <blockquote className="space-y-3">
                <p className="font-serif italic text-lg sm:text-xl text-white/95 leading-relaxed">
                  &ldquo;And it shall come to pass in the last days, that the mountain of the
                  LORD&apos;s house shall be established in the top of the mountains, and shall
                  be exalted above the hills; and all nations shall flow unto it.&rdquo;
                </p>
                <footer className="text-xs uppercase font-bold text-accent tracking-widest">
                  — Isaiah 2:2 (KJV)
                </footer>
              </blockquote>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/75 leading-relaxed">
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
