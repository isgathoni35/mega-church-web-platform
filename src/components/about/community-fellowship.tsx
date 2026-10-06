import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Heart, ArrowRight, Home, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface CommunityFellowshipProps {
  settings?: SiteSettingsData;
}

export function CommunityFellowship({ settings: propSettings }: CommunityFellowshipProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-[#fbf8f3] text-slate-900 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Authentic Photography with Frame and Floating Badge */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Decorative warm ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/15 via-amber-500/10 to-transparent rounded-[2.5rem] blur-2xl pointer-events-none" />

              {/* Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={settings.communityImageUrl || "/images/community-outreach.jpg"}
                    alt={settings.communityTitle || "Sugutta Fellowship Church grassroots village outreach"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-extrabold text-sm sm:text-base leading-tight">
                      Grassroots Village Outreach &amp; Elder Fellowship
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-200 mt-0.5">
                      Sitting with community elders, mothers, and children right under the trees in Sugutta.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stat / Assurance Pill */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:-top-5 sm:-right-5 bg-white text-slate-900 border-2 border-orange-100 rounded-2xl p-3 sm:p-4 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Grassroots Presence</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900">Active Village Cells</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
              <Heart className="h-3.5 w-3.5 fill-current" />
              <span>Real Community &bull; Grassroots Love</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight leading-tight">
                {settings.communityTitle || "Rooted in Our Community, Walking Alongside Families"}
              </h2>
              <div className="w-16 h-1 bg-[#ff6b35] rounded-full" />
            </div>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              {settings.communityNarrative ||
                "True Christian ministry is never confined to sanctuary walls. In Sugutta and neighboring villages, our pastoral team and church workers meet regularly with village elders, struggling families, and young children in their homesteads."}
            </p>

            {/* 3 Pillars of Grassroots Care */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-[#ff6b35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Elder Care &amp; Pastoral Visitation
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-0.5">
                    Honoring senior citizens with regular home visits, prayer for the sick, listening, and fellowship.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-[#ff6b35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Home Cell Fellowships
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-0.5">
                    Weekly gatherings across homesteads where neighbors pray for one another, share scriptures, and encourage each other.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-[#ff6b35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Community &amp; Orphan Relief
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-0.5">
                    Emergency food hampers, medical assistance, and educational support extended to vulnerable village children.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Button
                asChild
                className="bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold rounded-full px-6 py-3 text-xs sm:text-sm border-0 shadow-md shadow-orange-500/20"
              >
                <Link href="/give?fund=orphanage&step=form">
                  <span>Support Community Relief</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="bg-white hover:bg-slate-50 text-slate-900 border-slate-300 font-bold rounded-full px-6 py-3 text-xs sm:text-sm"
              >
                <Link href="/contact">
                  <Home className="mr-2 h-4 w-4 text-[#ff6b35]" />
                  <span>Connect With Us</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
