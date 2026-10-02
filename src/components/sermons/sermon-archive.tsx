"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, BookOpen, Video } from "lucide-react";
import { Sermon, SermonCategory } from "@/types/database.types";
import { SermonCard } from "@/components/sermons/sermon-card";
import { VideoModal } from "@/components/sermons/video-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories: Array<"All Sermons" | SermonCategory> = [
  "All Sermons",
  "Sunday Worship",
  "Monday Inspiration",
  "Wednesday Bible Study",
  "Crusade & Deliverance",
];

interface SermonArchiveProps {
  initialSermons: Sermon[];
}

export function SermonArchive({ initialSermons }: SermonArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Sermons");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalSermon, setActiveModalSermon] = useState<Sermon | null>(null);

  const filteredSermons = useMemo(() => {
    return initialSermons.filter((sermon) => {
      const matchesCategory =
        selectedCategory === "All Sermons" ||
        sermon.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        sermon.title.toLowerCase().includes(q) ||
        sermon.speaker.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialSermons, selectedCategory, searchQuery]);

  return (
    <section className="w-full py-16 px-4 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
              <BookOpen className="h-4 w-4" />
              <span>Media Archive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Sermons &amp; Prophetic Teachings
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Immerse yourself in anointed teachings, past miracle services, and
              apostolic revelations to empower your faith and walk with God.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by title or speaker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-card text-foreground border-border focus:ring-accent"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-md scale-105"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sermons Grid */}
        {filteredSermons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((sermon) => (
              <SermonCard
                key={sermon.id}
                sermon={sermon}
                onPlay={(s) => setActiveModalSermon(s)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-border bg-card/50">
            <div className="h-16 w-16 rounded-full bg-accent/20 text-accent flex items-center justify-center">
              <Video className="h-8 w-8" />
            </div>
            <div className="space-y-1 max-w-md">
              <h3 className="text-lg font-bold text-foreground">
                No Sermons Found
              </h3>
              <p className="text-sm text-muted-foreground">
                No messages matched your search criteria for &ldquo;
                {searchQuery || selectedCategory}&rdquo;. Try another keyword or reset the filter.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("All Sermons");
                setSearchQuery("");
              }}
              className="mt-2 text-accent border-accent/40 hover:bg-accent/10"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Video Player Modal */}
        <VideoModal
          sermon={activeModalSermon}
          isOpen={!!activeModalSermon}
          onClose={() => setActiveModalSermon(null)}
        />
      </div>
    </section>
  );
}
