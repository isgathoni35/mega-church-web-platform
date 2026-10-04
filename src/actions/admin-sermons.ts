"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/utils/youtube";
import { ActionResponse } from "@/types/actions";
import { SermonCategory } from "@/types/database.types";

interface AddSermonPayload {
  title: string;
  youtubeUrl: string;
  category: SermonCategory;
  speaker?: string;
  datePreached?: string;
  isFeatured?: boolean;
  isLive?: boolean;
}

export async function addSermonAction(
  payload: AddSermonPayload
): Promise<ActionResponse<{ id: string }>> {
  try {
    const {
      title,
      youtubeUrl,
      category,
      speaker = "Pastor Jeannette Taylor",
      datePreached = new Date().toISOString().split("T")[0],
      isFeatured = false,
      isLive = false,
    } = payload;

    if (!title || title.trim().length === 0) {
      return { success: false, error: "Please enter a sermon or video title." };
    }

    if (!youtubeUrl || youtubeUrl.trim().length === 0) {
      return { success: false, error: "Please provide a valid YouTube URL." };
    }

    const videoId = getYouTubeId(youtubeUrl);
    if (!videoId) {
      return {
        success: false,
        error: "Invalid YouTube URL. Please provide a standard YouTube video link or Shorts URL.",
      };
    }

    const thumbnailUrl = getYouTubeThumbnail(videoId);

    // Generate unique slug
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const supabase = createAdminClient();

    // If marked as live, deactivate any other active live broadcast first
    if (isLive) {
      await supabase.from("sermons").update({ is_live: false }).neq("id", "00000000-0000-0000-0000-000000000000");
    }

    const { data, error } = await supabase
      .from("sermons")
      .insert({
        title: title.trim(),
        slug: uniqueSlug,
        speaker: speaker.trim(),
        youtube_url: youtubeUrl.trim(),
        thumbnail_url: thumbnailUrl,
        category,
        is_featured: isFeatured,
        is_live: isLive,
        date_preached: datePreached,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[Add Sermon DB Error]:", error);
      return { success: false, error: `Database error: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/sermons");

    return {
      success: true,
      message: "Sermon successfully added to library and published online.",
      data: { id: data.id },
    };
  } catch (err: unknown) {
    console.error("[Add Sermon Action Error]:", err);
    return { success: false, error: "Unexpected error adding sermon." };
  }
}

export async function toggleLiveSermonAction(
  sermonId: string,
  setLive: boolean
): Promise<ActionResponse<void>> {
  try {
    const supabase = createAdminClient();

    // Always reset other live broadcasts first
    await supabase.from("sermons").update({ is_live: false }).neq("id", "00000000-0000-0000-0000-000000000000");

    if (setLive) {
      await supabase.from("sermons").update({ is_live: true }).eq("id", sermonId);
    }

    revalidatePath("/");
    revalidatePath("/sermons");

    return { success: true };
  } catch (err: unknown) {
    console.error("[Toggle Live Error]:", err);
    return { success: false, error: "Failed to toggle live status." };
  }
}

export async function deleteSermonAction(sermonId: string): Promise<ActionResponse<void>> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("sermons").delete().eq("id", sermonId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/sermons");

    return { success: true, message: "Sermon deleted from library." };
  } catch (err: unknown) {
    console.error("[Delete Sermon Error]:", err);
    return { success: false, error: "Failed to delete sermon." };
  }
}
