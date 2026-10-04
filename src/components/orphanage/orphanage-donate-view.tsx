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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SendwaveQR } from "@/components/giving/sendwave-qr";

type PaymentTab = "kenya" | "international";

export function OrphanageDonateView() {
  const [activeTab, setActiveTab] = useState<PaymentTab>("kenya");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="w-full bg-[#fbf8f3] text-slate-900 pb-12 sm:pb-24">
      {/* 1. Hero Section & Impact Justification */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] border-b border-slate-200/80 pt-8 sm:pt-14 pb-8 sm:pb-14 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-5">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Heavens Gates Children&apos;s Home Trust</span>
          </div>

          {/* Headline */}
          <h1 className="font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#0f172a] tracking-tight leading-tight">
            Stand In the Gap for a Child Today
          </h1>
          <div className="w-14 sm:w-20 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          {/* Subtitle */}
          <p className="text-xs sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Every shilling and dollar you give is converted directly into hot
            nutritional meals, school tuition, books, clean beds, and medical
            care for over 60 orphaned and vulnerable children.
          </p>

          {/* Scripture Anchor Card */}
          <div className="mt-4 p-4 sm:p-6 rounded-2xl bg-white border border-orange-200/80 shadow-sm max-w-2xl mx-auto text-center space-y-1 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[#ff6b35] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Biblical Mandate</span>
            </div>
            <p className="font-serif italic text-xs sm:text-base text-slate-900 leading-relaxed">
              &ldquo;Pure and undefiled religion before God and the Father is
              this: to visit orphans and widows in their trouble, and to keep
              oneself unspotted from the world.&rdquo;
            </p>
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block">
              — James 1:27
            </span>
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
      <section className="py-4 sm:py-8 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Tab Switcher */}
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-slate-200/70 border border-slate-300/80 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab("kenya")}
                className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "kenya"
                    ? "bg-[#ff6b35] text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>🇰🇪</span>
                <span>From Kenya (M-Pesa)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("international")}
                className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "international"
                    ? "bg-[#ff6b35] text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>🌍</span>
                <span>International (Sendwave)</span>
              </button>
            </div>
          </div>

          {/* TAB 1: KENYAN DONATIONS */}
          {activeTab === "kenya" && (
            <div className="space-y-6">
              {/* Paybill Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-orange-200/90 shadow-md space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                    📱
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-xl text-slate-900">
                      M-Pesa Paybill (Designated Orphanage Account)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Funds sent here are automatically allocated strictly to
                      the children&apos;s welfare fund.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Paybill Number */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Business / Paybill No.
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                        174379
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard("174379", "paybill")}
                      className="border-slate-300 text-xs font-semibold h-9"
                    >
                      {copiedKey === "paybill" ? (
                        <Check className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Account Number */}
                  <div className="p-4 rounded-2xl bg-orange-50/80 border-2 border-orange-300 space-y-1 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff6b35] block">
                        Account Name (Crucial)
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#ff6b35] font-mono">
                        ORPHANAGE
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard("ORPHANAGE", "account")}
                      className="bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs font-bold h-9"
                    >
                      {copiedKey === "account" ? (
                        <Check className="h-4 w-4 text-white" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 italic">
                  💡 Note: Entering &ldquo;ORPHANAGE&rdquo; as the account ensures
                  your donation is immediately booked to the children&apos;s
                  food and school fund.
                </p>
              </div>

              {/* Send Money & Bank Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Send Money Direct */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-5 h-5 text-[#ff6b35]" />
                    <h4 className="font-bold text-sm sm:text-base text-slate-900">
                      M-Pesa Send Money (Matron Line)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    Send directly to Pastor Jeannette Taylor for immediate
                    orphanage needs or food market purchases:
                  </p>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      0700 000 001
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard("0700000001", "phone")}
                      className="h-8 text-xs font-semibold"
                    >
                      {copiedKey === "phone" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Bank Wire */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Building className="w-5 h-5 text-[#ff6b35]" />
                    <h4 className="font-bold text-sm sm:text-base text-slate-900">
                      Co-operative Bank Direct Wire
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    For larger organizational sponsorships, school tuition
                    wire, or project partnerships:
                  </p>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <p className="font-semibold text-slate-900">
                      Co-operative Bank of Kenya
                    </p>
                    <p className="text-slate-600">
                      Acc: Heavens Gates Children Trust
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-mono font-bold text-slate-900">
                        01129000000000
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard("01129000000000", "bank")
                        }
                        className="text-[11px] text-[#ff6b35] font-bold hover:underline"
                      >
                        {copiedKey === "bank" ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERNATIONAL DONATIONS (SENDWAVE) */}
          {activeTab === "international" && (
            <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-orange-200/90 shadow-md space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Globe2 className="w-4 h-4" />
                  <span>Sendwave International Remittance</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                  Donate Directly from USA, UK, Canada &amp; Europe
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Sendwave delivers your donation straight to our Kenyan M-Pesa
                  line with <strong className="text-slate-900">zero transfer fees</strong>.
                </p>
              </div>

              {/* Side by Side Walkthrough & QR Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
                {/* 3 Step Walkthrough */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="w-7 h-7 rounded-full bg-[#ff6b35] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </span>
                    <div className="text-xs space-y-0.5">
                      <p className="font-bold text-slate-900">
                        Download or Open Sendwave App
                      </p>
                      <p className="text-slate-500">
                        Available free on App Store and Google Play.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-orange-50 border border-orange-200">
                    <span className="w-7 h-7 rounded-full bg-[#ff6b35] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </span>
                    <div className="text-xs space-y-1">
                      <p className="font-bold text-slate-900">
                        Set Recipient to Kenya M-Pesa
                      </p>
                      <div className="flex items-center gap-2 font-mono font-bold text-slate-900">
                        <span>+254 700 000 001</span>
                        <button
                          type="button"
                          onClick={() =>
                            copyToClipboard("+254700000001", "sendwavePhone")
                          }
                          className="text-[11px] text-[#ff6b35] font-bold hover:underline"
                        >
                          {copiedKey === "sendwavePhone" ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <p className="text-slate-500">
                        Name: Pastor Jeannette Taylor (Orphanage)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="w-7 h-7 rounded-full bg-[#ff6b35] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </span>
                    <div className="text-xs space-y-0.5">
                      <p className="font-bold text-slate-900">
                        Enter Amount &amp; Confirm
                      </p>
                      <p className="text-slate-500">
                        Funds arrive instantly in Kenya with 0% fee.
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://www.sendwave.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl transition-all shadow-md"
                  >
                    <span>Launch Sendwave</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Vector QR Code */}
                <div>
                  <SendwaveQR
                    phone="+254 700 000 001"
                    recipientName="Pastor Jeannette Taylor (Orphanage)"
                  />
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
                alt="Sugutta Fellowship Church Seal"
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
                href="https://wa.me/254700000001?text=Hello%20Pastor%20Jeannette,%20I%20have%20sent%20a%20donation%20for%20the%20Children%27s%20Home."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs sm:text-sm font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/20 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Pastoral Line (+254 700 000 001)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
