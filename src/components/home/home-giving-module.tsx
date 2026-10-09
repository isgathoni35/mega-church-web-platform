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
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentQrCode } from "@/components/giving/payment-qr-code";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface HomeGivingModuleProps {
  settings?: SiteSettingsData;
}

export function HomeGivingModule({ settings: propSettings }: HomeGivingModuleProps) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const rawPhone = settings.mpesaPhone || DEFAULT_SETTINGS.mpesaPhone;
  const cleanPhone = rawPhone.replace(/[\s\-]/g, "");
  const localCleanPhone = cleanPhone.startsWith("+254") ? "0" + cleanPhone.slice(4) : cleanPhone;
  const tillNumber = settings.mpesaTillNumber || DEFAULT_SETTINGS.mpesaTillNumber || "8146952";
  const tillName = settings.mpesaTillName || DEFAULT_SETTINGS.mpesaTillName || "Suggutta Fellowship Church";
  const pastorName = settings.pastorName || DEFAULT_SETTINGS.pastorName;
  const kcbAccount = settings.kcbAccountNumber || DEFAULT_SETTINGS.kcbAccountNumber || "1356891853";
  const kcbName = settings.kcbAccountName || DEFAULT_SETTINGS.kcbAccountName || "Sugutta Fellowship church";
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

        {/* Tab 1: Kenyans (Buy Goods Till & Send Money) */}
        {activeTab === "kenya" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Method 1: Lipa na M-Pesa Buy Goods Till */}
              <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-emerald-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Lipa na M-Pesa &bull; Zero Fees
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Official Till</span>
                    </span>
                  </div>

                  {/* Scannable Till QR directly visible */}
                  <PaymentQrCode
                    type="till"
                    customQrImage={settings.mpesaTillQrImage}
                    tillNumber={tillNumber}
                    tillName={tillName}
                  />

                  <div>
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">
                      Buy Goods Till Number
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-2xl sm:text-3xl font-mono font-black text-slate-950 tracking-wider">
                        {tillNumber}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleCopy("till", tillNumber)}
                        className="rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        {copiedKey === "till" ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                        <span>{copiedKey === "till" ? "Copied" : "Copy"}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-emerald-900 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Registered Name: {tillName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Zero Safaricom transaction fees when paying via Buy Goods.
                    </div>
                  </div>
                </div>
              </div>

              {/* Method 2: Send Money Direct (Pastor Line) */}
              <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-orange-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                      Direct Pastoral Altar Line
                    </span>
                    <span className="text-[11px] font-bold text-[#ff6b35] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>M-Pesa Direct</span>
                    </span>
                  </div>

                  {/* Scannable Send Money QR directly visible */}
                  <PaymentQrCode
                    type="send_money"
                    phone={localCleanPhone}
                    recipientName={pastorName}
                  />

                  <div>
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">
                      Send Money / Pastoral Line
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-2xl sm:text-3xl font-mono font-black text-slate-950 tracking-wider">
                        {localCleanPhone}
                      </span>
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
                    <div className="font-bold text-slate-900">Registered Recipient: {pastorName}</div>
                    <div className="text-[11px] text-slate-500">
                      Direct offering seeds and prayer confirmation line.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: International (Sendwave & KCB Wire) */}
        {activeTab === "international" && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-extrabold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>0% Transfer Fees &bull; Instant Delivery</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Method 1: Sendwave (USA, UK, Europe &amp; Canada)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Sendwave allows diaspora partners to send tithes, offerings, and orphan support directly to our pastor&apos;s verified M-Pesa line or KCB bank account with zero fees.
                  </p>

                  <div className="space-y-2 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-slate-500 font-medium block">Sendwave Recipient Mobile:</span>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-slate-900 text-sm">{rawPhone}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy("sw_phone", rawPhone)}
                          className="text-[#ff6b35] hover:underline font-bold text-[11px]"
                        >
                          {copiedKey === "sw_phone" ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <span className="text-[11px] text-slate-500 block">Recipient: {pastorName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#fffaf5] border border-orange-200/80">
                  <PaymentQrCode
                    type="sendwave"
                    phone={rawPhone}
                    recipientName={pastorName}
                  />
                </div>
              </div>
            </div>

            {/* Method 2: KCB Bank International Wire */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#005A9C]" />
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  Method 2: KCB Bank Direct International Wire (TT / SWIFT)
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Bank &bull; SWIFT</span>
                  <span className="font-bold text-slate-900 block mt-0.5">Kenya Commercial Bank</span>
                  <span className="font-mono text-slate-600 block text-[11px]">SWIFT: {kcbSwift}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Account Name</span>
                  <span className="font-bold text-slate-900 block mt-0.5 truncate">{kcbName}</span>
                  <span className="text-slate-500 block text-[11px]">{kcbBranch}</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                  <div>
                    <span className="text-blue-700 text-[10px] uppercase font-bold block">Account Number</span>
                    <span className="font-mono font-black text-slate-950 block mt-0.5">{kcbAccount}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy("intl_kcb", kcbAccount)}
                    className="h-8 text-xs font-bold text-[#005A9C]"
                  >
                    {copiedKey === "intl_kcb" ? <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    <span>{copiedKey === "intl_kcb" ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
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
