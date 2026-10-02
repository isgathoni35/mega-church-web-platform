"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Calendar, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Full-bleed background worship image */}
      <Image
        src="/images/hero-worship.jpg"
        alt="Congregation worshipping with hands raised in golden light"
        fill
        className="object-cover object-center"
        priority
        quality={85}
      />

      {/* Dark purple overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />

      {/* Subtle warm golden light rays from top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-accent/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Faint cross watermark — intentional and warm */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.06] text-[32rem] font-serif select-none pointer-events-none leading-none">
        ✝
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
        {/* Warm welcome greeting in script font — NOT a pill badge */}
        <span className="font-script text-accent text-3xl sm:text-5xl block mb-4 drop-shadow-lg">
          Welcome Home
        </span>

        {/* Main Headline */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Experience the Miraculous Power of God &amp;{" "}
          <span className="text-gold-gradient [-webkit-text-fill-color:transparent]">
            Divine Deliverance
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl text-base sm:text-xl text-white/85 font-normal leading-relaxed mb-10">
          Preaching the uncompromised Word, breaking chains, and raising a
          generation empowered in authority, righteousness, and supernatural faith.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
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

        {/* Service times quick-glance strip — warm and informational */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base text-white/80 font-medium">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Sunday 10:00 AM
          </span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Monday 7:00 PM
          </span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Wednesday 7:00 PM
          </span>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50">
        <span className="text-xs font-medium tracking-wider uppercase">Discover More</span>
        <ChevronDown className="h-5 w-5 animate-gentle-bounce" />
      </div>
    </section>
  );
}
