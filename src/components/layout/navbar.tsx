"use client";

import * as React from "react";
import Image from "next/image";
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
  { label: "Events", href: "/events" },
  { label: "Children's Home", href: "/orphanage" },
  { label: "Sermons", href: "/sermons" },
  { label: "Prayer Altar", href: "/prayer-request" },
  { label: "Connect", href: "/contact" },
];

export function Navbar() {
  return (
    <nav className="w-full bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-20 px-4 sm:px-8">
        {/* Brand / Logo (Sugutta Fellowship Official Circular Emblem) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
          aria-label="Sugutta Fellowship Church International - Home"
        >
          <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden ring-2 ring-[#C59B27]/50 group-hover:ring-[#C59B27] shadow-md group-hover:scale-105 transition-all shrink-0 bg-white">
            <Image
              src="/images/sugutta-logo.png"
              alt="Sugutta Fellowship Church Logo"
              fill
              sizes="(max-width: 640px) 44px, 48px"
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-[#0A2240] leading-tight uppercase truncate">
              Heavens Gates Sugutta
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-[10px] sm:text-xs font-bold tracking-wider text-[#C59B27] uppercase truncate">
                Fellowship Church International
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links (Dark Slate with Orange hover/active) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-7">
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
              Give
            </Link>
          </Button>

          {/* Mobile Navigation Drawer Trigger */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
