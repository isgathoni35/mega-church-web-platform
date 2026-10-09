"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { ActionResponse } from "@/types/actions";
import {
  SiteSettingsData,
  DEFAULT_SETTINGS,
  MinistryEventItem,
  MinistryProjectItem,
  OrphanagePhotoItem,
  OrphanageVideoItem,
} from "@/types/settings";
import { Json } from "@/types/database.types";
import { extractCleanImageUrl } from "@/lib/utils";


/**
 * Create a signed upload URL for direct client-to-Supabase storage video uploads for Orphanage media.
 * Bypasses server request body limits (1MB in Server Actions & 4.5MB on Vercel) in both local and live apps.
 */
export async function getOrphanageVideoSignedUploadUrlAction(
  fileName: string,
  fileType: string,
  fileSize: number
): Promise<ActionResponse<{ signedUrl: string; token: string; path: string; publicUrl: string }>> {
  try {
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
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

    const cleanFileName = `orphanage/videos/orphanage-video-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const supabase = createAdminClient();

    const { data, error } = await supabase.storage
      .from("church-media")
      .createSignedUploadUrl(cleanFileName, { upsert: true });

    if (error || !data) {
      console.error("[Create Orphanage Signed Upload URL Error]:", error);
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
    console.error("[Get Orphanage Signed Upload URL Action Error]:", err);
    return { success: false, error: "Unexpected error preparing video upload." };
  }
}

/**
 * Create a signed upload URL for direct client-to-Supabase storage video uploads for Events & Crusades.
 * Bypasses server request body limits (1MB in Server Actions & 4.5MB on Vercel) in both local and live apps.
 */
export async function getEventVideoSignedUploadUrlAction(
  fileName: string,
  fileType: string,
  fileSize: number
): Promise<ActionResponse<{ signedUrl: string; token: string; path: string; publicUrl: string }>> {
  try {
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
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

    const cleanFileName = `events/videos/event-video-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const supabase = createAdminClient();

    const { data, error } = await supabase.storage
      .from("church-media")
      .createSignedUploadUrl(cleanFileName, { upsert: true });

    if (error || !data) {
      console.error("[Create Event Signed Upload URL Error]:", error);
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
    console.error("[Get Event Signed Upload URL Action Error]:", err);
    return { success: false, error: "Unexpected error preparing event video upload." };
  }
}


export async function uploadChurchMediaAction(
  formData: FormData
): Promise<ActionResponse<{ url: string }>> {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No image file provided." };
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return { success: false, error: "Invalid file type. Please upload a JPEG, PNG, or WebP image." };
    }

    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "File exceeds 10MB limit. Please upload a smaller image." };
    }

    const supabase = createAdminClient();
    const fileExt = file.name.split(".").pop() || "jpg";
    const cleanFileName = `church-asset-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("church-media")
      .upload(cleanFileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("[Upload Church Media Error]:", uploadError);
      return {
        success: false,
        error: `Supabase Storage upload failed: ${uploadError.message}. Please check bucket permissions.`,
      };
    }

    const { data: urlData } = supabase.storage
      .from("church-media")
      .getPublicUrl(cleanFileName);

    return {
      success: true,
      message: "Photo uploaded successfully!",
      data: { url: urlData.publicUrl },
    };
  } catch (err: unknown) {
    console.error("[Upload Church Media Exception]:", err);
    return {
      success: false,
      error: "Unexpected error uploading photo. Please try again.",
    };
  }
}

/**
 * Immediately persist a new Children's Home Photo Moment to Supabase site_settings and revalidate /orphanage
 */
export async function addOrphanagePhotoAction(
  photo: OrphanagePhotoItem
): Promise<ActionResponse<OrphanagePhotoItem[]>> {
  try {
    const supabase = createAdminClient();
    const { data: existing, error: fetchErr } = await supabase
      .from("site_settings")
      .select("id, orphanage_photos_json")
      .limit(1);

    if (fetchErr) {
      console.error("[Add Orphanage Photo Fetch Error]:", fetchErr);
      return { success: false, error: "Database error fetching gallery settings." };
    }

    const currentPhotos: OrphanagePhotoItem[] =
      existing && existing.length > 0 && Array.isArray(existing[0].orphanage_photos_json)
        ? (existing[0].orphanage_photos_json as unknown as OrphanagePhotoItem[])
        : [];

    const updatedPhotos = [photo, ...currentPhotos];

    if (existing && existing.length > 0) {
      const { error: updateErr } = await supabase
        .from("site_settings")
        .update({
          orphanage_photos_json: updatedPhotos as unknown as Json,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing[0].id);

      if (updateErr) {
        return { success: false, error: `Failed to save photo: ${updateErr.message}` };
      }
    } else {
      const { error: insertErr } = await supabase.from("site_settings").insert({
        orphanage_photos_json: updatedPhotos as unknown as Json,
      });
      if (insertErr) {
        return { success: false, error: `Failed to insert photo: ${insertErr.message}` };
      }
    }

    revalidatePath("/orphanage");
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "Photo moment successfully published to Children's Home page!",
      data: updatedPhotos,
    };
  } catch (err: unknown) {
    console.error("[Add Orphanage Photo Exception]:", err);
    return { success: false, error: "Unexpected error adding photo moment." };
  }
}

/**
 * Immediately delete a Children's Home Photo Moment from Supabase site_settings and revalidate /orphanage
 */
export async function deleteOrphanagePhotoAction(
  photoId: string
): Promise<ActionResponse<OrphanagePhotoItem[]>> {
  try {
    const supabase = createAdminClient();
    const { data: existing, error: fetchErr } = await supabase
      .from("site_settings")
      .select("id, orphanage_photos_json")
      .limit(1);

    if (fetchErr || !existing || existing.length === 0) {
      return { success: false, error: "Database error fetching gallery settings." };
    }

    const currentPhotos: OrphanagePhotoItem[] = Array.isArray(existing[0].orphanage_photos_json)
      ? (existing[0].orphanage_photos_json as unknown as OrphanagePhotoItem[])
      : [];

    const updatedPhotos = currentPhotos.filter((p) => p.id !== photoId);

    const { error: updateErr } = await supabase
      .from("site_settings")
      .update({
        orphanage_photos_json: updatedPhotos as unknown as Json,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing[0].id);

    if (updateErr) {
      return { success: false, error: `Failed to remove photo: ${updateErr.message}` };
    }

    revalidatePath("/orphanage");
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "Photo moment removed from Children's Home gallery.",
      data: updatedPhotos,
    };
  } catch (err: unknown) {
    console.error("[Delete Orphanage Photo Exception]:", err);
    return { success: false, error: "Unexpected error deleting photo moment." };
  }
}

/**
 * Immediately persist a new Children's Home Video Story to Supabase site_settings and revalidate /orphanage
 */
export async function addOrphanageVideoAction(
  video: OrphanageVideoItem
): Promise<ActionResponse<OrphanageVideoItem[]>> {
  try {
    const supabase = createAdminClient();
    const { data: existing, error: fetchErr } = await supabase
      .from("site_settings")
      .select("id, orphanage_videos_json")
      .limit(1);

    if (fetchErr) {
      console.error("[Add Orphanage Video Fetch Error]:", fetchErr);
      return { success: false, error: "Database error fetching video settings." };
    }

    const currentVideos: OrphanageVideoItem[] =
      existing && existing.length > 0 && Array.isArray(existing[0].orphanage_videos_json)
        ? (existing[0].orphanage_videos_json as unknown as OrphanageVideoItem[])
        : [];

    const updatedVideos = [video, ...currentVideos];

    if (existing && existing.length > 0) {
      const { error: updateErr } = await supabase
        .from("site_settings")
        .update({
          orphanage_videos_json: updatedVideos as unknown as Json,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing[0].id);

      if (updateErr) {
        return { success: false, error: `Failed to save video: ${updateErr.message}` };
      }
    } else {
      const { error: insertErr } = await supabase.from("site_settings").insert({
        orphanage_videos_json: updatedVideos as unknown as Json,
      });
      if (insertErr) {
        return { success: false, error: `Failed to insert video: ${insertErr.message}` };
      }
    }

    revalidatePath("/orphanage");
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "Video story successfully published to Children's Home page!",
      data: updatedVideos,
    };
  } catch (err: unknown) {
    console.error("[Add Orphanage Video Exception]:", err);
    return { success: false, error: "Unexpected error adding video story." };
  }
}

/**
 * Immediately delete a Children's Home Video Story from Supabase site_settings and revalidate /orphanage
 */
export async function deleteOrphanageVideoAction(
  videoId: string
): Promise<ActionResponse<OrphanageVideoItem[]>> {
  try {
    const supabase = createAdminClient();
    const { data: existing, error: fetchErr } = await supabase
      .from("site_settings")
      .select("id, orphanage_videos_json")
      .limit(1);

    if (fetchErr || !existing || existing.length === 0) {
      return { success: false, error: "Database error fetching video settings." };
    }

    const currentVideos: OrphanageVideoItem[] = Array.isArray(existing[0].orphanage_videos_json)
      ? (existing[0].orphanage_videos_json as unknown as OrphanageVideoItem[])
      : [];

    const updatedVideos = currentVideos.filter((v) => v.id !== videoId);

    const { error: updateErr } = await supabase
      .from("site_settings")
      .update({
        orphanage_videos_json: updatedVideos as unknown as Json,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing[0].id);

    if (updateErr) {
      return { success: false, error: `Failed to remove video: ${updateErr.message}` };
    }

    revalidatePath("/orphanage");
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "Video story removed from Children's Home gallery.",
      data: updatedVideos,
    };
  } catch (err: unknown) {
    console.error("[Delete Orphanage Video Exception]:", err);
    return { success: false, error: "Unexpected error deleting video story." };
  }
}

export async function getSiteSettingsAction(): Promise<SiteSettingsData> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1);

    if (!error && data && data.length > 0) {
      const row = data[0];

      // Normalize pastor name to ensure 'Osebe' is strictly formatted as 'O.'
      const cleanPastorName = (row.pastor_name || DEFAULT_SETTINGS.pastorName)
        .replace(/\bOsebe\b/gi, "O.")
        .replace(/\s+/g, " ")
        .trim();

      const cleanWesternUnion = (row.western_union_recipient || DEFAULT_SETTINGS.westernUnionRecipient)
        .replace(/\bOsebe\b/gi, "O.")
        .replace(/\s+/g, " ")
        .trim();

      // Normalize contact email: if legacy address or missing, fallback to official church email
      const rawEmail = (row.contact_email || "").trim();
      const cleanEmail =
        !rawEmail || rawEmail === "caesarosebe@gmail.com" || rawEmail === "contact@heavensgatesugutta.org"
          ? DEFAULT_SETTINGS.contactEmail
          : rawEmail;

      return {
        // Pastoral Profile
        pastorName: cleanPastorName,
        pastorTitle: row.pastor_title || DEFAULT_SETTINGS.pastorTitle,
        pastorImageUrl: extractCleanImageUrl(row.pastor_image_url) || DEFAULT_SETTINGS.pastorImageUrl,
        pastorBio: row.pastor_bio ? row.pastor_bio.replace(/\bOsebe\b/gi, "O.") : DEFAULT_SETTINGS.pastorBio,
        pastorNationalId: row.pastor_national_id || DEFAULT_SETTINGS.pastorNationalId,

        // Church Identity & Location
        churchMotto: row.church_motto || DEFAULT_SETTINGS.churchMotto,
        churchSlogan: row.church_slogan || DEFAULT_SETTINGS.churchSlogan,
        postalAddress: row.postal_address || DEFAULT_SETTINGS.postalAddress,
        physicalLocation: row.physical_location || DEFAULT_SETTINGS.physicalLocation,

        // Hero Section
        heroHeadline1: row.hero_headline_1 || DEFAULT_SETTINGS.heroHeadline1,
        heroHeadline2: row.hero_headline_2 || DEFAULT_SETTINGS.heroHeadline2,
        heroHeadline3: row.hero_headline_3 || DEFAULT_SETTINGS.heroHeadline3,
        heroSubtitle: row.hero_subtitle || DEFAULT_SETTINGS.heroSubtitle,
        heroPromise: row.hero_promise || DEFAULT_SETTINGS.heroPromise,
        heroImageUrl: extractCleanImageUrl(row.hero_image_url || row.pastor_image_url) || DEFAULT_SETTINGS.heroImageUrl,
        heroStatBranches: row.hero_stat_branches ?? DEFAULT_SETTINGS.heroStatBranches,
        heroStatLives: row.hero_stat_lives || DEFAULT_SETTINGS.heroStatLives,
        heroStatYears: row.hero_stat_years || DEFAULT_SETTINGS.heroStatYears,

        // Mission & Vision Statements
        missionStatement: row.mission_statement || DEFAULT_SETTINGS.missionStatement,
        visionStatement: row.vision_statement || DEFAULT_SETTINGS.visionStatement,

        // Twin Ongoing Projects
        constructionTitle: row.construction_title || DEFAULT_SETTINGS.constructionTitle,
        constructionSubtitle: row.construction_subtitle || DEFAULT_SETTINGS.constructionSubtitle,
        constructionNarrative: row.construction_narrative || DEFAULT_SETTINGS.constructionNarrative,
        constructionImageUrl: extractCleanImageUrl(row.construction_image_url) || DEFAULT_SETTINGS.constructionImageUrl,
        constructionBadge: row.construction_badge || DEFAULT_SETTINGS.constructionBadge,

        orphanageTitle: row.orphanage_title || DEFAULT_SETTINGS.orphanageTitle,
        orphanageSubtitle: row.orphanage_subtitle || DEFAULT_SETTINGS.orphanageSubtitle,
        orphanageNarrative: row.orphanage_narrative || DEFAULT_SETTINGS.orphanageNarrative,
        orphanageImageUrl: extractCleanImageUrl(row.orphanage_image_url) || DEFAULT_SETTINGS.orphanageImageUrl,
        orphanageStoryImage: extractCleanImageUrl(row.orphanage_story_image) || DEFAULT_SETTINGS.orphanageStoryImage,
        orphanageBadge: row.orphanage_badge || DEFAULT_SETTINGS.orphanageBadge,

        // Grassroots Community Outreach
        communityTitle: row.community_title || DEFAULT_SETTINGS.communityTitle,
        communityNarrative: row.community_narrative || DEFAULT_SETTINGS.communityNarrative,
        communityImageUrl: extractCleanImageUrl(row.community_image_url) || DEFAULT_SETTINGS.communityImageUrl,

        // 4 Ministry Pillars
        pillar1Title: row.pillar_1_title || DEFAULT_SETTINGS.pillar1Title,
        pillar1Desc: row.pillar_1_desc || DEFAULT_SETTINGS.pillar1Desc,
        pillar1Image: extractCleanImageUrl(row.pillar_1_image) || DEFAULT_SETTINGS.pillar1Image,
        pillar1Video: (row.pillar_1_video || "").trim(),

        pillar2Title: row.pillar_2_title || DEFAULT_SETTINGS.pillar2Title,
        pillar2Desc: row.pillar_2_desc || DEFAULT_SETTINGS.pillar2Desc,
        pillar2Image: extractCleanImageUrl(row.pillar_2_image) || DEFAULT_SETTINGS.pillar2Image,
        pillar2Video: (row.pillar_2_video || "").trim(),

        pillar3Title: row.pillar_3_title || DEFAULT_SETTINGS.pillar3Title,
        pillar3Desc: row.pillar_3_desc || DEFAULT_SETTINGS.pillar3Desc,
        pillar3Image: extractCleanImageUrl(row.pillar_3_image) || DEFAULT_SETTINGS.pillar3Image,
        pillar3Video: (row.pillar_3_video || "").trim(),

        pillar4Title: row.pillar_4_title || DEFAULT_SETTINGS.pillar4Title,
        pillar4Desc: row.pillar_4_desc || DEFAULT_SETTINGS.pillar4Desc,
        pillar4Image: extractCleanImageUrl(row.pillar_4_image) || DEFAULT_SETTINGS.pillar4Image,
        pillar4Video: (row.pillar_4_video || "").trim(),

        // 3 Pillar Impact Counters
        impactStat1Val: row.impact_stat_1_val || DEFAULT_SETTINGS.impactStat1Val,
        impactStat1Lbl: row.impact_stat_1_lbl || DEFAULT_SETTINGS.impactStat1Lbl,
        impactStat2Val: row.impact_stat_2_val || DEFAULT_SETTINGS.impactStat2Val,
        impactStat2Lbl: row.impact_stat_2_lbl || DEFAULT_SETTINGS.impactStat2Lbl,
        impactStat3Val: row.impact_stat_3_val || DEFAULT_SETTINGS.impactStat3Val,
        impactStat3Lbl: row.impact_stat_3_lbl || DEFAULT_SETTINGS.impactStat3Lbl,

        // Dynamic Projects
        projectsJson: Array.isArray(row.projects_json) && (row.projects_json as unknown as MinistryProjectItem[]).length > 0
          ? (row.projects_json as unknown as MinistryProjectItem[]).map((p) => ({
              ...p,
              imageUrl: extractCleanImageUrl(p.imageUrl),
              videoUrl: p.videoUrl ? p.videoUrl.trim() : undefined,
              active: p.active !== false, // default to true if missing
            }))
          : DEFAULT_SETTINGS.projectsJson,

        // Events Data
        eventsJson: Array.isArray(row.events_json)
          ? (row.events_json as unknown as MinistryEventItem[]).map((ev) => ({
              ...ev,
              title: ev.title ? ev.title.replace(/\bOsebe\b/gi, "O.") : "",
              description: ev.description ? ev.description.replace(/\bOsebe\b/gi, "O.") : "",
              whatsappMessage: ev.whatsappMessage ? ev.whatsappMessage.replace(/\bOsebe\b/gi, "O.") : "",
              imageUrl: extractCleanImageUrl(ev.imageUrl),
              videoUrl: ev.videoUrl ? ev.videoUrl.trim() : undefined,
              videoSourceType: ev.videoSourceType || undefined,
              status: ev.status === "past" ? "past" : "upcoming",
              recapNotes: ev.recapNotes ? ev.recapNotes.trim() : undefined,
            }))
          : DEFAULT_SETTINGS.eventsJson,

        // Children's Home Gallery (Photos & Videos)
        orphanagePhotos: Array.isArray(row.orphanage_photos_json)
          ? (row.orphanage_photos_json as unknown as OrphanagePhotoItem[]).map((p) => ({
              ...p,
              imageUrl: extractCleanImageUrl(p.imageUrl),
            }))
          : DEFAULT_SETTINGS.orphanagePhotos,

        orphanageVideos: Array.isArray(row.orphanage_videos_json)
          ? (row.orphanage_videos_json as unknown as OrphanageVideoItem[])
          : DEFAULT_SETTINGS.orphanageVideos,

        // Top Bar & Live Broadcast Banner
        topbarLiveActive:
          row.topbar_live_active !== undefined && row.topbar_live_active !== null
            ? Boolean(row.topbar_live_active)
            : DEFAULT_SETTINGS.topbarLiveActive,
        topbarLiveLabel: row.topbar_live_label || DEFAULT_SETTINGS.topbarLiveLabel,
        topbarLiveUrl: row.topbar_live_url || DEFAULT_SETTINGS.topbarLiveUrl,
        topbarAnnouncement: row.topbar_announcement || DEFAULT_SETTINGS.topbarAnnouncement,

        // Communication & Social Channels
        mpesaPhone: row.mpesa_phone || DEFAULT_SETTINGS.mpesaPhone,
        contactEmail: cleanEmail,
        facebookUrl: row.facebook_url || DEFAULT_SETTINGS.facebookUrl,
        instagramUrl: row.instagram_url || DEFAULT_SETTINGS.instagramUrl,
        youtubeChannelUrl: row.youtube_channel_url || DEFAULT_SETTINGS.youtubeChannelUrl,


        // Remittance & Banking
        kcbAccountNumber: row.kcb_account_number || DEFAULT_SETTINGS.kcbAccountNumber,
        kcbAccountName: row.kcb_account_name || DEFAULT_SETTINGS.kcbAccountName,
        kcbBranch: row.kcb_branch || DEFAULT_SETTINGS.kcbBranch,
        kcbSwift: row.kcb_swift || DEFAULT_SETTINGS.kcbSwift,
        mpesaPaybill: row.mpesa_paybill || DEFAULT_SETTINGS.mpesaPaybill,
        mpesaTillNumber: row.mpesa_till_number || DEFAULT_SETTINGS.mpesaTillNumber,
        mpesaTillName: row.mpesa_till_name || DEFAULT_SETTINGS.mpesaTillName,
        mpesaTillQrImage: extractCleanImageUrl(row.mpesa_till_qr_image) || DEFAULT_SETTINGS.mpesaTillQrImage,
        mpesaPaybillQrImage: extractCleanImageUrl(row.mpesa_paybill_qr_image) || DEFAULT_SETTINGS.mpesaPaybillQrImage,
        westernUnionRecipient: cleanWesternUnion,
      };
    }
  } catch (err) {
    console.error("[Get Site Settings Error]:", err);
  }
  return DEFAULT_SETTINGS;
}

export async function saveSiteSettingsAction(
  settings: SiteSettingsData
): Promise<ActionResponse<void>> {
  try {
    const supabase = createAdminClient();

    const payload = {
      // Pastoral Profile
      pastor_name: settings.pastorName.trim(),
      pastor_title: settings.pastorTitle.trim(),
      pastor_image_url: extractCleanImageUrl(settings.pastorImageUrl),
      pastor_bio: settings.pastorBio.trim(),
      pastor_national_id: settings.pastorNationalId.trim(),

      // Church Identity & Location
      church_motto: settings.churchMotto.trim(),
      church_slogan: settings.churchSlogan.trim(),
      postal_address: settings.postalAddress.trim(),
      physical_location: settings.physicalLocation.trim(),

      // Hero Section
      hero_headline_1: settings.heroHeadline1.trim(),
      hero_headline_2: settings.heroHeadline2.trim(),
      hero_headline_3: settings.heroHeadline3.trim(),
      hero_subtitle: settings.heroSubtitle.trim(),
      hero_promise: settings.heroPromise.trim(),
      hero_image_url: extractCleanImageUrl(settings.heroImageUrl),
      hero_stat_branches: settings.heroStatBranches.trim(),
      hero_stat_lives: settings.heroStatLives.trim(),
      hero_stat_years: settings.heroStatYears.trim(),

      // Mission & Vision Statements
      mission_statement: settings.missionStatement.trim(),
      vision_statement: settings.visionStatement.trim(),

      // Twin Ongoing Projects
      construction_title: settings.constructionTitle.trim(),
      construction_subtitle: settings.constructionSubtitle.trim(),
      construction_narrative: settings.constructionNarrative.trim(),
      construction_image_url: extractCleanImageUrl(settings.constructionImageUrl),
      construction_badge: settings.constructionBadge.trim(),

      orphanage_title: settings.orphanageTitle.trim(),
      orphanage_subtitle: settings.orphanageSubtitle.trim(),
      orphanage_narrative: settings.orphanageNarrative.trim(),
      orphanage_image_url: extractCleanImageUrl(settings.orphanageImageUrl),
      orphanage_story_image: extractCleanImageUrl(settings.orphanageStoryImage),
      orphanage_badge: settings.orphanageBadge.trim(),

      // Grassroots Community Outreach
      community_title: settings.communityTitle.trim(),
      community_narrative: settings.communityNarrative.trim(),
      community_image_url: extractCleanImageUrl(settings.communityImageUrl),

      // 4 Ministry Pillars
      pillar_1_title: settings.pillar1Title.trim(),
      pillar_1_desc: settings.pillar1Desc.trim(),
      pillar_1_image: extractCleanImageUrl(settings.pillar1Image),
      pillar_1_video: (settings.pillar1Video || "").trim(),

      pillar_2_title: settings.pillar2Title.trim(),
      pillar_2_desc: settings.pillar2Desc.trim(),
      pillar_2_image: extractCleanImageUrl(settings.pillar2Image),
      pillar_2_video: (settings.pillar2Video || "").trim(),

      pillar_3_title: settings.pillar3Title.trim(),
      pillar_3_desc: settings.pillar3Desc.trim(),
      pillar_3_image: extractCleanImageUrl(settings.pillar3Image),
      pillar_3_video: (settings.pillar3Video || "").trim(),

      pillar_4_title: settings.pillar4Title.trim(),
      pillar_4_desc: settings.pillar4Desc.trim(),
      pillar_4_image: extractCleanImageUrl(settings.pillar4Image),
      pillar_4_video: (settings.pillar4Video || "").trim(),

      // 3 Pillar Impact Counters
      impact_stat_1_val: settings.impactStat1Val.trim(),
      impact_stat_1_lbl: settings.impactStat1Lbl.trim(),
      impact_stat_2_val: settings.impactStat2Val.trim(),
      impact_stat_2_lbl: settings.impactStat2Lbl.trim(),
      impact_stat_3_val: settings.impactStat3Val.trim(),
      impact_stat_3_lbl: settings.impactStat3Lbl.trim(),

      // Dynamic Projects
      projects_json: (settings.projectsJson || DEFAULT_SETTINGS.projectsJson).map((p) => ({
        ...p,
        imageUrl: extractCleanImageUrl(p.imageUrl),
        videoUrl: p.videoUrl ? p.videoUrl.trim() : undefined,
        active: p.active !== false,
      })) as unknown as Json,

      // Events Data
      events_json: (settings.eventsJson || []).map((ev) => ({
        ...ev,
        imageUrl: extractCleanImageUrl(ev.imageUrl),
        videoUrl: ev.videoUrl ? ev.videoUrl.trim() : undefined,
        videoSourceType: ev.videoSourceType || undefined,
        status: ev.status === "past" ? "past" : "upcoming",
        recapNotes: ev.recapNotes ? ev.recapNotes.trim() : undefined,
      })) as unknown as Json,

      // Children's Home Gallery (Photos & Videos)
      orphanage_photos_json: (settings.orphanagePhotos || []).map((p) => ({
        ...p,
        imageUrl: extractCleanImageUrl(p.imageUrl),
      })) as unknown as Json,
      orphanage_videos_json: (settings.orphanageVideos || []) as unknown as Json,


      // Top Bar & Live Broadcast Banner
      topbar_live_active: Boolean(settings.topbarLiveActive),
      topbar_live_label: (settings.topbarLiveLabel || "").trim(),
      topbar_live_url: (settings.topbarLiveUrl || "").trim(),
      topbar_announcement: (settings.topbarAnnouncement || "").trim(),

      // Communication & Social Channels
      mpesa_phone: settings.mpesaPhone.trim(),
      contact_email: settings.contactEmail.trim(),
      facebook_url: settings.facebookUrl.trim(),
      instagram_url: settings.instagramUrl.trim(),
      youtube_channel_url: settings.youtubeChannelUrl.trim(),


      // Remittance & Banking
      kcb_account_number: settings.kcbAccountNumber.trim(),
      kcb_account_name: settings.kcbAccountName.trim(),
      kcb_branch: settings.kcbBranch.trim(),
      kcb_swift: settings.kcbSwift.trim(),
      mpesa_paybill: settings.mpesaPaybill.trim(),
      mpesa_till_number: settings.mpesaTillNumber.trim(),
      mpesa_till_name: settings.mpesaTillName.trim(),
      mpesa_till_qr_image: extractCleanImageUrl(settings.mpesaTillQrImage || ""),
      mpesa_paybill_qr_image: extractCleanImageUrl(settings.mpesaPaybillQrImage || ""),
      western_union_recipient: settings.westernUnionRecipient.trim(),
      updated_at: new Date().toISOString(),
    };

    // Check if table exists and update/insert
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .limit(1);

    if (existing && existing.length > 0) {
      const { error } = await supabase
        .from("site_settings")
        .update(payload)
        .eq("id", existing[0].id);

      if (error) {
        return {
          success: false,
          error: `Supabase update error: ${error.message}. Please run the comprehensive CMS SQL migration in Supabase SQL Editor.`,
        };
      }
    } else {
      const { error } = await supabase.from("site_settings").insert(payload);

      if (error) {
        return {
          success: false,
          error: `Supabase insert error: ${error.message}. Please run the comprehensive CMS SQL migration in Supabase SQL Editor.`,
        };
      }
    }

    // Comprehensive Path Revalidations (including root layout for TopBar & Footer)
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/events");
    revalidatePath("/sermons");
    revalidatePath("/give");
    revalidatePath("/orphanage");
    revalidatePath("/orphanage/donate");
    revalidatePath("/contact");
    revalidatePath("/prayer-request");
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "Site content, photos, and church coordinates saved successfully!",
    };
  } catch (err: unknown) {
    console.error("[Save Site Settings Error]:", err);
    return {
      success: false,
      error: "Failed to save settings. Please ensure the latest SQL migration has been run in Supabase.",
    };
  }
}
