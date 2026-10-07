import React from "react";
import { Home, BookOpen, HeartPulse, Church, CheckCircle2, Sparkles } from "lucide-react";

interface CarePillar {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  highlights: string[];
}

const CARE_PILLARS: CarePillar[] = [
  {
    title: "Nurturing Shelter",
    subtitle: "Safe Dormitories & Family Warmth",
    icon: Home,
    description:
      "Safe, clean dormitories and dedicated Christian house mothers providing 24/7 maternal care, emotional security, and a loving family atmosphere where children thrive.",
    highlights: [
      "Separated gender dormitories",
      "Dedicated resident house mothers",
      "Secure, gated compound",
    ],
  },
  {
    title: "Quality Education",
    subtitle: "From Early Childhood to College",
    icon: BookOpen,
    description:
      "Full academic sponsorship covering school tuition, textbooks, uniforms, tutoring, and computer literacy from early childhood education through secondary school and tertiary colleges.",
    highlights: [
      "100% formal school attendance",
      "After-school study & tutoring",
      "Vocational & digital skills",
    ],
  },
  {
    title: "Health & Nutrition",
    subtitle: "Wholesome Meals & Medical Care",
    icon: HeartPulse,
    description:
      "Three hot, balanced, nutritious meals served daily alongside fresh clean drinking water, regular pediatric screenings, immunizations, and immediate medical emergency coverage.",
    highlights: [
      "Three balanced meals daily",
      "Routine medical & dental checkups",
      "Clean sanitized living spaces",
    ],
  },
  {
    title: "Spiritual Grounding",
    subtitle: "Discipleship in the Word of God",
    icon: Church,
    description:
      "Daily family altar devotions, scripture memorization, music and choir ministration, and compassionate pastoral mentorship helping every child understand their divine destiny in Christ.",
    highlights: [
      "Daily morning & evening devotions",
      "Active Kings Kids participation",
      "Loving pastoral counseling",
    ],
  },
];

export function CarePillars() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-[#fbf8f3] text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Holistic Ministry of Love</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our 4 Pillars of Comprehensive Care
          </h2>
          <div className="w-14 sm:w-20 h-1 bg-[#ff6b35] mx-auto rounded-full mt-2 sm:mt-3" />

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed pt-1">
            We don&apos;t just provide shelter—we raise future leaders, doctors, pastors, and
            teachers through holistic physical, academic, and spiritual nourishment.
          </p>
        </div>

        {/* 4-Card Grid with Clean Elevated Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {CARE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-orange-200/80 hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden"
              >
                <div className="p-5 sm:p-7 space-y-3.5 sm:space-y-4 flex-1">
                  {/* Circular Orange Icon Holder */}
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-[#ff6b35] flex items-center justify-center group-hover:bg-[#ff6b35] group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#ff6b35] transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-bold text-[#ff6b35] uppercase tracking-wider">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                    {pillar.description}
                  </p>

                  {/* Checklist Highlights */}
                  <ul className="space-y-2 pt-3 border-t border-slate-100">
                    {pillar.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
