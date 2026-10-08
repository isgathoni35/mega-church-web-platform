"use server";

import { revalidatePath } from "next/cache";
import { prayerRequestSchema } from "@/lib/validations/community";
import { createAdminClient } from "@/lib/supabase/admin";
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
    const formattedRequest = `[Category: ${category}]\n\n${request.trim()}`;

    const supabase = createAdminClient();

    const { data: insertedData, error: dbError } = await supabase
      .from("prayer_requests")
      .insert({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone && phone.trim().length > 0 ? phone.trim() : null,
        request: formattedRequest,
        is_confidential: Boolean(isConfidential),
        status: "pending",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[Prayer Submission DB Error]:", dbError.message);
      return {
        success: false,
        message: `Database submission error: ${dbError.message}. Please try again or call our pastoral prayer line.`,
        error: dbError.message,
      };
    }

    // Immediately revalidate admin dashboard & prayers view
    revalidatePath("/admin");
    revalidatePath("/admin/prayers");

    return {
      success: true,
      message:
        "Your prayer petition has been received at the altar. Our pastoral team and intercessors will lift your needs before God.",
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
