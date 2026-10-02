import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { LiveHeroPlayer } from "@/components/sermons/live-hero-player";
import { SermonArchive } from "@/components/sermons/sermon-archive";
import { Sermon } from "@/types/database.types";

export const metadata: Metadata = {
  title:
    "Sermons & Live Broadcasts | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Watch live broadcasts, explore anointed sermon archives, and experience apostolic teachings and divine deliverance.",
};

const fallbackSermons: Sermon[] = [
  {
    id: "1",
    title: "Walking in Divine Overflow and Covenant Power",
    slug: "walking-in-divine-overflow-and-covenant-power",
    speaker: "Pastor Jeannette Taylor",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url:
      "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1200",
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
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url:
      "https://images.unsplash.com/photo-1510519138171-c70d7634f02c?auto=format&fit=crop&q=80&w=1200",
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
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    category: "Wednesday Bible Study",
    is_featured: false,
    is_live: false,
    date_preached: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Grand Miracle Crusade: Freedom from Generational Curses",
    slug: "grand-miracle-crusade-freedom-from-generational-curses",
    speaker: "Pastor Jeannette Taylor",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200",
    category: "Crusade & Deliverance",
    is_featured: true,
    is_live: false,
    date_preached: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
];

export default async function SermonsPage() {
  let sermons: Sermon[] = fallbackSermons;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .order("date_preached", { ascending: false });

    if (!error && data && data.length > 0) {
      sermons = data as Sermon[];
    }
  } catch (err) {
    // Graceful fallback during build or network interruptions
    console.error("Error retrieving sermons from Supabase:", err);
  }

  const liveSermon = sermons.find((s) => s.is_live);
  const featuredSermon =
    liveSermon || sermons.find((s) => s.is_featured) || sermons[0] || null;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <LiveHeroPlayer featuredSermon={featuredSermon} />
      <SermonArchive initialSermons={sermons} />
    </div>
  );
}
