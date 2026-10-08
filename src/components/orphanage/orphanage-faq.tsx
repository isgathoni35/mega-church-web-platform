"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ShieldCheck, HeartHandshake } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const ORPHANAGE_FAQS: FaqItem[] = [
  {
    question: "How are financial donations allocated and accounted for?",
    answer:
      "100% of donations given towards the Children's Home go directly to the primary welfare of the children: purchasing fresh food and dry staples, paying school tuition and examination fees, buying uniforms and textbooks, and providing routine pediatric healthcare and clean water.",
  },
  {
    question: "Can I or my fellowship group visit the children in person?",
    answer:
      "Yes! We warmly welcome visitors, sponsors, and fellowship groups to visit the children on Saturdays and Sundays. To protect the children's study schedules and privacy, all visits must be scheduled in advance with our pastoral hospitality team.",
  },
  {
    question: "Can we sponsor or prepare a special hot meal for the children?",
    answer:
      "Absolutely. Many partners choose to sponsor a celebration meal for birthdays, holidays, or thanksgiving. You can arrange with our kitchen staff to deliver ingredients or contribute towards a special feast for all 60+ children.",
  },
  {
    question: "How can friends and partners outside Kenya send support?",
    answer:
      "International supporters in the USA, UK, Europe, and worldwide can donate instantly via Sendwave (selecting KCB Bank Account deposit), direct International Bank Wire via KCB SWIFT code (KCBLKENX), or Western Union. All channels are detailed on our donation page.",
  },
  {
    question: "How does the home support children once they finish high school?",
    answer:
      "Our commitment does not end at age 18. We transition graduates into vocational colleges, technical institutes, and universities, walking alongside them until they become self-sustaining, empowered Christian adults.",
  },
];

export function OrphanageFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-12 sm:py-18 lg:py-24 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-xs font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparency &amp; Governance</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions by Donors &amp; Partners
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Clear, honest answers to help you give with confidence and complete peace of mind.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {ORPHANAGE_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-slate-50/60 transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#ff6b35] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-[#ff6b35] flex items-center justify-center text-xs shrink-0 font-bold">
                      {idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#ff6b35]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
