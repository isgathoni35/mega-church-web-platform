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

export function FounderSpotlight() {
  return (
    <section id="founder" className="py-20 sm:py-24 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Orange Heading matching Neno */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#ff6b35] uppercase mb-2">
            Founder &amp; Presiding Bishop
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight mb-4">
            Apostle Dr. J. Taylor
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Called by God with an apostolic mandate to set the captives free, preach the unadulterated gospel of Jesus Christ, and ignite revival fires globally.
          </p>
        </div>

        {/* 2-Column Founder Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          {/* Left Column: Portrait Card with Floating Quote Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Warm decorative back glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent rounded-[2.5rem] blur-2xl -z-10" />

              {/* Portrait Container */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-slate-100 shadow-xl bg-slate-50 aspect-[4/5]">
                <Image
                  src="/images/pastor-portrait.jpg"
                  alt="Apostle Dr. J. Taylor"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 90vw, 450px"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Floating Bottom Quote Badge matching Neno's prophetic quote */}
                <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-xl text-slate-900">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-[#ff6b35] flex-shrink-0 mt-0.5">
                      <Quote className="h-4 w-4 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold italic text-slate-800 leading-snug">
                        &ldquo;I have given you power; go and set My people free.&rdquo;
                      </p>
                      <p className="text-[11px] font-semibold text-[#ff6b35] uppercase tracking-wider mt-1">
                        — Divine Commission to Apostle Taylor
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 White Feature Cards with Circular Orange Icons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Feature 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-4">
                  <Heart className="h-6 w-6 fill-current" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  God&apos;s Salvation
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Proclaiming the transformative power of repentance and eternal redemption through the blood of Jesus Christ.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-4">
                  <Shield className="h-6 w-6 fill-current" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Divine Authority
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Exercising spiritual power to dismantle witchcraft, break generational curses, and set captives free.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-4">
                  <Flame className="h-6 w-6 fill-current" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Apostolic Mandate
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Conducting stadium crusades, planting altars of fire, and equipping believers for end-time evangelism.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-4">
                  <Sparkles className="h-6 w-6 fill-current" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Anointed Worship
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Experiencing tangible glory and spontaneous miracles in atmospheres of vibrant, high-praise worship.
                </p>
              </div>
            </div>

            {/* Read full bio CTA */}
            <div className="pt-2">
              <Button
                size="lg"
                className="rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold shadow-md shadow-orange-500/20 px-8 py-5"
                asChild
              >
                <Link href="/about">
                  Read Full Apostolic Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mission & Vision Twin Cards matching Neno */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-10 border-t border-slate-200">
          {/* Mission Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#fffaf5] to-white border border-orange-100 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-6">
                <Target className="h-7 w-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] mb-1 block">
                Our Purpose
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                Our Mission
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To preach the full gospel of Jesus Christ with signs and wonders, deliver the oppressed from spiritual captivity, nurture believers in righteousness, and show tangible Christian love through holistic humanitarian outreaches.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#fffaf5] to-white border border-orange-100 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#ff6b35]/10 flex items-center justify-center text-[#ff6b35] mb-6">
                <Compass className="h-7 w-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] mb-1 block">
                Our Future
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                Our Vision
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">
                A world transformed by the raw power of God, where millions of souls are plucked from darkness into light, empowered to live victoriously in Christ, and actively preparing the bride for the glorious second coming of Jesus Christ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
