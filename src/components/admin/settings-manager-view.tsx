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
  ShieldCheck,
  Globe,
  User,
  Image as ImageIcon,
  Share2,
  MapPin,
  Send,
} from "lucide-react";
import { SiteSettingsData } from "@/types/settings";
import { saveSiteSettingsAction } from "@/actions/admin-settings";

interface SettingsManagerViewProps {
  initialSettings: SiteSettingsData;
}

export function SettingsManagerView({ initialSettings }: SettingsManagerViewProps) {
  const [settings, setSettings] = useState<SiteSettingsData>(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlCode = `-- Sugutta Fellowship Church - Dynamic Pastoral & Altar Configuration
-- Run this in Supabase SQL Editor (SQL Editor -> New Query -> Run)

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_name TEXT NOT NULL DEFAULT 'Pastor Caesar Osebe Nyandwaro';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_title TEXT NOT NULL DEFAULT 'Resident Pastor & Visionary';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_image_url TEXT NOT NULL DEFAULT '/images/pastor-caesar.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_bio TEXT NOT NULL DEFAULT 'Called by God with an apostolic passion to set the captives free, build disciples through sound Biblical exposition, and lead Sugutta Fellowship Church into dynamic community transformation and global impact.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_national_id TEXT NOT NULL DEFAULT '39966005';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS church_motto TEXT NOT NULL DEFAULT 'REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS church_slogan TEXT NOT NULL DEFAULT 'Come. Connect. Grow. Go.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS postal_address TEXT NOT NULL DEFAULT 'P.O BOX 405-40211, SUGGUTTA';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS physical_location TEXT NOT NULL DEFAULT 'Sugutta Sanctuary, Kenya';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_phone TEXT NOT NULL DEFAULT '+254112656123';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_email TEXT NOT NULL DEFAULT 'caesarosebe@gmail.com';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS facebook_url TEXT NOT NULL DEFAULT 'https://facebook.com/SUGGUTTA-FELLOWSHIP-CHURCH';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/suggutta';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_account_number TEXT NOT NULL DEFAULT '1234567890';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_account_name TEXT NOT NULL DEFAULT 'Sugutta Fellowship Church';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_branch TEXT NOT NULL DEFAULT 'Nairobi Central Branch';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_swift TEXT NOT NULL DEFAULT 'KCBLKENX';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_paybill TEXT NOT NULL DEFAULT '174379';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS western_union_recipient TEXT NOT NULL DEFAULT 'Caesar Osebe Nyandwaro';

-- Upgrade placeholder defaults
UPDATE public.site_settings
SET
  pastor_name = COALESCE(NULLIF(pastor_name, ''), 'Pastor Caesar Osebe Nyandwaro'),
  pastor_title = COALESCE(NULLIF(pastor_title, ''), 'Resident Pastor & Visionary'),
  pastor_image_url = COALESCE(NULLIF(pastor_image_url, ''), '/images/pastor-caesar.jpg'),
  pastor_national_id = COALESCE(NULLIF(pastor_national_id, ''), '39966005'),
  church_motto = COALESCE(NULLIF(church_motto, ''), 'REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD'),
  church_slogan = COALESCE(NULLIF(church_slogan, ''), 'Come. Connect. Grow. Go.'),
  postal_address = COALESCE(NULLIF(postal_address, ''), 'P.O BOX 405-40211, SUGGUTTA'),
  physical_location = COALESCE(NULLIF(physical_location, ''), 'Sugutta Sanctuary, Kenya'),
  western_union_recipient = COALESCE(NULLIF(western_union_recipient, ''), 'Caesar Osebe Nyandwaro');`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    startTransition(async () => {
      const res = await saveSiteSettingsAction(settings);
      if (res.success) {
        setFeedback({
          type: "success",
          message: res.message || "Pastor profile, church identity, and financial coordinates updated successfully across all pages!",
        });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to update church settings. If database columns are missing, please run the SQL query below in Supabase.",
        });
      }
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27] mb-1">
          <Database className="w-3.5 h-3.5" />
          <span>System & Altar Configuration</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#0A2240]">
          Church Information & Pastoral Portal
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Control the Pastor&apos;s photo and bio, church motto, official address, social channels, and remittance coordinates displayed on the public website.
        </p>
      </div>

      {/* Notification Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800"
              : "bg-red-500/10 border-red-500/30 text-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="text-sm leading-relaxed">{feedback.message}</div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* CARD 1: Pastoral Profile & Resident Minister */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#C59B27]/10 text-[#C59B27] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0A2240]">
                Resident Pastor & Spiritual Leadership
              </h2>
              <p className="text-xs text-slate-500">
                Update the resident pastor&apos;s photo, official name, ministerial title, and bio displayed on the homepage, about page, and service invitations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Portrait Preview */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center p-5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <div className="relative w-36 h-44 rounded-xl overflow-hidden border-2 border-[#C59B27]/40 shadow-md mb-3 bg-slate-200">
                {settings.pastorImageUrl ? (
                  <Image
                    src={settings.pastorImageUrl}
                    alt={settings.pastorName || "Pastor"}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>
              <span className="text-xs font-semibold text-[#0A2240]">{settings.pastorName}</span>
              <span className="text-[11px] text-slate-500">{settings.pastorTitle}</span>
              <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mt-2 border border-amber-200">
                Live Website Portrait
              </span>
            </div>

            {/* Pastor Profile Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Pastor Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.pastorName}
                    onChange={(e) => setSettings({ ...settings, pastorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/40 focus:border-[#C59B27]"
                    placeholder="e.g. Pastor Caesar Osebe Nyandwaro"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Official Ministerial Title
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.pastorTitle}
                    onChange={(e) => setSettings({ ...settings, pastorTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/40 focus:border-[#C59B27]"
                    placeholder="e.g. Resident Pastor & Visionary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Photo URL or Image Path
                  </label>
                  <div className="relative">
                    <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={settings.pastorImageUrl}
                      onChange={(e) => setSettings({ ...settings, pastorImageUrl: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/40 focus:border-[#C59B27]"
                      placeholder="/images/pastor-caesar.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    National ID (For Remittances & Compliance)
                  </label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={settings.pastorNationalId}
                      onChange={(e) => setSettings({ ...settings, pastorNationalId: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/40 focus:border-[#C59B27]"
                      placeholder="e.g. 39966005"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Pastoral Bio & Ministry Calling
                </label>
                <textarea
                  rows={3}
                  value={settings.pastorBio}
                  onChange={(e) => setSettings({ ...settings, pastorBio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/40 focus:border-[#C59B27] resize-none"
                  placeholder="A brief summary of pastoral vision and spiritual commission..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Church Identity & Coordinates */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0A2240]">
                Church Identity, Motto & Location
              </h2>
              <p className="text-xs text-slate-500">
                Official church motto, movement slogan, physical sanctuary location, and postal address.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Church Motto
              </label>
              <input
                type="text"
                required
                value={settings.churchMotto}
                onChange={(e) => setSettings({ ...settings, churchMotto: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                placeholder="REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Movement Slogan / Vision Hook
              </label>
              <input
                type="text"
                required
                value={settings.churchSlogan}
                onChange={(e) => setSettings({ ...settings, churchSlogan: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                placeholder="Come. Connect. Grow. Go."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Postal Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={settings.postalAddress}
                  onChange={(e) => setSettings({ ...settings, postalAddress: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  placeholder="P.O BOX 405-40211, SUGGUTTA"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Physical Sanctuary Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={settings.physicalLocation}
                  onChange={(e) => setSettings({ ...settings, physicalLocation: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  placeholder="Sugutta Sanctuary, Kenya"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Communication Hotlines & Social Media */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0A2240]">
                Communication Hotlines & Social Media
              </h2>
              <p className="text-xs text-slate-500">
                Official pastoral telephone lines, secretariat email, and social media handles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Pastoral Phone Hotline / M-Pesa Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={settings.mpesaPhone}
                  onChange={(e) => setSettings({ ...settings, mpesaPhone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                  placeholder="+254112656123"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Secretariat & Pastoral Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                  placeholder="caesarosebe@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Facebook Page Link
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={settings.facebookUrl}
                  onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                  placeholder="https://facebook.com/SUGGUTTA-FELLOWSHIP-CHURCH"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Instagram Handle Link
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={settings.instagramUrl}
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                  placeholder="https://instagram.com/suggutta"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: Remittance & Banking Coordinates (M-Pesa, Western Union, KCB) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0A2240]">
                Remittance & Giving Coordinates (M-Pesa, Sendwave, Western Union, KCB)
              </h2>
              <p className="text-xs text-slate-500">
                Shown to local worshippers, international diaspora partners, and electronic EFT bank transfer donors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                M-Pesa Paybill Number
              </label>
              <input
                type="text"
                required
                value={settings.mpesaPaybill}
                onChange={(e) => setSettings({ ...settings, mpesaPaybill: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-mono"
                placeholder="e.g. 174379"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Western Union & Sendwave Recipient Name
              </label>
              <div className="relative">
                <Send className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={settings.westernUnionRecipient}
                  onChange={(e) => setSettings({ ...settings, westernUnionRecipient: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  placeholder="Caesar Osebe Nyandwaro"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                KCB Account Number
              </label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={settings.kcbAccountNumber}
                  onChange={(e) => setSettings({ ...settings, kcbAccountNumber: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/40 focus:border-[#C59B27] font-mono"
                  placeholder="e.g. 1234567890"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                KCB Account Name
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={settings.kcbAccountName}
                  onChange={(e) => setSettings({ ...settings, kcbAccountName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/40 focus:border-[#C59B27]"
                  placeholder="Sugutta Fellowship Church"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                KCB Branch
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={settings.kcbBranch}
                  onChange={(e) => setSettings({ ...settings, kcbBranch: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/40 focus:border-[#C59B27]"
                  placeholder="e.g. Nairobi Central Branch"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                KCB SWIFT / BIC Code (International Wire)
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={settings.kcbSwift}
                  onChange={(e) => setSettings({ ...settings, kcbSwift: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-[#C59B27]/40 focus:border-[#C59B27] font-mono"
                  placeholder="e.g. KCBLKENX"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-8 py-3.5 bg-[#0A2240] hover:bg-[#07192f] text-white font-medium text-sm rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-[#C59B27]" />
            {isPending ? "Saving Church Settings..." : "Save Settings & Revalidate Website"}
          </button>
        </div>
      </form>

      {/* Supabase SQL Migration Box */}
      <div className="bg-[#0A2240] rounded-2xl border border-white/10 text-white p-6 lg:p-8 mt-12 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C59B27]">
              <Database className="w-4 h-4" />
              <span>Supabase Database Migration Script</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Database Migration SQL
            </h3>
            <p className="text-xs text-white/60">
              Run this in your Supabase dashboard SQL Editor to create any missing columns in the <code className="text-[#C59B27]">site_settings</code> table.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopySql}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider text-[#C59B27] rounded-lg transition-all border border-white/10 shrink-0 self-start sm:self-auto cursor-pointer"
          >
            {copiedSql ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy SQL Query</span>
              </>
            )}
          </button>
        </div>

        <pre className="bg-black/40 p-4 rounded-xl font-mono text-xs text-emerald-300/90 overflow-x-auto border border-white/5 leading-relaxed">
          {sqlCode}
        </pre>
      </div>
    </div>
  );
}
