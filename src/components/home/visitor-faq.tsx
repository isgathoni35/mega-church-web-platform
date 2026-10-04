"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Send, CheckCircle2, HelpCircle, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    q: "What should I wear when attending Sugutta Fellowship Church?",
    a: "There is no formal dress code at Sugutta Fellowship Church. Some members come in traditional African attire or their Sunday best, while others wear casual shirts and jeans. Come wearing whatever feels comfortable and modest to you—we care about you, not your clothes.",
  },
  {
    q: "Can I come if I am exploring faith or have doubts?",
    a: "Absolutely. We are a warm, welcoming spiritual sanctuary for seekers, skeptics, and lifelong believers alike. You are welcome to observe the service, ask questions, or simply experience the love of Christ at your own pace without pressure.",
  },
  {
    q: "Is there a safe place for my children during service?",
    a: "Yes! Every Sunday from 8:30 AM – 9:30 AM, we have dedicated Sunday School and Foundations classes tailored for toddlers, children, and youth. Our vetted teachers provide safe, engaging, and interactive biblical lessons so parents can worship with peace of mind.",
  },
  {
    q: "Where is the sanctuary located and is parking available?",
    a: "Sugutta Sanctuary is located in Sugutta, Kenya. Secure, free parking is available within our church grounds. Our hospitality and ushering team will welcome you right at the gate, assist you with parking, and escort you to comfortable seating.",
  },
  {
    q: "How can I become part of the church family or get baptized?",
    a: "You can meet Pastor Caesar and the elders immediately following the Sunday main service during our Fellowship Time (11:30 AM – 11:45 AM). You can also submit our online Connect form to sign up for discipleship classes or our upcoming water baptism services.",
  },
];

export function VisitorFaq() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section id="visitor-faq" className="py-12 sm:py-16 lg:py-24 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ========================================================================= */}
        {/* FAQS: GOOD TO KNOW                                                        */}
        {/* ========================================================================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="kicker">GOOD TO KNOW</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
              Questions before you visit?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We want your first visit to Sugutta Fellowship Church to be as seamless and uplifting as possible. Here are helpful answers to common visitor questions:
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#fffaf5] border-orange-200 shadow-sm"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left font-bold text-slate-900 text-sm sm:text-base cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className={`h-4 w-4 shrink-0 transition-colors ${isOpen ? "text-[#ff6b35]" : "text-slate-400"}`} />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180 text-[#ff6b35]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed pl-12 border-t border-orange-100/60 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-8">
            <p className="text-xs sm:text-sm text-slate-600">
              Have another question?{" "}
              <Link href="/contact" className="font-bold text-[#ff6b35] hover:underline">
                Send our welcoming team a quick message &rarr;
              </Link>
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GLORY GATE BENCHMARK: NEWSLETTER / ENCOURAGEMENT BAR                      */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#061d43] via-[#082554] to-[#04122b] text-white shadow-xl relative overflow-hidden border border-amber-500/20">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="kicker-dark">STAY CONNECTED</span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Stay encouraged throughout the week.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Receive weekly scripture devotionals, sermon highlights from Pastor Caesar, and Sugutta community news delivered with love straight to your inbox.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-3 text-emerald-300 text-sm font-semibold animate-in fade-in">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>Thank you for subscribing! May the Lord bless and keep you this week.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-lg">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  className="rounded-xl bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold px-6 py-3 h-auto text-xs sm:text-sm shadow-md shadow-orange-500/30 flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            )}

            <p className="text-[11px] text-slate-400">
              We respect your privacy. No spam, unsubscribing is always one click away.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
