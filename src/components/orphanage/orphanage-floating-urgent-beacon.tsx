"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight, X, ChevronUp, Sparkles } from "lucide-react";

export function OrphanageFloatingUrgentBeacon() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show beacon once user has scrolled 220px past top hero
      if (window.scrollY > 220) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount in case user lands mid-page
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Urgent Orphanage Sponsorship Appeal"
      className="fixed z-40 bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-4 pointer-events-auto"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {isCollapsed ? (
        // Collapsed floating pill button with active blinking beacon
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/95 text-white border border-rose-500/50 shadow-xl shadow-rose-950/40 backdrop-blur-md hover:bg-slate-900 hover:scale-105 transition-all text-xs font-bold"
          title="Expand Urgent Orphanage Appeal"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
          </span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500 group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-extrabold tracking-wide uppercase text-rose-300">
            Urgent Appeal
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      ) : (
        // Expanded sleek floating glassmorphic card
        <div className="bg-slate-950/92 backdrop-blur-md text-white border border-rose-500/40 shadow-2xl shadow-rose-950/50 rounded-2xl p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 max-w-md w-full">
          {/* Left: Blinking Beacon & Label */}
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Pulsating urgent beacon */}
            <span className="relative flex h-3 w-3 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-90" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 shadow-sm shadow-rose-400 animate-pulse" />
            </span>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                  Urgent Need
                </span>
                <span className="text-[10px] text-slate-400 font-medium hidden xs:inline">
                  60+ Children
                </span>
              </div>
              <p className="text-xs font-bold text-slate-100 truncate mt-0.5">
                Feed, Shelter &amp; Sponsor Orphans
              </p>
            </div>
          </div>

          {/* Right: CTA Button and Collapse Toggle */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Link
              href="/orphanage/donate"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-rose-600 via-[#ff6b35] to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Heart className="w-3 h-3 fill-white" />
              <span>Donate</span>
              <ArrowRight className="w-3 h-3 hidden sm:inline" />
            </Link>

            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              aria-label="Minimize notification"
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Minimize"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
