"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Sparkles, Flame, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center bg-gradient-to-br from-[#fbf8f3] via-[#fffaf5] to-[#f5efe6] text-slate-900 overflow-hidden py-12 lg:py-16">
      {/* Subtle warm ambient background effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-[#ff6b35]/10 to-amber-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Very subtle cross watermark */}
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-slate-900/[0.03] text-[28rem] font-serif select-none pointer-events-none leading-none -z-0">
        ✝
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-4 lg:pt-0">
            {/* Top Badge matching Neno's International Deliverance Ministry tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>International Deliverance Ministry</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
              Experience Divine Deliverance &amp;{" "}
              <span className="relative inline-block text-[#ff6b35]">
                Supernatural Grace
                <svg
                  className="absolute -bottom-2 left-0 w-full text-orange-400/40 h-3"
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
            <p className="max-w-2xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8">
              Preaching the uncompromised Word of God, breaking chains of darkness, and raising a generation empowered in apostolic authority, righteousness, and miraculous breakthrough.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all px-8 py-6 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white border-0"
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
                className="w-full sm:w-auto text-base font-bold bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm rounded-full px-8 py-6"
                asChild
              >
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 text-[#ff6b35]" />
                </Link>
              </Button>
            </div>

            {/* Stats Counter Bar matching Neno's metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-slate-200/80 w-full max-w-lg">
              <div className="text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#ff6b35]">50+</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Crusades Held</p>
              </div>
              <div className="text-left border-l border-slate-200/80 pl-4 sm:pl-8">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#ff6b35]">1M+</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Lives Touched</p>
              </div>
              <div className="text-left border-l border-slate-200/80 pl-4 sm:pl-8">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#ff6b35]">25+</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Years of Grace</p>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Apostle Portrait Card matching Neno */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Warm decorative backplate glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/25 to-amber-500/15 rounded-[2.5rem] blur-2xl -z-10" />

              {/* Portrait Frame */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/pastor-portrait.jpg"
                  alt="Apostle Dr. J. Taylor"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  priority
                  quality={90}
                />

                {/* Subtle gradient vignette at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Floating Nameplate & Title at the bottom of the portrait */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-slate-900 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                      Apostle Dr. J. Taylor
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#ff6b35]">
                      Senior Pastor &amp; Founder
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-[#ff6b35] flex-shrink-0">
                    <Flame className="h-5 w-5 fill-current" />
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
