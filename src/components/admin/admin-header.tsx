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
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-[#0A2240] tracking-tight">
              {title}
            </h1>
            <span className="text-[10px] text-slate-500 hidden sm:inline">
              Heavens Gates Sugutta Fellowship Church International
            </span>
          </div>
        </div>

        {/* Right Side: Status Badge & Quick Shortcuts */}
        <div className="flex items-center gap-3">
          {/* Sunday Live Badge */}
          {isServiceLive ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 font-extrabold text-[11px] animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>BROADCASTING LIVE</span>
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
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0A2240] text-xs font-bold transition-colors"
          >
            <span>Public Site</span>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-300">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-[-44px] p-2 rounded-full bg-black/60 text-white"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
            <AdminSidebar onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
