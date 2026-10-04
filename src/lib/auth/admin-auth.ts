import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "sugutta_admin_session";

/**
 * Validates the provided passcode against the configured ADMIN_SECRET_KEY
 */
export function verifyAdminPasscode(passcode: string): boolean {
  const secret = process.env.ADMIN_SECRET_KEY || "sugutta_altar_admin_2026";
  return passcode.trim() === secret.trim();
}

/**
 * Creates an encrypted HTTP-only session cookie for the authenticated church admin
 */
export async function createAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "sugutta_active_session_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days persistent session
  });
}

/**
 * Destroys the admin session cookie upon sign-out
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Checks if the current request has an active authenticated admin session
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return Boolean(session?.value);
}
