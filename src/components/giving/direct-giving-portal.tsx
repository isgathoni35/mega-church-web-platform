"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Smartphone,
  Globe2,
  Copy,
  Check,
  Building2,
  ExternalLink,
  Heart,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  Lock,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SendwaveQR } from "./sendwave-qr";

const GIVING_FUNDS = [
  { code: "OFFERING", name: "General Offering", desc: "Sunday worship and regular ministration" },
  { code: "TITHE", name: "Kingdom Tithe", desc: "10% covenant seed of obedience" },
  { code: "ORPHANAGE", name: "Children's Home", desc: "Shelter, food & education for vulnerable children" },
  { code: "SEED", name: "Prophetic Seed", desc: "Deliverance, healing and breakthrough prayers" },
  { code: "BUILDING", name: "Building Fund", desc: "Cathedral expansion & prayer mountain development" },
];

export function DirectGivingPortal() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"kenya" | "international">("kenya");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [highlightOrphanage, setHighlightOrphanage] = useState<boolean>(false);

  useEffect(() => {
    const fundParam = searchParams.get("fund");
    if (fundParam === "orphanage") {
      setHighlightOrphanage(true);
    }
    const tabParam = searchParams.get("tab");
    if (tabParam === "international") {
      setActiveTab("international");
    }
  }, [searchParams]);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="w-full space-y-5 sm:space-y-8">
      {/* ================= TAB SELECTOR ================= */}
      <div className="flex justify-center">
        <div className="p-1 sm:p-1.5 rounded-full bg-slate-200/80 border border-slate-300/80 shadow-inner flex items-center gap-1 sm:gap-2 max-w-md w-full">
          <button
            type="button"
            onClick={() => setActiveTab("kenya")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 px-3.5 sm:px-5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200",
              activeTab === "kenya"
                ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>For Kenyans</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("international")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 px-3.5 sm:px-5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200",
              activeTab === "international"
                ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Globe2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>For International</span>
          </button>
        </div>
      </div>

      {/* ================= ORPHANAGE BANNER IF QUERY PARAM ================= */}
      {highlightOrphanage && (
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-orange-500/10 border border-orange-500/20 text-slate-900 flex items-center gap-2.5 sm:gap-3 animate-in fade-in duration-300">
          <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b35] shrink-0 fill-current" />
          <div className="text-xs sm:text-sm">
            <strong>Sponsoring our Children&apos;s Home:</strong> When prompted for an Account Number, please enter <span className="font-mono font-bold text-white px-2 py-0.5 rounded-full bg-[#ff6b35] text-xs">ORPHANAGE</span> so your seed is designated directly for the children.
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: FOR KENYANS (M-Pesa Direct + Paybill + Bank Wire)                  */}
      {/* ========================================================================= */}
      {activeTab === "kenya" && (
        <div className="space-y-4 sm:space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-start">
            {/* METHOD 1: SEND MONEY (NENO STYLE) */}
            <div className="border border-slate-200/80 shadow-lg rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
              <div className="bg-slate-50 border-b border-slate-100 p-3.5 sm:p-6 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] font-bold shrink-0">
                  <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff6b35] block">
                    Direct Giving
                  </span>
                  <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">Give via M-Pesa</h3>
                </div>
              </div>

              <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Follow the steps below on your phone to send your tithe, seed, or offering directly to the ministry line:
                </p>

                <ol className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500/10 text-[#ff6b35] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      1
                    </span>
                    <span className="text-slate-700 pt-0.5">
                      Go to the <strong>M-Pesa Menu</strong> on your phone.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500/10 text-[#ff6b35] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      2
                    </span>
                    <span className="text-slate-700 pt-0.5">
                      Select <strong>Send Money</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500/10 text-[#ff6b35] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      3
                    </span>
                    <div className="w-full space-y-2">
                      <span className="text-slate-700 block pt-0.5">
                        Enter the official church recipient details:
                      </span>

                      {/* Recipient Details Box */}
                      <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#fffaf5] border border-orange-100 space-y-2 sm:space-y-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            Phone Number
                          </span>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-mono text-lg sm:text-2xl font-black text-slate-900 tracking-wide">
                              0700 000 001
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy("phone_local", "0700000001")}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white text-[11px] sm:text-xs font-bold shadow-sm transition-all"
                            >
                              {copiedKey === "phone_local" ? (
                                <>
                                  <Check className="h-3.5 w-3.5" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="pt-2 sm:pt-3 border-t border-orange-100/80 flex items-center justify-between text-xs">
                          <span className="text-slate-500">Recipient Name</span>
                          <span className="font-bold text-slate-900">
                            Pastor Jeannette Taylor
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500/10 text-[#ff6b35] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      4
                    </span>
                    <span className="text-slate-700 pt-0.5">
                      Enter the <strong>amount</strong> you wish to give and your <strong>M-Pesa PIN</strong>.
                    </span>
                  </li>
                </ol>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#ff6b35] shrink-0" />
                  <span>Works seamlessly across Safaricom, Airtel Money, Telkom, and all Kenyan banking apps.</span>
                </div>
              </div>
            </div>

            {/* METHOD 2: PAYBILL & FUND REFERENCES */}
            <div className="border border-slate-200/80 shadow-lg rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
              <div className="bg-slate-50 border-b border-slate-100 p-3.5 sm:p-6 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] font-bold shrink-0">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff6b35] block">
                    Business Paybill
                  </span>
                  <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">Lipa na M-Pesa (Pay Bill)</h3>
                </div>
              </div>

              <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Use our registered Safaricom Paybill to tag your seed for a specific kingdom fund:
                </p>

                {/* Paybill Number Box */}
                <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#fffaf5] border border-orange-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Business Number (Paybill)
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-xl sm:text-3xl font-black text-slate-900 tracking-wider">
                      174379
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy("paybill", "174379")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white text-[11px] sm:text-xs font-bold shadow-sm transition-all"
                    >
                      {copiedKey === "paybill" ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Paybill</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Account Number Fund Tags */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Select Account Number (Tap to Copy):
                  </span>

                  <div className="space-y-1.5 sm:space-y-2">
                    {GIVING_FUNDS.map((fund) => {
                      const isOrphanage = fund.code === "ORPHANAGE";
                      return (
                        <div
                          key={fund.code}
                          onClick={() => handleCopy(fund.code, fund.code)}
                          className={cn(
                            "p-2.5 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all",
                            copiedKey === fund.code
                              ? "bg-orange-500/10 border-[#ff6b35] shadow-sm"
                              : isOrphanage && highlightOrphanage
                              ? "bg-[#fffaf5] border-[#ff6b35]"
                              : "bg-white hover:bg-slate-50 border-slate-200"
                          )}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-xs sm:text-sm text-slate-900">
                                {fund.code}
                              </span>
                              <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
                                • {fund.name}
                              </span>
                            </div>
                            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                              {fund.desc}
                            </p>
                          </div>

                          <div className="shrink-0">
                            {copiedKey === fund.code ? (
                              <span className="text-xs font-bold text-[#ff6b35] flex items-center gap-1">
                                <Check className="h-3.5 w-3.5" />
                                Copied
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400 hover:text-[#ff6b35] flex items-center gap-1 font-semibold">
                                <Copy className="h-3.5 w-3.5" />
                                Copy
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <ol className="list-decimal pl-5 text-[11px] sm:text-xs text-slate-500 space-y-1 sm:space-y-1.5 pt-2 sm:pt-3 border-t border-slate-100">
                  <li>Go to <strong>Lipa na M-Pesa</strong> &rarr; <strong>Pay Bill</strong>.</li>
                  <li>Enter Business No: <strong>174379</strong>.</li>
                  <li>Enter Account No: e.g. <strong>OFFERING</strong>, <strong>TITHE</strong>, or <strong>ORPHANAGE</strong>.</li>
                  <li>Enter amount and your M-Pesa PIN.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* METHOD 3: BANK WIRE / DEPOSIT / CHEQUES */}
          <div className="border border-slate-200/80 rounded-2xl sm:rounded-3xl bg-white shadow-md p-4 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3 sm:pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] shrink-0">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-slate-900">Bank Deposit / RTGS / Cheques</h4>
                  <p className="text-xs text-slate-500">
                    For large donations, corporate giving, cathedral expansion, and direct bank transfers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 text-xs">
              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Bank Name</span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">Co-operative Bank of Kenya</span>
              </div>

              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Branch</span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">Nairobi City Centre Branch</span>
              </div>

              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Account Name</span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">Heavens Gates Sugutta Fellowship Church</span>
              </div>

              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Account Number</span>
                  <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">01129000000000</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("bank_acc", "01129000000000")}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-slate-200 text-[#ff6b35] transition-colors"
                  title="Copy Account Number"
                >
                  {copiedKey === "bank_acc" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FOR INTERNATIONAL PARTNERS (SENDWAVE DIRECT TO M-PESA)             */}
      {/* ========================================================================= */}
      {activeTab === "international" && (
        <div className="space-y-4 sm:space-y-8 animate-in fade-in duration-200">
          {/* Main Hero Card for International */}
          <div className="border border-slate-200/80 shadow-lg rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
            <div className="bg-[#0f172a] p-4 sm:p-8 text-white text-center space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[#ff6b35] mx-auto">
                <Globe2 className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <h3 className="font-extrabold text-xl sm:text-3xl text-white">Give from Anywhere via Sendwave</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                Send your tithes, offerings, or kingdom seeds directly from your debit card in the USA, UK, Canada, and Europe straight to our Kenyan M-Pesa line with zero transfer fees.
              </p>
            </div>

            <div className="p-4 sm:p-8 space-y-4 sm:space-y-8">
              {/* Step 1: Featured Sendwave Platform Card & QR Code */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500/10 text-[#ff6b35] font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Open Sendwave (App or Scan QR Code):
                  </h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-stretch">
                  {/* Left Column: Sendwave Benefit Card & Launch Button */}
                  <div className="lg:col-span-7 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-white hover:border-[#ff6b35] hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                          Sendwave
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 border border-emerald-500/30">
                          Zero Transfer Fee • USA, UK, Canada, Europe
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Download the Sendwave app on iOS/Android or visit their website. It transfers money instantly from your foreign bank debit card directly into our ministry M-Pesa line with no conversion deductions.
                      </p>

                      <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 space-y-1">
                        <span className="font-bold text-[#ff6b35] block text-[11px] uppercase tracking-wider">
                          Why Sendwave for Diaspora Giving?
                        </span>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                          • 0% fee on transfers to Kenya M-Pesa
                          <br />
                          • Delivered in under 30 seconds
                          <br />
                          • Fully licensed and secure in the USA, UK, Canada, and EU
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="https://www.sendwave.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-orange-500/20"
                      >
                        <span>Open Sendwave (sendwave.com)</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Scan with Phone QR Code */}
                  <div className="lg:col-span-5 flex flex-col">
                    <SendwaveQR
                      phone="+254 700 000 001"
                      recipientName="Pastor Jeannette Taylor"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Select Country */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500/10 text-[#ff6b35] font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Select Transfer Destination in Sendwave:
                  </h4>
                </div>
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 flex flex-wrap gap-3 sm:gap-4 items-center">
                  <div>Country: <strong className="text-slate-900">Kenya 🇰🇪</strong></div>
                  <div>Delivery Method: <strong className="text-slate-900">Mobile Money / M-Pesa</strong></div>
                </div>
              </div>

              {/* Step 3: Enter Recipient Details */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500/10 text-[#ff6b35] font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Enter Recipient Details Below:
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
                  {/* Phone */}
                  <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#fffaf5] border border-orange-100 flex items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">
                        Recipient Mobile Number
                      </span>
                      <span className="font-mono text-base sm:text-xl font-black text-slate-900 mt-0.5 block">
                        +254 700 000 001
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-500">Country Code +254 (Kenya)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("intl_phone", "+254700000001")}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white text-[11px] sm:text-xs font-bold shrink-0 shadow-sm"
                    >
                      {copiedKey === "intl_phone" ? (
                        <span className="flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Name */}
                  <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#fffaf5] border border-orange-100 flex items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">
                        Recipient Name
                      </span>
                      <span className="font-bold text-sm sm:text-lg text-slate-900 mt-0.5 block">
                        Pastor Jeannette Taylor
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-500">Heavens Gates Sugutta Fellowship</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("intl_name", "Pastor Jeannette Taylor")}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white text-[11px] sm:text-xs font-bold shrink-0 shadow-sm"
                    >
                      {copiedKey === "intl_name" ? (
                        <span className="flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PASTORAL RECEIPT CONFIRMATION & ASSISTANCE ================= */}
      <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0f172a] text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-[#ff6b35] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Personal Pastoral Oversight</span>
            </div>
            <h4 className="text-lg sm:text-2xl font-extrabold text-white">
              Need a Written Giving Receipt or Prayer Confirmation?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If you require a church receipt for tax purposes, or wish to notify Apostle Dr. J. Taylor directly of your kingdom seed, simply text or WhatsApp your transaction confirmation code to our Pastoral Line.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+254700000001"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20"
            >
              <Phone className="h-4 w-4" />
              +254 700 000 001
            </a>
            <a
              href="mailto:giving@heavensgatesugutta.org"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/20 font-bold text-xs transition-all"
            >
              <Mail className="h-4 w-4 text-[#ff6b35]" />
              giving@heavensgatesugutta.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
