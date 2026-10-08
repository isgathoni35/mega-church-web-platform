"use client";

import { useState } from "react";
import { Radio, Sparkles, Calendar, User, ExternalLink, Share2, Check, Tv } from "lucide-react";
import { Sermon } from "@/types/database.types";
import { getYouTubeId, getYouTubeEmbedUrl } from "@/lib/utils/youtube";
import { Button } from "@/components/ui/button";

interface LiveHeroPlayerProps {
  featuredSermon: Sermon | null;
  youtubeChannelUrl?: string;
}

export function LiveHeroPlayer({
  featuredSermon,
  youtubeChannelUrl,
}: LiveHeroPlayerProps) {

  const [copied, setCopied] = useState(false);

  if (!featuredSermon) {
    const channel = youtubeChannelUrl || "https://www.youtube.com/@Brianmbera";
    return (
      <section className="relative w-full bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] text-slate-900 py-10 sm:py-16 px-4 sm:px-8 border-b border-slate-200/80 overflow-hidden">
        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>Sugutta Live Broadcast Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Anointed Messages &amp; Live Altar Broadcasts
          </h1>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join Pastor Caesar O. Nyandwaro for prophetic teachings, deliverance ministrations, and Sunday morning worship live from our Nairobi sanctuary.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="default"
              size="lg"
              className="bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold shadow-lg shadow-orange-500/20 rounded-xl text-xs sm:text-sm py-2.5 sm:py-3 h-auto"
              asChild
            >
              <a href={channel} target="_blank" rel="noopener noreferrer">
                <Tv className="h-4 w-4 mr-2" />
                <span>Watch Live on YouTube Channel</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 bg-white text-slate-700 hover:bg-slate-50 rounded-xl text-xs sm:text-sm py-2.5 sm:py-3 h-auto"
              asChild
            >
              <a href="/contact">
                <span>Join In-Person Service</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const videoId = getYouTubeId(featuredSermon.youtube_url);
  const embedUrl = videoId ? getYouTubeEmbedUrl(videoId, false) : "";

  const handleShare = async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/sermons?id=${featuredSermon.id}`
        : featuredSermon.youtube_url;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] text-slate-900 py-6 sm:py-10 lg:py-16 px-4 sm:px-8 border-b border-slate-200/80 overflow-hidden">
      {/* Ambient Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-5 sm:gap-8 lg:gap-14">
        {/* Left Column: Sermon Information */}
        <div className="flex-1 space-y-2.5 sm:space-y-5 text-center lg:text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            {featuredSermon.is_live ? (
              <span className="flex items-center gap-1.5 sm:gap-2 bg-red-600 text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full animate-pulse shadow-sm">
                <Radio className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Live Broadcast Now
              </span>
            ) : (
              <span className="flex items-center gap-1.5 sm:gap-2 bg-orange-100 text-[#ff6b35] border border-orange-200 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#ff6b35]" />
                Featured Broadcast
              </span>
            )}
            <span className="text-slate-500 text-xs hidden sm:inline">
              &bull; {featuredSermon.category}
            </span>
          </div>

          {/* Script Subtitle */}
          <span className="font-script text-[#ff6b35] text-xl sm:text-3xl block font-normal">
            Experience the Miraculous Word
          </span>

          {/* Main Title */}
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {featuredSermon.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-xs sm:text-sm text-slate-600 font-medium">
            <span className="flex items-center gap-1.5 text-[#ff6b35] font-semibold">
              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {featuredSermon.speaker}
            </span>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500" />
              {formatDate(featuredSermon.date_preached)}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold shadow-lg shadow-orange-500/20 rounded-xl text-xs sm:text-sm py-2.5 sm:py-3 h-auto"
              asChild
            >
              <a
                href={featuredSermon.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Watch on YouTube
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              className="w-full sm:w-auto border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm rounded-xl text-xs sm:text-sm py-2.5 sm:py-3 h-auto"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 text-[#ff6b35] mr-2" />
                  Share Broadcast
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-red-200 bg-red-50/70 text-red-700 hover:bg-red-100 hover:text-red-900 shadow-sm rounded-xl text-xs sm:text-sm py-2.5 sm:py-3 h-auto"
              asChild
            >
              <a
                href={youtubeChannelUrl || "https://www.youtube.com/@Brianmbera"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tv className="h-4 w-4 mr-2 text-red-600" />
                Subscribe to Channel
              </a>
            </Button>
          </div>
        </div>


        {/* Right Column: 16:9 Video Player */}
        <div className="w-full lg:w-[580px] xl:w-[640px] shrink-0">
          <div className="relative w-full pb-[56.25%] rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black ring-1 ring-slate-200">
            {videoId ? (
              <iframe
                src={embedUrl}
                title={featuredSermon.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : featuredSermon.youtube_url ? (
              <video
                src={featuredSermon.youtube_url}
                poster={featuredSermon.thumbnail_url || undefined}
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-contain bg-black"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
                Video player loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
