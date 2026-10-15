"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ExternalLink, LogOut, Radio } from "lucide-react";
import { AdminSidebar } from "./admin-sidebar";
import { logoutAdminAction } from "@/actions/admin-auth";

interface AdminHeaderProps {
  title?: string;
  isServiceLive?: boolean;
}

export function AdminHeader({
  title = "Management Dashboard",
  isServiceLive = false,
}: AdminHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between shadow-sm">
        {/* Left Side: Mobile Hamburger & Current Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="font-extrabold text-sm sm:text-lg text-[#0A2240] tracking-tight truncate">
              {title}
            </h1>
            <span className="text-[10px] text-slate-500 hidden sm:inline truncate">
              Heavens Gates Suggutta Fellowship Church International
            </span>
          </div>
        </div>

        {/* Right Side: Status Badge & Quick Shortcuts */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sunday Live Badge */}
          {isServiceLive ? (
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 font-extrabold text-[10px] sm:text-[11px] animate-pulse">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600" />
              <span className="sm:hidden">LIVE</span>
              <span className="hidden sm:inline">BROADCASTING LIVE</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-semibold">
              <Radio className="w-3 h-3 text-slate-400" />
              <span>Broadcast Offline</span>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0A2240] text-xs font-bold transition-colors"
            title="Open Public Site"
          >
            <span className="hidden sm:inline">Public Site</span>
            <ExternalLink className="w-3 h-3 text-[#ff6b35]" />
          </Link>

          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Sidebar Slide-Over Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex md:hidden"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-300 shadow-2xl bg-slate-900 flex flex-col">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-3.5 right-3.5 z-20 p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
            <AdminSidebar onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
