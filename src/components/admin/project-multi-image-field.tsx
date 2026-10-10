"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Plus,
  Loader2,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  X,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadChurchMediaAction } from "@/actions/admin-settings";
import { extractCleanImageUrl } from "@/lib/utils";

interface LibraryPreset {
  label: string;
  path: string;
  category: string;
}

const CHURCH_LIBRARY_PRESETS: LibraryPreset[] = [
  { label: "Sanctuary Construction Site", path: "/images/church-construction.jpg", category: "Projects" },
  { label: "Children's Home Campus", path: "/images/orphanage-hero.png", category: "Compassion" },
  { label: "Community Outreach", path: "/images/community-outreach.jpg", category: "Community" },
  { label: "Outdoor Crusade Worship", path: "/images/hero-worship.jpg", category: "Crusades" },
  { label: "Deliverance & Healing Altar", path: "/images/ministry-healing.jpg", category: "Altar" },
  { label: "Pastor Caesar (Pulpit Hero)", path: "/images/pastor-caesar-hero.jpg", category: "Leadership" },
];

interface ProjectMultiImageFieldProps {
  label?: string;
  description?: string;
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ProjectMultiImageField({
  label = "Project Photo Gallery (Up to 5 Photos)",
  description = "Upload up to 5 photos. On the homepage, they will smoothly auto-transition and visitors can swipe through them.",
  images,
  onChange,
  maxImages = 5,
}: ProjectMultiImageFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const safeImages = Array.isArray(images)
    ? images.filter(Boolean)
    : [];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - safeImages.length;
    if (remainingSlots <= 0) {
      setUploadError(`Maximum of ${maxImages} photos reached. Remove a photo to upload more.`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    setIsUploading(true);
    setUploadError(null);

    const uploadedUrls: string[] = [];

    for (const file of filesToUpload) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await uploadChurchMediaAction(formData);
        if (res.success && res.data?.url) {
          uploadedUrls.push(res.data.url);
        } else {
          setUploadError(res.error || "Failed to upload one or more photos.");
        }
      } catch (err) {
        console.error("Upload error:", err);
        setUploadError("Network error while uploading photo.");
      }
    }

    setIsUploading(false);

    if (uploadedUrls.length > 0) {
      const updated = [...safeImages, ...uploadedUrls].slice(0, maxImages);
      onChange(updated);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = safeImages.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMoveImage = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= safeImages.length) return;

    const updated = [...safeImages];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  const handleAddPreset = (path: string) => {
    if (safeImages.length >= maxImages) {
      setUploadError(`Maximum of ${maxImages} photos reached.`);
      return;
    }
    const updated = [...safeImages, path];
    onChange(updated);
    setShowPresets(false);
  };

  const handleAddManualUrl = () => {
    if (!urlInput.trim()) return;
    const clean = extractCleanImageUrl(urlInput.trim());
    if (!clean) {
      setUploadError("Invalid image URL provided.");
      return;
    }
    if (safeImages.length >= maxImages) {
      setUploadError(`Maximum of ${maxImages} photos reached.`);
      return;
    }
    onChange([...safeImages, clean]);
    setUrlInput("");
    setShowManualUrl(false);
  };

  return (
    <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-800">{label}</label>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                safeImages.length >= maxImages
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : "bg-orange-100 text-[#ea580c] border border-orange-200"
              }`}
            >
              {safeImages.length} / {maxImages}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {safeImages.length < maxImages && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowPresets(!showPresets)}
                className="text-xs h-8 px-2.5 rounded-lg border-slate-300 text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5"
              >
                <FolderOpen className="w-3.5 h-3.5 text-orange-500" />
                <span>Presets</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowManualUrl(!showManualUrl)}
                className="text-xs h-8 px-2.5 rounded-lg border-slate-300 text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>Add URL</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-rose-500 hover:text-rose-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Preset selector dropdown */}
      {showPresets && (
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Choose from Church Photo Library:</span>
            <button
              type="button"
              onClick={() => setShowPresets(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CHURCH_LIBRARY_PRESETS.map((preset) => (
              <button
                key={preset.path}
                type="button"
                onClick={() => handleAddPreset(preset.path)}
                className="p-2 rounded-lg border border-slate-200 hover:border-orange-400 hover:bg-orange-50/50 text-left transition-all group"
              >
                <span className="text-[11px] font-semibold text-slate-800 block truncate group-hover:text-orange-600">
                  {preset.label}
                </span>
                <span className="text-[9px] text-slate-400 block">{preset.category}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Manual URL Input */}
      {showManualUrl && (
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Paste Image URL:</span>
            <button
              type="button"
              onClick={() => setShowManualUrl(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://... or /images/..."
              className="text-xs h-8"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleAddManualUrl}
              className="bg-[#ff6b35] hover:bg-[#ea580c] text-white text-xs h-8 px-3"
            >
              Add
            </Button>
          </div>
        </div>
      )}

      {/* Photos Grid & Upload Dropzone */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {safeImages.map((imgUrl, index) => (
          <div
            key={`${imgUrl}-${index}`}
            className="group relative rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-900 aspect-[16/9] shadow-sm flex flex-col justify-between"
          >
            <Image
              src={imgUrl}
              alt={`Project photo #${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Top Badge: Slot number & Cover indicator */}
            <div className="relative z-10 p-1.5 flex items-center justify-between">
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  index === 0
                    ? "bg-[#ff6b35] text-white shadow-sm"
                    : "bg-black/60 text-white"
                }`}
              >
                {index === 0 ? "★ Cover" : `#${index + 1}`}
              </span>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="w-5 h-5 rounded-full bg-rose-600/90 text-white flex items-center justify-center hover:bg-rose-700 transition-colors shadow-sm"
                title="Remove photo"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>

            {/* Bottom Controls: Reorder Left / Right */}
            <div className="relative z-10 p-1.5 flex items-center justify-between">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => handleMoveImage(index, "left")}
                className={`w-5 h-5 rounded bg-black/60 text-white flex items-center justify-center transition-opacity ${
                  index === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-black/90 cursor-pointer"
                }`}
                title="Move left (make earlier)"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>

              <button
                type="button"
                disabled={index === safeImages.length - 1}
                onClick={() => handleMoveImage(index, "right")}
                className={`w-5 h-5 rounded bg-black/60 text-white flex items-center justify-center transition-opacity ${
                  index === safeImages.length - 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-black/90 cursor-pointer"
                }`}
                title="Move right (make later)"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty slot / Upload trigger if under maxImages */}
        {safeImages.length < maxImages && (
          <label
            className={`border-2 border-dashed border-slate-300 hover:border-orange-400 bg-white hover:bg-orange-50/40 rounded-xl aspect-[16/9] flex flex-col items-center justify-center cursor-pointer transition-all p-2 text-center group ${
              isUploading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 text-orange-500 animate-spin mb-1" />
                <span className="text-[10px] font-bold text-slate-500">Uploading...</span>
              </>
            ) : (
              <>
                <div className="w-7 h-7 rounded-full bg-orange-100 text-[#ff6b35] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 group-hover:text-orange-600 leading-tight">
                  Upload Photo
                </span>
                <span className="text-[9px] text-slate-400">
                  {maxImages - safeImages.length} slot{maxImages - safeImages.length > 1 ? "s" : ""} left
                </span>
              </>
            )}
          </label>
        )}
      </div>

      <p className="text-[10px] text-slate-400">
        💡 The first photo (★ Cover) is used as the default preview and fallback across the site. Reorder photos with the arrows.
      </p>
    </div>
  );
}
