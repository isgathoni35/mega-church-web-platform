import type { Metadata } from "next";
import { OrphanageHero } from "@/components/orphanage/orphanage-hero";
import { CarePillars } from "@/components/orphanage/care-pillars";
import { OrphanageMediaShowcase } from "@/components/orphanage/orphanage-media-showcase";
import { SupportNeeds } from "@/components/orphanage/support-needs";
import { VolunteerCta } from "@/components/orphanage/volunteer-cta";
import { getSiteSettingsAction } from "@/actions/admin-settings";

export const metadata: Metadata = {
  title: "Children's Home & Orphanage Ministry | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Our Children's Home rescues and empowers orphaned and vulnerable children, providing them with safe shelter, 100% educational sponsorship, medical care, and Christ's unconditional love.",
  openGraph: {
    title: "Children's Home & Orphanage Ministry - Heavens Gates Sugutta",
    description:
      "A Haven of Hope & Restoration: Empowering the next generation through shelter, education, and spiritual grounding.",
  },
};

export const dynamic = "force-dynamic";

export default async function OrphanagePage() {
  const settings = await getSiteSettingsAction();

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-slate-900 w-full overflow-x-hidden">
      {/* 1. Hero Banner with 3-Stat Impact Bar */}
      <OrphanageHero />

      {/* 2. 4 Pillars of Comprehensive Care */}
      <CarePillars />

      {/* 3. Dynamic Photos & Video Stories Showcase */}
      <OrphanageMediaShowcase
        photos={settings.orphanagePhotos}
        videos={settings.orphanageVideos}
      />

      {/* 4. Tangible Sponsorship & Support Needs */}
      <SupportNeeds />

      {/* 5. Volunteer & Visit Scheduling CTA */}
      <VolunteerCta />
    </div>
  );
}
