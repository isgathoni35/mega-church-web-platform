"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, Mail, Radio, Heart } from "lucide-react";

export function TopBar() {
  return (
    <div className="w-full bg-primary/95 text-primary-foreground/90 border-b border-white/10 text-xs py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Contact Info (Hidden on very small screens, visible on sm+) */}
        <div className="hidden sm:flex items-center gap-6">
          <a
            href="tel:+254700000000"
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-accent" />
            <span>+254 700 000 000</span>
          </a>
          <a
            href="mailto:contact@churchministry.org"
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Mail className="h-3.5 w-3.5 text-accent" />
            <span>contact@churchministry.org</span>
          </a>
        </div>

        {/* Quick Links: Live Stream badge and Prayer Request */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 sm:gap-4 ml-auto text-[11px]">
          <Link
            href="/sermons?live=true"
            className="flex items-center gap-1.5 sm:gap-2 font-medium hover:text-accent transition-colors truncate"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" style={{ animationDuration: '2s' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <Radio className="h-3.5 w-3.5 text-accent shrink-0" />
            <span className="uppercase tracking-wider font-semibold truncate">
              Live Stream
            </span>
          </Link>

          <span className="text-white/20 shrink-0">|</span>

          <Link
            href="/prayer-request"
            className="flex items-center gap-1.5 hover:text-accent transition-colors font-medium shrink-0"
          >
            <Heart className="h-3 w-3 text-accent fill-accent/20" />
            <span>Prayer Request</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
