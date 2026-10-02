import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { FounderStory } from "@/components/about/founder-story";
import { StatementOfFaith } from "@/components/about/statement-of-faith";
import { LeadershipTeam } from "@/components/about/leadership-team";
import { PrayerMountain } from "@/components/about/prayer-mountain";

export const metadata: Metadata = {
  title: "About Ministry & Founder's Journey | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Discover the divine commission of Apostle Dr. J. Taylor, our 25-year apostolic journey, biblical pillars of faith, pastoral leadership, and the sacred 24/7 prayer mountain.",
  openGraph: {
    title: "About Heavens Gates Sugutta Fellowship Church International",
    description:
      "From humble beginnings to a global apostolic movement of deliverance and kingdom authority.",
    images: ["/images/pastor-portrait.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. About Hero Banner */}
      <AboutHero />

      {/* 2. Founder's Detailed Testimony & Calling */}
      <FounderStory />

      {/* 3. Statement of Faith (What We Believe) */}
      <StatementOfFaith />

      {/* 4. Pastoral Governance & Council */}
      <LeadershipTeam />

      {/* 5. Prayer Mountain & Sacred Retreat Spotlight */}
      <PrayerMountain />
    </div>
  );
}
