"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  Radio,
  Flame,
  Heart,
  Baby,
  Building2,
  Check,
  ChevronRight,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ActivityCategory =
  | "all"
  | "services"
  | "fellowships"
  | "crusades"
  | "retreats"
  | "outreach";

interface Activity {
  id: string;
  category: ActivityCategory;
  categoryLabel: string;
  badgeColor: string;
  title: string;
  timeSchedule: string;
  venue: string;
  targetGroup: string;
  description: string;
  connectHref: string;
  isLiveBroadcast?: boolean;
}

const CATEGORIES: { id: ActivityCategory; label: string; icon: string }[] = [
  { id: "all", label: "All Gatherings", icon: "✦" },
  { id: "services", label: "Weekly Worship", icon: "🏛️" },
  { id: "fellowships", label: "Ministry Fellowships", icon: "👥" },
  { id: "crusades", label: "Crusades & Keshas", icon: "⛺" },
  { id: "retreats", label: "Prayer Mountain", icon: "⛰️" },
  { id: "outreach", label: "Mercy & Outreach", icon: "🤝" },
];

const ACTIVITIES: Activity[] = [
  {
    id: "sunday-worship",
    category: "services",
    categoryLabel: "Weekly Worship",
    badgeColor: "bg-accent/20 text-accent border-accent/40",
    title: "Sunday Explosive Worship & Miracle Celebration",
    timeSchedule: "Every Sunday · 10:00 AM",
    venue: "Main Sanctuary Altar, Jogoo Road Corridor",
    targetGroup: "Entire Congregation, Families & First-Time Guests",
    description:
      "Dynamic Holy Ghost praise, revelatory scripture exposition, and supernatural deliverance ministration under Apostle Dr. J. Taylor.",
    connectHref: "/contact?tab=visit&service=Sunday%20Explosive%20Worship%20(10:00%20AM)",
    isLiveBroadcast: true,
  },
  {
    id: "monday-inspiration",
    category: "services",
    categoryLabel: "Weekly Worship",
    badgeColor: "bg-accent/20 text-accent border-accent/40",
    title: "Monday Inspiration Live Service & Healing Altar",
    timeSchedule: "Every Monday · 6:00 PM",
    venue: "Main Sanctuary & Global Online Broadcast",
    targetGroup: "Professionals, Healing Seekers & Broadcast Viewers",
    description:
      "Start your week anchored in prophetic decrees, deliverance prayers, and targeted ministration for physical and spiritual breakthroughs.",
    connectHref: "/contact?tab=visit&service=Monday%20Live%20Miracle%20Service%20(6:00%20PM)",
    isLiveBroadcast: true,
  },
  {
    id: "wednesday-study",
    category: "services",
    categoryLabel: "Weekly Worship",
    badgeColor: "bg-accent/20 text-accent border-accent/40",
    title: "Wednesday Bible Exposition & Midweek Deliverance",
    timeSchedule: "Every Wednesday · 6:00 PM",
    venue: "Main Sanctuary Altar, Jogoo Road",
    targetGroup: "Believers Seeking In-Depth Biblical Meat & Warfare",
    description:
      "Line-upon-line apostolic teaching, tearing down demonic strongholds, unraveling generational curses, and equipping believers for dominion.",
    connectHref: "/contact?tab=visit&service=Wednesday%20Bible%20Study%20%26%20Deliverance%20(6:00%20PM)",
    isLiveBroadcast: true,
  },
  {
    id: "men-of-valor",
    category: "fellowships",
    categoryLabel: "Men's Fellowship",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    title: "Men of Valor Kingdom Breakfast & Council",
    timeSchedule: "1st Saturday of Month · 7:30 AM",
    venue: "Main Sanctuary Fellowship Hall",
    targetGroup: "Fathers, Husbands, Young Men & Aspiring Leaders",
    description:
      "Iron sharpens iron. Practical discussion on biblical manhood, financial multiplication, family stewardship, and united warfare prayer.",
    connectHref: "/contact?tab=inquiry&activity=Men%20of%20Valor%20Fellowship",
  },
  {
    id: "women-of-destiny",
    category: "fellowships",
    categoryLabel: "Women's Ministry",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    title: "Women of Destiny & Daughters of Zion Revival",
    timeSchedule: "2nd Saturday of Month · 9:00 AM",
    venue: "Main Sanctuary Complex",
    targetGroup: "Mothers, Daughters, Career Women & Sisters",
    description:
      "Awakening mothers in Israel. Consecration prayer watches, marriage and family blessing, business mentorship, and sisterhood in Christ.",
    connectHref: "/contact?tab=inquiry&activity=Women%20of%20Destiny%20Ministry",
  },
  {
    id: "youth-nextgen",
    category: "fellowships",
    categoryLabel: "Youth & Young Adults",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    title: "NextGen Revival Youth & Campus Impact",
    timeSchedule: "Every Saturday · 3:00 PM",
    venue: "Youth Chapel & Creative Arts Amphitheatre",
    targetGroup: "Teens, Campus Students & Young Professionals (13–30)",
    description:
      "Unapologetic worship, relevant discussions, career development, creative media, and igniting young hearts with the Holy Ghost fire.",
    connectHref: "/contact?tab=inquiry&activity=Youth%20%26%20Young%20Adults%20Ministry",
  },
  {
    id: "kings-kids",
    category: "fellowships",
    categoryLabel: "Children's Church",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    title: "Kings Kids Sunday Discipleship (Ages 2–12)",
    timeSchedule: "Sundays concurrent with 10:00 AM Service",
    venue: "Secure Kings Kids Learning Wing",
    targetGroup: "Children aged 2 to 12 years",
    description:
      "Age-appropriate Bible adventures, memory verses, music, and prayer in a high-security environment with certified children's workers.",
    connectHref: "/contact?tab=visit&service=Sunday%20Explosive%20Worship%20(10:00%20AM)",
  },
  {
    id: "all-night-kesha",
    category: "crusades",
    categoryLabel: "Crusades & Keshas",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    title: "Monthly All-Night Breakthrough Kesha (Vigil)",
    timeSchedule: "Last Friday of Every Month · 9:00 PM till Dawn",
    venue: "Main Sanctuary Complex, Nairobi",
    targetGroup: "All Worshippers Seeking Radical Breakthrough",
    description:
      "A night of relentless intercession, prophetic warfare music, breaking physical sickness, and commanding your divine season into manifestation.",
    connectHref: "/contact?tab=visit&service=Upcoming%20All-Night%20Kesha",
  },
  {
    id: "regional-crusades",
    category: "crusades",
    categoryLabel: "Crusades & Keshas",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    title: "National Miracle Crusades & Evangelism Tours",
    timeSchedule: "Quarterly Scheduled Campaigns",
    venue: "Stadiums & Open Air Arenas across Kenya & East Africa",
    targetGroup: "Cities, Towns, Unreached Souls & The Afflicted",
    description:
      "Demonstrating the uncompromised power of God outside church walls with mass conversions, blind eyes opening, and community salvation.",
    connectHref: "/contact?tab=inquiry&activity=Media%20%26%20Broadcast",
  },
  {
    id: "prayer-mountain",
    category: "retreats",
    categoryLabel: "Prayer Mountain",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    title: "Sacred 24/7 Prayer Mountain Consecration (Mai Mahiu)",
    timeSchedule: "Open 24 Hours Daily (3-Day & 7-Day Vigils)",
    venue: "Sacred Mountain Retreat, Rift Valley",
    targetGroup: "Ministers, Intercessors & Believers Seeking Seclusion",
    description:
      "Private wilderness prayer cabins, continuous altar fire, fasting grounds, and mountain rocks dedicated to pure communion with God.",
    connectHref: "/contact?tab=inquiry&activity=Prayer%20Mountain%20Retreat%20Booking",
  },
  {
    id: "orphanage-mercy",
    category: "outreach",
    categoryLabel: "Mercy & Outreach",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    title: "Children's Home & Community Mercy Outreach",
    timeSchedule: "Saturdays & Monthly Designated Charity Drives",
    venue: "Sugutta Children's Home & Informal Settlement Missions",
    targetGroup: "Volunteers, Well-Wishers & Sponsoring Partners",
    description:
      "Putting love in action: hot meals, academic sponsorships, clean clothing, and preaching the gospel of compassion to vulnerable children.",
    connectHref: "/contact?tab=inquiry&activity=Children's%20Home%20%26%20Orphanage%20Visit",
  },
];

