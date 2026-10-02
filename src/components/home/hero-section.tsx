"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Globe, Users, Award, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden py-24 sm:py-32 border-b border-accent/20">
      {/* Background Decorative Radial Glows & Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/15 via-primary to-primary pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Cross Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[40rem] font-serif select-none pointer-events-none leading-none">
        ✝
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-accent/40 text-accent text-xs sm:text-sm font-semibold mb-8 backdrop-blur shadow-sm animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span>Welcome to Heavens Gates Sugutta Fellowship Church International</span>
        </div>

        {/* Script Accent Subtitle */}
        <span className="font-script text-accent text-3xl sm:text-5xl block mb-3 font-normal drop-shadow">
          Get Ready for the Overflow!
        </span>

        {/* Main Headline */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Experience the Miraculous Power of God &amp;{" "}
          <span className="text-accent underline decoration-accent/40 decoration-wavy decoration-1 underline-offset-8">
            Divine Deliverance
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl text-base sm:text-xl text-white/80 font-normal leading-relaxed mb-10">
          Preaching the uncompromised Word, breaking chains, and raising a
          generation empowered in authority, righteousness, and supernatural faith.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Button
            variant="accent"
            size="lg"
            className="w-full sm:w-auto text-base font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all px-8 py-6"
            asChild
          >
            <Link href="/sermons?live=true">
              <Play className="mr-2 h-5 w-5 fill-current" />
              Watch Live Service
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-base font-semibold border-white/30 text-white hover:bg-white/10 hover:text-white px-8 py-6"
            asChild
          >
            <Link href="/contact">
              <Calendar className="mr-2 h-5 w-5 text-accent" />
              Plan Your Visit
            </Link>
          </Button>
        </div>

        {/* Live Ministry Stats Bar */}
        <div className="w-full max-w-5xl rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {/* Metric 1 */}
            <div className="flex flex-col items-center text-center pt-4 sm:pt-0">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="h-5 w-5 text-accent shrink-0" />
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  50+
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/70">
                Global Branches
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center text-center pt-4 sm:pt-0 sm:pl-6">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-5 w-5 text-accent shrink-0" />
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  1M+
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/70">
                Souls Impacted
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center text-center pt-4 sm:pt-0 sm:pl-6">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-5 w-5 text-accent shrink-0" />
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  25+
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/70">
                Years of Anointing
              </span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-center text-center pt-4 sm:pt-0 sm:pl-6">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-5 w-5 text-accent shrink-0" />
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  24/7
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/70">
                Prayer &amp; Deliverance
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
