"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedInquiryType, setSelectedInquiryType] = useState<InquiryType>(
    INQUIRY_TYPES[0]
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const subject = searchParams.get("subject");
    if (subject === "orphanage_visit") {
      setSelectedInquiryType("Children's Home & Orphanage Visit");
    }
  }, [searchParams]);

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
      <Card className="rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden bg-white text-slate-900">
        <div className="bg-[#ff6b35] h-1.5 w-full" />
        <CardContent className="p-8 sm:p-12 text-center space-y-6">
          <div className="h-16 w-16 mx-auto rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-[#ff6b35] shadow-lg animate-bounce">
            <CheckCircle2 className="h-8 w-8 text-[#ff6b35]" />
          </div>

          <div className="space-y-3">
            <span className="font-script text-2xl sm:text-3xl text-[#ff6b35] block font-normal">
              We Value You
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Message Received With Warmth
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              Thank you for reaching out to Heavens Gates Sugutta Fellowship Church. Our
              pastoral team or sanctuary administration will follow up with you promptly.
            </p>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleReset}
              className="bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-orange-500/20"
            >
              Send Another Inquiry
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
            <MessageSquare className="h-6 w-6 text-[#ff6b35] fill-orange-100" />
            Send Us a Message
          </CardTitle>
          <span className="text-xs font-semibold text-[#ff6b35] bg-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Inquiry Desk
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Have a question about services, planning your first visit, or seeking pastoral
          counsel? Fill out the form below.
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
          {/* Inquiry Type Chips */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              1. What is the nature of your inquiry? <span className="text-red-500">*</span>
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
                      "text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between",
                      isSelected
                        ? "border-[#ff6b35] bg-orange-50 text-[#ff6b35] font-bold shadow-sm ring-1 ring-[#ff6b35]"
                        : "border-slate-200 hover:border-orange-300 bg-white text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <span>{type}</span>
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
                htmlFor="contact-fullname"
                className="text-xs font-semibold text-slate-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="contact-fullname"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                maxLength={100}
                className="h-11 rounded-xl border-slate-200 focus:border-[#ff6b35] focus:ring-[#ff6b35]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs font-semibold text-slate-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="contact-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl border-slate-200 focus:border-[#ff6b35] focus:ring-[#ff6b35]"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-phone"
              className="text-xs font-semibold text-slate-700"
            >
              Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="+254 700 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 rounded-xl border-slate-200 focus:border-[#ff6b35] focus:ring-[#ff6b35]"
            />
          </div>

          {/* Message TextArea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="contact-message"
                className="text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                2. Your Message / Question <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
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
              className="rounded-xl border-slate-200 focus:border-[#ff6b35] focus:ring-[#ff6b35]"
            />
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
