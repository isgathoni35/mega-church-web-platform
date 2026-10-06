"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PaymentQrCode } from "./payment-qr-code";
import { SendwaveQR } from "./sendwave-qr";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

const GIVING_FUNDS = [
  { code: "OFFERING", name: "General Offering", desc: "Sunday worship and regular ministration" },
  { code: "TITHE", name: "Kingdom Tithe", desc: "10% covenant seed of obedience" },
  { code: "ORPHANAGE", name: "Children's Home", desc: "Shelter, food & education for vulnerable children" },
  { code: "SEED", name: "Prophetic Seed", desc: "Deliverance, healing and breakthrough prayers" },
  { code: "BUILDING", name: "Building Fund", desc: "Cathedral expansion & prayer mountain development" },
];

interface DirectGivingPortalProps {
  settings?: SiteSettingsData;
}

export function DirectGivingPortal({ settings: propSettings }: DirectGivingPortalProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const rawPhone = settings.mpesaPhone || DEFAULT_SETTINGS.mpesaPhone;
  const cleanPhone = rawPhone.replace(/[\s\-]/g, "");
  const localCleanPhone = cleanPhone.startsWith("+254") ? "0" + cleanPhone.slice(4) : cleanPhone;
  const paybill = settings.mpesaPaybill || DEFAULT_SETTINGS.mpesaPaybill;
  const tillNumber = settings.mpesaTillNumber || DEFAULT_SETTINGS.mpesaTillNumber || "8146952";
  const tillName = settings.mpesaTillName || DEFAULT_SETTINGS.mpesaTillName || "Suggutta Fellowship Church";
  const kcbAccount = settings.kcbAccountNumber || DEFAULT_SETTINGS.kcbAccountNumber || "1356891853";
  const kcbName = settings.kcbAccountName || DEFAULT_SETTINGS.kcbAccountName || "Sugutta Fellowship church";
  const kcbBranch = settings.kcbBranch || DEFAULT_SETTINGS.kcbBranch;
  const kcbSwift = settings.kcbSwift || DEFAULT_SETTINGS.kcbSwift;
  const email = settings.contactEmail || DEFAULT_SETTINGS.contactEmail;
  const westernUnionRecipient = settings.westernUnionRecipient || DEFAULT_SETTINGS.westernUnionRecipient;
  const pastorNationalId = settings.pastorNationalId || DEFAULT_SETTINGS.pastorNationalId;
  const pastorName = settings.pastorName || DEFAULT_SETTINGS.pastorName;

  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"kenya" | "international">("kenya");
  const [showQrTill, setShowQrTill] = useState<boolean>(false);
  const [showQrSendMoney, setShowQrSendMoney] = useState<boolean>(false);
  const [showQrBank, setShowQrBank] = useState<boolean>(false);
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
      {/* TAB 1: FOR KENYANS (Till Number + Send Money + KCB Bank)                  */}
      {/* ========================================================================= */}
      {activeTab === "kenya" && (
        <div className="space-y-4 sm:space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-start">
            {/* METHOD 1: M-PESA BUY GOODS (TILL NUMBER) */}
            <div className="border border-emerald-200/90 shadow-lg rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
              <div className="bg-emerald-50/80 border-b border-emerald-100 p-3.5 sm:p-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md shadow-emerald-600/20">
                    <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 block">
                      Recommended &bull; Zero Charges
                    </span>
                    <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                      Lipa na M-Pesa (Buy Goods Till)
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQrTill(!showQrTill)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold hover:bg-emerald-100 transition-colors shadow-sm"
                >
                  <QrCode className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{showQrTill ? "View Steps" : "Scan QR"}</span>
                </button>
              </div>

              <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                {showQrTill ? (
                  <PaymentQrCode
                    type="till"
                    tillNumber={tillNumber}
                    tillName={tillName}
                  />
                ) : (
                  <>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Use our registered Safaricom Till Number to give your tithe, seed, or offering with zero transaction fees to your line:
                    </p>

                    {/* Till Details Box */}
                    <div className="p-4 sm:p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/90 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Till Number (Buy Goods)
                        </span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono text-2xl sm:text-4xl font-black text-slate-950 tracking-wider">
                            {tillNumber}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy("till", tillNumber)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                          >
                            {copiedKey === "till" ? (
                              <>
                                <Check className="h-4 w-4" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                <span>Copy Till</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Registered Till Name:</span>
                        <div className="flex items-center gap-1 text-emerald-800 font-bold">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span>{tillName}</span>
                        </div>
                      </div>
                    </div>

                    <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
                      <li className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          1
                        </span>
                        <span>Open <strong>M-Pesa</strong> &rarr; Select <strong>Lipa na M-Pesa</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          2
                        </span>
                        <span>Select <strong>Buy Goods and Services</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          3
                        </span>
                        <span>Enter Till Number: <strong className="font-mono text-slate-900">{tillNumber}</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          4
                        </span>
                        <span>Enter amount &amp; PIN &rarr; Confirm name is <strong>{tillName}</strong>.</span>
                      </li>
                    </ol>
                  </>
                )}
              </div>
            </div>

            {/* METHOD 2: SEND MONEY (PASTOR CAESAR LINE) */}
            <div className="border border-slate-200/80 shadow-lg rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
              <div className="bg-slate-50 border-b border-slate-100 p-3.5 sm:p-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] font-bold shrink-0">
                    <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff6b35] block">
                      Direct Altar Line
                    </span>
                    <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                      M-Pesa Send Money
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQrSendMoney(!showQrSendMoney)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-orange-200 text-[#ff6b35] text-[11px] font-bold hover:bg-orange-50 transition-colors shadow-sm"
                >
                  <QrCode className="h-3.5 w-3.5 text-[#ff6b35]" />
                  <span>{showQrSendMoney ? "View Steps" : "Scan QR"}</span>
                </button>
              </div>

              <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                {showQrSendMoney ? (
                  <PaymentQrCode
                    type="send_money"
                    phone={localCleanPhone}
                    recipientName={pastorName}
                  />
                ) : (
                  <>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Send offering seeds directly to the resident pastor line, or call for prayer and immediate pastoral confirmation:
                    </p>

                    {/* Phone Details Box */}
                    <div className="p-4 sm:p-6 rounded-2xl bg-[#fffaf5] border border-orange-200 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Mobile Telephone Number
                        </span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono text-2xl sm:text-4xl font-black text-slate-950 tracking-wider">
                            {localCleanPhone}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy("phone_local", localCleanPhone)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ff6b35] hover:bg-[#f25c23] text-white text-xs font-bold shadow-sm transition-all"
                          >
                            {copiedKey === "phone_local" ? (
                              <>
                                <Check className="h-4 w-4" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                <span>Copy Line</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-orange-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Recipient Name:</span>
                        <span className="font-bold text-slate-900">{pastorName}</span>
                      </div>
                    </div>

                    <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
                      <li className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-[#ff6b35] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          1
                        </span>
                        <span>Open <strong>M-Pesa</strong> &rarr; Select <strong>Send Money</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-[#ff6b35] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          2
                        </span>
                        <span>Enter Mobile Number: <strong className="font-mono text-slate-900">{localCleanPhone}</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-[#ff6b35] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          3
                        </span>
                        <span>Enter amount &amp; PIN &rarr; Confirm recipient is <strong>{pastorName}</strong>.</span>
                      </li>
                    </ol>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* METHOD 3: KCB BANK KENYA (ACCOUNT 1356891853) */}
          <div className="border border-slate-200/80 rounded-2xl sm:rounded-3xl bg-white shadow-md p-4 sm:p-8 space-y-4 sm:space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3 sm:pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 flex items-center justify-center text-[#005A9C] shrink-0 font-bold">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base sm:text-xl text-slate-900">
                    Method 3: KCB Bank Account (1356891853)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Direct wire, cheque deposit, or M-Pesa to KCB Bank transfer.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowQrBank(!showQrBank)}
                className="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#005A9C] text-xs font-bold hover:bg-blue-100 transition-colors shadow-sm"
              >
                <QrCode className="h-3.5 w-3.5 text-[#005A9C]" />
                <span>{showQrBank ? "View Credentials" : "Show Bank QR"}</span>
              </button>
            </div>

            {showQrBank ? (
              <div className="max-w-md mx-auto">
                <PaymentQrCode
                  type="kcb_bank"
                  accountNumber={kcbAccount}
                  accountName={kcbName}
                />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 text-xs">
                  <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Bank Name</span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">Kenya Commercial Bank (KCB)</span>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">SWIFT: {kcbSwift}</span>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Branch</span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">{kcbBranch}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">Kenya</span>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Account Name</span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block truncate">{kcbName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("bank_name", kcbName)}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-slate-200 text-[#005A9C] transition-colors shrink-0"
                      title="Copy Account Name"
                    >
                      {copiedKey === "bank_name" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
                    <div>
                      <span className="text-blue-700 block text-[10px] uppercase font-bold">Account Number</span>
                      <span className="font-mono font-black text-slate-950 text-sm sm:text-base mt-0.5 block">{kcbAccount}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("bank_acc", kcbAccount)}
                      className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-slate-100 text-[#005A9C] border border-blue-200 transition-colors"
                      title="Copy Account Number"
                    >
                      {copiedKey === "bank_acc" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong>M-Pesa to KCB Deposit:</strong> Lipa na M-Pesa Paybill <strong>522522</strong> &rarr; Account: <strong>{kcbAccount}</strong></span>
                  </div>
                  <span className="text-[11px] text-slate-500">Instant credit to Church Account</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FOR INTERNATIONAL PARTNERS (SENDWAVE & KCB BANK WIRE)               */}
      {/* ========================================================================= */}
      {activeTab === "international" && (
        <div className="space-y-4 sm:space-y-8 animate-in fade-in duration-200">
          <div className="border border-slate-200/80 shadow-lg rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
            <div className="bg-[#0f172a] p-4 sm:p-8 text-white text-center space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[#ff6b35] mx-auto">
                <Globe2 className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <h3 className="font-extrabold text-xl sm:text-3xl text-white">International Diaspora Giving</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                Send your tithes, offerings, or kingdom seeds directly from foreign cards or bank accounts via Sendwave or KCB International Wire Transfer.
              </p>
            </div>

            <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
              {/* Option 1: Sendwave */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500/10 text-emerald-700 font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Method 1: Sendwave (0% Transfer Fees Direct to M-Pesa)
                  </h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-stretch">
                  <div className="lg:col-span-7 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-white flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                          Sendwave App
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 border border-emerald-500/30">
                          Zero Fees &bull; Instant Delivery
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Download Sendwave on iPhone or Android. Send directly to our pastor&apos;s verified M-Pesa line in Kenya:
                      </p>

                      <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
                        <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider">
                          Sendwave Recipient Details:
                        </span>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Recipient Mobile:</span>
                            <span className="font-mono font-bold text-slate-900 text-sm">
                              {rawPhone.startsWith("+") ? rawPhone : `+254 ${rawPhone.replace(/^0/, "")}`}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy("sw_phone", rawPhone)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold"
                          >
                            {copiedKey === "sw_phone" ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          Recipient Name: <strong className="text-slate-800">{pastorName}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="https://www.sendwave.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20"
                      >
                        <span>Open Sendwave (sendwave.com)</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col">
                    <PaymentQrCode
                      type="sendwave"
                      phone={rawPhone}
                      recipientName={pastorName}
                    />
                  </div>
                </div>
              </div>

              {/* Option 2: KCB Bank International Wire Transfer */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500/10 text-[#005A9C] font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Method 2: KCB Bank Direct International Wire (TT / SWIFT)
                  </h4>
                </div>

                <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50/50 shadow-sm space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For diaspora wire transfers and international bank-to-bank settlements, provide your local bank with the following church credentials:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Beneficiary Bank</span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">Kenya Commercial Bank (KCB)</span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">SWIFT: {kcbSwift}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Branch</span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">{kcbBranch}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">Kenya</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Account Name</span>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block truncate">{kcbName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy("intl_name", kcbName)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-[#005A9C]"
                        title="Copy Name"
                      >
                        {copiedKey === "intl_name" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                      <div>
                        <span className="text-blue-700 block text-[10px] uppercase font-bold">Account Number</span>
                        <span className="font-mono font-black text-slate-950 text-sm sm:text-base mt-0.5 block">{kcbAccount}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy("intl_acc", kcbAccount)}
                        className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#005A9C] border border-blue-200"
                        title="Copy Account Number"
                      >
                        {copiedKey === "intl_acc" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
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
          <div className="flex items-start gap-3 sm:gap-4 max-w-xl">
            <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden ring-2 ring-[#C59B27] shadow-lg shrink-0 bg-white hidden sm:block">
              <Image
                src="/images/sugutta-logo.png"
                alt="Sugutta Fellowship Church Seal"
                fill
                sizes="64px"
                className="object-contain p-0.5"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-[#C59B27] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Official Church Seal &amp; Pastoral Oversight</span>
              </div>
              <h4 className="text-lg sm:text-2xl font-extrabold text-white">
                Need a Written Giving Receipt or Prayer Confirmation?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If you require a church receipt for tax purposes, or wish to notify {pastorName} directly of your kingdom seed or MTCN code, simply text or WhatsApp your transaction confirmation code to our Pastoral Line.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`tel:${cleanPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20"
            >
              <Phone className="h-4 w-4" />
              {rawPhone}
            </a>
            <a
              href={`mailto:${email}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/20 font-bold text-xs transition-all"
            >
              <Mail className="h-4 w-4 text-[#ff6b35]" />
              {email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
