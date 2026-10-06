"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  HeartHandshake,
  Users,
  Settings,
  ExternalLink,
  LogOut,
  Flame,
} from "lucide-react";
import { logoutAdminAction } from "@/actions/admin-auth";

const NAV_ITEMS = [
  {
    name: "Overview Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Sermons & Media Hub",
    href: "/admin/sermons",
    icon: Video,
    badge: "Live",
  },
  {
    name: "Pastoral Prayer Altar",
    href: "/admin/prayers",
    icon: HeartHandshake,
    badge: null,
  },
  {
    name: "Sanctuary Visitors",
    href: "/admin/visitors",
    icon: Users,
    badge: null,
  },
  {
    name: "Site Content & Photos",
    href: "/admin/settings",
    icon: Settings,
    badge: "CMS",
  },
];

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 bg-[#0A2240] text-white flex flex-col justify-between border-r border-slate-800 shadow-xl">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-[#C59B27] shadow-md shrink-0 bg-white">
            <Image
              src="/images/sugutta-logo.png"
              alt="Sugutta Fellowship Church Logo"
              fill
              sizes="44px"
              className="object-contain p-0.5"
            />
          </div>

          <div className="min-w-0">
            <h2 className="font-extrabold text-sm text-white truncate tracking-tight">
              Sugutta Admin
            </h2>
            <span className="text-[10px] text-[#C59B27] font-bold uppercase tracking-wider block truncate">
              Pastoral Altar
            </span>
          </div>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Authenticated</span>
          </span>
          <span className="font-mono text-[#C59B27] font-semibold">2026</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1 overflow-y-auto flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#C59B27] text-[#0A2240] shadow-md shadow-[#C59B27]/20 font-black"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#0A2240]" : "text-[#C59B27]"}`} />
                <span className="truncate">{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-[#0A2240] text-white"
                      : "bg-[#ff6b35] text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-800/80 space-y-1.5 bg-[#07162c]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>View Public Website</span>
          </span>
          <span className="text-[10px] text-slate-400">Live &rarr;</span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-red-300 hover:text-red-100 hover:bg-red-500/20 transition-colors font-semibold text-left"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Sign Out of Portal</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
