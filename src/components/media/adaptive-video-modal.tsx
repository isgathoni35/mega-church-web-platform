"use client";

import React, { useEffect, useRef } from "react";
import { X, MapPin, Sparkles, Volume2, ShieldCheck } from "lucide-react";
import { MinistryVideo } from "@/data/ministry-videos";

interface AdaptiveVideoModalProps {
  video: MinistryVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AdaptiveVideoModal({
  video,
  isOpen,
  onClose,
}: AdaptiveVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on ESC
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
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Restart video when opened
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policy until user interacts
      });
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen, video]);

  if (!isOpen || !video) return null;

  const isVertical = video.orientation === "vertical";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-col bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden text-white transition-all duration-300 ${
          isVertical
            ? "w-full max-w-[380px] sm:max-w-[420px] rounded-3xl ring-2 ring-[#C59B27]/40 max-h-[92vh]"
            : "w-full max-w-4xl rounded-2xl ring-1 ring-slate-700 max-h-[92vh]"
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#C59B27] truncate">
              {video.categoryLabel}
            </span>
            <span className="text-slate-600 text-xs hidden sm:inline">&bull;</span>
            <span className="text-slate-400 text-xs truncate hidden sm:inline">
              {video.duration}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close video player"
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div
          className={`relative bg-black flex items-center justify-center overflow-hidden ${
            isVertical
              ? "aspect-[9/16] w-full max-h-[68vh]"
              : "aspect-[16/9] w-full"
          }`}
        >
          <video
            ref={videoRef}
            src={video.src}
            controls
            playsInline
            autoPlay
            preload="auto"
            className="w-full h-full object-contain bg-black"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Caption & Metadata Footer */}
        <div className="p-3.5 sm:p-5 bg-slate-900/95 border-t border-slate-800 space-y-1.5 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-extrabold text-sm sm:text-base text-white truncate">
              {video.title}
            </h3>
            <span className="text-[10px] font-mono font-bold text-[#ff6b35] px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 shrink-0">
              {video.scriptureAnchor}
            </span>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {video.description}
          </p>

          <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-[#ff6b35] shrink-0" />
              <span className="truncate">{video.location}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1 text-[#C59B27] shrink-0">
              <Sparkles className="w-3 h-3" />
              <span>Authentic Church Footage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
