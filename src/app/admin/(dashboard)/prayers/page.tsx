import React from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { PrayerManagerView } from "@/components/admin/prayer-manager-view";
import { PrayerRequest } from "@/types/database.types";

export const dynamic = "force-dynamic";

export default async function AdminPrayersPage() {
  let prayers: PrayerRequest[] = [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("prayer_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      prayers = data as PrayerRequest[];
    }
  } catch (err) {
    console.error("[Admin Prayers Fetch Error]:", err);
  }

  return <PrayerManagerView initialPrayers={prayers} />;
}
