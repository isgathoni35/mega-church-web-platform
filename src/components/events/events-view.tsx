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
  Play,
  X,
  Maximize2,
  Film,
} from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS, MinistryEventItem } from "@/types/settings";
import { getYouTubeId, getYouTubeEmbedUrl } from "@/lib/utils/youtube";

interface EventsViewProps {
  settings?: SiteSettingsData;
}

export function EventsView({ settings: propSettings }: EventsViewProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;
  const pastorName = settings.pastorName || DEFAULT_SETTINGS.pastorName;
  const phone = settings.mpesaPhone || DEFAULT_SETTINGS.mpesaPhone;
  const cleanWaPhone = phone.replace(/[^0-9]/g, "");

  const [copied, setCopied] = React.useState(false);
  const [activeVideoEvent, setActiveVideoEvent] = React.useState<MinistryEventItem | null>(null);
  const [zoomedFlyerEvent, setZoomedFlyerEvent] = React.useState<MinistryEventItem | null>(null);

  const EVENTS: MinistryEventItem[] = settings.eventsJson || [];

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
          {EVENTS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {EVENTS.map((event) => {
                const whatsappUrl = `https://wa.me/${cleanWaPhone}?text=${encodeURIComponent(
                  event.whatsappMessage || `Hello ${pastorName}, I would like to attend ${event.title}.`
                )}`;

                const hasVideo = Boolean(event.videoUrl && event.videoUrl.trim().length > 0);

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    {/* Event Thumbnail & Media Overlays */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                      <Image
                        src={event.imageUrl || "/images/hero-worship.jpg"}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => setZoomedFlyerEvent(event)}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                      {/* Event Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#ff6b35] text-white text-[11px] font-black tracking-wider uppercase shadow-md">
                          {event.badge}
                        </span>
                      </div>

                      {/* Video Clip Play Badge */}
                      {hasVideo && (
                        <div className="absolute top-4 right-4 z-10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveVideoEvent(event);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 hover:bg-[#ff6b35] text-white text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-lg transition-all cursor-pointer group/vid"
                          >
                            <Play className="w-3 h-3 fill-white text-white group-hover/vid:scale-110 transition-transform" />
                            <span>Watch Clip</span>
                          </button>
                        </div>
                      )}

                      {/* Hover Center Play Overlay if video attached */}
                      {hasVideo && (
                        <div
                          onClick={() => setActiveVideoEvent(event)}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/45 transition-colors cursor-pointer group/center"
                        >
                          <div className="w-14 h-14 rounded-full bg-white/90 text-slate-950 group-hover/center:bg-[#ff6b35] group-hover/center:text-white flex items-center justify-center shadow-2xl transition-all transform group-hover/center:scale-110">
                            <Play className="w-6 h-6 ml-1 fill-current" />
                          </div>
                        </div>
                      )}

                      {/* Inspect Flyer Button */}
                      <button
                        type="button"
                        onClick={() => setZoomedFlyerEvent(event)}
                        className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 hover:bg-black/90 text-white text-[10px] font-bold backdrop-blur-sm transition-all flex items-center gap-1 cursor-pointer z-10"
                        title="View high-resolution flyer"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>View Flyer</span>
                      </button>
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

                      {/* Action Buttons Row */}
                      <div className="space-y-2.5">
                        {hasVideo && (
                          <button
                            type="button"
                            onClick={() => setActiveVideoEvent(event)}
                            className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-[#ff6b35] text-xs sm:text-sm font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                          >
                            <Film className="w-4 h-4 text-[#ff6b35]" />
                            <span>Watch Crusade / Event Video</span>
                          </button>
                        )}

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
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 sm:p-14 rounded-3xl bg-white border border-orange-200/90 text-center space-y-4 shadow-sm max-w-3xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#ff6b35] flex items-center justify-center mx-auto shadow-sm">
                <Calendar className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-lg mx-auto">
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                  Mission Calendar Scheduling in Progress
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Upcoming miracle crusades, deliverance meetings, and mountain retreat dates are actively being scheduled by the pastoral council. Join our weekly sanctuary services in Nairobi or tune into live broadcasts.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${cleanWaPhone}?text=${encodeURIComponent(
                    `Hello ${pastorName}, please notify me when new church events and crusades are scheduled.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-full shadow-md shadow-orange-500/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold py-3 px-6 rounded-full transition-all"
                >
                  <span>Sanctuary Timings</span>
                </a>
              </div>
            </div>
          )}
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

      {/* Video Modal Player */}
      {activeVideoEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveVideoEvent(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveVideoEvent(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Box */}
            <div className="relative aspect-video w-full bg-black">
              {getYouTubeId(activeVideoEvent.videoUrl || "") ? (
                <iframe
                  src={getYouTubeEmbedUrl(getYouTubeId(activeVideoEvent.videoUrl || "")!, true)}
                  title={activeVideoEvent.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video
                    src={activeVideoEvent.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    poster={activeVideoEvent.imageUrl}
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>

            {/* Modal Info Footer */}
            <div className="p-5 sm:p-6 bg-slate-900 space-y-3 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ff6b35] text-white text-[10px] font-black uppercase tracking-wider">
                  {activeVideoEvent.badge}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>{activeVideoEvent.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>{activeVideoEvent.dates}</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold">{activeVideoEvent.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeVideoEvent.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${cleanWaPhone}?text=${encodeURIComponent(
                    activeVideoEvent.whatsappMessage || `Hello ${pastorName}, I would like to attend ${activeVideoEvent.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-full transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join WhatsApp Group</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flyer Image Zoom Modal */}
      {zoomedFlyerEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setZoomedFlyerEvent(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomedFlyerEvent(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="Close flyer zoom"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video sm:aspect-16/10 w-full bg-black">
              <Image
                src={zoomedFlyerEvent.imageUrl || "/images/hero-worship.jpg"}
                alt={zoomedFlyerEvent.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="p-5 sm:p-6 bg-slate-900 space-y-2 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#ff6b35] block">
                {zoomedFlyerEvent.badge} &bull; {zoomedFlyerEvent.dates}
              </span>
              <h3 className="text-lg sm:text-xl font-bold">{zoomedFlyerEvent.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {zoomedFlyerEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
