import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No video file provided." },
        { status: 400 }
      );
    }

    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "Video file exceeds 50MB. Please compress the file or link a YouTube URL instead.",
        },
        { status: 413 }
      );
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase() || "mp4";
    const allowedExts = ["mp4", "webm", "mov", "m4v", "ogg", "mkv"];
    if (!allowedExts.includes(fileExt) && !file.type.startsWith("video/")) {
      return NextResponse.json(
        { success: false, error: "Please upload a valid video file (MP4, WebM, or MOV)." },
        { status: 400 }
      );
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
      console.error("[Route Handler Video Upload Error]:", uploadError);
      return NextResponse.json(
        { success: false, error: `Storage upload failed: ${uploadError.message}.` },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from("church-media")
      .getPublicUrl(cleanFileName);

    return NextResponse.json({
      success: true,
      message: "Video file uploaded successfully!",
      data: { url: urlData.publicUrl },
    });
  } catch (err: unknown) {
    console.error("[API Video Upload Exception]:", err);
    return NextResponse.json(
      { success: false, error: "Unexpected error during video upload." },
      { status: 500 }
    );
  }
}
