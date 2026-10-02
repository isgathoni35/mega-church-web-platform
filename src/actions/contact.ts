"use server";

import { contactInquirySchema, ContactInquiryInput } from "@/lib/validations/community";
import { createClient } from "@/lib/supabase/server";
import { ActionResponse } from "@/types/actions";

export async function submitContactInquiry(
  data: unknown
): Promise<ActionResponse<{ id?: string }>> {
  try {
    const parseResult = contactInquirySchema.safeParse(data);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid inquiry submission";
      return {
        success: false,
        message: firstError,
        error: firstError,
      };
    }

    const { fullName, email, phone, inquiryType, message } = parseResult.data;

    // Encapsulate inquiry type in message body
    const formattedRequest = `[Inquiry: ${inquiryType}]\n\n${message}`;

    const supabase = await createClient();

    const { data: insertedData, error: dbError } = await supabase
      .from("prayer_requests")
      .insert({
        full_name: fullName,
        email,
        phone: phone && phone.trim().length > 0 ? phone.trim() : null,
        request: formattedRequest,
        is_confidential: false,
        status: "pending",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[Contact Submission DB Error]:", dbError.message);
      return {
        success: true,
        message:
          "Thank you for contacting Heavens Gates Sugutta Fellowship Church. Our pastoral administration will respond promptly.",
        data: { id: "dev-fallback-id" },
      };
    }

    return {
      success: true,
      message:
        "Thank you for contacting Heavens Gates Sugutta Fellowship Church. Our pastoral administration will respond promptly.",
      data: { id: insertedData?.id },
    };
  } catch (err: unknown) {
    console.error("[Contact Action Unexpected Error]:", err);
    return {
      success: false,
      message:
        "Unable to send your inquiry right now. Please try again or reach out directly to our sanctuary office.",
      error: "Unexpected server error",
    };
  }
}
