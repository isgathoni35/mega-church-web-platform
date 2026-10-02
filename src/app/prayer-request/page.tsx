import type { Metadata } from "next";
import { PrayerForm } from "@/components/community/prayer-form";
import { Flame, Clock, Phone, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Submit Prayer Request | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Place your prayer petition before the altar of God. Our Senior Apostolic Team and intercessory warriors pray over every request with strict pastoral confidentiality.",
};

export default function PrayerRequestPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Banner */}
      <section className="relative bg-primary text-primary-foreground py-20 px-4 sm:px-8 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-primary/50 to-primary pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Flame className="h-3.5 w-3.5 fill-current" />
            <span>Continual Intercession Altar</span>
          </div>

          <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent">
            The Altar of Intercession
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Submit Your Prayer Request
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            &ldquo;The prayer of a righteous person is powerful and effective.&rdquo;
            <span className="block text-accent font-semibold text-sm mt-1">
              — James 5:16
            </span>
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 Columns) */}
          <div className="lg:col-span-8">
            <PrayerForm />
          </div>

          {/* Side Info & Pastoral Assurance (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Pastoral Commitment Card */}
            <div className="p-6 rounded-xl bg-card border border-border shadow-sm space-y-4">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-accent" />
                Our Pastoral Prayer Covenant
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                At Heavens Gates Sugutta Fellowship Church International, prayer is not an
                afterthought—it is the foundation of everything we do.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-foreground">
                <li className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    <strong>Daily Morning Altar:</strong> Every petition is prayed over by our
                    ordained prayer team from 5:30 AM to 7:00 AM.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Privacy:</strong> Your sensitive prayer matters are held in
                    sacred confidence before the throne of grace.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    <strong>Weekly Wednesday Watch:</strong> Specific deliverance and healing
                    prayers during our Midweek Service.
                  </span>
                </li>
              </ul>
            </div>

            {/* Urgent Pastoral Hotline */}
            <div className="p-6 rounded-xl bg-primary text-primary-foreground border border-white/10 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider">
                <Phone className="h-4 w-4" />
                <span>Urgent Pastoral Support</span>
              </div>
              <h4 className="text-lg font-bold text-white">
                Need Immediate Prayer Right Now?
              </h4>
              <p className="text-xs text-white/75 leading-relaxed">
                If you are undergoing an acute spiritual or physical crisis, our pastoral
                intercessory line is open:
              </p>
              <div className="pt-2">
                <a
                  href="tel:+254700000001"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-md bg-accent text-accent-foreground font-bold text-sm hover:brightness-105 transition-all shadow"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call +254 700 000 001
                </a>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-5 rounded-xl bg-secondary/50 border border-border text-center space-y-2">
              <p className="font-script text-2xl text-accent">Expect the Overflow</p>
              <p className="text-xs italic text-muted-foreground">
                &ldquo;Before they call I will answer; while they are still speaking I will
                hear.&rdquo; — Isaiah 65:24
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
