"use server";

import { redirect } from "next/navigation";
import {
  verifyAdminPasscode,
  createAdminSession,
  destroyAdminSession,
} from "@/lib/auth/admin-auth";

export interface AdminAuthResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function loginAdminAction(passcode: string): Promise<AdminAuthResult> {
  try {
    if (!passcode || passcode.trim().length === 0) {
      return { success: false, error: "Please enter the admin access passcode." };
    }

    const isValid = verifyAdminPasscode(passcode);
    if (!isValid) {
      return { success: false, error: "Incorrect passcode. Please verify with pastoral leadership." };
    }

    await createAdminSession();
    return { success: true };
  } catch (err: unknown) {
    console.error("[Admin Auth Error]:", err);
    return { success: false, error: "Server error during authentication." };
  }
}

export async function logoutAdminAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}
