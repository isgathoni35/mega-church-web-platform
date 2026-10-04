"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { ActionResponse } from "@/types/actions";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

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

        // Communication & Social Channels
        mpesaPhone: row.mpesa_phone || DEFAULT_SETTINGS.mpesaPhone,
        contactEmail: row.contact_email || DEFAULT_SETTINGS.contactEmail,
        facebookUrl: row.facebook_url || DEFAULT_SETTINGS.facebookUrl,
        instagramUrl: row.instagram_url || DEFAULT_SETTINGS.instagramUrl,

        // Remittance & Banking
        kcbAccountNumber: row.kcb_account_number || DEFAULT_SETTINGS.kcbAccountNumber,
        kcbAccountName: row.kcb_account_name || DEFAULT_SETTINGS.kcbAccountName,
        kcbBranch: row.kcb_branch || DEFAULT_SETTINGS.kcbBranch,
        kcbSwift: row.kcb_swift || DEFAULT_SETTINGS.kcbSwift,
        mpesaPaybill: row.mpesa_paybill || DEFAULT_SETTINGS.mpesaPaybill,
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

      // Communication & Social Channels
      mpesa_phone: settings.mpesaPhone.trim(),
      contact_email: settings.contactEmail.trim(),
      facebook_url: settings.facebookUrl.trim(),
      instagram_url: settings.instagramUrl.trim(),

      // Remittance & Banking
      kcb_account_number: settings.kcbAccountNumber.trim(),
      kcb_account_name: settings.kcbAccountName.trim(),
      kcb_branch: settings.kcbBranch.trim(),
      kcb_swift: settings.kcbSwift.trim(),
      mpesa_paybill: settings.mpesaPaybill.trim(),
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
          error: `Supabase update error: ${error.message}. Please ensure the site_settings migration has been executed.`,
        };
      }
    } else {
      const { error } = await supabase.from("site_settings").insert(payload);

      if (error) {
        return {
          success: false,
          error: `Supabase insert error: ${error.message}. Please execute the provided SQL migration.`,
        };
      }
    }

    // Comprehensive Path Revalidations
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/events");
    revalidatePath("/sermons");
    revalidatePath("/give");
    revalidatePath("/orphanage/donate");
    revalidatePath("/contact");
    revalidatePath("/prayer-request");
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "Pastor profile, church coordinates, and remittance settings saved successfully!",
    };
  } catch (err: unknown) {
    console.error("[Save Site Settings Error]:", err);
    return {
      success: false,
      error: "Failed to save settings. Please ensure the latest SQL migration has been run.",
    };
  }
}
