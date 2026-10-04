"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Clock, MapPin, Heart, Flame } from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface HeroSectionProps {
  settings?: SiteSettingsData;
}

export function HeroSection({ settings: propSettings }: HeroSectionProps) {
  const settings = propSettings || DEFAULT_SETTINGS;

  return (
    <div className="relative w-full">
      {/* ================= MAIN HERO SECTION ================= */}
      <section className="relative min-h-0 lg:min-h-[85vh] flex items-center bg-gradient-to-br from-[#061d43] via-[#0b2e61] to-[#061d43] text-white overflow-hidden py-12 sm:py-16 lg:py-24">
        {/* Subtle decorative glowing rings in top-right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-[#C59B27]/25 blur-sm pointer-events-none -z-0 shadow-[0_0_120px_rgba(197,155,39,0.15)]" />
        <div className="absolute top-1/4 -right-16 w-[450px] h-[450px] rounded-full border border-white/5 pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-[#C59B27]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Glory Gate Editorial Copy & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-2 lg:pt-0">
              {/* Kicker with thin-line accent */}
              <div className="kicker mb-3 sm:mb-4 text-[#edca62]">
                <span>Welcome to Sugutta Fellowship</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-3 sm:mb-5">
                A place to meet Jesus.
                <span className="block sm:inline italic font-normal text-[#edca62] ml-0 sm:ml-3">
                  A people sent with hope.
                </span>
              </h1>

              {/* Subtext */}
              <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-slate-200/90 font-normal leading-relaxed mb-6 sm:mb-8">
                We are a Christ-centered, Spirit-filled family learning to follow
                Jesus faithfully and carry His Gospel into everyday life under the pastoral care of{" "}
                <strong className="text-white font-semibold">{settings.pastorName}</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all px-7 py-3.5 h-auto rounded-xl bg-gradient-to-r from-[#f0d371] to-[#b97f0e] text-[#061d43] border-0"
                  asChild
                >
                  <Link href="#visit">
                    Plan Your First Visit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm rounded-xl px-6 py-3.5 h-auto"
                  asChild
                >
                  <Link href="/sermons?live=true">
                    <Play className="mr-2 h-4 w-4 fill-current text-[#edca62]" />
                    Watch a Message
                  </Link>
                </Button>
              </div>

              {/* Glory Gate Hero Divider Note */}
              <div className="pt-4 border-t border-white/15 w-full text-xs sm:text-sm text-slate-300">
                <strong className="text-white font-bold">You belong in the story.</strong>{" "}
                {settings.churchSlogan ? (
                  <span>&ldquo;{settings.churchSlogan}&rdquo;</span>
                ) : (
                  <span>Come, grow, serve, and go with us.</span>
                )}
              </div>
            </div>

            {/* Right Column: Pastor Portrait with Orbiting Faith/Hope/Love & Church Seal */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
                {/* Orbiting celestial words: Faith, Hope, Love */}
                <div className="absolute -inset-6 sm:-inset-10 rounded-full border border-[#edca62]/30 animate-orbit-spin pointer-events-none">
                  <span className="absolute top-[8%] left-[12%] -translate-x-1/2 -translate-y-1/2 bg-[#061d43] text-[#edca62] text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-[#edca62]/40 shadow-md">
                    Faith
                  </span>
                  <span className="absolute right-[-4%] top-[48%] -translate-y-1/2 bg-[#061d43] text-[#edca62] text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-[#edca62]/40 shadow-md">
                    Hope
                  </span>
                  <span className="absolute bottom-[8%] left-[22%] -translate-x-1/2 -translate-y-1/2 bg-[#061d43] text-[#edca62] text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-[#edca62]/40 shadow-md">
                    Love
                  </span>
                </div>

                {/* Portrait Card */}
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900">
                  <Image
                    src={settings.pastorImageUrl || "/images/pastor-caesar.jpg"}
                    alt={settings.pastorName}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    priority
                    quality={92}
                    unoptimized
                  />

                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Floating Nameplate Badge */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-xl text-slate-900 flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <h3 className="font-extrabold text-sm sm:text-base text-[#061d43] leading-tight truncate">
                        {settings.pastorName}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-semibold text-[#b97f0e] truncate mt-0.5">
                        {settings.pastorTitle}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#061d43]/10 flex items-center justify-center text-[#b97f0e] flex-shrink-0">
                      <Flame className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FLOATING QUICK INFORMATION STRIP ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20 -mt-6 sm:-mt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 overflow-hidden">
          {/* Quick item 1: Worship with us */}
          <div className="p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#061d43]/5 text-[#c59b27] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Worship with us
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-[#061d43] block mt-0.5">
                Sunday 8:00 AM – 11:45 AM
              </span>
            </div>
          </div>

          {/* Quick item 2: Meet us */}
          <div className="p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#061d43]/5 text-[#c59b27] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Come and meet us
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-[#061d43] block mt-0.5 truncate max-w-[180px]">
                {settings.physicalLocation || "Sugutta Sanctuary, Kenya"}
              </span>
            </div>
          </div>

          {/* Quick item 3: Need prayer? */}
          <div className="p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#061d43]/5 text-[#c59b27] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Need prayer?
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-[#061d43] block mt-0.5">
                We are honoured to pray
              </span>
            </div>
          </div>

          {/* Quick item 4: Connect CTA */}
          <Link
            href="#connect"
            className="p-4 sm:p-5 bg-gradient-to-r from-[#f0d371] to-[#b97f0e] text-[#061d43] hover:brightness-105 transition-all flex items-center justify-center gap-2 font-extrabold text-xs sm:text-sm uppercase tracking-wider"
          >
            <span>Connect with us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
