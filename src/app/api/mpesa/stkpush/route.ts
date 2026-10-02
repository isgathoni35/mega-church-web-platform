import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  formatPhoneNumber,
  isValidKenyanPhone,
  initiateStkPush,
} from "@/lib/mpesa/daraja";
import { createAdminClient } from "@/lib/supabase/admin";

const stkPushSchema = z.object({
  phone: z.string().min(9, "Valid Kenyan phone number is required"),
  amount: z.number().int().min(10, "Minimum giving amount is KES 10"),
  donorName: z.string().optional().default("Kingdom Partner"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = stkPushSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error.issues[0]?.message || "Invalid payload",
        },
        { status: 400 }
      );
    }

    const { phone, amount, donorName } = parseResult.data;

    if (!isValidKenyanPhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid Safaricom/Kenyan phone number. Use 07XXXXXXXX, 01XXXXXXXX, or 254XXXXXXXX.",
        },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhoneNumber(phone);

    // Call Daraja STK Push
    const stkResponse = await initiateStkPush({
      phone: formattedPhone,
      amount,
      donorName,
      accountReference: "HG SUGUTTA GIVING",
      transactionDesc: "Kingdom Tithe & Offering",
    });

    if (stkResponse.ResponseCode !== "0") {
      return NextResponse.json(
        {
          success: false,
          error:
            stkResponse.ResponseDescription ||
            "Safaricom was unable to initiate the STK push.",
        },
        { status: 502 }
      );
    }

    // Record pending transaction in Supabase donations table
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from("donations").insert({
      provider: "mpesa",
      amount,
      currency: "KES",
      phone_number: formattedPhone,
      checkout_request_id: stkResponse.CheckoutRequestID,
      merchant_request_id: stkResponse.MerchantRequestID,
      donor_name: donorName,
      status: "pending",
    });

    if (dbError) {
      console.error("Supabase donation insert warning:", dbError.message);
      // Non-fatal if Supabase connection fails temporarily in local dev, but still return checkoutRequestId
    }

    return NextResponse.json({
      success: true,
      checkoutRequestId: stkResponse.CheckoutRequestID,
      merchantRequestId: stkResponse.MerchantRequestID,
      customerMessage:
        stkResponse.CustomerMessage ||
        "STK prompt sent to your phone. Please enter your M-Pesa PIN.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("STK Push Route Error:", message);
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
