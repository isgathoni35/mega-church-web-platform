import React from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { SermonManagerView } from "@/components/admin/sermon-manager-view";
import { Sermon } from "@/types/database.types";

export const dynamic = "force-dynamic";

export default async function AdminSermonsPage() {
  let sermons: Sermon[] = [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .order("date_preached", { ascending: false });

    if (!error && data) {
      sermons = data as Sermon[];
    }
  } catch (err) {
    console.error("[Admin Sermons Fetch Error]:", err);
  }

  return <SermonManagerView initialSermons={sermons} />;
}
