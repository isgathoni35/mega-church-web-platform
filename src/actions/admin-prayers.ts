"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { ActionResponse } from "@/types/actions";

export async function updatePrayerStatusAction(
  id: string,
  status: "pending" | "prayed_for" | "archived"
): Promise<ActionResponse<void>> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("prayer_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    revalidatePath("/admin/prayers");

    return { success: true, message: `Status updated to ${status}.` };
  } catch (err: unknown) {
    console.error("[Update Prayer Status Error]:", err);
    return { success: false, error: "Failed to update status." };
  }
}

export async function deletePrayerAction(id: string): Promise<ActionResponse<void>> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("prayer_requests").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    revalidatePath("/admin/prayers");

    return { success: true, message: "Petition removed from records." };
  } catch (err: unknown) {
    console.error("[Delete Prayer Error]:", err);
    return { success: false, error: "Failed to delete request." };
  }
}
