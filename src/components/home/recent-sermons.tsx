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
    <section className="w-full py-20 px-4 sm:px-8 bg-secondary/50 border-t border-b border-border/60">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
              <Video className="h-3.5 w-3.5 text-accent" />
              <span>Media &amp; Broadcasts</span>
            </div>

            <span className="font-script text-accent text-3xl sm:text-4xl block font-normal">
              Tune into the Anointing
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              Latest Sermons &amp; Teachings
            </h2>

            <p className="text-base text-muted-foreground max-w-xl">
              Watch recent Sunday celebrations, prophetic Monday inspiration, and
              midweek Bible studies from any corner of the globe.
            </p>
          </div>

          <Button
            variant="default"
            size="lg"
            className="font-bold shadow-md hover:bg-primary/90 shrink-0"
            asChild
          >
            <Link href="/sermons">
              View All Sermons
              <ArrowRight className="ml-2 h-4 w-4 text-accent" />
            </Link>
          </Button>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedSermons.map((sermon) => (
            <SermonCard
              key={sermon.id}
              sermon={sermon}
              onPlay={(s) => setActiveSermon(s)}
            />
          ))}
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
