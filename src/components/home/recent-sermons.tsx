"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { Video, ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import { Sermon } from "@/types/database.types";
import { SermonCard } from "@/components/sermons/sermon-card";
import { VideoModal } from "@/components/sermons/video-modal";
import { Button } from "@/components/ui/button";

interface RecentSermonsProps {
  sermons: Sermon[];
}

export function RecentSermons({ sermons }: RecentSermonsProps) {
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserHovering, setIsUserHovering] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ensure enough items for a continuous seamless loop
  const displayItems = useMemo(() => {
    if (!sermons || sermons.length === 0) return [];
    if (sermons.length < 5) {
      return [...sermons, ...sermons, ...sermons, ...sermons];
    }
    return [...sermons, ...sermons];
  }, [sermons]);

  // Smooth continuous right-to-left gliding effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || displayItems.length === 0) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused && !isUserHovering && el) {
        // ~45px per second smooth right-to-left glide
        const step = 0.045 * delta;
        el.scrollLeft += step;

        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += halfWidth;
        }
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, isUserHovering, displayItems.length]);

  const handleManualScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardStep = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardStep : cardStep,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#ff6b35] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Latest Messages &amp; Media</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight">
            Messages for the Journey: Truth to Carry into Monday
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Stream life-changing messages, systematic biblical expositions, and prophetic encouragement from Pastor Caesar to strengthen your walk wherever you are.
          </p>
        </div>

        {/* Dynamic Continuous Right-to-Left Fading Media Stream */}
        {displayItems.length > 0 ? (
          <div className="space-y-4">
            {/* Interactive Control Strip */}
            <div className="flex items-center justify-between max-w-7xl mx-auto px-1 sm:px-2">
              <span className="text-xs sm:text-sm font-semibold text-slate-500">
                Showing all {sermons.length} sermons &amp; media broadcasts
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors shadow-sm"
                  title={isPaused ? "Resume auto-glide" : "Pause auto-glide"}
                  aria-label={isPaused ? "Resume auto-glide" : "Pause auto-glide"}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current text-[#ff6b35]" />
                      <span className="hidden sm:inline">Play</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current text-slate-600" />
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleManualScroll("left")}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white hover:bg-orange-50 hover:border-orange-200 hover:text-[#ff6b35] text-slate-700 flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Previous videos"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleManualScroll("right")}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white hover:bg-orange-50 hover:border-orange-200 hover:text-[#ff6b35] text-slate-700 flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Next videos"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Container with Left and Right Edge Fading */}
            <div
              className="relative w-full"
              onMouseEnter={() => setIsUserHovering(true)}
              onMouseLeave={() => setIsUserHovering(false)}
              onTouchStart={() => setIsUserHovering(true)}
              onTouchEnd={() => setIsUserHovering(false)}
            >
              {/* Left Edge Fade Mask */}
              <div
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 lg:w-32 bg-gradient-to-r from-white via-white/85 to-transparent z-20"
                aria-hidden="true"
              />

              {/* Right Edge Fade Mask */}
              <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 lg:w-32 bg-gradient-to-l from-white via-white/85 to-transparent z-20"
                aria-hidden="true"
              />

              {/* Scrolling Cards Track */}
              <div
                ref={scrollRef}
                tabIndex={0}
                role="region"
                aria-label="Media carousel"
                className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-2 px-6 sm:px-10 focus:outline-none focus:ring-1 focus:ring-orange-300 rounded-2xl select-none"
                style={{
                  WebkitOverflowScrolling: "touch",
                  maskImage:
                    "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
                }}
              >
                {displayItems.map((sermon, idx) => (
                  <div
                    key={`${sermon.id}-${idx}`}
                    className="w-[285px] sm:w-[335px] md:w-[365px] lg:w-[385px] shrink-0"
                  >
                    <SermonCard
                      sermon={sermon}
                      onPlay={(s) => setActiveSermon(s)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#fffaf5] border border-orange-200/90 text-center max-w-3xl mx-auto space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#ff6b35] flex items-center justify-center mx-auto shadow-sm">
              <Video className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                Join Our Next Live Service Broadcast
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                Experience apostolic deliverance, prophetic encouragement, and praise ministrations live every Sunday (8:00 AM – 11:45 AM) and Midweek Wednesday (5:00 PM – 7:30 PM).
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold shadow-md shadow-orange-500/20 px-6 py-3 text-xs sm:text-sm h-auto"
                asChild
              >
                <Link href="/sermons">
                  Explore Media Hub
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-slate-300 bg-white text-slate-700 hover:bg-slate-50 px-6 py-3 text-xs sm:text-sm h-auto"
                asChild
              >
                <Link href="/contact">
                  Plan a Sanctuary Visit
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Centered All Sermons Button */}
        {displayItems.length > 0 && (
          <div className="flex justify-center pt-2 sm:pt-4">
            <Button
              size="lg"
              className="rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold shadow-md shadow-orange-500/20 px-6 py-3 sm:px-8 sm:py-6 text-sm sm:text-base h-auto"
              asChild
            >
              <Link href="/sermons">
                View All Sermons &amp; Media Hub
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
          </div>
        )}

        {/* Interactive Video Modal */}
        <VideoModal
          sermon={activeSermon}
          isOpen={!!activeSermon}
          onClose={() => setActiveSermon(null)}
        />
      </div>
    </section>
  );
}

