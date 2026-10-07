"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Video,
  Play,
  Heart,
  Sparkles,
  X,
  ExternalLink,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { OrphanagePhotoItem, OrphanageVideoItem } from "@/types/settings";
import { getYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from "@/lib/utils/youtube";

interface OrphanageMediaShowcaseProps {
  photos?: OrphanagePhotoItem[];
  videos?: OrphanageVideoItem[];
}

export function OrphanageMediaShowcase({
  photos = [],
  videos = [],
}: OrphanageMediaShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "photos" | "videos">("all");
  const [selectedPhoto, setSelectedPhoto] = useState<OrphanagePhotoItem | null>(null);
  const [activeVideo, setActiveVideo] = useState<OrphanageVideoItem | null>(null);

  const displayPhotos = activeFilter === "all" || activeFilter === "photos" ? photos : [];
  const displayVideos = activeFilter === "all" || activeFilter === "videos" ? videos : [];
  const totalCount = photos.length + videos.length;

  return (
    <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200/90 relative">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Life at the Children&apos;s Home</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight">
            Moments of Joy &amp; Video Stories
          </h2>

          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
            See the tangible difference your partnership makes. From morning devotions and hot nutritious meals to formal school education and songs of praise, experience the smiling faces at Sugutta.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 pt-2 sm:pt-4 overflow-x-auto pb-1.5 scrollbar-none w-full max-w-full">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeFilter === "all"
                  ? "bg-[#ff6b35] text-white shadow-orange-500/20 shadow-md"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              All Media ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("photos")}
              className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeFilter === "photos"
                  ? "bg-[#ff6b35] text-white shadow-orange-500/20 shadow-md"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photo Moments ({photos.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("videos")}
              className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeFilter === "videos"
                  ? "bg-[#ff6b35] text-white shadow-orange-500/20 shadow-md"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Stories ({videos.length})</span>
            </button>
          </div>
        </div>

        {/* Media Grid or Clean Empty Notice */}
        {totalCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Render Videos First if present in current filter */}
            {displayVideos.map((video) => {
              const ytId = getYouTubeId(video.videoUrl);
              const thumbUrl = ytId ? getYouTubeThumbnail(ytId) : "/images/orphanage-hero.png";

              return (
                <div
                  key={video.id}
                  className="group relative bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex flex-col transition-all hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Video Thumbnail Plate */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <Image
                      src={thumbUrl}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      unoptimized
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/30 to-transparent" />

                    {/* Video Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-600/90 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md backdrop-blur-sm">
                        <Video className="w-3 h-3" />
                        <span>{video.badge || "Video Story"}</span>
                      </span>
                    </div>

                    {/* Play Button Overlay */}
                    <button
                      type="button"
                      onClick={() => setActiveVideo(video)}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#ff6b35] text-white flex items-center justify-center shadow-xl shadow-orange-500/40 group-hover:scale-110 transition-transform cursor-pointer"
                      aria-label={`Play ${video.title}`}
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </button>
                  </div>

                  {/* Video Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 line-clamp-2 leading-snug group-hover:text-[#ff6b35] transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveVideo(video)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#ff6b35] hover:text-[#e05626] transition-colors pt-1 cursor-pointer"
                    >
                      <span>Watch Full Story</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Render Photos */}
            {displayPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200/90 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Photo Image Plate */}
                <div
                  className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo.imageUrl || "/images/orphanage-hero.png"}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Category Pill */}
                  {photo.category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-slate-800 font-bold text-[10px] uppercase tracking-wider shadow-sm backdrop-blur-sm border border-slate-200">
                        <Camera className="w-3 h-3 text-[#ff6b35]" />
                        <span>{photo.category}</span>
                      </span>
                    </div>
                  )}

                  {/* Fullscreen Expand Icon */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Photo Caption & Title */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#ff6b35] transition-colors leading-snug">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    className="text-left text-[11px] font-bold text-[#ff6b35] hover:underline pt-1 cursor-pointer"
                  >
                    View Large Photo &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-14 rounded-3xl bg-[#fffaf5] border border-orange-200/90 text-center max-w-3xl mx-auto space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#ff6b35] flex items-center justify-center mx-auto shadow-sm">
              <Camera className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                Children&apos;s Home Media Gallery Updating
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                Our caregiver team is actively capturing fresh moments of morning worship, classroom achievements, and meal times. You can partner with us directly or schedule an in-person visit.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/orphanage/donate"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 transition-all text-center"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Donate to Children&apos;s Home</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs sm:text-sm font-bold shadow-sm transition-all text-center"
              >
                <span>Schedule a Visit &amp; Volunteer</span>
              </Link>
            </div>
          </div>
        )}

        {/* Bottom Partnership Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#fffaf5] border border-orange-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5" />
              <span>Fulfill James 1:27 in Tangible Love</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Partner with Sugutta Children&apos;s Home
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every coin goes directly to nutritious meals, school fees, warm clothing, and safe shelter for vulnerable children in Kenya.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/orphanage/donate"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#ff6b35] hover:bg-[#e05626] text-white text-sm font-bold shadow-lg shadow-orange-500/20 transition-all text-center"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Donate to Children&apos;s Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo Zoom */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video sm:aspect-16/10 w-full bg-black">
              <Image
                src={selectedPhoto.imageUrl || "/images/orphanage-hero.png"}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="p-6 bg-slate-900 space-y-2 text-white">
              {selectedPhoto.category && (
                <span className="text-[11px] font-bold text-[#ff6b35] uppercase tracking-wider block">
                  {selectedPhoto.category}
                </span>
              )}
              <h3 className="text-lg sm:text-xl font-bold">{selectedPhoto.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full bg-black">
              {getYouTubeId(activeVideo.videoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(getYouTubeId(activeVideo.videoUrl)!, true)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <Video className="w-12 h-12 text-[#ff6b35]" />
                  <p className="text-white font-bold">{activeVideo.title}</p>
                  <a
                    href={activeVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#ff6b35] hover:underline"
                  >
                    <span>Open External Video Link</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-900 space-y-2 text-white">
              <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider block">
                {activeVideo.badge || "Video Story"}
              </span>
              <h3 className="text-lg sm:text-xl font-bold">{activeVideo.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
