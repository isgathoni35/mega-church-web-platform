"use client";

import { useState } from "react";
import Link from "next/link";
import { Video, ArrowRight } from "lucide-react";
import { Sermon } from "@/types/database.types";
import { SermonCard } from "@/components/sermons/sermon-card";
import { VideoModal } from "@/components/sermons/video-modal";
import { Button } from "@/components/ui/button";

interface RecentSermonsProps {
  sermons: Sermon[];
}

export function RecentSermons({ sermons }: RecentSermonsProps) {
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);

  // Take top 3 most recent sermons
  const displayedSermons = sermons.slice(0, 3);

  return (
    <section className="w-full py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Centered Section Header matching Neno */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#ff6b35] uppercase">
            Latest Messages
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight">
            Messages for the Journey: Truth to Carry into Monday
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Stream life-changing messages, systematic biblical expositions, and prophetic encouragement from Pastor Caesar to strengthen your walk wherever you are.
          </p>
        </div>

        {/* 3-Card Grid or Empty Broadcast Card */}
        {displayedSermons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {displayedSermons.map((sermon) => (
              <SermonCard
                key={sermon.id}
                sermon={sermon}
                onPlay={(s) => setActiveSermon(s)}
              />
            ))}
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

        {/* Centered All Sermons Button (only when sermons exist) */}
        {displayedSermons.length > 0 && (
          <div className="flex justify-center pt-2 sm:pt-4">
            <Button
              size="lg"
              className="rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold shadow-md shadow-orange-500/20 px-6 py-3 sm:px-8 sm:py-6 text-sm sm:text-base h-auto"
              asChild
            >
              <Link href="/sermons">
                View All Sermons &amp; Media
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
