"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Sparkles,
  MapPin,
  Clock,
  Smartphone,
  Tv,
  Flame,
  ArrowRight,
} from "lucide-react";
import { MINISTRY_VIDEOS, MinistryVideo } from "@/data/ministry-videos";
import { AdaptiveVideoModal } from "@/components/media/adaptive-video-modal";

type VideoFilter = "all" | "reels" | "crusades";

export function MinistryVideoShowcase() {
  const [filter, setFilter] = useState<VideoFilter>("all");
  const [activeVideo, setActiveVideo] = useState<MinistryVideo | null>(null);

  const filteredVideos = MINISTRY_VIDEOS.filter((v) => {
    if (filter === "reels") return v.orientation === "vertical";
    if (filter === "crusades") return v.orientation === "widescreen";
    return true;
  });

  return (
    <section className="relative py-12 sm:py-20 bg-gradient-to-b from-[#fbf8f3] via-[#fffaf5] to-[#fbf8f3] border-y border-slate-200/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <Flame className="w-3.5 h-3.5 text-[#ff6b35]" />
            <span>Ministry in Action &bull; Outdoor Praising</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight leading-tight">
            Witness the Fire &amp; Uncompromised Praise
          </h2>

          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Experience real moments of divine deliverance, vibrant street witnessing,
            and outdoor praise processions captured live with the saints of Sugutta Fellowship.
          </p>

          <blockquote className="text-[11px] sm:text-xs text-slate-500 font-semibold italic">
            &ldquo;Make a joyful noise unto the Lord, all ye lands! Serve the Lord with gladness.&rdquo; &mdash; Psalm 100:1-2
          </blockquote>
        </div>

        {/* ================= FILTER PILLS ================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              filter === "all"
                ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20 scale-[1.02]"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Highlights ({MINISTRY_VIDEOS.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter("reels")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              filter === "reels"
                ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20 scale-[1.02]"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Praise Reels (2)</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("crusades")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              filter === "crusades"
                ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20 scale-[1.02]"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Outdoor Crusades (7)</span>
          </button>
        </div>

        {/* ================= ADAPTIVE VIDEO GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredVideos.map((video) => {
            const isVertical = video.orientation === "vertical";

            return (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end ${
                  isVertical
                    ? "aspect-[9/14] sm:aspect-[9/15] ring-2 ring-orange-500/30 hover:ring-[#ff6b35]"
                    : "aspect-[16/10] sm:aspect-[16/10] ring-1 ring-slate-200 hover:ring-[#ff6b35]"
                }`}
              >
                {/* Background Video Frame Preview */}
                <div className="absolute inset-0 bg-slate-900">
                  <video
                    src={`${video.src}#t=0.5`}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient Scrim for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/30 transition-colors" />
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm ${
                      isVertical
                        ? "bg-[#ff6b35] text-white"
                        : "bg-black/70 text-white border border-white/20"
                    }`}
                  >
                    {isVertical ? <Smartphone className="w-3 h-3" /> : <Tv className="w-3 h-3" />}
                    <span>{video.categoryLabel}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold border border-white/10">
                    <Clock className="w-3 h-3 text-[#ff6b35]" />
                    <span>{video.duration}</span>
                  </span>
                </div>

                {/* Center Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#ff6b35] text-white flex items-center justify-center shadow-xl shadow-orange-600/40 group-hover:scale-110 group-hover:bg-[#f25c23] transition-all duration-300 ring-4 ring-white/20">
                    <Play className="w-5 h-5 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Content Plate */}
                <div className="relative p-4 sm:p-5 space-y-1.5 text-white z-10">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-orange-400 font-bold">
                    <MapPin className="w-3 h-3 text-[#ff6b35] shrink-0" />
                    <span className="truncate">{video.location}</span>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-white line-clamp-2 leading-snug group-hover:text-[#ff6b35] transition-colors">
                    {video.title}
                  </h3>

                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed hidden sm:block">
                    {video.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono text-[#ff6b35] font-semibold">{video.scriptureAnchor}</span>
                    <span className="text-[#ff6b35] font-semibold flex items-center gap-1">
                      <span>Watch Clip</span>
                      <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div className="text-center pt-4">
          <Link
            href="/sermons"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-orange-500/20"
          >
            <span>Explore Full Video &amp; Sermons Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ================= ADAPTIVE VIDEO MODAL ================= */}
      <AdaptiveVideoModal
        video={activeVideo}
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
