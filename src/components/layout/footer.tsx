"use client";

import * as React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Smartphone,
  Video,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0f172a] text-white border-t-4 border-[#ff6b35]">
      {/* Top Footer Callout Ribbon */}
      <div className="bg-black/30 border-b border-slate-800 py-4 sm:py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
          <div className="space-y-0.5 sm:space-y-1">
            <span className="font-script text-[#ff6b35] text-xl sm:text-3xl block">
              Get Ready for the Overflow!
            </span>
            <p className="text-xs sm:text-sm text-slate-300">
              Join our global family in experiencing supernatural breakthrough,
              restoration, and faith.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 sm:gap-3 w-full md:w-auto">
            <Link
              href="/sermons"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl transition-colors w-full sm:w-auto"
            >
              <Video className="h-4 w-4 text-[#ff6b35]" />
              Watch Past Sermons
            </Link>
            <Link
              href="/give"
              className="inline-flex items-center justify-center gap-2 bg-[#ff6b35] hover:bg-[#e05626] text-white text-xs font-bold py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 w-full sm:w-auto"
            >
              <Heart className="h-4 w-4 fill-current" />
              Donate
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Column 1: Ministry Mission & Founder */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2.5">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-orange-500/10 border border-[#ff6b35] flex items-center justify-center text-[#ff6b35] font-bold text-sm sm:text-base shrink-0 mt-0.5">
                ✝
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white uppercase leading-snug">
                  Heavens Gates Sugutta
                </span>
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-wider text-[#ff6b35] uppercase">
                  Fellowship Church International
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A vibrant apostolic ministry committed to preaching the
              uncompromised Word of God, establishing believers in kingdom
              authority, and unleashing revival across nations.
            </p>
            <div className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#ff6b35] font-semibold block">
                Founding Vision
              </span>
              <p className="font-script text-[#ff6b35] text-base sm:text-lg leading-snug">
                &ldquo;Walking in Divine Overflow and Covenant Power&rdquo;
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2.5 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ff6b35]">
              Quick Navigation
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#ff6b35] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#ff6b35] text-xs">›</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#ff6b35] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#ff6b35] text-xs">›</span> Founder &
                  Leadership
                </Link>
              </li>
              <li>
                <Link
                  href="/orphanage"
                  className="hover:text-[#ff6b35] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#ff6b35] text-xs">›</span> Children&apos;s
                  Home &amp; Orphanage
                </Link>
              </li>
              <li>
                <Link
                  href="/sermons"
                  className="hover:text-[#ff6b35] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#ff6b35] text-xs">›</span> Live Stream &
                  Sermons
                </Link>
              </li>

              <li>
                <Link
                  href="/prayer-request"
                  className="hover:text-[#ff6b35] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#ff6b35] text-xs">›</span> Submit Prayer
                  Request
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#ff6b35] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#ff6b35] text-xs">›</span> Connect
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Times & Worship Schedule */}
          <div className="space-y-2.5 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ff6b35] flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Service Times
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-slate-800 space-y-0.5 sm:space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#ff6b35]">
                  <span>Sunday Explosive Worship</span>
                  <span>10:00 AM</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Main Sanctuary Celebration & Global Broadcast
                </p>
              </div>

              <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-slate-800 space-y-0.5 sm:space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#ff6b35]">
                  <span>Monday Live Service</span>
                  <span>6:00 PM</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Miracle & Healing Broadcast
                </p>
              </div>

              <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-slate-800 space-y-0.5 sm:space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#ff6b35]">
                  <span>Wednesday Bible Study</span>
                  <span>6:00 PM</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  In-Depth Exposition of the Word
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Digital Giving & Connect */}
          <div className="space-y-2.5 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ff6b35] flex items-center gap-2">
              <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Donate / Giving
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Frictionless digital channels to honor God with your tithes and
              offerings from Kenya and internationally.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-slate-800 text-center">
                <span className="font-bold text-white block text-[11px] sm:text-xs">M-Pesa Direct</span>
                <span className="text-[10px] sm:text-[11px] text-[#ff6b35]">Paybill 174379</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-slate-800 text-center">
                <span className="font-bold text-white block text-[11px] sm:text-xs">Send Money</span>
                <span className="text-[10px] sm:text-[11px] text-[#ff6b35]">0700 000 001</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-slate-800 text-center">
                <span className="font-bold text-white block text-[11px] sm:text-xs">Sendwave App</span>
                <span className="text-[10px] sm:text-[11px] text-[#ff6b35]">International</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-slate-800 text-center">
                <span className="font-bold text-white block text-[11px] sm:text-xs">Direct Wire</span>
                <span className="text-[10px] sm:text-[11px] text-[#ff6b35]">Co-op Bank</span>
              </div>
            </div>

            {/* Contact details snippet */}
            <div className="pt-2 text-xs text-slate-400 space-y-1.5 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#ff6b35] shrink-0" />
                <span>Nairobi, Kenya &bull; Global Ministry</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#ff6b35] shrink-0" />
                <span>+254 700 000 001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#ff6b35] shrink-0" />
                <span>info@heavensgatesugutta.org</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800 bg-[#0a0f1d] py-3 sm:py-4 px-4 sm:px-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 Heavens Gates Sugutta Fellowship Church International. All Rights Reserved.</span>
          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
