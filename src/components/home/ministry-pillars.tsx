"use client";

import * as React from "react";
import Image from "next/image";
import { Flame, Globe, BookOpen, HeartHandshake, Play, X } from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";
import { getYouTubeEmbedUrl } from "@/lib/utils/youtube";

interface MinistryPillarsProps {
  settings?: SiteSettingsData;
}

export function MinistryPillars({ settings: propSettings }: MinistryPillarsProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const [activeVideo, setActiveVideo] = React.useState<{ url: string; title: string } | null>(null);

  const pillars = [
    {
      title: settings.pillar1Title || "Deliverance & Healing",
      subtitle: "Supernatural Freedom & Miracles",
      description:
        settings.pillar1Desc ||
        "Treading upon the works of darkness, breaking generational curses, casting out demonic afflictions, and witnessing total physical restoration through the authority of Jesus Christ.",
      imageSrc: settings.pillar1Image || "/images/ministry-healing.jpg",
      imageAlt: "Hands laid in prayer for healing inside a warm church setting",
      videoUrl: settings.pillar1Video ? settings.pillar1Video.trim() : "",
      icon: Flame,
    },
    {
      title: settings.pillar2Title || "Global Crusades",
      subtitle: "Reaping the End-Time Harvest",
      description:
        settings.pillar2Desc ||
        "Conducting massive outdoor evangelistic campaigns, stadium crusades, and open-air meetings that gather hundreds of thousands to repent and accept the saving power of the Cross.",
      imageSrc: settings.pillar2Image || "/images/hero-worship.jpg",
      imageAlt: "Large outdoor African gospel crusade at sunset with thousands gathered in worship",
      videoUrl: settings.pillar2Video ? settings.pillar2Video.trim() : "",
      icon: Globe,
    },
    {
      title: settings.pillar3Title || "Prophetic Word & Truth",
      subtitle: "Truth, Righteousness & Power",
      description:
        settings.pillar3Desc ||
        "Expositional teaching of the Holy Scriptures to equip the saints, ground believers in apostolic doctrine, and build resilient Christian families anchored in holiness.",
      imageSrc: settings.pillar3Image || "/images/ministry-healing.jpg",
      imageAlt: "Small group Bible study session with open Bibles in warm church interior",
      videoUrl: settings.pillar3Video ? settings.pillar3Video.trim() : "",
      icon: BookOpen,
    },
    {
      title: settings.pillar4Title || "Compassion & Outreach",
      subtitle: "Love in Demonstration",
      description:
        settings.pillar4Desc ||
        "Feeding the hungry, sheltering orphans, providing medical support, and clothing widows across underserved communities as an active demonstration of Christ's compassion.",
      imageSrc: settings.pillar4Image || "/images/community-outreach.jpg",
      imageAlt: "Grassroots village community fellowship, elders, mothers, and children outreach gathering with church leaders",
      videoUrl: settings.pillar4Video ? settings.pillar4Video.trim() : "",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-[#fbf8f3] text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Orange Section Header matching Neno */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 lg:mb-16">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#ff6b35] uppercase mb-1.5">
            Our Divine Mandate
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight mb-3">
            Our Ministry Pillars
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full mb-3 sm:mb-6" />
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
            Four foundational spiritual pillars upholding our mission across nations to set captives free and manifest heaven on earth.
          </p>
        </div>

        {/* 4 Pure White Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] flex-shrink-0">
                      <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                    </div>
                    <div>
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#ff6b35] block">
                        {pillar.subtitle}
                      </span>
                      <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-base leading-relaxed mb-3 sm:mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner mt-2 group/media">
                  <Image
                    src={pillar.imageSrc}
                    alt={pillar.imageAlt}
                    fill
                    className="object-cover group-hover/media:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                  {/* Video Play Overlay */}
                  {pillar.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setActiveVideo({ url: pillar.videoUrl, title: pillar.title })}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/25 hover:bg-slate-950/45 transition-colors cursor-pointer z-10"
                      aria-label={`Watch video for ${pillar.title}`}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#ff6b35] hover:bg-[#ea580c] text-white flex items-center justify-center shadow-xl transform group-hover/media:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-extrabold text-white bg-slate-950/75 px-3 py-1 rounded-full backdrop-blur-sm shadow border border-white/20">
                        Watch Pillar Video
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Neno 3-Item Impact Counter Strip */}
        <div className="mt-6 sm:mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 text-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl sm:text-4xl font-extrabold text-[#ff6b35] block mb-1">
              {settings.impactStat1Val || "1,200+"}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
              {settings.impactStat1Lbl || "Deliverance Sessions"}
            </span>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 text-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl sm:text-4xl font-extrabold text-[#ff6b35] block mb-1">
              {settings.impactStat2Val || "50+"}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
              {settings.impactStat2Lbl || "Miracle Crusades"}
            </span>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 text-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl sm:text-4xl font-extrabold text-[#ff6b35] block mb-1">
              {settings.impactStat3Val || "1,000,000+"}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
              {settings.impactStat3Lbl || "Believers Impacted"}
            </span>
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 sm:p-4 bg-slate-900 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b35]" />
                <h3 className="font-bold text-xs sm:text-sm truncate">{activeVideo.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {activeVideo.url.includes("youtube.com") || activeVideo.url.includes("youtu.be") ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo.url) || activeVideo.url}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideo.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
