"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Globe2,
  Copy,
  Check,
  Building2,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SendwaveQR } from "@/components/giving/sendwave-qr";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

const GIVING_FUNDS = [
  { code: "OFFERING", name: "Offering" },
  { code: "TITHE", name: "Tithe" },
  { code: "ORPHANAGE", name: "Children's Home" },
  { code: "SEED", name: "Prophetic Seed" },
  { code: "BUILDING", name: "Building Fund" },
];

interface HomeGivingModuleProps {
  settings?: SiteSettingsData;
}

export function HomeGivingModule({ settings: propSettings }: HomeGivingModuleProps) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const rawPhone = settings.mpesaPhone || DEFAULT_SETTINGS.mpesaPhone;
  const cleanPhone = rawPhone.replace(/[\s\-]/g, "");
  const localCleanPhone = cleanPhone.startsWith("+254") ? "0" + cleanPhone.slice(4) : cleanPhone;
  const paybill = settings.mpesaPaybill || DEFAULT_SETTINGS.mpesaPaybill;
  const kcbAccount = settings.kcbAccountNumber || DEFAULT_SETTINGS.kcbAccountNumber;
  const kcbName = settings.kcbAccountName || DEFAULT_SETTINGS.kcbAccountName;
  const kcbBranch = settings.kcbBranch || DEFAULT_SETTINGS.kcbBranch;
  const kcbSwift = settings.kcbSwift || DEFAULT_SETTINGS.kcbSwift;

  const [activeTab, setActiveTab] = useState<"kenya" | "international">("kenya");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-[#fbf8f3] text-slate-900 border-t border-slate-200/80 overflow-hidden" id="give">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Centered Orange Header matching Neno */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>Covenant Giving &bull; Tithes &amp; Offerings</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight">
            Give &amp; Support the Ministry
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Partner with the altar of God to transform lives, preach the Gospel in global crusades, and shelter orphaned children.
          </p>
        </div>

        {/* Tab Switcher matching Neno */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-slate-200/80 border border-slate-300/80 shadow-inner gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("kenya")}
              className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === "kenya"
                  ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>For Kenyans (M-Pesa)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("international")}
              className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === "international"
                  ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>International (Sendwave)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Kenyans (M-Pesa Send Money & Paybill) */}
        {activeTab === "kenya" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Paybill Card */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  Lipa na M-Pesa
                </span>
                <span className="text-xs text-slate-500">Method 1</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">Business Paybill Number</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-slate-950 tracking-wider">{paybill}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy("paybill", paybill)}
                    className="rounded-full text-xs font-bold border-orange-200 hover:bg-orange-50 text-[#ff6b35]"
                  >
                    {copiedKey === "paybill" ? <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    <span>{copiedKey === "paybill" ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 block">Account Reference Codes (Click to Copy):</span>
                <div className="flex flex-wrap gap-1.5">
                  {GIVING_FUNDS.map((f) => (
                    <button
                      key={f.code}
                      type="button"
                      onClick={() => handleCopy(f.code, f.code)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-orange-100 hover:text-[#ff6b35] text-[11px] font-mono font-bold text-slate-800 transition-colors flex items-center gap-1 border border-slate-200"
                    >
                      <span>{f.code}</span>
                      {copiedKey === f.code ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5 opacity-50" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Send Money Card */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  M-Pesa Direct Line
                </span>
                <span className="text-xs text-slate-500">Method 2</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">Send Money / Pastoral Hotline</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-slate-950 tracking-wider">{rawPhone}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy("phone", localCleanPhone)}
                    className="rounded-full text-xs font-bold border-orange-200 hover:bg-orange-50 text-[#ff6b35]"
                  >
                    {copiedKey === "phone" ? <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    <span>{copiedKey === "phone" ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900">Registered Name: {settings.pastorName}</div>
                <div className="text-[11px] text-slate-500">Use this number to send directly or call for pastoral receipt confirmation.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: International (Sendwave) */}
        {activeTab === "international" && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>0% Transfer Fees &bull; Instant Delivery</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Send from USA, UK, Europe &amp; Canada via Sendwave
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sendwave allows diaspora partners to send tithes, offerings, and orphan support directly to our Kenya Commercial Bank account or M-Pesa line instantly with zero transaction fees.
                </p>

                <div className="space-y-1.5 pt-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 font-medium">Recipient Bank:</span>
                    <span className="font-bold text-slate-900">Kenya Commercial Bank (KCB)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 font-medium">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{kcbAccount}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("kcb", kcbAccount)}
                        className="text-[#ff6b35] hover:underline font-bold text-[11px]"
                      >
                        {copiedKey === "kcb" ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#fffaf5] border border-orange-200/80">
                <SendwaveQR />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Full Portal Button */}
        <div className="text-center pt-2 sm:pt-4">
          <Button
            size="lg"
            className="rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold shadow-md shadow-orange-500/20 px-6 py-3 sm:px-8 sm:py-6 text-xs sm:text-sm h-auto"
            asChild
          >
            <Link href="/give">
              <span>View Full Giving Portal &amp; Tithes Information</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
