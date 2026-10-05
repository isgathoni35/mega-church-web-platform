"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Building2,
  Check,
  Copy,
  Hammer,
  Layers,
  ShieldCheck,
  Smartphone,
  Globe2,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
            <Hammer className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Ongoing Church Project &bull; Appeal to Well-Wishers</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#ff6b35]">
            Sanctuary Construction &amp; Building Project
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We are actively erecting a permanent house of worship and refuge in Sugutta. We invite local well-wishers and international friends across the globe to partner with Pastor Caesar Osebe Nyandwaro in laying these enduring kingdom foundations.
          </p>
        </div>

        {/* Construction Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Narrative, Scripture & Milestones */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#ff6b35]">
                <Building2 className="w-4 h-4" />
                <span>The Vision in Sugutta</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Building an Enduring House of Prayer, Deliverance &amp; Community Refuge
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                With five vibrant Sunday worship sessions and midweek gatherings overflowing our temporary hall, our congregation is moving forward in faith. 100% of contributions received go straight into stone masonry, steel pillar reinforcement, and sanctuary roofing.
              </p>

              {/* 3 Project Phases */}
              <div className="space-y-3 pt-1">
                <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/70 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#ff6b35] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        Phase 1: Foundation &amp; Structural Sub-Grade
                      </h4>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Underway
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Ground excavation, concrete footings, and structural masonry block walls.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        Phase 2: Pillar Columns, Superstructure &amp; Roof Trussing
                      </h4>
                      <span className="px-1.5 py-0.5 rounded bg-orange-100 text-[#ff6b35] text-[10px] font-bold">
                        Current Focus
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Reinforced steel rebar pillars and heavy-gauge timber/iron roofing enclosure.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        Phase 3: Altar Platform, Sanctuary Seating &amp; Audio/Visual
                      </h4>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                        Upcoming
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Flooring screed, pulpit stage, acoustic treatment, and high-capacity congregation pews.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scripture quote */}
              <div className="pt-2 text-xs italic text-slate-500 font-serif border-t border-slate-100">
                &ldquo;Arise, and let us build the sanctuary of the Lord God...&rdquo; &mdash; 1 Chronicles 22:19
              </div>
            </div>
          </div>

          {/* Right Column: Clear Contribution & Giving Channels Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-200 shadow-xl space-y-6 relative overflow-hidden">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff6b35] text-white text-[10px] font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Clear Earmarked Giving</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  How Well-Wishers &amp; Friends Can Contribute
                </h3>
                <p className="text-xs text-slate-600">
                  Whether in Kenya or internationally, use these exact channels to ensure your gift is designated specifically to Church Construction:
                </p>
              </div>

              {/* 1. Kenyan Well-Wishers (M-Pesa) */}
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-[#ff6b35]" />
                    <span>For Kenyans &bull; M-Pesa Paybill</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-[#ff6b35]">
                    Lipa na M-Pesa
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        Paybill No:
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {settings.mpesaPaybill || "174379"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("home_paybill", settings.mpesaPaybill || "174379")}
                      className="text-xs font-bold text-[#ff6b35] p-1 hover:bg-orange-50 rounded"
                    >
                      {copiedField === "home_paybill" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-orange-100/70 border border-orange-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#ff6b35] block uppercase">
                        Account No:
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        BUILDING
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("home_acc", "BUILDING")}
                      className="text-xs font-bold text-[#ff6b35] p-1 hover:bg-white rounded"
                    >
                      {copiedField === "home_acc" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. International Friends (Sendwave / Bank Wire) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-[#ff6b35]" />
                    <span>International Friends &bull; Sendwave / Wire</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    Direct Remittance
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <p className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-500">Sendwave / Remitly:</span>
                    <strong className="text-slate-900">
                      {settings.mpesaPhone || "+254112656123"}
                    </strong>
                  </p>
                  <p className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-500">KCB Bank Kenya:</span>
                    <strong className="text-slate-900">
                      Acc: {settings.kcbAccountNumber || "1234567890"}
                    </strong>
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    Specify memo / reference: <strong>CHURCH CONSTRUCTION</strong>
                  </p>
                </div>
              </div>

              {/* Main CTA: View Full 3-State Campaign Donation Flow */}
              <Button
                asChild
                size="lg"
                className="w-full font-extrabold text-sm sm:text-base bg-[#ff6b35] hover:bg-[#ea580c] text-white rounded-full py-4 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 border-0"
              >
                <Link href="/give?fund=building&campaign=construction">
                  <span>Make a Contribution to Construction</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
