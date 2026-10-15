"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  Check,
  Loader2,
  FolderOpen,
  Link as LinkIcon,
  X,
  AlertCircle,
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
  { label: "Pastor Caesar (Pulpit Hero)", path: "/images/pastor-caesar-hero.jpg", category: "Leadership" },
  { label: "Pastor Caesar (Portrait)", path: "/images/pastor-caesar.jpg", category: "Leadership" },
  { label: "Sanctuary Construction Site", path: "/images/church-construction.jpg", category: "Projects" },
  { label: "Community Outreach (Elders & Children)", path: "/images/community-outreach.jpg", category: "Community" },
  { label: "Children's Home Campus", path: "/images/orphanage-hero.png", category: "Compassion" },
  { label: "Outdoor Crusade Worship", path: "/images/hero-worship.jpg", category: "Crusades" },
  { label: "Deliverance & Healing Altar", path: "/images/ministry-healing.jpg", category: "Altar" },
  { label: "Official Church Seal Emblem", path: "/images/sugutta-logo.png", category: "Identity" },
];

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
  aspectRatio?: "square" | "video" | "portrait";
}


export function ImageUploadField({
  label,
  value,
  onChange,
  description,
  aspectRatio = "video",
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [manualInput, setManualInput] = useState(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setManualInput(value || "");
    setImageError(false);
  }, [value]);

  const aspectClass =
    aspectRatio === "portrait"
      ? "aspect-[3/4] max-w-[200px]"
      : aspectRatio === "square"
      ? "aspect-square max-w-[200px]"
      : "aspect-[16/9] max-w-sm";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadChurchMediaAction(formData);
    setIsUploading(false);

    if (res.success && res.data?.url) {
      onChange(res.data.url);
      setManualInput(res.data.url);
    } else {
      setUploadError(res.error || "Failed to upload image. Please try again.");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePresetSelect = (path: string) => {
    onChange(path);
    setManualInput(path);
    setShowPresets(false);
  };

  const handleManualChange = (val: string) => {
    setManualInput(val);
    const cleaned = extractCleanImageUrl(val);
    if (cleaned) {
      onChange(cleaned);
    }
  };

  const handleManualBlur = () => {
    const cleaned = extractCleanImageUrl(manualInput);
    setManualInput(cleaned);
    onChange(cleaned);
  };

  return (
    <div className="space-y-3.5 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-orange-200 transition-all">
      {/* Header with Title, Description, and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <label className="text-xs sm:text-sm font-extrabold text-slate-900 block tracking-tight">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPresets(!showPresets)}
            className="text-xs h-8 px-3 rounded-xl border-slate-200 bg-white hover:bg-orange-50 hover:text-[#ff6b35] text-slate-700 flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#ff6b35]" />
            <span>Library Presets</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="text-xs h-8 px-3.5 rounded-xl bg-[#ff6b35] hover:bg-[#ea580c] text-white flex items-center gap-1.5 border-0 shadow-sm shadow-orange-500/20 font-bold transition-all"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
              </>
            )}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
        </div>
      </div>

      {/* Preset Picker Dropdown Drawer */}
      {showPresets && (
        <div className="p-3.5 bg-white rounded-2xl border border-orange-200/90 shadow-xl space-y-2.5 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff6b35]" />
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                Select an Authentic Church Media Asset
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowPresets(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CHURCH_LIBRARY_PRESETS.map((preset) => (
              <button
                key={preset.path}
                type="button"
                onClick={() => handlePresetSelect(preset.path)}
                className={`flex flex-col text-left p-1.5 rounded-xl border transition-all ${
                  value === preset.path
                    ? "border-[#ff6b35] bg-orange-50/60 shadow-xs ring-2 ring-[#ff6b35]/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-900 mb-1.5">
                  <Image
                    src={preset.path}
                    alt={preset.label}
                    fill
                    className="object-cover"
                    sizes="140px"
                  />
                  {value === preset.path && (
                    <div className="absolute inset-0 bg-[#ff6b35]/40 backdrop-blur-[1px] flex items-center justify-center">
                      <Check className="w-5 h-5 text-white drop-shadow" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-extrabold text-slate-800 truncate block">
                  {preset.label}
                </span>
                <span className="text-[9px] text-[#ff6b35] font-bold">
                  {preset.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Preview and URL Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
        {/* Thumbnail Preview Container */}
        <div
          className={`relative rounded-2xl overflow-hidden border-2 border-slate-200/90 shadow-xs bg-slate-950 shrink-0 w-full sm:w-auto ${aspectClass}`}
        >
          {value && !imageError ? (
            <Image
              src={value}
              alt={label}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="200px"
              unoptimized
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-3 text-center bg-slate-900">
              <ImageIcon className="w-6 h-6 mb-1 text-slate-500" />
              <span className="text-[10px] font-medium">
                {imageError ? "Preview unavailable (Check URL)" : "No image selected"}
              </span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-white p-2">
              <Loader2 className="w-6 h-6 animate-spin text-[#ff6b35] mb-1" />
              <span className="text-[10px] font-bold">Uploading to CDN...</span>
            </div>
          )}
        </div>

        {/* URL Input & Direct Actions */}
        <div className="flex-1 w-full space-y-2">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <LinkIcon className="w-3 h-3 text-[#ff6b35]" />
                <span>Image Path / Public URL:</span>
              </span>
              {value && (
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Active Asset
                </span>
              )}
            </label>
            <Input
              type="text"
              value={manualInput}
              onChange={(e) => handleManualChange(e.target.value)}
              onBlur={handleManualBlur}
              placeholder="/images/example.jpg or https://..."
              className="h-9 text-xs font-mono bg-white border-slate-200 text-slate-900 focus:border-[#ff6b35] focus:ring-[#ff6b35]"
            />
          </div>

          <p className="text-[10px] text-slate-400 leading-normal">
            Upload from your device, choose from Church Presets, or paste any direct CDN URL.
          </p>

          {uploadError && (
            <p className="text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-2.5 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>{uploadError}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

