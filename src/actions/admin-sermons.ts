"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/utils/youtube";
import { ActionResponse } from "@/types/actions";
import { SermonCategory } from "@/types/database.types";

interface AddSermonPayload {
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category: SermonCategory;
  speaker?: string;
  datePreached?: string;
  isFeatured?: boolean;
  isLive?: boolean;
}

/**
 * Create a signed upload URL for direct client-to-Supabase storage video uploads.
 * This completely avoids server request body limits (1MB / 4.5MB) in both dev and production.
 */
export async function getSermonVideoSignedUploadUrlAction(
  fileName: string,
  fileType: string,
  fileSize: number
): Promise<ActionResponse<{ signedUrl: string; token: string; path: string; publicUrl: string }>> {
  try {
    const MAX_SIZE = 50 * 1024 * 1024;
    if (fileSize > MAX_SIZE) {
      return {
        success: false,
        error: "Video file exceeds 50MB. Please compress the file or link a YouTube URL instead.",
      };
    }

    const fileExt = fileName.split(".").pop()?.toLowerCase() || "mp4";
    const allowedExts = ["mp4", "webm", "mov", "m4v", "ogg", "mkv"];
    if (!allowedExts.includes(fileExt) && !fileType.startsWith("video/")) {
      return {
        success: false,
        error: "Please upload a valid video file (MP4, WebM, or MOV).",
      };
    }

    const cleanFileName = `sermons/sermon-video-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const supabase = createAdminClient();

    const { data, error } = await supabase.storage
      .from("church-media")
      .createSignedUploadUrl(cleanFileName, { upsert: true });

    if (error || !data) {
      console.error("[Create Signed Upload URL Error]:", error);
      return {
        success: false,
        error: `Failed to authorize video upload: ${error?.message || "Storage error"}.`,
      };
    }

    const { data: urlData } = supabase.storage
      .from("church-media")
      .getPublicUrl(cleanFileName);

    return {
      success: true,
      data: {
        signedUrl: data.signedUrl,
        token: data.token,
        path: cleanFileName,
        publicUrl: urlData.publicUrl,
      },
    };
  } catch (err: unknown) {
    console.error("[Get Signed Upload URL Action Error]:", err);
    return { success: false, error: "Unexpected error preparing video upload." };
  }
}

/**
 * Upload a video file directly to the Supabase church-media bucket (up to 50MB)
 */
export async function uploadSermonVideoAction(
  formData: FormData
): Promise<ActionResponse<{ url: string }>> {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No video file provided." };
    }

    // Check size limit: 50MB (Supabase free tier max single object limit)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return {
        success: false,
        error: "Video file exceeds 50MB. Please compress the file or link a YouTube URL instead.",
      };
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase() || "mp4";
    const allowedExts = ["mp4", "webm", "mov", "m4v", "ogg", "mkv"];
    if (!allowedExts.includes(fileExt) && !file.type.startsWith("video/")) {
      return {
        success: false,
        error: "Please upload a valid video file (MP4, WebM, or MOV).",
      };
    }

    const cleanFileName = `sermons/sermon-video-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = createAdminClient();
    const { error: uploadError } = await supabase.storage
      .from("church-media")
      .upload(cleanFileName, buffer, {
        contentType: file.type || "video/mp4",
        upsert: true,
      });

    if (uploadError) {
      console.error("[Upload Sermon Video Error]:", uploadError);
      return {
        success: false,
        error: `Storage upload failed: ${uploadError.message}.`,
      };
    }

    const { data: urlData } = supabase.storage
      .from("church-media")
      .getPublicUrl(cleanFileName);

    return {
      success: true,
      message: "Video file uploaded successfully!",
      data: { url: urlData.publicUrl },
    };
  } catch (err: unknown) {
    console.error("[Upload Sermon Video Action Error]:", err);
    return { success: false, error: "Unexpected error during video upload." };
  }
}

/**
 * Upload an optional custom thumbnail image for a sermon video
 */
