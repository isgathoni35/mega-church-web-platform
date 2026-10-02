"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Radio, Calendar, ChevronRight } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About & Founder", href: "#founder" },
  { label: "Sermons & Media", href: "#media" },
  { label: "Weekly Schedule", href: "#schedule" },
  { label: "Plan a Visit", href: "#contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Accessible Hamburger Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md text-primary-foreground hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Open Navigation Menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6 text-accent" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-over Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-white uppercase">
              Heavens Gates Sugutta
            </span>
            <span className="font-sans text-[11px] font-semibold tracking-wider text-accent uppercase">
              Fellowship Church International
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Close Navigation Menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Stream Quick Banner inside Drawer */}
        <div className="px-5 py-3 bg-black/20 border-b border-white/5">
          <Link
            href="#live-stream"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between text-xs font-semibold text-accent hover:underline"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <Radio className="h-4 w-4" />
              Watch Live Stream
            </span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-3 px-3 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span>{link.label}</span>
              <ChevronRight className="h-4 w-4 text-accent/70" />
            </Link>
          ))}

          {/* Quick Schedule Preview */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Service Times
            </span>
            <p className="text-xs text-white/70">
              Sundays: 10:00 AM (Main Worship)
            </p>
            <p className="text-xs text-white/70">
              Mondays: 6:00 PM (Live Service)
            </p>
            <p className="text-xs text-white/70">
              Wednesdays: 6:00 PM (Bible Study)
            </p>
          </div>
        </nav>

        {/* Bottom CTA Action Button */}
        <div className="p-5 border-t border-white/10 bg-black/20">
          <Button
            variant="accent"
            size="lg"
            className="w-full text-base font-bold shadow-lg"
            asChild
          >
            <Link href="#give" onClick={() => setIsOpen(false)}>
              <Heart className="mr-2 h-5 w-5 fill-current" />
              Give Online Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
