import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://heavensgatesugutta.org");

  const staticRoutes = [
    { route: "", changeFrequency: "daily" as const, priority: 1.0 },
    { route: "/about", changeFrequency: "weekly" as const, priority: 0.8 },
    { route: "/sermons", changeFrequency: "daily" as const, priority: 0.9 },
    { route: "/events", changeFrequency: "daily" as const, priority: 0.9 },
    { route: "/orphanage", changeFrequency: "weekly" as const, priority: 0.85 },
    { route: "/orphanage/donate", changeFrequency: "weekly" as const, priority: 0.85 },
    { route: "/give", changeFrequency: "weekly" as const, priority: 0.9 },
    { route: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
    { route: "/prayer-request", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const items: MetadataRoute.Sitemap = staticRoutes.map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  try {
    const supabase = await createClient();
    const { data: sermons } = await supabase
      .from("sermons")
      .select("id, slug, created_at, date_preached")
      .order("date_preached", { ascending: false });

    if (sermons && sermons.length > 0) {
      sermons.forEach((sermon) => {
        const path = sermon.slug ? `/sermons/${sermon.slug}` : `/sermons?id=${sermon.id}`;
        items.push({
          url: `${baseUrl}${path}`,
          lastModified: new Date(sermon.date_preached || sermon.created_at || Date.now()),
          changeFrequency: "weekly",
          priority: 0.75,
        });
      });
    }
  } catch (err) {
    console.error("Error generating dynamic sermon sitemap URLs:", err);
  }

  return items;
}
