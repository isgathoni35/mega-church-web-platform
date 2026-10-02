import { HeroSection } from "@/components/home/hero-section";
import { FounderSpotlight } from "@/components/home/founder-spotlight";
import { MinistryPillars } from "@/components/home/ministry-pillars";
import { RecentSermons } from "@/components/home/recent-sermons";
import { ServiceSchedule } from "@/components/home/service-schedule";
import { OrphanageTeaser } from "@/components/home/orphanage-teaser";
import { BranchPreview } from "@/components/home/branch-preview";
import { createClient } from "@/lib/supabase/server";
import { Sermon } from "@/types/database.types";

const fallbackSermons: Sermon[] = [
  {
    id: "1",
    title: "Walking in Divine Overflow and Covenant Power",
    slug: "walking-in-divine-overflow-and-covenant-power",
    speaker: "Pastor Jeannette Taylor",
    youtube_url: "https://www.youtube.com/watch?v=placeholder",
    thumbnail_url:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200",
    category: "Sunday Worship",
    is_featured: true,
    is_live: false,
    date_preached: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Monday Inspiration Live: The Mystery of Prophetic Deliverance",
    slug: "monday-inspiration-live-mystery-of-prophetic-deliverance",
    speaker: "Pastor Jeannette Taylor",
    youtube_url: "https://www.youtube.com/watch?v=placeholder",
    thumbnail_url:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=1200",
    category: "Monday Inspiration",
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
    category: "Wednesday Bible Study",
    is_featured: false,
    is_live: false,
    date_preached: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
];

export default async function Home() {
  let sermons: Sermon[] = fallbackSermons;

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
      <HeroSection />
      <FounderSpotlight />
      <MinistryPillars />
      <RecentSermons sermons={sermons} />
      <ServiceSchedule />
      <OrphanageTeaser />
      <BranchPreview />
    </div>
  );
}

