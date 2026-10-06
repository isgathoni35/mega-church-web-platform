"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { ActionResponse } from "@/types/actions";
import { SiteSettingsData, DEFAULT_SETTINGS, MinistryEventItem } from "@/types/settings";
import { Json } from "@/types/database.types";


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

export async function getSiteSettingsAction(): Promise<SiteSettingsData> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1);

    if (!error && data && data.length > 0) {
      const row = data[0];
      return {
        // Pastoral Profile
        pastorName: row.pastor_name || DEFAULT_SETTINGS.pastorName,
        pastorTitle: row.pastor_title || DEFAULT_SETTINGS.pastorTitle,
        pastorImageUrl: row.pastor_image_url || DEFAULT_SETTINGS.pastorImageUrl,
        pastorBio: row.pastor_bio || DEFAULT_SETTINGS.pastorBio,
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
        heroImageUrl: row.hero_image_url || row.pastor_image_url || DEFAULT_SETTINGS.heroImageUrl,
        heroStatBranches: row.hero_stat_branches || DEFAULT_SETTINGS.heroStatBranches,
        heroStatLives: row.hero_stat_lives || DEFAULT_SETTINGS.heroStatLives,
        heroStatYears: row.hero_stat_years || DEFAULT_SETTINGS.heroStatYears,

        // Mission & Vision Statements
        missionStatement: row.mission_statement || DEFAULT_SETTINGS.missionStatement,
        visionStatement: row.vision_statement || DEFAULT_SETTINGS.visionStatement,

        // Twin Ongoing Projects
        constructionTitle: row.construction_title || DEFAULT_SETTINGS.constructionTitle,
        constructionSubtitle: row.construction_subtitle || DEFAULT_SETTINGS.constructionSubtitle,
        constructionNarrative: row.construction_narrative || DEFAULT_SETTINGS.constructionNarrative,
        constructionImageUrl: row.construction_image_url || DEFAULT_SETTINGS.constructionImageUrl,
        constructionBadge: row.construction_badge || DEFAULT_SETTINGS.constructionBadge,

        orphanageTitle: row.orphanage_title || DEFAULT_SETTINGS.orphanageTitle,
        orphanageSubtitle: row.orphanage_subtitle || DEFAULT_SETTINGS.orphanageSubtitle,
        orphanageNarrative: row.orphanage_narrative || DEFAULT_SETTINGS.orphanageNarrative,
        orphanageImageUrl: row.orphanage_image_url || DEFAULT_SETTINGS.orphanageImageUrl,
        orphanageBadge: row.orphanage_badge || DEFAULT_SETTINGS.orphanageBadge,

        // Grassroots Community Outreach
        communityTitle: row.community_title || DEFAULT_SETTINGS.communityTitle,
        communityNarrative: row.community_narrative || DEFAULT_SETTINGS.communityNarrative,
        communityImageUrl: row.community_image_url || DEFAULT_SETTINGS.communityImageUrl,

        // 4 Ministry Pillars
        pillar1Title: row.pillar_1_title || DEFAULT_SETTINGS.pillar1Title,
        pillar1Desc: row.pillar_1_desc || DEFAULT_SETTINGS.pillar1Desc,
        pillar1Image: row.pillar_1_image || DEFAULT_SETTINGS.pillar1Image,

        pillar2Title: row.pillar_2_title || DEFAULT_SETTINGS.pillar2Title,
        pillar2Desc: row.pillar_2_desc || DEFAULT_SETTINGS.pillar2Desc,
        pillar2Image: row.pillar_2_image || DEFAULT_SETTINGS.pillar2Image,

        pillar3Title: row.pillar_3_title || DEFAULT_SETTINGS.pillar3Title,
        pillar3Desc: row.pillar_3_desc || DEFAULT_SETTINGS.pillar3Desc,
        pillar3Image: row.pillar_3_image || DEFAULT_SETTINGS.pillar3Image,

        pillar4Title: row.pillar_4_title || DEFAULT_SETTINGS.pillar4Title,
        pillar4Desc: row.pillar_4_desc || DEFAULT_SETTINGS.pillar4Desc,
        pillar4Image: row.pillar_4_image || DEFAULT_SETTINGS.pillar4Image,

        // 3 Pillar Impact Counters
        impactStat1Val: row.impact_stat_1_val || DEFAULT_SETTINGS.impactStat1Val,
        impactStat1Lbl: row.impact_stat_1_lbl || DEFAULT_SETTINGS.impactStat1Lbl,
        impactStat2Val: row.impact_stat_2_val || DEFAULT_SETTINGS.impactStat2Val,
        impactStat2Lbl: row.impact_stat_2_lbl || DEFAULT_SETTINGS.impactStat2Lbl,
        impactStat3Val: row.impact_stat_3_val || DEFAULT_SETTINGS.impactStat3Val,
        impactStat3Lbl: row.impact_stat_3_lbl || DEFAULT_SETTINGS.impactStat3Lbl,

        // Events Data
        eventsJson: Array.isArray(row.events_json)
          ? (row.events_json as unknown as MinistryEventItem[])
          : DEFAULT_SETTINGS.eventsJson,

        // Communication & Social Channels
        mpesaPhone: row.mpesa_phone || DEFAULT_SETTINGS.mpesaPhone,
        contactEmail: row.contact_email || DEFAULT_SETTINGS.contactEmail,
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
        westernUnionRecipient: row.western_union_recipient || DEFAULT_SETTINGS.westernUnionRecipient,
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
      pastor_image_url: settings.pastorImageUrl.trim(),
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
      hero_image_url: settings.heroImageUrl.trim(),
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
      construction_image_url: settings.constructionImageUrl.trim(),
      construction_badge: settings.constructionBadge.trim(),

      orphanage_title: settings.orphanageTitle.trim(),
      orphanage_subtitle: settings.orphanageSubtitle.trim(),
      orphanage_narrative: settings.orphanageNarrative.trim(),
      orphanage_image_url: settings.orphanageImageUrl.trim(),
      orphanage_badge: settings.orphanageBadge.trim(),

      // Grassroots Community Outreach
      community_title: settings.communityTitle.trim(),
      community_narrative: settings.communityNarrative.trim(),
      community_image_url: settings.communityImageUrl.trim(),

      // 4 Ministry Pillars
      pillar_1_title: settings.pillar1Title.trim(),
      pillar_1_desc: settings.pillar1Desc.trim(),
      pillar_1_image: settings.pillar1Image.trim(),

      pillar_2_title: settings.pillar2Title.trim(),
      pillar_2_desc: settings.pillar2Desc.trim(),
      pillar_2_image: settings.pillar2Image.trim(),

      pillar_3_title: settings.pillar3Title.trim(),
      pillar_3_desc: settings.pillar3Desc.trim(),
      pillar_3_image: settings.pillar3Image.trim(),

      pillar_4_title: settings.pillar4Title.trim(),
      pillar_4_desc: settings.pillar4Desc.trim(),
      pillar_4_image: settings.pillar4Image.trim(),

      // 3 Pillar Impact Counters
      impact_stat_1_val: settings.impactStat1Val.trim(),
      impact_stat_1_lbl: settings.impactStat1Lbl.trim(),
      impact_stat_2_val: settings.impactStat2Val.trim(),
      impact_stat_2_lbl: settings.impactStat2Lbl.trim(),
      impact_stat_3_val: settings.impactStat3Val.trim(),
      impact_stat_3_lbl: settings.impactStat3Lbl.trim(),

      // Events Data
      events_json: settings.eventsJson as unknown as Json,


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

    // Comprehensive Path Revalidations
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
