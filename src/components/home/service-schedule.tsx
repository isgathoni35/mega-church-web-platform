"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Video, MapPin } from "lucide-react";

interface ServiceItem {
  day: string;
  title: string;
  time: string;
  location: string;
  details: string;
  isPrimary?: boolean;
}

const services: ServiceItem[] = [
  {
    day: "Sunday",
    title: "Explosive Worship Service",
    time: "10:00 AM",
    location: "Main Sanctuary & Live Broadcast",
    details:
      "A mighty gathering for high praise, deliverance ministrations, and an anointed sermon of divine breakthrough. Includes specialized Children\u2019s Church ministry at 10:00 AM.",
    isPrimary: true,
  },
  {
    day: "Monday",
    title: "Inspiration \u201CLive\u201D",
    time: "7:00 PM",
    location: "Global Digital Altar",
    details:
      "A dynamic evening service focusing on prophetic direction, answers to prayer petitions, testimonies of deliverance, and supernatural encouragement for the week.",
  },
  {
    day: "Wednesday",
    title: "Prophetic Bible Study",
    time: "7:00 PM",
    location: "Auditorium & Live Stream",
    details:
      "Systematic verse-by-verse scripture exposition, spiritual warfare mastery, and corporate intercession breaking spiritual strongholds.",
  },
];

export function ServiceSchedule() {
  return (
    <section id="schedule" className="py-20 sm:py-28 bg-[#fbf8f3] text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="font-script text-[#ff6b35] text-3xl sm:text-4xl block font-normal">
            Join Us in Fellowship
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Weekly Service Itinerary
          </h2>
          <div className="w-20 h-1 bg-[#ff6b35] mx-auto rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg pt-2">
            Experience unceasing encounters with the presence of God throughout
            the week in-person and online.
          </p>
        </div>

        {/* Unified warm schedule panel */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          {services.map((item, index) => (
            <div
              key={item.day}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-6 sm:p-8 ${
                index !== services.length - 1
                  ? "border-b border-slate-100"
                  : ""
              } ${item.isPrimary ? "bg-orange-500/[0.03]" : ""}`}
            >
              {/* Day & Time Column */}
              <div className="shrink-0 sm:w-44">
                <div className="flex items-center gap-2.5">
                  {item.isPrimary && (
                    <span className="w-2 h-2 rounded-full bg-[#ff6b35] shrink-0" />
                  )}
                  <span className="font-extrabold text-lg text-slate-900 uppercase tracking-wide">
                    {item.day}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500">
                  <Clock className="h-3.5 w-3.5 text-[#ff6b35] shrink-0" />
                  <span className="font-semibold">{item.time}</span>
                </div>
              </div>

              {/* Service Details Column */}
              <div className="flex-1 space-y-1.5">
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="h-3 w-3 text-[#ff6b35] shrink-0" />
                  <span>{item.location}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.details}
                </p>
              </div>

              {/* Action Column */}
              <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                <Button
                  size="sm"
                  className="w-full sm:w-auto font-bold bg-[#ff6b35] hover:bg-[#e05626] text-white rounded-xl shadow-md shadow-orange-500/20"
                  asChild
                >
                  <Link href="/sermons?live=true">
                    <Video className="mr-1.5 h-3.5 w-3.5 fill-current" />
                    Watch Online
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