export function CategorizedActivities() {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>("all");

  const filteredActivities =
    selectedCategory === "all"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.category === selectedCategory);

  return (
    <section className="py-20 bg-secondary/40 border-y border-border/80 relative overflow-hidden" id="activities">
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Spiritual Rhythm &amp; Fellowship</span>
          </div>

          <p className="font-script text-3xl sm:text-4xl text-accent">
            Gather, Grow &amp; Walk in Overflow
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Our Church Activities &amp; Ministries
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            There is a place for you to belong, grow in apostolic authority, and make an impact. Explore our distinct categories of worship, fellowship, and revival gatherings below.
          </p>
        </div>

        {/* Category Pill Switcher */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2 px-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border shadow-sm",
                selectedCategory === cat.id
                  ? "bg-primary text-white border-primary shadow-md scale-[1.02]"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted/70 border-border"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              {selectedCategory === cat.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-accent ml-1" />
              )}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <Card
              key={act.id}
              className="border border-border/80 bg-card hover:border-accent/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top Strip */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border",
                        act.badgeColor
                      )}
                    >
                      {act.categoryLabel}
                    </span>

                    {act.isLiveBroadcast && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Live Broadcast
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                    {act.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span>{act.timeSchedule}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground mt-0.5" />
                      <span className="line-clamp-1">{act.venue}</span>
                    </div>

                    <div className="flex items-center gap-2 text-foreground/80">
                      <Users className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="line-clamp-1">{act.targetGroup}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
                    {act.description}
                  </p>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="p-4 bg-muted/30 border-t border-border/80 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs font-bold border-accent/40 text-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                  asChild
                >
                  <Link href={act.connectHref}>
                    <span>Connect / Attend</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                {act.isLiveBroadcast && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs font-bold text-accent hover:bg-accent/10 px-2 shrink-0"
                    asChild
                  >
                    <Link href="/sermons" title="Watch Broadcast">
                      <Radio className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Global Invitation Ribbon */}
        <div className="p-6 sm:p-8 rounded-2xl bg-primary text-primary-foreground border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5 max-w-2xl">
            <h4 className="font-extrabold text-xl sm:text-2xl text-white">
              Visiting for the First Time or Looking to Join a Department?
            </h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Our pastoral welcome council will reserve a seat for you and connect you with the specific ministry leader of your choice.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Button
              variant="accent"
              size="lg"
              className="w-full sm:w-auto font-bold shadow-md hover:brightness-105"
              asChild
            >
              <Link href="/contact?tab=visit">
                <span>Plan Your Visit</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
