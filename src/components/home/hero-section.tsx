"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Sparkles, Flame } from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface HeroSectionProps {
  settings?: SiteSettingsData;
}

export function HeroSection({ settings: propSettings }: HeroSectionProps) {
  const settings = propSettings || DEFAULT_SETTINGS;

  return (
    <section className="relative min-h-0 lg:min-h-[88vh] flex items-center bg-gradient-to-br from-[#fbf8f3] via-[#fffaf5] to-[#f5efe6] text-slate-900 overflow-hidden py-8 sm:py-12 lg:py-16">
      {/* Subtle warm ambient background effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-[#ff6b35]/10 to-amber-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Very subtle cross watermark */}
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-slate-900/[0.03] text-[28rem] font-serif select-none pointer-events-none leading-none -z-0">
        ✝
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-2 lg:pt-0">
            {/* Top Badge matching Church Motto / Vision Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs md:text-sm font-bold tracking-wide uppercase mb-3 sm:mb-4 lg:mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{settings.churchMotto || "REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD"}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-3 sm:mb-4 lg:mb-6">
              Experience Divine Deliverance &amp;{" "}
              <span className="relative inline-block text-[#ff6b35]">
                Supernatural Grace
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-orange-400/40 h-2.5 sm:h-3"
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
            </h1>

            {/* Subtext */}
            <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed mb-5 sm:mb-6 lg:mb-8">
              {settings.churchSlogan ? (
                <strong className="text-slate-900 font-bold block mb-1">
                  &ldquo;{settings.churchSlogan}&rdquo;
                </strong>
              ) : null}
              Preaching the uncompromised Word of God, breaking chains of darkness, and raising a generation empowered in apostolic authority, righteousness, and miraculous breakthrough at {settings.physicalLocation || "Sugutta Sanctuary"}.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8 lg:mb-10">
              <Button
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base font-bold shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all px-6 py-3 sm:px-8 sm:py-3.5 h-auto rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white border-0"
                asChild
              >
                <Link href="/sermons?live=true">
                  <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                  Watch Live Service
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base font-bold bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm rounded-full px-6 py-3 sm:px-8 sm:py-3.5 h-auto"
                asChild
              >
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b35]" />
                </Link>
              </Button>
            </div>

            {/* Stats Counter Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-8 pt-4 sm:pt-6 border-t border-slate-200/80 w-full max-w-lg">
              <div className="text-left">
                <p className="text-xl sm:text-3xl font-extrabold text-[#ff6b35]">50+</p>
                <p className="text-[11px] sm:text-sm font-medium text-slate-500">Crusades Held</p>
              </div>
              <div className="text-left border-l border-slate-200/80 pl-3 sm:pl-8">
                <p className="text-xl sm:text-3xl font-extrabold text-[#ff6b35]">1M+</p>
                <p className="text-[11px] sm:text-sm font-medium text-slate-500">Lives Touched</p>
              </div>
              <div className="text-left border-l border-slate-200/80 pl-3 sm:pl-8">
                <p className="text-xl sm:text-3xl font-extrabold text-[#ff6b35]">25+</p>
                <p className="text-[11px] sm:text-sm font-medium text-slate-500">Years of Grace</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Pastor Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
              {/* Warm decorative backplate glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/25 to-amber-500/15 rounded-[2.5rem] blur-2xl -z-10" />

              {/* Portrait Frame */}
              <div className="relative aspect-[4/5] rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src={settings.pastorImageUrl || "/images/pastor-caesar.jpg"}
                  alt={settings.pastorName}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  priority
                  quality={92}
                  unoptimized
                />

                {/* Subtle gradient vignette at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                {/* Floating Nameplate & Title at the bottom of the portrait */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-slate-900 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-extrabold text-sm sm:text-lg text-slate-900 leading-tight truncate">
                      {settings.pastorName}
                    </h3>
                    <p className="text-[11px] sm:text-sm font-medium text-[#ff6b35] truncate">
                      {settings.pastorTitle}
                    </p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-[#ff6b35] flex-shrink-0">
                    <Flame className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
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
