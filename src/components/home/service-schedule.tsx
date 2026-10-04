"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Video,
  MapPin,
  Sparkles,
  BookOpen,
  Calendar,
  Flame,
  Users,
  HeartHandshake,
  Music,
} from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface ServiceScheduleProps {
  settings?: SiteSettingsData;
}

const SUNDAY_SESSIONS = [
  {
    step: "01",
    time: "8:00 AM – 8:30 AM",
    title: "Prayer & Intercession",
    desc: "Opening the heavens, corporate spiritual warfare, and laying petitions on the altar before the throne of grace.",
    icon: Flame,
    badge: "Sanctuary Revival",
  },
  {
    step: "02",
    time: "8:30 AM – 9:30 AM",
    title: "Sunday School & Foundations",
    desc: "Age-tailored interactive discipleship classes for children, youth, and adults to ground believers in sound biblical doctrine.",
    icon: BookOpen,
    badge: "Discipleship",
  },
  {
    step: "03",
    time: "9:30 AM – 10:15 AM",
    title: "Worship & Praise",
    desc: "High-voltage apostolic praise and deep prophetic worship ushering in tangible glory and the miraculous presence of God.",
    icon: Music,
    badge: "Anointed Praise",
  },
  {
    step: "04",
    time: "10:15 AM – 11:30 AM",
    title: "Main Service & Word Exposition",
    desc: "The uncompromised proclamation of the Living Word, followed by deliverance ministration, altar calls, and divine healing.",
    icon: Sparkles,
    badge: "Main Altar",
    isPrimary: true,
  },
  {
    step: "05",
    time: "11:30 AM – 11:45 AM",
    title: "Fellowship Time & Welcoming",
    desc: "Koinonia, greeting visitors, breaking bread, and personal pastoral interaction with first-time attendees and partners.",
    icon: HeartHandshake,
    badge: "Koinonia",
  },
];

const MIDWEEK_SERVICES = [
  {
    day: "Monday",
    time: "7:00 PM – 8:30 PM",
    title: "Inspiration “Live”",
    location: "Global Digital Altar & Sanctuary",
    desc: "Prophetic direction, answers to prayer petitions, testimonies of deliverance, and supernatural encouragement for the week ahead.",
  },
  {
    day: "Wednesday",
    time: "7:00 PM – 8:30 PM",
    title: "Prophetic Bible Study",
    location: "Sugutta Sanctuary & Live Broadcast",
    desc: "Systematic verse-by-verse scripture exposition, spiritual warfare mastery, and corporate intercession breaking strongholds.",
  },
];

export function ServiceSchedule({ settings: propSettings }: ServiceScheduleProps) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const [activeTab, setActiveTab] = React.useState<"sunday" | "midweek">("sunday");

  return (
    <section id="schedule" className="py-12 sm:py-16 lg:py-24 bg-[#fbf8f3] text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>{settings.churchMotto || "REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD"}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Church Service Programme
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {settings.churchSlogan ? (
              <span className="font-semibold text-slate-800">&ldquo;{settings.churchSlogan}&rdquo;</span>
            ) : null}{" "}
            Gather with us at {settings.physicalLocation || "Sugutta Sanctuary"} under the leadership of{" "}
            <span className="font-bold text-[#ff6b35]">{settings.pastorName}</span>.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-full bg-slate-200/80 border border-slate-300/80 shadow-inner flex items-center gap-1 max-w-md w-full">
            <button
              type="button"
              onClick={() => setActiveTab("sunday")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "sunday"
                  ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Sunday Programme (5 Sessions)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("midweek")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "midweek"
                  ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Midweek Fellowships</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: SUNDAY 5-SESSION PROGRAMME ================= */}
        {activeTab === "sunday" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Sunday Service Timeline Container */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden divide-y divide-slate-100">
              {SUNDAY_SESSIONS.map((session, index) => {
                const Icon = session.icon;
                return (
                  <div
                    key={session.step}
                    className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 sm:p-6 lg:p-7 transition-colors ${
                      session.isPrimary
                        ? "bg-gradient-to-r from-orange-500/[0.06] via-transparent to-transparent border-l-4 border-[#ff6b35]"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    {/* Left: Step & Time */}
                    <div className="flex items-center gap-4 sm:w-64 shrink-0">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                          session.isPrimary
                            ? "bg-[#ff6b35] text-white shadow-md shadow-orange-500/25"
                            : "bg-orange-500/10 text-[#ff6b35]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Phase {session.step} &bull; {session.badge}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-[#ff6b35] shrink-0" />
                          <span>{session.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Title & Description */}
                    <div className="flex-1 space-y-1">
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {session.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {session.desc}
                      </p>
                    </div>

                    {/* Right: Resident Pastor or Watch CTA */}
                    <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
                      {session.isPrimary ? (
                        <Button
                          size="sm"
                          className="w-full md:w-auto font-bold bg-[#ff6b35] hover:bg-[#e05626] text-white rounded-xl shadow-md shadow-orange-500/20 text-xs py-2 px-4"
                          asChild
                        >
                          <Link href="/sermons?live=true">
                            <Video className="mr-1.5 h-3.5 w-3.5 fill-current" />
                            Watch Live Service
                          </Link>
                        </Button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-[#ff6b35]" />
                          <span>{settings.physicalLocation || "Sugutta Sanctuary"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scripture Anchor Banner (Hebrews 10:25) matching Flyer */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0A2240] to-[#07192f] text-white border border-[#C59B27]/20 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-60 h-60 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C59B27]">
                    <BookOpen className="w-4 h-4" />
                    <span>Scripture Call to Fellowship</span>
                  </div>
                  <p className="font-serif italic text-sm sm:text-lg text-slate-100 max-w-3xl leading-relaxed">
                    &ldquo;And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching.&rdquo;
                  </p>
                  <span className="text-xs sm:text-sm font-bold text-[#C59B27] block tracking-wider">
                    — HEBREWS 10:25
                  </span>
                </div>

                <div className="shrink-0 text-center md:text-right">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Resident Minister</span>
                  <span className="text-sm sm:text-base font-bold text-white block mt-0.5">{settings.pastorName}</span>
                  <span className="text-xs text-[#C59B27] block">{settings.pastorTitle}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: MIDWEEK FELLOWSHIPS ================= */}
        {activeTab === "midweek" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {MIDWEEK_SERVICES.map((item) => (
              <div
                key={item.day}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-orange-500/10 text-[#ff6b35] text-xs font-extrabold uppercase tracking-wide">
                      {item.day}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#ff6b35]" />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#ff6b35]" />
                    <span>{item.location}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    size="sm"
                    className="w-full font-bold bg-[#ff6b35] hover:bg-[#e05626] text-white rounded-xl shadow-md shadow-orange-500/20 text-xs py-2.5"
                    asChild
                  >
                    <Link href="/sermons?live=true">
                      <Video className="mr-1.5 h-3.5 w-3.5 fill-current" />
                      Join Digital Altar
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
