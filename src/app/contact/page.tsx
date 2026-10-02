import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/community/contact-form";
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

export const metadata: Metadata = {
  title: "Plan Your Visit & Contact | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Plan your first visit to Heavens Gates Sugutta Fellowship Church International. Discover what to expect, children's church details, service times, and sanctuary location.",
};

export default function ContactPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Sugutta Main Altar Complex, Jogoo Road Corridor, Nairobi, Kenya"
  )}`;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Banner */}
      <section className="relative bg-primary text-primary-foreground py-20 px-4 sm:px-8 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-primary/50 to-primary pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Sparkles className="h-3.5 w-3.5 fill-current" />
            <span>Welcome Home to the Anointing</span>
          </div>

          <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent">
            Plan Your Visit
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            We Can&apos;t Wait to Welcome You
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Whether you are visiting for the first time or looking for a home church to grow
            in spiritual authority, your seat is prepared in the presence of God.
          </p>
        </div>
      </section>

      {/* Main 2-Column Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Logistics & First-Time Visitor Guide (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* What to Expect Card */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <Heart className="h-5 w-5 text-accent fill-accent/20" />
                What to Expect on Your First Visit
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                From the moment you step through our sanctuary doors, our hospitality hosts
                will greet you with genuine warmth and guide you to your seat.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <strong className="text-primary block">Explosive Spirit-Led Worship:</strong>
                    Dynamic choir and instrumental praise that invites the manifested presence
                    of the Holy Ghost.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <strong className="text-primary block">Uncompromised Apostolic Preaching:</strong>
                    Practical, revelatory scripture breakdown with signs, wonders, and
                    deliverance ministration.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <strong className="text-primary block">First-Time Guest Reception:</strong>
                    Join us after the service for refreshments and personal fellowship with our
                    pastoral team.
                  </div>
                </li>
              </ul>
            </div>

            {/* Children's Church (Kings Kids) */}
            <div className="p-6 rounded-2xl bg-secondary/70 border border-border shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Baby className="h-5 w-5 text-accent" />
                <span>Kings Kids Children&apos;s Church</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                We provide a safe, high-energy, Bible-centered learning environment for children
                aged <strong>2 to 12 years</strong> during all Sunday services.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-background border border-border flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                  <span className="font-semibold text-foreground">Secure Check-in</span>
                </div>
                <div className="p-2.5 rounded-lg bg-background border border-border flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent shrink-0" />
                  <span className="font-semibold text-foreground">Opens 9:30 AM</span>
                </div>
              </div>
            </div>

            {/* Sanctuary Location & Contact Details */}
            <div className="p-6 rounded-2xl bg-primary text-primary-foreground border border-white/10 shadow-lg space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-accent block">
                  Mother Church & Headquarters
                </span>
                <h4 className="text-xl font-extrabold text-white">
                  Sugutta Main Sanctuary
                </h4>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-white/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>Sugutta Main Altar Complex, Jogoo Road Corridor, Nairobi, Kenya</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <a
                    href="tel:+254700000001"
                    className="hover:text-accent font-semibold underline-offset-2 hover:underline"
                  >
                    +254 700 000 001
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <a
                    href="mailto:info@heavensgatesugutta.org"
                    className="hover:text-accent underline-offset-2 hover:underline"
                  >
                    info@heavensgatesugutta.org
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-accent text-accent-foreground font-bold text-xs hover:brightness-105 transition-all shadow"
                >
                  <Navigation className="h-4 w-4" />
                  Open in Google Maps
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Inquiries Form (7 Columns) */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="p-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-accent" />
                  Loading Inquiry Form...
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
