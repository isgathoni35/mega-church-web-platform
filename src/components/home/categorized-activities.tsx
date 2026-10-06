"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Building2,
  Check,
  Copy,
  Hammer,
  ShieldCheck,
  Smartphone,
  Globe2,
  Heart,
  Baby,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface CategorizedActivitiesProps {
  settings?: SiteSettingsData;
}

export function CategorizedActivities({ settings: propSettings }: CategorizedActivitiesProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section
      className="py-12 sm:py-16 lg:py-24 bg-[#fbf8f3] border-t border-slate-200/70 relative overflow-hidden"
      id="activities"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        {/* Centered Orange Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Active Missions &bull; Appeal to Well-Wishers &amp; Global Friends</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#ff6b35]">
            Our Core Missions &amp; Community Projects
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Sugutta Fellowship Church is dedicated to transforming lives through practical compassion and establishing an altar of worship. We invite local partners and international friends to stand with us in these two urgent ongoing efforts.
          </p>
        </div>

        {/* 2 EQUAL HIGH-IMPACT CARDS (CHILDREN'S HOME & SANCTUARY CONSTRUCTION) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Sugutta Children's Home & Compassion Mission */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200/90 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-rose-400 transition-all duration-300">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-extrabold uppercase tracking-wider border border-rose-200">
                  <Baby className="w-3.5 h-3.5" />
                  <span>Children&apos;s Home Mission</span>
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Account Ref: <strong className="text-slate-900 font-mono">ORPHANAGE</strong>
                </span>
              </div>

              {/* Image banner */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={settings.orphanageImageUrl || "/images/orphanage-hero.png"}
                  alt={settings.orphanageTitle || "Sugutta Children's Home"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-extrabold text-sm sm:text-base leading-tight">
                    {settings.orphanageTitle || "Sheltering & Sponsoring 50+ Vulnerable Children"}
                  </p>
                  <p className="text-[11px] text-slate-200">
                    {settings.orphanageSubtitle || "Hot nutritious meals, quality education, medical care & parental love."}
                  </p>
                </div>
              </div>

              {/* Narrative */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {settings.orphanageNarrative ||
                  "Putting faith into tangible action. Every day, our home feeds, clothes, and educates orphaned boys and girls in Sugutta. Sponsoring a child or sending food donations preserves a destiny and fulfills James 1:27."}
              </p>

              {/* Giving Channels Box for Children's Home */}
              <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-rose-600" />
                    <span>M-Pesa Till: {settings.mpesaTillNumber || "8146952"}</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    Buy Goods
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Sendwave / Diaspora</span>
                  </span>
                  <span className="text-[10px] text-slate-700 font-mono font-bold">
                    {settings.mpesaPhone || "+254112656123"}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <Button
              asChild
              size="lg"
              className="w-full font-extrabold text-sm bg-rose-600 hover:bg-rose-700 text-white rounded-full py-4 shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 border-0"
            >
              <Link href="/give?fund=orphanage&step=form">
                <span>Support the Children&apos;s Home</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Card 2: Sugutta Sanctuary Construction & Building Project */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-200/90 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-orange-400 transition-all duration-300">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#c2410c] text-xs font-extrabold uppercase tracking-wider border border-orange-200">
                  <Hammer className="w-3.5 h-3.5" />
                  <span>{settings.constructionBadge || "Sanctuary Construction"}</span>
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Account Ref: <strong className="text-slate-900 font-mono">BUILDING</strong>
                </span>
              </div>

              {/* Image banner */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={settings.constructionImageUrl || "/images/church-construction.jpg"}
                  alt={settings.constructionTitle || "Sanctuary Construction Project"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-extrabold text-sm sm:text-base leading-tight">
                    {settings.constructionTitle || "Building a Permanent House of Prayer in Sugutta"}
                  </p>
                  <p className="text-[11px] text-slate-200">
                    {settings.constructionSubtitle || "Concrete foundation blocks, steel pillar reinforcement & roof trussing."}
                  </p>
                </div>
              </div>

              {/* Narrative */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {settings.constructionNarrative ||
                  "With five vibrant Sunday services and midweek teachings overflowing our temporary hall, our congregation is constructing a permanent sanctuary to shelter worshippers from the rains and house youth discipleship."}
              </p>

              {/* Giving Channels Box for Construction */}
              <div className="p-3.5 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-[#ff6b35]" />
                    <span>M-Pesa Till: {settings.mpesaTillNumber || "8146952"}</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    Buy Goods
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#ff6b35]" />
                    <span>KCB Bank Kenya</span>
                  </span>
                  <span className="text-[10px] text-slate-700 font-mono font-bold">
                    Acc: <strong>{settings.kcbAccountNumber || "1356891853"}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <Button
              asChild
              size="lg"
              className="w-full font-extrabold text-sm bg-[#ff6b35] hover:bg-[#ea580c] text-white rounded-full py-4 shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 border-0"
            >
              <Link href="/give?fund=building&step=form">
                <span>Contribute to Sanctuary Building</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
