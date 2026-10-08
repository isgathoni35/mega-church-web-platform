import React from "react";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Gift,
  Utensils,
  GraduationCap,
  Home,
  Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImpactArea {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  benefits: string[];
}

const IMPACT_AREAS: ImpactArea[] = [
  {
    id: "nutrition",
    title: "Daily Food & Nutrition",
    subtitle: "Three Hot Meals & Fresh Milk",
    icon: Utensils,
    description:
      "Ensuring that every boy and girl wakes up and sleeps with a full stomach, wholesome nutrition, clean water, and fresh milk every single day.",
    benefits: [
      "Three hot, balanced meals daily",
      "Fresh milk & clean drinking water",
      "Essential fruit & nutrition supplements",
      "Dedicated resident kitchen mothers",
    ],
  },
  {
    id: "education",
    title: "Formal Schooling & Tuition",
    subtitle: "Books, Uniforms, Fees & Tutoring",
    icon: GraduationCap,
    description:
      "Breaking the cycle of poverty by sponsoring children through nursery, primary, secondary school, and tertiary vocational colleges.",
    benefits: [
      "100% formal school attendance & tuition",
      "Full school uniforms & durable shoes",
      "Textbooks, exercise books & revision sets",
      "Evening study tutoring & computer literacy",
    ],
  },
  {
    id: "health-hygiene",
    title: "Healthcare & Motherly Warmth",
    subtitle: "Sanitation, Bedding & Clinic Care",
    icon: Home,
    description:
      "A peaceful, loving home with clean beds, warm blankets, routine pediatric clinic screenings, and devoted house mothers providing emotional security.",
    benefits: [
      "Warm fleece blankets & single bed sheets",
      "Routine clinic checkups & emergency care",
      "Bathing soaps, laundry powder & hygiene kits",
      "24/7 loving house mothers & counseling",
    ],
  },
  {
    id: "campus-water",
    title: "Clean Water & Home Utilities",
    subtitle: "Sanitation, Power & Safe Shelter",
    icon: Droplets,
    description:
      "Maintaining our clean borehole water system, solar lighting, sanitized bathrooms, and secure compound so the children live safely in dignity.",
    benefits: [
      "Purified clean borehole water pumping",
      "Compound lighting & study power",
      "Clean sanitized bathrooms & laundry area",
      "Gated, secure Christian living environment",
    ],
  },
];

export function SupportNeeds() {
  return (
    <section className="py-12 sm:py-18 lg:py-24 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Ministry of Compassion</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How Your Financial Support Blesses Our Children
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Every shilling and dollar given to Sugutta Children&apos;s Home goes straight to essential living needs. Here is exactly what your compassion achieves.
          </p>
        </div>

        {/* 4 Impact Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {IMPACT_AREAS.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-orange-200 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 text-[#ff6b35] flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                        {area.title}
                      </h3>
                      <p className="text-[11px] text-[#ff6b35] font-bold uppercase tracking-wider">
                        {area.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {area.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Direct Impact Provided:
                    </span>
                    <ul className="space-y-1.5">
                      {area.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout Card */}
        <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#fffaf5] to-[#fbf8f3] border border-orange-200/90 text-center max-w-3xl mx-auto space-y-4 sm:space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="font-serif italic text-[#ff6b35] text-xl sm:text-2xl block">
              Pure Religion Before God (James 1:27)
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ready to Bless a Child Today?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              We welcome one-time and recurring gifts of any amount. 100% of your contribution goes directly to the children&apos;s food, school tuition, and daily wellbeing.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold shadow-lg shadow-orange-500/20 px-8 py-3.5 sm:py-6 text-sm sm:text-base rounded-full h-auto transition-all"
              asChild
            >
              <Link href="/orphanage/donate">
                <Heart className="mr-2 h-4 w-4 fill-current" />
                <span>Donate to Children&apos;s Home</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold px-7 py-3.5 sm:py-6 text-sm sm:text-base rounded-full h-auto shadow-sm"
              asChild
            >
              <Link href="/contact?subject=orphanage_visit">
                <span>Deliver Food &amp; Supplies</span>
              </Link>
            </Button>
          </div>

          {/* Trust Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Direct Allocation
            </span>
            <span>&bull;</span>
            <span>M-Pesa Till 8146952 &amp; Paybill 174379</span>
            <span>&bull;</span>
            <span>International Sendwave &amp; KCB Wire</span>
          </div>
        </div>
      </div>
    </section>
  );
}
