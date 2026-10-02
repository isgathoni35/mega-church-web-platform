"use client";

import * as React from "react";
import Image from "next/image";

interface Pillar {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const pillars: Pillar[] = [
  {
    title: "Deliverance & Healing",
    subtitle: "Supernatural Freedom & Miracles",
    description:
      "Treading upon the works of darkness, breaking generational curses, casting out demonic afflictions, and witnessing total physical restoration through the authority of Jesus Christ.",
    imageSrc: "/images/ministry-healing.jpg",
    imageAlt: "Hands laid in prayer for healing inside a warm church setting",
  },
  {
    title: "Global Crusades",
    subtitle: "Reaping the End-Time Harvest",
    description:
      "Conducting massive outdoor evangelistic campaigns, stadium crusades, and open-air meetings that gather hundreds of thousands to repent and accept the saving power of the Cross.",
    imageSrc: "/images/ministry-healing.jpg",
    imageAlt: "Large outdoor African gospel crusade at sunset with thousands gathered",
  },
  {
    title: "Prophetic Word & Discipleship",
    subtitle: "Truth, Righteousness & Power",
    description:
      "Expositional teaching of the Holy Scriptures to equip the saints, ground believers in apostolic doctrine, and build resilient Christian families anchored in holiness.",
    imageSrc: "/images/ministry-healing.jpg",
    imageAlt: "Small group Bible study session with open Bibles in warm church interior",
  },
  {
    title: "Compassion & Outreach",
    subtitle: "Love in Demonstration",
    description:
      "Feeding the hungry, sheltering orphans, providing medical support, and clothing widows across underserved communities as an active demonstration of Christ\u2019s compassion.",
    imageSrc: "/images/ministry-healing.jpg",
    imageAlt: "Community outreach and feeding program with volunteers and families",
  },
];

export function MinistryPillars() {
  return (
    <section className="py-20 sm:py-28 bg-cream text-foreground">
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

        {/* Ornamental divider */}
        <div className="divider-ornament mb-14">
          <span className="cross-icon">✝</span>
        </div>

        {/* Alternating Editorial Layout */}
        <div className="space-y-16 sm:space-y-20">
          {pillars.map((pillar, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={pillar.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                  isReversed ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Image Column */}
                <div className={`${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-lg hover-warm-glow border border-border/50">
                    <Image
                      src={pillar.imageSrc}
                      alt={pillar.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Warm gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Text Column */}
                <div className={`space-y-4 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="w-10 h-[2px] bg-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-base text-foreground/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
