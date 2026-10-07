"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, Mail, Radio, Sparkles } from "lucide-react";
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
    <div className="w-full bg-white text-slate-600 border-b border-slate-200/90 text-xs py-2 px-3 sm:px-6 lg:px-8 transition-colors select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left Side: Contact Information (Visible on all screens with responsive scaling) */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-1.5 text-slate-700 hover:text-[#ff6b35] transition-colors group shrink-0"
            title={`Call: ${rawPhone}`}
          >
            <Phone className="h-3.5 w-3.5 text-[#ff6b35] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-[11px] sm:text-xs truncate">{rawPhone}</span>
          </a>

          <a
            href={`mailto:${email}`}
            className="hidden xs:flex items-center gap-1.5 text-slate-700 hover:text-[#ff6b35] transition-colors group truncate"
            title={`Email: ${email}`}
          >
            <Mail className="h-3.5 w-3.5 text-[#ff6b35] group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs truncate max-w-[150px] md:max-w-none">
              {email}
            </span>
          </a>
        </div>

        {/* Center: Ministry Announcement / Schedule Note (Desktop only) */}
        {announcement && (
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-500 font-medium truncate max-w-sm">
            <Sparkles className="h-3 w-3 text-[#ff6b35] shrink-0" />
            <span className="truncate">{announcement}</span>
          </div>
        )}

        {/* Right Side: Live Broadcast Button & Prayer Request */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0 ml-auto text-[11px] sm:text-xs">
          {/* Dynamic Live Broadcast Indicator & Launcher */}
          {isExternalLive ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-slate-800 hover:text-[#ff6b35] transition-colors py-0.5 px-2 rounded-full hover:bg-orange-50 border border-transparent hover:border-orange-200"
            >
              {isLive ? (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
              ) : (
                <Radio className="h-3.5 w-3.5 text-[#ff6b35] shrink-0" />
              )}
              <span className="tracking-tight text-[11px]">{liveLabel}</span>
            </a>
          ) : (
            <Link
              href={liveUrl || "/sermons?live=true"}
              className="inline-flex items-center gap-1.5 font-bold text-slate-800 hover:text-[#ff6b35] transition-colors py-0.5 px-2 rounded-full hover:bg-orange-50 border border-transparent hover:border-orange-200"
            >
              {isLive ? (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
              ) : (
                <Radio className="h-3.5 w-3.5 text-[#ff6b35] shrink-0" />
              )}
              <span className="tracking-tight text-[11px]">{liveLabel}</span>
            </Link>
          )}

          {/* Prayer Request Quick Link */}
          <Link
            href="/prayer-request"
            className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-[#ff6b35] transition-colors shrink-0"
          >
            <svg
              className="h-3.5 w-3.5 text-[#ff6b35]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span className="tracking-wide">Prayer Request</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
