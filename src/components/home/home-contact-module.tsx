"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContactInquiry } from "@/actions/contact";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface HomeContactModuleProps {
  settings?: SiteSettingsData;
}

export function HomeContactModule({ settings: propSettings }: HomeContactModuleProps) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const rawPhone = settings.mpesaPhone || DEFAULT_SETTINGS.mpesaPhone;
  const email = settings.contactEmail || DEFAULT_SETTINGS.contactEmail;
  const location = settings.physicalLocation || DEFAULT_SETTINGS.physicalLocation;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    message: "",
  });

  const [customInquiry, setCustomInquiry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.inquiryType === "Other" && !customInquiry.trim()) {
      setResult({ success: false, message: "Please specify your custom inquiry category." });
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    const effectiveInquiryType =
      formData.inquiryType === "Other"
        ? (customInquiry.trim() ? `Other: ${customInquiry.trim()}` : "Other")
        : formData.inquiryType;

    try {
      const response = await submitContactInquiry({
        ...formData,
        inquiryType: effectiveInquiryType,
      });
      if (response.success) {
        setResult({ success: true, message: response.message || "Thank you for reaching out. We will get back to you promptly." });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          inquiryType: "General Inquiry",
          message: "",
        });
        setCustomInquiry("");
      } else {
        setResult({ success: false, message: response.message || response.error || "Unable to send your inquiry. Please try again." });
      }
    } catch {
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again or call our hotline.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white text-slate-900 border-t border-slate-200/80 overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Centered Orange Header matching Neno */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Connect &bull; Pastoral Altar</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight">
            Get In Touch
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our pastoral council and hospitality team are ready to pray with you, answer your inquiries, and warmly welcome you to our fellowship.
          </p>
        </div>

        {/* 2-Column Layout matching Neno */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Sanctuary Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#fbf8f3] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 space-y-6 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Sanctuary Headquarters
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#ff6b35] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-[#ff6b35]">Physical Location</span>
                    <span>{location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#ff6b35] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-[#ff6b35]">
                      Pastoral Hotline &amp; WhatsApp
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <a
                        href="https://wa.me/254112656123"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-slate-800 hover:text-emerald-600 transition-colors flex items-center gap-1.5"
                      >
                        <span>{rawPhone}</span>
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                          <MessageCircle className="w-3 h-3 text-[#25D366]" />
                          <span>WhatsApp</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#ff6b35] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-[#ff6b35]">Office Email</span>
                    <span>{email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#ff6b35] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-[#ff6b35]">Sunday Service Times</span>
                    <span>8:00 AM &ndash; 11:45 AM (5 Sessions)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-orange-100 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">Need Immediate Pastoral Prayer?</span>
                <p>Call or send a WhatsApp message to our direct line for private altar intercession.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md">
              {result?.success ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-extrabold text-lg text-emerald-950">Thank You! Message Received</h4>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">{result.message}</p>
                  <Button
                    onClick={() => setResult(null)}
                    variant="outline"
                    className="rounded-full text-xs font-bold border-emerald-300 text-emerald-900 hover:bg-emerald-100 mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {result && !result.success && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{result.message}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] transition-all bg-slate-50/50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] transition-all bg-slate-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0712 345 678"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] transition-all bg-slate-50/50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] transition-all bg-slate-50/50 focus:bg-white text-slate-800"
                      >
                        <option value="General Inquiry">General Church Inquiry</option>
                        <option value="Prayer Request">Altar Prayer Request</option>
                        <option value="First-Time Visit">First-Time Visit Planning</option>
                        <option value="Children's Home Support">Children&apos;s Home / Orphanage</option>
                        <option value="Prayer Mountain Retreat">Prayer Mountain Booking</option>
                        <option value="Other">Other (Specify Custom Topic)</option>
                      </select>
                    </div>
                  </div>

                  {/* Custom Inquiry Topic Write-In */}
                  {formData.inquiryType === "Other" && (
                    <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                      <label className="block text-xs font-bold text-[#ff6b35] uppercase tracking-wider mb-1.5">
                        Specify Custom Inquiry Topic *
                      </label>
                      <input
                        type="text"
                        required
                        value={customInquiry}
                        onChange={(e) => setCustomInquiry(e.target.value)}
                        placeholder="e.g. Wedding Officiating, Music Department, Dedicated Prayer..."
                        className="w-full px-4 py-2.5 rounded-xl border border-orange-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] transition-all bg-white text-slate-800"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message or Prayer Petition *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your message or prayer need..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-extrabold py-3.5 text-sm shadow-md shadow-orange-500/20 h-auto"
                  >
                    {isSubmitting ? (
                      <span>Sending Your Message...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
