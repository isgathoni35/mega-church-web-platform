"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, Mail, Radio, Heart } from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface TopBarProps {
  settings?: SiteSettingsData;
}

export function TopBar({ settings: propSettings }: TopBarProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const rawPhone = settings.mpesaPhone || DEFAULT_SETTINGS.mpesaPhone;
  const cleanPhone = rawPhone.replace(/[\s\-]/g, "");
  const email = settings.contactEmail || DEFAULT_SETTINGS.contactEmail;

  return (
    <div className="w-full bg-white text-slate-600 border-b border-slate-200/80 text-xs py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Contact Info (Hidden on very small screens, visible on sm+) */}
        <div className="hidden sm:flex items-center gap-6">
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-1.5 hover:text-[#ff6b35] transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-[#ff6b35]" />
            <span className="font-medium text-slate-700">{rawPhone}</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 hover:text-[#ff6b35] transition-colors"
          >
            <Mail className="h-3.5 w-3.5 text-[#ff6b35]" />
            <span className="font-medium text-slate-700">{email}</span>
          </a>
        </div>

        {/* Quick Links: Live Stream badge and Prayer Request */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 ml-auto text-[11px]">
          <Link
            href="/sermons?live=true"
            className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-[#ff6b35] transition-colors truncate"
          >
            <Radio className="h-3.5 w-3.5 text-[#ff6b35] shrink-0" />
            <span className="tracking-wide">Live Stream</span>
          </Link>

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
