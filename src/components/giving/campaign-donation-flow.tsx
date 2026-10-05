"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Check,
  Lock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Globe2,
  Copy,
  Building2,
  ShieldCheck,
  Heart,
  Baby,
  Hammer,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SendwaveQR } from "@/components/giving/sendwave-qr";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

export type FlowState = "CAMPAIGN_VIEW" | "DONATION_FORM" | "THANK_YOU";

export interface GivingFund {
  code: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  scripture: string;
  scriptureRef: string;
  image: string;
  impacts: { amountUsd: number; amountKes: number; text: string }[];
}

export const GIVING_FUNDS: GivingFund[] = [
  {
    code: "ORPHANAGE",
    name: "Sugutta Children's Home & Orphanage",
    shortName: "Children's Home",
    icon: "👶",
    description: "Daily nutrition, primary & secondary schooling, healthcare, and warm shelter for 50+ vulnerable children.",
    scripture: "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress.",
    scriptureRef: "James 1:27",
    image: "/images/orphanage-hero.png",
    impacts: [
      { amountUsd: 25, amountKes: 2500, text: "Provides balanced, nutritious daily hot meals for one child for an entire month." },
      { amountUsd: 50, amountKes: 5000, text: "Sponsors school textbooks, learning stationery, and term school uniforms." },
      { amountUsd: 100, amountKes: 10000, text: "Underwrites medical checkups, essential medicines, and hygiene care packages." },
    ],
  },
  {
    code: "BUILDING",
    name: "Youth & Sanctuary Building Fund",
    shortName: "Building Fund",
    icon: "🏗️",
    description: "Sanctuary construction, permanent roofing, pillar casting, and community youth hall expansion.",
    scripture: "The God of heaven will make us prosper, and we his servants will arise and build.",
    scriptureRef: "Nehemiah 2:20",
    image: "/images/church-construction.jpg",
    impacts: [
      { amountUsd: 25, amountKes: 2500, text: "Provides 20 cured structural masonry blocks and mortar cement bags." },
      { amountUsd: 50, amountKes: 5000, text: "Sponsors heavy steel rebar columns for load-bearing pillar reinforcement." },
      { amountUsd: 200, amountKes: 20000, text: "Underwrites timber trusses and gauge-28 color-coated roofing sheets." },
    ],
  },
  {
    code: "TITHE",
    name: "General Tithe & Worship Offering",
    shortName: "Tithes & Offering",
    icon: "🌾",
    description: "10% covenant tithe of obedience, Sunday worship ministry, and weekly evangelism operations.",
    scripture: "Bring all the tithes into the storehouse, that there may be food in My house, and try Me now in this.",
    scriptureRef: "Malachi 3:10",
    image: "/images/hero-worship.jpg",
    impacts: [
      { amountUsd: 25, amountKes: 2500, text: "Supports weekly Sunday school curriculum and service supplies." },
      { amountUsd: 50, amountKes: 5000, text: "Funds community outreach logistics and pastoral visitation care." },
      { amountUsd: 100, amountKes: 10000, text: "Sponsors regional outdoor crusades and audio evangelism." },
    ],
  },
  {
    code: "SEED",
    name: "Prophetic Deliverance Seed",
    shortName: "Prophetic Seed",
    icon: "🔥",
    description: "Altars of breakthrough, deliverance prayers, healing intercession, and family covenant alignment.",
    scripture: "Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing.",
    scriptureRef: "Proverbs 3:9-10",
    image: "/images/ministry-healing.jpg",
    impacts: [
      { amountUsd: 25, amountKes: 2500, text: "Connects your prayer request to the 24/7 Mai Mahiu Prayer Mountain altar." },
      { amountUsd: 50, amountKes: 5000, text: "Consecrated sacrificial seed for business breakthroughs and family fruitfulness." },
      { amountUsd: 100, amountKes: 10000, text: "Apostolic deliverance seed ministered under Pastor Caesar Osebe Nyandwaro." },
    ],
  },
];

const PRESETS_USD = [25, 50, 100, 250, 500, 1000];
const PRESETS_KES = [500, 1000, 2500, 5000, 10000, 25000];

interface CampaignDonationFlowProps {
  settings?: SiteSettingsData;
  initialState?: FlowState;
  initialFund?: string;
}

