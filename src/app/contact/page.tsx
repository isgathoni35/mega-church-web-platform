import type { Metadata } from "next";
import { Suspense } from "react";
import { TabbedConnectHub } from "@/components/community/tabbed-connect-hub";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Baby,
  ShieldCheck,
  Sparkles,
  Navigation,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { getSiteSettingsAction } from "@/actions/admin-settings";

export const metadata: Metadata = {
  title: "Connect With Us | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Connect with Heavens Gates Sugutta Fellowship Church International. Plan your visit, discover what to expect, explore our children's church, or reach our pastoral administration.",
};

export default async function ContactPage() {
  const settings = await getSiteSettingsAction();
  const rawPhone = settings.mpesaPhone;
  const cleanPhone = rawPhone.replace(/[\s\-]/g, "");
  const email = settings.contactEmail;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Sugutta Main Sanctuary, Jogoo Getare, Kenya"
  )}`;

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-slate-900 pb-10 sm:pb-20">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#fffaf5] to-[#fbf8f3] py-8 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-200/80">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6b35] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Connect &amp; Plan Your Visit</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#ff6b35] leading-tight">
            Come as You Are. Leave Transformed.
          </h1>
          <div className="w-14 sm:w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />

          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you are visiting for the first time, seeking prayer, or looking for a loving church family to call home, our doors and hearts in Sugutta are wide open.
          </p>
        </div>
      </section>

      {/* Main 2-Column Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
          {/* Column 1: Logistics & First-Time Visitor Guide (5 Columns) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {/* What to Expect Card */}
            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b35] fill-current" />
                What to Expect on Your First Visit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From the moment you step through our sanctuary doors, our hospitality hosts
                will greet you with genuine warmth and guide you to your seat.
              </p>
              <ul className="space-y-2.5 sm:space-y-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <span className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-orange-500/10 text-[#ff6b35] font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Explosive Spirit-Led Worship:</strong>
                    Dynamic choir and instrumental praise that invites the manifested presence
                    of the Holy Ghost.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <span className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-orange-500/10 text-[#ff6b35] font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Uncompromised Apostolic Preaching:</strong>
                    Practical, revelatory scripture breakdown with signs, wonders, and
                    deliverance ministration.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <span className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-orange-500/10 text-[#ff6b35] font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 block">First-Time Guest Reception:</strong>
                    Join us after the service for refreshments and personal fellowship with our
                    pastoral team.
                  </div>
                </li>
              </ul>
            </div>

            {/* Children's Church (Kings Kids) */}
            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                <Baby className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b35]" />
                <span>Kings Kids Children&apos;s Church</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We provide a safe, high-energy, Bible-centered learning environment for children
                aged <strong>2 to 12 years</strong> during all Sunday services.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2 text-xs">
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#ff6b35] shrink-0" />
                  <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Secure Check-in</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#ff6b35] shrink-0" />
                  <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Opens 9:30 AM</span>
                </div>
              </div>
            </div>

            {/* Sanctuary Location & Contact Details */}
            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-[#0f172a] text-white border border-slate-800 shadow-xl space-y-3 sm:space-y-4">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#ff6b35] block">
                  Mother Church &amp; Headquarters
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  Sugutta Main Sanctuary
                </h4>
              </div>

              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <span>Sugutta Main Sanctuary, Jogoo Getare, Kenya</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#ff6b35] shrink-0" />
                  <a
                    href={`tel:${cleanPhone}`}
                    className="hover:text-[#ff6b35] font-semibold underline-offset-2 hover:underline"
                  >
                    {rawPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#ff6b35] shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-[#ff6b35] underline-offset-2 hover:underline"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="pt-1 sm:pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-full bg-[#ff6b35] hover:bg-[#f25c23] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20"
                >
                  <Navigation className="h-4 w-4" />
                  Open in Google Maps
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Tabbed Connect Hub (7 Columns) */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="p-12 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-[#ff6b35]" />
                  Loading Connect Hub...
                </div>
              }
            >
              <TabbedConnectHub />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
