"use client";

import React, { useState, useTransition, useEffect, useRef } from "react";
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
  Eye,
  EyeOff,
  Layers,
  Pencil,
  X,
  ChevronDown,
  ChevronUp,
  Landmark,
  ShieldCheck,
  ChevronRight,
  Sliders,
  HeartHandshake,
  Maximize2,
  Globe,
} from "lucide-react";
import {
  SiteSettingsData,
  MinistryEventItem,
  MinistryProjectItem,
  OrphanagePhotoItem,
  OrphanageVideoItem,
  DEFAULT_SETTINGS,
} from "@/types/settings";
import {
  saveSiteSettingsAction,
  saveProjectsAction,
  saveEventsAction,
  getOrphanageVideoSignedUploadUrlAction,
  uploadChurchMediaAction,
  addOrphanagePhotoAction,
  deleteOrphanagePhotoAction,
  updateOrphanagePhotoAction,
  addOrphanageVideoAction,
  deleteOrphanageVideoAction,
  updateOrphanageVideoAction,
} from "@/actions/admin-settings";
import { createClient } from "@/lib/supabase/client";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { ProjectMultiImageField } from "@/components/admin/project-multi-image-field";
import { EventVideoUploadField } from "@/components/admin/event-video-upload-field";
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
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState<string>(
    initialSettings ? JSON.stringify(initialSettings) : ""
  );
  const hasUnsavedChanges = lastSavedSnapshot !== "" && JSON.stringify(settings) !== lastSavedSnapshot;

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
      setLastSavedSnapshot(JSON.stringify(initialSettings));
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

  const sqlCode = `-- Suggutta Fellowship Church - Comprehensive CMS, Media & Channel Migration
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
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_bio TEXT NOT NULL DEFAULT 'Called by God with an apostolic passion to set the captives free, build disciples through sound Biblical exposition, and lead Suggutta Fellowship Church into dynamic community transformation and global impact.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_national_id TEXT NOT NULL DEFAULT '39966005';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS church_motto TEXT NOT NULL DEFAULT 'REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS church_slogan TEXT NOT NULL DEFAULT 'Come. Connect. Grow. Go.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS postal_address TEXT NOT NULL DEFAULT 'P.O BOX 405-40211, SUGGUTTA';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS physical_location TEXT NOT NULL DEFAULT 'Suggutta Sanctuary, Kenya';

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
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_till_name TEXT NOT NULL DEFAULT 'SUGGUTTA FELLOWSHIP CHURCH';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_account_number TEXT NOT NULL DEFAULT '1356891853';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_account_name TEXT NOT NULL DEFAULT 'SUGGUTTA FELLOWSHIP CHURCH';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_branch TEXT NOT NULL DEFAULT 'Nairobi Central Branch';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_swift TEXT NOT NULL DEFAULT 'KCBLKENX';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_paybill TEXT NOT NULL DEFAULT '522533';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_paybill_account TEXT NOT NULL DEFAULT '8146952';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_paybill_name TEXT NOT NULL DEFAULT 'SUGGUTTA FELLOWSHIP CHURCH';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS western_union_recipient TEXT NOT NULL DEFAULT 'Caesar O. Nyandwaro';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_till_qr_image TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_paybill_qr_image TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_bank_qr_image TEXT;

-- 5. Hero & Branding
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_1 TEXT NOT NULL DEFAULT 'Suggutta';
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

-- 7. Ongoing Projects & Children's Home
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_title TEXT NOT NULL DEFAULT 'Building a Permanent House of Prayer in Suggutta';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_subtitle TEXT NOT NULL DEFAULT 'Concrete foundation blocks, steel pillar reinforcement & roof trussing.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_narrative TEXT NOT NULL DEFAULT 'With five vibrant Sunday services and midweek teachings overflowing our temporary hall, our congregation is constructing a permanent sanctuary to shelter worshippers from the rains and house youth discipleship.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_image_url TEXT NOT NULL DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_badge TEXT NOT NULL DEFAULT 'Sanctuary Construction';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_title TEXT NOT NULL DEFAULT 'Sheltering & Sponsoring 60+ Vulnerable Children';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_subtitle TEXT NOT NULL DEFAULT 'Hot nutritious meals, quality education, medical care & parental love.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_narrative TEXT NOT NULL DEFAULT 'Putting faith into tangible action. Every day, our home feeds, clothes, and educates orphaned boys and girls in Suggutta. Sponsoring a child or sending food donations preserves a destiny and fulfills James 1:27.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_image_url TEXT NOT NULL DEFAULT '/images/orphanage-hero.png';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_donate_image_url TEXT NOT NULL DEFAULT '/images/orphanage-hero.png';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_story_image TEXT NOT NULL DEFAULT '/images/community-outreach.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_badge TEXT NOT NULL DEFAULT 'Children''s Home Mission';

-- 8. Grassroots Community
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_title TEXT NOT NULL DEFAULT 'Rooted in Our Community, Walking Alongside Families';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_narrative TEXT NOT NULL DEFAULT 'True Christian ministry is never confined to sanctuary walls. In Suggutta and neighboring villages, our pastoral team and church workers meet regularly with village elders, struggling families, and young children in their homesteads.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_image_url TEXT NOT NULL DEFAULT '/images/community-outreach.jpg';

-- 9. 4 Ministry Pillars & Impact Counters
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_1_title TEXT NOT NULL DEFAULT 'Deliverance & Healing';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_1_desc TEXT NOT NULL DEFAULT 'Treading upon the works of darkness, breaking generational curses, casting out demonic afflictions, and witnessing total physical restoration through the authority of Jesus Christ.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_1_image TEXT NOT NULL DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_1_video TEXT;

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_2_title TEXT NOT NULL DEFAULT 'Global Crusades';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_2_desc TEXT NOT NULL DEFAULT 'Conducting massive outdoor evangelistic campaigns, stadium crusades, and open-air meetings that gather hundreds of thousands to repent and accept the saving power of the Cross.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_2_image TEXT NOT NULL DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_2_video TEXT;

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_3_title TEXT NOT NULL DEFAULT 'Prophetic Word & Truth';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_3_desc TEXT NOT NULL DEFAULT 'Expositional teaching of the Holy Scriptures to equip the saints, ground believers in apostolic doctrine, and build resilient Christian families anchored in holiness.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_3_image TEXT NOT NULL DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_3_video TEXT;

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_4_title TEXT NOT NULL DEFAULT 'Compassion & Outreach';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_4_desc TEXT NOT NULL DEFAULT 'Feeding the hungry, sheltering orphans, providing medical support, and clothing widows across underserved communities as an active demonstration of Christ''s compassion.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_4_image TEXT NOT NULL DEFAULT '/images/community-outreach.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_4_video TEXT;

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_1_val TEXT NOT NULL DEFAULT '1,200+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_1_lbl TEXT NOT NULL DEFAULT 'Deliverance Sessions';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_2_val TEXT NOT NULL DEFAULT '50+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_2_lbl TEXT NOT NULL DEFAULT 'Miracle Crusades';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_3_val TEXT NOT NULL DEFAULT '1,000,000+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_3_lbl TEXT NOT NULL DEFAULT 'Believers Impacted';

-- 10. Dynamic Projects & Events Data
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS projects_json JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS events_json JSONB NOT NULL DEFAULT '[]'::jsonb;

-- 11. Ensure at least one configuration row exists
INSERT INTO public.site_settings (id, youtube_channel_url, mpesa_till_number, mpesa_till_name, kcb_account_number, kcb_account_name, mpesa_paybill, mpesa_paybill_account, mpesa_paybill_name)
SELECT gen_random_uuid(), 'https://www.youtube.com/@Brianmbera', '8146952', 'SUGGUTTA FELLOWSHIP CHURCH', '1356891853', 'SUGGUTTA FELLOWSHIP CHURCH', '522533', '8146952', 'SUGGUTTA FELLOWSHIP CHURCH'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- 12. Update existing rows with accurate payment channels and YouTube
UPDATE public.site_settings
SET youtube_channel_url = 'https://www.youtube.com/@Brianmbera',
    mpesa_till_number = COALESCE(mpesa_till_number, '8146952'),
    mpesa_till_name = COALESCE(mpesa_till_name, 'SUGGUTTA FELLOWSHIP CHURCH'),
    kcb_account_number = '1356891853',
    kcb_account_name = 'SUGGUTTA FELLOWSHIP CHURCH',
    mpesa_paybill = '522533',
    mpesa_paybill_account = COALESCE(mpesa_paybill_account, '8146952'),
    mpesa_paybill_name = COALESCE(mpesa_paybill_name, 'SUGGUTTA FELLOWSHIP CHURCH');`;



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
        setLastSavedSnapshot(JSON.stringify(settings));
        setFeedback({
          type: "success",
          message: res.message || "Site content, photos, and church details updated successfully across all pages!",
        });
        setTimeout(() => {
          setFeedback((prev) => (prev?.type === "success" ? null : prev));
        }, 5000);
        router.refresh();
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to update settings. Please check your network connection.",
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


  // Dedicated Project Persistence Helpers
  const [isSavingProjects, setIsSavingProjects] = useState(false);
  const [projectsFeedback, setProjectsFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSaveProjects = async (projectsToSave?: MinistryProjectItem[]) => {
    setIsSavingProjects(true);
    setProjectsFeedback(null);

    const list = projectsToSave || (settings.projectsJson?.length ? settings.projectsJson : DEFAULT_SETTINGS.projectsJson);

    try {
      const res = await saveProjectsAction(list);
      if (res.success && res.data) {
        setSettings((prev) => {
          const next = { ...prev, projectsJson: res.data! };
          setLastSavedSnapshot(JSON.stringify(next));
          return next;
        });
        setProjectsFeedback({
          type: "success",
          text: "Projects, photo galleries & video links published to homepage!",
        });
        setTimeout(() => setProjectsFeedback(null), 4500);
      } else {
        setProjectsFeedback({
          type: "error",
          text: res.error || "Failed to persist projects to database.",
        });
      }
    } catch (err) {
      console.error("Save projects error:", err);
      setProjectsFeedback({
        type: "error",
        text: "Network error saving projects.",
      });
    } finally {
      setIsSavingProjects(false);
    }
  };

  // Project Helpers
  const handleAddProject = () => {
    const newProject: MinistryProjectItem = {
      id: `proj-${Date.now()}`,
      badge: "Community Mission",
      title: "New Church Project / Mission",
      subtitle: "Project objective or current focus",
      narrative:
        "Detailed explanation of the project, impact, and how people can support.",
      imageUrl: "",
      images: [],
      videoUrl: "",
      donateLink: "/give",
      donateLabel: "Support this Project",
      mpesaRef: "PROJECT",
      color: "orange",
      active: true,
    };

    setSettings((prev) => {
      const currentList = prev.projectsJson?.length
        ? prev.projectsJson
        : DEFAULT_SETTINGS.projectsJson;
      const updated = [...currentList, newProject];
      handleSaveProjects(updated);
      return { ...prev, projectsJson: updated };
    });
  };

  const handleUpdateProject = (
    idx: number,
    fieldOrUpdates: keyof MinistryProjectItem | Partial<MinistryProjectItem>,
    val?: unknown,
    autoSave = false
  ) => {
    setSettings((prev) => {
      const currentList = prev.projectsJson?.length
        ? prev.projectsJson
        : DEFAULT_SETTINGS.projectsJson;
      const updated = [...currentList];
      if (typeof fieldOrUpdates === "object" && fieldOrUpdates !== null) {
        updated[idx] = { ...updated[idx], ...fieldOrUpdates };
      } else {
        updated[idx] = { ...updated[idx], [fieldOrUpdates as keyof MinistryProjectItem]: val };
      }
      if (autoSave) {
        handleSaveProjects(updated);
      }
      return { ...prev, projectsJson: updated };
    });
  };

  const handleDeleteProject = (idx: number) => {
    if (!confirm("Are you sure you want to remove this project?")) return;
    setSettings((prev) => {
      const currentList = prev.projectsJson?.length
        ? prev.projectsJson
        : DEFAULT_SETTINGS.projectsJson;
      const updated = currentList.filter((_, i) => i !== idx);
      handleSaveProjects(updated);
      return { ...prev, projectsJson: updated };
    });
  };

  // Project Accordion State & Helpers
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({ 0: true });
  const [allProjectsExpanded, setAllProjectsExpanded] = useState(false);

  const toggleProjectExpanded = (idx: number) => {
    setExpandedProjects((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleAllProjects = () => {
    const nextState = !allProjectsExpanded;
    setAllProjectsExpanded(nextState);
    const updated: Record<number, boolean> = {};
    const currentList = settings.projectsJson?.length
      ? settings.projectsJson
      : DEFAULT_SETTINGS.projectsJson;
    currentList.forEach((_, i) => {
      updated[i] = nextState;
    });
    setExpandedProjects(updated);
  };

  // Ministry Pillars quick tab switcher
  const [selectedPillarTab, setSelectedPillarTab] = useState<1 | 2 | 3 | 4>(1);

  // Children's Home media sub-tab switcher
  const [orphanageSubTab, setOrphanageSubTab] = useState<"banners" | "photos" | "videos">("banners");

  // Event Helpers & Mobile Accordion State
  const [expandedEvents, setExpandedEvents] = useState<Record<number, boolean>>({ 0: true });
  const [allEventsExpanded, setAllEventsExpanded] = useState(false);

  const toggleEventExpanded = (idx: number) => {
    setExpandedEvents((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleAllEvents = () => {
    const nextState = !allEventsExpanded;
    setAllEventsExpanded(nextState);
    const updated: Record<number, boolean> = {};
    settings.eventsJson.forEach((_, i) => {
      updated[i] = nextState;
    });
    setExpandedEvents(updated);
  };

  const handleSaveEventsOnly = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    startTransition(async () => {
      const res = await saveEventsAction(settings.eventsJson);
      if (res.success) {
        setLastSavedSnapshot(JSON.stringify(settings));
        setFeedback({
          type: "success",
          message: "Events & crusades published successfully without any errors!",
        });
        setTimeout(() => {
          setFeedback((prev) => (prev?.type === "success" ? null : prev));
        }, 5000);
        router.refresh();
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to save events.",
        });
      }
    });
  };

  const handleAddEvent = () => {
    const newEvent: MinistryEventItem = {
      id: `event-${Date.now()}`,
      badge: "MISSION 2026",
      title: "New Miracle Crusade & Deliverance Mission",
      location: settings.physicalLocation || "Suggutta Sanctuary, Kenya",
      dates: "Upcoming 2026",
      format: "In-Person & Live Broadcast",
      description: "Anointed gathering for deliverance, salvation, and kingdom fellowship.",
      imageUrl: "",
      whatsappMessage: `Hello ${settings.pastorName}, I would like to inquire about the upcoming church mission.`,
      videoUrl: "",
      videoSourceType: "upload",
      status: "upcoming",
      recapNotes: "",
    };
    setSettings({
      ...settings,
      eventsJson: [newEvent, ...settings.eventsJson],
    });
    setExpandedEvents((prev) => ({ ...prev, 0: true }));
  };

  const handleUpdateEvent = (
    idx: number,
    fieldOrUpdates: keyof MinistryEventItem | Partial<MinistryEventItem>,
    val?: string
  ) => {
    const updated = [...settings.eventsJson];
    if (typeof fieldOrUpdates === "object" && fieldOrUpdates !== null) {
      updated[idx] = { ...updated[idx], ...fieldOrUpdates };
    } else {
      updated[idx] = { ...updated[idx], [fieldOrUpdates as keyof MinistryEventItem]: val };
    }
    setSettings({ ...settings, eventsJson: updated });
  };

  const handleDeleteEvent = (idx: number) => {
    const updated = settings.eventsJson.filter((_, i) => i !== idx);
    setSettings({ ...settings, eventsJson: updated });
  };

  // Children's Home Photo Helpers (Instant Auto-Persist)
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

    // Optimistically update local UI
    setSettings((prev) => ({
      ...prev,
      orphanagePhotos: [newPhoto, ...prev.orphanagePhotos],
    }));
    setNewPhotoTitle("");
    setNewPhotoCaption("");
    setNewPhotoUrl("");

    // Instant auto-persist to Supabase and revalidate /orphanage
    startTransition(async () => {
      const res = await addOrphanagePhotoAction(newPhoto);
      if (res.success) {
        setFeedback({
          type: "success",
          message: "Photo moment successfully published to the live Children's Home page!",
        });
        if (res.data) {
          setSettings((prev) => ({ ...prev, orphanagePhotos: res.data! }));
        }
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to persist photo to database.",
        });
      }
    });
  };

  const handleDeletePhoto = (id: string) => {
    if (!confirm("Are you sure you want to delete this photo moment?")) return;

    // Optimistically update local UI
    setSettings((prev) => ({
      ...prev,
      orphanagePhotos: prev.orphanagePhotos.filter((p) => p.id !== id),
    }));

    // Instant auto-delete from Supabase
    startTransition(async () => {
      const res = await deleteOrphanagePhotoAction(id);
      if (res.success) {
        setFeedback({
          type: "success",
          message: "Photo moment removed from Children's Home gallery.",
        });
        if (res.data) {
          setSettings((prev) => ({ ...prev, orphanagePhotos: res.data! }));
        }
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to delete photo from database.",
        });
      }
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

    // Optimistically update local UI
    setSettings((prev) => ({
      ...prev,
      orphanageVideos: [newVideo, ...prev.orphanageVideos],
    }));

    // Reset video form state
    setNewVideoTitle("");
    setNewVideoDescription("");
    setNewVideoUrl("");
    setUploadedVideoUrl("");
    setUploadedThumbnailUrl("");
    setVideoFile(null);
    setVideoUploadSuccess(false);

    // Instant auto-persist to Supabase and revalidate /orphanage
    startTransition(async () => {
      const res = await addOrphanageVideoAction(newVideo);
      if (res.success) {
        setFeedback({
          type: "success",
          message: "Video story successfully published to the live Children's Home page!",
        });
        if (res.data) {
          setSettings((prev) => ({ ...prev, orphanageVideos: res.data! }));
        }
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to persist video to database.",
        });
      }
    });
  };

  const handleDeleteVideo = (id: string) => {
    if (!confirm("Are you sure you want to remove this video story?")) return;

    // Optimistically update local UI
    setSettings((prev) => ({
      ...prev,
      orphanageVideos: prev.orphanageVideos.filter((v) => v.id !== id),
    }));

    // Instant auto-delete from Supabase
    startTransition(async () => {
      const res = await deleteOrphanageVideoAction(id);
      if (res.success) {
        setFeedback({
          type: "success",
          message: "Video story removed from Children's Home gallery.",
        });
        if (res.data) {
          setSettings((prev) => ({ ...prev, orphanageVideos: res.data! }));
        }
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to delete video from database.",
        });
      }
    });
  };

  // ================= EDIT ORPHANAGE PHOTO STATE & HANDLERS =================
  const [editingPhoto, setEditingPhoto] = useState<OrphanagePhotoItem | null>(null);
  const [editPhotoTitle, setEditPhotoTitle] = useState("");
  const [editPhotoCaption, setEditPhotoCaption] = useState("");
  const [editPhotoCategory, setEditPhotoCategory] = useState("Daily Life");
  const [editPhotoImageUrl, setEditPhotoImageUrl] = useState("");

  const openEditPhotoModal = (photo: OrphanagePhotoItem) => {
    setEditingPhoto(photo);
    setEditPhotoTitle(photo.title);
    setEditPhotoCaption(photo.caption || "");
    setEditPhotoCategory(photo.category || "Daily Life");
    setEditPhotoImageUrl(photo.imageUrl);
  };

  const handleSaveEditPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    if (!editPhotoTitle.trim()) {
      alert("Please provide a photo title.");
      return;
    }
    if (!editPhotoImageUrl.trim()) {
      alert("Please provide an image URL for this photo.");
      return;
    }

    const updatedData: Partial<OrphanagePhotoItem> = {
      title: editPhotoTitle.trim(),
      caption: editPhotoCaption.trim() || undefined,
      category: editPhotoCategory.trim() || "Daily Life",
      imageUrl: editPhotoImageUrl.trim(),
    };

    // Optimistically update local UI
    setSettings((prev) => ({
      ...prev,
      orphanagePhotos: prev.orphanagePhotos.map((p) =>
        p.id === editingPhoto.id ? { ...p, ...updatedData } : p
      ),
    }));

    startTransition(async () => {
      const res = await updateOrphanagePhotoAction(editingPhoto.id, updatedData);
      if (res.success) {
        setFeedback({
          type: "success",
          message: "Photo moment updated successfully!",
        });
        if (res.data) {
          setSettings((prev) => ({ ...prev, orphanagePhotos: res.data! }));
        }
        setEditingPhoto(null);
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to update photo moment.",
        });
      }
    });
  };

  // ================= EDIT ORPHANAGE VIDEO STATE & HANDLERS =================
  const [editingVideo, setEditingVideo] = useState<OrphanageVideoItem | null>(null);
  const [editVideoTitle, setEditVideoTitle] = useState("");
  const [editVideoDescription, setEditVideoDescription] = useState("");
  const [editVideoBadge, setEditVideoBadge] = useState("Daily Life Story");
  const [editVideoSourceMode, setEditVideoSourceMode] = useState<"keep" | "youtube" | "upload">("keep");
  const [editVideoUrlInput, setEditVideoUrlInput] = useState("");
  const [editVideoUploadedUrl, setEditVideoUploadedUrl] = useState("");
  const [editVideoThumbUrl, setEditVideoThumbUrl] = useState("");
  const [editVideoIsUploading, setEditVideoIsUploading] = useState(false);
  const [editVideoIsUploadingThumb, setEditVideoIsUploadingThumb] = useState(false);

  const editVideoFileInputRef = useRef<HTMLInputElement>(null);
  const editThumbFileInputRef = useRef<HTMLInputElement>(null);

  const openEditVideoModal = (video: OrphanageVideoItem) => {
    setEditingVideo(video);
    setEditVideoTitle(video.title);
    setEditVideoDescription(video.description || "");
    setEditVideoBadge(video.badge || "Daily Life Story");
    setEditVideoSourceMode("keep");
    const isYt =
      video.sourceType === "youtube" ||
      (video.videoUrl &&
        (video.videoUrl.includes("youtube") || video.videoUrl.includes("youtu.be")));
    setEditVideoUrlInput(isYt ? video.youtubeUrl || video.videoUrl : "");
    setEditVideoUploadedUrl(!isYt ? video.videoUrl : "");
    setEditVideoThumbUrl(video.thumbnailUrl || "");
  };

  const handleEditVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert(`File "${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Max limit is 50MB. For larger videos, please use the YouTube URL option.`);
      return;
    }

    setEditVideoIsUploading(true);
    try {
      const authRes = await getOrphanageVideoSignedUploadUrlAction(file.name, file.type, file.size);
      if (authRes.success && authRes.data) {
        const { token, path, publicUrl } = authRes.data;
        const supabase = createClient();
        const { error: uploadError } = await supabase.storage
          .from("church-media")
          .uploadToSignedUrl(path, token, file);

        if (!uploadError) {
          setEditVideoUploadedUrl(publicUrl);
          setEditVideoIsUploading(false);
          return;
        }
      }

      // Fallback
      const formData = new FormData();
      formData.append("file", file);
      const apiRes = await fetch("/api/admin/sermons/upload", {
        method: "POST",
        body: formData,
      });
      const apiData = await apiRes.json();
      if (apiRes.ok && apiData.success && apiData.data?.url) {
        setEditVideoUploadedUrl(apiData.data.url);
      } else {
        alert(apiData?.error || "Failed to upload video file.");
      }
    } catch (err) {
      console.error("[Edit Orphanage Video Upload Error]:", err);
      alert("Network error during video upload.");
    } finally {
      setEditVideoIsUploading(false);
    }
  };

  const handleEditVideoThumbChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEditVideoIsUploadingThumb(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadChurchMediaAction(formData);
      if (res.success && res.data?.url) {
        setEditVideoThumbUrl(res.data.url);
      } else {
        alert(res.error || "Failed to upload thumbnail.");
      }
    } catch (err) {
      console.error("[Edit Orphanage Thumb Error]:", err);
      alert("Error uploading thumbnail.");
    } finally {
      setEditVideoIsUploadingThumb(false);
    }
  };

  const handleSaveEditVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    if (!editVideoTitle.trim()) {
      alert("Please provide a title for this video story.");
      return;
    }

    let effectiveUrl = editingVideo.videoUrl;
    let effectiveSource: "upload" | "youtube" = editingVideo.sourceType || "upload";

    if (editVideoSourceMode === "youtube") {
      if (!editVideoUrlInput.trim()) {
        alert("Please enter a valid YouTube URL.");
        return;
      }
      effectiveUrl = editVideoUrlInput.trim();
      effectiveSource = "youtube";
    } else if (editVideoSourceMode === "upload") {
      if (!editVideoUploadedUrl.trim()) {
        alert("Please select and upload a video file first.");
        return;
      }
      effectiveUrl = editVideoUploadedUrl.trim();
      effectiveSource = "upload";
    }

    const updatedData: Partial<OrphanageVideoItem> = {
      title: editVideoTitle.trim(),
      description: editVideoDescription.trim() || undefined,
      badge: editVideoBadge.trim() || "Daily Life Story",
      videoUrl: effectiveUrl,
      youtubeUrl: effectiveSource === "youtube" ? effectiveUrl : undefined,
      sourceType: effectiveSource,
      thumbnailUrl: editVideoThumbUrl.trim() || undefined,
    };

    // Optimistically update local UI
    setSettings((prev) => ({
      ...prev,
      orphanageVideos: prev.orphanageVideos.map((v) =>
        v.id === editingVideo.id ? { ...v, ...updatedData } : v
      ),
    }));

    startTransition(async () => {
      const res = await updateOrphanageVideoAction(editingVideo.id, updatedData);
      if (res.success) {
        setFeedback({
          type: "success",
          message: "Video story updated successfully!",
        });
        if (res.data) {
          setSettings((prev) => ({ ...prev, orphanageVideos: res.data! }));
        }
        setEditingVideo(null);
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to update video story.",
        });
      }
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
    <div className="space-y-6 max-w-6xl mx-auto pb-32">
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
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 overflow-x-auto scrollbar-none w-full max-w-full touch-pan-x scroll-smooth snap-x snap-mandatory py-2 px-2 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`shrink-0 whitespace-nowrap snap-start flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "hero"
              ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home &amp; Hero</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          className={`shrink-0 whitespace-nowrap snap-start flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "projects"
              ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
          }`}
        >
          <Hammer className="w-4 h-4" />
          <span>Church Projects</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
              activeTab === "projects"
                ? "bg-white/20 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {settings.projectsJson?.length || 0}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("orphanage")}
          className={`shrink-0 whitespace-nowrap snap-start flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "orphanage"
              ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
          }`}
        >
          <Baby className="w-4 h-4" />
          <span>Children&apos;s Home Media</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
              activeTab === "orphanage"
                ? "bg-white/20 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {(settings.orphanagePhotos?.length || 0) + (settings.orphanageVideos?.length || 0)}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pillars")}
          className={`shrink-0 whitespace-nowrap snap-start flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "pillars"
              ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
          }`}
        >
          <Columns className="w-4 h-4" />
          <span>Ministry Pillars</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
              activeTab === "pillars"
                ? "bg-white/20 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            4
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("about")}
          className={`shrink-0 whitespace-nowrap snap-start flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "about"
              ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>About &amp; Community</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("events")}
          className={`shrink-0 whitespace-nowrap snap-start flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "events"
              ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events &amp; Crusades</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
              activeTab === "events"
                ? "bg-white/20 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {settings.eventsJson?.length || 0}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bank")}
          className={`shrink-0 whitespace-nowrap snap-start flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "bank"
              ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Banking &amp; Contacts</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ================= TAB 1: HERO & HOMEPAGE ================= */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            {/* Header Title Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-2xl sm:rounded-3xl border border-orange-200/80 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ff6b35] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff6b35] block">
                    Section 1 &bull; Landing View &amp; Identity
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Homepage Hero Headline, Visual Stage &amp; Metrics
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live interactive preview, headline copy, background hero photograph, and ministry milestone stats.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Interactive Hero Preview Plate */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 p-6 sm:p-8 text-white shadow-2xl">
              {/* Background Backdrop Image with Overlay */}
              {settings.heroImageUrl && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={settings.heroImageUrl}
                    alt="Hero Preview Background"
                    fill
                    className="object-cover object-top opacity-25 filter blur-[1px]"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent" />
                </div>
              )}

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold text-orange-300 border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-[#ff6b35]" />
                    <span>Real-Time Public Hero Preview</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Live Simulator &bull; Updates as you type
                  </span>
                </div>

                <div className="max-w-2xl space-y-2">
                  <span className="inline-block text-[11px] font-black tracking-widest text-[#ff6b35] uppercase">
                    Welcome to Suggutta Fellowship Church
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                    {settings.heroHeadline1 || "Suggutta"}{" "}
                    <span className="text-[#ff6b35]">{settings.heroHeadline2 || "Fellowship"}</span>{" "}
                    {settings.heroHeadline3 || "Church"}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {settings.heroSubtitle ||
                      "We are a Christ-centered, Spirit-filled family learning to follow Jesus faithfully..."}
                  </p>
                  {settings.heroPromise && (
                    <p className="text-xs text-amber-300/90 italic font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                      &quot;{settings.heroPromise}&quot;
                    </p>
                  )}
                </div>

                {/* Simulated Public Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <div className="px-4 py-2 rounded-xl bg-[#ff6b35] text-white text-xs font-black shadow-lg shadow-orange-500/30 flex items-center gap-1.5 cursor-default">
                    <span>Plan Your Visit</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/15 flex items-center gap-1.5 cursor-default">
                    <Radio className="w-3.5 h-3.5 text-rose-400" />
                    <span>Watch Live Service</span>
                  </div>
                </div>

                {/* Bottom Impact Chips Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/10">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                    <p className="text-base sm:text-lg font-black text-[#ff6b35]">
                      {settings.heroStatLives || "1M+"}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      Lives Touched
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                    <p className="text-base sm:text-lg font-black text-amber-400">
                      {settings.heroStatYears || "25+"}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      Years Ministry
                    </p>
                  </div>
                  {settings.heroStatBranches && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center col-span-2 sm:col-span-1">
                      <p className="text-base sm:text-lg font-black text-emerald-400">
                        {settings.heroStatBranches}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                        Church Branches
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Core Hero Headlines Editor */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Hero Headline Copy &amp; Divine Calling
                </h3>
                <p className="text-xs text-slate-500">
                  Configure the primary 3-tier headline that greets visitors entering the sanctuary website.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Headline Line 1</label>
                  <Input
                    value={settings.heroHeadline1}
                    onChange={(e) => setSettings({ ...settings, heroHeadline1: e.target.value })}
                    placeholder="Suggutta"
                  />
                  <span className="text-[10px] text-slate-400 block">Default: Suggutta</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Headline Line 2 (Highlighted Orange)</label>
                  <Input
                    value={settings.heroHeadline2}
                    onChange={(e) => setSettings({ ...settings, heroHeadline2: e.target.value })}
                    placeholder="Fellowship"
                  />
                  <span className="text-[10px] text-[#ff6b35] block font-medium">Highlighted in theme flame orange</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Headline Line 3</label>
                  <Input
                    value={settings.heroHeadline3}
                    onChange={(e) => setSettings({ ...settings, heroHeadline3: e.target.value })}
                    placeholder="Church"
                  />
                  <span className="text-[10px] text-slate-400 block">Default: Church</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Hero Subtitle / Apostolic Statement</label>
                <Textarea
                  rows={2}
                  value={settings.heroSubtitle}
                  onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  placeholder="We are a Christ-centered, Spirit-filled family learning to follow Jesus faithfully..."
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
            </div>

            {/* Hero Visual Photographic Plate */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Hero Visual Photographic Plate
                </h3>
                <p className="text-xs text-slate-500">
                  Featured photo displayed on the homepage hero alongside the floating altar nameplate.
                </p>
              </div>

              <ImageUploadField
                label="Hero Portrait Photo (Right Column Stage)"
                description="Displays prominently on the right side of the homepage hero with curved corners and the floating nameplate card."
                value={settings.heroImageUrl}
                onChange={(url) => setSettings({ ...settings, heroImageUrl: url })}
                aspectRatio="portrait"
              />
            </div>

            {/* Hero Key Impact Milestones */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Hero Stat Counters (Shared Across Homepage &amp; About Page)
                  </h3>
                  <p className="text-xs text-slate-500">
                    These counters appear in the hero card and synchronize automatically with the About page.
                  </p>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200 self-start sm:self-auto">
                  Live Global Metrics
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-700">Stat 1: Lives Touched</label>
                  <Input
                    value={settings.heroStatLives}
                    onChange={(e) => setSettings({ ...settings, heroStatLives: e.target.value })}
                    placeholder="1M+"
                  />
                  <span className="text-[10px] text-slate-400 block font-medium">Displays as &quot;LIVES TOUCHED&quot;</span>
                </div>
                <div className="space-y-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-700">Stat 2: Years of Ministry</label>
                  <Input
                    value={settings.heroStatYears}
                    onChange={(e) => setSettings({ ...settings, heroStatYears: e.target.value })}
                    placeholder="25+"
                  />
                  <span className="text-[10px] text-slate-400 block font-medium">Displays as &quot;YEARS MINISTRY&quot;</span>
                </div>
                <div className="space-y-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-700">Stat 3: Church Branches (Optional)</label>
                  <Input
                    value={settings.heroStatBranches}
                    onChange={(e) => setSettings({ ...settings, heroStatBranches: e.target.value })}
                    placeholder="Leave blank to hide"
                  />
                  <span className="text-[10px] text-slate-400 block font-medium">Leave blank for a clean 2-stat layout</span>
                </div>
              </div>
            </div>

            {renderSaveSectionBar("Ready to update Homepage Hero & Identity?")}
          </div>
        )}


        {/* ================= TAB 2: CHURCH PROJECTS & MISSIONS ================= */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-2xl sm:rounded-3xl border border-orange-200/80 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ff6b35] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                  <Hammer className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Active Projects &amp; Capital Campaigns
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage project narratives, photo galleries (up to 5), video walkthroughs, and direct M-Pesa giving.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  type="button"
                  onClick={toggleAllProjects}
                  variant="outline"
                  className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-full px-3.5 py-2.5 h-auto flex items-center gap-1.5 border-slate-300 shrink-0"
                >
                  {allProjectsExpanded ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                      <span>Collapse All</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      <span>Expand All</span>
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={handleAddProject}
                  variant="outline"
                  className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-full px-4 py-2.5 h-auto flex items-center gap-1.5 border-slate-300 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </Button>
                <Button
                  type="button"
                  onClick={() => handleSaveProjects()}
                  disabled={isSavingProjects}
                  className="bg-[#ff6b35] hover:bg-[#ea580c] text-white font-bold text-xs rounded-full px-5 py-2.5 h-auto flex items-center gap-1.5 shadow-md shadow-orange-500/20 border-0 shrink-0"
                >
                  {isSavingProjects ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save &amp; Publish</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {projectsFeedback && (
              <div
                className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 border font-bold ${
                  projectsFeedback.type === "success"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : "bg-rose-50 border-rose-300 text-rose-800"
                }`}
              >
                {projectsFeedback.type === "success" ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{projectsFeedback.text}</span>
              </div>
            )}

            {/* List of Dynamic Projects with Accordion Pattern */}
            {((settings.projectsJson && settings.projectsJson.length > 0)
              ? settings.projectsJson
              : DEFAULT_SETTINGS.projectsJson
            ).map((project, idx) => {
              const isExpanded = !!expandedProjects[idx];
              const photoCount = project.images?.length || (project.imageUrl ? 1 : 0);
              const colorOptions = [
                { id: "orange", label: "Orange / Flame", bg: "bg-orange-50 border-orange-300 text-[#c2410c]" },
                { id: "rose", label: "Rose / Children", bg: "bg-rose-50 border-rose-300 text-rose-700" },
                { id: "blue", label: "Blue / Grace", bg: "bg-blue-50 border-blue-300 text-blue-700" },
                { id: "green", label: "Emerald / Life", bg: "bg-emerald-50 border-emerald-300 text-emerald-700" },
              ];

              return (
                <div
                  key={project.id || idx}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
                >
                  {/* Collapsible Header Bar */}
                  <div
                    onClick={() => toggleProjectExpanded(idx)}
                    className="p-4 sm:p-5 bg-white hover:bg-slate-50/80 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProjectExpanded(idx);
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 shrink-0"
                        aria-label={isExpanded ? "Collapse project" : "Expand project"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        )}
                      </button>

                      <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </span>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                            {project.title || `Project #${idx + 1}`}
                          </h3>
                          {project.badge && (
                            <span className="text-[10px] font-extrabold text-[#ff6b35] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/60 truncate max-w-[160px]">
                              {project.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {project.subtitle || "No subtitle configured"} &bull;{" "}
                          <span className="font-mono text-slate-400">ID: {project.id}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {/* Photo indicator badge */}
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                        <Camera className="w-3 h-3 text-slate-500" />
                        <span>{photoCount} {photoCount === 1 ? "Photo" : "Photos"}</span>
                      </span>

                      {/* Active / Hidden Toggle */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateProject(idx, "active", project.active === false ? true : false);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                          project.active !== false
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : "bg-slate-100 border-slate-300 text-slate-500"
                        }`}
                      >
                        {project.active !== false ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(idx);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="Delete this project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Body */}
                  {isExpanded && (
                    <div className="p-5 sm:p-8 space-y-6 bg-slate-50/40">
                      {/* Core Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Project Badge Label</label>
                          <Input
                            value={project.badge}
                            onChange={(e) => handleUpdateProject(idx, "badge", e.target.value)}
                            placeholder="e.g. Children's Home Mission"
                          />
                        </div>
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Project Title</label>
                          <Input
                            value={project.title}
                            onChange={(e) => handleUpdateProject(idx, "title", e.target.value)}
                            placeholder="e.g. Building a Permanent House of Prayer in Suggutta"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Progress Highlights / Subtitle</label>
                        <Input
                          value={project.subtitle}
                          onChange={(e) => handleUpdateProject(idx, "subtitle", e.target.value)}
                          placeholder="e.g. Concrete foundation blocks, steel pillar reinforcement & roof trussing."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Project Narrative &amp; Mission Impact</label>
                        <Textarea
                          rows={3}
                          value={project.narrative}
                          onChange={(e) => handleUpdateProject(idx, "narrative", e.target.value)}
                          placeholder="Describe the objective, biblical foundation, urgent needs, and impact..."
                        />
                      </div>

                      {/* Theme Color Picker */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Card Color Accent</label>
                        <div className="flex flex-wrap items-center gap-2">
                          {colorOptions.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleUpdateProject(idx, "color", opt.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${opt.bg} ${
                                (project.color || "orange") === opt.id
                                  ? "ring-2 ring-offset-1 ring-slate-900 shadow-sm"
                                  : "opacity-70 hover:opacity-100"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Media: Multi-Photo Gallery (Up to 5) & Optional Video */}
                      <div className="space-y-4 pt-2">
                        <ProjectMultiImageField
                          label="Project Photo Gallery (Up to 5 Photos)"
                          description="Upload up to 5 photos. These will smoothly transition on the homepage card and visitors can swipe through them."
                          images={
                            project.images && project.images.length > 0
                              ? project.images
                              : project.imageUrl
                              ? [project.imageUrl]
                              : []
                          }
                          onChange={(newImages) => {
                            handleUpdateProject(
                              idx,
                              {
                                images: newImages,
                                imageUrl: newImages[0] || "",
                              },
                              undefined,
                              true
                            );
                          }}
                          maxImages={5}
                        />

                        <div className="max-w-xl">
                          <EventVideoUploadField
                            label="Project Video / Walkthrough (Optional)"
                            description="Upload a clip (MP4 up to 50MB) or paste a YouTube URL to showcase project progress."
                            videoUrl={project.videoUrl || ""}
                            onChange={(videoUrl) => handleUpdateProject(idx, "videoUrl", videoUrl, true)}
                          />
                        </div>
                      </div>

                      {/* Giving Controls */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                          <CreditCard className="w-4 h-4 text-[#ff6b35]" />
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Giving &amp; Donation Call to Action
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700">CTA Button Destination Link</label>
                            <Input
                              value={project.donateLink}
                              onChange={(e) => handleUpdateProject(idx, "donateLink", e.target.value)}
                              placeholder="/give or /orphanage/donate"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700">CTA Button Text</label>
                            <Input
                              value={project.donateLabel}
                              onChange={(e) => handleUpdateProject(idx, "donateLabel", e.target.value)}
                              placeholder="Give to the Building Fund"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700">M-Pesa Account Reference</label>
                            <Input
                              value={project.mpesaRef}
                              onChange={(e) => handleUpdateProject(idx, "mpesaRef", e.target.value)}
                              placeholder="e.g. BUILDING, ORPHANAGE"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Add Project Button */}
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                onClick={handleAddProject}
                variant="outline"
                className="rounded-full font-bold text-xs px-6 py-2.5 h-auto flex items-center gap-2 border-dashed border-slate-300 hover:border-[#ff6b35] text-slate-700 hover:text-[#ff6b35]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Church Project</span>
              </Button>
            </div>

            {/* Dedicated Project Save Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-orange-50/90 via-white to-amber-50/90 rounded-2xl sm:rounded-3xl border border-orange-200/90 shadow-sm mt-6">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ff6b35] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                  <Save className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Save &amp; Publish Church Projects to Homepage
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click to instantly update all projects, photo galleries, and video links on the homepage.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => handleSaveProjects()}
                disabled={isSavingProjects}
                className="bg-[#ff6b35] hover:bg-[#ea580c] text-white font-black px-7 py-3 rounded-full shadow-lg shadow-orange-500/25 text-xs sm:text-sm h-auto flex items-center justify-center gap-2 border-0 shrink-0"
              >
                {isSavingProjects ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving Projects...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save &amp; Publish Projects</span>
                  </>
                )}
              </Button>
            </div>
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

            {/* Sub-Navigation for Orphanage Media */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto scrollbar-none snap-x">
              <button
                type="button"
                onClick={() => setOrphanageSubTab("banners")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  orphanageSubTab === "banners"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Page Banners &amp; Highlights</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-black">3</span>
              </button>

              <button
                type="button"
                onClick={() => setOrphanageSubTab("photos")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  orphanageSubTab === "photos"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Photo Moments Gallery</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-black">
                  {settings.orphanagePhotos.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOrphanageSubTab("videos")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  orphanageSubTab === "videos"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Stories &amp; Testimonies</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-black">
                  {settings.orphanageVideos.length}
                </span>
              </button>
            </div>

            {/* Primary Children's Home Page Photos */}
            {orphanageSubTab === "banners" && (
              <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600">
                  Page Banners &amp; Highlights
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Primary Children&apos;s Home Photos
                </h3>
                <p className="text-xs text-slate-500">
                  Editable banner photos featured on the public Children&apos;s Home page (/orphanage) and homepage teaser.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ImageUploadField
                  label="Hero Banner Photo (Head Image for /orphanage)"
                  description="Main head image displayed prominently at the top of the Children's Home page and homepage compassion teaser."
                  value={settings.orphanageImageUrl}
                  onChange={(url) => setSettings({ ...settings, orphanageImageUrl: url })}
                  aspectRatio="video"
                />

                <ImageUploadField
                  label="Donation Page Head Photo (/orphanage/donate Banner)"
                  description="Hero image showcased on the official Stand-in-the-Gap giving page alongside James 1:27."
                  value={settings.orphanageDonateImageUrl || "/images/orphanage-hero.png"}
                  onChange={(url) => setSettings({ ...settings, orphanageDonateImageUrl: url })}
                  aspectRatio="video"
                />

                <ImageUploadField
                  label="Mission &amp; Story Photo"
                  description="Featured photo displayed in the 'Why We Opened Our Doors in Suggutta' narrative section."
                  value={settings.orphanageStoryImage || "/images/community-outreach.jpg"}
                  onChange={(url) => setSettings({ ...settings, orphanageStoryImage: url })}
                  aspectRatio="video"
                />
              </div>
            </div>
            )}

            {/* Photos Manager */}
            {orphanageSubTab === "photos" && (
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
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditPhotoModal(photo)}
                              className="text-amber-600 hover:bg-amber-50 h-7 px-2 text-xs font-bold"
                            >
                              <Pencil className="w-3.5 h-3.5 mr-1" />
                              <span>Edit</span>
                            </Button>
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
                    </div>
                  ))}
                </div>
              )}
            </div>
            )}

            {/* Videos Manager */}
            {orphanageSubTab === "videos" && (
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
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditVideoModal(video)}
                                className="text-amber-600 hover:bg-amber-50 h-7 px-2 text-xs font-bold"
                              >
                                <Pencil className="w-3.5 h-3.5 mr-1" />
                                <span>Edit</span>
                              </Button>
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
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            )}

            {renderSaveSectionBar("Ready to publish Children's Home Photos & Videos?")}
          </div>
        )}


        {/* ================= TAB 4: MINISTRY PILLARS ================= */}
        {activeTab === "pillars" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-2xl sm:rounded-3xl border border-orange-200/80 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ff6b35] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                  <Columns className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff6b35] block">
                    Section 3 &bull; Divine Mandate
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Our 4 Ministry Pillars &amp; Impact Counters
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select any of the 4 ministry pillars to edit its title, narrative, photo plate, and video.
                  </p>
                </div>
              </div>
            </div>

            {/* Segmented 4-Pillar Quick Switcher Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedPillarTab(1)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-start gap-0.5 text-left ${
                  selectedPillarTab === 1
                    ? "bg-[#ff6b35] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-wider ${selectedPillarTab === 1 ? "text-orange-100" : "text-slate-400"}`}>
                  Pillar 1
                </span>
                <span className="truncate w-full font-extrabold">Deliverance &amp; Healing</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPillarTab(2)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-start gap-0.5 text-left ${
                  selectedPillarTab === 2
                    ? "bg-[#ff6b35] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-wider ${selectedPillarTab === 2 ? "text-orange-100" : "text-slate-400"}`}>
                  Pillar 2
                </span>
                <span className="truncate w-full font-extrabold">Global Crusades</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPillarTab(3)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-start gap-0.5 text-left ${
                  selectedPillarTab === 3
                    ? "bg-[#ff6b35] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-wider ${selectedPillarTab === 3 ? "text-orange-100" : "text-slate-400"}`}>
                  Pillar 3
                </span>
                <span className="truncate w-full font-extrabold">Prophetic Word &amp; Truth</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPillarTab(4)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-start gap-0.5 text-left ${
                  selectedPillarTab === 4
                    ? "bg-[#ff6b35] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-wider ${selectedPillarTab === 4 ? "text-orange-100" : "text-slate-400"}`}>
                  Pillar 4
                </span>
                <span className="truncate w-full font-extrabold">Compassion &amp; Outreach</span>
              </button>
            </div>

            {/* Active Pillar Card */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              {selectedPillarTab === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Pillar 1: Deliverance &amp; Healing
                    </h3>
                    <span className="text-[10px] text-orange-600 bg-orange-100/60 font-bold px-2 py-0.5 rounded-full">
                      Homepage Pillar 1
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pillar Title</label>
                    <Input
                      value={settings.pillar1Title}
                      onChange={(e) => setSettings({ ...settings, pillar1Title: e.target.value })}
                      placeholder="Pillar Title (e.g. Deliverance & Healing)"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pillar Description &amp; Biblical Mandate</label>
                    <Textarea
                      rows={3}
                      value={settings.pillar1Desc}
                      onChange={(e) => setSettings({ ...settings, pillar1Desc: e.target.value })}
                      placeholder="Pillar Description"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <ImageUploadField
                      label="Pillar 1 Featured Image"
                      description="Featured photo plate (landscape 16:9 recommended)"
                      value={settings.pillar1Image}
                      onChange={(url) => setSettings({ ...settings, pillar1Image: url })}
                      aspectRatio="video"
                    />
                    <EventVideoUploadField
                      label="Pillar 1 Video (Optional)"
                      description="Upload a clip (MP4 up to 50MB) or paste a YouTube URL to let visitors watch this pillar in action."
                      videoUrl={settings.pillar1Video || ""}
                      onChange={(videoUrl) => setSettings({ ...settings, pillar1Video: videoUrl })}
                    />
                  </div>
                </div>
              )}

              {selectedPillarTab === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Pillar 2: Global Crusades
                    </h3>
                    <span className="text-[10px] text-orange-600 bg-orange-100/60 font-bold px-2 py-0.5 rounded-full">
                      Homepage Pillar 2
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pillar Title</label>
                    <Input
                      value={settings.pillar2Title}
                      onChange={(e) => setSettings({ ...settings, pillar2Title: e.target.value })}
                      placeholder="Pillar Title (e.g. Global Crusades)"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pillar Description &amp; Biblical Mandate</label>
                    <Textarea
                      rows={3}
                      value={settings.pillar2Desc}
                      onChange={(e) => setSettings({ ...settings, pillar2Desc: e.target.value })}
                      placeholder="Pillar Description"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <ImageUploadField
                      label="Pillar 2 Featured Image"
                      description="Featured photo plate (landscape 16:9 recommended)"
                      value={settings.pillar2Image}
                      onChange={(url) => setSettings({ ...settings, pillar2Image: url })}
                      aspectRatio="video"
                    />
                    <EventVideoUploadField
                      label="Pillar 2 Video (Optional)"
                      description="Upload a clip (MP4 up to 50MB) or paste a YouTube URL to let visitors watch this pillar in action."
                      videoUrl={settings.pillar2Video || ""}
                      onChange={(videoUrl) => setSettings({ ...settings, pillar2Video: videoUrl })}
                    />
                  </div>
                </div>
              )}

              {selectedPillarTab === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Pillar 3: Prophetic Word &amp; Truth
                    </h3>
                    <span className="text-[10px] text-orange-600 bg-orange-100/60 font-bold px-2 py-0.5 rounded-full">
                      Homepage Pillar 3
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pillar Title</label>
                    <Input
                      value={settings.pillar3Title}
                      onChange={(e) => setSettings({ ...settings, pillar3Title: e.target.value })}
                      placeholder="Pillar Title (e.g. Prophetic Word & Truth)"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pillar Description &amp; Biblical Mandate</label>
                    <Textarea
                      rows={3}
                      value={settings.pillar3Desc}
                      onChange={(e) => setSettings({ ...settings, pillar3Desc: e.target.value })}
                      placeholder="Pillar Description"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <ImageUploadField
                      label="Pillar 3 Featured Image"
                      description="Featured photo plate (landscape 16:9 recommended)"
                      value={settings.pillar3Image}
                      onChange={(url) => setSettings({ ...settings, pillar3Image: url })}
                      aspectRatio="video"
                    />
                    <EventVideoUploadField
                      label="Pillar 3 Video (Optional)"
                      description="Upload a clip (MP4 up to 50MB) or paste a YouTube URL to let visitors watch this pillar in action."
                      videoUrl={settings.pillar3Video || ""}
                      onChange={(videoUrl) => setSettings({ ...settings, pillar3Video: videoUrl })}
                    />
                  </div>
                </div>
              )}

              {selectedPillarTab === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Pillar 4: Compassion &amp; Outreach
                    </h3>
                    <span className="text-[10px] text-orange-600 bg-orange-100/60 font-bold px-2 py-0.5 rounded-full">
                      Homepage Pillar 4
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pillar Title</label>
                    <Input
                      value={settings.pillar4Title}
                      onChange={(e) => setSettings({ ...settings, pillar4Title: e.target.value })}
                      placeholder="Pillar Title (e.g. Compassion & Outreach)"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pillar Description &amp; Biblical Mandate</label>
                    <Textarea
                      rows={3}
                      value={settings.pillar4Desc}
                      onChange={(e) => setSettings({ ...settings, pillar4Desc: e.target.value })}
                      placeholder="Pillar Description"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <ImageUploadField
                      label="Pillar 4 Featured Image"
                      description="Featured photo plate (landscape 16:9 recommended)"
                      value={settings.pillar4Image}
                      onChange={(url) => setSettings({ ...settings, pillar4Image: url })}
                      aspectRatio="video"
                    />
                    <EventVideoUploadField
                      label="Pillar 4 Video (Optional)"
                      description="Upload a clip (MP4 up to 50MB) or paste a YouTube URL to let visitors watch this pillar in action."
                      videoUrl={settings.pillar4Video || ""}
                      onChange={(videoUrl) => setSettings({ ...settings, pillar4Video: videoUrl })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Master 3 Pillar Impact Counters */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Master Impact Counters (Below Ministry Pillars)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Displayed directly beneath the 4 ministry pillars on the public homepage.
                  </p>
                </div>
                <span className="text-[10px] text-[#ff6b35] bg-orange-50 px-2 py-0.5 rounded-full font-bold border border-orange-200 self-start sm:self-auto">
                  Homepage Section 3
                </span>
              </div>

              {/* Live Preview Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner">
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-xl sm:text-2xl font-black text-[#ff6b35] block">
                    {settings.impactStat1Val || "1,200+"}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider block mt-0.5">
                    {settings.impactStat1Lbl || "Deliverance Sessions"}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-xl sm:text-2xl font-black text-[#ff6b35] block">
                    {settings.impactStat2Val || "50+"}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider block mt-0.5">
                    {settings.impactStat2Lbl || "Miracle Crusades"}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-xl sm:text-2xl font-black text-[#ff6b35] block">
                    {settings.impactStat3Val || "1,000,000+"}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider block mt-0.5">
                    {settings.impactStat3Lbl || "Believers Impacted"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-700 block">Stat 1</label>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">Number / Value</span>
                    <Input
                      value={settings.impactStat1Val}
                      onChange={(e) => setSettings({ ...settings, impactStat1Val: e.target.value })}
                      placeholder="1,200+"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">Label / Description</span>
                    <Input
                      value={settings.impactStat1Lbl}
                      onChange={(e) => setSettings({ ...settings, impactStat1Lbl: e.target.value })}
                      placeholder="Deliverance Sessions"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-700 block">Stat 2</label>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">Number / Value</span>
                    <Input
                      value={settings.impactStat2Val}
                      onChange={(e) => setSettings({ ...settings, impactStat2Val: e.target.value })}
                      placeholder="50+"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">Label / Description</span>
                    <Input
                      value={settings.impactStat2Lbl}
                      onChange={(e) => setSettings({ ...settings, impactStat2Lbl: e.target.value })}
                      placeholder="Miracle Crusades"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-700 block">Stat 3</label>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">Number / Value</span>
                    <Input
                      value={settings.impactStat3Val}
                      onChange={(e) => setSettings({ ...settings, impactStat3Val: e.target.value })}
                      placeholder="1,000,000+"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block">Label / Description</span>
                    <Input
                      value={settings.impactStat3Lbl}
                      onChange={(e) => setSettings({ ...settings, impactStat3Lbl: e.target.value })}
                      placeholder="Believers Impacted"
                    />
                  </div>
                </div>
              </div>
            </div>

            {renderSaveSectionBar("Ready to update Ministry Pillars & Impact Stats?")}
          </div>
        )}


        {/* ================= TAB 5: ABOUT & COMMUNITY OUTREACH ================= */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-2xl sm:rounded-3xl border border-orange-200/80 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ff6b35] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff6b35] block">
                    Section 4 &bull; Heritage &amp; Commission
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Founder Calling, Apostolic Statements &amp; Community
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure the Senior Pastor profile, mission and vision statements, and grassroots outreach narrative.
                  </p>
                </div>
              </div>
            </div>

            {/* Pastor Profile Details */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Senior Pastor Profile &amp; Apostolic Commission
                </h3>
                <p className="text-xs text-slate-500">
                  Featured in the Founder Spotlight on the homepage and throughout the About page.
                </p>
              </div>

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
            </div>

            {/* Mission & Vision */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Apostolic Statements of Faith
                </h3>
                <p className="text-xs text-slate-500">
                  Displayed on the About page to articulate the church&apos;s divine mandate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Grassroots Community & Elder Care */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Users className="w-5 h-5 text-[#ff6b35]" />
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Grassroots Community &amp; Elder Fellowship
                  </h3>
                  <p className="text-xs text-slate-500">
                    Highlights the outdoor gatherings with elders, mothers, and children in Suggutta.
                  </p>
                </div>
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
          <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff6b35]">
                  Mission Calendar
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Upcoming Crusades, Keshas &amp; Retreats (/events)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage live mission cards with photos, recap testimonies, and YouTube broadcasts.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  onClick={toggleAllEvents}
                  variant="outline"
                  className="text-xs font-bold rounded-xl h-9 px-3 text-slate-700"
                >
                  {allEventsExpanded ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      <span>Collapse All</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      <span>Expand All</span>
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={handleAddEvent}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl h-9 px-3 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Event</span>
                </Button>

                <Button
                  type="button"
                  onClick={handleSaveEventsOnly}
                  disabled={isPending}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl h-9 px-4 flex items-center gap-1.5 shadow-sm"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Events</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {settings.eventsJson.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p className="text-sm font-bold">No upcoming events created.</p>
                <p className="text-xs mt-1">Click &quot;Add Event&quot; above to create one.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {settings.eventsJson.map((event, idx) => {
                  const isExpanded = !!expandedEvents[idx];

                  return (
                    <div
                      key={event.id || idx}
                      className="rounded-2xl bg-slate-50 border border-slate-200/90 overflow-hidden transition-all shadow-sm"
                    >
                      {/* Compact Collapsible Header */}
                      <div
                        onClick={() => toggleEventExpanded(idx)}
                        className="p-3.5 sm:p-4 bg-white hover:bg-slate-50/80 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 transition-colors select-none"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleEventExpanded(idx);
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 shrink-0"
                            aria-label={isExpanded ? "Collapse event card" : "Expand event card"}
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-slate-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-600" />
                            )}
                          </button>

                          <div className="min-w-0 space-y-0.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-black text-slate-700 uppercase">
                                Event #{idx + 1}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                  event.status === "past"
                                    ? "bg-slate-200 text-slate-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                {event.status === "past" ? "Past Archive" : "Upcoming"}
                              </span>
                              {event.badge && (
                                <span className="text-[10px] font-extrabold text-[#ff6b35] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/60 truncate max-w-[150px]">
                                  {event.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                              {event.title || "Untitled Mission Event"}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate">
                              {event.dates || "Dates TBD"} &bull; {event.location || "Location TBD"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleEventExpanded(idx);
                            }}
                            className="text-xs font-bold text-slate-600 hover:bg-slate-100 h-8 px-2.5"
                          >
                            {isExpanded ? "Collapse" : "Edit Details"}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(idx);
                            }}
                            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-8 px-2 text-xs font-bold"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        </div>
                      </div>

                      {/* Expandable Body */}
                      {isExpanded && (
                        <div className="p-4 sm:p-6 space-y-4 bg-slate-50/70 border-t border-slate-100 animate-in fade-in duration-150">
                          {/* Event Status Toggle */}
                          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-700 block">
                              Event Status / Category
                            </label>
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handleUpdateEvent(idx, { status: "upcoming" })}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  event.status !== "past"
                                    ? "bg-emerald-600 text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 mr-1.5" />
                                Upcoming Event / Mission
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateEvent(idx, { status: "past" })}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                  event.status === "past"
                                    ? "bg-[#0f172a] text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                                <span>Past Crusade / Media Archive</span>
                              </button>
                            </div>
                            <p className="text-[10px] text-slate-400">
                              {event.status === "past"
                                ? "This event will be listed in the Past Crusades & Media Archive tab on the website with its video recap and photos."
                                : "This event will be featured under Upcoming Missions for registration."}
                            </p>
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
                              <label className="text-[11px] font-bold text-slate-700">
                                Category Badge (e.g. MISSION 2026 / KISII CRUSADE)
                              </label>
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

                          {event.status === "past" && (
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-700">
                                Crusade Recap / Testimony Notes (Optional)
                              </label>
                              <Textarea
                                rows={2}
                                placeholder="e.g. Over 5,000 believers gathered with powerful deliverance testimonies, miracles, and souls won to Christ."
                                value={event.recapNotes || ""}
                                onChange={(e) => handleUpdateEvent(idx, "recapNotes", e.target.value)}
                              />
                            </div>
                          )}

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <ImageUploadField
                              label="Event Flyer / Poster Image"
                              description="Displayed as the primary visual on event cards."
                              value={event.imageUrl}
                              onChange={(url) => handleUpdateEvent(idx, "imageUrl", url)}
                              aspectRatio="video"
                            />

                            <EventVideoUploadField
                              videoUrl={event.videoUrl}
                              videoSourceType={event.videoSourceType}
                              onChange={(url, type) =>
                                handleUpdateEvent(idx, { videoUrl: url, videoSourceType: type })
                              }
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700">
                              WhatsApp Registration / Inquiries Preset Message
                            </label>
                            <Input
                              value={event.whatsappMessage || ""}
                              placeholder="e.g. Hello Pastor Caesar, I would like to attend..."
                              onChange={(e) => handleUpdateEvent(idx, "whatsappMessage", e.target.value)}
                            />
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => toggleEventExpanded(idx)}
                              className="text-xs font-bold rounded-xl"
                            >
                              <ChevronUp className="w-3.5 h-3.5 mr-1" />
                              <span>Collapse Event Card</span>
                            </Button>

                            <Button
                              type="button"
                              size="sm"
                              onClick={handleSaveEventsOnly}
                              disabled={isPending}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Events</span>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    Ready to publish upcoming events &amp; crusades?
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Saves strictly the mission schedule and revalidates /events and the homepage instantly.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={handleSaveEventsOnly}
                disabled={isPending}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-full text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Events...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save &amp; Publish Events</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}


        {/* ================= TAB 7: BANKING & CONTACTS ================= */}
        {activeTab === "bank" && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-2xl sm:rounded-3xl border border-orange-200/80 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ff6b35] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff6b35] block">
                    Financial Transparency &amp; Reach
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Giving Channels, Diaspora Remittances &amp; Official Coordinates
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure official M-Pesa till/paybill, KCB wire details, QR posters, and header broadcast alert.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 1: Sanctuary Identity & Physical Coordinates */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Building2 className="w-5 h-5 text-[#ff6b35]" />
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Church Identity &amp; Physical Sanctuary Location
                  </h3>
                  <p className="text-xs text-slate-500">
                    Displayed on footers, official correspondence, and the Contact page.
                  </p>
                </div>
              </div>

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

            {/* Card 2: Local Kenya Giving Channels (M-Pesa Buy Goods & Paybill) */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Phone className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Local Kenyan Mobile Giving (M-Pesa Buy Goods &amp; Paybill)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Standard domestic mobile money payment channels for tithes, offerings, and building pledges.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>M-Pesa Buy Goods Till Number</span>
                    <span className="text-[10px] text-emerald-700 font-extrabold uppercase bg-emerald-100 px-2 py-0.5 rounded-full">
                      Zero Client Fee
                    </span>
                  </label>
                  <Input
                    value={settings.mpesaTillNumber}
                    onChange={(e) => setSettings({ ...settings, mpesaTillNumber: e.target.value })}
                    placeholder="8146952"
                    className="font-mono font-bold text-sm"
                  />
                  <div className="space-y-1 pt-2">
                    <span className="text-[11px] font-bold text-slate-600">Registered Till Name</span>
                    <Input
                      value={settings.mpesaTillName}
                      onChange={(e) => setSettings({ ...settings, mpesaTillName: e.target.value })}
                      placeholder="Suggutta Fellowship Church"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Universal Paybill Number</span>
                    <span className="text-[10px] text-slate-600 font-bold bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      Cross-Network
                    </span>
                  </label>
                  <Input
                    value={settings.mpesaPaybill || ""}
                    onChange={(e) => setSettings({ ...settings, mpesaPaybill: e.target.value })}
                    placeholder="522533"
                    className="font-mono font-bold text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-600">Paybill Account</span>
                      <Input
                        value={settings.mpesaPaybillAccount || ""}
                        onChange={(e) => setSettings({ ...settings, mpesaPaybillAccount: e.target.value })}
                        placeholder="8146952"
                        className="font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-600">Business Name</span>
                      <Input
                        value={settings.mpesaPaybillName || ""}
                        onChange={(e) => setSettings({ ...settings, mpesaPaybillName: e.target.value })}
                        placeholder="SUGGUTTA FELLOWSHIP"
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Pastor Direct Send Money Phone Line</label>
                  <Input
                    value={settings.mpesaPhone}
                    onChange={(e) => setSettings({ ...settings, mpesaPhone: e.target.value })}
                    placeholder="+254112656123"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Direct altar pastoral line used for M-Pesa Send Money, Sendwave, and Remitly direct-to-mobile.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: International Diaspora Remittances & Wire */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Landmark className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    International Diaspora Remittances &amp; Bank Wire
                  </h3>
                  <p className="text-xs text-slate-500">
                    Used by partners in the USA, UK, Europe, Australia, and worldwide for direct transfers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">KCB Bank Account Number</label>
                  <Input
                    value={settings.kcbAccountNumber}
                    onChange={(e) => setSettings({ ...settings, kcbAccountNumber: e.target.value })}
                    placeholder="1356891853"
                    className="font-mono font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">KCB Account Name</label>
                  <Input
                    value={settings.kcbAccountName}
                    onChange={(e) => setSettings({ ...settings, kcbAccountName: e.target.value })}
                    placeholder="SUGGUTTA FELLOWSHIP CHURCH"
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
                  <label className="text-xs font-bold text-slate-700">KCB SWIFT / BIC Code</label>
                  <Input
                    value={settings.kcbSwift}
                    onChange={(e) => setSettings({ ...settings, kcbSwift: e.target.value })}
                    placeholder="KCBLKENX"
                    className="font-mono font-bold"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Western Union / Sendwave Recipient Name</label>
                  <Input
                    value={settings.westernUnionRecipient}
                    onChange={(e) => setSettings({ ...settings, westernUnionRecipient: e.target.value })}
                    placeholder="Caesar O. Nyandwaro"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Legal name displayed to diaspora donors sending via Western Union, MoneyGram, or Sendwave.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Official Scannable QR Posters */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Official Payment Channel QR Code Posters (Optional)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload official posters or leave blank for clean automatic QR code rendering.
                  </p>
                </div>
                <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
                  Auto-Fallback Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ImageUploadField
                  label="M-Pesa Till Poster"
                  description="Upload official Safaricom green till poster or QR image for Till 8146952."
                  value={settings.mpesaTillQrImage || ""}
                  onChange={(url) => setSettings({ ...settings, mpesaTillQrImage: url })}
                  aspectRatio="square"
                />

                <ImageUploadField
                  label="M-Pesa Paybill Poster"
                  description="Upload official Paybill poster image for Business No. 522533."
                  value={settings.mpesaPaybillQrImage || ""}
                  onChange={(url) => setSettings({ ...settings, mpesaPaybillQrImage: url })}
                  aspectRatio="square"
                />

                <ImageUploadField
                  label="KCB Bank Deposit Poster"
                  description="Upload official KCB deposit slip or scannable poster for Acc 1356891853."
                  value={settings.kcbBankQrImage || ""}
                  onChange={(url) => setSettings({ ...settings, kcbBankQrImage: url })}
                  aspectRatio="square"
                />
              </div>
            </div>

            {/* Card 5: Communications, Social Handles & Live TopBar Banner */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Globe className="w-5 h-5 text-[#ff6b35]" />
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Communications, Social Links &amp; Header TopBar
                  </h3>
                  <p className="text-xs text-slate-500">
                    Public communication channels, YouTube live destination, and top announcement banner.
                  </p>
                </div>
              </div>

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
              </div>

              {/* Header Top Bar Alert */}
              <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/50 border border-orange-200/80 space-y-4 pt-4 mt-2">
                <div className="flex items-center gap-2 border-b border-orange-200/60 pb-2.5">
                  <Radio className="w-4 h-4 text-rose-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    Header Top Bar &amp; Live Broadcast Alert
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
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
                      When active, a pulsing red live indicator and clickable broadcast badge appear in the top bar.
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
                    <label className="text-xs font-bold text-slate-700">Live Broadcast Destination URL</label>
                    <Input
                      value={settings.topbarLiveUrl}
                      onChange={(e) => setSettings({ ...settings, topbarLiveUrl: e.target.value })}
                      placeholder="https://www.youtube.com/@Brianmbera"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Top Bar Announcement / Service Schedule</label>
                    <Input
                      value={settings.topbarAnnouncement}
                      onChange={(e) => setSettings({ ...settings, topbarAnnouncement: e.target.value })}
                      placeholder="Sunday Service: 8:00 AM – 11:45 AM | Sanctuary & Online"
                    />
                  </div>
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
      <div className="fixed bottom-0 left-0 md:left-64 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 sm:px-8 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] shadow-[0_-8px_25px_rgba(0,0,0,0.09)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              hasUnsavedChanges
                ? "bg-amber-500 animate-pulse ring-4 ring-amber-100"
                : "bg-emerald-500 ring-4 ring-emerald-100"
            }`}
          />
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 block">
                {hasUnsavedChanges ? "Unsaved Changes Pending" : "CMS Live Publishing Hub"}
              </span>
              {hasUnsavedChanges && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider">
                  Draft
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 block truncate">
              {hasUnsavedChanges
                ? "You have modified content that has not yet been published to the live website."
                : "All modifications are synchronized with the live public website."}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-800 sm:hidden truncate">
            {hasUnsavedChanges ? "Draft Changes" : "Synced"}
          </span>
        </div>

        {/* Floating Quick Feedback Toast for immediate visibility */}
        {feedback && (
          <div
            className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all animate-in fade-in slide-in-from-bottom-2 ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm"
                : "bg-rose-50 border-rose-300 text-rose-800 shadow-sm"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="truncate max-w-[280px]">{feedback.message}</span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="p-0.5 hover:bg-black/5 rounded-full text-slate-400 hover:text-slate-600 ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            onClick={(e) => handleSave(e)}
            disabled={isPending}
            className={`font-black px-5 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-lg text-xs sm:text-sm h-auto flex items-center gap-2 border-0 transition-all ${
              hasUnsavedChanges
                ? "bg-[#ff6b35] hover:bg-[#ea580c] text-white shadow-orange-500/30 ring-2 ring-orange-300/60 scale-[1.02]"
                : "bg-[#0A2240] hover:bg-[#07162c] text-white shadow-slate-900/20"
            }`}
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{hasUnsavedChanges ? "Publish All Changes" : "Save All Changes"}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ================= EDIT ORPHANAGE PHOTO MODAL ================= */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[90dvh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6 shrink-0">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-600">
                  Children&apos;s Home CMS
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Edit Photo Moment Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditPhoto} className="flex flex-col flex-1 min-h-0">
              <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Photo Title *</label>
                  <Input
                    required
                    value={editPhotoTitle}
                    onChange={(e) => setEditPhotoTitle(e.target.value)}
                    placeholder="e.g. Joyful Morning Devotion & Smiles"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category Tag</label>
                  <select
                    value={editPhotoCategory}
                    onChange={(e) => setEditPhotoCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  >
                    <option value="Daily Life">Daily Life</option>
                    <option value="Education">Education & Schooling</option>
                    <option value="Worship">Worship & Prayer</option>
                    <option value="Meals & Nutrition">Meals & Nutrition</option>
                    <option value="Healthcare">Healthcare & Well-being</option>
                    <option value="Playtime">Playtime & Sports</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Caption / Narrative (Optional)</label>
                  <Textarea
                    rows={2}
                    value={editPhotoCaption}
                    onChange={(e) => setEditPhotoCaption(e.target.value)}
                    placeholder="Brief story or message explaining this photo..."
                  />
                </div>

                <div className="space-y-1">
                  <ImageUploadField
                    label="Photo Image Plate"
                    description="Keep the current image or upload a replacement."
                    value={editPhotoImageUrl}
                    onChange={(url) => setEditPhotoImageUrl(url)}
                    aspectRatio="video"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 p-4 sm:p-6 border-t border-slate-100 bg-slate-50/80 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingPhoto(null)}
                  className="rounded-xl text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
                >
                  {isPending ? "Saving..." : "Save Photo Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT ORPHANAGE VIDEO MODAL ================= */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[90dvh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6 shrink-0">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-600">
                  Children&apos;s Home CMS
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Edit Video Story Details
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update title, description, badge, or replace media without deleting.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingVideo(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditVideo} className="flex flex-col flex-1 min-h-0">
              <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Video Title *</label>
                    <Input
                      required
                      value={editVideoTitle}
                      onChange={(e) => setEditVideoTitle(e.target.value)}
                      placeholder="e.g. Children Smiling & Morning Worship"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Badge / Tag</label>
                    <Input
                      value={editVideoBadge}
                      onChange={(e) => setEditVideoBadge(e.target.value)}
                      placeholder="e.g. Daily Life Story"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Description (Optional)</label>
                  <Textarea
                    rows={2}
                    value={editVideoDescription}
                    onChange={(e) => setEditVideoDescription(e.target.value)}
                    placeholder="Brief description for donors and sponsors..."
                  />
                </div>

                {/* Video Source Control */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-700 block">Video Source</label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setEditVideoSourceMode("keep")}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                        editVideoSourceMode === "keep"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Keep Current
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditVideoSourceMode("youtube")}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                        editVideoSourceMode === "youtube"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      YouTube Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditVideoSourceMode("upload")}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                        editVideoSourceMode === "upload"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Upload New File
                    </button>
                  </div>

                  {editVideoSourceMode === "keep" && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <p className="font-bold text-slate-700">Current Video Attached:</p>
                      <p className="font-mono text-slate-500 truncate text-[11px]">{editingVideo.videoUrl}</p>
                      <p className="text-[10px] text-slate-400">
                        You can edit title, description, or badge without re-uploading the video file.
                      </p>
                    </div>
                  )}

                  {editVideoSourceMode === "youtube" && (
                    <div className="space-y-1">
                      <Input
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={editVideoUrlInput}
                        onChange={(e) => setEditVideoUrlInput(e.target.value)}
                      />
                    </div>
                  )}

                  {editVideoSourceMode === "upload" && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <input
                        type="file"
                        ref={editVideoFileInputRef}
                        accept="video/*"
                        onChange={handleEditVideoFileChange}
                        className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                      />
                      {editVideoIsUploading && (
                        <p className="text-xs text-rose-600 font-bold flex items-center gap-1.5">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading video file...
                        </p>
                      )}
                      {editVideoUploadedUrl && !editVideoIsUploading && (
                        <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Replacement video attached
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Custom Thumbnail */}
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-700 block">Custom Poster Thumbnail (Optional)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      ref={editThumbFileInputRef}
                      accept="image/*"
                      onChange={handleEditVideoThumbChange}
                      className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                    />
                    {editVideoIsUploadingThumb && (
                      <Loader2 className="w-4 h-4 text-rose-600 animate-spin" />
                    )}
                    {editVideoThumbUrl && !editVideoIsUploadingThumb && (
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Poster Ready
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 p-4 sm:p-6 border-t border-slate-100 bg-slate-50/80 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingVideo(null)}
                  className="rounded-xl text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || editVideoIsUploading || editVideoIsUploadingThumb}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
                >
                  {isPending ? "Saving..." : "Save Video Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
