import type { Metadata } from "next";
import { OrphanageHero } from "@/components/orphanage/orphanage-hero";
import { OrphanageStory } from "@/components/orphanage/orphanage-story";
import { CarePillars } from "@/components/orphanage/care-pillars";
import { OrphanageMediaShowcase } from "@/components/orphanage/orphanage-media-showcase";
import { SupportNeeds } from "@/components/orphanage/support-needs";
import { InKindDonations } from "@/components/orphanage/in-kind-donations";
import { OrphanageFaq } from "@/components/orphanage/orphanage-faq";
import { VolunteerCta } from "@/components/orphanage/volunteer-cta";
import { getSiteSettingsAction } from "@/actions/admin-settings";

export const metadata: Metadata = {
  title: "Sugutta Children's Home & Compassion Ministry | Sugutta Fellowship Church",
  description:
    "Sheltering, educating, and loving 60+ orphaned and vulnerable children in Sugutta, Kenya. 100% direct allocation for food, tuition, healthcare, and safe Christian dormitories.",
  openGraph: {
    title: "Sugutta Children's Home - Compassion & Care Ministry",
    description:
      "A Haven of Hope & Family Love: Empowering orphaned children through shelter, formal education, and Christ's love.",
  },
};

export const dynamic = "force-dynamic";

export default async function OrphanagePage() {
  const settings = await getSiteSettingsAction();

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-slate-900 w-full overflow-x-hidden">
      {/* 1. Hero Banner with Scripture Mandate & 3-Stat Impact Bar */}
      <OrphanageHero settings={settings} />

      {/* 2. The Heart & Origin Story: Why We Opened Our Doors in Sugutta */}
      <OrphanageStory settings={settings} />

      {/* 3. 4 Pillars of Comprehensive Care */}
      <CarePillars />

      {/* 4. Dynamic Photos & Video Stories Showcase */}
      <OrphanageMediaShowcase
        photos={settings.orphanagePhotos}
        videos={settings.orphanageVideos}
      />

      {/* 5. Tangible Financial Sponsorship & Living Impact */}
      <SupportNeeds />

      {/* 6. Physical In-Kind Food & Supplies Drop-off Guide */}
      <InKindDonations />

      {/* 7. Donor Transparency & Frequently Asked Questions */}
      <OrphanageFaq />

      {/* 8. Volunteer & Weekend Fellowship Visits CTA */}
      <VolunteerCta />
    </div>
  );
}
