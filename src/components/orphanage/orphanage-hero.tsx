import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  Home,
  Utensils,
  GraduationCap,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrphanageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] border-b border-slate-200/80 py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle decorative warm ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 relative z-10">
        {/* Main 2-Column Split Hero (Matching Homepage & About) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Authoritative Message & Conviction */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
              <Heart className="h-3.5 w-3.5 fill-current" />
              <span>Heavens Gates Compassion Wing</span>
            </div>

            {/* Flowing Script Accent */}
            <p className="font-script text-2xl sm:text-4xl lg:text-5xl text-[#ff6b35]">
              A Haven of Hope &amp; Restoration
            </p>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f172a] leading-tight">
              Empowering the Next Generation
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Our Children&apos;s Home rescues orphaned and vulnerable children,
              providing them with a safe Christian family, 100% formal education,
              wholesome nutrition, and Christ&apos;s unconditional love.
            </p>

            {/* Scripture Anchor Card */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-orange-200/80 shadow-sm max-w-xl mx-auto lg:mx-0 text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[#ff6b35] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Scriptural Mandate</span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-slate-800 leading-relaxed">
                &ldquo;Pure and undefiled religion before God and the Father is
                this: to visit the fatherless and widows in their affliction, and
                to keep oneself unspotted from the world.&rdquo;
              </p>
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-[#ff6b35] tracking-wider block">
                — James 1:27
              </span>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold shadow-lg shadow-orange-500/25 px-8 py-3.5 sm:py-6 text-xs sm:text-base rounded-full h-auto transition-all"
                asChild
              >
                <Link href="/orphanage/donate">
                  <Heart className="mr-2 h-4 w-4 fill-current" />
                  Donate to Children&apos;s Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-[#ff6b35] font-bold px-6 py-3.5 sm:py-6 text-xs sm:text-base rounded-full h-auto transition-colors"
                asChild
              >
                <Link href="/contact?subject=orphanage_visit">
                  <Gift className="mr-2 h-4 w-4 text-[#ff6b35]" />
                  Deliver Food &amp; Supplies
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Framed Photography with Ambient Glow */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient orange background blur */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-amber-500/10 rounded-3xl blur-2xl transform scale-95" />

            {/* Framed Photo Card */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <Image
                src="/images/orphanage-hero.png"
                alt="Children gathering for nourishing meals at Heavens Gates Children's Home"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Bottom Badge Plate */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-orange-100 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-sm sm:text-base text-[#0f172a] block">
                    Heavens Gates Haven
                  </span>
                  <span className="text-[11px] text-[#ff6b35] font-bold block">
                    Nurtured in Christ&apos;s Love
                  </span>
                </div>
                <div className="h-9 w-9 rounded-full bg-orange-50 text-[#ff6b35] border border-orange-200 flex items-center justify-center font-bold text-sm">
                  ❤️
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Stat Counter Strip (Pure White Cards on Soft Cream) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-200/80">
          {/* Stat 1 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#ff6b35] flex items-center justify-center shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#ff6b35] tracking-tight block">
                60+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                Sheltered Children
              </span>
              <span className="text-[11px] text-slate-500">
                Safe Christian Dormitories
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#ff6b35] flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#ff6b35] tracking-tight block">
                100%
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                School Enrollment
              </span>
              <span className="text-[11px] text-slate-500">
                Nursery through College
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#ff6b35] flex items-center justify-center shrink-0">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#ff6b35] tracking-tight block">
                3 Meals
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                Hot Nutrition Daily
              </span>
              <span className="text-[11px] text-slate-500">
                Clean Water &amp; Fresh Milk
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
