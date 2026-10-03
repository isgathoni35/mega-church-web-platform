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

interface RemittanceApp {
  id: string;
  name: string;
  tagline: string;
  coverage: string;
  badgeColor: string;
  link: string;
  initial: string;
}

const REMITTANCE_APPS: RemittanceApp[] = [
  {
    id: "sendwave",
    name: "Sendwave",
    tagline: "Zero fee transfer directly from your debit card to our M-Pesa line.",
    coverage: "USA, UK, Canada, Europe",
    badgeColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    link: "https://www.sendwave.com",
    initial: "W",
  },
  {
    id: "remitly",
    name: "Remitly",
    tagline: "Trusted worldwide remittance sent straight to Kenyan mobile money.",
    coverage: "Global (170+ Countries)",
    badgeColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    link: "https://www.remitly.com",
    initial: "R",
  },
  {
    id: "lemfi",
    name: "Lemfi",
    tagline: "Instant, fee-free diaspora transfer from bank/card to M-Pesa.",
    coverage: "UK, USA, Europe, Canada",
    badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    link: "https://lemfi.com",
    initial: "L",
  },
  {
    id: "taptap",
    name: "Taptap Send",
    tagline: "Fast, honest mobile money transfer to Kenya with zero hidden fees.",
    coverage: "UK, USA, Canada, Europe, UAE",
    badgeColor: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    link: "https://www.taptapsend.com",
    initial: "T",
  },
  {
    id: "worldremit",
    name: "WorldRemit",
    tagline: "Direct M-Pesa mobile wallet transfer accepted globally.",
    coverage: "130+ Countries",
    badgeColor: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    link: "https://www.worldremit.com",
    initial: "W",
  },
];

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
    <div className="w-full space-y-8">
      {/* ================= TAB SELECTOR ================= */}
      <div className="flex justify-center">
        <div className="p-1.5 rounded-2xl bg-secondary/80 border border-border shadow-inner flex items-center gap-2 max-w-md w-full">
          <button
            type="button"
            onClick={() => setActiveTab("kenya")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200",
              activeTab === "kenya"
                ? "bg-primary text-white shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            <Smartphone className="h-4 w-4 text-accent" />
            <span>For Kenyans</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("international")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200",
              activeTab === "international"
                ? "bg-primary text-white shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            <Globe2 className="h-4 w-4 text-accent" />
            <span>For International</span>
          </button>
        </div>
      </div>

      {/* ================= ORPHANAGE BANNER IF QUERY PARAM ================= */}
      {highlightOrphanage && (
        <div className="p-4 rounded-xl bg-accent/15 border border-accent/40 text-foreground flex items-center gap-3 animate-in fade-in duration-300">
          <Heart className="h-5 w-5 text-accent shrink-0 fill-accent/20" />
          <div className="text-xs sm:text-sm">
            <strong>Sponsoring our Children&apos;s Home:</strong> When prompted for an Account Number, please enter <span className="font-mono font-bold text-accent px-1.5 py-0.5 rounded bg-primary text-white text-xs">ORPHANAGE</span> so your seed is designated directly for the children.
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: FOR KENYANS (M-Pesa Direct + Paybill + Bank Wire)                  */}
      {/* ========================================================================= */}
      {activeTab === "kenya" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* METHOD 1: SEND MONEY (PASTOR NG'ANG'A STYLE) */}
            <Card className="border border-border shadow-xl overflow-hidden bg-card/90">
              <div className="bg-primary border-b border-accent/30 p-5 text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">
                    Direct Giving
                  </span>
                  <h3 className="font-extrabold text-lg text-white">Donate via M-Pesa</h3>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Follow the steps below on your phone to send your tithe, seed, or offering directly to the ministry line:
                </p>

                <ol className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      1
                    </span>
                    <span className="text-foreground">
                      Go to the <strong>M-Pesa Menu</strong> on your phone.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      2
                    </span>
                    <span className="text-foreground">
                      Select <strong>Send Money</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      3
                    </span>
                    <div className="w-full space-y-2">
                      <span className="text-foreground block">
                        Enter the official church recipient details:
                      </span>

                      {/* Recipient Details Box */}
                      <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                            Phone Number
                          </span>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-mono text-xl sm:text-2xl font-black text-foreground tracking-wide">
                              0700 000 001
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy("phone_local", "0700000001")}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 text-xs font-semibold shadow-sm transition-all"
                            >
                              {copiedKey === "phone_local" ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-accent" />
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

                        <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Recipient Name</span>
                          <span className="font-bold text-foreground">
                            Pastor Jeannette Taylor
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      4
                    </span>
                    <span className="text-foreground">
                      Enter the <strong>amount</strong> you wish to give and your <strong>M-Pesa PIN</strong>.
                    </span>
                  </li>
                </ol>

                <div className="p-3.5 rounded-xl bg-secondary/80 border border-border text-xs text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                  <span>Works seamlessly across Safaricom, Airtel Money, Telkom, and all Kenyan banking apps.</span>
                </div>
              </CardContent>
            </Card>

            {/* METHOD 2: PAYBILL & FUND REFERENCES */}
            <Card className="border border-border shadow-xl overflow-hidden bg-card/90">
              <div className="bg-primary border-b border-accent/30 p-5 text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">
                    Business Paybill
                  </span>
                  <h3 className="font-extrabold text-lg text-white">Lipa na M-Pesa (Pay Bill)</h3>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use our registered Safaricom Paybill to tag your seed for a specific kingdom fund:
                </p>

                {/* Paybill Number Box */}
                <div className="p-4 rounded-xl bg-muted/60 border border-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Business Number (Paybill)
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-foreground tracking-wider">
                      174379
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy("paybill", "174379")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 text-xs font-semibold shadow-sm transition-all"
                    >
                      {copiedKey === "paybill" ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-accent" />
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
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Select Account Number (Tap to Copy):
                  </span>

                  <div className="space-y-2">
                    {GIVING_FUNDS.map((fund) => {
                      const isOrphanage = fund.code === "ORPHANAGE";
                      return (
                        <div
                          key={fund.code}
                          onClick={() => handleCopy(fund.code, fund.code)}
                          className={cn(
                            "p-3 rounded-lg border flex items-center justify-between gap-3 cursor-pointer transition-all",
                            copiedKey === fund.code
                              ? "bg-accent/15 border-accent shadow-sm"
                              : isOrphanage && highlightOrphanage
                              ? "bg-accent/10 border-accent"
                              : "bg-background hover:bg-muted/50 border-border"
                          )}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-sm text-foreground">
                                {fund.code}
                              </span>
                              <span className="text-xs font-semibold text-muted-foreground">
                                • {fund.name}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {fund.desc}
                            </p>
                          </div>

                          <div className="shrink-0">
                            {copiedKey === fund.code ? (
                              <span className="text-xs font-bold text-accent flex items-center gap-1">
                                <Check className="h-3.5 w-3.5" />
                                Copied
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground hover:text-accent flex items-center gap-1">
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

                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-1.5 pt-2 border-t border-border">
                  <li>Go to <strong>Lipa na M-Pesa</strong> &rarr; <strong>Pay Bill</strong>.</li>
                  <li>Enter Business No: <strong>174379</strong>.</li>
                  <li>Enter Account No: e.g. <strong>OFFERING</strong>, <strong>TITHE</strong>, or <strong>ORPHANAGE</strong>.</li>
                  <li>Enter amount and your M-Pesa PIN.</li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* METHOD 3: BANK WIRE / DEPOSIT / CHEQUES */}
          <Card className="border border-border/80 bg-card/60">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground">Bank Deposit / RTGS / Cheques</h4>
                    <p className="text-xs text-muted-foreground">
                      For large donations, corporate giving, cathedral expansion, and direct bank transfers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Bank Name</span>
                  <span className="font-bold text-foreground text-sm mt-0.5 block">Co-operative Bank of Kenya</span>
                </div>

                <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Branch</span>
                  <span className="font-bold text-foreground text-sm mt-0.5 block">Nairobi City Centre Branch</span>
                </div>

                <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Account Name</span>
                  <span className="font-bold text-foreground text-sm mt-0.5 block">Heavens Gates Sugutta Fellowship Church</span>
                </div>

                <div className="p-3.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Account Number</span>
                    <span className="font-mono font-bold text-foreground text-sm mt-0.5 block">01129000000000</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("bank_acc", "01129000000000")}
                    className="p-1.5 rounded-md hover:bg-muted text-accent transition-colors"
                    title="Copy Account Number"
                  >
                    {copiedKey === "bank_acc" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FOR INTERNATIONAL PARTNERS (NENO REMITTANCE APPS MODEL)           */}
      {/* ========================================================================= */}
      {activeTab === "international" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Main Hero Card for International */}
          <Card className="border border-border shadow-xl overflow-hidden bg-card/90">
            <div className="bg-primary border-b border-accent/30 p-6 text-white text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mx-auto">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-2xl text-white">Give from Anywhere in the World!</h3>
              <p className="text-sm text-white/80 max-w-xl mx-auto">
                Use your favorite money transfer app to send funds directly to our Kenyan M-Pesa line. It arrives instantly with zero or low conversion fees.
              </p>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-8">
              {/* Step 1: Apps Grid */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-bold text-sm text-foreground">
                    Open Your Preferred Remittance App:
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {REMITTANCE_APPS.map((app) => (
                    <a
                      key={app.id}
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl border border-border bg-background hover:border-accent hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-base text-foreground group-hover:text-accent transition-colors">
                            {app.name}
                          </span>
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", app.badgeColor)}>
                            {app.coverage}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {app.tagline}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-accent">
                        <span>Open {app.name}</span>
                        <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Country */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-bold text-sm text-foreground">
                    Select Transfer Destination in Your App:
                  </h4>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border text-xs sm:text-sm text-muted-foreground flex flex-wrap gap-4 items-center">
                  <div>Country: <strong className="text-foreground">Kenya 🇰🇪</strong></div>
                  <div>Delivery Method: <strong className="text-foreground">Mobile Money / M-Pesa</strong></div>
                </div>
              </div>

              {/* Step 3: Enter Recipient Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h4 className="font-bold text-sm text-foreground">
                    Enter Recipient Details Below:
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="p-4 rounded-xl bg-muted/70 border border-border flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Recipient Mobile Number
                      </span>
                      <span className="font-mono text-xl font-bold text-foreground mt-0.5 block">
                        +254 700 000 001
                      </span>
                      <span className="text-[11px] text-muted-foreground">Country Code +254 (Kenya)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("intl_phone", "+254700000001")}
                      className="px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 text-xs font-semibold shrink-0 shadow-sm"
                    >
                      {copiedKey === "intl_phone" ? (
                        <span className="flex items-center gap-1 text-accent">
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
                  <div className="p-4 rounded-xl bg-muted/70 border border-border flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Recipient Name
                      </span>
                      <span className="font-bold text-base sm:text-lg text-foreground mt-0.5 block">
                        Pastor Jeannette Taylor
                      </span>
                      <span className="text-[11px] text-muted-foreground">Heavens Gates Sugutta Fellowship</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy("intl_name", "Pastor Jeannette Taylor")}
                      className="px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 text-xs font-semibold shrink-0 shadow-sm"
                    >
                      {copiedKey === "intl_name" ? (
                        <span className="flex items-center gap-1 text-accent">
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
            </CardContent>
          </Card>

          {/* Secondary Gateways: PayPal, CashApp & Direct Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PayPal */}
            <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">Online Cards &amp; Balance</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">Worldwide</span>
                </div>
                <h4 className="font-extrabold text-lg text-foreground">PayPal &amp; Debit/Credit Cards</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Give securely using your international Visa, MasterCard, American Express, or PayPal account balance.
                </p>
                <div className="font-mono text-xs font-bold text-accent">@hgsugutta</div>
              </div>

              <div>
                <a
                  href="https://paypal.me/hgsugutta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-accent text-accent-foreground font-bold text-xs hover:brightness-105 transition-all shadow"
                >
                  Give via PayPal / Cards
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Cash App */}
            <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">USA &amp; UK Cashtag</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">USA &amp; UK</span>
                </div>
                <h4 className="font-extrabold text-lg text-foreground">Cash App</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Send directly to our ministry Cashtag from your mobile device.
                </p>
                <div className="font-mono text-sm font-black text-foreground">$HGSugutta</div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleCopy("cashtag", "$HGSugutta")}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-secondary text-foreground hover:bg-muted font-bold text-xs border border-border transition-all"
                >
                  {copiedKey === "cashtag" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-accent" />
                      Cashtag Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy $HGSugutta
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PASTORAL RECEIPT CONFIRMATION & ASSISTANCE ================= */}
      <div className="p-6 rounded-2xl bg-primary text-primary-foreground border border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Personal Pastoral Oversight</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Need a Written Giving Receipt or Prayer Confirmation?
            </h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              If you require a church receipt for tax purposes, or wish to notify Apostle Dr. J. Taylor directly of your kingdom seed, simply text or WhatsApp your transaction confirmation code to our Pastoral Line.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+254700000001"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-bold text-xs hover:brightness-105 transition-all shadow"
            >
              <Phone className="h-3.5 w-3.5" />
              +254 700 000 001
            </a>
            <a
              href="mailto:giving@heavensgatesugutta.org"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 font-semibold text-xs transition-all"
            >
              <Mail className="h-3.5 w-3.5 text-accent" />
              giving@heavensgatesugutta.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
