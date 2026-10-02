"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Quote, ArrowRight } from "lucide-react";

export function FounderSpotlight() {
  return (
    <section id="founder" className="py-20 sm:py-28 bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Framed Portrait Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Gold Halo Backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent/30 via-primary/20 to-accent/20 rounded-2xl blur-xl" />

              {/* Portrait Frame Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-accent bg-primary shadow-2xl p-2">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-gradient-to-b from-primary via-primary/95 to-black/80 flex flex-col items-center justify-between p-6 sm:p-8 text-center">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent pointer-events-none" />

                  {/* Top Cross Badge */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent text-xl font-bold shadow-md">
                    ✝
                  </div>

                  {/* Avatar Center Placeholder Graphic with Divine Glow */}
                  <div className="relative z-10 flex flex-col items-center my-auto">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-primary to-accent/30 border-4 border-accent flex items-center justify-center text-white shadow-2xl overflow-hidden">
                      <span className="font-extrabold text-4xl sm:text-5xl text-accent font-serif tracking-widest">
                        AP
                      </span>
                    </div>
                  </div>

                  {/* Floating Title & Anointed Badge */}
                  <div className="relative z-10 w-full space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider shadow-md">
                      <Sparkles className="h-3 w-3 fill-current" />
                      Anointed Vessel of God
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      Apostle Dr. J. Taylor
                    </h3>
                    <p className="text-xs sm:text-sm text-accent font-medium">
                      General Overseer &amp; Founder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Apostolic Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-script text-accent text-3xl sm:text-4xl block font-normal">
                A Testimony of Divine Grace
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-primary tracking-tight leading-tight">
                Leading Millions into Spiritual Freedom &amp; Overflow
              </h2>
            </div>

            {/* Scripture Quote Block in Great Vibes font */}
            <div className="relative pl-6 py-3 border-l-4 border-accent bg-secondary/50 rounded-r-lg space-y-2">
              <Quote className="h-6 w-6 text-accent/40 absolute -top-3 left-4" />
              <p className="font-script text-primary text-2xl sm:text-3xl leading-relaxed">
                &ldquo;Behold, I have given you authority to tread on serpents
                and scorpions, and over all the power of the enemy, and nothing
                shall hurt you.&rdquo;
              </p>
              <span className="text-xs uppercase tracking-widest font-bold text-accent block">
                &mdash; Luke 10:19 (KJV)
              </span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-normal">
              From humble beginnings marked by rigorous prayer and radical obedience
              to heaven&apos;s call, God raised Apostle Dr. J. Taylor as a prophetic voice
              of apostolic authority. Through unwavering dedication to the gospel of
              deliverance, signs and wonders follow the preaching of the Word,
              restoring families, breaking generational afflictions, and bringing
              thousands to repentance globally.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Today, Heavens Gates Sugutta Fellowship Church International stands as an international beacon of revival,
              impacting over 50 global branches, satellite prayer altars, and
              charitable compassion outreach networks.
            </p>

            {/* Call To Action */}
            <div className="pt-4">
              <Button
                variant="default"
                size="lg"
                className="font-bold shadow-lg hover:bg-primary/90 px-8"
                asChild
              >
                <Link href="/about">
                  Read Full Story
                  <ArrowRight className="ml-2 h-4 w-4 text-accent" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
