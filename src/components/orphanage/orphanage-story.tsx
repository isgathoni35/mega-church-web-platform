import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, ShieldCheck, Users, ArrowRight, BookHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrphanageStory() {
  return (
    <section className="py-12 sm:py-18 lg:py-24 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
        {/* Section Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-xs font-bold uppercase tracking-wider shadow-sm">
            <BookHeart className="w-3.5 h-3.5" />
            <span>The Heart Behind the Mission</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Why We Opened Our Doors in Sugutta
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            True religion is never confined to church walls. When children in our community were left without parents, skipping school and facing hunger, faith demanded action.
          </p>
        </div>

        {/* 2-Column Split: Narrative & Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Visual Story Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-[#fffaf5] bg-slate-900">
              <Image
                src="/images/community-outreach.jpg"
                alt="Community Outreach & Children Support"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              {/* Floating Quote Over Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-100">
                <p className="font-serif italic text-xs sm:text-sm text-slate-800 leading-snug">
                  &ldquo;We do not raise orphans in barracks; we raise sons and daughters of God with names, dignity, and a bright future.&rdquo;
                </p>
                <span className="text-[11px] font-bold text-[#ff6b35] uppercase tracking-wider block mt-1">
                  — Pastor Caesar O. Nyandwaro
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Narrative Points */}
          <div className="lg:col-span-7 space-y-6">
            {/* Point 1 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-[#ff6b35] flex items-center justify-center shrink-0 font-extrabold text-sm shadow-sm mt-0.5">
                01
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base sm:text-lg text-slate-900">
                  Rescuing the Most Vulnerable
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Many of the boys and girls living at Sugutta arrived after the tragic loss of both parents, extreme rural hardship, or abandonment. Rather than allowing them to wander without hope, our church opened safe dormitories to shelter and protect them.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-[#ff6b35] flex items-center justify-center shrink-0 font-extrabold text-sm shadow-sm mt-0.5">
                02
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base sm:text-lg text-slate-900">
                  A Loving Family, Not an Institution
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every child is placed under the maternal care of devoted resident Christian house mothers who cook warm meals, help with homework, wash school uniforms, and pray with each child by name before bed every evening.
                </p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-[#ff6b35] flex items-center justify-center shrink-0 font-extrabold text-sm shadow-sm mt-0.5">
                03
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base sm:text-lg text-slate-900">
                  Breaking the Poverty Cycle Through Education
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We believe education is the greatest equalizer. Every child attends formal school from early childhood through secondary school and tertiary colleges, equipped with clean uniforms, textbooks, and after-school academic support.
                </p>
              </div>
            </div>

            {/* CTA row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                className="bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold rounded-full px-6 py-2.5 text-xs sm:text-sm shadow-md shadow-orange-500/20"
                asChild
              >
                <Link href="/orphanage/donate">
                  <Heart className="w-4 h-4 mr-1.5 fill-current" />
                  <span>Sponsor a Child&apos;s Monthly Care</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
