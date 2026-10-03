import React from "react";
import Link from "next/link";
import { Heart, Sparkles, Check, ArrowRight, ShieldCheck, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface SponsorshipTier {
  id: string;
  title: string;
  tagline: string;
  kesAmount: string;
  usdAmount: string;
  period: string;
  isPopular?: boolean;
  features: string[];
}

const SPONSORSHIP_TIERS: SponsorshipTier[] = [
  {
    id: "feed",
    title: "Feed a Child",
    tagline: "Daily Wholesome Nutrition & Clean Water",
    kesAmount: "KES 3,000",
    usdAmount: "$25",
    period: "/ month",
    features: [
      "Three hot, balanced meals daily",
      "Clean drinking water & fresh milk",
      "Essential fruit & nutritional snacks",
      "Monthly impact report & prayer updates",
    ],
  },
  {
    id: "education",
    title: "Education Pack",
    tagline: "Academic Empowerment & Uniforms",
    kesAmount: "KES 5,000",
    usdAmount: "$40",
    period: "/ month",
    isPopular: true,
    features: [
      "Full term school tuition & fees",
      "Textbooks, notebooks & stationery",
      "Complete school uniform & footwear",
      "After-school tutoring & computer literacy",
    ],
  },
  {
    id: "full",
    title: "Full Child Sponsorship",
    tagline: "Holistic 360° Living & Upbringing",
    kesAmount: "KES 10,000",
    usdAmount: "$80",
    period: "/ month",
    features: [
      "All nutritional meals & dormitory shelter",
      "Complete educational & school supplies",
      "Full medical care & clothing provisions",
      "Direct child letters & birthday mentorship",
    ],
  },
];

export function SupportNeeds() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white text-slate-900 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-3">
          <span className="font-script text-[#ff6b35] text-2xl sm:text-4xl block font-normal">
            Make an Eternal Difference
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Partner With Us: How You Can Help
          </h2>
          <div className="w-14 sm:w-20 h-1 bg-[#ff6b35] mx-auto rounded-full mt-2 sm:mt-3" />
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed pt-1 sm:pt-2">
            Choose a sponsorship level that touches your heart. 100% of your contributions go
            directly to the care, feeding, and education of our children.
          </p>
        </div>

        {/* 3-Column Pricing-Style Sponsorship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {SPONSORSHIP_TIERS.map((tier) => {
            const isPopular = tier.isPopular;

            return (
              <Card
                key={tier.id}
                className={`relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300 hover:shadow-2xl ${
                  isPopular
                    ? "border-2 border-[#ff6b35] shadow-xl bg-white scale-100 lg:-translate-y-2 ring-1 ring-[#ff6b35]/20"
                    : "border border-slate-200/80 shadow-md bg-white"
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="bg-[#ff6b35] text-white text-[11px] sm:text-xs font-black uppercase tracking-widest text-center py-1.5 sm:py-2 px-4 shadow-sm">
                    Most Popular Choice
                  </div>
                )}

                <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 flex-1">
                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <CardTitle className="text-lg sm:text-2xl font-black text-slate-900">
                      {tier.title}
                    </CardTitle>
                    <p className="text-xs text-slate-500">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="space-y-1 pb-3 sm:pb-4 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                        {tier.kesAmount}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        ({tier.usdAmount}) {tier.period}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-[#ff6b35] font-semibold block">
                      One-time gifts of any amount are also warmly welcomed
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 sm:space-y-3">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      What Your Gift Covers:
                    </span>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Sponsor Button */}
                <CardFooter className="p-4 sm:p-8 pt-0">
                  <Button
                    className={`w-full font-bold py-2.5 sm:py-6 text-xs sm:text-base rounded-xl transition-all h-auto ${
                      isPopular
                        ? "bg-[#ff6b35] hover:bg-[#e05626] text-white shadow-lg shadow-orange-500/25"
                        : "bg-slate-900 hover:bg-slate-800 text-white shadow-md"
                    }`}
                    asChild
                  >
                    <Link href="/give?fund=orphanage">
                      <Heart className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                      Sponsor Now
                      <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* In-Kind Donations Note */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#fbf8f3] border border-orange-200/60 text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 shadow-sm">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
            <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#ff6b35]" />
            <span>In-Kind Material Donations</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We also gratefully accept dry foods (rice, maize, beans), clothing, blankets,
            bedsheets, and learning stationery directly at our Sugutta Headquarters sanctuary office.
          </p>
        </div>
      </div>
    </section>
  );
}
