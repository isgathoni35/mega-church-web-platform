"use client";

import * as React from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Sparkles,
  Share2,
  Check,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface MinistryEvent {
  id: string;
  badge: string;
  title: string;
  location: string;
  dates: string;
  format: string;
  description: string;
  imageUrl: string;
  whatsappMessage: string;
}

interface EventsViewProps {
  settings?: SiteSettingsData;
}

export function EventsView({ settings: propSettings }: EventsViewProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const pastorName = settings.pastorName || DEFAULT_SETTINGS.pastorName;
  const phone = settings.mpesaPhone || DEFAULT_SETTINGS.mpesaPhone;
  const cleanWaPhone = phone.replace(/[^0-9]/g, "");

  const [copied, setCopied] = React.useState(false);

  const EVENTS: MinistryEvent[] = [
    {
      id: "sugutta-crusade-2026",
      badge: "MISSION 2026",
      title: "Sugutta Miracle & Deliverance Crusade",
      location: settings.physicalLocation || "Sugutta Sanctuary, Kenya",
      dates: "April 24-26, 2026",
      format: "In-Person & Live Broadcast",
      description: `Join ${pastorName} for three powerful days of deliverance, healing, and supernatural transformation. Come expecting divine breakthrough.`,
      imageUrl: "/images/hero-worship.jpg",
      whatsappMessage: `Hello ${pastorName}, I would like to join the WhatsApp group for the Sugutta Miracle & Deliverance Crusade (April 24-26, 2026).`,
    },
    {
      id: "prayer-mountain-retreat-2026",
      badge: "RETREAT 2026",
      title: "Sacred Prayer Mountain Fasting Retreat",
      location: "Sugutta Prayer Mountain Sanctuary",
      dates: "May 15-17, 2026",
      format: "In-Person Retreat",
      description:
        "An intensive spiritual retreat dedicated to deep fasting, mountain intercession, and personal revival away from all worldly distractions.",
      imageUrl: "/images/ministry-healing.jpg",
      whatsappMessage: `Hello ${pastorName}, I would like to join the WhatsApp group and register for the Prayer Mountain Retreat (May 15-17, 2026).`,
    },
    {
      id: "all-night-kesha",
      badge: "MONTHLY KESHA",
      title: "All-Night Deliverance Kesha",
      location: settings.physicalLocation || "Sugutta Sanctuary Altar",
      dates: "Every Last Friday of the Month",
      format: "In-Person (9:00 PM – Dawn)",
      description:
        "A vigil of prophetic warfare, unbroken worship, and intense deliverance prayers under the apostolic mantle of Jesus Christ.",
      imageUrl:
        "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&q=80&w=1200",
      whatsappMessage: `Hello ${pastorName}, I would like to attend the All-Night Deliverance Kesha at the Main Sanctuary.`,
    },
    {
      id: "diaspora-apostolic-summit",
      badge: "GLOBAL MISSION",
      title: "Global Diaspora Apostolic Virtual Summit",
      location: "Live Virtual Broadcast (YouTube & Web Altar)",
      dates: "June 12-14, 2026",
      format: "Live Global Broadcast",
      description:
        "Connecting partners, covenant givers, and believers worldwide for apostolic impartation, prophetic insight, and collective miracle intercession.",
      imageUrl:
        "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
      whatsappMessage: `Hello ${pastorName}, I would like to join the Global Diaspora Apostolic Virtual Summit.`,
    },
  ];

  const handleShare = async () => {
    const shareData = {
      title: `Events - ${settings.churchMotto || "Sugutta Fellowship Church"}`,
      text: `Join ${pastorName} for upcoming apostolic crusades and deliverance gatherings.`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full bg-[#fbf8f3] text-slate-900">
      {/* 1. Hero Section */}
      <section className="pt-10 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          {/* Eyebrow */}
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-slate-700">
            The 2026 Mission Tour
          </p>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] leading-tight">
            {pastorName}&apos;s{" "}
            <span className="italic font-normal text-[#ff6b35]">
              Global Mission
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            An invitation to an exclusive spiritual encounter. Experience
            Deliverance &amp; Transformation in the presence of the Divine.
          </p>

          {/* Centered Quote Box Card */}
          <div className="pt-4 sm:pt-6">
            <div className="bg-white/80 backdrop-blur-sm border border-orange-200/80 rounded-2xl p-5 sm:p-8 max-w-2xl mx-auto shadow-sm text-center space-y-2.5">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#ff6b35] mb-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="font-serif italic text-base sm:text-xl text-slate-800 leading-relaxed font-medium">
                &ldquo;And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together...&rdquo;
              </p>
              <div className="pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] block">
                  Hebrews 10:25
                </span>
                <span className="text-xs text-slate-500">
                  {settings.churchMotto || "REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Events Grid */}
      <section className="py-6 sm:py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {EVENTS.map((event) => {
              const whatsappUrl = `https://wa.me/${cleanWaPhone}?text=${encodeURIComponent(
                event.whatsappMessage
              )}`;

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Event Thumbnail */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#ff6b35] text-white text-[11px] font-black tracking-wider uppercase shadow-md">
                        {event.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-7 flex flex-col flex-1">
                    {/* Event Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] group-hover:text-[#ff6b35] transition-colors leading-snug mb-2">
                      {event.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium mb-4">
                      <MapPin className="h-4 w-4 text-[#ff6b35] shrink-0" />
                      <span>{event.location}</span>
                    </div>

                    {/* DATES & FORMAT Strip */}
                    <div className="grid grid-cols-2 gap-3 py-3 px-4 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Dates
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                          {event.dates}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Format
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                          {event.format}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                      {event.description}
                    </p>

                    {/* Action Button: Join WhatsApp Group */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#0f172a] hover:bg-[#ff6b35] text-white text-xs sm:text-sm font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group-hover:bg-[#ff6b35]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Join WhatsApp Group</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="py-8 sm:py-14 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0f172a] text-white rounded-3xl p-6 sm:p-12 lg:p-14 text-center relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ff6b35]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-[#ff6b35]">
                <Sparkles className="w-5 h-5" />
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                A Divine Appointment{" "}
                <span className="italic font-normal text-[#ff6b35]">
                  Awaits You
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
                We invite all members and every Christian to experience the power
                of God&apos;s deliverance and transformation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${cleanWaPhone}?text=${encodeURIComponent(
                    `Hello ${pastorName}, I would like to inquire about the upcoming church events.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-full shadow-lg shadow-orange-500/25 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join WhatsApp Group
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full border border-white/20 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-slate-300" />
                      <span>Share Event</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
