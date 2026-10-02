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
    <section id="schedule" className="py-20 sm:py-28 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="font-script text-accent text-3xl sm:text-4xl block font-normal">
            Join Us in Fellowship
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-primary tracking-tight">
            Weekly Service Itinerary
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Experience unceasing encounters with the presence of God throughout
            the week in-person and online.
          </p>
        </div>

        {/* Ornamental divider */}
        <div className="divider-ornament mb-12">
          <span className="cross-icon">✝</span>
        </div>

        {/* Unified warm schedule panel — NOT pricing tiers */}
        <div className="bg-card rounded-xl border border-border shadow-md overflow-hidden">
          {services.map((item, index) => (
            <div
              key={item.day}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-6 sm:p-8 ${
                index !== services.length - 1
                  ? "border-b border-border"
                  : ""
              } ${item.isPrimary ? "bg-primary/[0.03]" : ""}`}
            >
              {/* Day & Time Column */}
              <div className="shrink-0 sm:w-44">
                <div className="flex items-center gap-2.5">
                  {item.isPrimary && (
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  )}
                  <span className="font-extrabold text-lg text-primary uppercase tracking-wide">
                    {item.day}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span className="font-semibold">{item.time}</span>
                </div>
              </div>

              {/* Service Details Column */}
              <div className="flex-1 space-y-1.5">
                <h3 className="text-xl font-bold text-primary leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 text-accent shrink-0" />
                  <span>{item.location}</span>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  {item.details}
                </p>
              </div>

              {/* Action Column */}
              <div className="shrink-0">
                <Button
                  variant="accent"
                  size="sm"
                  className="font-bold shadow-sm"
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