export async function uploadSermonThumbnailAction(
  formData: FormData
): Promise<ActionResponse<{ url: string }>> {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No image file provided." };
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return { success: false, error: "Please upload a JPEG, PNG, or WebP image." };
    }

    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "Thumbnail exceeds 10MB limit." };
    }

    const fileExt = file.name.split(".").pop() || "jpg";
    const cleanFileName = `sermons/sermon-thumb-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = createAdminClient();
    const { error: uploadError } = await supabase.storage
      .from("church-media")
      .upload(cleanFileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("[Upload Sermon Thumbnail Error]:", uploadError);
      return { success: false, error: `Upload failed: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from("church-media")
      .getPublicUrl(cleanFileName);

    return {
      success: true,
      message: "Custom thumbnail uploaded!",
      data: { url: urlData.publicUrl },
    };
  } catch (err: unknown) {
    console.error("[Upload Sermon Thumbnail Error]:", err);
    return { success: false, error: "Unexpected error during thumbnail upload." };
  }
}

/**
 * Add a sermon with either a YouTube link or a direct uploaded video URL
 */
export async function addSermonAction(
  payload: AddSermonPayload
): Promise<ActionResponse<{ id: string }>> {
  try {
    const {
      title,
      videoUrl,
      thumbnailUrl,
      category,
      speaker = "Pastor Caesar O. Nyandwaro",
      datePreached = new Date().toISOString().split("T")[0],
      isFeatured = false,
      isLive = false,
    } = payload;

    if (!title || title.trim().length === 0) {
      return { success: false, error: "Please enter a sermon or video title." };
    }

    const cleanVideoUrl = (videoUrl || "").trim();
    if (!cleanVideoUrl) {
      return { success: false, error: "Please provide a video file or YouTube URL." };
    }

    // Determine thumbnail
    const videoId = getYouTubeId(cleanVideoUrl);
    let finalThumbnail: string = thumbnailUrl || "";

    if (videoId && !finalThumbnail) {
      finalThumbnail = getYouTubeThumbnail(videoId);
    } else if (!finalThumbnail) {
      finalThumbnail = "/images/pastor-caesar-hero.jpg";
    }

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

    // If marked as featured, deactivate any other featured sermon so only 1 is hero
    if (isFeatured) {
      await supabase.from("sermons").update({ is_featured: false }).neq("id", "00000000-0000-0000-0000-000000000000");
    }

    const { data, error } = await supabase
      .from("sermons")
      .insert({
        title: title.trim(),
        slug: uniqueSlug,
        speaker: speaker.trim(),
        youtube_url: cleanVideoUrl,
        thumbnail_url: finalThumbnail,
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

/**
 * Toggle Live status for a sermon
 */
export async function toggleLiveSermonAction(
  sermonId: string,
  setLive: boolean
): Promise<ActionResponse<void>> {
  try {
    const supabase = createAdminClient();

    // Reset any other active live broadcast
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

/**
 * Explicitly Toggle Featured / Pinned status for a sermon
 */
export async function toggleFeaturedSermonAction(
  sermonId: string,
  setFeatured: boolean
): Promise<ActionResponse<void>> {
  try {
    const supabase = createAdminClient();

    // If pinning, reset other featured sermons first so only 1 sermon is hero
    if (setFeatured) {
      await supabase.from("sermons").update({ is_featured: false }).neq("id", "00000000-0000-0000-0000-000000000000");
      await supabase.from("sermons").update({ is_featured: true }).eq("id", sermonId);
    } else {
      await supabase.from("sermons").update({ is_featured: false }).eq("id", sermonId);
    }

    revalidatePath("/");
    revalidatePath("/sermons");

    return { success: true };
  } catch (err: unknown) {
    console.error("[Toggle Featured Error]:", err);
    return { success: false, error: "Failed to toggle pinned status." };
  }
}

/**
 * Delete a sermon from the database
 */
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
