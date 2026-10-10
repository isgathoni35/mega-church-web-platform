"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";

interface ProjectImageCarouselProps {
  images: string[];
  title: string;
  subtitle?: string;
  autoPlayInterval?: number; // ms, default 4500
}

export function ProjectImageCarousel({
  images,
  title,
  subtitle,
  autoPlayInterval = 4500,
}: ProjectImageCarouselProps) {
  // Normalize images list (filter empty strings and fallback to placeholder)
  const validImages = React.useMemo(() => {
    const list = Array.isArray(images) ? images.filter(Boolean) : [];
    return list.length > 0 ? list : ["/images/church-construction.jpg"];
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = validImages.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Auto-play timer (pauses when hovered or interacting)
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [total, isPaused, autoPlayInterval, nextSlide]);

  // Touch handlers for mobile swipe
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

    // Only swipe if horizontal swipe is dominant and above 35px threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        // Swiped left -> next
        nextSlide();
      } else {
        // Swiped right -> prev
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setIsPaused(false);
  };

  return (
    <div
      className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 select-none group/carousel cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label={`Photo gallery for ${title}`}
    >
      {/* Photo Layers with Smooth Crossfade & Subtle Scale */}
      {validImages.map((src, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={`${src}-${idx}`}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              isActive
                ? "opacity-100 scale-100 z-10 pointer-events-auto"
                : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <Image
              src={src}
              alt={`${title} - Photo ${idx + 1}`}
              fill
              className="object-cover group-hover/carousel:scale-105 transition-transform duration-700"
              unoptimized
              priority={idx === 0}
            />
          </div>
        );
      })}

      {/* Persistent Vignette Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-black/20 z-20 pointer-events-none" />

      {/* Top Media Indicator Badge (If multiple photos) */}
      {total > 1 && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono font-bold shadow-md">
          <Layers className="w-3 h-3 text-[#ff8c42]" />
          <span>
            {currentIndex + 1} / {total}
          </span>
        </div>
      )}

      {/* Navigation Chevrons (Shown on hover for desktop, touch-friendly) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-[#ff6b35] transition-all duration-200 border border-white/20 shadow-lg focus:opacity-100 focus:outline-none"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-[#ff6b35] transition-all duration-200 border border-white/20 shadow-lg focus:opacity-100 focus:outline-none"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Bottom Content & Dots Indicator */}
      <div className="absolute bottom-3 left-4 right-4 z-30 text-white flex flex-col justify-end space-y-1.5 pointer-events-none">
        <div>
          <p className="font-extrabold text-sm sm:text-base leading-tight drop-shadow-md">
            {title}
          </p>
          {subtitle && (
            <p className="text-[11px] text-slate-200/90 leading-normal drop-shadow-sm line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Indicators (Interactive Dots/Pills) */}
        {total > 1 && (
          <div className="flex items-center gap-1.5 pt-1 pointer-events-auto">
            {validImages.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(dotIdx);
                }}
                className={`transition-all duration-300 rounded-full h-1.5 focus:outline-none ${
                  dotIdx === currentIndex
                    ? "w-5 bg-[#ff8c42] shadow-sm"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to photo ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
