"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Heart,
  Calendar,
  MessageSquare,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users,
  ShieldCheck,
  Lock,
  Baby,
  Building2,
  Clock,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  VISIT_SERVICES,
  VisitService,
  visitPlanSchema,
  PRAYER_CATEGORIES,
  PrayerCategory,
  prayerRequestSchema,
  INQUIRY_TYPES,
  InquiryType,
  contactInquirySchema,
} from "@/lib/validations/community";
import { submitVisitPlan, submitContactInquiry } from "@/actions/contact";
import { submitPrayerRequest } from "@/actions/prayer";

export type ConnectTab = "visit" | "prayer" | "inquiry";

export function TabbedConnectHub() {
  const searchParams = useSearchParams();

  // Detect initial tab from search params
  const initialTab = ((): ConnectTab => {
    const tab = searchParams.get("tab");
    if (tab === "prayer") return "prayer";
    if (tab === "inquiry") return "inquiry";
    if (searchParams.get("activity") || searchParams.get("subject")) return "inquiry";
    return "visit"; // default
  })();

  const [activeTab, setActiveTab] = useState<ConnectTab>(initialTab);

  // Sync tab if URL search params change
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "prayer") setActiveTab("prayer");
    else if (tab === "inquiry") setActiveTab("inquiry");
    else if (tab === "visit") setActiveTab("visit");
    else if (searchParams.get("activity") || searchParams.get("subject")) {
      setActiveTab("inquiry");
    }
  }, [searchParams]);

  /* -------------------------------------------------------------
   * TAB 1: PLAN A VISIT STATE & HANDLER
   * ----------------------------------------------------------- */
  const [visitFullName, setVisitFullName] = useState("");
  const [visitEmail, setVisitEmail] = useState("");
  const [visitPhone, setVisitPhone] = useState("");
  const [visitService, setVisitService] = useState<VisitService>(VISIT_SERVICES[0]);
  const [visitGuestsCount, setVisitGuestsCount] = useState<number>(1);
  const [visitHasChildren, setVisitHasChildren] = useState(false);
  const [visitNotes, setVisitNotes] = useState("");

  const [visitSubmitting, setVisitSubmitting] = useState(false);
  const [visitError, setVisitError] = useState<string | null>(null);
  const [visitSuccess, setVisitSuccess] = useState(false);

  // Pre-populate service if passed in URL
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam && (VISIT_SERVICES as readonly string[]).includes(serviceParam)) {
      setVisitService(serviceParam as VisitService);
      setActiveTab("visit");
    }
  }, [searchParams]);

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVisitError(null);

    const payload = {
      fullName: visitFullName,
      email: visitEmail,
      phone: visitPhone,
      expectedService: visitService,
      guestsCount: Number(visitGuestsCount),
      hasChildren: visitHasChildren,
      notes: visitNotes,
    };

    const validationResult = visitPlanSchema.safeParse(payload);
    if (!validationResult.success) {
      setVisitError(validationResult.error.issues[0]?.message || "Please check your inputs.");
      return;
    }

    setVisitSubmitting(true);
    try {
      const response = await submitVisitPlan(payload);
      if (response.success) {
        setVisitSuccess(true);
      } else {
        setVisitError(response.error || response.message || "Failed to schedule visit.");
      }
    } catch {
      setVisitError("Network error. Please try again or call our hospitality team directly.");
    } finally {
      setVisitSubmitting(false);
    }
  };

  const handleResetVisit = () => {
    setVisitFullName("");
    setVisitEmail("");
    setVisitPhone("");
    setVisitService(VISIT_SERVICES[0]);
    setVisitGuestsCount(1);
    setVisitHasChildren(false);
    setVisitNotes("");
    setVisitSuccess(false);
    setVisitError(null);
  };

  /* -------------------------------------------------------------
   * TAB 2: PRAYER PETITION STATE & HANDLER
   * ----------------------------------------------------------- */
  const [prayerFullName, setPrayerFullName] = useState("");
  const [prayerEmail, setPrayerEmail] = useState("");
  const [prayerPhone, setPrayerPhone] = useState("");
  const [prayerCategory, setPrayerCategory] = useState<PrayerCategory>(PRAYER_CATEGORIES[0]);
  const [prayerRequestText, setPrayerRequestText] = useState("");
  const [prayerIsConfidential, setPrayerIsConfidential] = useState(true);

  const [prayerSubmitting, setPrayerSubmitting] = useState(false);
  const [prayerError, setPrayerError] = useState<string | null>(null);
  const [prayerSuccess, setPrayerSuccess] = useState(false);

  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrayerError(null);

    const payload = {
      fullName: prayerFullName,
      email: prayerEmail,
      phone: prayerPhone,
      category: prayerCategory,
      request: prayerRequestText,
      isConfidential: prayerIsConfidential,
    };

    const validationResult = prayerRequestSchema.safeParse(payload);
    if (!validationResult.success) {
      setPrayerError(validationResult.error.issues[0]?.message || "Please review your prayer petition.");
      return;
    }

    setPrayerSubmitting(true);
    try {
      const response = await submitPrayerRequest(payload);
      if (response.success) {
        setPrayerSuccess(true);
      } else {
        setPrayerError(response.error || response.message || "Failed to submit prayer petition.");
      }
    } catch {
      setPrayerError("Network error. Please try again or reach out to our intercessory line.");
    } finally {
      setPrayerSubmitting(false);
    }
  };

  const handleResetPrayer = () => {
    setPrayerFullName("");
    setPrayerEmail("");
    setPrayerPhone("");
    setPrayerCategory(PRAYER_CATEGORIES[0]);
    setPrayerRequestText("");
    setPrayerIsConfidential(true);
    setPrayerSuccess(false);
    setPrayerError(null);
  };

  /* -------------------------------------------------------------
   * TAB 3: MINISTRY INQUIRY STATE & HANDLER
   * ----------------------------------------------------------- */
  const [inquiryFullName, setInquiryFullName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>(INQUIRY_TYPES[0]);
  const [inquiryMessage, setInquiryMessage] = useState("");

  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Pre-populate inquiry category if passed in URL
  useEffect(() => {
    const act = searchParams.get("activity");
    const subj = searchParams.get("subject");
    const target = act || subj;

    if (target) {
      const matched = (INQUIRY_TYPES as readonly string[]).find(
        (t) => t.toLowerCase() === target.toLowerCase() || target.toLowerCase().includes(t.toLowerCase())
      );
      if (matched) {
        setInquiryType(matched as InquiryType);
      } else if (target === "orphanage_visit") {
        setInquiryType("Children's Home & Orphanage Visit");
      }
    }
  }, [searchParams]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryError(null);

    const payload = {
      fullName: inquiryFullName,
      email: inquiryEmail,
      phone: inquiryPhone,
      inquiryType,
      message: inquiryMessage,
    };

    const validationResult = contactInquirySchema.safeParse(payload);
    if (!validationResult.success) {
      setInquiryError(validationResult.error.issues[0]?.message || "Please check your inputs.");
      return;
    }

    setInquirySubmitting(true);
    try {
      const response = await submitContactInquiry(payload);
      if (response.success) {
        setInquirySuccess(true);
      } else {
        setInquiryError(response.error || response.message || "Failed to submit inquiry.");
      }
    } catch {
      setInquiryError("Network error. Please try again or reach out to our sanctuary office.");
    } finally {
      setInquirySubmitting(false);
    }
  };

  const handleResetInquiry = () => {
    setInquiryFullName("");
    setInquiryEmail("");
    setInquiryPhone("");
    setInquiryType(INQUIRY_TYPES[0]);
    setInquiryMessage("");
    setInquirySuccess(false);
    setInquiryError(null);
  };

  return (
    <Card className="border-border shadow-2xl bg-card overflow-hidden transition-all duration-300">
      {/* Tab Navigation Header (Benchmarked from Glory Gate #connect) */}
      <div className="bg-muted/40 p-2 sm:p-3 border-b border-border">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 bg-background/80 p-1.5 rounded-xl border border-border shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab("visit")}
            className={cn(
              "flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center",
              activeTab === "visit"
                ? "bg-primary text-white shadow-md border border-accent/40"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            <Calendar className={cn("h-4 w-4 shrink-0", activeTab === "visit" ? "text-accent" : "")} />
            <span className="truncate">Plan a Visit</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("prayer")}
            className={cn(
              "flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center",
              activeTab === "prayer"
                ? "bg-primary text-white shadow-md border border-accent/40"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            <Heart className={cn("h-4 w-4 shrink-0", activeTab === "prayer" ? "text-accent fill-accent/20" : "")} />
            <span className="truncate">Prayer Petition</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("inquiry")}
            className={cn(
              "flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center",
              activeTab === "inquiry"
                ? "bg-primary text-white shadow-md border border-accent/40"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            <MessageSquare className={cn("h-4 w-4 shrink-0", activeTab === "inquiry" ? "text-accent" : "")} />
            <span className="truncate">Ministry Inquiry</span>
          </button>
        </div>
      </div>

      <CardContent className="p-6 sm:p-8">
        {/* ========================================================= */}
        {/* TAB 1 CONTENT: PLAN A VISIT                               */}
        {/* ========================================================= */}
        {activeTab === "visit" && (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold">
                <Sparkles className="h-3 w-3 fill-current" />
                <span>First-Time Guest Concierge</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                We Would Love to Host You
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Tell us when you are arriving. Our hospitality team will meet you at the door, escort you to reserved seating, and ensure your family feels at home.
              </p>
            </div>

            {visitSuccess ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-primary text-primary-foreground border border-accent/40 shadow-xl space-y-5 text-center">
                <div className="h-16 w-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto text-accent">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Your Visit is Registered!
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-accent">{visitFullName}</strong>. We have alerted our guest ministers that you are joining us for{" "}
                    <strong className="text-white">{visitService}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Guests:</span>
                    <span className="font-semibold text-white">{visitGuestsCount} person(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Kids Ministry:</span>
                    <span className="font-semibold text-white">
                      {visitHasChildren ? "Yes (Kings Kids Check-in)" : "No children"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Check-in:</span>
                    <span className="font-semibold text-accent">Guest Reception Desk at Main Entrance</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleResetVisit}
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs font-bold"
                >
                  Schedule Another Visit
                </Button>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} className="space-y-5">
                {visitError && (
                  <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{visitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Bro. David Mwangi"
                      value={visitFullName}
                      onChange={(e) => setVisitFullName(e.target.value)}
                      required
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={visitPhone}
                      onChange={(e) => setVisitPhone(e.target.value)}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="david@example.com"
                    value={visitEmail}
                    onChange={(e) => setVisitEmail(e.target.value)}
                    required
                    className="bg-background"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    We&apos;ll send your directions and welcome pass here.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Which Service Will You Attend? <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={visitService}
                      onChange={(e) => setVisitService(e.target.value as VisitService)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
                    >
                      {VISIT_SERVICES.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Number of Guests Attending
                    </label>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        value={visitGuestsCount}
                        onChange={(e) => setVisitGuestsCount(Math.max(1, Number(e.target.value)))}
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-6 sm:pt-7">
                    <input
                      id="visitChildrenCheckbox"
                      type="checkbox"
                      checked={visitHasChildren}
                      onChange={(e) => setVisitHasChildren(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent accent-accent"
                    />
                    <label
                      htmlFor="visitChildrenCheckbox"
                      className="text-xs text-foreground cursor-pointer font-medium select-none flex items-center gap-1.5"
                    >
                      <Baby className="h-3.5 w-3.5 text-accent" />
                      <span>Bringing Children (Ages 2–12)</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Special Requests or Questions (Optional)
                  </label>
                  <Textarea
                    placeholder="e.g. Accessibility seating needs, wheelchair assistance, or specific questions about the service."
                    rows={3}
                    value={visitNotes}
                    onChange={(e) => setVisitNotes(e.target.value)}
                    className="bg-background resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  disabled={visitSubmitting}
                  className="w-full py-6 text-sm font-bold shadow-md hover:brightness-105"
                >
                  {visitSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Reserving Your Visit...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Confirm Visit &amp; Reserve Seats
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2 CONTENT: PRAYER PETITION                            */}
        {/* ========================================================= */}
        {activeTab === "prayer" && (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold">
                <Heart className="h-3 w-3 fill-current" />
                <span>Intercessory Altar</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Submit Your Prayer Petition
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Every request submitted here is printed and laid upon the sacred sanctuary altar. Apostle and our prayer warriors lift your petition continually.
              </p>
            </div>

            {prayerSuccess ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-primary text-primary-foreground border border-accent/40 shadow-xl space-y-5 text-center">
                <div className="h-16 w-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto text-accent">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Petition Received at the Altar
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-accent">{prayerFullName}</strong>. The God who answers by fire has heard your cry. Stand firm in faith.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Category:</span>
                    <span className="font-semibold text-white">{prayerCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Confidentiality:</span>
                    <span className="font-semibold text-accent">
                      {prayerIsConfidential ? "Confidential Altar Only" : "General Intercession"}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleResetPrayer}
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs font-bold"
                >
                  Submit Another Prayer Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handlePrayerSubmit} className="space-y-5">
                {prayerError && (
                  <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{prayerError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Your Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Sister Grace Wanjiku"
                      value={prayerFullName}
                      onChange={(e) => setPrayerFullName(e.target.value)}
                      required
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="grace@example.com"
                      value={prayerEmail}
                      onChange={(e) => setPrayerEmail(e.target.value)}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Phone Number (Optional)
                    </label>
                    <Input
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={prayerPhone}
                      onChange={(e) => setPrayerPhone(e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Petition Category <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={prayerCategory}
                      onChange={(e) => setPrayerCategory(e.target.value as PrayerCategory)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
                    >
                      {PRAYER_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Your Prayer Petition <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    placeholder="Share the details of your situation with confidence. Tell us what mountain needs to move in your life..."
                    rows={4}
                    value={prayerRequestText}
                    onChange={(e) => setPrayerRequestText(e.target.value)}
                    required
                    className="bg-background resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                  <input
                    id="confidentialCheckbox"
                    type="checkbox"
                    checked={prayerIsConfidential}
                    onChange={(e) => setPrayerIsConfidential(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent accent-accent"
                  />
                  <label
                    htmlFor="confidentialCheckbox"
                    className="text-xs text-foreground cursor-pointer font-medium select-none flex items-center gap-1.5"
                  >
                    <Lock className="h-3.5 w-3.5 text-accent" />
                    <span>Keep Strictly Confidential (Shared only with the Intercessory Altar)</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  disabled={prayerSubmitting}
                  className="w-full py-6 text-sm font-bold shadow-md hover:brightness-105"
                >
                  {prayerSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Laying at Altar...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Petition to the Altar
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3 CONTENT: MINISTRY INQUIRY                           */}
        {/* ========================================================= */}
        {activeTab === "inquiry" && (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold">
                <Building2 className="h-3 w-3 fill-current" />
                <span>Department Administration</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Connect With a Ministry Leader
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Looking to join a fellowship, book a retreat at Mai Mahiu Prayer Mountain, arrange an orphanage outreach, or seek pastoral counsel? Let us know below.
              </p>
            </div>

            {inquirySuccess ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-primary text-primary-foreground border border-accent/40 shadow-xl space-y-5 text-center">
                <div className="h-16 w-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto text-accent">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Inquiry Forwarded Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-accent">{inquiryFullName}</strong>. Your message has been routed directly to the{" "}
                    <strong className="text-white">{inquiryType}</strong> pastoral coordinator.
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={handleResetInquiry}
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs font-bold"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-5">
                {inquiryError && (
                  <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{inquiryError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. John Kamau"
                      value={inquiryFullName}
                      onChange={(e) => setInquiryFullName(e.target.value)}
                      required
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Phone Number (Optional)
                    </label>
                    <Input
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Ministry / Department <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
                    >
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Your Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    placeholder="Describe how we can assist you, or the details of your inquiry..."
                    rows={4}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    required
                    className="bg-background resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  disabled={inquirySubmitting}
                  className="w-full py-6 text-sm font-bold shadow-md hover:brightness-105"
                >
                  {inquirySubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Forwarding Inquiry...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Ministry Inquiry
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
