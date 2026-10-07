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
    <section className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-slate-200/80 pb-4 sm:pb-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#ff6b35]">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Media Archive</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sermons &amp; Prophetic Teachings
            </h2>
            <p className="text-xs sm:text-base text-slate-600 max-w-xl">
              Immerse yourself in anointed teachings, past miracle services, and
              apostolic revelations to empower your faith and walk with God.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by title or speaker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 sm:h-11 bg-white text-slate-900 border-slate-200 focus:border-[#ff6b35] focus:ring-[#ff6b35] rounded-xl text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20 scale-105"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sermons Grid */}
        {filteredSermons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
          <div className="py-10 sm:py-20 text-center flex flex-col items-center justify-center space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-6">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-orange-100 text-[#ff6b35] flex items-center justify-center">
              <Video className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div className="space-y-1 max-w-md">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {initialSermons.length === 0 ? "Broadcast Archive Preparing" : "No Sermons Found"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {initialSermons.length === 0
                  ? "Our media ministry is actively preparing the next sermon broadcast series. Subscribe to our official YouTube channel or join our weekly sanctuary services."
                  : `No messages matched your search criteria for "${searchQuery || selectedCategory}". Try another keyword or reset the filter.`}
              </p>
            </div>
            {initialSermons.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("All Sermons");
                  setSearchQuery("");
                }}
                className="mt-2 text-[#ff6b35] border-orange-200 hover:bg-orange-50 hover:text-[#ff6b35] rounded-xl text-xs"
              >
                Reset Filters
              </Button>
            )}
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
