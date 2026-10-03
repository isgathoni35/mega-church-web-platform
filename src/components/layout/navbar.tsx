"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { MobileNav } from "./mobile-nav";

interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Children's Home", href: "/orphanage" },
  { label: "Sermons", href: "/sermons" },
  { label: "Prayer Altar", href: "/prayer-request" },
  { label: "Connect", href: "/contact" },
];

export function Navbar() {
  return (
    <nav className="w-full bg-white text-slate-900 border-b border-slate-200/80 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-8">
        {/* Brand / Logo (Matching Neno Screenshot 1) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
          aria-label="Heavens Gates Sugutta Fellowship Church International - Home"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#ff6b35] flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform shrink-0">
            ✝
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-[#0f172a] leading-tight uppercase truncate">
              Heavens Gates Sugutta
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold tracking-wider text-[#ff6b35] uppercase truncate">
              Fellowship Church International
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Dark Slate with Orange hover/active) */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-700 hover:text-[#ff6b35] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#ff6b35] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <Button
            size="default"
            className="hidden sm:inline-flex font-bold shadow-md hover:brightness-110 bg-[#ff6b35] hover:bg-[#ea580c] text-white border-0 px-6 py-2.5 rounded-md transition-all"
            asChild
          >
            <Link href="/give">
              <Heart className="mr-1.5 h-4 w-4 fill-current" />
              Give Online
            </Link>
          </Button>

          {/* Mobile Navigation Drawer Trigger */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
