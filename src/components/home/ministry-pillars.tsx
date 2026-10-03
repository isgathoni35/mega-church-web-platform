"use client";

import * as React from "react";
import Image from "next/image";
import { Flame, Globe, BookOpen, HeartHandshake } from "lucide-react";

interface Pillar {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ElementType;
}

const pillars: Pillar[] = [
  {
    title: "Deliverance & Healing",
    subtitle: "Supernatural Freedom & Miracles",
    description:
      "Treading upon the works of darkness, breaking generational curses, casting out demonic afflictions, and witnessing total physical restoration through the authority of Jesus Christ.",
    imageSrc: "/images/ministry-healing.jpg",
    imageAlt: "Hands laid in prayer for healing inside a warm church setting",
    icon: Flame,
  },
  {
    title: "Global Crusades",
    subtitle: "Reaping the End-Time Harvest",
    description:
      "Conducting massive outdoor evangelistic campaigns, stadium crusades, and open-air meetings that gather hundreds of thousands to repent and accept the saving power of the Cross.",
    imageSrc: "/images/ministry-healing.jpg",
    imageAlt: "Large outdoor African gospel crusade at sunset with thousands gathered",
    icon: Globe,
  },
  {
    title: "Prophetic Word & Truth",
    subtitle: "Truth, Righteousness & Power",
    description:
      "Expositional teaching of the Holy Scriptures to equip the saints, ground believers in apostolic doctrine, and build resilient Christian families anchored in holiness.",
    imageSrc: "/images/ministry-healing.jpg",
    imageAlt: "Small group Bible study session with open Bibles in warm church interior",
    icon: BookOpen,
  },
  {
    title: "Compassion & Outreach",
    subtitle: "Love in Demonstration",
    description:
      "Feeding the hungry, sheltering orphans, providing medical support, and clothing widows across underserved communities as an active demonstration of Christ's compassion.",
    imageSrc: "/images/ministry-healing.jpg",
    imageAlt: "Community outreach and feeding program with volunteers and families",
    icon: HeartHandshake,
  },
];

export function MinistryPillars() {
  return (
    <section className="py-20 sm:py-24 bg-[#fbf8f3] text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Orange Section Header matching Neno */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#ff6b35] uppercase mb-2">
            Our Divine Mandate
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight mb-4">
            Our Ministry Pillars
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Four foundational spiritual pillars upholding our mission across nations to set captives free and manifest heaven on earth.
          </p>
        </div>

        {/* 4 Pure White Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] flex-shrink-0">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] block">
                        {pillar.subtitle}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-inner mt-2">
                  <Image
                    src={pillar.imageSrc}
                    alt={pillar.imageAlt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
