"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  Smartphone,
  Globe2,
  ExternalLink,
  Gift,
  ArrowRight,
  BookOpen,
  Building,
  PhoneCall,
  CheckCircle2,
  Users,
  Utensils,
  GraduationCap,
  Home,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentQrCode } from "@/components/giving/payment-qr-code";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

type PaymentTab = "kenya" | "international";

interface OrphanageDonateViewProps {
  settings?: SiteSettingsData;
}

export function OrphanageDonateView({ settings: propSettings }: OrphanageDonateViewProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const rawPhone = settings.mpesaPhone || DEFAULT_SETTINGS.mpesaPhone;
  const cleanPhone = rawPhone.replace(/[\s\-]/g, "");
  const localCleanPhone = cleanPhone.startsWith("+254") ? "0" + cleanPhone.slice(4) : cleanPhone;
  const waPhone = cleanPhone.replace(/^\+/, "");
  const tillNumber = settings.mpesaTillNumber || DEFAULT_SETTINGS.mpesaTillNumber || "8146952";
  const tillName = settings.mpesaTillName || DEFAULT_SETTINGS.mpesaTillName || "SUGGUTTA FELLOWSHIP CHURCH";
  const paybillNumber = settings.mpesaPaybill || DEFAULT_SETTINGS.mpesaPaybill || "522533";
  const paybillAccount = settings.mpesaPaybillAccount || DEFAULT_SETTINGS.mpesaPaybillAccount || "8146952";
  const paybillName = settings.mpesaPaybillName || DEFAULT_SETTINGS.mpesaPaybillName || "SUGGUTTA FELLOWSHIP CHURCH";
  const kcbAccount = settings.kcbAccountNumber || DEFAULT_SETTINGS.kcbAccountNumber || "1356891853";
  const kcbName = settings.kcbAccountName || DEFAULT_SETTINGS.kcbAccountName || "SUGGUTTA FELLOWSHIP CHURCH";
  const kcbBank = "Kenya Commercial Bank (KCB)";
  const kcbBranch = settings.kcbBranch || DEFAULT_SETTINGS.kcbBranch;
  const kcbSwift = settings.kcbSwift || DEFAULT_SETTINGS.kcbSwift;
  const donateImage = settings.orphanageDonateImageUrl || settings.orphanageImageUrl || "/images/orphanage-hero.png";

  const [activeTab, setActiveTab] = useState<PaymentTab>("kenya");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="w-full bg-[#fbf8f3] text-slate-900 pb-12 sm:pb-24">
      {/* 1. Hero Section & Impact Justification with Dynamic Admin Image */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] border-b border-slate-200/80 pt-8 sm:pt-14 pb-8 sm:pb-14 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Mission Narrative & Mandate */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-5 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Heavens Gates Suggutta Children&apos;s Home Trust</span>
              </div>

              {/* Headline */}
              <h1 className="font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#0f172a] tracking-tight leading-tight">
                Stand In the Gap for a Child Today
              </h1>
              <div className="w-14 sm:w-20 h-1 bg-[#ff6b35] rounded-full mx-auto lg:mx-0" />

              {/* Subtitle */}
              <p className="text-xs sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Every shilling and dollar you give is converted directly into hot
                nutritional meals, school tuition, books, clean beds, and medical
                care for over 60 orphaned and vulnerable boys and girls.
              </p>

              {/* Scripture Anchor Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-orange-200/80 border-l-4 border-l-[#ff6b35] shadow-sm max-w-2xl mx-auto lg:mx-0 text-left space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[#ff6b35] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Biblical Mandate</span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-slate-900 leading-relaxed">
                  &ldquo;Pure and undefiled religion before God and the Father is
                  this: to visit orphans and widows in their trouble, and to keep
                  oneself unspotted from the world.&rdquo;
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-bold text-[#ff6b35]">
                    — James 1:27
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Direct Allocation</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Admin Head/Donation Photo */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-amber-500/10 rounded-3xl blur-2xl transform scale-95" />
              <div className="relative w-full max-w-xs sm:max-w-md aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <Image
                  src={donateImage}
                  alt="Suggutta Children's Home Donation Hero"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-between">
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 block truncate">
                      Suggutta Children&apos;s Home
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#ff6b35] font-bold block truncate">
                      Preserving 60+ Precious Young Destinies
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-orange-50 text-[#ff6b35] border border-orange-200 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 fill-current text-[#ff6b35]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Transparency & Where Your Donation Goes */}
      <section className="py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-1.5">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#ff6b35]">
              100% Direct Impact
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Why Your Support Matters Right Now
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Heavens Gates Children&apos;s Home is completely faith-funded. We
              rely on friends, partners, and compassionate well-wishers to keep
              the doors open and the children thriving.
            </p>
          </div>

          {/* 3 Impact Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff6b35] flex items-center justify-center font-bold">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                Daily Nutrition &amp; Food
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                60+ growing children eat three balanced meals each day. Your
                donation purchases sacks of rice, maize flour, milk, beans, and
                fresh produce from local farmers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff6b35] flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                School Fees &amp; Uniforms
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every child is enrolled in formal school. We cover full term
                tuition fees, official uniforms, school shoes, textbooks, and
                stationery so their future is secure.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff6b35] flex items-center justify-center font-bold">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                Healthcare &amp; Motherly Love
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Warm beds, clean dormitories, routine pediatric clinics,
                emergency medicines, and 24/7 Christian house mothers who provide
                unconditional parental warmth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Direct Donation Portal (Kenya & International) */}
      <section className="py-4 sm:py-8 px-4 sm:px-8 scroll-reveal">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Tab Switcher */}
          <div className="flex justify-center w-full">
            <div className="w-full max-w-md grid grid-cols-2 p-1 sm:p-1.5 rounded-full bg-slate-200/80 border border-slate-300/80 shadow-inner gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("kenya")}
                className={`flex items-center justify-center gap-1.5 px-2 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                  activeTab === "kenya"
                    ? "bg-[#ff6b35] text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <Smartphone className="w-4 h-4 shrink-0" />
                <span className="hidden xs:inline">M-Pesa (Kenya)</span>
                <span className="xs:hidden">M-Pesa</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("international")}
                className={`flex items-center justify-center gap-1.5 px-2 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                  activeTab === "international"
                    ? "bg-[#ff6b35] text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <Globe2 className="w-4 h-4 shrink-0" />
                <span className="hidden xs:inline">Diaspora (Sendwave)</span>
                <span className="xs:hidden">Diaspora</span>
              </button>
            </div>
          </div>

          {/* TAB 1: KENYAN DONATIONS (Till + Send Money) */}
          {activeTab === "kenya" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* METHOD 1: M-PESA BUY GOODS (TILL NUMBER) */}
                <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-emerald-300 shadow-md flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-emerald-600/20">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                            Recommended &bull; Zero Transaction Fees
                          </span>
                          <h3 className="font-extrabold text-base sm:text-xl text-slate-900">
                            Method 1: Lipa na M-Pesa (Buy Goods Till)
                          </h3>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Official Till</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Give directly to support orphaned children via our registered Safaricom Till Number with zero transaction fees to your mobile line:
                    </p>

                    {/* Scannable Till QR directly visible */}
                    <PaymentQrCode
                      type="till"
                      customQrImage={settings.mpesaTillQrImage}
                      tillNumber={tillNumber}
                      tillName={tillName}
                    />

                    <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Till Number (Buy Goods)
                        </span>
                        <span className="font-mono text-2xl sm:text-3xl font-black text-slate-950 tracking-wider">
                          {tillNumber}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-emerald-800 font-bold mt-1">
                          <ShieldCheck className="h-4 w-4 text-emerald-600" />
                          <span>Registered Name: {tillName}</span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(tillNumber, "till")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-10 px-4 rounded-xl shadow-sm"
                      >
                        {copiedKey === "till" ? (
                          <>
                            <Check className="h-4 w-4 mr-1 text-white" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            <span>Copy Till Number</span>
                          </>
                        )}
                      </Button>
                    </div>

                    <ol className="space-y-2 text-xs sm:text-sm text-slate-700 pt-1">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                        <span>Open <strong>M-Pesa</strong> &rarr; Select <strong>Lipa na M-Pesa</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                        <span>Select <strong>Buy Goods and Services</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                        <span>Enter Till Number: <strong className="font-mono text-slate-900">{tillNumber}</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                        <span>Enter amount &amp; PIN &rarr; Verify name is <strong>{tillName}</strong>.</span>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* METHOD 2: M-PESA & KCB BANK PAYBILL */}
                <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-blue-300 shadow-md flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#005A9C] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-blue-600/20">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#005A9C] block">
                            KCB Bank &bull; Multi-Network Paybill
                          </span>
                          <h3 className="font-extrabold text-base sm:text-xl text-slate-900">
                            Method 2: M-Pesa Paybill
                          </h3>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Official Paybill</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Give directly to the children&apos;s welfare via our registered church Paybill across M-Pesa, Airtel Money, Vooma, or T-kash:
                    </p>

                    {/* Scannable Paybill QR */}
                    <PaymentQrCode
                      type="paybill"
                      paybillNumber={paybillNumber}
                      accountRef={paybillAccount}
                    />

                    {/* Paybill & Account Grid */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            Paybill / Business No
                          </span>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-mono text-2xl sm:text-3xl font-black text-slate-950 tracking-wider">
                              {paybillNumber}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => copyToClipboard(paybillNumber, "paybill_no")}
                              className="bg-[#005A9C] hover:bg-[#00487c] text-white text-xs font-bold h-9 px-3 rounded-xl shadow-xs"
                            >
                              {copiedKey === "paybill_no" ? (
                                <>
                                  <Check className="h-3.5 w-3.5 mr-1" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5 mr-1" />
                                  <span>Copy</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            Account Number
                          </span>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-mono text-2xl sm:text-3xl font-black text-slate-950 tracking-wider">
                              {paybillAccount}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => copyToClipboard(paybillAccount, "paybill_acc")}
                              className="bg-[#005A9C] hover:bg-[#00487c] text-white text-xs font-bold h-9 px-3 rounded-xl shadow-xs"
                            >
                              {copiedKey === "paybill_acc" ? (
                                <>
                                  <Check className="h-3.5 w-3.5 mr-1" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5 mr-1" />
                                  <span>Copy</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                        <span className="text-slate-500">Business / Account Name:</span>
                        <span className="font-bold text-slate-900">{paybillName}</span>
                      </div>

                      <div className="pt-2 border-t border-blue-200/80 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Also Supports:</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Airtel Money ({paybillNumber})
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          Vooma (*844#)
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                          T-kash (*334#)
                        </span>
                      </div>
                    </div>

                    <ol className="space-y-2 text-xs sm:text-sm text-slate-700 pt-1">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                        <span>Open <strong>M-Pesa</strong> &rarr; Select <strong>Lipa na M-Pesa</strong> &rarr; <strong>Paybill</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                        <span>Enter Business Number: <strong className="font-mono text-slate-900">{paybillNumber}</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                        <span>Enter Account Number: <strong className="font-mono text-slate-900">{paybillAccount}</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                        <span>Enter amount &amp; PIN &rarr; Confirm recipient is <strong>{paybillName}</strong>.</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERNATIONAL DONATIONS (SENDWAVE - MOBILE & BANK) */}
          {activeTab === "international" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Sendwave Diaspora Hub Banner */}
              <div className="bg-[#0f172a] rounded-3xl p-5 sm:p-8 text-white text-center space-y-2 sm:space-y-3 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[#ff6b35] mx-auto">
                  <Globe2 className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-xl sm:text-3xl text-white">
                  International Diaspora Giving (Sendwave)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Send your donation gifts directly from debit cards in the USA, UK, Canada &amp; Europe into our verified mobile line or KCB Bank account with <strong className="text-white">0% transfer fees &amp; instant delivery</strong>.
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.sendwave.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-md"
                  >
                    <span>Launch Sendwave App</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Two Independent Methods Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* OPTION A: SENDWAVE TO MOBILE */}
                <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-orange-300 shadow-md flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-orange-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#ff6b35] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-orange-600/20">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff6b35] block">
                            Direct to Mobile &bull; Instant Delivery
                          </span>
                          <h4 className="font-extrabold text-base sm:text-xl text-slate-900">
                            Method 1: Sendwave to Mobile
                          </h4>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-900 text-[11px] font-bold">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#ff6b35]" />
                        <span>Instant M-Pesa</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      In the Sendwave app, select <strong>Kenya &rarr; Mobile Money</strong> and enter our verified recipient phone:
                    </p>

                    {/* Dedicated Sendwave Mobile QR (points to https://www.sendwave.com) */}
                    <PaymentQrCode
                      type="sendwave"
                      phone={rawPhone}
                      recipientName={settings.pastorName}
                    />

                    <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/80 border border-orange-200/90 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Recipient Phone Number
                        </span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono text-xl sm:text-2xl font-black text-slate-950 tracking-wider">
                            {rawPhone}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => copyToClipboard(rawPhone, "sw_phone")}
                            className="bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs font-bold h-9 px-3 rounded-xl shadow-xs"
                          >
                            {copiedKey === "sw_phone" ? (
                              <>
                                <Check className="h-3.5 w-3.5 mr-1" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                <span>Copy</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                        <span className="text-slate-500">Recipient Name:</span>
                        <span className="font-bold text-slate-900">{settings.pastorName}</span>
                      </div>
                    </div>

                    <ol className="space-y-2 text-xs sm:text-sm text-slate-700 pt-1">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                        <span>Open <strong>Sendwave</strong> on iOS/Android.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                        <span>Select destination: <strong>Kenya &rarr; Mobile Money (M-Pesa)</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                        <span>Enter mobile number: <strong className="font-mono text-slate-900">{rawPhone}</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                        <span>Recipient appears as <strong>{settings.pastorName}</strong> &rarr; Confirm zero-fee transfer.</span>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* OPTION B: SENDWAVE TO KCB BANK ACCOUNT */}
                <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-blue-300 shadow-md flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#005A9C] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-blue-600/20">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#005A9C] block">
                            Direct Deposit &bull; Large Sums
                          </span>
                          <h4 className="font-extrabold text-base sm:text-xl text-slate-900">
                            Method 2: Sendwave to KCB Bank
                          </h4>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#005A9C]" />
                        <span>KCB Account</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      In Sendwave (or standard Wire/SWIFT transfer), select <strong>Kenya &rarr; Bank Account</strong> and enter our official church account details:
                    </p>

                    {/* Dedicated Bank Account QR Code */}
                    <PaymentQrCode
                      type="kcb_bank"
                      customQrImage={settings.kcbBankQrImage}
                      bankName={kcbBank}
                      accountNumber={kcbAccount}
                      accountName={kcbName}
                    />

                    <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Bank Account Number
                        </span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono text-xl sm:text-2xl font-black text-slate-950 tracking-wider">
                            {kcbAccount}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => copyToClipboard(kcbAccount, "kcb_acc")}
                            className="bg-[#005A9C] hover:bg-[#00487c] text-white text-xs font-bold h-9 px-3 rounded-xl shadow-xs"
                          >
                            {copiedKey === "kcb_acc" ? (
                              <>
                                <Check className="h-3.5 w-3.5 mr-1" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                <span>Copy</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-blue-200/80 space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Account Name:</span>
                          <span className="font-bold text-slate-900">{kcbName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Bank &amp; Branch:</span>
                          <span className="font-bold text-slate-900">{kcbBank} ({kcbBranch})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">SWIFT / BIC:</span>
                          <span className="font-mono font-bold text-slate-900">{kcbSwift}</span>
                        </div>
                      </div>
                    </div>

                    <ol className="space-y-2 text-xs sm:text-sm text-slate-700 pt-1">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                        <span>Open <strong>Sendwave</strong> &rarr; Select <strong>Bank Account</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                        <span>Bank: <strong>{kcbBank}</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                        <span>Account Number: <strong className="font-mono text-slate-900">{kcbAccount}</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                        <span>Recipient: <strong>{kcbName}</strong> &rarr; Confirm transfer.</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. In-Kind Food & Material Drop-Offs */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
              <Gift className="w-5 h-5 text-[#ff6b35]" />
              <span>Donating Physical Supplies or Foodstuffs?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We warmly accept dry foods (rice, maize flour, beans, cooking
              oil, sugar, salt), school stationery, blankets, clothing, shoes,
              and hygiene packs. Deliveries can be made to our Main Sanctuary
              Altar in Nairobi or directly to the Mai Mahiu Children&apos;s Home.
            </p>
            <div className="pt-2">
              <Link
                href="/contact?subject=orphanage_visit"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ff6b35] hover:underline"
              >
                <span>Coordinate a drop-off or schedule a visit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 5. Pastoral Confirmation & WhatsApp Assistance */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0f172a] text-white text-center space-y-3.5 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden ring-2 ring-[#C59B27] shadow-lg shrink-0 bg-white mx-auto">
              <Image
                src="/images/sugutta-logo.png"
                alt="Suggutta Fellowship Church Seal"
                fill
                sizes="64px"
                className="object-contain p-0.5"
              />
            </div>
            <span className="font-script text-[#C59B27] text-xl sm:text-2xl block">
              God Bless You for Blessing His Little Ones
            </span>
            <h4 className="text-base sm:text-xl font-bold text-white">
              Official Orphanage Trust &amp; Pastoral Confirmation
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Send your M-Pesa or Sendwave confirmation message to our direct
              Pastoral Care line to receive a word of prayer and official
              acknowledgment.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${settings.pastorName}, I have sent a donation for the Children's Home.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs sm:text-sm font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/20 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Pastoral Line ({rawPhone})</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
