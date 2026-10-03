"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Heart,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  PRAYER_CATEGORIES,
  PrayerCategory,
  prayerRequestSchema,
} from "@/lib/validations/community";
import { submitPrayerRequest } from "@/actions/prayer";

export function PrayerForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PrayerCategory>(
    PRAYER_CATEGORIES[0]
  );
  const [requestText, setRequestText] = useState("");
  const [isConfidential, setIsConfidential] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation using Zod
    const payload = {
      fullName,
      email,
      phone,
      category: selectedCategory,
      request: requestText,
      isConfidential,
    };

    const validationResult = prayerRequestSchema.safeParse(payload);
    if (!validationResult.success) {
      const issue = validationResult.error.issues[0]?.message;
      setErrorMessage(issue || "Please check your inputs and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitPrayerRequest(payload);

      if (response.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(
          response.error ||
            response.message ||
            "Unable to submit prayer request. Please try again."
        );
      }
    } catch {
      setErrorMessage(
        "A network error occurred. Please try again or reach our prayer line directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setSelectedCategory(PRAYER_CATEGORIES[0]);
    setRequestText("");
    setIsConfidential(true);
    setIsSuccess(false);
    setErrorMessage(null);
  };

  if (isSuccess) {
    return (
      <Card className="rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden bg-white text-slate-900">
        <div className="bg-[#ff6b35] h-1.5 w-full" />
        <CardContent className="p-8 sm:p-12 text-center space-y-6">
          <div className="h-16 w-16 mx-auto rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-[#ff6b35] shadow-lg animate-bounce">
            <CheckCircle2 className="h-8 w-8 text-[#ff6b35]" />
          </div>

          <div className="space-y-3">
            <span className="font-script text-2xl sm:text-3xl text-[#ff6b35] block font-normal">
              The Prayer of Faith
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Your Petition Has Been Placed on the Altar
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Our Senior Apostolic Team and dedicated intercessors will hold your request
              in prayer during our daily morning altar devotions.
            </p>
          </div>

          <div className="bg-[#fbf8f3] rounded-2xl p-5 border border-orange-200/80 max-w-lg mx-auto text-left space-y-2">
            <p className="text-xs uppercase tracking-wider font-semibold text-[#ff6b35] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#ff6b35]" />
              Scripture Promise • James 5:16
            </p>
            <p className="text-sm italic text-slate-700 leading-relaxed font-serif">
              &ldquo;The prayer of a righteous person is powerful and effective. Confess
              your needs to God with thanksgiving, and His peace will guard your heart.&rdquo;
            </p>
          </div>

          {isConfidential && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
              <Lock className="h-3.5 w-3.5 text-[#ff6b35]" />
              <span>Marked for Pastoral Intercessory Team Eyes Only</span>
            </div>
          )}

          <div className="pt-4">
            <Button
              onClick={handleReset}
              className="bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-orange-500/20"
            >
              Submit Another Petition
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl border border-slate-200/80 shadow-md bg-white text-slate-900 overflow-hidden">
      <div className="bg-[#ff6b35] h-1.5 w-full" />
      <CardHeader className="p-6 sm:p-8 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Heart className="h-6 w-6 text-[#ff6b35] fill-orange-100" />
            Bring Your Need to God
          </CardTitle>
          <span className="text-xs font-semibold text-[#ff6b35] bg-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Altar of Prayer
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          No situation is beyond the restorative power of God. Share your burden with our
          prayer warriors.
        </p>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 pt-0">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              1. Select Prayer Focus / Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRAYER_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between",
                      isSelected
                        ? "border-[#ff6b35] bg-orange-50 text-[#ff6b35] font-bold shadow-sm ring-1 ring-[#ff6b35]"
                        : "border-slate-200 hover:border-orange-300 bg-white text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <span>{cat}</span>
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-[#ff6b35] ml-2 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="prayer-fullname"
                className="text-xs font-semibold text-slate-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="prayer-fullname"
                placeholder="e.g. Sister Grace Wanjiku"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                maxLength={100}
                className="h-11 rounded-xl border-slate-200 focus:border-[#ff6b35] focus:ring-[#ff6b35]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="prayer-email"
                className="text-xs font-semibold text-slate-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="prayer-email"
                type="email"
                placeholder="e.g. grace@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl border-slate-200 focus:border-[#ff6b35] focus:ring-[#ff6b35]"
              />
            </div>
          </div>

          {/* Optional Phone */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="prayer-phone"
                className="text-xs font-semibold text-slate-700"
              >
                Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <span className="text-[11px] text-slate-400">
                For pastoral call back if requested
              </span>
            </div>
            <Input
              id="prayer-phone"
              type="tel"
              placeholder="+254 700 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 rounded-xl border-slate-200 focus:border-[#ff6b35] focus:ring-[#ff6b35]"
            />
          </div>

          {/* Prayer Request TextArea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="prayer-text"
                className="text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                2. Your Prayer Petition <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {requestText.length} / 3000
              </span>
            </div>
            <Textarea
              id="prayer-text"
              placeholder="Describe what you are believing God for in this season. Be as specific as you wish—the Lord hears every detail..."
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              rows={5}
              required
              maxLength={3000}
              className="rounded-xl border-slate-200 focus:border-[#ff6b35] focus:ring-[#ff6b35]"
            />
          </div>

          {/* Confidentiality Toggle */}
          <div className="p-4 rounded-2xl bg-[#fbf8f3] border border-slate-200 flex items-start gap-3">
            <input
              id="confidentiality-toggle"
              type="checkbox"
              checked={isConfidential}
              onChange={(e) => setIsConfidential(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-[#ff6b35] focus:ring-[#ff6b35] accent-[#ff6b35] cursor-pointer"
            />
            <label
              htmlFor="confidentiality-toggle"
              className="text-xs sm:text-sm text-slate-700 cursor-pointer select-none leading-relaxed"
            >
              <span className="font-bold flex items-center gap-1.5 text-slate-900">
                <ShieldCheck className="h-4 w-4 text-[#ff6b35]" />
                Pastoral Confidentiality Guarantee
              </span>
              Keep this petition confidential strictly for the Intercessory Pastoral Team
              only. (Unticked requests may be rejoiced over as anonymous praise testimonies).
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold py-6 text-base rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Laying Upon the Altar...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Prayer Request
              </>
            )}
          </Button>

          <p className="text-center text-[11px] text-slate-500">
            &ldquo;Call unto me, and I will answer thee, and shew thee great and mighty things.&rdquo; — Jeremiah 33:3
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
