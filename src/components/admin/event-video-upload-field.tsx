"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Video,
  Link as LinkIcon,
  X,
  Loader2,
  CheckCircle2,
  Film,
  Play,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getEventVideoSignedUploadUrlAction } from "@/actions/admin-settings";
import { createClient } from "@/lib/supabase/client";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/utils/youtube";

interface EventVideoUploadFieldProps {
  label?: string;
  description?: string;
  videoUrl?: string;
  videoSourceType?: "upload" | "youtube";
  onChange: (videoUrl: string, videoSourceType: "upload" | "youtube") => void;
}

export function EventVideoUploadField({
  label = "Event Promo / Crusade Video Clip",
  description = "Attach an outdoor crusade promo clip or recap video (MP4/WebM up to 50MB, or YouTube URL).",
  videoUrl = "",
  videoSourceType,
  onChange,
}: EventVideoUploadFieldProps) {
  const initialSourceType =
    videoSourceType ||
    (videoUrl && (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be"))
      ? "youtube"
      : "upload");

  const [activeSource, setActiveSource] = useState<"upload" | "youtube">(initialSourceType);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [youtubeInput, setYoutubeInput] = useState(
    initialSourceType === "youtube" ? videoUrl : ""
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isYouTube = videoUrl && (videoUrl.includes("youtube") || videoUrl.includes("youtu.be"));
  const ytId = isYouTube ? getYouTubeId(videoUrl) : null;

  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_SIZE) {
      setUploadError(
        `File "${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Max limit is 50MB. For larger videos, please use the YouTube link option.`
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);

    try {
      // Strategy 1: Direct-to-Supabase Storage via signed URL
      const authRes = await getEventVideoSignedUploadUrlAction(
        file.name,
        file.type,
        file.size
      );

      if (authRes.success && authRes.data) {
        const { token, path, publicUrl } = authRes.data;
        const supabase = createClient();

        const { error: uploadErr } = await supabase.storage
          .from("church-media")
          .uploadToSignedUrl(path, token, file);

        if (!uploadErr) {
          onChange(publicUrl, "upload");
          setIsUploading(false);
          return;
        }

        console.warn("[Event Video Signed Upload Error]:", uploadErr);
      }

      // Strategy 2: Dedicated streaming Route Handler fallback
      const formData = new FormData();
      formData.append("file", file);

      const apiRes = await fetch("/api/admin/sermons/upload", {
        method: "POST",
        body: formData,
      });

      const apiData = await apiRes.json();
      if (apiRes.ok && apiData.success && apiData.data?.url) {
        onChange(apiData.data.url, "upload");
      } else {
        setUploadError(apiData?.error || "Failed to upload video file.");
      }
    } catch (err: unknown) {
      console.error("[Event Video Upload Exception]:", err);
      setUploadError("Network error during video upload. Please check your connection.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleYouTubeSubmit = (url: string) => {
    setYoutubeInput(url);
    const trimmed = url.trim();
    if (!trimmed) {
      onChange("", "youtube");
      return;
    }
    onChange(trimmed, "youtube");
  };

  const handleRemoveVideo = () => {
    setYoutubeInput("");
    setUploadError(null);
    onChange("", "upload");
  };

  return (
    <div className="space-y-3 p-4 bg-slate-50/70 border border-slate-200 rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Film className="w-4 h-4 text-[#ff6b35]" />
            <span>{label}</span>
          </label>
          {description && (
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{description}</p>
          )}
        </div>

        {/* Source Mode Switcher */}
        <div className="inline-flex items-center p-1 bg-slate-200/80 rounded-xl gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setActiveSource("upload")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
              activeSource === "upload"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Device Upload</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSource("youtube")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
              activeSource === "youtube"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>YouTube URL</span>
          </button>
        </div>
      </div>

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-between">
          <span>{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-rose-500 hover:text-rose-800 ml-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Source 1: Device Video Upload */}
      {activeSource === "upload" && (
        <div className="space-y-2">
          <div className="relative border-2 border-dashed border-slate-300 hover:border-[#ff6b35] rounded-xl p-4 text-center transition-colors bg-white">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-m4v,video/*"
              onChange={handleVideoFileChange}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
              {isUploading ? (
                <>
                  <Loader2 className="w-6 h-6 text-[#ff6b35] animate-spin" />
                  <p className="text-xs font-bold text-slate-800">
                    Streaming video to cloud storage...
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Bypassing payload limits. Please wait...
                  </p>
                </>
              ) : videoUrl && !isYouTube ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <p className="text-xs font-bold text-emerald-700">Video File Attached</p>
                  <p className="text-[10px] text-slate-500 truncate max-w-sm">{videoUrl}</p>
                </>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-400" />
                  <p className="text-xs font-bold text-slate-700">
                    Click or drag video file here (MP4, WebM, MOV)
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Direct streaming upload up to 50MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Source 2: YouTube URL Input */}
      {activeSource === "youtube" && (
        <div className="space-y-1.5">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              value={youtubeInput}
              onChange={(e) => handleYouTubeSubmit(e.target.value)}
              className="bg-white text-xs h-9"
            />
            {youtubeInput && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleYouTubeSubmit("")}
                className="h-9 px-2 text-xs text-slate-500"
              >
                Clear
              </Button>
            )}
          </div>
          <p className="text-[10px] text-slate-400">
            Paste any standard YouTube video URL, short link, or live stream replay.
          </p>
        </div>
      )}

      {/* Video Attached Preview Bar */}
      {videoUrl && (
        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">
                {isYouTube ? "YouTube Video Linked" : "Video File Uploaded"}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveVideo}
              className="h-7 px-2 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              <span>Detach Video</span>
            </Button>
          </div>

          {/* Preview Element */}
          {isYouTube && ytId ? (
            <div className="relative aspect-video max-h-40 w-full max-w-sm rounded-lg overflow-hidden bg-slate-900 mx-auto">
              <Image
                src={getYouTubeThumbnail(ytId)}
                alt="YouTube Preview"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 ml-0.5 fill-white" />
                </div>
              </div>
            </div>
          ) : !isYouTube && videoUrl ? (
            <div className="max-w-md mx-auto">
              <video
                src={videoUrl}
                controls
                playsInline
                className="w-full max-h-44 rounded-lg bg-black object-contain shadow-sm"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
