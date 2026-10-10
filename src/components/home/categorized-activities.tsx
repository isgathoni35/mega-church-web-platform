"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Smartphone,
  Globe2,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteSettingsData, DEFAULT_SETTINGS, MinistryProjectItem } from "@/types/settings";
import { ProjectImageCarousel } from "@/components/home/project-image-carousel";

interface CategorizedActivitiesProps {
  settings?: SiteSettingsData;
}

const COLOR_MAP: Record<
  string,
  {
    border: string;
    hoverBorder: string;
    badge: string;
    badgeBorder: string;
    badgeText: string;
    accent: string;
    bg: string;
    boxBg: string;
    boxBorder: string;
    btn: string;
    btnHover: string;
    btnShadow: string;
  }
> = {
  rose: {
    border: "border-rose-200/90",
    hoverBorder: "hover:border-rose-400",
    badge: "bg-rose-50",
    badgeBorder: "border-rose-200",
    badgeText: "text-rose-700",
    accent: "text-rose-600",
    bg: "bg-white",
    boxBg: "bg-rose-50/50",
    boxBorder: "border-rose-100",
    btn: "bg-rose-600",
    btnHover: "hover:bg-rose-700",
    btnShadow: "shadow-rose-600/20",
  },
  orange: {
    border: "border-orange-200/90",
    hoverBorder: "hover:border-orange-400",
    badge: "bg-orange-50",
    badgeBorder: "border-orange-200",
    badgeText: "text-[#c2410c]",
    accent: "text-[#ff6b35]",
    bg: "bg-white",
    boxBg: "bg-orange-50/50",
    boxBorder: "border-orange-100",
    btn: "bg-[#ff6b35]",
    btnHover: "hover:bg-[#ea580c]",
    btnShadow: "shadow-orange-500/20",
  },
  blue: {
    border: "border-blue-200/90",
    hoverBorder: "hover:border-blue-400",
    badge: "bg-blue-50",
    badgeBorder: "border-blue-200",
    badgeText: "text-blue-700",
    accent: "text-blue-600",
    bg: "bg-white",
    boxBg: "bg-blue-50/50",
    boxBorder: "border-blue-100",
    btn: "bg-blue-600",
    btnHover: "hover:bg-blue-700",
    btnShadow: "shadow-blue-600/20",
  },
  green: {
    border: "border-emerald-200/90",
    hoverBorder: "hover:border-emerald-400",
    badge: "bg-emerald-50",
    badgeBorder: "border-emerald-200",
    badgeText: "text-emerald-700",
    accent: "text-emerald-600",
    bg: "bg-white",
    boxBg: "bg-emerald-50/50",
    boxBorder: "border-emerald-100",
    btn: "bg-emerald-600",
    btnHover: "hover:bg-emerald-700",
    btnShadow: "shadow-emerald-600/20",
  },
};

function ProjectCard({
  project,
  mpesaPhone,
  mpesaTillNumber,
}: {
  project: MinistryProjectItem;
  mpesaPhone: string;
  mpesaTillNumber: string;
}) {
  const theme = COLOR_MAP[project.color] || COLOR_MAP.orange;

  return (
    <div
      className={`${theme.bg} rounded-3xl p-6 sm:p-8 border-2 ${theme.border} shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group ${theme.hoverBorder} transition-all duration-300`}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${theme.badge} ${theme.badgeText} text-xs font-extrabold uppercase tracking-wider border ${theme.badgeBorder}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{project.badge}</span>
          </span>
          {project.mpesaRef && (
            <span className="text-xs font-bold text-slate-400">
              Account Ref:{" "}
              <strong className="text-slate-900 font-mono">{project.mpesaRef}</strong>
            </span>
          )}
        </div>

        <ProjectImageCarousel
          images={
            project.images && project.images.length > 0
              ? project.images
              : project.imageUrl
              ? [project.imageUrl]
              : ["/images/church-construction.jpg"]
          }
          videoUrl={project.videoUrl}
          title={project.title}
          subtitle={project.subtitle}
        />

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{project.narrative}</p>

        <div className={`p-3.5 rounded-2xl ${theme.boxBg} border ${theme.boxBorder} space-y-2 text-xs`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Smartphone className={`w-3.5 h-3.5 ${theme.accent}`} />
              <span>M-Pesa Till: {mpesaTillNumber || "8146952"}</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-bold">Buy Goods</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Globe2 className={`w-3.5 h-3.5 ${theme.accent}`} />
              <span>Sendwave / Diaspora</span>
            </span>
            <span className="text-[10px] text-slate-700 font-mono font-bold">
              {mpesaPhone || "+254112656123"}
            </span>
          </div>
        </div>
      </div>

      <Button
        asChild
        size="lg"
        className={`w-full font-extrabold text-sm ${theme.btn} ${theme.btnHover} text-white rounded-full py-4 shadow-md ${theme.btnShadow} flex items-center justify-center gap-2 border-0`}
      >
        <Link href={project.donateLink || "/give"}>
          <span>{project.donateLabel || "Give Now"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}

export function CategorizedActivities({ settings: propSettings }: CategorizedActivitiesProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const activeProjects = (settings.projectsJson || DEFAULT_SETTINGS.projectsJson).filter(
    (p) => p.active !== false
  );

  return (
    <section
      className="py-12 sm:py-16 lg:py-24 bg-[#fbf8f3] border-t border-slate-200/70 relative overflow-hidden"
      id="activities"
    >
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Active Missions &bull; Appeal to Well-Wishers &amp; Global Friends</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#ff6b35]">
            Our Core Missions &amp; Community Projects
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Sugutta Fellowship Church is dedicated to transforming lives through practical compassion
            and establishing an altar of worship. We invite local partners and international friends
            to stand with us in these urgent ongoing efforts.
          </p>
        </div>

        {activeProjects.length > 0 ? (
          <div
            className={`grid grid-cols-1 ${
              activeProjects.length === 1
                ? "max-w-2xl mx-auto"
                : activeProjects.length === 2
                ? "lg:grid-cols-2"
                : "md:grid-cols-2 lg:grid-cols-3"
            } gap-8 items-stretch`}
          >
            {activeProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                mpesaPhone={settings.mpesaPhone}
                mpesaTillNumber={settings.mpesaTillNumber}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-3xl bg-white/60">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-semibold text-sm">No active projects at the moment.</p>
            <p className="text-slate-400 text-xs mt-1">
              Projects can be managed from the Admin &rarr; Settings &rarr; Projects tab.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
