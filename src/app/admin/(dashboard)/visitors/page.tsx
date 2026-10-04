import React from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { VisitorsManagerView } from "@/components/admin/visitors-manager-view";
import { PrayerRequest } from "@/types/database.types";

export const dynamic = "force-dynamic";

export default async function AdminVisitorsPage() {
  let submissions: PrayerRequest[] = [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("prayer_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      submissions = data as PrayerRequest[];
    }
  } catch (err) {
    console.error("[Admin Visitors Fetch Error]:", err);
  }

  return <VisitorsManagerView initialSubmissions={submissions} />;
}
