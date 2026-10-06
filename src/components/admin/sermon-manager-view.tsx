"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PlusCircle,
  Video,
  Radio,
  Trash2,
  ExternalLink,
  Check,
  AlertCircle,
  Sparkles,
  Calendar,
  User,
  Tv,
} from "lucide-react";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/utils/youtube";
import {
  addSermonAction,
  toggleLiveSermonAction,
  deleteSermonAction,
} from "@/actions/admin-sermons";
import { Sermon, SermonCategory } from "@/types/database.types";

interface SermonManagerViewProps {
  initialSermons: Sermon[];
  youtubeChannelUrl?: string;
}


const CATEGORIES: SermonCategory[] = [
  "Sunday Worship",
  "Monday Inspiration",
  "Wednesday Bible Study",
  "Crusade & Deliverance",
  "Sunday Service",
  "Midweek Service",
  "Revival & Deliverance",
  "Youth Service",
  "Worship Night",
  "Shorts",
];

export function SermonManagerView({
  initialSermons,
  youtubeChannelUrl,
}: SermonManagerViewProps) {
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons);

  const [isPending, startTransition] = useTransition();

  // Form State
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [category, setCategory] = useState<SermonCategory>(CATEGORIES[0]);
  const [speaker, setSpeaker] = useState("Pastor Caesar O. Nyandwaro");

  const [datePreached, setDatePreached] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLive, setIsLive] = useState(false);

  // Status feedback
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Computed preview
  const videoId = getYouTubeId(youtubeUrl);
  const previewThumbnail = videoId ? getYouTubeThumbnail(videoId) : null;

  const handleAddSermon = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const res = await addSermonAction({
        title,
        youtubeUrl,
        category,
        speaker,
        datePreached,
        isFeatured,
        isLive,
      });

      if (res.success) {
        setMessage({ text: "Sermon successfully added and published live!", type: "success" });
        // Reset form
        setTitle("");
        setYoutubeUrl("");
        setIsFeatured(false);
        setIsLive(false);

        // Optimistically update list
        if (res.data?.id) {
          const newSermon: Sermon = {
            id: res.data.id,
            title,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            speaker,
            youtube_url: youtubeUrl,
            thumbnail_url: previewThumbnail,
            category,
            is_featured: isFeatured,
            is_live: isLive,
            date_preached: datePreached,
            created_at: new Date().toISOString(),
          };
          setSermons((prev) => [newSermon, ...prev]);
        }
      } else {
        setMessage({ text: res.error || "Failed to add sermon.", type: "error" });
      }
    });
  };

  const handleToggleLive = (sermonId: string, currentLive: boolean) => {
    startTransition(async () => {
      await toggleLiveSermonAction(sermonId, !currentLive);
      setSermons((prev) =>
        prev.map((s) => ({
          ...s,
          is_live: s.id === sermonId ? !currentLive : false,
        }))
      );
    });
  };

  const handleDelete = (sermonId: string) => {
    if (!confirm("Are you sure you want to delete this sermon from the public website?")) {
      return;
    }

    startTransition(async () => {
      const res = await deleteSermonAction(sermonId);
      if (res.success) {
        setSermons((prev) => prev.filter((s) => s.id !== sermonId));
      }
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2240] tracking-tight">
          Sermons &amp; YouTube Media Manager
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Publish YouTube sermons, shorts, and toggle Sunday live broadcast coverage.
        </p>
      </div>

      {/* Official YouTube Channel Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-50/80 via-white to-orange-50/80 border border-red-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">Official Church YouTube Channel</span>
            <span className="text-xs text-slate-500 block truncate max-w-md">
              {youtubeChannelUrl || "https://www.youtube.com/@Brianmbera"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={youtubeChannelUrl || "https://www.youtube.com/@Brianmbera"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Visit Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <Link
            href="/admin/settings"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Edit Channel URL</span>
          </Link>
        </div>
      </div>


      {message && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Grid: Left = Add Form, Right = Library Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= 1. ADD SERMON FORM (5 cols) ================= */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <PlusCircle className="w-5 h-5 text-[#ff6b35]" />
            <h3 className="font-extrabold text-base text-slate-900">
              Add New Video to Library
            </h3>
          </div>

          <form onSubmit={handleAddSermon} className="space-y-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Sermon / Video Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Walking in Divine Overflow and Covenant Power"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#C59B27] focus:outline-none"
              />
            </div>

            {/* YouTube URL */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                YouTube URL (Standard Video or Shorts) *
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#C59B27] focus:outline-none font-mono"
              />
            </div>

            {/* Live YouTube Thumbnail Preview */}
            {previewThumbnail && (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Automated YouTube Thumbnail Detected:
                </span>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm bg-black">
                  <Image
                    src={previewThumbnail}
                    alt="YouTube Video Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                    ID: {videoId}
                  </div>
                </div>
              </div>
            )}

            {/* Category Dropdown */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SermonCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#C59B27] focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Speaker & Date Preached Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Speaker
                </label>
                <input
                  type="text"
                  value={speaker}
                  onChange={(e) => setSpeaker(e.target.value)}
                  placeholder="Pastor Caesar O. Nyandwaro"

                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-[#C59B27] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Date Preached
                </label>
                <input
                  type="date"
                  value={datePreached}
                  onChange={(e) => setDatePreached(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-[#C59B27] focus:outline-none"
                />
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="pt-2 space-y-2.5 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#ff6b35] focus:ring-[#ff6b35]"
                />
                <span className="font-semibold">Feature as Hero Video on /sermons page</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-red-700 select-none">
                <input
                  type="checkbox"
                  checked={isLive}
                  onChange={(e) => setIsLive(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-600"
                />
                <span className="font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5" />
                  <span>Set as Active LIVE Sunday Broadcast Now</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-6 rounded-xl bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-orange-500/20 disabled:opacity-50"
            >
              {isPending ? "Saving to Database..." : "Publish Sermon to Website"}
            </button>
          </form>
        </div>

        {/* ================= 2. SERMON LIBRARY LIST (7 cols) ================= */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-base text-slate-900">
              Published Video Library ({sermons.length})
            </h3>
            <span className="text-xs text-slate-500">Live Supabase Database</span>
          </div>

          <div className="space-y-3">
            {sermons.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs">
                No sermons found in database. Add your first video using the form on the left.
              </div>
            ) : (
              sermons.map((sermon) => {
                const sVideoId = getYouTubeId(sermon.youtube_url);
                const sThumbnail =
                  sermon.thumbnail_url ||
                  (sVideoId ? getYouTubeThumbnail(sVideoId) : "/images/hero-apostle.png");

                return (
                  <div
                    key={sermon.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Thumbnail & Meta */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-slate-200">
                        <Image
                          src={sThumbnail}
                          alt={sermon.title}
                          fill
                          className="object-cover"
                        />
                        {sermon.is_live && (
                          <div className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
                            LIVE
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {sermon.category}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {sermon.date_preached}
                          </span>
                        </div>

                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {sermon.title}
                        </h4>

                        <span className="text-[11px] text-slate-500 block truncate">
                          Speaker: {sermon.speaker}
                        </span>
                      </div>
                    </div>

                    {/* Actions: Live Toggle & Delete */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleLive(sermon.id, sermon.is_live || false)}
                        disabled={isPending}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                          sermon.is_live
                            ? "bg-red-600 text-white shadow-sm shadow-red-500/30"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                        title="Toggle live broadcast"
                      >
                        <Radio className="w-3 h-3" />
                        <span>{sermon.is_live ? "Live Now" : "Set Live"}</span>
                      </button>

                      <a
                        href={sermon.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title="Open on YouTube"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDelete(sermon.id)}
                        disabled={isPending}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Sermon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
