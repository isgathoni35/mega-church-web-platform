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
    <section className="py-20 lg:py-28 bg-secondary/50 text-foreground border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-script text-accent text-3xl sm:text-4xl block">
            Make an Eternal Difference
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            Partner With Us: How You Can Help
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Choose a sponsorship level that touches your heart. 100% of your contributions go
            directly to the care, feeding, and education of our children.
          </p>
        </div>

        {/* 3-Column Pricing-Style Sponsorship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SPONSORSHIP_TIERS.map((tier) => {
            const isPopular = tier.isPopular;

            return (
              <Card
                key={tier.id}
                className={`relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  isPopular
                    ? "border-2 border-accent shadow-xl bg-card scale-100 lg:-translate-y-2"
                    : "border border-border shadow-md bg-card"
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="bg-gradient-to-r from-accent via-accent/90 to-amber-500 text-accent-foreground text-xs font-black uppercase tracking-widest text-center py-1.5 px-4 shadow-sm">
                    Most Popular Choice
                  </div>
                )}

                <div className="p-6 sm:p-8 space-y-6 flex-1">
                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <CardTitle className="text-xl sm:text-2xl font-black text-primary">
                      {tier.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="space-y-1 pb-4 border-b border-border">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-primary">
                        {tier.kesAmount}
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold">
                        ({tier.usdAmount}) {tier.period}
                      </span>
                    </div>
                    <span className="text-[11px] text-accent font-semibold block">
                      One-time gifts of any amount are also warmly welcomed
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      What Your Gift Covers:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground">
                          <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Sponsor Button */}
                <CardFooter className="p-6 sm:p-8 pt-0">
                  <Button
                    className={`w-full font-bold py-6 text-sm sm:text-base shadow-md transition-all ${
                      isPopular
                        ? "bg-accent hover:brightness-105 text-accent-foreground shadow-lg"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                    asChild
                  >
                    <Link href="/give?fund=orphanage">
                      <Heart className="mr-2 h-4 w-4 fill-current" />
                      Sponsor Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* In-Kind Donations Note */}
        <div className="p-6 rounded-2xl bg-card border border-border text-center max-w-2xl mx-auto space-y-2 shadow-sm">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <Gift className="h-4 w-4 text-accent" />
            <span>In-Kind Material Donations</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            We also gratefully accept dry foods (rice, maize, beans), clothing, blankets,
            bedsheets, and learning stationery directly at our Sugutta Headquarters sanctuary office.
          </p>
        </div>
      </div>
    </section>
  );
}
