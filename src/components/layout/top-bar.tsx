"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, Mail, Radio, Sparkles, MessageCircle } from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface TopBarProps {
  settings?: SiteSettingsData;
}

export function TopBar({ settings: propSettings }: TopBarProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const rawPhone = settings.mpesaPhone || DEFAULT_SETTINGS.mpesaPhone;
  const cleanPhone = rawPhone.replace(/[\s\-]/g, "");
  const email = settings.contactEmail || DEFAULT_SETTINGS.contactEmail;
  const isLive = settings.topbarLiveActive ?? DEFAULT_SETTINGS.topbarLiveActive;
  const liveLabel = settings.topbarLiveLabel || DEFAULT_SETTINGS.topbarLiveLabel;
  const liveUrl = settings.topbarLiveUrl || DEFAULT_SETTINGS.topbarLiveUrl;
  const announcement = settings.topbarAnnouncement || DEFAULT_SETTINGS.topbarAnnouncement;

  const isExternalLive = liveUrl.startsWith("http://") || liveUrl.startsWith("https://");

  return (
    <div className="w-full bg-white text-slate-600 border-b border-slate-200/90 text-xs py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 transition-colors select-none">
      {/* ================= MOBILE VIEW (sm:hidden) ================= */}
      <div className="flex sm:hidden items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        {/* Left: Phone Direct Call Button & WhatsApp */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-1 text-slate-800 font-extrabold text-[11px] hover:text-[#ff6b35] transition-colors"
            title={`Call Church Line: ${rawPhone}`}
          >
            <Phone className="h-3 w-3 text-[#ff6b35] shrink-0" />
            <span>{rawPhone}</span>
          </a>
          <a
            href="https://wa.me/254112656123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-2.5 h-2.5 text-[#25D366]" />
            <span>WA</span>
          </a>
        </div>

        {/* Right: Compact Live Stream & Prayer Request */}
        <div className="flex items-center gap-2 shrink-0 text-[10px]">
          {isLive && (
            isExternalLive ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-extrabold text-red-600 bg-red-50 border border-red-200/80 px-2 py-0.5 rounded-full shadow-2xs hover:bg-red-100 transition-colors"
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600" />
                </span>
                <span className="tracking-tight uppercase">LIVE</span>
              </a>
            ) : (
              <Link
                href={liveUrl || "/sermons?live=true"}
                className="inline-flex items-center gap-1 font-extrabold text-red-600 bg-red-50 border border-red-200/80 px-2 py-0.5 rounded-full shadow-2xs hover:bg-red-100 transition-colors"
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600" />
                </span>
                <span className="tracking-tight uppercase">LIVE</span>
              </Link>
            )
          )}

          <Link
            href="/prayer-request"
            className="flex items-center gap-1 font-semibold text-slate-700 hover:text-[#ff6b35] transition-colors shrink-0"
          >
            <Sparkles className="h-3 w-3 text-[#ff6b35]" />
            <span>Prayer</span>
          </Link>
        </div>
      </div>

      {/* ================= DESKTOP & TABLET VIEW (hidden sm:flex) ================= */}
      <div className="hidden sm:flex max-w-7xl mx-auto items-center justify-between gap-3">
        {/* Left Side: Contact Information */}
        <div className="flex items-center gap-4 md:gap-6 min-w-0">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 text-slate-700 hover:text-[#ff6b35] transition-colors group shrink-0"
              title={`Call: ${rawPhone}`}
            >
              <Phone className="h-3.5 w-3.5 text-[#ff6b35] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-xs truncate">{rawPhone}</span>
            </a>
            <a
              href="https://wa.me/254112656123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold hover:bg-emerald-100 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 text-slate-700 hover:text-[#ff6b35] transition-colors group truncate"
            title={`Email: ${email}`}
          >
            <Mail className="h-3.5 w-3.5 text-[#ff6b35] group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-medium text-xs truncate max-w-[180px] md:max-w-none">
              {email}
            </span>
          </a>
        </div>

        {/* Center: Ministry Announcement / Schedule Note */}
        {announcement && (
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-500 font-medium truncate max-w-sm">
            <Sparkles className="h-3 w-3 text-[#ff6b35] shrink-0" />
            <span className="truncate">{announcement}</span>
          </div>
        )}

        {/* Right Side: Live Broadcast Button & Prayer Request */}
        <div className="flex items-center gap-4 shrink-0 ml-auto text-xs">
          {isExternalLive ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-slate-800 hover:text-[#ff6b35] transition-colors py-0.5 px-2.5 rounded-full hover:bg-orange-50 border border-transparent hover:border-orange-200"
            >
              {isLive ? (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
              ) : (
                <Radio className="h-3.5 w-3.5 text-[#ff6b35] shrink-0" />
              )}
              <span className="tracking-tight text-xs">{liveLabel}</span>
            </a>
          ) : (
            <Link
              href={liveUrl || "/sermons?live=true"}
              className="inline-flex items-center gap-1.5 font-bold text-slate-800 hover:text-[#ff6b35] transition-colors py-0.5 px-2.5 rounded-full hover:bg-orange-50 border border-transparent hover:border-orange-200"
            >
              {isLive ? (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
              ) : (
                <Radio className="h-3.5 w-3.5 text-[#ff6b35] shrink-0" />
              )}
              <span className="tracking-tight text-xs">{liveLabel}</span>
            </Link>
          )}

          <Link
            href="/prayer-request"
            className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-[#ff6b35] transition-colors shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#ff6b35]" />
            <span className="tracking-wide">Prayer Request</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
