"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Calendar, User, Radio } from "lucide-react";
import { Sermon } from "@/types/database.types";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/utils/youtube";
import { Card, CardContent } from "@/components/ui/card";

interface SermonCardProps {
  sermon: Sermon;
  onPlay: (sermon: Sermon) => void;
}

export function SermonCard({ sermon, onPlay }: SermonCardProps) {
  const videoId = getYouTubeId(sermon.youtube_url);
  const defaultThumb = videoId ? getYouTubeThumbnail(videoId) : "";
  const [imgSrc, setImgSrc] = useState<string>(
    sermon.thumbnail_url || defaultThumb
  );
  const [hasError, setHasError] = useState(!sermon.thumbnail_url && !defaultThumb);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Card
      variant="lightAccent"
      className="group flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-t-2 border-t-accent/60 cursor-pointer"
      onClick={() => onPlay(sermon)}
    >
      {/* Thumbnail Container with 16:9 Aspect Ratio */}
      <div className="relative w-full pb-[56.25%] overflow-hidden bg-primary/20">
        {!hasError && imgSrc ? (
          <Image
            src={imgSrc}
            alt={sermon.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => {
              if (imgSrc !== defaultThumb && defaultThumb) {
                setImgSrc(defaultThumb);
              } else {
                setHasError(true);
              }
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <span className="text-white/40 text-4xl font-serif">✝</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Badges Top Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/90 text-white border border-white/20 backdrop-blur shadow-sm">
            {sermon.category}
          </span>

          {sermon.is_live && (
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-600 text-white shadow-md animate-pulse">
              <Radio className="h-3 w-3" />
              Live
            </span>
          )}
        </div>

        {/* Center Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <Play className="h-5 w-5 sm:h-6 sm:w-6 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Metadata Content */}
      <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-primary font-semibold">
              <User className="h-3.5 w-3.5 text-accent" />
              {sermon.speaker}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
              {formatDate(sermon.date_preached)}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {sermon.title}
          </h3>
        </div>

        <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-accent group-hover:translate-x-0.5 transition-transform">
          <span>Watch Message</span>
          <span>&rarr;</span>
        </div>
      </CardContent>
    </Card>
  );
}
