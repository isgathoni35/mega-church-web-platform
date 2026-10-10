import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettingsAction } from "@/actions/admin-settings";
import { LiveHeroPlayer } from "@/components/sermons/live-hero-player";
import { SermonArchive } from "@/components/sermons/sermon-archive";
import { Sermon } from "@/types/database.types";

export const metadata: Metadata = {
  title:
    "Sermons & Live Broadcasts | Heavens Gates Sugutta Fellowship Church International",
  description:
    "Watch live broadcasts, explore anointed sermon archives, and experience apostolic teachings and divine deliverance.",
};

export default async function SermonsPage() {
  let sermons: Sermon[] = [];

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
    console.error("Error retrieving sermons from Supabase:", err);
  }

  const liveSermon = sermons.find((s) => s.is_live);
  const featuredSermon =
    liveSermon || sermons.find((s) => s.is_featured) || null;
  const settings = await getSiteSettingsAction();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <LiveHeroPlayer
        featuredSermon={featuredSermon}
        youtubeChannelUrl={settings.youtubeChannelUrl}
      />
      <div className="scroll-reveal">
        <SermonArchive initialSermons={sermons} />
      </div>
    </div>
  );
}


