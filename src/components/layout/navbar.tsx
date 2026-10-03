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
  { label: "Campuses", href: "/branches" },
  { label: "Prayer Altar", href: "/prayer-request" },
  { label: "Connect", href: "/contact" },
];

export function Navbar() {
  return (
    <nav className="w-full bg-primary text-primary-foreground border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-8">
        {/* Brand / Logo Placeholder */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
          aria-label="Heavens Gates Sugutta Fellowship Church International - Home"
        >
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent font-bold text-base sm:text-lg shadow-inner group-hover:scale-105 transition-transform shrink-0">
            ✝
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-sm sm:text-lg lg:text-xl tracking-tight text-white leading-tight uppercase truncate">
              Heavens Gates Sugutta
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-wider text-accent uppercase truncate">
              Fellowship Church International
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-white/85 hover:text-accent transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <Button
            variant="accent"
            size="default"
            className="hidden sm:inline-flex font-bold shadow-md hover:brightness-105"
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
