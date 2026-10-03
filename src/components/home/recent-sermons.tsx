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
        <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-widest">
            <Video className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Media &amp; Broadcasts</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight">
            Latest Sermons &amp; Teachings
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Stream powerful life-changing messages, prophetic declarations, and miraculous deliverance services from anywhere in the world.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayedSermons.map((sermon) => (
            <SermonCard
              key={sermon.id}
              sermon={sermon}
              onPlay={(s) => setActiveSermon(s)}
            />
          ))}
        </div>

        {/* Centered All Sermons Button matching Neno */}
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
