import React from "react";
import Link from "next/link";
import { Mountain, Flame, Moon, Compass, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomePrayerMountain() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-[#fbf8f3] text-slate-900 overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Orange Header matching Neno */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 lg:mb-14 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
            <Mountain className="h-3.5 w-3.5" />
            <span>Sacred Consecration &bull; Mai Mahiu Altar</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight">
            Mai Mahiu Sacred Prayer Mountain
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Modeled after the biblical mountains of encounter, our consecrated retreat grounds serve as an unbroken altar of fire where believers separate themselves from the world to seek the face of Almighty God.
          </p>
        </div>

        {/* 3 Pure White Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Card 1 */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#ff6b35] flex items-center justify-center">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Consecrated Fasting Retreats
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Private cabins dedicated for 3-day, 7-day, and 21-day dry or water fasts with spiritual oversight, prayer counseling, and daily scripture teaching.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold text-[#ff6b35] uppercase tracking-wider">
              Open 365 Days a Year
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#ff6b35] flex items-center justify-center">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Solitary Prayer Rocks &amp; Cabins
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Peaceful, distraction-free mountain atmosphere designed for individual communion with the Holy Spirit, personal consecration, and ministerial retreats.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold text-[#ff6b35] uppercase tracking-wider">
              Quiet &bull; Secure &bull; Serene
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#ff6b35] flex items-center justify-center">
                <Moon className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                All-Night Kesha Vigils
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Weekly midnight-to-dawn breakthrough prayer watches, intensive spiritual warfare, dynamic praise, and prophetic ministration under an open heaven.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold text-[#ff6b35] uppercase tracking-wider">
              Every Friday Night
            </div>
          </div>
        </div>

        {/* Bottom Scripture Banner & CTAs */}
        <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#0f172a] text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-2xl text-center lg:text-left">
            <span className="text-[11px] sm:text-xs font-bold text-[#ff6b35] uppercase tracking-widest block">
              Isaiah 2:2 &bull; The Mountain of the Lord&apos;s House
            </span>
            <p className="font-serif italic text-sm sm:text-lg text-slate-200 leading-relaxed">
              &ldquo;The mountain of the LORD&apos;s house shall be established in the top of the mountains... and all nations shall flow unto it.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Button
              size="lg"
              className="bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold rounded-full shadow-lg shadow-orange-500/20 px-6 py-3 sm:px-8 sm:py-6 text-xs sm:text-sm h-auto"
              asChild
            >
              <Link href="/contact?tab=inquiry&activity=Prayer%20Mountain%20Retreat%20Booking">
                <span>Book Retreat &bull; Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-slate-700 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full px-6 py-3 sm:px-8 sm:py-6 text-xs sm:text-sm h-auto"
              asChild
            >
              <Link href="/prayer-request">
                <span>Send Altar Petition</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
