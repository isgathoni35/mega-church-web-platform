import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { FounderStory } from "@/components/about/founder-story";
import { StatementOfFaith } from "@/components/about/statement-of-faith";
import { CommunityFellowship } from "@/components/about/community-fellowship";
import { LeadershipTeam } from "@/components/about/leadership-team";
import { PrayerMountain } from "@/components/about/prayer-mountain";
import { getSiteSettingsAction } from "@/actions/admin-settings";

export const metadata: Metadata = {
  title: "About Ministry & Pastoral Journey | Sugutta Fellowship Church",
  description:
    "Discover the spiritual calling of Pastor Caesar O. Nyandwaro, our biblical pillars of faith, pastoral leadership, and dynamic church programmes.",
  openGraph: {
    title: "About Sugutta Fellowship Church",
    description:
      "Reaching out, growing together, and impacting our world for Jesus Christ.",
    images: ["/images/pastor-caesar.jpg"],
  },
};

export default async function AboutPage() {
  const settings = await getSiteSettingsAction();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. About Hero Banner (Neno 2-Column Layout with Right Picture) */}
      <AboutHero settings={settings} />

      {/* 2. Pastor's Testimony, Calling & Vision */}
      <FounderStory settings={settings} />

      {/* 3. Authentic Grassroots Community & Village Outreach */}
      <CommunityFellowship settings={settings} />

      {/* 4. Statement of Faith (What We Believe) */}
      <StatementOfFaith />

      {/* 5. Pastoral Governance & Council */}
      <LeadershipTeam settings={settings} />

      {/* 6. Prayer Mountain & Sacred Retreat Spotlight */}
      <PrayerMountain />
    </div>
  );
}
