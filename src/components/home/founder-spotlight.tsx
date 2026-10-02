"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FounderSpotlight() {
  return (
    <section id="founder" className="py-20 sm:py-28 bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Pastoral Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Warm gold halo glow behind the portrait */}
              <div className="absolute -inset-6 bg-gradient-to-br from-accent/20 via-accent/10 to-primary/10 rounded-3xl blur-2xl" />

              {/* Portrait frame — warm, elegant, not tech-boxy */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-accent/60 shadow-2xl bg-primary">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/images/pastor-portrait.jpg"
                    alt="Apostle Dr. J. Taylor — General Overseer and Founder"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 90vw, 400px"
                  />

                  {/* Subtle gradient overlay at bottom for name plate */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary via-primary/90 to-transparent pt-16 pb-5 px-5 text-center">
                    <div className="w-10 h-[2px] bg-accent mx-auto mb-3" />
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      Apostle Dr. J. Taylor
                    </h3>
                    <p className="text-sm text-accent font-medium mt-1">
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

            {/* Scripture Quote Block — warm parchment feel */}
            <blockquote className="relative py-5 px-6 bg-cream rounded-lg border-l-4 border-accent">
              <span className="absolute -top-2 left-5 text-accent/30 text-5xl font-script leading-none select-none">
                &ldquo;
              </span>
              <p className="font-script text-primary text-2xl sm:text-3xl leading-relaxed pt-2">
                Behold, I have given you authority to tread on serpents
                and scorpions, and over all the power of the enemy, and nothing
                shall hurt you.
              </p>
              <footer className="mt-3">
                <span className="text-xs uppercase tracking-wider font-bold text-accent block">
                  &mdash; Luke 10:19 (KJV)
                </span>
              </footer>
            </blockquote>

            {/* Bio Paragraphs */}
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
