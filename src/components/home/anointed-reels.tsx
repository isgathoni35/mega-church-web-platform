"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Sparkles, Smartphone, Clock, MapPin, ArrowRight } from "lucide-react";
import { MINISTRY_VIDEOS, MinistryVideo } from "@/data/ministry-videos";
import { AdaptiveVideoModal } from "@/components/media/adaptive-video-modal";
import { Button } from "@/components/ui/button";

export function AnointedReels() {
  const [activeVideo, setActiveVideo] = useState<MinistryVideo | null>(null);

  // Take the 4 most vibrant highlight reels
  const reels = [
    MINISTRY_VIDEOS[0], // praise-reel-01 (vertical 9:16)
    MINISTRY_VIDEOS[4], // praise-reel-02 (vertical 9:16)
    MINISTRY_VIDEOS[1], // outdoor-crusade-01
    MINISTRY_VIDEOS[2], // praise-march-01
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white text-slate-900 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        {/* Centered Orange Header matching Neno */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Short-Form Ministry &bull; Praise Reels</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight">
            Anointed Moments
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Experience spontaneous praise, open-air street witnessing, and fervent altar warfare captured in high-definition video reels.
          </p>
        </div>

        {/* 4-Card Vertical 9:16 Grid matching Neno */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {reels.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group relative aspect-[9/15] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end ring-1 ring-slate-200 hover:ring-[#ff6b35]"
            >
              {/* Preview video frame */}
              <div className="absolute inset-0 bg-slate-900">
                <video
                  src={`${video.src}#t=0.5`}
                  preload="metadata"
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/30 transition-colors" />
              </div>

              {/* Top Bar Badges */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ff6b35] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  <Smartphone className="w-3 h-3" />
                  <span>Reel</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold border border-white/10">
                  <Clock className="w-2.5 h-2.5 text-[#ff6b35]" />
                  <span>{video.duration}</span>
                </span>
              </div>

              {/* Center Play Button on hover */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#ff6b35] text-white flex items-center justify-center shadow-xl shadow-orange-600/40 group-hover:scale-110 group-hover:bg-[#f25c23] transition-all duration-300 ring-4 ring-white/20">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="relative p-3 sm:p-4 text-white z-10 space-y-1">
                <div className="flex items-center gap-1 text-[10px] text-orange-400 font-bold truncate">
                  <MapPin className="w-3 h-3 text-[#ff6b35] shrink-0" />
                  <span className="truncate">{video.location}</span>
                </div>
                <h3 className="font-extrabold text-xs sm:text-sm text-white line-clamp-2 leading-snug group-hover:text-[#ff6b35] transition-colors">
                  {video.title}
                </h3>
                <div className="text-[10px] text-slate-300 flex items-center justify-between pt-1">
                  <span className="font-mono text-[#ff6b35]">{video.scriptureAnchor}</span>
                  <span className="text-[#ff6b35] font-semibold flex items-center gap-0.5">
                    <span>Watch</span>
                    <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered CTA Button */}
        <div className="text-center pt-2 sm:pt-4">
          <Button
            size="lg"
            className="rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold shadow-md shadow-orange-500/20 px-6 py-3 sm:px-8 sm:py-6 text-xs sm:text-sm h-auto"
            asChild
          >
            <Link href="/sermons">
              <span>Explore All Ministry Media &amp; Sermons</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Video Modal */}
      <AdaptiveVideoModal
        video={activeVideo}
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
