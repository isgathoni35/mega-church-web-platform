import { HeroSection } from "@/components/home/hero-section";
import { FounderSpotlight } from "@/components/home/founder-spotlight";
import { MinistryPillars } from "@/components/home/ministry-pillars";
import { ServiceSchedule } from "@/components/home/service-schedule";
import { RecentSermons } from "@/components/home/recent-sermons";
import { CategorizedActivities } from "@/components/home/categorized-activities";
import { HomePrayerMountain } from "@/components/home/home-prayer-mountain";
import { AnointedReels } from "@/components/home/anointed-reels";
import { OrphanageTeaser } from "@/components/home/orphanage-teaser";
import { HomeGivingModule } from "@/components/home/home-giving-module";
import { HomeContactModule } from "@/components/home/home-contact-module";

import { createClient } from "@/lib/supabase/server";
import { Sermon } from "@/types/database.types";
import { getSiteSettingsAction } from "@/actions/admin-settings";

const fallbackSermons: Sermon[] = [
  {
    id: "1",
    title: "Walking in Divine Overflow and Covenant Power",
    slug: "walking-in-divine-overflow-and-covenant-power",
    speaker: "Pastor Caesar Osebe Nyandwaro",
    youtube_url: "https://www.youtube.com/watch?v=placeholder",
    thumbnail_url:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200",
    category: "Sunday Service",
    is_featured: true,
    is_live: false,
    date_preached: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Monday Inspiration Live: The Mystery of Prophetic Deliverance",
    slug: "monday-inspiration-live-mystery-of-prophetic-deliverance",
    speaker: "Pastor Caesar Osebe Nyandwaro",
    youtube_url: "https://www.youtube.com/watch?v=placeholder",
    thumbnail_url:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=1200",
    category: "Midweek Service",
    is_featured: false,
    is_live: true,
    date_preached: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Unlocking Spiritual Authority and Kingdom Righteousness",
    slug: "unlocking-spiritual-authority-and-kingdom-righteousness",
    speaker: "Apostolic Teaching Ministry",
    youtube_url: "https://www.youtube.com/watch?v=placeholder",
    thumbnail_url:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    category: "Midweek Service",
    is_featured: false,
    is_live: false,
    date_preached: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
];

export default async function Home() {
  let sermons: Sermon[] = fallbackSermons;
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
      <MinistryPillars />

      {/* 4. Section 4: Church Service Programme (Sunday 5 Sessions & Midweek) */}
      <ServiceSchedule settings={settings} />

      {/* 5. Section 5: Latest Services & Sermons */}
      <RecentSermons sermons={sermons} />

      {/* 6. Section 6: Categorized Activities & Departments */}
      <CategorizedActivities />

      {/* 7. Section 7: Sacred Prayer Mountain (Mai Mahiu Fasting & Vigils) */}
      <HomePrayerMountain />

      {/* 8. Section 8: Anointed Moments (4 Vertical 9:16 Video Reels) */}
      <AnointedReels />

      {/* 9. Section 9: Children's Home & Compassion Mission Teaser */}
      <OrphanageTeaser />

      {/* 10. Section 10: Give & Support the Ministry (Embedded M-Pesa & Sendwave Hub) */}
      <HomeGivingModule settings={settings} />

      {/* 11. Section 11: Get In Touch (Sanctuary Details & Message Form) */}
      <HomeContactModule settings={settings} />
    </div>
  );
}
