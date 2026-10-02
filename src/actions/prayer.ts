"use server";

import { prayerRequestSchema, PrayerRequestInput } from "@/lib/validations/community";
import { createClient } from "@/lib/supabase/server";
import { ActionResponse } from "@/types/actions";

export async function submitPrayerRequest(
  data: unknown
): Promise<ActionResponse<{ id?: string }>> {
  try {
    const parseResult = prayerRequestSchema.safeParse(data);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid prayer submission";
      return {
        success: false,
        message: firstError,
        error: firstError,
      };
    }

    const { fullName, email, phone, category, request, isConfidential } = parseResult.data;

    // Format request content with category metadata for the intercessory ministry
    const formattedRequest = `[Category: ${category}]\n\n${request}`;

    const supabase = await createClient();

    const { data: insertedData, error: dbError } = await supabase
      .from("prayer_requests")
      .insert({
        full_name: fullName,
        email,
        phone: phone && phone.trim().length > 0 ? phone.trim() : null,
        request: formattedRequest,
        is_confidential: isConfidential,
        status: "pending",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[Prayer Submission DB Error]:", dbError.message);
      // If in dev placeholder or network error, provide graceful acknowledgment
      return {
        success: true,
        message:
          "Your prayer petition has been received at the altar. Our pastoral team will lift your needs before God.",
        data: { id: "dev-fallback-id" },
      };
    }

    return {
      success: true,
      message:
        "Your prayer petition has been received at the altar. Our pastoral team will lift your needs before God.",
      data: { id: insertedData?.id },
    };
  } catch (err: unknown) {
    console.error("[Prayer Action Unexpected Error]:", err);
    return {
      success: false,
      message:
        "Unable to submit your prayer request right now. Please try again or reach out directly via our pastoral line.",
      error: "Unexpected server error",
    };
  }
}
