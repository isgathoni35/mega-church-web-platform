"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const AMOUNT_PRESETS = [500, 1000, 2500, 5000];

const GIVING_PURPOSES = [
  { id: "tithe", label: "Tithe" },
  { id: "offering", label: "General Offering" },
  { id: "seed", label: "Kingdom Seed" },
  { id: "building", label: "Building Fund" },
  { id: "orphanage", label: "Children's Home & Orphanage" },
];

export function MpesaGivingForm() {
  const searchParams = useSearchParams();
  const [selectedPreset, setSelectedPreset] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("tithe");

  useEffect(() => {
    const fundParam = searchParams.get("fund");
    if (fundParam === "orphanage") {
      setPurpose("orphanage");
    }
  }, [searchParams]);

  const [formState, setFormState] = useState<
    "idle" | "submitting" | "awaiting_pin" | "success" | "failed"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [checkoutRequestId, setCheckoutRequestId] = useState<string>("");
  const [receiptNumber, setReceiptNumber] = useState<string>("");
  const [confirmedAmount, setConfirmedAmount] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(60);
  const [showManualPaybill, setShowManualPaybill] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeAmount = selectedPreset !== null ? selectedPreset : parseInt(customAmount, 10) || 0;

  // Handle Preset vs Custom Selection
  const handleSelectPreset = (preset: number) => {
    setSelectedPreset(preset);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCustomAmount(val);
    setSelectedPreset(null);
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Submit STK Push
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAmount < 10) {
      setErrorMessage("Please enter an amount of at least KES 10.");
      return;
    }
    if (!phone || phone.trim().length < 9) {
      setErrorMessage("Please provide a valid Safaricom phone number.");
      return;
    }

    setErrorMessage("");
    setFormState("submitting");

    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.trim(),
          amount: activeAmount,
          donorName: donorName.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Unable to initiate STK push. Please check your phone number.");
        setFormState("failed");
        return;
      }

      setCheckoutRequestId(data.checkoutRequestId);
      setConfirmedAmount(activeAmount);
      setFormState("awaiting_pin");
      setCountdown(60);
    } catch {
      setErrorMessage("A network error occurred while connecting to Safaricom. Please try again.");
      setFormState("failed");
    }
  };

  // Polling loop when awaiting PIN
  useEffect(() => {
    if (formState !== "awaiting_pin" || !checkoutRequestId) {
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      return;
    }

    // Countdown tick
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
          setErrorMessage("STK Push timed out. Did not receive PIN confirmation in time.");
          setFormState("failed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Polling function
    const checkStatus = async () => {
      try {
        const res = await fetch(
          `/api/mpesa/status?checkoutRequestId=${encodeURIComponent(checkoutRequestId)}`
        );
        const data = await res.json();

        if (data.status === "completed") {
          if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          setReceiptNumber(data.receipt || "MPESA-CONFIRMED");
          setFormState("success");
        } else if (data.status === "failed") {
          if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          setErrorMessage("Transaction was cancelled or declined on the phone.");
          setFormState("failed");
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    pollingTimerRef.current = setInterval(checkStatus, 2500);

    return () => {
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [formState, checkoutRequestId]);

  const resetForm = () => {
    setFormState("idle");
    setErrorMessage("");
    setCheckoutRequestId("");
    setReceiptNumber("");
  };

  return (
    <Card className="border border-border/80 shadow-xl overflow-hidden bg-card/90 backdrop-blur-sm">
      {/* Header Accent Band */}
      <div className="bg-[#0f172a] border-b border-slate-800 p-4 sm:p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-400/30 shrink-0">
            <Smartphone className="w-5 h-5 text-[#ff6b35]" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg leading-tight text-white">Lipa na M-Pesa Online</h3>
            <p className="text-xs text-slate-300">Instant STK Push direct to your Safaricom line</p>
          </div>
        </div>
      </div>

      <CardContent className="p-4 sm:p-6">
        {/* ================= STATE: SUCCESS ================= */}
        {formState === "success" && (
          <div className="text-center py-6 space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto text-green-600 shadow-lg shadow-green-500/10">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Kingdom Offering Received</span>
              <h4 className="font-extrabold text-xl sm:text-2xl text-foreground mt-1">Thank You For Sowing!</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Your seed of <strong className="text-foreground">KES {confirmedAmount.toLocaleString()}</strong> has been securely logged.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="p-4 rounded-lg bg-muted/60 border border-border text-left space-y-2 max-w-sm mx-auto text-xs">
              <div className="flex justify-between border-b border-border/60 pb-1.5">
                <span className="text-muted-foreground">Receipt Number</span>
                <span className="font-mono font-bold text-foreground">{receiptNumber}</span>
              </div>
              <div className="flex justify-between border-b border-border/60 pb-1.5">
                <span className="text-muted-foreground">Channel</span>
                <span className="font-medium text-foreground">Safaricom M-Pesa STK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purpose</span>
                <span className="capitalize font-medium text-foreground">{purpose}</span>
              </div>
            </div>

            {/* Blessing Scripture */}
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 max-w-md mx-auto text-xs italic text-foreground/90">
              &ldquo;Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.&rdquo;
              <div className="font-bold not-italic text-right text-accent mt-1">— Luke 6:38 (NIV)</div>
            </div>

            <Button onClick={resetForm} variant="accent" className="w-full max-w-xs mx-auto">
              Give Another Offering
            </Button>
          </div>
        )}

        {/* ================= STATE: AWAITING PIN ================= */}
        {formState === "awaiting_pin" && (
          <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent/30 animate-ping" />
              <div className="relative rounded-full w-14 h-14 bg-primary text-accent flex items-center justify-center border-2 border-accent">
                <Smartphone className="w-7 h-7 animate-bounce" />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg sm:text-xl text-foreground">Check Your Phone Screen</h4>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                A Safaricom prompt has been sent to <strong className="text-foreground">{phone}</strong>. Enter your M-Pesa PIN to authorize <strong className="text-foreground">KES {confirmedAmount.toLocaleString()}</strong>.
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
              Waiting for PIN confirmation ({countdown}s)
            </div>

            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetForm}
                className="text-xs text-muted-foreground"
              >
                Cancel & Try Again
              </Button>
            </div>
          </div>
        )}

        {/* ================= STATE: IDLE / FAILED / SUBMITTING ================= */}
        {(formState === "idle" || formState === "failed" || formState === "submitting") && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Purpose Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Giving Purpose
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {GIVING_PURPOSES.map((p, index) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPurpose(p.id)}
                    className={cn(
                      "px-2.5 py-2 text-xs font-medium rounded-md border text-center transition-all",
                      index === 4 ? "col-span-2 sm:col-span-1" : "",
                      purpose === p.id
                        ? "bg-primary text-white border-primary shadow-sm ring-1 ring-primary/40"
                        : "bg-muted/40 hover:bg-muted text-foreground border-border"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex justify-between">
                <span>Select Amount (KES)</span>
                <span className="text-accent font-bold">
                  {activeAmount > 0 ? `KES ${activeAmount.toLocaleString()}` : ""}
                </span>
              </label>

              {/* Preset Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {AMOUNT_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={cn(
                      "py-2.5 px-2 rounded-md font-bold text-xs sm:text-sm border text-center transition-all",
                      selectedPreset === preset
                        ? "bg-accent text-accent-foreground border-accent shadow-md scale-[1.02]"
                        : "bg-background hover:bg-muted text-foreground border-border"
                    )}
                  >
                    KES {preset.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom Amount Field */}
              <div className="relative pt-1">
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Or enter custom amount (e.g. 10000)"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="font-medium text-sm"
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Safaricom Phone Number
              </label>
              <div className="relative">
                <Input
                  type="tel"
                  placeholder="0712 345 678 or 2547..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="font-medium text-sm pl-3"
                  required
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                The prompt will appear immediately on this phone to enter your PIN.
              </p>
            </div>

            {/* Donor Name Field (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex justify-between">
                <span>Your Name</span>
                <span className="text-[10px] text-muted-foreground font-normal">(Optional)</span>
              </label>
              <Input
                type="text"
                placeholder="e.g. Bro. David W."
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="text-sm"
              />
            </div>

            {/* Submit Action Button */}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              disabled={formState === "submitting" || activeAmount < 10}
              className="w-full font-bold shadow-md hover:shadow-lg transition-all"
            >
              {formState === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Initiating STK Push...
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 mr-2" />
                  Send STK Push to Phone (KES {activeAmount > 0 ? activeAmount.toLocaleString() : "0"})
                </>
              )}
            </Button>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>Direct Safaricom Daraja SSL 256-bit encryption</span>
            </div>
          </form>
        )}

        {/* ================= MANUAL PAYBILL ACCORDION ================= */}
        <div className="mt-6 pt-4 border-t border-border">
          <button
            type="button"
            onClick={() => setShowManualPaybill(!showManualPaybill)}
            className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Prefer to pay via manual Paybill?</span>
            {showManualPaybill ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showManualPaybill && (
            <div className="mt-3 p-4 rounded-lg bg-muted/50 border border-border space-y-3 text-xs animate-in fade-in duration-200">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded bg-background border border-border">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Business No / Paybill
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono font-bold text-base text-foreground">174379</span>
                    <button
                      type="button"
                      onClick={() => handleCopy("174379", "paybill")}
                      className="text-muted-foreground hover:text-accent p-1"
                    >
                      {copiedField === "paybill" ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-background border border-border">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Account No
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono font-bold text-base text-foreground">OFFERING</span>
                    <button
                      type="button"
                      onClick={() => handleCopy("OFFERING", "account")}
                      className="text-muted-foreground hover:text-accent p-1"
                    >
                      {copiedField === "account" ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <ol className="list-decimal pl-4 space-y-1 text-muted-foreground text-[11px]">
                <li>Go to M-Pesa on your phone &rarr; Lipa na M-Pesa &rarr; Pay Bill.</li>
                <li>Enter Business Number <strong>174379</strong>.</li>
                <li>Enter Account Number <strong>OFFERING</strong> or your name.</li>
                <li>Enter the amount you wish to give and your M-Pesa PIN.</li>
              </ol>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
