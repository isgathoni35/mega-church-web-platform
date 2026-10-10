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
      {/* 1. Hero Section + 3-Item Stats Bar (Above the Fold) */}
      <HeroSection settings={settings} />

      {/* 2. Section 2: Founder Spotlight & Testimony */}
      <div className="scroll-reveal">
        <FounderSpotlight settings={settings} />
      </div>

      {/* 3. Section 3: Our Ministry Pillars + 3-Item Impact Counter */}
      <div className="scroll-reveal">
        <MinistryPillars settings={settings} />
      </div>

      {/* 4. Section 4: Church Service Programme (Sunday 5 Sessions & Midweek) */}
      <div className="scroll-reveal">
        <ServiceSchedule settings={settings} />
      </div>

      {/* 5. Section 5: Latest Services & Sermons */}
      <div className="scroll-reveal">
        <RecentSermons sermons={sermons} />
      </div>

      {/* 6. Section 6: Categorized Activities & Dynamic Projects */}
      <div className="scroll-reveal">
        <CategorizedActivities settings={settings} />
      </div>

      {/* 7. Section 7: Sacred Prayer Mountain (Mai Mahiu Fasting & Vigils) */}
      <div className="scroll-reveal">
        <HomePrayerMountain />
      </div>

      {/* 8. Section 8: Children's Home & Compassion Mission Teaser */}
      <div className="scroll-reveal">
        <OrphanageTeaser settings={settings} />
      </div>

      {/* 9. Section 9: Give & Support the Ministry */}
      <div className="scroll-reveal">
        <HomeGivingModule settings={settings} />
      </div>

      {/* 10. Section 10: Get In Touch */}
      <div className="scroll-reveal">
        <HomeContactModule settings={settings} />
      </div>
    </div>
  );
}