export function CampaignDonationFlow({
  settings: propSettings,
  initialState = "CAMPAIGN_VIEW",
  initialFund = "ORPHANAGE",
}: CampaignDonationFlowProps) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const searchParams = useSearchParams();

  // State Machine
  const [currentState, setCurrentState] = useState<FlowState>(initialState);

  // Form State
  const [selectedFundCode, setSelectedFundCode] = useState<string>(initialFund);
  const [isFundDropdownOpen, setIsFundDropdownOpen] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<"One-Time" | "Weekly" | "Monthly">("One-Time");
  const [currency, setCurrency] = useState<"USD" | "KES">("USD");
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");

  // Payment Tabs (Only the 4 authentic channels: Send Money, Paybill, Sendwave, Bank Account)
  const [paymentTab, setPaymentTab] = useState<"kenya" | "international">("kenya");

  // Copied helper state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Receipt data for THANK_YOU state
  const [receiptData, setReceiptData] = useState<{
    reference: string;
    fundName: string;
    fundCode: string;
    amount: number;
    currency: string;
    frequency: string;
    date: string;
    scripture: string;
    scriptureRef: string;
  } | null>(null);

  // Dropdown ref for outside click
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFundDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync with search params
  useEffect(() => {
    const fundParam = searchParams.get("fund");
    if (fundParam) {
      const match = GIVING_FUNDS.find((f) => f.code.toLowerCase() === fundParam.toLowerCase());
      if (match) setSelectedFundCode(match.code);
    }
    const stepParam = searchParams.get("step");
    if (stepParam === "form") {
      setCurrentState("DONATION_FORM");
    }
  }, [searchParams]);

  const selectedFund =
    GIVING_FUNDS.find((f) => f.code === selectedFundCode) || GIVING_FUNDS[0];

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSelectPreset = (val: number) => {
    setSelectedAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setCustomAmount(raw);
    if (raw) {
      setSelectedAmount(parseInt(raw, 10));
    }
  };

  // Quick CTA helper from campaign view
  const handleSelectFundAndGoToForm = (fundCode: string) => {
    setSelectedFundCode(fundCode);
    setCurrentState("DONATION_FORM");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Complete Gift & Show Thank You
  const handleCompleteGift = () => {
    setReceiptData({
      reference: `SUG-${selectedFund.code}-${Math.floor(100000 + Math.random() * 900000)}`,
      fundName: selectedFund.name,
      fundCode: selectedFund.code,
      amount: selectedAmount,
      currency,
      frequency,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      scripture: selectedFund.scripture,
      scriptureRef: selectedFund.scriptureRef,
    });
    setCurrentState("THANK_YOU");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex justify-center py-2 sm:py-6 px-2 sm:px-4">
      {/* Mobile-First Card Frame matching screenshots */}
      <div className="w-full max-w-[450px] bg-white rounded-[2rem] sm:rounded-[2.25rem] shadow-2xl border border-slate-200/80 overflow-hidden relative transition-all duration-300">
        {/* ========================================================================= */}
        {/* STATE 1: CAMPAIGN_VIEW (Balanced Multi-Pillar Story View)                  */}
        {/* ========================================================================= */}
        {currentState === "CAMPAIGN_VIEW" && (
          <div className="flex flex-col min-h-[640px] animate-in fade-in duration-300">
            {/* Top Hero Image Banner */}
            <div className="relative aspect-[16/11] w-full bg-slate-900 overflow-hidden">
              <Image
                src="/images/orphanage-hero.png"
                alt="Kingdom Impact: Children's Home & Sanctuary Construction"
                fill
                priority
                className="object-cover object-center"
              />
              {/* Vignette Overlay matching screenshot */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/65 to-transparent" />

              {/* Title & Subtitle Overlay on bottom of image */}
              <div className="absolute bottom-4 left-5 right-5 z-10 text-white space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-500/80 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  Twin Core Missions
                </span>
                <h1 className="text-2xl sm:text-[25px] font-extrabold tracking-tight text-white leading-tight">
                  Children&apos;s Home &amp; Sanctuary Building
                </h1>
                <p className="text-xs sm:text-[13px] text-slate-200 leading-snug font-normal">
                  Sheltering vulnerable orphans, erecting an enduring house of worship, and proclaiming the Gospel.
                </p>
              </div>
            </div>

            {/* Content Body: Balanced Representation */}
            <div className="p-5 sm:p-6 space-y-5 text-slate-700 text-xs sm:text-[13px] leading-relaxed flex-1">
              {/* "Why We Need You" */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-extrabold text-[#0f172a]">
                  Why We Need Your Partnership
                </h3>
                <p>
                  At Sugutta Fellowship Church, our apostolic mandate is twofold: <strong>caring for the vulnerable</strong> and <strong>building an enduring house for God&apos;s presence</strong>.
                </p>
                <p>
                  Our Children&apos;s Home shelters, feeds, and educates orphaned boys and girls, while our expanding congregation of over 1,000 worshippers is constructing a permanent sanctuary to shelter services from the rains and provide a dedicated youth learning center.
                </p>
              </div>

              {/* Scripture Blockquote with Gold Left Border */}
              <div className="border-l-[3px] border-[#c59b27] pl-3.5 py-1.5 my-3 bg-[#fdfbf7]/80 rounded-r-lg">
                <blockquote className="italic font-serif text-slate-800 text-xs sm:text-[13px] leading-normal">
                  &ldquo;Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress... and King David rejoiced with great joy, for the people offered willingly to build the house of the Lord.&rdquo;
                </blockquote>
                <div className="text-right text-[11px] font-bold text-slate-900 mt-1">
                  &mdash; James 1:27 &amp; 1 Chronicles 29:9
                </div>
              </div>

              {/* TWIN PILLAR SHOWCASE CARDS (EQUAL REPRESENTATION) */}
              <div className="space-y-3 pt-1">
                <h3 className="text-sm sm:text-base font-extrabold text-[#0f172a]">
                  Our Two Active Priority Missions
                </h3>

                {/* Pillar 1: Children's Home */}
                <div className="p-3.5 rounded-2xl border border-rose-200/90 bg-rose-50/40 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                      <Baby className="w-4 h-4 text-rose-500" />
                      <span>1. Sugutta Children&apos;s Home</span>
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 uppercase">
                      50+ Orphans
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Provides balanced meals, primary &amp; secondary education, medical care, and parental love to vulnerable children.
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-slate-500">
                      Ref: <strong className="text-slate-900 font-mono">ORPHANAGE</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSelectFundAndGoToForm("ORPHANAGE")}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 underline"
                    >
                      <span>Support Children&apos;s Home</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Pillar 2: Sanctuary Construction */}
                <div className="p-3.5 rounded-2xl border border-orange-200/90 bg-orange-50/40 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                      <Hammer className="w-4 h-4 text-[#ff6b35]" />
                      <span>2. Sanctuary Building Project</span>
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-orange-100 text-[#c2410c] uppercase">
                      Active Build
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Erecting load-bearing pillars, concrete foundation blocks, and heavy roofing for our 5 Sunday worship sessions.
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-slate-500">
                      Ref: <strong className="text-slate-900 font-mono">BUILDING</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSelectFundAndGoToForm("BUILDING")}
                      className="text-xs font-bold text-[#ff6b35] hover:text-[#ea580c] flex items-center gap-1 underline"
                    >
                      <span>Contribute to Building</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* "Your Impact" Bullet Cards */}
              <div className="space-y-2 pt-2">
                <h3 className="text-sm sm:text-base font-extrabold text-[#0f172a]">
                  Tangible Kingdom Impact
                </h3>

                <div className="space-y-2 text-slate-600">
                  <p>
                    <strong className="text-slate-900 font-extrabold">$25 / KES 2,500</strong> feeds a child for a month or provides 20 foundation masonry blocks.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-extrabold">$50 / KES 5,000</strong> sponsors a child&apos;s term school uniform or steel rebar pillar casting.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-extrabold">$100 / KES 10,000</strong> provides medical health coverage or youth retreat discipleship.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-extrabold">$200 / KES 20,000</strong> underwrites structural roofing trusses or multi-child school sponsorships.
                  </p>
                </div>
              </div>
            </div>

            {/* Persistent Sticky Footer Container matching Image 1 */}
            <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 shadow-lg text-center space-y-1.5">
              <button
                type="button"
                onClick={() => {
                  setCurrentState("DONATION_FORM");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#c59b27] hover:bg-[#b08b23] text-white font-extrabold text-sm sm:text-base shadow-md transition-all active:scale-[0.99] flex items-center justify-center"
              >
                Make a Donation
              </button>
              <p className="text-[10px] text-slate-400">
                Choose your cause: Children&apos;s Home, Building Fund, Tithes, or Seed.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STATE 2: DONATION_FORM (Exact match to Images 2 & 3 with balanced causes) */}
        {/* ========================================================================= */}
        {currentState === "DONATION_FORM" && (
          <div className="p-5 sm:p-6 space-y-5 animate-in fade-in duration-300">
            {/* Top Navigation: ← Back to Story */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setCurrentState("CAMPAIGN_VIEW");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0f172a] transition-colors py-1 rounded"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Story</span>
              </button>

              <span className="text-[11px] font-bold text-slate-400">
                Designated: <strong className="text-slate-800">{selectedFund.shortName}</strong>
              </span>
            </div>

            {/* Heading & Subtitle */}
            <div className="space-y-0.5">
              <h2 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
                Complete Your Gift
              </h2>
              <p className="text-xs font-semibold text-teal-600">
                Secure, encrypted donation
              </p>
            </div>

            {/* 1. FUND SELECTOR ("I am giving to:") matching Images 2 & 3 */}
            <div className="space-y-1.5 relative" ref={dropdownRef}>
              <label className="text-xs font-bold text-slate-700 block">
                I am giving to:
              </label>

              {/* Dropdown Toggle Button */}
              <button
                type="button"
                onClick={() => setIsFundDropdownOpen((prev) => !prev)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-800 flex items-center justify-between shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
              >
                <span className="truncate flex items-center gap-2">
                  <span>{selectedFund.icon}</span>
                  <span>{selectedFund.name}</span>
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0",
                    isFundDropdownOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown Menu matching Image 3 */}
              {isFundDropdownOpen && (
                <div className="absolute top-full left-0 right-0 z-40 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  {GIVING_FUNDS.map((fund) => {
                    const isSelected = selectedFundCode === fund.code;
                    return (
                      <button
                        key={fund.code}
                        type="button"
                        onClick={() => {
                          setSelectedFundCode(fund.code);
                          setIsFundDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium transition-colors flex items-center justify-between border-b border-slate-100 last:border-0",
                          isSelected
                            ? "bg-[#1d6ee5] text-white font-bold"
                            : "text-slate-800 hover:bg-slate-50"
                        )}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span>{fund.icon}</span>
                          <span>{fund.name}</span>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. FREQUENCY SELECTOR matching Image 2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Frequency:
              </label>

              <div className="flex p-1 bg-slate-100 rounded-xl">
                {(["One-Time", "Weekly", "Monthly"] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setFrequency(freq)}
                    className={cn(
                      "flex-1 py-2 text-xs font-bold rounded-lg transition-all text-center",
                      frequency === freq
                        ? "bg-[#0f172a] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. AMOUNT SELECTOR matching Image 2 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">
                  Amount:
                </label>
                {/* Currency Switcher */}
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrency("USD");
                      setSelectedAmount(50);
                    }}
                    className={cn("px-1.5 py-0.5 rounded", currency === "USD" && "text-[#0f172a] underline font-extrabold")}
                  >
                    USD ($)
                  </button>
                  <span>|</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrency("KES");
                      setSelectedAmount(5000);
                    }}
                    className={cn("px-1.5 py-0.5 rounded", currency === "KES" && "text-[#0f172a] underline font-extrabold")}
                  >
                    KES (Ksh)
                  </button>
                </div>
              </div>

              {/* 6-Grid Buttons matching Image 2 */}
              <div className="grid grid-cols-3 gap-2">
                {(currency === "USD" ? PRESETS_USD : PRESETS_KES).map((val) => {
                  const isSelected = selectedAmount === val && !customAmount;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleSelectPreset(val)}
                      className={cn(
                        "py-3 rounded-xl text-xs sm:text-sm font-extrabold border transition-all text-center",
                        isSelected
                          ? "bg-[#0f172a] text-white border-[#0f172a] shadow-sm"
                          : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                      )}
                    >
                      {currency === "USD" ? `$${val}` : `${val.toLocaleString()}`}
                    </button>
                  );
                })}
              </div>

              {/* Custom Input */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
                  {currency === "USD" ? "$" : "KES"}
                </span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Custom"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
                />
              </div>
            </div>

            {/* 4. GOLD ACTION BUTTON matching Image 2 (Dynamic to selected cause) */}
            <button
              type="button"
              onClick={handleCompleteGift}
              className="w-full py-3.5 px-4 rounded-xl bg-[#c59b27] hover:bg-[#b08b23] text-white font-extrabold text-sm sm:text-base shadow-md transition-all active:scale-[0.99] flex items-center justify-center"
            >
              Give {currency === "USD" ? `$${selectedAmount}` : `KES ${selectedAmount.toLocaleString()}`} to {selectedFund.shortName} Now
            </button>

            {/* 5. DIVIDER matching Image 2 ("—— OR PAY WITH ——") */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200" />
              <span className="flex-shrink mx-3 text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                OR PAY WITH
              </span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            {/* =============================================================== */}
            {/* EXACT AUTHENTIC PAYMENT MODES:                                  */}
            {/* 1. Send Money (M-Pesa)                                          */}
            {/* 2. Paybill 174379 (M-Pesa)                                      */}
            {/* 3. Sendwave                                                     */}
            {/* 4. Bank Account (KCB Bank)                                      */}
            {/* =============================================================== */}
            <div className="space-y-3">
              {/* Payment Switcher: Kenya vs International */}
              <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPaymentTab("kenya")}
                  className={cn(
                    "flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5",
                    paymentTab === "kenya"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>M-Pesa (Kenya)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentTab("international")}
                  className={cn(
                    "flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5",
                    paymentTab === "international"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <Globe2 className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>International (Sendwave / Bank)</span>
                </button>
              </div>

              {/* TAB A: KENYA (SEND MONEY & PAYBILL) */}
              {paymentTab === "kenya" && (
                <div className="space-y-3 pt-1 text-xs">
                  {/* 1. M-Pesa Send Money (Pastor Line) */}
                  <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#c59b27]" />
                        <span>Method 1: Send Money (Direct Line)</span>
                      </span>
                      <span className="text-[10px] font-bold text-[#c59b27]">
                        M-Pesa
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase block">
                          Phone Number:
                        </span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          {settings.mpesaPhone || "+254112656123"}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Pastor Caesar Osebe Nyandwaro
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy("phone", settings.mpesaPhone || "+254112656123")}
                        className="px-2.5 py-1 rounded bg-slate-50 hover:bg-orange-50 border border-slate-200 text-xs font-bold text-[#c59b27] flex items-center gap-1"
                      >
                        {copiedKey === "phone" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === "phone" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  {/* 2. M-Pesa Paybill */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0f172a]" />
                        <span>Method 2: Lipa na M-Pesa (Paybill)</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">
                        Paybill
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase block">
                            Business No:
                          </span>
                          <span className="font-extrabold text-slate-900 text-sm">
                            {settings.mpesaPaybill || "174379"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("pb", settings.mpesaPaybill || "174379")}
                          className="text-[#c59b27] font-bold p-1"
                        >
                          {copiedKey === "pb" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="p-2 rounded bg-orange-50/60 border border-orange-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-[#c59b27] font-bold uppercase block">
                            Account Ref:
                          </span>
                          <span className="font-extrabold text-slate-900 text-sm">
                            {selectedFund.code}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("acc", selectedFund.code)}
                          className="text-[#c59b27] font-bold p-1"
                        >
                          {copiedKey === "acc" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 italic px-0.5">
                      Account reference <strong className="text-slate-800">{selectedFund.code}</strong> ensures your gift is directly credited to {selectedFund.shortName}.
                    </p>

                    <button
                      type="button"
                      onClick={handleCompleteGift}
                      className="w-full py-2 px-3 rounded-lg border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                    >
                      I Have Completed Payment &rarr; View Receipt
                    </button>
                  </div>
                </div>
              )}

              {/* TAB B: INTERNATIONAL (SENDWAVE & BANK ACCOUNT) */}
              {paymentTab === "international" && (
                <div className="space-y-3 pt-1 text-xs">
                  {/* 3. Sendwave */}
                  <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#c59b27]" />
                        <span>Method 1: Sendwave / Remitly</span>
                      </span>
                      <span className="text-[10px] font-bold text-[#c59b27]">
                        Direct Mobile
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-700">
                      <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase block">Recipient Mobile:</span>
                          <span className="font-extrabold text-slate-900">{settings.mpesaPhone || "+254112656123"}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("sw_phone", settings.mpesaPhone || "+254112656123")}
                          className="text-xs text-[#c59b27] font-bold"
                        >
                          {copiedKey === "sw_phone" ? "Copied" : "Copy"}
                        </button>
                      </div>

                      <div className="p-2 rounded bg-white border border-slate-200">
                        <span className="text-[9px] text-slate-400 font-bold uppercase block">Recipient Name:</span>
                        <span className="font-extrabold text-slate-900">{settings.westernUnionRecipient || "Caesar Osebe Nyandwaro"}</span>
                      </div>

                      <div className="p-2 rounded bg-white border border-orange-200">
                        <span className="text-[9px] text-[#c59b27] font-bold uppercase block">Memo / Reference:</span>
                        <span className="font-extrabold text-slate-900">{selectedFund.code}</span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <SendwaveQR />
                    </div>
                  </div>

                  {/* 4. Bank Account (KCB Bank) */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#0f172a]" />
                        <span>Method 2: Bank Account (KCB Bank)</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">
                        Wire Transfer
                      </span>
                    </div>

                    <div className="space-y-1.5 text-slate-700">
                      <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase block">Account Number:</span>
                          <span className="font-extrabold text-slate-900 text-xs">{settings.kcbAccountNumber || "1234567890"}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("bank_acc", settings.kcbAccountNumber || "1234567890")}
                          className="text-xs text-[#c59b27] font-bold"
                        >
                          {copiedKey === "bank_acc" ? "Copied" : "Copy"}
                        </button>
                      </div>

                      <p className="text-slate-600 px-1">
                        Bank: <strong>KCB Bank Kenya</strong> &bull; Branch: <strong>{settings.kcbBranch || "Nairobi Central"}</strong>
                      </p>
                      <p className="text-slate-600 px-1">
                        Account Name: <strong>{settings.kcbAccountName || "Sugutta Fellowship Church"}</strong>
                      </p>
                      <p className="text-slate-600 px-1">
                        SWIFT: <strong>{settings.kcbSwift || "KCBLKENX"}</strong>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCompleteGift}
                      className="w-full py-2 px-3 rounded-lg border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors mt-1"
                    >
                      I Have Completed Bank Transfer &rarr; View Receipt
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Security Badge matching Image 2 */}
            <div className="pt-2 text-center space-y-1">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-600">
                <Lock className="w-3 h-3" />
                <span>256-bit SSL Secure Encryption</span>
              </div>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-tight">
                Sugutta Fellowship Church is a registered 501(c)(3) ministry. Your gift is tax-deductible and stewarded with apostolic transparency.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STATE 3: THANK_YOU (Receipt & Blessing Confirmation)                       */}
        {/* ========================================================================= */}
        {currentState === "THANK_YOU" && receiptData && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
            {/* Animated Checkmark Emblem */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
                May the Lord Multiply Your Seed!
              </h2>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Thank you for your generous gift of{" "}
                <strong className="text-slate-900">
                  {receiptData.currency === "USD" ? `$${receiptData.amount}` : `KES ${receiptData.amount.toLocaleString()}`}
                </strong>{" "}
                towards <strong>{receiptData.fundName}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200/80 pb-2 font-mono text-[10px] text-slate-400">
                <span>RECEIPT</span>
                <span>{receiptData.reference}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Project / Purpose</span>
                  <span className="font-extrabold text-slate-900 block truncate">
                    {receiptData.fundName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Frequency</span>
                  <span className="font-extrabold text-slate-900 block">
                    {receiptData.frequency}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Date</span>
                  <span className="font-medium text-slate-800 block">
                    {receiptData.date}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Leadership</span>
                  <span className="font-medium text-slate-800 block truncate">
                    Pastor Caesar Osebe
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 text-[11px] italic text-slate-600 font-serif">
                &ldquo;{receiptData.scripture}&rdquo; &mdash; {receiptData.scriptureRef}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setCurrentState("CAMPAIGN_VIEW");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                &larr; Back to Story
              </button>

              <Link
                href="/"
                className="w-full py-2.5 px-4 rounded-xl bg-[#c59b27] hover:bg-[#b08b23] text-white text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Return to Homepage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
