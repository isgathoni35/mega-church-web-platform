import React from "react";
import { Heart, Sparkles, Home, Utensils, GraduationCap, ShieldCheck } from "lucide-react";

export function OrphanageHero() {
  return (
    <section className="relative bg-primary text-primary-foreground py-20 lg:py-28 px-4 sm:px-8 overflow-hidden border-b border-white/10">
      {/* Background radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-primary/60 to-primary pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Compassion Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-sm">
          <Heart className="h-4 w-4 fill-current" />
          <span>Compassion &amp; Mercy Outreach</span>
        </div>

        {/* Script Accent */}
        <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-accent">
          A Haven of Hope &amp; Restoration
        </p>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Empowering the Next Generation
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
          Our Children&apos;s Home is dedicated to rescuing vulnerable, orphaned, and abandoned
          children, providing them with a safe family, quality education, medical care, and the
          transformative love of Christ.
        </p>

        {/* Scripture Promise Plate */}
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-white/5 border border-accent/30 text-white/90 shadow-md">
          <p className="font-serif italic text-xs sm:text-sm text-white/90 leading-relaxed">
            &ldquo;Pure and undefiled religion before God and the Father is this: to visit the
            fatherless and widows in their affliction, and to keep oneself unspotted from the
            world.&rdquo;
          </p>
          <span className="text-[11px] uppercase font-bold text-accent tracking-wider block mt-1.5">
            — James 1:27 (KJV)
          </span>
        </div>

        {/* Impact Stats Bar */}
        <div className="pt-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 sm:p-6 rounded-2xl bg-black/30 border-2 border-accent/40 backdrop-blur-md shadow-2xl">
            <div className="text-center space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-accent tracking-tight block">
                60+
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-white/80">
                Sheltered Children
              </span>
            </div>

            <div className="text-center space-y-1 border-t sm:border-t-0 sm:border-x border-white/10 pt-3 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-black text-accent tracking-tight block">
                100%
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-white/80">
                Daily Meals Provided
              </span>
            </div>

            <div className="text-center space-y-1 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-black text-accent tracking-tight block">
                100%
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-white/80">
                School Enrollment
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
