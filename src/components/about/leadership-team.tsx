import React from "react";
import { Users, Crown, Shield, HeartHandshake, Sparkles, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface LeaderRole {
  role: string;
  subtitle: string;
  focus: string;
  description: string;
  icon: React.ElementType;
}

const LEADERSHIP_COUNCIL: LeaderRole[] = [
  {
    role: "Apostle Dr. J. Taylor",
    subtitle: "General Overseer & Spiritual Father",
    focus: "Apostolic Vision, Deliverance Altar & Global Broadcasts",
    description:
      "Providing visionary leadership, apostolic impartation, and prophetic oversight across the mother altar, nationwide crusades, and mission operations.",
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
    focus: "24/7 Prayer Mountain, Daily Altar & Spiritual Warfare",
    description:
      "An anointed band of dedicated intercessors maintaining the sacred flame of continuous prayer, laying hands on petitions, and breaking yokes.",
    icon: HeartHandshake,
  },
  {
    role: "Next-Gen & Family Ministries",
    subtitle: "Youth & Kings Kids Directors",
    focus: "Children's Ministry, Youth Awakening & Community Outreach",
    description:
      "Raising an uncompromising, holy generation of young people grounded in scriptural truth, kingdom excellence, and spiritual boldness.",
    icon: Sparkles,
  },
];

export function LeadershipTeam() {
  return (
    <section className="py-20 lg:py-28 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-script text-accent text-3xl sm:text-4xl block">
            Apostolic Governance
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            Our Pastoral Leadership
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Ordained servant-leaders dedicated to prayer, pastoral care, and the equipping
            of believers for kingdom impact.
          </p>
        </div>

        {/* 4-Card Council Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {LEADERSHIP_COUNCIL.map((leader, idx) => {
            const Icon = leader.icon;
            const isLead = idx === 0;

            return (
              <Card
                key={leader.role}
                className={`flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  isLead
                    ? "bg-primary text-primary-foreground border-2 border-accent shadow-lg"
                    : "bg-card text-card-foreground border-t-4 border-t-accent shadow-sm"
                }`}
              >
                <div className="p-6 space-y-4 flex-1">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center shadow-inner ${
                        isLead
                          ? "bg-accent/20 border border-accent text-accent"
                          : "bg-primary/10 border border-primary/20 text-primary"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    {isLead && (
                      <span className="text-[11px] font-black uppercase tracking-wider text-accent bg-black/40 px-2 py-0.5 rounded border border-accent/30">
                        Presiding
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h3
                      className={`text-lg font-extrabold tracking-tight ${
                        isLead ? "text-white" : "text-primary"
                      }`}
                    >
                      {leader.role}
                    </h3>
                    <p
                      className={`text-xs font-semibold ${
                        isLead ? "text-accent" : "text-accent"
                      }`}
                    >
                      {leader.subtitle}
                    </p>
                  </div>

                  {/* Focus */}
                  <div
                    className={`p-2.5 rounded-lg text-xs font-medium ${
                      isLead ? "bg-white/10 text-white/90" : "bg-muted/50 text-foreground"
                    }`}
                  >
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-accent mb-0.5">
                      Ministry Mandate:
                    </span>
                    {leader.focus}
                  </div>

                  {/* Bio Description */}
                  <p
                    className={`text-xs leading-relaxed ${
                      isLead ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {leader.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
