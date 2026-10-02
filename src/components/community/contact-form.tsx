"use client";

import React, { useState } from "react";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  INQUIRY_TYPES,
  InquiryType,
  contactInquirySchema,
} from "@/lib/validations/community";
import { submitContactInquiry } from "@/actions/contact";

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedInquiryType, setSelectedInquiryType] = useState<InquiryType>(
    INQUIRY_TYPES[0]
  );
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const payload = {
      fullName,
      email,
      phone,
      inquiryType: selectedInquiryType,
      message,
    };

    const validationResult = contactInquirySchema.safeParse(payload);
    if (!validationResult.success) {
      const issue = validationResult.error.issues[0]?.message;
      setErrorMessage(issue || "Please review your input fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitContactInquiry(payload);

      if (response.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(
          response.error ||
            response.message ||
            "Unable to submit message. Please try again."
        );
      }
    } catch {
      setErrorMessage(
        "A network error occurred. Please try again or contact our sanctuary office directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setSelectedInquiryType(INQUIRY_TYPES[0]);
    setMessage("");
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
              We Value You
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Message Received With Warmth
            </h3>
            <p className="text-sm sm:text-base text-white/80 max-w-lg mx-auto leading-relaxed">
              Thank you for reaching out to Heavens Gates Sugutta Fellowship Church. Our
              pastoral team or sanctuary administration will follow up with you promptly.
            </p>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleReset}
              className="bg-accent hover:brightness-105 text-accent-foreground font-bold px-8 shadow-md"
            >
              Send Another Inquiry
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
            <MessageSquare className="h-6 w-6 text-accent fill-accent/20" />
            Send Us a Message
          </CardTitle>
          <span className="text-xs font-semibold text-accent bg-primary px-2.5 py-1 rounded-full uppercase tracking-wider">
            Inquiry Desk
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Have a question about services, planning your first visit, or seeking pastoral
          counsel? Fill out the form below.
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
          {/* Inquiry Type Chips */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              1. What is the nature of your inquiry? <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INQUIRY_TYPES.map((type) => {
                const isSelected = selectedInquiryType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedInquiryType(type)}
                    className={cn(
                      "text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all flex items-center justify-between",
                      isSelected
                        ? "border-accent bg-accent/15 text-primary font-bold shadow-sm ring-1 ring-accent"
                        : "border-border hover:border-accent/50 bg-background text-foreground hover:bg-muted/30"
                    )}
                  >
                    <span>{type}</span>
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
                htmlFor="contact-fullname"
                className="text-xs font-semibold text-foreground"
              >
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="contact-fullname"
                placeholder="e.g. John Kamau"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                maxLength={100}
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs font-semibold text-foreground"
              >
                Email Address <span className="text-destructive">*</span>
              </label>
              <Input
                id="contact-email"
                type="email"
                placeholder="e.g. john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-phone"
              className="text-xs font-semibold text-foreground"
            >
              Phone Number <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="+254 700 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Message TextArea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="contact-message"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                2. Your Message / Question <span className="text-destructive">*</span>
              </label>
              <span className="text-[11px] text-muted-foreground">
                {message.length} / 3000
              </span>
            </div>
            <Textarea
              id="contact-message"
              placeholder="Tell us how we can serve or assist you..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              maxLength={3000}
            />
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
                Sending Message...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Inquiry
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
