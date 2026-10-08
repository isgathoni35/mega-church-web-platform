"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Building2,
  Phone,
  Mail,
  CreditCard,
  Save,
  CheckCircle2,
  AlertCircle,
  Copy,
  Database,
  Sparkles,
  Home,
  Hammer,
  Baby,
  Columns,
  BookOpen,
  Calendar,
  Plus,
  Trash2,
  Users,
  Compass,
  Camera,
  Video,
  Play,
  Radio,
  Upload,
  Link as LinkIcon,
  Loader2,
  Film,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  SiteSettingsData,
  MinistryEventItem,
  OrphanagePhotoItem,
  OrphanageVideoItem,
} from "@/types/settings";
import {
  saveSiteSettingsAction,
  getOrphanageVideoSignedUploadUrlAction,
  uploadChurchMediaAction,
} from "@/actions/admin-settings";
import { createClient } from "@/lib/supabase/client";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/utils/youtube";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SettingsManagerViewProps {
  initialSettings: SiteSettingsData;
}

type TabType = "hero" | "projects" | "orphanage" | "pillars" | "about" | "events" | "bank";

export function SettingsManagerView({ initialSettings }: SettingsManagerViewProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettingsData>(initialSettings);
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  // New Children's Home Photo State
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [newPhotoCategory, setNewPhotoCategory] = useState("Daily Life");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  // New Children's Home Video State
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoDescription, setNewVideoDescription] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoBadge, setNewVideoBadge] = useState("Daily Life Story");
  const [videoSourceType, setVideoSourceType] = useState<"upload" | "youtube">("upload");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>("");
  const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState<string>("");
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoUploadSuccess, setVideoUploadSuccess] = useState(false);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);

  const sqlCode = `-- Sugutta Fellowship Church - Comprehensive CMS, Media & Channel Migration
-- Run this in Supabase SQL Editor (SQL Editor -> New Query -> Run)

-- 1. Ensure table exists with UUID primary key
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Base Pastoral Profile & Identity
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_name TEXT NOT NULL DEFAULT 'Pastor Caesar O. Nyandwaro';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_title TEXT NOT NULL DEFAULT 'Resident Pastor & Visionary';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_image_url TEXT NOT NULL DEFAULT '/images/pastor-caesar.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_bio TEXT NOT NULL DEFAULT 'Called by God with an apostolic passion to set the captives free, build disciples through sound Biblical exposition, and lead Sugutta Fellowship Church into dynamic community transformation and global impact.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_national_id TEXT NOT NULL DEFAULT '39966005';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS church_motto TEXT NOT NULL DEFAULT 'REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS church_slogan TEXT NOT NULL DEFAULT 'Come. Connect. Grow. Go.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS postal_address TEXT NOT NULL DEFAULT 'P.O BOX 405-40211, SUGGUTTA';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS physical_location TEXT NOT NULL DEFAULT 'Sugutta Sanctuary, Kenya';

-- 3. Communication, Socials, YouTube & TopBar
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_phone TEXT NOT NULL DEFAULT '+254112656123';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_email TEXT NOT NULL DEFAULT 'sugutafellowshipchurch@gmail.com';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS facebook_url TEXT NOT NULL DEFAULT 'https://facebook.com/SUGGUTTA-FELLOWSHIP-CHURCH';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/suggutta';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS youtube_channel_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/@Brianmbera';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS topbar_live_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS topbar_live_label TEXT NOT NULL DEFAULT 'Watch Live Broadcast';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS topbar_live_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/@Brianmbera';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS topbar_announcement TEXT NOT NULL DEFAULT 'Sunday Service: 8:00 AM – 11:45 AM | Sanctuary & Online';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_photos_json JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_videos_json JSONB NOT NULL DEFAULT '[]'::jsonb;

-- 4. Banking & Remittance
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_till_number TEXT NOT NULL DEFAULT '8146952';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_till_name TEXT NOT NULL DEFAULT 'Suggutta Fellowship Church';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_account_number TEXT NOT NULL DEFAULT '1356891853';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_account_name TEXT NOT NULL DEFAULT 'Sugutta Fellowship church';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_branch TEXT NOT NULL DEFAULT 'Nairobi Central Branch';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_swift TEXT NOT NULL DEFAULT 'KCBLKENX';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_paybill TEXT NOT NULL DEFAULT '522522';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS western_union_recipient TEXT NOT NULL DEFAULT 'Caesar O. Nyandwaro';

-- 5. Hero & Branding
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_1 TEXT NOT NULL DEFAULT 'Sugutta';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_2 TEXT NOT NULL DEFAULT 'Fellowship';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_3 TEXT NOT NULL DEFAULT 'Church';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_subtitle TEXT NOT NULL DEFAULT 'We are a Christ-centered, Spirit-filled family learning to follow Jesus faithfully and carry His Gospel into everyday life.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_promise TEXT NOT NULL DEFAULT 'Experience God''s power through deliverance and spiritual transformation.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_image_url TEXT NOT NULL DEFAULT '/images/pastor-caesar-hero.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_branches TEXT NOT NULL DEFAULT '50+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_lives TEXT NOT NULL DEFAULT '1M+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_years TEXT NOT NULL DEFAULT '25+';

-- 6. Mission & Vision Statements
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mission_statement TEXT NOT NULL DEFAULT 'To win souls to Christ, disciple believers in sound biblical doctrine, break spiritual bondages through the power of the Holy Spirit, and raise an empowered community walking in holiness and divine covenant purpose.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS vision_statement TEXT NOT NULL DEFAULT 'To be an apostolic beacon of worship and spiritual awakening across Kenya and the nations, demonstrating Christ''s compassion, planting praying families, and advancing the Kingdom of God.';

-- 7. Twin Ongoing Projects
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_title TEXT NOT NULL DEFAULT 'Building a Permanent House of Prayer in Sugutta';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_subtitle TEXT NOT NULL DEFAULT 'Concrete foundation blocks, steel pillar reinforcement & roof trussing.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_narrative TEXT NOT NULL DEFAULT 'With five vibrant Sunday services and midweek teachings overflowing our temporary hall, our congregation is constructing a permanent sanctuary to shelter worshippers from the rains and house youth discipleship.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_image_url TEXT NOT NULL DEFAULT '/images/church-construction.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_badge TEXT NOT NULL DEFAULT 'Sanctuary Construction';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_title TEXT NOT NULL DEFAULT 'Sheltering & Sponsoring 50+ Vulnerable Children';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_subtitle TEXT NOT NULL DEFAULT 'Hot nutritious meals, quality education, medical care & parental love.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_narrative TEXT NOT NULL DEFAULT 'Putting faith into tangible action. Every day, our home feeds, clothes, and educates orphaned boys and girls in Sugutta. Sponsoring a child or sending food donations preserves a destiny and fulfills James 1:27.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_image_url TEXT NOT NULL DEFAULT '/images/orphanage-hero.png';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_badge TEXT NOT NULL DEFAULT 'Children''s Home Mission';

-- 8. Grassroots Community
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_title TEXT NOT NULL DEFAULT 'Rooted in Our Community, Walking Alongside Families';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_narrative TEXT NOT NULL DEFAULT 'True Christian ministry is never confined to sanctuary walls. In Sugutta and neighboring villages, our pastoral team and church workers meet regularly with village elders, struggling families, and young children in their homesteads.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_image_url TEXT NOT NULL DEFAULT '/images/community-outreach.jpg';

-- 9. 4 Ministry Pillars & Impact Counters
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_1_title TEXT NOT NULL DEFAULT 'Deliverance & Healing';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_1_desc TEXT NOT NULL DEFAULT 'Treading upon the works of darkness, breaking generational curses, casting out demonic afflictions, and witnessing total physical restoration through the authority of Jesus Christ.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_1_image TEXT NOT NULL DEFAULT '/images/ministry-healing.jpg';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_2_title TEXT NOT NULL DEFAULT 'Global Crusades';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_2_desc TEXT NOT NULL DEFAULT 'Conducting massive outdoor evangelistic campaigns, stadium crusades, and open-air meetings that gather hundreds of thousands to repent and accept the saving power of the Cross.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_2_image TEXT NOT NULL DEFAULT '/images/hero-worship.jpg';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_3_title TEXT NOT NULL DEFAULT 'Prophetic Word & Truth';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_3_desc TEXT NOT NULL DEFAULT 'Expositional teaching of the Holy Scriptures to equip the saints, ground believers in apostolic doctrine, and build resilient Christian families anchored in holiness.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_3_image TEXT NOT NULL DEFAULT '/images/ministry-healing.jpg';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_4_title TEXT NOT NULL DEFAULT 'Compassion & Outreach';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_4_desc TEXT NOT NULL DEFAULT 'Feeding the hungry, sheltering orphans, providing medical support, and clothing widows across underserved communities as an active demonstration of Christ''s compassion.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_4_image TEXT NOT NULL DEFAULT '/images/community-outreach.jpg';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_1_val TEXT NOT NULL DEFAULT '1,200+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_1_lbl TEXT NOT NULL DEFAULT 'Deliverance Sessions';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_2_val TEXT NOT NULL DEFAULT '50+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_2_lbl TEXT NOT NULL DEFAULT 'Miracle Crusades';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_3_val TEXT NOT NULL DEFAULT '1,000,000+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_3_lbl TEXT NOT NULL DEFAULT 'Believers Impacted';

-- 10. Dynamic Events Data
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS events_json JSONB NOT NULL DEFAULT '[]'::jsonb;

-- 11. Ensure at least one configuration row exists
INSERT INTO public.site_settings (id, youtube_channel_url, mpesa_till_number, mpesa_till_name, kcb_account_number, kcb_account_name)
SELECT gen_random_uuid(), 'https://www.youtube.com/@Brianmbera', '8146952', 'Suggutta Fellowship Church', '1356891853', 'Sugutta Fellowship church'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- 12. Update existing rows with accurate payment channels and YouTube
UPDATE public.site_settings
SET youtube_channel_url = 'https://www.youtube.com/@Brianmbera',
    mpesa_till_number = COALESCE(mpesa_till_number, '8146952'),
    mpesa_till_name = COALESCE(mpesa_till_name, 'Suggutta Fellowship Church'),
    kcb_account_number = '1356891853',
    kcb_account_name = 'Sugutta Fellowship church';`;



  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFeedback(null);

    startTransition(async () => {
      const res = await saveSiteSettingsAction(settings);
      if (res.success) {
        setFeedback({
          type: "success",
          message: res.message || "Site content, photos, and church details updated successfully across all pages!",
        });
        router.refresh();
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to update settings. Please run the SQL migration below in Supabase.",
        });
      }
    });
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [settings]);


  // Event Helpers
  const handleAddEvent = () => {
    const newEvent: MinistryEventItem = {
      id: `event-${Date.now()}`,
      badge: "MISSION 2026",
      title: "New Miracle Crusade & Deliverance Mission",
      location: settings.physicalLocation || "Sugutta Sanctuary, Kenya",
      dates: "Upcoming 2026",
      format: "In-Person & Live Broadcast",
      description: "Anointed gathering for deliverance, salvation, and kingdom fellowship.",
      imageUrl: "/images/hero-worship.jpg",
      whatsappMessage: `Hello ${settings.pastorName}, I would like to inquire about the upcoming church mission.`,
    };
    setSettings({
      ...settings,
      eventsJson: [newEvent, ...settings.eventsJson],
    });
  };

  const handleUpdateEvent = (idx: number, field: keyof MinistryEventItem, val: string) => {
    const updated = [...settings.eventsJson];
    updated[idx] = { ...updated[idx], [field]: val };
    setSettings({ ...settings, eventsJson: updated });
  };

  const handleDeleteEvent = (idx: number) => {
    const updated = settings.eventsJson.filter((_, i) => i !== idx);
    setSettings({ ...settings, eventsJson: updated });
  };

  // Children's Home Photo Helpers
  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim() || !newPhotoTitle.trim()) {
      alert("Please provide at least a photo image and a title.");
      return;
    }
    const newPhoto: OrphanagePhotoItem = {
      id: `photo-${Date.now()}`,
      title: newPhotoTitle.trim(),
      category: newPhotoCategory.trim() || "Daily Life",
      imageUrl: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || undefined,
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    setSettings({
      ...settings,
      orphanagePhotos: [newPhoto, ...settings.orphanagePhotos],
    });
    setNewPhotoTitle("");
    setNewPhotoCaption("");
    setNewPhotoUrl("");
  };

  const handleDeletePhoto = (id: string) => {
    setSettings({
      ...settings,
      orphanagePhotos: settings.orphanagePhotos.filter((p) => p.id !== id),
    });
  };

  // Children's Home Video Upload Handlers
  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert(`File "${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Max limit is 50MB. For larger videos, please use the YouTube URL tab.`);
      return;
    }

    setVideoFile(file);
    setIsUploadingVideo(true);
    setVideoUploadSuccess(false);

    try {
      // Strategy 1: Direct-to-Supabase Storage via Signed Upload URL (bypasses server body limits)
      const authRes = await getOrphanageVideoSignedUploadUrlAction(file.name, file.type, file.size);

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
          return;
        }

        console.warn("[Orphanage Video Direct Upload Warning]:", uploadError);
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
        setUploadedVideoUrl(apiData.data.url);
        setVideoUploadSuccess(true);
      } else {
        alert(apiData?.error || "Failed to upload video file.");
      }
    } catch (err: unknown) {
      console.error("[Orphanage Video Upload Error]:", err);
      alert("Network error during video upload. Please try again.");
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleThumbFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingThumb(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadChurchMediaAction(formData);
      if (res.success && res.data?.url) {
        setUploadedThumbnailUrl(res.data.url);
      } else {
        alert(res.error || "Failed to upload thumbnail.");
      }
    } catch (err: unknown) {
      console.error("[Orphanage Thumbnail Upload Error]:", err);
      alert("Error uploading thumbnail.");
    } finally {
      setIsUploadingThumb(false);
    }
  };

  const handleAddVideo = () => {
    const effectiveVideoUrl = videoSourceType === "upload" ? uploadedVideoUrl : newVideoUrl.trim();
    if (!effectiveVideoUrl) {
      alert(
        videoSourceType === "upload"
          ? "Please select and upload a video file first."
          : "Please enter a valid YouTube video URL."
      );
      return;
    }
    if (!newVideoTitle.trim()) {
      alert("Please provide a title for this video story.");
      return;
    }

    const newVideo: OrphanageVideoItem = {
      id: `video-${Date.now()}`,
      title: newVideoTitle.trim(),
      videoUrl: effectiveVideoUrl,
      youtubeUrl: videoSourceType === "youtube" ? effectiveVideoUrl : undefined,
      thumbnailUrl: uploadedThumbnailUrl || undefined,
      sourceType: videoSourceType,
      badge: newVideoBadge.trim() || "Daily Life Story",
      description: newVideoDescription.trim() || undefined,
      publishedDate: new Date().toISOString().split("T")[0],
    };

    setSettings({
      ...settings,
      orphanageVideos: [newVideo, ...settings.orphanageVideos],
    });

    // Reset video form state
    setNewVideoTitle("");
    setNewVideoDescription("");
    setNewVideoUrl("");
    setUploadedVideoUrl("");
    setUploadedThumbnailUrl("");
    setVideoFile(null);
    setVideoUploadSuccess(false);
  };

  const handleDeleteVideo = (id: string) => {
    setSettings({
      ...settings,
      orphanageVideos: settings.orphanageVideos.filter((v) => v.id !== id),
    });
  };

  const renderSaveSectionBar = (label = "Ready to publish your updates?") => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-orange-50/90 via-white to-amber-50/90 rounded-2xl sm:rounded-3xl border border-orange-200/90 shadow-sm mt-6">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-[#ff6b35] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
          <Save className="w-5 h-5" />
        </div>
        <div>
          <p className="font-extrabold text-slate-900 text-sm sm:text-base">{label}</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Click to save and instantly update this section across the live website.
          </p>
        </div>
      </div>
      <Button
        type="button"
        onClick={(e) => handleSave(e)}
        disabled={isPending}
        className="bg-[#ff6b35] hover:bg-[#ea580c] text-white font-black px-7 py-3 rounded-full shadow-lg shadow-orange-500/25 text-xs sm:text-sm h-auto flex items-center justify-center gap-2 border-0 shrink-0"
      >
        {isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Saving Changes...</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>Save &amp; Publish Changes</span>
          </>
        )}
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-6xl mx-auto pb-32">
      {/* Header and Save Action Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100/70 text-[#ff6b35] text-[11px] font-extrabold uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] animate-ping" />
            <span>Live Altar CMS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Site Content, Photos &amp; Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Modify headlines, photos, ongoing campaigns, pillars, and events without developer intervention. Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-700">Ctrl+S</kbd> to save anytime.
          </p>
        </div>

        <Button
          onClick={(e) => handleSave(e)}
          disabled={isPending}
          className="bg-[#ff6b35] hover:bg-[#ea580c] text-white font-black px-7 py-3.5 rounded-full shadow-lg shadow-orange-500/25 text-xs sm:text-sm h-auto flex items-center gap-2 border-0 shrink-0"
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save &amp; Publish Changes</span>
            </>
          )}
        </Button>
      </div>


      {/* Save Notification */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-start gap-3 border ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="text-xs sm:text-sm font-medium">
            <p className="font-bold">{feedback.type === "success" ? "Saved!" : "Error Saving"}</p>
            <p className="mt-0.5 leading-relaxed">{feedback.message}</p>
          </div>
        </div>
      )}

      {/* Visual Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto scrollbar-none w-full max-w-full">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "hero"
              ? "bg-white text-[#ff6b35] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home &amp; Hero</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "projects"
              ? "bg-white text-[#ff6b35] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Hammer className="w-4 h-4" />
          <span>Twin Projects</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("orphanage")}
          className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "orphanage"
              ? "bg-white text-[#ff6b35] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Baby className="w-4 h-4" />
          <span>Children&apos;s Home Media</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pillars")}
          className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "pillars"
              ? "bg-white text-[#ff6b35] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Columns className="w-4 h-4" />
          <span>Ministry Pillars</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("about")}
          className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "about"
              ? "bg-white text-[#ff6b35] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>About &amp; Community</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("events")}
          className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "events"
              ? "bg-white text-[#ff6b35] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events &amp; Crusades</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bank")}
          className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "bank"
              ? "bg-white text-[#ff6b35] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Banking &amp; Contacts</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ================= TAB 1: HERO & HOMEPAGE ================= */}
        {activeTab === "hero" && (
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff6b35]">
                Section 1 &bull; Landing View
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Homepage Hero Headline, Photos &amp; Stats
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Headline Line 1</label>
                <Input
                  value={settings.heroHeadline1}
                  onChange={(e) => setSettings({ ...settings, heroHeadline1: e.target.value })}
                  placeholder="Sugutta"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Headline Line 2 (Highlighted)</label>
                <Input
                  value={settings.heroHeadline2}
                  onChange={(e) => setSettings({ ...settings, heroHeadline2: e.target.value })}
                  placeholder="Fellowship"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Headline Line 3</label>
                <Input
                  value={settings.heroHeadline3}
                  onChange={(e) => setSettings({ ...settings, heroHeadline3: e.target.value })}
                  placeholder="Church"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Hero Subtitle / Statement</label>
              <Textarea
                rows={2}
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                placeholder="We are a Christ-centered, Spirit-filled family..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Pastoral Promise (Italic Subtext)</label>
              <Input
                value={settings.heroPromise}
                onChange={(e) => setSettings({ ...settings, heroPromise: e.target.value })}
                placeholder="Experience God's power through deliverance and spiritual transformation."
              />
            </div>

            {/* Hero Photo with Image Upload Field */}
            <ImageUploadField
              label="Hero Portrait Photo (Right Column)"
              description="Displays prominently on the right side of the homepage hero with curved corners and the floating nameplate card."
              value={settings.heroImageUrl}
              onChange={(url) => setSettings({ ...settings, heroImageUrl: url })}
              aspectRatio="portrait"
            />

            {/* Hero Counter Strip (Synchronized across Homepage & About Page) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Hero Stat Counters (Shared Across Homepage &amp; About Page)
                </h3>
                <span className="text-[10px] text-slate-500 font-medium">
                  Synchronizes instantly on Homepage &amp; About
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Stat 1: Lives Touched (e.g. 1M+)</label>
                  <Input
                    value={settings.heroStatLives}
                    onChange={(e) => setSettings({ ...settings, heroStatLives: e.target.value })}
                    placeholder="1M+"
                  />
                  <span className="text-[10px] text-slate-400 block">Displays as &quot;LIVES TOUCHED&quot;</span>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Stat 2: Years Ministry (e.g. 25+)</label>
                  <Input
                    value={settings.heroStatYears}
                    onChange={(e) => setSettings({ ...settings, heroStatYears: e.target.value })}
                    placeholder="25+"
                  />
                  <span className="text-[10px] text-slate-400 block">Displays as &quot;YEARS MINISTRY&quot;</span>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Stat 3: Extra Stat (Optional)</label>
                  <Input
                    value={settings.heroStatBranches}
                    onChange={(e) => setSettings({ ...settings, heroStatBranches: e.target.value })}
                    placeholder="Leave blank to hide"
                  />
                  <span className="text-[10px] text-slate-400 block">Leave blank for a clean 2-stat layout</span>
                </div>
              </div>
            </div>

            {/* Header Top Bar & Broadcast Controls */}
            <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/40 border border-orange-100 space-y-4 pt-3">
              <div className="flex items-center gap-2 border-b border-orange-200/60 pb-2.5">
                <Radio className="w-4 h-4 text-rose-600" />
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Header Top Bar &amp; Live Broadcast Alert
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Church Phone Number</label>
                  <Input
                    value={settings.mpesaPhone}
                    onChange={(e) => setSettings({ ...settings, mpesaPhone: e.target.value })}
                    placeholder="+254112656123"
                  />
                  <span className="text-[10px] text-slate-500 block">Displayed at the top left of every page.</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Official Church Email</label>
                  <Input
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    placeholder="sugutafellowshipchurch@gmail.com"
                  />
                  <span className="text-[10px] text-slate-500 block">Displayed next to phone in the top bar.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Top Bar Announcement / Service Schedule</label>
                  <Input
                    value={settings.topbarAnnouncement}
                    onChange={(e) => setSettings({ ...settings, topbarAnnouncement: e.target.value })}
                    placeholder="Sunday Service: 8:00 AM – 11:45 AM | Sanctuary & Online"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Live Broadcast Label</label>
                  <Input
                    value={settings.topbarLiveLabel}
                    onChange={(e) => setSettings({ ...settings, topbarLiveLabel: e.target.value })}
                    placeholder="Watch Live Broadcast"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Live Broadcast Destination URL</label>
                  <Input
                    value={settings.topbarLiveUrl}
                    onChange={(e) => setSettings({ ...settings, topbarLiveUrl: e.target.value })}
                    placeholder="https://www.youtube.com/@Brianmbera"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                  <div>
                    <label className="text-xs font-bold text-slate-900 block">Live Broadcast Alert Active</label>
                    <span className="text-[10px] text-slate-500">Pulsing red live badge on top bar</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, topbarLiveActive: !settings.topbarLiveActive })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.topbarLiveActive ? "bg-rose-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.topbarLiveActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {renderSaveSectionBar("Ready to update Homepage & Header?")}
          </div>
        )}


        {/* ================= TAB 2: TWIN ONGOING PROJECTS ================= */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {/* Project 1: Sanctuary Construction */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Hammer className="w-5 h-5 text-[#ff6b35]" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Project 1: Church Sanctuary Construction
                  </h3>
                  <p className="text-xs text-slate-500">
                    Controls the construction card on Section 6 of the homepage and giving portal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Project Title</label>
                  <Input
                    value={settings.constructionTitle}
                    onChange={(e) => setSettings({ ...settings, constructionTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Progress Highlights / Subtitle</label>
                  <Input
                    value={settings.constructionSubtitle}
                    onChange={(e) => setSettings({ ...settings, constructionSubtitle: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Construction Narrative</label>
                <Textarea
                  rows={3}
                  value={settings.constructionNarrative}
                  onChange={(e) => setSettings({ ...settings, constructionNarrative: e.target.value })}
                />
              </div>

              {/* Construction Photo Upload */}
              <ImageUploadField
                label="Sanctuary Construction Photo"
                description="Upload the latest building site photograph (foundation blocks, pillars, roofing) to keep well-wishers updated."
                value={settings.constructionImageUrl}
                onChange={(url) => setSettings({ ...settings, constructionImageUrl: url })}
                aspectRatio="video"
              />
            </div>

            {/* Project 2: Children's Home & Compassion */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Baby className="w-5 h-5 text-rose-600" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Project 2: Children&apos;s Home &amp; Compassion Mission
                  </h3>
                  <p className="text-xs text-slate-500">
                    Controls the children&apos;s home card on Section 6 of the homepage and giving portal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Mission Title</label>
                  <Input
                    value={settings.orphanageTitle}
                    onChange={(e) => setSettings({ ...settings, orphanageTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Care Highlights / Subtitle</label>
                  <Input
                    value={settings.orphanageSubtitle}
                    onChange={(e) => setSettings({ ...settings, orphanageSubtitle: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Children&apos;s Home Narrative</label>
                <Textarea
                  rows={3}
                  value={settings.orphanageNarrative}
                  onChange={(e) => setSettings({ ...settings, orphanageNarrative: e.target.value })}
                />
              </div>

              {/* Children's Home Photo Upload */}
              <ImageUploadField
                label="Children's Home Campus Photo"
                description="Featured photo of the home compound, children at study, or nutrition ministration."
                value={settings.orphanageImageUrl}
                onChange={(url) => setSettings({ ...settings, orphanageImageUrl: url })}
                aspectRatio="video"
              />
            </div>

            {renderSaveSectionBar("Ready to update Twin Projects?")}
          </div>
        )}


        {/* ================= TAB: CHILDREN'S HOME MEDIA ================= */}
        {activeTab === "orphanage" && (
          <div className="space-y-8">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-transparent p-6 rounded-3xl border border-rose-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Baby className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    Children&apos;s Home Photo &amp; Video Manager
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Post authentic photographs and YouTube video stories directly to the public Children&apos;s Home page (/orphanage).
                  </p>
                </div>
              </div>
            </div>

            {/* Photos Manager */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <Camera className="w-5 h-5 text-rose-600" />
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Photo Moments Gallery ({settings.orphanagePhotos.length} Photos)
                    </h3>
                    <p className="text-xs text-slate-500">
                      High-resolution photos showcasing daily meals, education, spiritual discipleship, and laughter.
                    </p>
                  </div>
                </div>
              </div>

              {/* Add New Photo Form */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-rose-600" />
                  <span>Add New Children&apos;s Home Photo</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Photo Title</label>
                    <Input
                      placeholder="e.g. Joyful Family Meals Together"
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Category / Tag</label>
                    <Input
                      placeholder="e.g. Nutrition & Meals, Education, Worship"
                      value={newPhotoCategory}
                      onChange={(e) => setNewPhotoCategory(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Caption / Brief Story (Optional)</label>
                  <Textarea
                    rows={2}
                    placeholder="Short description describing the moment, the children, and impact..."
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                  />
                </div>

                <ImageUploadField
                  label="Upload or Select Photo"
                  description="Upload a photo from your computer or paste an image URL."
                  value={newPhotoUrl}
                  onChange={(url) => setNewPhotoUrl(url)}
                  aspectRatio="video"
                />

                <Button
                  type="button"
                  onClick={handleAddPhoto}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo to Gallery</span>
                </Button>
              </div>

              {/* Existing Photos Grid */}
              {settings.orphanagePhotos.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-bold">No photos in the gallery yet.</p>
                  <p className="text-xs mt-1">Use the form above to add your first photo.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {settings.orphanagePhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col group"
                    >
                      <div className="relative aspect-video w-full bg-slate-200 overflow-hidden">
                        <Image
                          src={photo.imageUrl}
                          alt={photo.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                        <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {photo.category}
                        </span>
                      </div>
                      <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
                        <div>
                          <p className="text-xs font-black text-slate-900 line-clamp-1">{photo.title}</p>
                          {photo.caption && (
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{photo.caption}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {photo.uploadedAt || "Active"}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="text-rose-600 hover:bg-rose-50 h-7 px-2 text-xs font-bold"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            <span>Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Videos Manager */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <Video className="w-5 h-5 text-rose-600" />
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Video Stories &amp; Testimonies ({settings.orphanageVideos.length} Videos)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Upload video files directly from your device (MP4, WebM up to 50MB) or link YouTube videos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Add New Video Form */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-rose-600" />
                  <span>Add New Children&apos;s Home Video</span>
                </h4>

                {/* Video Ingestion Source Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Video Ingestion Source</label>
                  <div className="grid grid-cols-2 gap-2 bg-white p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setVideoSourceType("upload")}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        videoSourceType === "upload"
                          ? "bg-rose-600 text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Video File</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoSourceType("youtube")}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        videoSourceType === "youtube"
                          ? "bg-rose-600 text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>YouTube URL</span>
                    </button>
                  </div>
                </div>

                {/* Source Mode 1: Device File Upload */}
                {videoSourceType === "upload" && (
                  <div className="space-y-3 p-4 bg-white rounded-xl border border-rose-200/60">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>Select Video File (MP4, WebM, MOV)</span>
                        <span className="text-[10px] text-slate-400 font-normal">Max size: 50MB</span>
                      </label>
                      <div className="relative border-2 border-dashed border-slate-200 hover:border-rose-400 rounded-xl p-4 text-center transition-colors">
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime,video/x-m4v,video/*"
                          onChange={handleVideoFileChange}
                          disabled={isUploadingVideo}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                          {isUploadingVideo ? (
                            <>
                              <Loader2 className="w-7 h-7 text-rose-600 animate-spin" />
                              <p className="text-xs font-bold text-slate-700">Uploading video to storage...</p>
                              <p className="text-[10px] text-slate-400">Streaming directly to cloud storage. Please wait...</p>
                            </>
                          ) : videoUploadSuccess ? (
                            <>
                              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                              <p className="text-xs font-bold text-emerald-700">Video file uploaded successfully!</p>
                              <p className="text-[10px] text-slate-500 truncate max-w-xs">{videoFile?.name}</p>
                            </>
                          ) : (
                            <>
                              <Film className="w-7 h-7 text-slate-400" />
                              <p className="text-xs font-bold text-slate-700">Click or drag video file here</p>
                              <p className="text-[10px] text-slate-400">Supports standard video formats up to 50MB</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Optional Custom Thumbnail */}
                    <div className="space-y-1 pt-2 border-t border-slate-100">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>Custom Video Thumbnail (Optional)</span>
                        {uploadedThumbnailUrl && (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Thumbnail attached
                          </span>
                        )}
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleThumbFileChange}
                          disabled={isUploadingThumb}
                          className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                        />
                        {isUploadingThumb && <Loader2 className="w-4 h-4 text-rose-600 animate-spin" />}
                      </div>
                    </div>
                  </div>
                )}

                {/* Source Mode 2: YouTube URL */}
                {videoSourceType === "youtube" && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">YouTube Video URL</label>
                    <Input
                      placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                    />
                    <span className="text-[10px] text-slate-500 block">
                      Paste any standard YouTube watch link, share link, or short. The thumbnail is auto-fetched.
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Video Title</label>
                    <Input
                      placeholder="e.g. Life at the Home: Morning Devotion & Smiles"
                      value={newVideoTitle}
                      onChange={(e) => setNewVideoTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Badge / Tag</label>
                    <Input
                      placeholder="e.g. Daily Life Story, Testimonial, Impact Report"
                      value={newVideoBadge}
                      onChange={(e) => setNewVideoBadge(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Description (Optional)</label>
                  <Textarea
                    rows={2}
                    placeholder="Brief description of this video for donors and sponsors..."
                    value={newVideoDescription}
                    onChange={(e) => setNewVideoDescription(e.target.value)}
                  />
                </div>

                <Button
                  type="button"
                  onClick={handleAddVideo}
                  disabled={isUploadingVideo || isUploadingThumb}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Video Story</span>
                </Button>
              </div>

              {/* Existing Videos Grid */}
              {settings.orphanageVideos.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Video className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-bold">No video stories added yet.</p>
                  <p className="text-xs mt-1">Add videos from your device or YouTube using the form above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {settings.orphanageVideos.map((video) => {
                    const videoLink = video.videoUrl || video.youtubeUrl || "";
                    const ytId = getYouTubeId(videoLink);
                    const thumb = video.thumbnailUrl || (ytId ? getYouTubeThumbnail(ytId) : "/images/orphanage-hero.png");
                    const isDeviceUpload = video.sourceType === "upload" || !ytId;

                    return (
                      <div
                        key={video.id}
                        className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col group"
                      >
                        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                          {thumb ? (
                            <Image
                              src={thumb}
                              alt={video.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                              unoptimized
                            />
                          ) : (
                            <div className="text-slate-400 text-xs">Video Preview</div>
                          )}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 ml-0.5 fill-white" />
                            </div>
                          </div>
                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {video.badge && (
                              <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {video.badge}
                              </span>
                            )}
                            <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-sm ${
                              isDeviceUpload
                                ? "bg-emerald-600/90 text-white"
                                : "bg-red-600/90 text-white"
                            }`}>
                              {isDeviceUpload ? "Direct Video" : "YouTube"}
                            </span>
                          </div>
                        </div>
                        <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
                          <div>
                            <p className="text-xs font-black text-slate-900 line-clamp-1">{video.title}</p>
                            {video.description && (
                              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{video.description}</p>
                            )}
                            <p className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                              {videoLink}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                            <span className="text-[10px] text-slate-400 font-mono">
                              {video.publishedDate || "Ready"}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteVideo(video.id)}
                              className="text-rose-600 hover:bg-rose-50 h-7 px-2 text-xs font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" />
                              <span>Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {renderSaveSectionBar("Ready to publish Children's Home Photos & Videos?")}
          </div>
        )}


        {/* ================= TAB 3: MINISTRY PILLARS ================= */}
        {activeTab === "pillars" && (
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff6b35]">
                Section 3 &bull; Divine Mandate
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Our 4 Ministry Pillars &amp; Impact Counters
              </h2>
            </div>

            <div className="space-y-6">
              {/* Pillar 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Pillar 1: Deliverance &amp; Healing
                </h3>
                <Input
                  value={settings.pillar1Title}
                  onChange={(e) => setSettings({ ...settings, pillar1Title: e.target.value })}
                  placeholder="Title"
                />
                <Textarea
                  rows={2}
                  value={settings.pillar1Desc}
                  onChange={(e) => setSettings({ ...settings, pillar1Desc: e.target.value })}
                  placeholder="Description"
                />
                <ImageUploadField
                  label="Pillar 1 Image"
                  value={settings.pillar1Image}
                  onChange={(url) => setSettings({ ...settings, pillar1Image: url })}
                  aspectRatio="video"
                />
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Pillar 2: Global Crusades
                </h3>
                <Input
                  value={settings.pillar2Title}
                  onChange={(e) => setSettings({ ...settings, pillar2Title: e.target.value })}
                  placeholder="Title"
                />
                <Textarea
                  rows={2}
                  value={settings.pillar2Desc}
                  onChange={(e) => setSettings({ ...settings, pillar2Desc: e.target.value })}
                  placeholder="Description"
                />
                <ImageUploadField
                  label="Pillar 2 Image"
                  value={settings.pillar2Image}
                  onChange={(url) => setSettings({ ...settings, pillar2Image: url })}
                  aspectRatio="video"
                />
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Pillar 3: Prophetic Word &amp; Truth
                </h3>
                <Input
                  value={settings.pillar3Title}
                  onChange={(e) => setSettings({ ...settings, pillar3Title: e.target.value })}
                  placeholder="Title"
                />
                <Textarea
                  rows={2}
                  value={settings.pillar3Desc}
                  onChange={(e) => setSettings({ ...settings, pillar3Desc: e.target.value })}
                  placeholder="Description"
                />
                <ImageUploadField
                  label="Pillar 3 Image"
                  value={settings.pillar3Image}
                  onChange={(url) => setSettings({ ...settings, pillar3Image: url })}
                  aspectRatio="video"
                />
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Pillar 4: Compassion &amp; Outreach
                </h3>
                <Input
                  value={settings.pillar4Title}
                  onChange={(e) => setSettings({ ...settings, pillar4Title: e.target.value })}
                  placeholder="Title"
                />
                <Textarea
                  rows={2}
                  value={settings.pillar4Desc}
                  onChange={(e) => setSettings({ ...settings, pillar4Desc: e.target.value })}
                  placeholder="Description"
                />
                <ImageUploadField
                  label="Pillar 4 Image"
                  value={settings.pillar4Image}
                  onChange={(url) => setSettings({ ...settings, pillar4Image: url })}
                  aspectRatio="video"
                />
              </div>
            </div>

            {/* 3 Pillar Impact Counters */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Impact Counters (Below Pillars)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Stat 1 Value &amp; Label</label>
                  <Input
                    value={settings.impactStat1Val}
                    onChange={(e) => setSettings({ ...settings, impactStat1Val: e.target.value })}
                    className="mb-1"
                  />
                  <Input
                    value={settings.impactStat1Lbl}
                    onChange={(e) => setSettings({ ...settings, impactStat1Lbl: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Stat 2 Value &amp; Label</label>
                  <Input
                    value={settings.impactStat2Val}
                    onChange={(e) => setSettings({ ...settings, impactStat2Val: e.target.value })}
                    className="mb-1"
                  />
                  <Input
                    value={settings.impactStat2Lbl}
                    onChange={(e) => setSettings({ ...settings, impactStat2Lbl: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Stat 3 Value &amp; Label</label>
                  <Input
                    value={settings.impactStat3Val}
                    onChange={(e) => setSettings({ ...settings, impactStat3Val: e.target.value })}
                    className="mb-1"
                  />
                  <Input
                    value={settings.impactStat3Lbl}
                    onChange={(e) => setSettings({ ...settings, impactStat3Lbl: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {renderSaveSectionBar("Ready to update Ministry Pillars & Impact Stats?")}
          </div>
        )}


        {/* ================= TAB 4: ABOUT & COMMUNITY OUTREACH ================= */}
        {activeTab === "about" && (
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff6b35]">
                About Page &amp; Pastoral Calling
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Founder Story, Mission, Vision &amp; Grassroots Community
              </h2>
            </div>

            {/* Pastor Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Pastor Full Name</label>
                <Input
                  value={settings.pastorName}
                  onChange={(e) => setSettings({ ...settings, pastorName: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Pastor Official Title</label>
                <Input
                  value={settings.pastorTitle}
                  onChange={(e) => setSettings({ ...settings, pastorTitle: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Pastoral Bio &amp; Commission</label>
              <Textarea
                rows={3}
                value={settings.pastorBio}
                onChange={(e) => setSettings({ ...settings, pastorBio: e.target.value })}
              />
            </div>

            <ImageUploadField
              label="Pastor Caesar Portrait Photograph"
              description="Used in Founder Spotlight and on the About Page."
              value={settings.pastorImageUrl}
              onChange={(url) => setSettings({ ...settings, pastorImageUrl: url })}
              aspectRatio="portrait"
            />

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Church Mission Statement</label>
                <Textarea
                  rows={4}
                  value={settings.missionStatement}
                  onChange={(e) => setSettings({ ...settings, missionStatement: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Church Vision Statement</label>
                <Textarea
                  rows={4}
                  value={settings.visionStatement}
                  onChange={(e) => setSettings({ ...settings, visionStatement: e.target.value })}
                />
              </div>
            </div>

            {/* Grassroots Community & Elder Care */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ff6b35]" />
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Grassroots Community &amp; Elder Fellowship
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Section Title</label>
                <Input
                  value={settings.communityTitle}
                  onChange={(e) => setSettings({ ...settings, communityTitle: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Community Narrative</label>
                <Textarea
                  rows={3}
                  value={settings.communityNarrative}
                  onChange={(e) => setSettings({ ...settings, communityNarrative: e.target.value })}
                />
              </div>

              <ImageUploadField
                label="Grassroots Community Outreach Photo"
                description="Photograph of outdoor gathering with village elders, mothers, and children."
                value={settings.communityImageUrl}
                onChange={(url) => setSettings({ ...settings, communityImageUrl: url })}
                aspectRatio="video"
              />
            </div>

            {renderSaveSectionBar("Ready to update About & Community?")}
          </div>
        )}


        {/* ================= TAB 5: EVENTS & CRUSADES ================= */}
        {activeTab === "events" && (
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff6b35]">
                  Mission Calendar
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Upcoming Crusades, Keshas &amp; Retreats (/events)
                </h2>
              </div>

              <Button
                type="button"
                onClick={handleAddEvent}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Event</span>
              </Button>
            </div>

            {settings.eventsJson.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p className="text-sm font-bold">No upcoming events created.</p>
                <p className="text-xs mt-1">Click &quot;Add New Event&quot; above to create one.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {settings.eventsJson.map((event, idx) => (
                  <div
                    key={event.id || idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-700 uppercase">
                        Event #{idx + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(idx)}
                        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-8 px-2 text-xs font-bold"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        <span>Delete Event</span>
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">Event Title</label>
                        <Input
                          value={event.title}
                          onChange={(e) => handleUpdateEvent(idx, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">Category Badge (e.g. MISSION 2026)</label>
                        <Input
                          value={event.badge}
                          onChange={(e) => handleUpdateEvent(idx, "badge", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">Dates</label>
                        <Input
                          value={event.dates}
                          onChange={(e) => handleUpdateEvent(idx, "dates", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">Venue / Location</label>
                        <Input
                          value={event.location}
                          onChange={(e) => handleUpdateEvent(idx, "location", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">Format</label>
                        <Input
                          value={event.format}
                          onChange={(e) => handleUpdateEvent(idx, "format", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Event Description</label>
                      <Textarea
                        rows={2}
                        value={event.description}
                        onChange={(e) => handleUpdateEvent(idx, "description", e.target.value)}
                      />
                    </div>

                    <ImageUploadField
                      label="Event Flyer / Poster Image"
                      value={event.imageUrl}
                      onChange={(url) => handleUpdateEvent(idx, "imageUrl", url)}
                      aspectRatio="video"
                    />
                  </div>
                ))}
              </div>
            )}

            {renderSaveSectionBar("Ready to update Upcoming Mission Events?")}
          </div>
        )}


        {/* ================= TAB 6: BANKING & CONTACTS ================= */}
        {activeTab === "bank" && (
          <div className="space-y-6">
            {/* Identity & Location */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Church Identity &amp; Physical Coordinates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Church Motto</label>
                  <Input
                    value={settings.churchMotto}
                    onChange={(e) => setSettings({ ...settings, churchMotto: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Church Slogan</label>
                  <Input
                    value={settings.churchSlogan}
                    onChange={(e) => setSettings({ ...settings, churchSlogan: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Postal Address</label>
                  <Input
                    value={settings.postalAddress}
                    onChange={(e) => setSettings({ ...settings, postalAddress: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Physical Sanctuary Location</label>
                  <Input
                    value={settings.physicalLocation}
                    onChange={(e) => setSettings({ ...settings, physicalLocation: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Kenya Banking & Remittance */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Giving Channels &amp; Remittance Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">M-Pesa Buy Goods Till Number</label>
                  <Input
                    value={settings.mpesaTillNumber}
                    onChange={(e) => setSettings({ ...settings, mpesaTillNumber: e.target.value })}
                    placeholder="8146952"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Zero customer transaction fee Safaricom Till number.
                  </span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">M-Pesa Registered Till Name</label>
                  <Input
                    value={settings.mpesaTillName}
                    onChange={(e) => setSettings({ ...settings, mpesaTillName: e.target.value })}
                    placeholder="Suggutta Fellowship Church"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Official business name displayed upon PIN confirmation.
                  </span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Pastor Send Money Phone Line</label>
                  <Input
                    value={settings.mpesaPhone}
                    onChange={(e) => setSettings({ ...settings, mpesaPhone: e.target.value })}
                    placeholder="+254112656123"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Direct altar pastoral line used for Send Money &amp; Sendwave.
                  </span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">KCB Bank Account Number</label>
                  <Input
                    value={settings.kcbAccountNumber}
                    onChange={(e) => setSettings({ ...settings, kcbAccountNumber: e.target.value })}
                    placeholder="1356891853"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Kenya Commercial Bank deposit and international wire account.
                  </span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">KCB Account Name</label>
                  <Input
                    value={settings.kcbAccountName}
                    onChange={(e) => setSettings({ ...settings, kcbAccountName: e.target.value })}
                    placeholder="Sugutta Fellowship church"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">KCB Branch</label>
                  <Input
                    value={settings.kcbBranch}
                    onChange={(e) => setSettings({ ...settings, kcbBranch: e.target.value })}
                    placeholder="Nairobi Central Branch"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">KCB SWIFT Code</label>
                  <Input
                    value={settings.kcbSwift}
                    onChange={(e) => setSettings({ ...settings, kcbSwift: e.target.value })}
                    placeholder="KCBLKENX"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">M-Pesa to KCB Deposit Paybill (Optional)</label>
                  <Input
                    value={settings.mpesaPaybill}
                    onChange={(e) => setSettings({ ...settings, mpesaPaybill: e.target.value })}
                    placeholder="522522"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    KCB Paybill number (522522) for M-Pesa account deposits.
                  </span>
                </div>
              </div>
            </div>

            {/* Socials and Contacts */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Communications &amp; Social Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Official General Church Email</label>
                  <Input
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    placeholder="sugutafellowshipchurch@gmail.com"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Universal church contact email displayed in top bar, website footer, and contact/giving forms.
                  </span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Facebook Page URL</label>
                  <Input
                    value={settings.facebookUrl}
                    onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Instagram Handle / URL</label>
                  <Input
                    value={settings.instagramUrl}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Official YouTube Channel URL</label>
                  <Input
                    value={settings.youtubeChannelUrl}
                    onChange={(e) => setSettings({ ...settings, youtubeChannelUrl: e.target.value })}
                    placeholder="https://www.youtube.com/@Brianmbera"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Your official church YouTube channel for live streaming, recordings, and subscriber growth.
                  </span>
                </div>
              </div>
            </div>

            {/* Top Bar, Live Broadcast & Announcements */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Radio className="w-5 h-5 text-rose-600" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Header Top Bar &amp; Live Broadcast Alert
                  </h3>
                  <p className="text-xs text-slate-500">
                    Controls the very top thin banner showing live broadcast status, pastoral phone, email, and schedule.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900">Live Broadcast Alert Active</label>
                    <button
                      type="button"
                      onClick={() => setSettings({ ...settings, topbarLiveActive: !settings.topbarLiveActive })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.topbarLiveActive ? "bg-rose-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.topbarLiveActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    When active, a pulsing red indicator and clickable broadcast badge appear in the top bar.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Live Broadcast Label</label>
                  <Input
                    value={settings.topbarLiveLabel}
                    onChange={(e) => setSettings({ ...settings, topbarLiveLabel: e.target.value })}
                    placeholder="Watch Live Broadcast"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Live Broadcast URL</label>
                  <Input
                    value={settings.topbarLiveUrl}
                    onChange={(e) => setSettings({ ...settings, topbarLiveUrl: e.target.value })}
                    placeholder="https://www.youtube.com/@Brianmbera"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Direct live stream URL or official YouTube channel URL.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Top Bar Announcement / Service Schedule</label>
                  <Input
                    value={settings.topbarAnnouncement}
                    onChange={(e) => setSettings({ ...settings, topbarAnnouncement: e.target.value })}
                    placeholder="Sunday Service: 8:00 AM – 11:45 AM | Sanctuary & Online"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Displays in the center of the top bar on desktop and tablets.
                  </span>
                </div>
              </div>
            </div>

            {renderSaveSectionBar("Ready to update Banking & Contact Channels?")}
          </div>
        )}
      </form>

      {/* Database Synchronization SQL Accordion */}
      <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-orange-400" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Supabase Database Schema Snippet
              </h3>
              <p className="text-xs text-slate-400">
                If Supabase reports missing columns, paste this snippet in Supabase SQL Editor.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopySql}
            className="border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-xl flex items-center gap-1.5"
          >
            {copiedSql ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy SQL Query</span>
              </>
            )}
          </Button>
        </div>

        <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-48">
          {sqlCode}
        </pre>
      </div>

      {/* Persistent Floating Bottom Save Bar (Always Visible On-Screen) */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 sm:px-8 py-3.5 shadow-[0_-8px_25px_rgba(0,0,0,0.09)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <div className="hidden sm:block">
            <span className="text-xs font-bold text-slate-900 block">CMS Live Publishing Hub</span>
            <span className="text-[11px] text-slate-500 block">All modifications immediately update the live public website</span>
          </div>
          <span className="text-xs font-bold text-slate-800 sm:hidden">Ready to publish</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={(e) => handleSave(e)}
            disabled={isPending}
            className="bg-[#ff6b35] hover:bg-[#ea580c] text-white font-black px-6 sm:px-8 py-3 rounded-full shadow-lg shadow-orange-500/25 text-xs sm:text-sm h-auto flex items-center gap-2 border-0"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save &amp; Publish All Changes</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
