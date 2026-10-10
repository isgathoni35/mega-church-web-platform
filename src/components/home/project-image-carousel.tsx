"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Play,
  X,
  Video as VideoIcon,
  Maximize2,
  Film,
} from "lucide-react";
import { getYouTubeId, getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/utils/youtube";

interface MediaSlide {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
}

interface ProjectImageCarouselProps {
  images: string[];
  videoUrl?: string;
  title: string;
  subtitle?: string;
  autoPlayInterval?: number; // ms, default 3500ms for swift smooth movement
}

export function ProjectImageCarousel({
  images,
  videoUrl,
  title,
  subtitle,
  autoPlayInterval = 3500,
}: ProjectImageCarouselProps) {
  // Build combined media items: Photos (up to 5) + optional Video
  const slides = React.useMemo<MediaSlide[]>(() => {
    const list: MediaSlide[] = [];

    // Filter valid image URLs
    const safeImages = Array.isArray(images)
      ? images.filter(Boolean)
      : [];

    if (safeImages.length === 0) {
      list.push({
        id: "default-img",
        type: "image",
        url: "/images/church-construction.jpg",
      });
    } else {
      safeImages.slice(0, 5).forEach((src, idx) => {
        list.push({
          id: `img-${idx}`,
          type: "image",
          url: src,
        });
      });
    }

    // Append video slide if videoUrl is present
    if (videoUrl && videoUrl.trim()) {
      const cleanVideo = videoUrl.trim();
      const ytId = getYouTubeId(cleanVideo);
      const ytThumb = ytId ? getYouTubeThumbnail(ytId) : "";
      const fallbackThumb = safeImages[0] || "/images/church-construction.jpg";

      list.push({
        id: "project-video",
        type: "video",
        url: cleanVideo,
        thumbnailUrl: ytThumb || fallbackThumb,
      });
    }

    return list;
  }, [images, videoUrl]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = slides.length;
  const currentSlide = slides[currentIndex] || slides[0];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Swift Auto-play: Rotate every 3.5s across photos.
  // Pauses when user hovers or when currently viewing the video slide.
  useEffect(() => {
    if (total <= 1 || isPaused || currentSlide.type === "video" || isVideoModalOpen) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [total, isPaused, currentSlide.type, isVideoModalOpen, autoPlayInterval, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      setIsPaused(false);
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Detect horizontal swipe with 35px threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setIsPaused(false);
  };

  const hasMultipleMedia = total > 1;
  const isYoutube = currentSlide.type === "video" && Boolean(getYouTubeId(currentSlide.url));
  const youtubeEmbedUrl = isYoutube ? getYouTubeEmbedUrl(getYouTubeId(currentSlide.url) || "", true) : "";

  return (
    <>
      <div
        className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 select-none group/carousel cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          if (currentSlide.type === "video") {
            setIsVideoModalOpen(true);
          }
        }}
        aria-roledescription="carousel"
        aria-label={`Media gallery for ${title}`}
      >
        {/* Render Layer for each Media Slide (Smooth crossfade transition) */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const displayImage = slide.type === "video" ? (slide.thumbnailUrl || slide.url) : slide.url;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 scale-100 z-10 pointer-events-auto"
                  : "opacity-0 scale-105 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={displayImage}
                alt={`${title} - ${slide.type === "video" ? "Video Walkthrough" : `Photo ${idx + 1}`}`}
                fill
                className="object-cover group-hover/carousel:scale-105 transition-transform duration-700"
                unoptimized
                priority={idx === 0}
              />

              {/* If Video Slide: Render High-Contrast Glowing Play Button */}
              {slide.type === "video" && (
                <div className="absolute inset-0 bg-black/45 flex items-center justify-center z-20">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-16 h-16 rounded-full bg-orange-500/40 animate-ping" />
                    <div className="relative w-14 h-14 rounded-full bg-[#ff6b35] text-white flex items-center justify-center shadow-xl shadow-orange-500/50 group-hover/carousel:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-16 sm:bottom-14 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5 shadow-md">
                    <Film className="w-3.5 h-3.5 text-orange-400" />
                    <span>Watch Video Walkthrough</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Persistent Bottom Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/20 z-20 pointer-events-none" />

        {/* Top Media Counter Badge */}
        {hasMultipleMedia && (
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/65 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold shadow-md">
            {currentSlide.type === "video" ? (
              <>
                <VideoIcon className="w-3.5 h-3.5 text-[#ff8c42]" />
                <span>Video {currentIndex + 1}/{total}</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-[#ff8c42]" />
                <span>{currentIndex + 1} / {total}</span>
              </>
            )}
          </div>
        )}

        {/* Desktop Navigation Chevrons */}
        {hasMultipleMedia && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-950/65 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-[#ff6b35] transition-all duration-200 border border-white/20 shadow-lg focus:opacity-100 focus:outline-none"
              aria-label="Previous photo or video"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-950/65 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-[#ff6b35] transition-all duration-200 border border-white/20 shadow-lg focus:opacity-100 focus:outline-none"
              aria-label="Next photo or video"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Bottom Details & Interactive Indicators */}
        <div className="absolute bottom-3 left-4 right-4 z-30 text-white flex flex-col justify-end space-y-1.5 pointer-events-none">
          <div>
            <p className="font-extrabold text-sm sm:text-base leading-tight drop-shadow-md">
              {title}
            </p>
            {subtitle && (
              <p className="text-[11px] text-slate-200/95 leading-normal drop-shadow-sm line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Interactive Slide Indicators (Dots for photos, Pill for video) */}
          {hasMultipleMedia && (
            <div className="flex items-center gap-1.5 pt-1 pointer-events-auto flex-wrap">
              {slides.map((slide, dotIdx) => {
                const isActive = dotIdx === currentIndex;

                if (slide.type === "video") {
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToSlide(dotIdx);
                      }}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all focus:outline-none ${
                        isActive
                          ? "bg-[#ff6b35] text-white shadow-sm ring-1 ring-white/30"
                          : "bg-white/35 text-white hover:bg-white/60"
                      }`}
                      aria-label="View Project Video"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Video</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(dotIdx);
                    }}
                    className={`transition-all duration-300 rounded-full h-1.5 focus:outline-none ${
                      isActive
                        ? "w-5 bg-[#ff8c42] shadow-sm"
                        : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to photo ${dotIdx + 1}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Lightbox Video Modal */}
      {isVideoModalOpen && currentSlide.type === "video" && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 text-white bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-[#ff8c42] flex items-center justify-center">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base leading-tight">
                    {title} — Video Walkthrough
                  </h4>
                  {subtitle && (
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{subtitle}</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {isYoutube ? (
                <iframe
                  src={youtubeEmbedUrl}
                  title={`${title} - Video Walkthrough`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <video
                  src={currentSlide.url}
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
    </>
  );
}
