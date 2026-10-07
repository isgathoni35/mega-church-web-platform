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
  BookOpen,
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
    subtitle: "Three Hot Meals & Wholesome Care",
    icon: Utensils,
    description:
      "Ensuring that over 60 children wake up and go to sleep with full stomachs, wholesome nutrition, fresh milk, and clean water every single day of the year.",
    benefits: [
      "Three hot, balanced meals daily",
      "Fresh milk & clean drinking water",
      "Essential fruit & nutrition supplements",
      "Dedicated Christian kitchen staff",
    ],
  },
  {
    id: "education",
    title: "Education & Schooling",
    subtitle: "Tuition, Books, Uniforms & Tutoring",
    icon: GraduationCap,
    description:
      "Breaking the cycle of poverty by sponsoring every boy and girl through primary school, high school, and vocational colleges with all required materials.",
    benefits: [
      "100% school attendance & tuition fees",
      "Complete school uniforms & shoes",
      "Textbooks, exercise books & stationery",
      "Evening tutoring & computer skills",
    ],
  },
  {
    id: "shelter-health",
    title: "Shelter, Health & Family Love",
    subtitle: "Safe Dormitories & Motherly Care",
    icon: Home,
    description:
      "A peaceful home environment with clean dormitories, warm bedding, immediate clinical medical attention, and devoted house mothers offering maternal warmth.",
    benefits: [
      "Secure, sanitized dormitories",
      "Routine pediatric & clinic checkups",
      "Warm clothes, bedding & hygiene kits",
      "24/7 loving house mothers & counseling",
    ],
  },
];

export function SupportNeeds() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white text-slate-900 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Ministry of Compassion</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Ways You Can Stand With Our Children
          </h2>
          <div className="w-14 sm:w-20 h-1 bg-[#ff6b35] mx-auto rounded-full mt-2 sm:mt-3" />

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed pt-1">
            Every child sheltered at Heavens Gates was rescued from extreme
            vulnerability, abandonment, or loss of parents. Give from the
            heart—any gift of any amount directly feeds, educates, and protects
            these precious lives.
          </p>
        </div>

        {/* 3 Impact Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {IMPACT_AREAS.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-orange-200/80 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-[#ff6b35] flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 leading-snug">
                        {area.title}
                      </h3>
                      <p className="text-xs text-[#ff6b35] font-bold uppercase tracking-wider">
                        {area.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Direct Highlights */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      What Your Gift Makes Possible:
                    </span>
                    <ul className="space-y-2">
                      {area.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700"
                        >
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

        {/* Convincing Donation Action Card */}
        <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#fffaf5] to-[#fbf8f3] border border-orange-200/90 text-center max-w-3xl mx-auto space-y-4 sm:space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="font-script text-[#ff6b35] text-2xl sm:text-3xl block">
              Pure Religion Before God
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ready to Bless a Child Today?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              We welcome one-time and recurring gifts of any amount. 100% of your
              contributions go directly to the children&apos;s food, school fees,
              and healthcare.
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

          {/* Trust strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Direct Allocation
            </span>
            <span>•</span>
            <span>Local Kenyan M-Pesa &amp; Sendwave Supported</span>
            <span>•</span>
            <span>Tax-Deductible Charitable Trust</span>
          </div>
        </div>
      </div>
    </section>
  );
}
