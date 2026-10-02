/**
 * Safaricom Daraja M-Pesa Helpers & Utilities
 * Heavens Gates Sugutta Fellowship Church International
 */

export interface DarajaTokenResponse {
  access_token: string;
  expires_in: string;
}

export interface StkPushParams {
  phone: string;
  amount: number;
  donorName?: string;
  accountReference?: string;
  transactionDesc?: string;
}

export interface StkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

// In-memory token cache
let cachedToken: string | null = null;
let tokenExpiryTime: number = 0;

/**
 * Sanitizes any Kenyan phone number format into Daraja standard (2547XXXXXXXX or 2541XXXXXXXX)
 */
export function formatPhoneNumber(phone: string): string {
  // Strip all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("254") && cleaned.length === 12) {
    return cleaned;
  }
  if (cleaned.startsWith("0") && cleaned.length === 10) {
    return `254${cleaned.slice(1)}`;
  }
  if ((cleaned.startsWith("7") || cleaned.startsWith("1")) && cleaned.length === 9) {
    return `254${cleaned}`;
  }

  // Fallback return cleaned
  return cleaned;
}

/**
 * Validates whether a phone number matches Safaricom/Kenyan mobile format
 */
export function isValidKenyanPhone(phone: string): boolean {
  const formatted = formatPhoneNumber(phone);
  // Safaricom & Kenyan numbers: 254 7XX XXX XXX or 254 1XX XXX XXX (12 digits)
  return /^254[17]\d{8}$/.test(formatted);
}

/**
 * Formats current UTC timestamp to YYYYMMDDHHmmss required by Safaricom Daraja
 */
export function getTimestamp(): string {
  const date = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

/**
 * Generates base64-encoded Daraja password using BusinessShortCode + Passkey + Timestamp
 */
export function generateDarajaPassword(
  shortcode: string,
  passkey: string,
  timestamp: string
): string {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
}

/**
 * Returns the Daraja base URL depending on environment
 */
export function getDarajaBaseUrl(): string {
  const env = process.env.MPESA_ENVIRONMENT?.toLowerCase();
  return env === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

/**
 * Fetches an OAuth bearer token from Safaricom Daraja with in-memory caching
 */
export async function getDarajaToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && tokenExpiryTime > now + 60000) {
    return cachedToken;
  }

  const consumerKey = process.env.MPESA_CONSUMER_KEY || "";
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET || "";

  // Check for placeholder credentials in development mode
  const isPlaceholder =
    !consumerKey ||
    !consumerSecret ||
    consumerKey.includes("placeholder") ||
    consumerSecret.includes("placeholder");

  if (isPlaceholder) {
    // In mock/sandbox development mode, return a mock token
    cachedToken = "mock_sandbox_daraja_access_token";
    tokenExpiryTime = now + 3500 * 1000;
    return cachedToken;
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const url = `${getDarajaBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Daraja OAuth failed [${response.status}]: ${errorText}`);
  }

  const data = (await response.json()) as DarajaTokenResponse;
  cachedToken = data.access_token;
  const expiresInSec = parseInt(data.expires_in, 10) || 3599;
  tokenExpiryTime = now + expiresInSec * 1000;

  return cachedToken;
}

/**
 * Initiates an M-Pesa STK Push (Lipa na M-Pesa Online)
 */
export async function initiateStkPush(params: StkPushParams): Promise<StkPushResponse> {
  const shortcode = process.env.MPESA_SHORTCODE || "174379";
  const passkey =
    process.env.MPESA_PASSKEY ||
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const callbackUrl =
    process.env.MPESA_CALLBACK_URL || "https://example.com/api/mpesa/callback";

  const consumerKey = process.env.MPESA_CONSUMER_KEY || "";
  const isMockMode =
    !consumerKey ||
    consumerKey.includes("placeholder") ||
    process.env.NODE_ENV === "development" && consumerKey.startsWith("sandbox_consumer");

  const formattedPhone = formatPhoneNumber(params.phone);
  const timestamp = getTimestamp();
  const password = generateDarajaPassword(shortcode, passkey, timestamp);

  if (isMockMode) {
    // Return simulated success response so UI and flow can be developed and tested immediately
    return {
      MerchantRequestID: `MOCK_MR_${Date.now()}`,
      CheckoutRequestID: `ws_CO_${Date.now()}_${Math.floor(10000 + Math.random() * 90000)}`,
      ResponseCode: "0",
      ResponseDescription: "Success. Request accepted for processing",
      CustomerMessage: "Success. Request accepted for processing",
    };
  }

  const token = await getDarajaToken();
  const url = `${getDarajaBaseUrl()}/mpesa/stkpush/v1/processrequest`;

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.round(params.amount),
    PartyA: formattedPhone,
    PartyB: shortcode,
    PhoneNumber: formattedPhone,
    CallBackURL: callbackUrl,
    AccountReference: params.accountReference || "Tithes & Offerings",
    TransactionDesc: params.transactionDesc || "Kingdom Seed Giving",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.errorMessage ||
        `STK Push request failed with HTTP ${res.status}`
    );
  }

  return (await res.json()) as StkPushResponse;
}
