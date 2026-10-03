import React from "react";
import Image from "next/image";
import { Quote, Shield, Flame, BookOpen } from "lucide-react";

export function FounderStory() {
  return (
    <section className="py-20 lg:py-24 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Framed Portrait with Floating Quotation Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Warm decorative back glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent rounded-[2.5rem] blur-2xl pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-slate-100 shadow-2xl bg-slate-50">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/images/pastor-portrait.jpg"
                    alt="Apostle Dr. J. Taylor — General Overseer and Founder"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 90vw, 450px"
                    priority
                  />

                  {/* Gradient Nameplate */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent pt-16 pb-6 px-6 text-center">
                    <div className="w-12 h-1 bg-[#ff6b35] mx-auto mb-2 rounded-full" />
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Apostle Dr. J. Taylor
                    </h3>
                    <p className="text-xs sm:text-sm text-[#ff6b35] font-bold tracking-wider uppercase mt-1">
                      Founder &amp; Presiding Bishop
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Divine Mandate Quote Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 bg-white text-slate-900 border-2 border-orange-100 rounded-2xl p-5 shadow-2xl w-full sm:max-w-xs space-y-2">
                <div className="flex items-center gap-2 text-[#ff6b35]">
                  <Quote className="h-5 w-5 fill-current" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    The Divine Commission
                  </span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-slate-900 font-bold leading-snug">
                  &ldquo;I have given you power; go and set My people free.&rdquo;
                </p>
                <span className="text-[10px] text-[#ff6b35] block font-semibold">
                  Spoken in prayer retreat, 1999
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Biographical Narrative */}
          <div className="lg:col-span-7 space-y-8 mt-6 lg:mt-0">
            <div className="space-y-3">
              <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#ff6b35] uppercase">
                A Testimony of Uncompromised Faith
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight leading-tight">
                Anointed to Break Yokes &amp; Release Covenant Overflow
              </h2>
            </div>

            {/* Narrative Sections */}
            <div className="space-y-5 text-sm sm:text-base leading-relaxed">
              {/* Part 1: The Calling */}
              <div className="p-6 rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm space-y-2">
                <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] shrink-0">
                    <Flame className="h-5 w-5" />
                  </div>
                  <span>The Calling: An Encounter in the Secret Place</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-13">
                  Before the overflowing stadiums and international broadcasts, the ministry was
                  born in tears, fasting, and profound humility. During days of solitary prayer on
                  rugged mountainsides, Apostle Dr. J. Taylor sought God with intense hunger. It was
                  there that the Holy Spirit manifested with tangible fire, breaking personal limitations
                  and imparting an uncompromising burden for souls trapped in bondage.
                </p>
              </div>

              {/* Part 2: The Mandate */}
              <div className="p-6 rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm space-y-2">
                <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span>The Mandate: Deliverance &amp; Kingdom Authority</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-13">
                  The Lord gave a precise mandate rooted in Isaiah 61:1 and Luke 10:19: to proclaim
                  liberty to the captives, pull down generational altars, and establish the body of
                  Christ in total victory. Driven by this apostolic mantle, Apostle Dr. J. Taylor
                  launched open-air crusades across towns and rural villages, where undeniable miracles,
                  supernatural healings, and life transformations validated the living gospel.
                </p>
              </div>

              {/* Part 3: The Explosion */}
              <div className="p-6 rounded-2xl bg-[#fffaf5] border border-orange-100/80 shadow-sm space-y-2">
                <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] shrink-0">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span>The Explosion: A Global Apostolic Movement</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-13">
                  What started as a handful of passionate intercessors meeting under humble roofs
                  quickly erupted into Heavens Gates Sugutta Fellowship Church International. Today, the
                  mother sanctuary at Sugutta stands as an apostolic beacon of revival and deliverance, with nationwide crusades,
                  a 24/7 prayer mountain altar, and a digital television broadcast reaching millions of
                  homes worldwide with the message: <em>“Get Ready for the Overflow!”</em>
                </p>
              </div>
            </div>

            {/* Scripture Anchor Banner */}
            <div className="border-l-4 border-[#ff6b35] pl-5 py-4 bg-[#fffaf5] rounded-r-2xl border border-orange-100/60">
              <p className="font-serif italic text-lg sm:text-xl text-slate-900 leading-snug">
                &ldquo;The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek...&rdquo;
              </p>
              <span className="text-xs uppercase font-bold text-[#ff6b35] tracking-wider block mt-2">
                — Isaiah 61:1 (KJV)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
