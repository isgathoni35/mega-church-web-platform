import React from "react";
import { Home, BookOpen, HeartPulse, Church, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    highlights: ["Separated gender dormitories", "Dedicated resident house mothers", "Secure, gated compound"],
  },
  {
    title: "Quality Education",
    subtitle: "From Early Childhood to University",
    icon: BookOpen,
    description:
      "Full academic sponsorship covering school tuition, textbooks, uniforms, tutoring, and computer literacy from early childhood education through secondary school and tertiary colleges.",
    highlights: ["100% formal school attendance", "After-school study & tutoring", "Vocational & digital skills"],
  },
  {
    title: "Health & Nutrition",
    subtitle: "Wholesome Meals & Medical Care",
    icon: HeartPulse,
    description:
      "Three hot, balanced, nutritious meals served daily alongside fresh clean drinking water, regular pediatric screenings, immunizations, and immediate medical emergency coverage.",
    highlights: ["Three balanced meals daily", "Routine medical & dental checkups", "Clean sanitized living spaces"],
  },
  {
    title: "Spiritual Grounding",
    subtitle: "Discipleship in the Word of God",
    icon: Church,
    description:
      "Daily family altar devotions, scripture memorization, music and choir ministration, and compassionate pastoral mentorship helping every child understand their divine destiny in Christ.",
    highlights: ["Daily morning & evening devotions", "Active Kings Kids participation", "Loving pastoral counseling"],
  },
];

export function CarePillars() {
  return (
    <section className="py-20 lg:py-28 bg-[#fbf8f3] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-script text-[#ff6b35] text-3xl sm:text-4xl block font-normal">
            Holistic Ministry of Love
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our 4 Pillars of Comprehensive Care
          </h2>
          <div className="w-20 h-1 bg-[#ff6b35] mx-auto rounded-full mt-3" />
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
            We don&apos;t just provide shelter—we raise future leaders, doctors, pastors, and
            teachers through holistic physical, academic, and spiritual nourishment.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CARE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.title}
                className="flex flex-col justify-between rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6 space-y-4 flex-1">
                  {/* Circular Orange Icon Holder */}
                  <div className="h-14 w-14 rounded-full bg-orange-500/10 text-[#ff6b35] flex items-center justify-center group-hover:bg-[#ff6b35] group-hover:text-white transition-colors shadow-sm">
                    <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold text-slate-900">
                      {pillar.title}
                    </CardTitle>
                    <p className="text-xs font-semibold text-[#ff6b35]">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-slate-600">
                    {pillar.description}
                  </p>

                  {/* Checklist Highlights */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {pillar.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#ff6b35] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
