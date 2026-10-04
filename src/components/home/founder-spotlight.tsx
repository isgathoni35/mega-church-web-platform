"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Users,
  Globe2,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface FounderSpotlightProps {
  settings?: SiteSettingsData;
}

export function FounderSpotlight({ settings: propSettings }: FounderSpotlightProps) {
  const settings = propSettings || DEFAULT_SETTINGS;

  return (
    <section id="who-we-are" className="py-12 sm:py-16 lg:py-24 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* ========================================================================= */}
        {/* 1. WHO WE ARE: Glory Gate Benchmark Header & 4 Pillars                   */}
        {/* ========================================================================= */}
        <div>
          <div className="max-w-3xl mb-8 sm:mb-12">
            <span className="kicker">WHO WE ARE</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
              Jesus at the center. <br className="hidden sm:inline" />
              His love in motion.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We are a Bible-believing, Christ-centered fellowship passionate about seeing people encounter God, grow in deep faith, and walk out their God-given calling. Whoever you are, whatever your story, you are warmly welcome here.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Pillar 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#fbf8f3] border border-amber-900/10 hover:border-amber-500/30 transition-all hover:shadow-md group">
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-amber-200/50 flex items-center justify-center text-[#ff6b35] mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <span className="text-[#ff6b35]">✦</span> Built on the Word
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Scripture is our foundation, truth, and infallible guide in every season of life and ministry.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#fbf8f3] border border-amber-900/10 hover:border-amber-500/30 transition-all hover:shadow-md group">
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-amber-200/50 flex items-center justify-center text-[#ff6b35] mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <span className="text-[#ff6b35]">✦</span> Spirit-Led Worship
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Encountering the tangible presence of God in reverence, spiritual freedom, and apostolic praise.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#fbf8f3] border border-amber-900/10 hover:border-amber-500/30 transition-all hover:shadow-md group">
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-amber-200/50 flex items-center justify-center text-[#ff6b35] mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <span className="text-[#ff6b35]">✦</span> Real Community
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We do not walk alone. We build authentic lifelong relationships through shared fellowship and prayer.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#fbf8f3] border border-amber-900/10 hover:border-amber-500/30 transition-all hover:shadow-md group">
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-amber-200/50 flex items-center justify-center text-[#ff6b35] mb-4 group-hover:scale-110 transition-transform">
                <Globe2 className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <span className="text-[#ff6b35]">✦</span> Kingdom Impact
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Reaching Sugutta, supporting vulnerable orphans, and carrying Christ’s transformative hope to nations.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TWIN MISSION & VISION: High-contrast Glory Gate benchmark              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Mission Card (Warm Ivory) */}
          <div className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-[#fbf8f3] border border-amber-900/10 shadow-sm flex flex-col justify-between">
            <div>
              <span className="kicker">OUR MISSION</span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-4">
                Proclaim. Disciple. Equip. Transform.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                To make disciples of all nations by preaching the uncompromising Word of God, cultivating authentic relationships, and empowering every believer to live as an ambassador of Christ in their sphere of influence.
              </p>

              <div className="space-y-3 pt-2 border-t border-amber-900/10">
                <div className="flex items-start gap-3 text-xs sm:text-sm font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <span>Sound biblical exposition &amp; Spirit-led discipleship for every age</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <span>Vibrant family fellowship, Sunday school, and generational care</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <span>Tangible community compassion through the Sugutta Children&apos;s Home</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-900/10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">
                {settings.churchMotto || "REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD"}
              </span>
              <Link
                href="/about"
                className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#ff6b35] inline-flex items-center gap-1 group"
              >
                Learn our story <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Vision Card (Deep Navy / Radiant Gold Contrast) */}
          <div className="relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-[#061d43] text-white shadow-xl overflow-hidden flex flex-col justify-between border border-amber-500/20">
            {/* Watermark Quote background */}
            <div className="absolute top-2 right-4 text-9xl font-serif text-white/5 pointer-events-none select-none">
              &ldquo;
            </div>

            <div className="relative z-10">
              <span className="kicker-dark">OUR VISION</span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-2 mb-4">
                A faithful church with a global reach.
              </h3>
              
              <blockquote className="text-base sm:text-lg lg:text-xl font-serif italic text-amber-100/90 leading-relaxed border-l-2 border-[#ff6b35] pl-4 sm:pl-5 my-6">
                &ldquo;A multi-generational, Spirit-filled church family where the broken find healing, the searching find truth, and the faithful are mobilized to transform generations for Jesus Christ.&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Rooted firmly in Sugutta, reaching across Kenya, and impacting the nations through sound apostolic doctrine, fervent prayer, and sacrificial love.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-amber-300 font-semibold tracking-wide">
              <span>Habakkuk 2:14</span>
              <span className="text-slate-400 font-normal">Sugutta Fellowship Church</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. PASTOR CAESAR SPOTLIGHT & 4-STEP SPIRITUAL JOURNEY                     */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Framed Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent rounded-[2.5rem] blur-2xl -z-10" />

                <div className="relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden border-4 border-slate-100 shadow-xl bg-slate-50 aspect-[4/5]">
                  <Image
                    src={settings.pastorImageUrl || "/images/pastor-caesar.jpg"}
                    alt={settings.pastorName}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 90vw, 450px"
                    unoptimized
                  />
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
                        <p className="text-[10px] sm:text-[11px] font-semibold text-[#ff6b35] uppercase tracking-wider mt-0.5">
                          — {settings.pastorTitle} {settings.pastorName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Pastoral Calling & 4-Step Journey */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="kicker">LEADERSHIP &amp; CALLING</span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 mb-3">
                  {settings.pastorName}
                </h3>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#ff6b35] mb-4">
                  {settings.pastorTitle} &bull; Sugutta Fellowship Church
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {settings.pastorBio ||
                    "Called by God with an apostolic passion to set the captives free, build disciples through sound Biblical exposition, and lead Sugutta Fellowship Church into dynamic community transformation and global impact."}
                </p>
              </div>

              {/* 4-Step Spiritual Journey Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#fbf8f3] border border-amber-900/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-[#ff6b35] text-white text-xs font-bold flex items-center justify-center">1</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">Come</h4>
                  </div>
                  <p className="text-xs text-slate-600">Experience God&apos;s welcoming grace just as you are.</p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#fbf8f3] border border-amber-900/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-[#ff6b35] text-white text-xs font-bold flex items-center justify-center">2</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">Connect</h4>
                  </div>
                  <p className="text-xs text-slate-600">Find real family, warm fellowship, and spiritual belonging.</p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#fbf8f3] border border-amber-900/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-[#ff6b35] text-white text-xs font-bold flex items-center justify-center">3</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">Grow</h4>
                  </div>
                  <p className="text-xs text-slate-600">Deepen your knowledge of Scripture and faith in Christ.</p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#fbf8f3] border border-amber-900/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-[#ff6b35] text-white text-xs font-bold flex items-center justify-center">4</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">Go</h4>
                  </div>
                  <p className="text-xs text-slate-600">Carry the light of the gospel into your family, career, and community.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold shadow-md shadow-orange-500/20 px-6 py-3 h-auto text-sm sm:text-base"
                  asChild
                >
                  <Link href="/about">
                    Read Pastoral Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-slate-300 hover:bg-slate-50 text-slate-800 font-bold px-6 py-3 h-auto text-sm sm:text-base"
                  asChild
                >
                  <Link href="/contact">
                    Meet Pastor Caesar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
