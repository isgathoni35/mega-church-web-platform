"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Radio, Calendar, ChevronRight } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About & Founder", href: "/about" },
  { label: "Children's Home", href: "/orphanage" },
  { label: "Sermons & Media", href: "/sermons" },
  { label: "Prayer Altar", href: "/prayer-request" },
  { label: "Connect", href: "/contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key & lock body scroll when open
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
        className="p-2 rounded-md text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Open Navigation Menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6 text-[#ff6b35]" />
      </button>

      {/* Render Backdrop & Drawer in Portal to escape header containing block */}
      {mounted &&
        createPortal(
          <>
            {/* Full-Screen Backdrop */}
            <div
              className={`fixed inset-0 z-[999] bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
                isOpen
                  ? "opacity-100 pointer-events-auto visible"
                  : "opacity-0 pointer-events-none invisible"
              }`}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-over Drawer Panel */}
            <div
              className={`fixed inset-y-0 right-0 z-[1000] h-[100dvh] w-[85%] max-w-sm bg-white text-slate-900 shadow-2xl transition-all duration-300 ease-in-out flex flex-col ${
                isOpen
                  ? "translate-x-0 opacity-100 visible"
                  : "translate-x-full opacity-0 invisible pointer-events-none"
              }`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-200 shrink-0">
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-[#0f172a] uppercase">
                    Heavens Gates Sugutta
                  </span>
                  <span className="font-sans text-[11px] font-bold tracking-wider text-[#ff6b35] uppercase">
                    Fellowship Church International
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Close Navigation Menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Live Stream Quick Banner inside Drawer */}
              <div className="px-5 py-3 bg-orange-50/80 border-b border-orange-100 shrink-0">
                <Link
                  href="/sermons"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-xs font-bold text-[#ff6b35] hover:underline"
                >
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b35]"></span>
                    </span>
                    <Radio className="h-4 w-4" />
                    Watch Live Stream
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Navigation Links (Scrollable Container) */}
              <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-3 px-3 rounded-md text-base font-semibold text-slate-800 hover:text-[#ff6b35] hover:bg-orange-50/70 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-[#ff6b35]/70" />
                  </Link>
                ))}

                {/* Quick Schedule Preview */}
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-slate-600">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Service Times
                  </span>
                  <p className="text-xs text-slate-700 font-medium">
                    Sundays: 10:00 AM (Main Worship)
                  </p>
                  <p className="text-xs text-slate-700 font-medium">
                    Mondays: 6:00 PM (Live Service)
                  </p>
                  <p className="text-xs text-slate-700 font-medium">
                    Wednesdays: 6:00 PM (Bible Study)
                  </p>
                </div>
              </nav>

              {/* Bottom CTA Action Button */}
              <div className="p-5 border-t border-slate-200 bg-slate-50 shrink-0">
                <Button
                  size="lg"
                  className="w-full text-base font-bold shadow-md bg-[#ff6b35] hover:bg-[#ea580c] text-white border-0 hover:brightness-110 transition-all rounded-md"
                  asChild
                >
                  <Link href="/give" onClick={() => setIsOpen(false)}>
                    <Heart className="mr-2 h-5 w-5 fill-current" />
                    Give Online Now
                  </Link>
                </Button>
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}

