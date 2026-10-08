"use client";

import React, { useState, useTransition, useRef } from "react";
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
  Upload,
  Link as LinkIcon,
  Pin,
  Film,
  CheckCircle2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/utils/youtube";
import { createClient } from "@/lib/supabase/client";
import {
  addSermonAction,
  toggleLiveSermonAction,
  toggleFeaturedSermonAction,
  deleteSermonAction,
  getSermonVideoSignedUploadUrlAction,
  uploadSermonVideoAction,
  uploadSermonThumbnailAction,
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

  // Mode: "upload" (direct video file) vs "youtube" (YouTube or external URL)
  const [mediaSource, setMediaSource] = useState<"upload" | "youtube">("upload");

  // Form State
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
  const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState("");
  const [category, setCategory] = useState<SermonCategory>(CATEGORIES[0]);
  const [speaker, setSpeaker] = useState("Pastor Caesar O. Nyandwaro");
  const [datePreached, setDatePreached] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLive, setIsLive] = useState(false);

  // File Upload State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoUploadSuccess, setVideoUploadSuccess] = useState(false);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);

  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const thumbFileInputRef = useRef<HTMLInputElement>(null);

  // Status feedback
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Computed YouTube preview
  const videoId = getYouTubeId(youtubeUrl);
  const previewThumbnail = videoId ? getYouTubeThumbnail(videoId) : null;

  // Handle Video File Selection & Multi-strategy Upload (Direct signed upload + route handler fallback)
  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setMessage({
        text: `File "${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Max limit is 50MB. For larger videos, please use the YouTube URL tab.`,
        type: "error",
      });
      return;
    }

    setVideoFile(file);
    setIsUploadingVideo(true);
    setVideoUploadSuccess(false);
    setMessage(null);

    try {
      // Strategy 1: Direct-to-Supabase Storage via Signed Upload URL
      // This completely bypasses server payload limits (1MB in Server Actions & 4.5MB on Vercel)
      const authRes = await getSermonVideoSignedUploadUrlAction(file.name, file.type, file.size);

      if (authRes.success && authRes.data) {
        const { token, path, publicUrl } = authRes.data;
        const supabase = createClient();

        const { error: uploadError } = await supabase.storage
          .from("church-media")
          .uploadToSignedUrl(path, token, file);

        if (!uploadError) {
          setUploadedVideoUrl(publicUrl);
          setVideoUploadSuccess(true);
          setIsUploadingVideo(false);
          setMessage({ text: "Video file successfully uploaded and ready to publish!", type: "success" });
          return;
        }

        console.warn("[Direct Upload Warning]: Direct signed upload failed, attempting route fallback:", uploadError);
      }

      // Strategy 2: Dedicated streaming Route Handler fallback (/api/admin/sermons/upload)
      const formData = new FormData();
      formData.append("file", file);

      const apiRes = await fetch("/api/admin/sermons/upload", {
        method: "POST",
        body: formData,
      });

      const apiData = await apiRes.json();
      if (apiRes.ok && apiData.success && apiData.data?.url) {
        setUploadedVideoUrl(apiData.data.url);
        setVideoUploadSuccess(true);
        setIsUploadingVideo(false);
        setMessage({ text: "Video file successfully uploaded and ready to publish!", type: "success" });
        return;
      }

      // Strategy 3: Server Action fallback
      const actionRes = await uploadSermonVideoAction(formData);
      setIsUploadingVideo(false);

      if (actionRes.success && actionRes.data?.url) {
        setUploadedVideoUrl(actionRes.data.url);
        setVideoUploadSuccess(true);
        setMessage({ text: "Video file successfully uploaded and ready to publish!", type: "success" });
      } else {
        setMessage({
          text: apiData?.error || actionRes.error || "Failed to upload video file.",
          type: "error",
        });
      }
    } catch (err: unknown) {
      console.error("[Video Upload Error]:", err);
      setIsUploadingVideo(false);
      setMessage({
        text: "Network error during video upload. Please try again.",
        type: "error",
      });
    }
  };

  // Handle Optional Custom Thumbnail Selection & Upload
  const handleThumbFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingThumb(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadSermonThumbnailAction(formData);
    setIsUploadingThumb(false);

    if (res.success && res.data?.url) {
      setUploadedThumbnailUrl(res.data.url);
      setMessage({ text: "Custom video thumbnail uploaded!", type: "success" });
    } else {
      setMessage({ text: res.error || "Failed to upload thumbnail.", type: "error" });
    }
  };

  // Submit Handler
  const handleAddSermon = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const effectiveVideoUrl = mediaSource === "upload" ? uploadedVideoUrl : youtubeUrl;

    if (!effectiveVideoUrl) {
      setMessage({
        text: mediaSource === "upload"
          ? "Please select and upload a video file first."
          : "Please enter a valid YouTube video URL.",
        type: "error",
      });
      return;
    }

    startTransition(async () => {
      const res = await addSermonAction({
        title,
        videoUrl: effectiveVideoUrl,
        thumbnailUrl: uploadedThumbnailUrl || (videoId ? getYouTubeThumbnail(videoId) : undefined),
        category,
        speaker,
        datePreached,
        isFeatured,
        isLive,
      });

      if (res.success) {
        setMessage({ text: "Sermon successfully published to the website library!", type: "success" });

        // Reset form
        setTitle("");
        setYoutubeUrl("");
        setUploadedVideoUrl("");
        setUploadedThumbnailUrl("");
        setVideoFile(null);
        setVideoUploadSuccess(false);
        setIsFeatured(false);
        setIsLive(false);

        if (videoFileInputRef.current) videoFileInputRef.current.value = "";
        if (thumbFileInputRef.current) thumbFileInputRef.current.value = "";

        // Optimistically update list
        if (res.data?.id) {
          const newSermon: Sermon = {
            id: res.data.id,
            title,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            speaker,
            youtube_url: effectiveVideoUrl,
            thumbnail_url: uploadedThumbnailUrl || (videoId ? getYouTubeThumbnail(videoId) : "/images/pastor-caesar-hero.jpg"),
            category,
            is_featured: isFeatured,
            is_live: isLive,
            date_preached: datePreached,
            created_at: new Date().toISOString(),
          };

          setSermons((prev) => {
            const updated = isFeatured
              ? prev.map((s) => ({ ...s, is_featured: false }))
              : prev;
            return [newSermon, ...updated];
          });
        }
      } else {
        setMessage({ text: res.error || "Failed to add sermon.", type: "error" });
      }
    });
  };

  // Toggle Live Broadcast
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

  // Toggle Pinned / Hero Video
  const handleToggleFeatured = (sermonId: string, currentFeatured: boolean) => {
    startTransition(async () => {
      await toggleFeaturedSermonAction(sermonId, !currentFeatured);
      setSermons((prev) =>
        prev.map((s) => ({
          ...s,
          is_featured: s.id === sermonId ? !currentFeatured : false,
        }))
      );
    });
  };

  // Delete Sermon
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
          Sermons &amp; Media Management Hub
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Upload video files directly from your phone/computer, or paste YouTube links. Control pinned hero videos and live broadcasts.
        </p>
      </div>

      {/* Official YouTube Channel Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-50/80 via-white to-orange-50/80 border border-red-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
              Official YouTube Broadcast Altar
            </span>
            <span className="text-sm font-extrabold text-slate-900 block">
              {youtubeChannelUrl ? youtubeChannelUrl.replace("https://www.youtube.com/", "") : "@Brianmbera"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={youtubeChannelUrl || "https://www.youtube.com/@Brianmbera"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-500/25"
          >
            <span>Visit Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Status Feedback Message */}
      {message && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
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

          {/* Media Mode Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setMediaSource("upload")}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                mediaSource === "upload"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-[#ff6b35]" />
              <span>Upload Video File</span>
            </button>

            <button
              type="button"
              onClick={() => setMediaSource("youtube")}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                mediaSource === "youtube"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5 text-red-600" />
              <span>YouTube / Link</span>
            </button>
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

            {/* TAB 1: DIRECT VIDEO UPLOAD */}
            {mediaSource === "upload" && (
              <div className="space-y-3 p-4 rounded-2xl bg-orange-50/40 border border-orange-200/80">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Select Video File (MP4, WebM, MOV) *
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">Max 50MB</span>
                </div>

                <input
                  type="file"
                  ref={videoFileInputRef}
                  accept="video/mp4,video/webm,video/quicktime,video/*"
                  onChange={handleVideoFileChange}
                  className="hidden"
                  id="sermon-video-upload"
                />

                <label
                  htmlFor="sermon-video-upload"
                  className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center ${
                    uploadedVideoUrl
                      ? "border-emerald-300 bg-emerald-50/50"
                      : isUploadingVideo
                      ? "border-orange-300 bg-white"
                      : "border-slate-300 hover:border-[#ff6b35] bg-white hover:bg-slate-50"
                  }`}
                >
                  {isUploadingVideo ? (
                    <div className="flex flex-col items-center gap-2 py-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#ff6b35]" />
                      <span className="text-xs font-bold text-slate-800">Uploading Video File to Storage...</span>
                      <span className="text-[11px] text-slate-500">Please do not refresh the page.</span>
                    </div>
                  ) : uploadedVideoUrl ? (
                    <div className="flex flex-col items-center gap-1.5 py-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-emerald-800 truncate max-w-[280px]">
                        {videoFile?.name || "Video File Uploaded"}
                      </span>
                      <span className="text-[10px] text-emerald-600">Click to replace with a different video</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 py-2">
                      <div className="w-9 h-9 rounded-2xl bg-orange-100 text-[#ff6b35] flex items-center justify-center">
                        <Film className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        Click to Choose Video from Device
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Supports MP4, WebM, MOV files
                      </span>
                    </div>
                  )}
                </label>

                {/* Optional Custom Poster Thumbnail for Uploaded Video */}
                <div className="pt-2 border-t border-orange-200/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">
                      Optional Poster Thumbnail Image
                    </span>
                    <span className="text-[10px] text-slate-400">JPEG, PNG, WebP</span>
                  </div>

                  <input
                    type="file"
                    ref={thumbFileInputRef}
                    accept="image/*"
                    onChange={handleThumbFileChange}
                    className="hidden"
                    id="sermon-thumb-upload"
                  />

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="sermon-thumb-upload"
                      className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#ff6b35]" />
                      <span>{isUploadingThumb ? "Uploading..." : uploadedThumbnailUrl ? "Change Poster" : "Upload Poster Image"}</span>
                    </label>

                    {uploadedThumbnailUrl && (
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Poster Set
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: YOUTUBE / EXTERNAL URL */}
            {mediaSource === "youtube" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    YouTube URL (Standard Video or Shorts) *
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
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

            {/* Checkbox Options (Explicit Pinning) */}
            <div className="pt-2 space-y-2.5 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#ff6b35] focus:ring-[#ff6b35]"
                />
                <span className="font-bold flex items-center gap-1.5">
                  <Pin className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>Pin as Featured Hero Video on /sermons page</span>
                </span>
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
              disabled={isPending || isUploadingVideo || isUploadingThumb}
              className="w-full py-3 px-6 rounded-xl bg-[#ff6b35] hover:bg-[#e05626] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <span>Publish Video to Website</span>
              )}
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
                  (sVideoId ? getYouTubeThumbnail(sVideoId) : "/images/pastor-caesar-hero.jpg");

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
                        {!sermon.is_live && sermon.is_featured && (
                          <div className="absolute top-1 left-1 bg-[#ff6b35] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Pin className="w-2.5 h-2.5 fill-current" />
                            HERO
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

                    {/* Actions: Pin Toggle, Live Toggle & Delete */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {/* Explicit Hero Pin Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(sermon.id, sermon.is_featured || false)}
                        disabled={isPending}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                          sermon.is_featured
                            ? "bg-[#ff6b35] text-white shadow-sm shadow-orange-500/30"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                        title={sermon.is_featured ? "Currently Pinned as Hero on /sermons (Click to unpin)" : "Pin as Hero on /sermons"}
                      >
                        <Pin className={`w-3 h-3 ${sermon.is_featured ? "fill-current" : ""}`} />
                        <span>{sermon.is_featured ? "Pinned" : "Pin Hero"}</span>
                      </button>

                      {/* Live Toggle */}
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

                      {/* Open Video */}
                      <a
                        href={sermon.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title="Open video"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      {/* Delete */}
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
