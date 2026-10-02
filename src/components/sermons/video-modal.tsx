"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink, Share2, Check, Calendar, User, Tag } from "lucide-react";
import { Sermon } from "@/types/database.types";
import { getYouTubeId, getYouTubeEmbedUrl } from "@/lib/utils/youtube";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
  sermon: Sermon | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ sermon, isOpen, onClose }: VideoModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !sermon) return null;

  const videoId = getYouTubeId(sermon.youtube_url);
  const embedUrl = videoId ? getYouTubeEmbedUrl(videoId, true) : "";

  const handleShare = async () => {
    const shareUrl = window.location.origin + `/sermons?id=${sermon.id}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="relative w-full max-w-4xl bg-primary border border-accent/30 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/30 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-accent-foreground">
              {sermon.category}
            </span>
            {sermon.is_live && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                Live Broadcast
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Close video player"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 16:9 Video Frame */}
        <div className="relative w-full pb-[56.25%] bg-black">
          {videoId ? (
            <iframe
              src={embedUrl}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
              Video stream currently unavailable
            </div>
          )}
        </div>

        {/* Modal Details & Actions Footer */}
        <div className="p-5 sm:p-6 bg-primary text-white flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <h2
                id="video-modal-title"
                className="text-lg sm:text-2xl font-extrabold text-white leading-snug"
              >
                {sermon.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/75 font-medium">
                <span className="flex items-center gap-1 text-accent">
                  <User className="h-3.5 w-3.5" />
                  {sermon.speaker}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-white/50" />
                  {formatDate(sermon.date_preached)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-400 mr-1.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-accent mr-1.5" />
                    Share
                  </>
                )}
              </Button>

              <Button
                variant="default"
                size="sm"
                className="bg-accent text-accent-foreground font-bold hover:bg-accent/90"
                asChild
              >
                <a
                  href={sermon.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Open in YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
