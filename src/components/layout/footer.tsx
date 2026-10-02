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
    <footer className="w-full bg-primary text-primary-foreground border-t-2 border-accent/60">
      {/* Top Footer Callout Ribbon */}
      <div className="bg-black/25 border-b border-white/10 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="font-script text-accent text-2xl sm:text-3xl block">
              Get Ready for the Overflow!
            </span>
            <p className="text-sm text-white/80">
              Join our global family in experiencing supernatural breakthrough,
              restoration, and faith.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="#live-stream"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 px-4 rounded-md transition-colors"
            >
              <Video className="h-4 w-4 text-accent" />
              Watch Past Sermons
            </Link>
            <Link
              href="#give"
              className="inline-flex items-center gap-2 bg-accent hover:brightness-105 text-accent-foreground text-xs font-bold py-2.5 px-4 rounded-md transition-all shadow-md"
            >
              <Heart className="h-4 w-4 fill-current" />
              Partner With Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Ministry Mission & Founder */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent font-bold text-base">
                ✝
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white uppercase">
                Faith Cathedral
              </span>
            </div>
            <p className="text-sm text-white/75 leading-relaxed">
              A vibrant apostolic ministry committed to preaching the
              uncompromised Word of God, establishing believers in kingdom
              authority, and unleashing revival across nations.
            </p>
            <div className="p-3.5 bg-black/20 rounded-md border border-white/5 space-y-1">
              <span className="text-xs uppercase tracking-wider text-accent font-semibold block">
                Founding Vision
              </span>
              <p className="font-script text-accent text-lg leading-snug">
                &ldquo;Walking in Divine Overflow and Covenant Power&rdquo;
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <span className="text-accent text-xs">›</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="#founder"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <span className="text-accent text-xs">›</span> Founder &
                  Leadership
                </Link>
              </li>
              <li>
                <Link
                  href="#media"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <span className="text-accent text-xs">›</span> Live Stream &
                  Sermons
                </Link>
              </li>
              <li>
                <Link
                  href="#schedule"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <span className="text-accent text-xs">›</span> Weekly
                  Itinerary
                </Link>
              </li>
              <li>
                <Link
                  href="#prayer-request"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <span className="text-accent text-xs">›</span> Submit Prayer
                  Request
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <span className="text-accent text-xs">›</span> Plan a Visit &
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Times & Worship Schedule */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Service Times
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-md bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-accent">
                  <span>Sunday Explosive Worship</span>
                  <span>10:00 AM</span>
                </div>
                <p className="text-xs text-white/70">
                  Main Sanctuary Celebration & Global Broadcast
                </p>
              </div>

              <div className="p-3 rounded-md bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-accent">
                  <span>Monday Live Service</span>
                  <span>6:00 PM</span>
                </div>
                <p className="text-xs text-white/70">
                  Miracle & Healing Broadcast
                </p>
              </div>

              <div className="p-3 rounded-md bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-accent">
                  <span>Wednesday Bible Study</span>
                  <span>6:00 PM</span>
                </div>
                <p className="text-xs text-white/70">
                  In-Depth Exposition of the Word
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Digital Giving & Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Digital Giving
            </h3>
            <p className="text-xs text-white/75 leading-relaxed">
              Frictionless digital channels to honor God with your tithes and
              offerings from anywhere in the world.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-black/25 border border-white/10 text-center">
                <span className="font-bold text-white block">M-Pesa STK</span>
                <span className="text-[11px] text-accent">Paybill / Express</span>
              </div>
              <div className="p-2.5 rounded bg-black/25 border border-white/10 text-center">
                <span className="font-bold text-white block">PayPal</span>
                <span className="text-[11px] text-accent">Global Cards</span>
              </div>
              <div className="p-2.5 rounded bg-black/25 border border-white/10 text-center">
                <span className="font-bold text-white block">Cash App</span>
                <span className="text-[11px] text-accent">$ChurchGiving</span>
              </div>
              <div className="p-2.5 rounded bg-black/25 border border-white/10 text-center">
                <span className="font-bold text-white block">Direct Wire</span>
                <span className="text-[11px] text-accent">Bank Transfer</span>
              </div>
            </div>

            {/* Contact details snippet */}
            <div className="pt-2 text-xs text-white/70 space-y-1.5 border-t border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>Nairobi, Kenya &bull; Global Ministry</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>contact@churchministry.org</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 bg-black/30 py-4 px-4 sm:px-8 text-center text-xs text-white/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 Faith Cathedral Ministries. All Rights Reserved.</span>
          <div className="flex items-center gap-4 text-white/50 text-[11px]">
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
