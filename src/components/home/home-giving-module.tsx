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
  const tillName = settings.mpesaTillName || DEFAULT_SETTINGS.mpesaTillName || "SUGGUTTA FELLOWSHIP CHURCH";
  const pastorName = settings.pastorName || DEFAULT_SETTINGS.pastorName;
  const kcbAccount = settings.kcbAccountNumber || DEFAULT_SETTINGS.kcbAccountNumber || "1356891853";
  const kcbName = settings.kcbAccountName || DEFAULT_SETTINGS.kcbAccountName || "SUGGUTTA FELLOWSHIP CHURCH";
  const kcbBranch = settings.kcbBranch || DEFAULT_SETTINGS.kcbBranch;
  const kcbSwift = settings.kcbSwift || DEFAULT_SETTINGS.kcbSwift;
  const paybillNumber = settings.mpesaPaybill || DEFAULT_SETTINGS.mpesaPaybill || "522533";
  const paybillAccount = settings.mpesaPaybillAccount || DEFAULT_SETTINGS.mpesaPaybillAccount || "8146952";
  const paybillName = settings.mpesaPaybillName || DEFAULT_SETTINGS.mpesaPaybillName || "SUGGUTTA FELLOWSHIP CHURCH";

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

              {/* Method 2: Universal Paybill (M-Pesa, Vooma, Airtel Money, T-Kash) */}
              <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-blue-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      Method 2: Paybill
                    </span>
                    <span className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Universal Paybill</span>
                    </span>
                  </div>

                  {/* Scannable Paybill QR directly visible */}
                  <PaymentQrCode
                    type="paybill"
                    customQrImage={settings.mpesaPaybillQrImage}
                    paybillNumber={paybillNumber}
                    accountRef={paybillAccount}
                  />

                  {/* Business & Account Numbers */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                          Paybill / Business No
                        </span>
                        <span className="text-xl sm:text-2xl font-mono font-black text-slate-950 block mt-0.5">
                          {paybillNumber}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy("pb_num", paybillNumber)}
                        className="rounded-full text-xs font-bold mt-2 border-blue-200 hover:bg-blue-50 text-blue-700 w-full"
                      >
                        {copiedKey === "pb_num" ? <Check className="w-3 h-3 text-emerald-600 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                        <span>{copiedKey === "pb_num" ? "Copied" : "Copy Paybill"}</span>
                      </Button>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-blue-700 uppercase font-bold tracking-wider block">
                          Account Number
                        </span>
                        <span className="text-xl sm:text-2xl font-mono font-black text-slate-950 block mt-0.5">
                          {paybillAccount}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCopy("pb_acc", paybillAccount)}
                        className="rounded-full text-xs font-bold mt-2 bg-blue-700 hover:bg-blue-800 text-white w-full"
                      >
                        {copiedKey === "pb_acc" ? <Check className="w-3 h-3 text-emerald-600 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                        <span>{copiedKey === "pb_acc" ? "Copied" : "Copy Account"}</span>
                      </Button>
                    </div>
                  </div>

                  {/* Multi-channel compatibility strip */}
                  <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-1.5">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>Business Name: {paybillName}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-[10px] pt-0.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100/80 text-emerald-800 font-bold">
                        M-PESA: {paybillNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-100/80 text-purple-800 font-bold">
                        Vooma / *844#
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-red-100/80 text-red-800 font-bold">
                        Airtel: {paybillNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-sky-100/80 text-sky-800 font-bold">
                        T-kash: *334#
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: International (Sendwave - Mobile & Bank) */}
        {activeTab === "international" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Destination 1: Sendwave to Mobile */}
              <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-emerald-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Method 1: Mobile (Sendwave)
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>0% Fee &bull; Instant</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Send directly from debit cards in the USA, UK, Canada &amp; Europe into our verified pastoral line:
                  </p>

                  <PaymentQrCode
                    type="sendwave"
                    phone={rawPhone}
                    recipientName={pastorName}
                  />

                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Recipient Mobile:</span>
                        <span className="font-mono font-black text-slate-900 text-sm sm:text-base">{rawPhone}</span>
                        <span className="text-[10px] text-slate-600 block mt-0.5">Name: <strong>{pastorName}</strong></span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCopy("sw_phone", rawPhone)}
                        className="rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        {copiedKey === "sw_phone" ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                        <span>{copiedKey === "sw_phone" ? "Copied" : "Copy Mobile"}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destination 2: Sendwave to Bank Account */}
              <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-blue-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#005A9C] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      Method 2: KCB Bank (Sendwave)
                    </span>
                    <span className="text-[11px] font-bold text-[#005A9C] flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Direct Bank Deposit</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    In Sendwave, select <strong>Bank Transfer (Kenya)</strong> &rarr; <strong>KCB Bank</strong> to deposit funds directly:
                  </p>

                  <PaymentQrCode
                    type="kcb_bank"
                    accountNumber={kcbAccount}
                    accountName={kcbName}
                    paybillNumber={paybillNumber}
                  />

                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-blue-700 uppercase font-bold block">KCB Account Number:</span>
                        <span className="font-mono font-black text-slate-950 text-sm sm:text-base">{kcbAccount}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCopy("sw_bank", kcbAccount)}
                        className="rounded-full text-xs font-bold bg-[#005A9C] hover:bg-[#00487c] text-white"
                      >
                        {copiedKey === "sw_bank" ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                        <span>{copiedKey === "sw_bank" ? "Copied" : "Copy Acc"}</span>
                      </Button>
                    </div>
                    <div className="pt-1 border-t border-blue-200/80 flex flex-wrap justify-between gap-1 text-[11px] text-slate-700">
                      <span>Bank: <strong>KCB Bank Kenya</strong></span>
                      <span>Name: <strong>{kcbName}</strong></span>
                    </div>
                  </div>
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
