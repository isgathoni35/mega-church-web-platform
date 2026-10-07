"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface HeroSectionProps {
  settings?: SiteSettingsData;
}

export function HeroSection({ settings: propSettings }: HeroSectionProps) {
  const settings = propSettings || DEFAULT_SETTINGS;

  return (
    <section className="relative min-h-0 lg:min-h-[85vh] flex items-center bg-[#fdfbf7] text-slate-900 overflow-hidden py-10 sm:py-16 lg:py-20">
      {/* Subtle warm background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ================= LEFT COLUMN: TEXT CONTENT ================= */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Top Star Eyebrow Pill Badge matching Neno */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#ffedd5]/70 border border-orange-200/80 text-[#c2410c] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 shadow-sm max-w-full truncate">
              <span className="text-xs sm:text-sm shrink-0">★</span>
              <span className="truncate">{settings.churchMotto || "INTERNATIONAL DELIVERANCE MINISTRY"}</span>
            </div>

            {/* Signature 3-Line Headline matching Neno */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0f172a] leading-[1.08] mb-5 sm:mb-6">
              {settings.heroHeadline1 || "Sugutta"}
              <br />
              <span className="relative inline-block text-[#ff6b35]">
                {settings.heroHeadline2 || "Fellowship"}
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#fed7aa] h-3.5 sm:h-4"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,8 Q50,0 100,8"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              {settings.heroHeadline3 || "Church"}
            </h1>

            {/* Vision Lead & Spiritual Subtext */}
            <div className="space-y-2 mb-6 sm:mb-8 max-w-xl">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                {settings.heroSubtitle ||
                  "We are a Christ-centered, Spirit-filled family learning to follow Jesus faithfully and carry His Gospel into everyday life."}
              </p>
              <p className="text-sm sm:text-base text-[#ff6b35] italic font-serif">
                {settings.heroPromise ||
                  "Experience God's power through deliverance and spiritual transformation."}
              </p>
            </div>

            {/* Dual Action Buttons matching Neno */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10">
              <Button
                size="lg"
                className="w-full sm:w-auto font-bold bg-[#ff6b35] hover:bg-[#ea580c] text-white rounded-full px-8 py-3.5 sm:py-4 h-auto text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 border-0"
                asChild
              >
                <Link href="/sermons?live=true">
                  <Play className="h-4 w-4 fill-white" />
                  <span>Watch Live Service</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-full px-8 py-3.5 sm:py-4 h-auto text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2"
                asChild
              >
                <Link href="/about">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 text-slate-500" />
                </Link>
              </Button>
            </div>

            {/* Thin Divider Line & 3-Item Stats Bar matching Neno */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-10 w-full max-w-lg text-left">
              <div>
                <p className="text-xl sm:text-4xl font-extrabold text-slate-900">
                  {settings.heroStatBranches && settings.heroStatBranches !== "-"
                    ? settings.heroStatBranches
                    : "50+"}
                </p>
                <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mt-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] shrink-0" />
                  <span className="truncate">OUTREACHES</span>
                </p>
              </div>

              <div>
                <p className="text-xl sm:text-4xl font-extrabold text-slate-900">
                  {settings.heroStatLives || "1M+"}
                </p>
                <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mt-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] shrink-0" />
                  <span className="truncate">LIVES TOUCHED</span>
                </p>
              </div>

              <div>
                <p className="text-xl sm:text-4xl font-extrabold text-slate-900">
                  {settings.heroStatYears || "25+"}
                </p>
                <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mt-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] shrink-0" />
                  <span className="truncate">YEARS MINISTRY</span>
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PICTURE (EXACT MATCH TO NENO SCREENSHOT) ================= */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            {/* Decorative background orange ring outline matching Neno screenshot */}
            <div className="w-64 h-64 rounded-full border border-orange-200/80 absolute -top-8 -right-8 pointer-events-none hidden sm:block" />

            <div className="relative w-full max-w-[320px] sm:max-w-sm lg:max-w-[420px]">
              {/* Floating white squircle badge with orange icon at top-left */}
              <div className="absolute -top-3.5 -left-3.5 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-[#ff6b35]">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>

              {/* Tall Vertical Portrait Card with rounded-[2.5rem] */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[2.25rem] sm:rounded-[2.75rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <Image
                  src={
                    settings.heroImageUrl ||
                    (settings.pastorImageUrl && !settings.pastorImageUrl.includes("pastor-caesar.jpg")
                      ? settings.pastorImageUrl
                      : "/images/pastor-caesar-hero.jpg")
                  }
                  alt={settings.pastorName}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  priority
                  unoptimized
                />

                {/* Subtle vignette gradient at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Frosted Glass Nameplate Card matching Neno screenshot */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 sm:p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-between shadow-2xl">
                  <div className="min-w-0 pr-3">
                    <h3 className="font-extrabold text-sm sm:text-base lg:text-lg text-white leading-tight truncate">
                      {settings.pastorName}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-bold text-orange-300 uppercase tracking-wider mt-0.5 truncate">
                      {settings.pastorTitle || "RESIDENT MINISTER"}
                    </p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#ff6b35] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
