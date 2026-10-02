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
      <Card className="border-accent/40 shadow-xl overflow-hidden bg-primary text-primary-foreground">
        <div className="bg-gradient-to-r from-accent/20 via-accent/30 to-accent/10 p-1" />
        <CardContent className="p-8 sm:p-12 text-center space-y-6">
          <div className="h-16 w-16 mx-auto rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-accent shadow-lg animate-bounce">
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </div>

          <div className="space-y-3">
            <span className="font-script text-2xl sm:text-3xl text-accent block">
              The Prayer of Faith
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Your Petition Has Been Placed on the Altar
            </h3>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              Our Senior Apostolic Team and dedicated intercessors will hold your request
              in prayer during our daily morning altar devotions.
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-5 border border-white/10 max-w-lg mx-auto text-left space-y-2">
            <p className="text-xs uppercase tracking-wider font-semibold text-accent flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Scripture Promise • James 5:16
            </p>
            <p className="text-sm italic text-white/90 leading-relaxed font-serif">
              &ldquo;The prayer of a righteous person is powerful and effective. Confess
              your needs to God with thanksgiving, and His peace will guard your heart.&rdquo;
            </p>
          </div>

          {isConfidential && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 border border-accent/30 text-xs text-accent">
              <Lock className="h-3.5 w-3.5 text-accent" />
              <span>Marked for Pastoral Intercessory Team Eyes Only</span>
            </div>
          )}

          <div className="pt-4">
            <Button
              onClick={handleReset}
              className="bg-accent hover:brightness-105 text-accent-foreground font-bold px-8 shadow-md"
            >
              Submit Another Petition
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-t-4 border-t-accent shadow-lg bg-card text-card-foreground">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
            <Heart className="h-6 w-6 text-accent fill-accent/20" />
            Bring Your Need to God
          </CardTitle>
          <span className="text-xs font-semibold text-accent bg-primary px-2.5 py-1 rounded-full uppercase tracking-wider">
            Altar of Prayer
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          No situation is beyond the restorative power of God. Share your burden with our
          prayer warriors.
        </p>
      </CardHeader>

      <CardContent>
        {errorMessage && (
          <div className="mb-6 p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              1. Select Prayer Focus / Category <span className="text-destructive">*</span>
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
                      "text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all flex items-center justify-between",
                      isSelected
                        ? "border-accent bg-accent/15 text-primary font-bold shadow-sm ring-1 ring-accent"
                        : "border-border hover:border-accent/50 bg-background text-foreground hover:bg-muted/30"
                    )}
                  >
                    <span>{cat}</span>
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-accent ml-2 shrink-0" />
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
                className="text-xs font-semibold text-foreground"
              >
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="prayer-fullname"
                placeholder="e.g. Sister Grace Wanjiku"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                maxLength={100}
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="prayer-email"
                className="text-xs font-semibold text-foreground"
              >
                Email Address <span className="text-destructive">*</span>
              </label>
              <Input
                id="prayer-email"
                type="email"
                placeholder="e.g. grace@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Optional Phone */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="prayer-phone"
                className="text-xs font-semibold text-foreground"
              >
                Phone Number <span className="text-muted-foreground font-normal">(Optional)</span>
              </label>
              <span className="text-[11px] text-muted-foreground">
                For pastoral call back if requested
              </span>
            </div>
            <Input
              id="prayer-phone"
              type="tel"
              placeholder="+254 700 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Prayer Request TextArea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="prayer-text"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                2. Your Prayer Petition <span className="text-destructive">*</span>
              </label>
              <span className="text-[11px] text-muted-foreground">
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
            />
          </div>

          {/* Confidentiality Toggle */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border flex items-start gap-3">
            <input
              id="confidentiality-toggle"
              type="checkbox"
              checked={isConfidential}
              onChange={(e) => setIsConfidential(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
            />
            <label
              htmlFor="confidentiality-toggle"
              className="text-xs sm:text-sm text-foreground cursor-pointer select-none leading-relaxed"
            >
              <span className="font-bold flex items-center gap-1.5 text-primary">
                <ShieldCheck className="h-4 w-4 text-accent" />
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
            className="w-full bg-accent hover:brightness-105 text-accent-foreground font-bold py-6 text-base shadow-md transition-all flex items-center justify-center gap-2"
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

          <p className="text-center text-[11px] text-muted-foreground">
            &ldquo;Call unto me, and I will answer thee, and shew thee great and mighty things.&rdquo; — Jeremiah 33:3
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
