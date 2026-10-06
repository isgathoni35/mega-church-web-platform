"use client";

import React, { useState, useTransition } from "react";
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
} from "lucide-react";
import { SiteSettingsData, MinistryEventItem } from "@/types/settings";
import { saveSiteSettingsAction } from "@/actions/admin-settings";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SettingsManagerViewProps {
  initialSettings: SiteSettingsData;
}

type TabType = "hero" | "projects" | "pillars" | "about" | "events" | "bank";

export function SettingsManagerView({ initialSettings }: SettingsManagerViewProps) {
  const [settings, setSettings] = useState<SiteSettingsData>(initialSettings);
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlCode = `-- Sugutta Fellowship Church - Comprehensive CMS & Media Configuration
-- Run this in Supabase SQL Editor (SQL Editor -> New Query -> Run)

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_1 TEXT NOT NULL DEFAULT 'Sugutta';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_2 TEXT NOT NULL DEFAULT 'Fellowship';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_3 TEXT NOT NULL DEFAULT 'Church';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_subtitle TEXT NOT NULL DEFAULT 'We are a Christ-centered, Spirit-filled family learning to follow Jesus faithfully and carry His Gospel into everyday life.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_promise TEXT NOT NULL DEFAULT 'Experience God''s power through deliverance and spiritual transformation.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_image_url TEXT NOT NULL DEFAULT '/images/pastor-caesar-hero.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_branches TEXT NOT NULL DEFAULT '50+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_lives TEXT NOT NULL DEFAULT '1M+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_years TEXT NOT NULL DEFAULT '25+';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mission_statement TEXT NOT NULL DEFAULT 'To win souls to Christ, disciple believers in sound biblical doctrine, break spiritual bondages through the power of the Holy Spirit, and raise an empowered community walking in holiness and divine covenant purpose.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS vision_statement TEXT NOT NULL DEFAULT 'To be an apostolic beacon of worship and spiritual awakening across Kenya and the nations, demonstrating Christ''s compassion, planting praying families, and advancing the Kingdom of God.';

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

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_title TEXT NOT NULL DEFAULT 'Rooted in Our Community, Walking Alongside Families';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_narrative TEXT NOT NULL DEFAULT 'True Christian ministry is never confined to sanctuary walls. In Sugutta and neighboring villages, our pastoral team and church workers meet regularly with village elders, struggling families, and young children in their homesteads.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_image_url TEXT NOT NULL DEFAULT '/images/community-outreach.jpg';

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

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS events_json JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS youtube_channel_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/@Brianmbera';`;



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
        type="submit"
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
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
          onClick={() => setActiveTab("pillars")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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

            {/* 3 Hero Counter Strip */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Hero Bottom Stat Counters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Stat 1 (e.g. Branches)</label>
                  <Input
                    value={settings.heroStatBranches}
                    onChange={(e) => setSettings({ ...settings, heroStatBranches: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Stat 2 (e.g. Lives Touched)</label>
                  <Input
                    value={settings.heroStatLives}
                    onChange={(e) => setSettings({ ...settings, heroStatLives: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Stat 3 (e.g. Years Ministry)</label>
                  <Input
                    value={settings.heroStatYears}
                    onChange={(e) => setSettings({ ...settings, heroStatYears: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {renderSaveSectionBar("Ready to update Homepage & Hero?")}
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
                  <label className="text-xs font-bold text-slate-700">Lipa na M-Pesa Paybill</label>
                  <Input
                    value={settings.mpesaPaybill}
                    onChange={(e) => setSettings({ ...settings, mpesaPaybill: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Pastor Send Money Phone Line</label>
                  <Input
                    value={settings.mpesaPhone}
                    onChange={(e) => setSettings({ ...settings, mpesaPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">KCB Bank Account Number</label>
                  <Input
                    value={settings.kcbAccountNumber}
                    onChange={(e) => setSettings({ ...settings, kcbAccountNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">KCB Account Name</label>
                  <Input
                    value={settings.kcbAccountName}
                    onChange={(e) => setSettings({ ...settings, kcbAccountName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">KCB Branch</label>
                  <Input
                    value={settings.kcbBranch}
                    onChange={(e) => setSettings({ ...settings, kcbBranch: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">KCB SWIFT Code</label>
                  <Input
                    value={settings.kcbSwift}
                    onChange={(e) => setSettings({ ...settings, kcbSwift: e.target.value })}
                  />
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
                  <label className="text-xs font-bold text-slate-700">Contact Email</label>
                  <Input
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  />
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
    </div>

  );
}
