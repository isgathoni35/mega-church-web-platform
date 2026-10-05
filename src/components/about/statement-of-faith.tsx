import React from "react";
import {
  BookOpen,
  Crown,
  HeartHandshake,
  Flame,
  ShieldCheck,
  Sun,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface FaithPillar {
  number: string;
  title: string;
  icon: React.ElementType;
  description: string;
  scripture: string;
}

const FAITH_PILLARS: FaithPillar[] = [
  {
    number: "01",
    title: "The Holy Scriptures",
    icon: BookOpen,
    description:
      "We believe the Holy Bible is the infallible, inerrant, and fully inspired Word of God. It stands as our final, unquestioned authority for Christian faith, lifestyle, doctrine, and kingdom conduct.",
    scripture: "2 Timothy 3:16-17 • Psalm 119:105",
  },
  {
    number: "02",
    title: "The Triune God",
    icon: Crown,
    description:
      "We believe in one God, eternally existent in three co-equal persons: Father, Son, and Holy Spirit. Creator of all things visible and invisible, sovereign, holy, and boundless in love and majesty.",
    scripture: "Matthew 28:19 • 1 John 5:7",
  },
  {
    number: "03",
    title: "Salvation by Grace",
    icon: HeartHandshake,
    description:
      "We believe that salvation is a sovereign gift of God received purely by grace through faith in the shed blood and finished sacrifice of Jesus Christ, not by works of human righteousness.",
    scripture: "Ephesians 2:8-9 • Romans 10:9-10",
  },
  {
    number: "04",
    title: "Baptism of the Holy Spirit",
    icon: Flame,
    description:
      "We believe in the baptism of the Holy Ghost as a distinct empowerment following salvation, accompanied by the evidence of speaking in other tongues, spiritual gifts, and bold witness.",
    scripture: "Acts 1:8 • Acts 2:4 • 1 Corinthians 12",
  },
  {
    number: "05",
    title: "Divine Healing & Deliverance",
    icon: ShieldCheck,
    description:
      "We believe that Christ broke every curse on Calvary. Total deliverance from demonic afflictions, ancestral yokes, and divine physical healing are the covenant birthright of every redeemed child of God.",
    scripture: "Isaiah 53:5 • Mark 16:17-18 • Galatians 3:13",
  },
  {
    number: "06",
    title: "The Second Coming & Eternity",
    icon: Sun,
    description:
      "We believe in the imminent, personal return of Jesus Christ in glory, the resurrection of the dead, eternal reward for the redeemed, and righteous judgment for all who reject God's mercy.",
    scripture: "1 Thessalonians 4:16-17 • Revelation 22:12",
  },
];

export function StatementOfFaith() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-[#fbf8f3] text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#ff6b35] uppercase">
            What We Believe
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight">
            Built on the Word: Pillars of Our Faith
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
            Unshakable biblical truths anchoring our doctrine, spiritual practices, and daily walk with Jesus Christ.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {FAITH_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="relative flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 group overflow-hidden"
              >
                <div className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 flex-1">
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35] group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-orange-200 font-mono">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#ff6b35] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Scripture Reference */}
                <div className="px-4 sm:px-8 py-3 sm:py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#ff6b35]">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="text-[11px] sm:text-xs">{pillar.scripture}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
