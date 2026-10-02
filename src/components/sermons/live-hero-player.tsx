"use client";

import { useState } from "react";
import { Radio, Sparkles, Calendar, User, ExternalLink, Share2, Check } from "lucide-react";
import { Sermon } from "@/types/database.types";
import { getYouTubeId, getYouTubeEmbedUrl } from "@/lib/utils/youtube";
import { Button } from "@/components/ui/button";

interface LiveHeroPlayerProps {
  featuredSermon: Sermon | null;
}

export function LiveHeroPlayer({ featuredSermon }: LiveHeroPlayerProps) {
  const [copied, setCopied] = useState(false);

  if (!featuredSermon) return null;

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
    <section className="relative w-full bg-primary text-white py-12 sm:py-16 px-4 sm:px-8 border-b border-white/10 overflow-hidden">
      {/* Ambient Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* Left Column: Sermon Information */}
        <div className="flex-1 space-y-5 text-center lg:text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            {featuredSermon.is_live ? (
              <span className="flex items-center gap-2 bg-red-600/90 text-white px-3 py-1 rounded-full animate-pulse border border-red-400">
                <Radio className="h-3.5 w-3.5" />
                Live Broadcast Now
              </span>
            ) : (
              <span className="flex items-center gap-2 bg-accent/20 text-accent px-3 py-1 rounded-full border border-accent/40">
                <Sparkles className="h-3.5 w-3.5" />
                Featured Broadcast
              </span>
            )}
            <span className="text-white/60 text-xs hidden sm:inline">
              &bull; {featuredSermon.category}
            </span>
          </div>

          {/* Script Subtitle */}
          <span className="font-script text-accent text-2xl sm:text-3xl block font-normal">
            Experience the Miraculous Word
          </span>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {featuredSermon.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-white/80 font-medium">
            <span className="flex items-center gap-1.5 text-accent font-semibold">
              <User className="h-4 w-4" />
              {featuredSermon.speaker}
            </span>
            <span className="text-white/30 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-white/60" />
              {formatDate(featuredSermon.date_preached)}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Button
              variant="default"
              size="lg"
              className="bg-accent text-accent-foreground font-bold hover:bg-accent/90 shadow-lg"
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
              className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 text-accent mr-2" />
                  Share Broadcast
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right Column: 16:9 Video Player */}
        <div className="w-full lg:w-[580px] xl:w-[640px] shrink-0">
          <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-2xl border border-accent/40 bg-black">
            {videoId ? (
              <iframe
                src={embedUrl}
                title={featuredSermon.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
                Live stream player loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
