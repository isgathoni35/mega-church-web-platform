import React from "react";
import Image from "next/image";
import { Quote, Shield, Flame, BookOpen } from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface FounderStoryProps {
  settings?: SiteSettingsData;
}

export function FounderStory({ settings: propSettings }: FounderStoryProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center">
          {/* Left Column: Framed Portrait with Floating Quotation Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
              {/* Warm decorative back glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent rounded-[2.5rem] blur-2xl pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-slate-100 shadow-2xl bg-slate-50">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={settings.pastorImageUrl || "/images/pastor-caesar.jpg"}
                    alt={`${settings.pastorName} — ${settings.pastorTitle}`}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 90vw, 450px"
                    priority
                    unoptimized
                  />

                  {/* Gradient Nameplate */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent pt-8 sm:pt-16 pb-4 sm:pb-6 px-4 sm:px-6 text-center">
                    <div className="w-12 h-1 bg-[#ff6b35] mx-auto mb-2 rounded-full" />
                    <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                      {settings.pastorName}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-[#ff6b35] font-bold tracking-wider uppercase mt-0.5 sm:mt-1">
                      {settings.pastorTitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Divine Mandate Quote Card */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 bg-white text-slate-900 border-2 border-orange-100 rounded-2xl p-3.5 sm:p-5 shadow-2xl w-full sm:max-w-xs space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-1.5 text-[#ff6b35]">
                  <Quote className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                    Pastoral Vision
                  </span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-slate-900 font-bold leading-snug">
                  &ldquo;{settings.churchMotto || "REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD"}&rdquo;
                </p>
                <span className="text-[9px] sm:text-[10px] text-[#ff6b35] block font-semibold">
                  Spiritual Commission to {settings.pastorName}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Biographical Narrative */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-8 mt-4 sm:mt-6 lg:mt-0">
            <div className="space-y-1.5 sm:space-y-3">
              <span className="inline-block text-[11px] sm:text-sm font-bold tracking-widest text-[#ff6b35] uppercase">
                A Testimony of Faith &amp; Kingdom Mandate
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight leading-tight">
                Anointed to Break Yokes &amp; Release Covenant Overflow
              </h2>
            </div>

            {/* Narrative Sections */}
            <div className="space-y-3 sm:space-y-5 text-xs sm:text-base leading-relaxed">
              {/* Part 1: The Calling */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2.5 sm:gap-3 text-slate-900 font-extrabold text-sm sm:text-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] shrink-0">
                    <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span>The Calling: An Encounter in the Secret Place</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed sm:pl-13">
                  Before the overflowing sanctuary and community outreach operations, the ministry was
                  born in deep intercession, tears, fasting, and biblical devotion. Through seasons of solitary prayer, {settings.pastorName} sought God with intense hunger. It was
                  there that the Holy Spirit manifested with transforming fire, imparting an uncompromising burden for souls trapped in spiritual bondage.
                </p>
              </div>

              {/* Part 2: The Mandate */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2.5 sm:gap-3 text-slate-900 font-extrabold text-sm sm:text-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] shrink-0">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span>The Mandate: Discipleship &amp; Community Transformation</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed sm:pl-13">
                  The Lord imparted a divine four-fold commission: <em>&ldquo;{settings.churchSlogan || "Come. Connect. Grow. Go."}&rdquo;</em> Rooted in Hebrews 10:25 and the Great Commission, {settings.pastorName} launched ministry gatherings centered on sound scripture exposition, authentic worship, and fervent prayer that breaks generational strongholds.
                </p>
              </div>

              {/* Part 3: The Growth */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2.5 sm:gap-3 text-slate-900 font-extrabold text-sm sm:text-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] shrink-0">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span>Sugutta Fellowship Church: Impacting Our World</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed sm:pl-13">
                  Today, the sanctuary at {settings.physicalLocation || "Sugutta"} stands as an apostolic beacon of worship, spiritual nurture, and practical love. Worshippers gather weekly from across the region to experience the life-changing power of God through prayer, Sunday school, high-praise worship, and anointed fellowship.
                </p>
              </div>
            </div>

            {/* Scripture Anchor Banner */}
            <div className="border-l-4 border-[#ff6b35] pl-3.5 sm:pl-5 py-2.5 sm:py-4 bg-[#fffaf5] rounded-r-2xl border border-orange-100/60">
              <p className="font-serif italic text-sm sm:text-xl text-slate-900 leading-snug">
                &ldquo;And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another...&rdquo;
              </p>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-[#ff6b35] tracking-wider block mt-1.5 sm:mt-2">
                — Hebrews 10:25
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
