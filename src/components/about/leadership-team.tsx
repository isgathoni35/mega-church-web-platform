import React from "react";
import { Crown, Shield, HeartHandshake, Sparkles } from "lucide-react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

interface LeaderRole {
  role: string;
  subtitle: string;
  focus: string;
  description: string;
  icon: React.ElementType;
}

interface LeadershipTeamProps {
  settings?: SiteSettingsData;
}

export function LeadershipTeam({ settings: propSettings }: LeadershipTeamProps = {}) {
  const settings = propSettings || DEFAULT_SETTINGS;

  const LEADERSHIP_COUNCIL: LeaderRole[] = [
    {
      role: settings.pastorName || "Pastor Caesar Osebe Nyandwaro",
      subtitle: settings.pastorTitle || "Resident Pastor & Visionary",
      focus: "Apostolic Vision, Deliverance Altar & Community Transformation",
      description:
        settings.pastorBio ||
        "Providing visionary leadership, apostolic impartation, and pastoral oversight across Sugutta sanctuary, discipleship ministries, and mission operations.",
      icon: Crown,
    },
    {
      role: "Resident Pastoral Council",
      subtitle: "Pastoral Council & Associate Shepherds",
      focus: "Congregational Shepherding, Discipleship & Weekly Services",
      description:
        "A seasoned presbytery of ordained pastors pastoring the sanctuary family, administering sacraments, and teaching sound biblical doctrine.",
      icon: Shield,
    },
    {
      role: "Intercessory & Altar Directorate",
      subtitle: "Pastoral Prayer & Deliverance Warriors",
      focus: "Daily Altar of Prayer, Intercession & Spiritual Warfare",
      description:
        "An anointed band of dedicated intercessors maintaining the sacred flame of continuous prayer, laying hands on petitions, and breaking yokes.",
      icon: HeartHandshake,
    },
    {
      role: "Next-Gen & Family Ministries",
      subtitle: "Sunday School & Kings Kids Directors",
      focus: "Children's Ministry, Youth Awakening & Community Outreach",
      description:
        "Raising an uncompromising, holy generation of young people grounded in scriptural truth, kingdom excellence, and spiritual boldness.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#ff6b35] uppercase">
            Apostolic Governance
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff6b35] tracking-tight">
            Our Pastoral Leadership
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full" />
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
            Ordained servant-leaders dedicated to prayer, pastoral care, and the equipping of believers for kingdom impact.
          </p>
        </div>

        {/* 4-Card Council Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
          {LEADERSHIP_COUNCIL.map((leader, idx) => {
            const Icon = leader.icon;
            const isLead = idx === 0;

            return (
              <div
                key={leader.role}
                className={`flex flex-col justify-between rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 transition-all duration-300 hover:shadow-xl ${
                  isLead
                    ? "bg-gradient-to-br from-[#fffaf5] to-white border-2 border-orange-200 shadow-md"
                    : "bg-white border border-slate-200/80 shadow-sm"
                }`}
              >
                <div className="space-y-3 sm:space-y-4 flex-1">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#ff6b35]">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    {isLead && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-white bg-[#ff6b35] px-2.5 py-1 rounded-full shadow-sm">
                        Presiding
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                      {leader.role}
                    </h3>
                    <p className="text-xs font-bold text-[#ff6b35]">
                      {leader.subtitle}
                    </p>
                  </div>

                  {/* Focus */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-[#ff6b35] mb-0.5">
                      Ministry Mandate:
                    </span>
                    {leader.focus}
                  </div>

                  {/* Bio Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {leader.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
