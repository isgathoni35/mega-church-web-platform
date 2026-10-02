"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, Clock, Video, Bell } from "lucide-react";

interface ServiceItem {
  day: string;
  badge: string;
  title: string;
  time: string;
  location: string;
  details: string;
  isPrimary?: boolean;
}

const services: ServiceItem[] = [
  {
    day: "Sunday",
    badge: "Main Celebration",
    title: "Explosive Worship Service",
    time: "10:00 AM",
    location: "Main Sanctuary & Live Broadcast",
    details:
      "A mighty gathering for high praise, deliverance ministrations, and an anointed sermon of divine breakthrough. Includes specialized Children's Church ministry at 10:00 AM.",
    isPrimary: true,
  },
  {
    day: "Monday",
    badge: "Interactive Broadcast",
    title: 'Inspiration "Live"',
    time: "7:00 PM",
    location: "Global Digital Altar",
    details:
      "A dynamic evening service focusing on prophetic direction, answers to prayer petitions, testimonies of deliverance, and supernatural encouragement for the week.",
  },
  {
    day: "Wednesday",
    badge: "Deep Teaching",
    title: "Prophetic Bible Study",
    time: "7:00 PM",
    location: "Auditorium & Live Stream",
    details:
      "Systematic verse-by-verse scripture exposition, spiritual warfare mastery, and corporate intercession breaking spiritual strongholds.",
  },
];

export function ServiceSchedule() {
  const [remindedDays, setRemindedDays] = React.useState<Record<string, boolean>>({});

  const handleReminder = (day: string) => {
    setRemindedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <section id="schedule" className="py-20 sm:py-28 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
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

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item) => (
            <Card
              key={item.day}
              variant={item.isPrimary ? "lightAccent" : "default"}
              className={`flex flex-col justify-between border transition-all duration-300 hover:shadow-2xl ${
                item.isPrimary ? "ring-2 ring-accent/30 shadow-lg" : "shadow-md"
              }`}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/15 px-3 py-1 rounded-full">
                    {item.day} &bull; {item.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <CardTitle className="text-2xl font-black text-primary">
                  {item.title}
                </CardTitle>

                <CardDescription className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-accent shrink-0" />
                  {item.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {item.details}
                </p>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-border/50">
                <Button
                  variant="accent"
                  size="sm"
                  className="w-full font-bold shadow"
                  asChild
                >
                  <Link href="/sermons?live=true">
                    <Video className="mr-1.5 h-4 w-4 fill-current" />
                    Watch Online
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReminder(item.day)}
                  className={`w-full text-xs font-semibold ${
                    remindedDays[item.day]
                      ? "bg-accent/20 text-accent-foreground border-accent"
                      : ""
                  }`}
                >
                  <Bell className="mr-1.5 h-3.5 w-3.5 text-accent" />
                  {remindedDays[item.day] ? "Reminder Set ✓" : "Set Reminder"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
