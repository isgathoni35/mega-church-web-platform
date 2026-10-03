import React from "react";
import Image from "next/image";
import { Sparkles, Quote, Shield, Flame, BookOpen } from "lucide-react";

export function FounderStory() {
  return (
    <section className="py-20 lg:py-28 bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Framed Portrait with Floating Quotation Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Gold Halo Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 via-accent/15 to-primary/10 rounded-3xl blur-2xl pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-accent/60 shadow-2xl bg-primary">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/images/pastor-portrait.jpg"
                    alt="Apostle Dr. J. Taylor — General Overseer and Founder"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 90vw, 450px"
                    priority
                  />

                  {/* Gradient Nameplate */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary via-primary/95 to-transparent pt-16 pb-6 px-6 text-center">
                    <div className="w-12 h-[2px] bg-accent mx-auto mb-2" />
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Apostle Dr. J. Taylor
                    </h3>
                    <p className="text-xs sm:text-sm text-accent font-semibold tracking-wider uppercase mt-1">
                      General Overseer &amp; Apostolic Founder
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Divine Mandate Quote Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 bg-card text-card-foreground border-2 border-accent rounded-xl p-4 sm:p-5 shadow-2xl w-full sm:max-w-xs space-y-2 backdrop-blur-md">
                <div className="flex items-center gap-2 text-accent">
                  <Quote className="h-5 w-5 fill-current" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    The Divine Commission
                  </span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-primary font-bold leading-snug">
                  &ldquo;I have given you power; go and set My people free.&rdquo;
                </p>
                <span className="text-[10px] text-muted-foreground block font-medium">
                  Spoken in prayer retreat, 1999
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Biographical Narrative */}
          <div className="lg:col-span-7 space-y-8 mt-6 lg:mt-0">
            <div className="space-y-3">
              <span className="font-script text-accent text-3xl sm:text-4xl block">
                A Testimony of Uncompromised Faith
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight leading-tight">
                Anointed to Break Yokes &amp; Release Covenant Overflow
              </h2>
            </div>

            {/* Narrative Sections */}
            <div className="space-y-6 text-sm sm:text-base text-foreground/85 leading-relaxed font-normal">
              {/* Part 1: The Calling */}
              <div className="p-5 rounded-xl bg-secondary/50 border border-border space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm sm:text-base">
                  <Flame className="h-5 w-5 text-accent shrink-0" />
                  <span>The Calling: An Encounter in the Secret Place</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Before the overflowing stadiums and international broadcasts, the ministry was
                  born in tears, fasting, and profound humility. During days of solitary prayer on
                  rugged mountainsides, Apostle Dr. J. Taylor sought God with intense hunger. It was
                  there that the Holy Spirit manifested with tangible fire, breaking personal limitations
                  and imparting an uncompromising burden for souls trapped in bondage.
                </p>
              </div>

              {/* Part 2: The Mandate */}
              <div className="p-5 rounded-xl bg-secondary/50 border border-border space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm sm:text-base">
                  <Shield className="h-5 w-5 text-accent shrink-0" />
                  <span>The Mandate: Deliverance &amp; Kingdom Authority</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  The Lord gave a precise mandate rooted in Isaiah 61:1 and Luke 10:19: to proclaim
                  liberty to the captives, pull down generational altars, and establish the body of
                  Christ in total victory. Driven by this apostolic mantle, Apostle Dr. J. Taylor
                  launched open-air crusades across towns and rural villages, where undeniable miracles,
                  supernatural healings, and life transformations validated the living gospel.
                </p>
              </div>

              {/* Part 3: The Explosion */}
              <div className="p-5 rounded-xl bg-secondary/50 border border-border space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm sm:text-base">
                  <BookOpen className="h-5 w-5 text-accent shrink-0" />
                  <span>The Explosion: A Global Apostolic Movement</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  What started as a handful of passionate intercessors meeting under humble roofs
                  quickly erupted into Heavens Gates Sugutta Fellowship Church International. Today, the
                  mother sanctuary at Sugutta stands as an apostolic beacon of revival and deliverance, with nationwide crusades,
                  a 24/7 prayer mountain altar, and a digital television broadcast reaching millions of
                  homes worldwide with the message: <em>“Get Ready for the Overflow!”</em>
                </p>
              </div>
            </div>

            {/* Scripture Anchor Banner */}
            <div className="border-l-4 border-accent pl-4 py-2 bg-cream/30 rounded-r-lg">
              <p className="font-script text-2xl sm:text-3xl text-primary leading-snug">
                &ldquo;The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek...&rdquo;
              </p>
              <span className="text-xs uppercase font-bold text-accent tracking-wider block mt-1">
                — Isaiah 61:1 (KJV)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
