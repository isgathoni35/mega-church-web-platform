import { HeroSection } from "@/components/home/hero-section";
import { FounderSpotlight } from "@/components/home/founder-spotlight";
import { MinistryPillars } from "@/components/home/ministry-pillars";
import { ServiceSchedule } from "@/components/home/service-schedule";
import { RecentSermons } from "@/components/home/recent-sermons";
import { CategorizedActivities } from "@/components/home/categorized-activities";
import { HomePrayerMountain } from "@/components/home/home-prayer-mountain";
import { OrphanageTeaser } from "@/components/home/orphanage-teaser";
import { HomeGivingModule } from "@/components/home/home-giving-module";
import { HomeContactModule } from "@/components/home/home-contact-module";

import { createClient } from "@/lib/supabase/server";
import { Sermon } from "@/types/database.types";
import { getSiteSettingsAction } from "@/actions/admin-settings";

export const dynamic = "force-dynamic";

export default async function Home() {
  let sermons: Sermon[] = [];
  const settings = await getSiteSettingsAction();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .order("date_preached", { ascending: false })
      .limit(3);

    if (!error && data && data.length > 0) {
      sermons = data as Sermon[];
    }
  } catch (err) {
    console.error("Error fetching homepage sermons from Supabase:", err);
  }

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section + 3-Item Stats Bar */}
      <HeroSection settings={settings} />

      {/* 2. Section 2: Founder Spotlight & Testimony ("A Testimony of God's Grace & Power") */}
      <FounderSpotlight settings={settings} />

      {/* 3. Section 3: Our Ministry Pillars + 3-Item Impact Counter */}
      <MinistryPillars settings={settings} />

      {/* 4. Section 4: Church Service Programme (Sunday 5 Sessions & Midweek) */}
      <ServiceSchedule settings={settings} />

      {/* 5. Section 5: Latest Services & Sermons */}
      <RecentSermons sermons={sermons} />

      {/* 6. Section 6: Categorized Activities & Departments */}
      <CategorizedActivities settings={settings} />

      {/* 7. Section 7: Sacred Prayer Mountain (Mai Mahiu Fasting & Vigils) */}
      <HomePrayerMountain />

      {/* 8. Section 8: Children's Home & Compassion Mission Teaser */}
      <OrphanageTeaser settings={settings} />

      {/* 9. Section 9: Give & Support the Ministry (Embedded M-Pesa & Sendwave Hub) */}
      <HomeGivingModule settings={settings} />

      {/* 10. Section 10: Get In Touch (Sanctuary Details & Message Form) */}
      <HomeContactModule settings={settings} />
    </div>
  );
}

