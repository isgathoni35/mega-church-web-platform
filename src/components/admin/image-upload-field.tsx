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
    <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/90">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs sm:text-sm font-bold text-slate-900 block">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPresets(!showPresets)}
            className="text-[11px] h-7 px-2.5 rounded-lg border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center gap-1"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#ff6b35]" />
            <span>Library Presets</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="text-[11px] h-7 px-2.5 rounded-lg bg-[#ff6b35] hover:bg-[#ea580c] text-white flex items-center gap-1 border-0 shadow-sm"
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
        <div className="p-3 bg-white rounded-xl border border-orange-200 shadow-lg space-y-2 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
              Select an Authentic Church Asset
            </span>
            <button
              type="button"
              onClick={() => setShowPresets(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CHURCH_LIBRARY_PRESETS.map((preset) => (
              <button
                key={preset.path}
                type="button"
                onClick={() => handlePresetSelect(preset.path)}
                className={`flex flex-col text-left p-1.5 rounded-lg border transition-all ${
                  value === preset.path
                    ? "border-[#ff6b35] bg-orange-50/50 shadow-sm ring-1 ring-[#ff6b35]"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="relative aspect-video w-full rounded overflow-hidden bg-slate-900 mb-1">
                  <Image
                    src={preset.path}
                    alt={preset.label}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                  {value === preset.path && (
                    <div className="absolute inset-0 bg-[#ff6b35]/40 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white drop-shadow" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-800 truncate block">
                  {preset.label}
                </span>
                <span className="text-[9px] text-slate-400 font-medium">
                  {preset.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Preview and URL Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Thumbnail Preview Container */}
        <div
          className={`relative rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-900 shrink-0 w-full ${aspectClass}`}
        >
          {value && !imageError ? (
            <Image
              src={value}
              alt={label}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="200px"
              unoptimized
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-2 text-center">
              <ImageIcon className="w-6 h-6 mb-1 text-slate-500" />
              <span className="text-[10px]">
                {imageError ? "Image preview unavailable (Check URL)" : "No image set"}
              </span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center text-white p-2">
              <Loader2 className="w-6 h-6 animate-spin text-[#ff6b35] mb-1" />
              <span className="text-[10px] font-bold">Uploading...</span>
            </div>
          )}
        </div>

        {/* URL Input & Direct Actions */}
        <div className="flex-1 w-full space-y-2">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <LinkIcon className="w-3 h-3 text-slate-400" />
              <span>Image Path / Public URL:</span>
            </label>
            <Input
              type="text"
              value={manualInput}
              onChange={(e) => handleManualChange(e.target.value)}
              onBlur={handleManualBlur}
              placeholder="/images/example.jpg or https://..."
              className="h-8 text-xs font-mono bg-white border-slate-200"
            />
          </div>

          <p className="text-[10px] text-slate-400">
            Tip: You can click <strong>Upload Photo</strong> to upload directly from your device, or paste any external image / Google link above.
          </p>

          {uploadError && (
            <p className="text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-2">
              ⚠️ {uploadError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

