import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface CallbackMetadataItem {
  Name: string;
  Value?: string | number;
}

interface StkCallbackBody {
  Body?: {
    stkCallback?: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: CallbackMetadataItem[];
      };
    };
  };
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = (await req.json()) as StkCallbackBody;
    const stkCallback = rawBody?.Body?.stkCallback;

    if (!stkCallback) {
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Invalid callback payload" },
        { status: 400 }
      );
    }

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } =
      stkCallback;

    const supabase = createAdminClient();

    if (ResultCode === 0 && CallbackMetadata) {
      // Success transaction
      const items = CallbackMetadata.Item || [];
      const receiptItem = items.find((i) => i.Name === "MpesaReceiptNumber");
      const receiptNumber = (receiptItem?.Value as string) || "MPESA-CONFIRMED";

      await supabase
        .from("donations")
        .update({
          status: "completed",
          mpesa_receipt_number: receiptNumber,
        })
        .eq("checkout_request_id", CheckoutRequestID);

      console.log(
        `[M-Pesa Webhook] Transaction ${CheckoutRequestID} completed successfully. Receipt: ${receiptNumber}`
      );
    } else {
      // Failed or cancelled transaction
      await supabase
        .from("donations")
        .update({
          status: "failed",
        })
        .eq("checkout_request_id", CheckoutRequestID);

      console.warn(
        `[M-Pesa Webhook] Transaction ${CheckoutRequestID} failed/cancelled: ${ResultDesc} (Code: ${ResultCode})`
      );
    }

    // Always acknowledge receipt to Safaricom
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error: unknown) {
    console.error("M-Pesa Callback Error:", error);
    // Return 200 with Safaricom acknowledgement format to prevent Safaricom retry flood
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted with warnings" });
  }
}
