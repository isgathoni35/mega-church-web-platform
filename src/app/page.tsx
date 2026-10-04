import { HeroSection } from "@/components/home/hero-section";
import { ServiceSchedule } from "@/components/home/service-schedule";
import { FounderSpotlight } from "@/components/home/founder-spotlight";
import { MinistryPillars } from "@/components/home/ministry-pillars";
import { MinistryVideoShowcase } from "@/components/home/ministry-video-showcase";
import { RecentSermons } from "@/components/home/recent-sermons";
import { CategorizedActivities } from "@/components/home/categorized-activities";
import { OrphanageTeaser } from "@/components/home/orphanage-teaser";
import { VisitorFaq } from "@/components/home/visitor-faq";

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
      <HeroSection settings={settings} />
      <ServiceSchedule settings={settings} />
      <FounderSpotlight settings={settings} />
      <MinistryPillars />
      <MinistryVideoShowcase />
      <CategorizedActivities />
      <RecentSermons sermons={sermons} />
      <OrphanageTeaser />
      <VisitorFaq />
    </div>
  );
}
