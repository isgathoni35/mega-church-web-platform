import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const checkoutRequestId = searchParams.get("checkoutRequestId");

    if (!checkoutRequestId) {
      return NextResponse.json(
        { error: "checkoutRequestId parameter is required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("donations")
      .select("id, status, mpesa_receipt_number, amount, created_at")
      .eq("checkout_request_id", checkoutRequestId)
      .maybeSingle();

    if (error) {
      console.error("Status check DB error:", error.message);
      return NextResponse.json(
        { error: "Failed to query donation status" },
        { status: 500 }
      );
    }

    if (!data) {
      // In development mock mode without Supabase connection:
      if (process.env.NODE_ENV === "development" && checkoutRequestId.startsWith("ws_CO_")) {
        return NextResponse.json({
          status: "completed",
          receipt: `MP${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        });
      }

      return NextResponse.json(
        { error: "Donation record not found" },
        { status: 404 }
      );
    }

    // Auto-complete simulated/sandbox donations in development after 4 seconds if pending
    const consumerKey = process.env.MPESA_CONSUMER_KEY || "";
    const isMock =
      !consumerKey ||
      consumerKey.includes("placeholder") ||
      consumerKey.startsWith("sandbox_consumer");

    if (data.status === "pending" && isMock) {
      const createdAt = new Date(data.created_at).getTime();
      const elapsedSeconds = (Date.now() - createdAt) / 1000;

      if (elapsedSeconds > 4) {
        const mockReceipt = `SK${Math.floor(10000000 + Math.random() * 90000000)}G`;
        await supabase
          .from("donations")
          .update({
            status: "completed",
            mpesa_receipt_number: mockReceipt,
          })
          .eq("checkout_request_id", checkoutRequestId);

        return NextResponse.json({
          status: "completed",
          receipt: mockReceipt,
          amount: data.amount,
        });
      }
    }

    return NextResponse.json({
      status: data.status,
      receipt: data.mpesa_receipt_number,
      amount: data.amount,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
