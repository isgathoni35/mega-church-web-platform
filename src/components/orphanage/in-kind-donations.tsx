import React from "react";
import Link from "next/link";
import { Package, Utensils, Sparkles, BookOpen, Shirt, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DonationCategory {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  items: string[];
}

const IN_KIND_CATEGORIES: DonationCategory[] = [
  {
    title: "Dry Food Stuffs",
    subtitle: "Pantry Staples & Kitchen Supplies",
    icon: Utensils,
    items: [
      "Maize flour (Unga wa Sembe / Ugali)",
      "Long grain rice & dry beans (Nyayo / Rosecoco)",
      "Green grams (Ndengu) & green peas",
      "Cooking vegetable oil & baking flour",
      "Sugar, salt & drinking tea leaves",
    ],
  },
  {
    title: "Hygiene & Personal Care",
    subtitle: "Cleanliness & Child Wellbeing",
    icon: Sparkles,
    items: [
      "Washing powder & laundry bar soaps",
      "Bathing soaps & antiseptic liquid",
      "Toothpaste & children's toothbrushes",
      "Sanitary towels for teenage girls",
      "Petroleum jelly & skin lotions",
    ],
  },
  {
    title: "School & Stationery",
    subtitle: "Empowering Academic Learning",
    icon: BookOpen,
    items: [
      "Exercise books (A4 / A5 ruled & squared)",
      "Blue & black ballpoint pens, pencils & erasers",
      "Mathematical sets & rulers",
      "Children's storybooks & revision materials",
      "School backpacks & water bottles",
    ],
  },
  {
    title: "Bedding & Clothing",
    subtitle: "Warmth, Dignity & Comfort",
    icon: Shirt,
    items: [
      "Warm fleece blankets & bed sheets (Single)",
      "Waterproof mattress covers (3x6 size)",
      "Clean children's clothing (Ages 3 – 17)",
      "School socks & casual rubber shoes",
      "Warm winter sweaters & jackets",
    ],
  },
];

export function InKindDonations() {
  return (
    <section className="py-12 sm:py-18 lg:py-24 bg-[#fbf8f3] text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Package className="w-3.5 h-3.5" />
            <span>Direct Material Contributions</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Physical Supplies &amp; Food Donations Guide
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
            In addition to monetary gifts, our children&apos;s home warmly accepts physical food sacks, hygiene kits, school supplies, and clean clothing delivered in person to our sanctuary compound.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {IN_KIND_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 text-[#ff6b35] flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] font-bold text-[#ff6b35] uppercase tracking-wider">
                      {cat.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drop-off & Notification Banner */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
              Planning to Deliver Physical Supplies?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Please notify our pastoral hospitality coordinator in advance so our staff can prepare to receive your delivery and issue a physical receipt.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Button
              className="bg-[#0f172a] hover:bg-[#ff6b35] text-white font-bold rounded-full px-6 py-2.5 text-xs sm:text-sm transition-all"
              asChild
            >
              <Link href="/contact?subject=orphanage_supplies">
                <span>Arrange Drop-off</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
