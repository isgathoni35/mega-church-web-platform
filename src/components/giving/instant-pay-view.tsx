"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Smartphone,
  Copy,
  Check,
  Building2,
  Globe2,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Phone,
  ArrowRight,
  ExternalLink,
  Lock,
  ChevronRight,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface InstantPayViewProps {
  settings?: SiteSettingsData;
}

export function InstantPayView({ settings: propSettings }: InstantPayViewProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const searchParams = useSearchParams();

  const channelParam = searchParams.get("channel") || "till";
  const [activeChannel, setActiveChannel] = useState<"till" | "paybill" | "sendwave" | "send_money" | "kcb_bank">(
    channelParam === "paybill"
      ? "paybill"
      : channelParam === "sendwave"
      ? "sendwave"
      : channelParam === "send_money"
      ? "send_money"
      : channelParam === "kcb_bank"
      ? "kcb_bank"
      : "till"
  );

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const tillNumber = searchParams.get("till") || settings.mpesaTillNumber || "8146952";
  const tillName = searchParams.get("name") || settings.mpesaTillName || "Suggutta Fellowship Church";
  const paybillNumber = searchParams.get("paybill") || settings.mpesaPaybill || "522533";
  const paybillAccount = searchParams.get("acc") || settings.mpesaPaybillAccount || "8146952";
  const paybillName = settings.mpesaPaybillName || "SUGGUTTA FELLOWSHIP CHURCH";
  const kcbAccount = searchParams.get("acc") || settings.kcbAccountNumber || "1356891853";
  const kcbName = settings.kcbAccountName || "Sugutta Fellowship church";
  const kcbBranch = settings.kcbBranch || "Nairobi Central Branch";
  const kcbSwift = settings.kcbSwift || "KCBLKENX";
  const rawPhone = settings.mpesaPhone || "+254112656123";
  const pastorName = settings.pastorName || "Pastor Caesar O. Nyandwaro";

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleOpenMpesa = () => {
    // Attempt to open installed M-Pesa app via universal URI scheme
    window.location.href = "mpesa://";
  };

  return (
    <main className="min-h-screen bg-[#fbf8f3] text-slate-900 pb-16">
      {/* Top Banner Header */}
      <header className="bg-[#0f172a] text-white py-6 sm:py-8 px-4 border-b border-slate-800 shadow-lg">
        <div className="max-w-md mx-auto text-center space-y-3">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 mx-auto rounded-full overflow-hidden ring-2 ring-[#C59B27] shadow-xl bg-white p-1">
            <Image
              src="/images/sugutta-logo.png"
              alt="Sugutta Fellowship Church Seal"
              fill
              sizes="64px"
              priority
              className="object-contain p-1"
            />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff6b35] block">
              Heavens Gate &bull; Sugutta Fellowship
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              Instant Giving Portal
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Direct &bull; Zero Intermediary Fees &bull; Instant Altar Receipt
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto px-4 pt-6 space-y-5">
        {/* Quick Channel Pill Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl border border-slate-300/80 shadow-inner overflow-x-auto scrollbar-none text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveChannel("till")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap text-center ${
              activeChannel === "till"
                ? "bg-[#ff6b35] text-white shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            M-Pesa Till
          </button>
          <button
            type="button"
            onClick={() => setActiveChannel("paybill")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap text-center ${
              activeChannel === "paybill"
                ? "bg-[#ff6b35] text-white shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Paybill
          </button>
          <button
            type="button"
            onClick={() => setActiveChannel("sendwave")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap text-center ${
              activeChannel === "sendwave"
                ? "bg-[#ff6b35] text-white shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sendwave
          </button>
          <button
            type="button"
            onClick={() => setActiveChannel("kcb_bank")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap text-center ${
              activeChannel === "kcb_bank"
                ? "bg-[#ff6b35] text-white shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            KCB Bank
          </button>
        </div>

        {/* ======================================================== */}
        {/* CHANNEL 1: M-PESA BUY GOODS TILL                        */}
        {/* ======================================================== */}
        {activeChannel === "till" && (
          <div className="bg-white rounded-3xl border border-emerald-500/30 shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 text-white text-center space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-100 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                Verified Lipa na M-Pesa Buy Goods
              </span>
              <h2 className="text-xl font-black">Lipa na M-Pesa Till</h2>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {/* Highlighted Till Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-500/40 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                  Church Buy Goods Till Number
                </span>
                <div className="font-mono text-3xl sm:text-4xl font-black text-slate-950 tracking-wider">
                  {tillNumber}
                </div>
                <div className="text-xs text-slate-600 font-semibold pt-1 border-t border-emerald-200/80">
                  Store Name: <strong className="text-slate-900">{tillName}</strong>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(tillNumber, "till_primary")}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all active:scale-95"
                  >
                    {copiedKey === "till_primary" ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Till Number Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Till Number ({tillNumber})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Instant Action Triggers */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:*334#"
                  className="inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center shadow transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dial *334# (M-Pesa)</span>
                </a>

                <button
                  type="button"
                  onClick={handleOpenMpesa}
                  className="inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs text-center shadow-xs transition-all active:scale-95"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>Open M-Pesa App</span>
                </button>
              </div>

              {/* 3-Step Walkthrough */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Quick 3-Step Instructions:
                </span>
                <ol className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Open <strong>M-Pesa</strong> &rarr; Select <strong>Lipa na M-Pesa</strong> &rarr; <strong>Buy Goods and Services</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Enter Till Number: <strong className="font-mono text-slate-950 font-bold">{tillNumber}</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Enter amount &amp; M-Pesa PIN &rarr; Confirm recipient is <strong>{tillName}</strong>.</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CHANNEL 2: KCB M-PESA PAYBILL                           */}
        {/* ======================================================== */}
        {activeChannel === "paybill" && (
          <div className="bg-white rounded-3xl border border-blue-500/30 shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-gradient-to-r from-[#005A9C] to-[#00487c] p-4 text-white text-center space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-200 flex items-center justify-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-200" />
                Verified KCB Bank Church Paybill
              </span>
              <h2 className="text-xl font-black">M-Pesa Church Paybill</h2>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 border-2 border-blue-500/30 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-white rounded-xl border border-blue-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Paybill Number
                    </span>
                    <span className="font-mono text-2xl font-black text-slate-950 block mt-0.5">
                      {paybillNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(paybillNumber, "paybill_no")}
                      className="mt-2 w-full py-1.5 px-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-[#005A9C] text-xs font-bold transition-all"
                    >
                      {copiedKey === "paybill_no" ? "Copied!" : "Copy Paybill"}
                    </button>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-blue-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Account Number
                    </span>
                    <span className="font-mono text-2xl font-black text-slate-950 block mt-0.5">
                      {paybillAccount}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(paybillAccount, "paybill_acc")}
                      className="mt-2 w-full py-1.5 px-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-[#005A9C] text-xs font-bold transition-all"
                    >
                      {copiedKey === "paybill_acc" ? "Copied!" : "Copy Account"}
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-600 text-center pt-1 border-t border-blue-200/80">
                  Business Name: <strong className="text-slate-900">{paybillName}</strong>
                </div>
              </div>

              {/* Instant Action Triggers */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:*334#"
                  className="inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center shadow transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dial *334# (M-Pesa)</span>
                </a>

                <button
                  type="button"
                  onClick={handleOpenMpesa}
                  className="inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs text-center shadow-xs transition-all active:scale-95"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>Open M-Pesa App</span>
                </button>
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  How to Pay via Paybill:
                </span>
                <p>1. Open M-Pesa &rarr; <strong>Lipa na M-Pesa</strong> &rarr; <strong>Paybill</strong></p>
                <p>2. Enter Business Number: <strong className="font-mono text-slate-900">{paybillNumber}</strong></p>
                <p>3. Enter Account Number: <strong className="font-mono text-slate-900">{paybillAccount}</strong></p>
                <p>4. Enter Amount &amp; PIN &rarr; Confirm recipient is <strong>{paybillName}</strong></p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CHANNEL 3: SENDWAVE (DIASPORA / INTERNATIONAL)           */}
        {/* ======================================================== */}
        {activeChannel === "sendwave" && (
          <div className="bg-white rounded-3xl border border-emerald-500/30 shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-[#0f172a] p-4 text-white text-center space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#ff6b35] flex items-center justify-center gap-1.5">
                <Globe2 className="w-4 h-4 text-[#ff6b35]" />
                International Diaspora Remittance
              </span>
              <h2 className="text-xl font-black">Sendwave Giving</h2>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Sendwave Mobile M-Pesa:
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
                    0% Transfer Fees
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Recipient Mobile Number:</span>
                    <span className="font-mono font-bold text-slate-900 text-base">{rawPhone}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(rawPhone, "sw_phone")}
                    className="py-1.5 px-3 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                  >
                    {copiedKey === "sw_phone" ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="text-xs text-slate-600">
                  Recipient Name: <strong className="text-slate-900">{pastorName}</strong>
                </div>
              </div>

              <a
                href="https://www.sendwave.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all"
              >
                <span>Open Sendwave App / sendwave.com</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  How to Give on Sendwave:
                </span>
                <p>1. Open Sendwave on your phone (or download from App Store/Google Play).</p>
                <p>2. Select <strong>Kenya &rarr; Mobile Money (M-Pesa)</strong>.</p>
                <p>3. Enter recipient phone: <strong className="font-mono">{rawPhone}</strong> ({pastorName}).</p>
                <p>4. Send your seed with zero fees.</p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CHANNEL 4: KCB BANK DIRECT                               */}
        {/* ======================================================== */}
        {activeChannel === "kcb_bank" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-[#005A9C] p-4 text-white text-center space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-200 flex items-center justify-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-200" />
                Direct Bank Transfer
              </span>
              <h2 className="text-xl font-black">KCB Bank Kenya Direct</h2>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Account Number</span>
                    <span className="font-mono font-black text-slate-900 text-base">{kcbAccount}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(kcbAccount, "kcb_acc")}
                    className="py-1 px-2.5 rounded-lg bg-[#005A9C] text-white font-bold text-xs"
                  >
                    {copiedKey === "kcb_acc" ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] block uppercase font-bold">Account Name</span>
                  <span className="font-bold text-slate-900 text-sm block">{kcbName}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Bank &amp; Branch</span>
                    <span className="font-bold text-slate-900 text-xs">KCB Bank ({kcbBranch})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">SWIFT Code</span>
                    <span className="font-mono font-bold text-slate-900 text-xs">{kcbSwift}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pastoral WhatsApp Hotline Confirmation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0f172a] text-white border border-slate-800 text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-[#ff6b35] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pastoral Altar Receipt &bull; WhatsApp Line</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            After sending your offering, share your M-Pesa transaction code or confirmation screenshot with Pastor Caesar O. Nyandwaro for private altar prayer.
          </p>
          <a
            href={`https://wa.me/254112656123?text=${encodeURIComponent(
              "Shalom Pastor Caesar O. Nyandwaro, I have given my tithe/offering via the church QR code. Please confirm receipt and pray over my family."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>WhatsApp Pastor (+254 112 656 123)</span>
          </a>
        </div>

        {/* Back Link to Main Website */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#ff6b35] font-bold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Church Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
