"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Zap, Globe, BookOpen, Heart } from "lucide-react";

interface Pillar {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
}

const pillars: Pillar[] = [
  {
    title: "Deliverance & Healing",
    subtitle: "Supernatural Freedom & Miracles",
    description:
      "Treading upon the works of darkness, breaking generational curses, casting out demonic afflictions, and witnessing total physical restoration through the authority of Jesus Christ.",
    icon: Zap,
  },
  {
    title: "Global Crusades",
    subtitle: "Reaping the End-Time Harvest",
    description:
      "Conducting massive outdoor evangelistic campaigns, stadium crusades, and open-air meetings that gather hundreds of thousands to repent and accept the saving power of the Cross.",
    icon: Globe,
  },
  {
    title: "Prophetic Word & Discipleship",
    subtitle: "Truth, Righteousness & Power",
    description:
      "Expositional teaching of the Holy Scriptures to equip the saints, ground believers in apostolic doctrine, and build resilient Christian families anchored in holiness.",
    icon: BookOpen,
  },
  {
    title: "Compassion & Outreach",
    subtitle: "Love in Demonstration",
    description:
      "Feeding the hungry, sheltering orphans, providing medical support, and clothing widows across underserved communities as an active demonstration of Christ&apos;s compassion.",
    icon: Heart,
  },
];

export function MinistryPillars() {
  return (
    <section className="py-20 sm:py-28 bg-secondary/30 text-foreground border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-script text-accent text-3xl sm:text-4xl block font-normal">
            Divine Calling &amp; Purpose
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-primary tracking-tight">
            Our Divine Mandate
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Four foundational pillars upholding our mission across nations to
            manifest heaven on earth.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.title}
                variant="lightAccent"
                className="group hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl bg-card border-border flex flex-col justify-between"
              >
                <CardHeader className="space-y-4">
                  {/* Icon Emblem */}
                  <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-accent flex items-center justify-center transition-all duration-300 shadow-sm">
                    <Icon className="h-7 w-7 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-primary group-hover:text-primary transition-colors">
                      {pillar.title}
                    </CardTitle>
                    <CardDescription className="text-accent text-xs font-semibold uppercase tracking-wider mt-1">
                      {pillar.subtitle}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
