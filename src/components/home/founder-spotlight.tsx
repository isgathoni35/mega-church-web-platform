"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Flame,
  Shield,
  Heart,
  Sparkles,
  Target,
  Compass,
  Quote,
} from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface FounderSpotlightProps {
  settings?: SiteSettingsData;
}

export function FounderSpotlight({ settings: propSettings }: FounderSpotlightProps) {
  const settings = propSettings || DEFAULT_SETTINGS;

  return (
    <section id="founder" className="py-10 sm:py-16 lg:py-24 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Orange Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 lg:mb-16">
          <span className="inline-block text-[11px] sm:text-xs md:text-sm font-bold tracking-widest text-[#ff6b35] uppercase mb-1 sm:mb-2">
            {settings.pastorTitle}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight mb-2 sm:mb-4">
            {settings.pastorName}
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full mb-3 sm:mb-6" />
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            {settings.pastorBio ||
              "Called by God with an apostolic passion to set the captives free, build disciples through sound Biblical exposition, and lead Sugutta Fellowship Church into dynamic community transformation and global impact."}
          </p>
        </div>

        {/* 2-Column Founder Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center mb-8 sm:mb-14 lg:mb-20">
          {/* Left Column: Portrait Card with Floating Quote Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
              {/* Warm decorative back glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent rounded-[2.5rem] blur-2xl -z-10" />

              {/* Portrait Container */}
              <div className="relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden border-4 border-slate-100 shadow-xl bg-slate-50 aspect-[4/5]">
                <Image
                  src={settings.pastorImageUrl || "/images/pastor-caesar.jpg"}
                  alt={settings.pastorName}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 90vw, 450px"
                  unoptimized
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                {/* Floating Bottom Quote Badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-xl text-slate-900">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-[#ff6b35] flex-shrink-0 mt-0.5">
                      <Quote className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold italic text-slate-800 leading-snug">
                        &ldquo;{settings.churchMotto || "REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD"}&rdquo;
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-[#ff6b35] uppercase tracking-wider mt-0.5 sm:mt-1">
                        — Vision &amp; Commission of {settings.pastorName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Feature Cards */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              {/* Feature 1 */}
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-2 sm:mb-4">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2">
                  Reaching Out
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Evangelism and community outreaches in Sugutta and beyond, proclaiming the love and salvation of Jesus Christ.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-2 sm:mb-4">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2">
                  Growing Together
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Systematic discipleship, Sunday school classes, and vibrant fellowship building deep, mature believers.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-2 sm:mb-4">
                  <Flame className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2">
                  Impacting Our World
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Releasing the transformational fire of the Holy Spirit to heal the sick, break strongholds, and uplift society.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-2 sm:mb-4">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2">
                  Come. Connect. Grow. Go.
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A 4-step spiritual journey taking every believer from salvation to mature apostolic sending.
                </p>
              </div>
            </div>

            {/* Read full bio CTA */}
            <div className="pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold shadow-md shadow-orange-500/20 px-6 py-3 sm:px-8 sm:py-3.5 h-auto text-sm sm:text-base"
                asChild
              >
                <Link href="/about">
                  Read Full Pastoral Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mission & Vision Twin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-10 border-t border-slate-200">
          {/* Mission Card */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#fffaf5] to-white border border-orange-100 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-3 sm:mb-6">
                <Target className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#ff6b35] mb-1 block">
                Our Purpose
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 sm:mb-4">
                Our Mission
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-base">
                To preach the full gospel of Jesus Christ with signs and wonders, deliver the oppressed from spiritual captivity, nurture believers in righteousness, and show tangible Christian love through holistic humanitarian outreaches.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#fffaf5] to-white border border-orange-100 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-3 sm:mb-6">
                <Compass className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#ff6b35] mb-1 block">
                Our Future
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 sm:mb-4">
                Our Vision
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-base">
                A world transformed by the raw power of God, where millions of souls are plucked from darkness into light, empowered to live victoriously in Christ, and actively preparing the bride for the glorious second coming of Jesus Christ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
