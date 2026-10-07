import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Home,
  Utensils,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Gift,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface OrphanageHeroProps {
  settings?: SiteSettingsData;
}

export function OrphanageHero({ settings }: OrphanageHeroProps) {
  const currentSettings = settings || DEFAULT_SETTINGS;

  const heroImage = currentSettings.orphanageImageUrl || "/images/orphanage-hero.png";
  const heroTitle = currentSettings.orphanageTitle || "Empowering the Next Generation";
  const heroSubtitle =
    currentSettings.orphanageSubtitle ||
    "Our Children's Home rescues orphaned and vulnerable children, providing them with a safe Christian family, 100% formal education, wholesome nutrition, and Christ's unconditional love.";
  const heroBadge = currentSettings.orphanageBadge || "Sugutta Children's Home";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] border-b border-slate-200/80 py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle decorative warm ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 relative z-10">
        {/* Main 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Authoritative Message & Conviction */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Heart className="h-3.5 w-3.5 fill-current" />
              <span>{heroBadge}</span>
            </div>

            {/* Headline with curved accent underline feel */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {heroSubtitle}
            </p>

            {/* Scriptural Mandate Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 border-l-4 border-l-[#ff6b35] shadow-sm max-w-xl mx-auto lg:mx-0 text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#ff6b35] text-[11px] font-bold uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Scriptural Mandate</span>
              </div>
              <p className="italic text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                &ldquo;Pure and undefiled religion before God and the Father is
                this: to visit the fatherless and widows in their affliction, and
                to keep oneself unspotted from the world.&rdquo;
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] uppercase font-bold text-[#ff6b35] tracking-wider block">
                  — James 1:27
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Direct Impact</span>
                </span>
              </div>
            </div>

            {/* Dual Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold shadow-lg shadow-orange-500/25 px-8 py-3.5 sm:py-6 text-sm sm:text-base rounded-full h-auto transition-all"
                asChild
              >
                <Link href="/orphanage/donate">
                  <Heart className="mr-2 h-4 w-4 fill-current" />
                  <span>Donate to Children&apos;s Home</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold px-7 py-3.5 sm:py-6 text-sm sm:text-base rounded-full h-auto transition-colors shadow-sm"
                asChild
              >
                <Link href="/contact?subject=orphanage_visit">
                  <Gift className="mr-2 h-4 w-4 text-[#ff6b35]" />
                  <span>Deliver Food &amp; Supplies</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Framed Photography with Ambient Glow */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient orange background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-amber-500/10 rounded-3xl blur-2xl transform scale-95" />

            {/* Framed Photo Card */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <Image
                src={heroImage}
                alt={heroTitle}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Bottom Badge Plate */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-between">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 block truncate">
                    {heroBadge}
                  </span>
                  <span className="text-xs text-[#ff6b35] font-bold block truncate">
                    Nurtured in Christ&apos;s Unconditional Love
                  </span>
                </div>
                <div className="h-9 w-9 rounded-full bg-orange-50 text-[#ff6b35] border border-orange-200 flex items-center justify-center font-bold text-sm shrink-0">
                  <Heart className="w-4 h-4 fill-current text-[#ff6b35]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Stat Counter Strip (Elevated Clean White Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-200/80">
          {/* Stat 1 */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#ff6b35] flex items-center justify-center shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight block">
                60+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                Sheltered Children
              </span>
              <span className="text-[11px] text-slate-500 block">
                Safe Christian Dormitories
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#ff6b35] flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight block">
                100%
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                School Enrollment
              </span>
              <span className="text-[11px] text-slate-500 block">
                Nursery through College
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#ff6b35] flex items-center justify-center shrink-0">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight block">
                3 Meals
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                Hot Nutrition Daily
              </span>
              <span className="text-[11px] text-slate-500 block">
                Clean Water &amp; Fresh Milk
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
