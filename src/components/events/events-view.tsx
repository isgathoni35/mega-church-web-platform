"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Sparkles,
  Share2,
  Check,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

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

const EVENTS: MinistryEvent[] = [
  {
    id: "nairobi-crusade-2026",
    badge: "MISSION 2026",
    title: "Nairobi Miracle & Deliverance Crusade",
    location: "Main Sanctuary, Nairobi Headquarters",
    dates: "April 24-26, 2026",
    format: "In-Person & Live Broadcast",
    description:
      "Join Pastor Jeannette Taylor for three powerful days of deliverance, healing, and supernatural transformation. Come expecting divine breakthrough.",
    imageUrl: "/images/hero-worship.jpg",
    whatsappMessage:
      "Hello Pastor Jeannette, I would like to join the WhatsApp group for the Nairobi Miracle & Deliverance Crusade (April 24-26, 2026).",
  },
  {
    id: "mai-mahiu-retreat-2026",
    badge: "RETREAT 2026",
    title: "Mai Mahiu Prayer Mountain Fasting Retreat",
    location: "Mai Mahiu Prayer Mountain Sanctuary, Rift Valley",
    dates: "May 15-17, 2026",
    format: "In-Person Retreat",
    description:
      "An intensive spiritual retreat dedicated to deep fasting, mountain intercession, and personal revival away from all worldly distractions.",
    imageUrl: "/images/ministry-healing.jpg",
    whatsappMessage:
      "Hello Pastor Jeannette, I would like to join the WhatsApp group and register for the Mai Mahiu Prayer Mountain Retreat (May 15-17, 2026).",
  },
  {
    id: "all-night-kesha",
    badge: "MONTHLY KESHA",
    title: "All-Night Deliverance Kesha",
    location: "Main Sanctuary Altar, Nairobi",
    dates: "Every Last Friday of the Month",
    format: "In-Person (9:00 PM – Dawn)",
    description:
      "A vigil of prophetic warfare, unbroken worship, and intense deliverance prayers under the apostolic mantle of Jesus Christ.",
    imageUrl:
      "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&q=80&w=1200",
    whatsappMessage:
      "Hello Pastor Jeannette, I would like to attend the All-Night Deliverance Kesha at the Main Sanctuary.",
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
    whatsappMessage:
      "Hello Pastor Jeannette, I would like to join the Global Diaspora Apostolic Virtual Summit.",
  },
];

export function EventsView() {
  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Events - Heavens Gates Sugutta Fellowship Church International",
      text: "Join Pastor Jeannette Taylor for upcoming apostolic crusades and deliverance gatherings.",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to copy link if user cancelled or not supported
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
      {/* 1. Hero Section (Matching Neno's exact structure) */}
      <section className="pt-10 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          {/* Eyebrow */}
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-slate-700">
            The 2026 Mission Tour
          </p>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] leading-tight">
            Pastor Jeannette Taylor&apos;s{" "}
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
              <p className="text-base sm:text-lg font-bold text-[#0f172a] tracking-tight">
                &ldquo;The sick will be healed. The oppressed will be set
                free.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This is your time to encounter the grace that transforms any
                person into a great vessel of God. You cannot miss this divine
                appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Mission Calendar Section */}
      <section className="py-8 sm:py-14 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading with Centered Orange Underline */}
          <div className="text-center space-y-2 mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#ff6b35]">
              Upcoming Events
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              The Mission Calendar
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full mt-2" />
          </div>

          {/* 2-Column Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {EVENTS.map((event) => {
              const whatsappUrl = `https://wa.me/254700000001?text=${encodeURIComponent(
                event.whatsappMessage
              )}`;

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Event Flyer / Image */}
                  <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Floating Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#ff6b35] text-white text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
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

                    {/* DATES & FORMAT 2-Column Strip */}
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

      {/* 3. Bottom CTA Section ("A Divine Appointment Awaits You") */}
      <section className="py-8 sm:py-14 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0f172a] text-white rounded-3xl p-6 sm:p-12 lg:p-14 text-center relative overflow-hidden shadow-2xl border border-slate-800">
            {/* Subtle background glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ff6b35]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
              {/* Icon Pill */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-[#ff6b35]">
                <Sparkles className="w-5 h-5" />
              </div>

              {/* Heading */}
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                A Divine Appointment{" "}
                <span className="italic font-normal text-[#ff6b35]">
                  Awaits You
                </span>
              </h2>

              {/* Subtext */}
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
                We invite all members and every Christian to experience the power
                of God&apos;s deliverance and transformation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href="https://wa.me/254700000001?text=Hello%20Pastor%20Jeannette,%20I%20would%20like%20to%20inquire%20about%20the%20upcoming%20events."
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
