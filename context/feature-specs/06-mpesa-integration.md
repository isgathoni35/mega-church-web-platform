# Feature Specification: 06 - Safaricom M-Pesa STK Push & Multi-Channel Giving Hub

## 1. Goal
Build the complete Giving Portal at `/give`, featuring an interactive Safaricom Daraja Lipa na M-Pesa Online (STK Push) checkout flow, real-time transaction status polling, automated Supabase donation logging, and digital giving cards for international partners (Cash App, PayPal, Venmo, Givelify)[cite: 1].

## 2. Daraja Credentials & Environment Variable Protocol
* **Strict Rule:** The AI agent must NOT guess or hardcode Daraja API credentials.
* Check `.env.local` for the following keys. If absent, prompt the user or load sandbox defaults safely:
  * `MPESA_CONSUMER_KEY`
  * `MPESA_CONSUMER_SECRET`
  * `MPESA_PASSKEY`
  * `MPESA_SHORTCODE` (e.g., Business Short Code / Paybill, default sandbox `174379`)
  * `MPESA_INITIATOR_NAME` (Optional/if required by environment)
  * `MPESA_CALLBACK_URL` (`https:///api/mpesa/callback` or ngrok URL for local dev)
  * `MPESA_ENVIRONMENT` (`sandbox` or `production`)

## 3. Backend Architecture & API Routes

### A. Phone Sanitizer & Daraja Helpers (`lib/mpesa/daraja.ts`)
* `formatPhoneNumber(phone: string): string`: Converts local inputs (`07XXXXXXXX`, `01XXXXXXXX`, `+254...`) strictly into Daraja format `2547XXXXXXXX`.
* `getDarajaToken()`: Queries Safaricom OAuth endpoint (`/oauth/v1/generate?grant_type=client_credentials`) using base64-encoded Consumer Key & Secret. Handles in-memory token caching if valid.
* `generateDarajaPassword(shortcode: string, passkey: string, timestamp: string): string`: Computes `base64(shortcode + passkey + timestamp)`.
* `getTimestamp()`: Generates `YYYYMMDDHHmmss` formatted string.

### B. STK Push Route (`app/api/mpesa/stkpush/route.ts`)
* `POST` handler receiving `{ phone, amount, donorName }`.
* Validates amount (minimum KES 10, integer).
* Calls Safaricom `mpesa/stkpush/v1/processrequest`.
* If successful:
  * Inserts a pending record into Supabase `donations`:
    * `provider`: `'mpesa'`
    * `amount`: `amount`
    * `currency`: `'KES'`
    * `phone_number`: formatted phone
    * `checkout_request_id`: `CheckoutRequestID`
    * `merchant_request_id`: `MerchantRequestID`
    * `donor_name`: `donorName`
    * `status`: `'pending'`
  * Returns `{ success: true, checkoutRequestId: CheckoutRequestID }`.
* If error: returns structured JSON error message with HTTP 400/500.

### C. Webhook Callback Route (`app/api/mpesa/callback/route.ts`)
* `POST` handler accepting incoming Safaricom JSON callback.
* Parses `Body.stkCallback`:
  * Extracts `CheckoutRequestID`, `ResultCode`, `ResultDesc`.
  * If `ResultCode === 0` (Success):
    * Extracts metadata: `Amount`, `MpesaReceiptNumber`, `TransactionDate`, `PhoneNumber`.
    * Updates Supabase `donations` where `checkout_request_id === CheckoutRequestID`:
      * `status = 'completed'`
      * `mpesa_receipt_number = MpesaReceiptNumber`
  * If `ResultCode !== 0` (Cancelled / Insufficient funds / Timeout):
    * Updates Supabase `donations`:
      * `status = 'failed'`
* Returns `{ ResultCode: 0, ResultDesc: "Accepted" }` immediately to Safaricom.

### D. Transaction Status Polling Route (`app/api/mpesa/status/route.ts`)
* `GET` handler receiving query param `?checkoutRequestId=...`.
* Queries Supabase `donations` for the matching `checkout_request_id`.
* Returns `{ status: 'pending' | 'completed' | 'failed', receipt: mpesa_receipt_number }`.

## 4. Frontend Components & UI Structure

### A. Dedicated Giving Page (`app/give/page.tsx`)
* Hero Section:
  * Script typography badge: *"Sow into the Kingdom"*
  * Headline: *"Get Ready for the Overflow! Partner With Us"*[cite: 1]
  * Biblical Anchor: Habakkuk 1:5 scripture reference card[cite: 1].
* Two-Column / Split Layout:
  * **Column 1:** Interactive Lipa na M-Pesa Online Form.
  * **Column 2:** International & Digital Giving Hub (Cash App, PayPal, Venmo, Givelify)[cite: 1].

### B. M-Pesa Interactive Giving Component (`components/giving/mpesa-form.tsx`)
* Clean form controls:
  * Amount preset chips (`KES 500`, `KES 1,000`, `KES 2,500`, `KES 5,000`, `Custom`).
  * Full Name (optional).
  * Safaricom Phone Number with live `+254` formatting.
* Action Button (Metallic Gold): **"Send STK Push to Phone"**.
* Dynamic States:
  * `idle`: Standard form.
  * `loading`: Initiating STK push.
  * `awaiting_pin`: Countdown timer with instruction: *"Check your phone and enter your M-Pesa PIN"*.
  * `success`: Green badge with M-Pesa Receipt confirmation and scripture of blessing.
  * `failed`: Clear error display with option to retry or use manual Paybill.
* Manual Paybill Fallback Box: Shows Business No., Account No., and step-by-step instructions.

### C. International & Multi-Platform Cards (`components/giving/international-giving.tsx`)
* **Cash App:** `$HGSugutta` with copy-to-clipboard button.
* **PayPal:** `@hgsugutta` with direct redirect link (`paypal.me/hgsugutta`).
* **Venmo:** `@hgsugutta` badge.
* **Givelify:** Search handle *"Heavens Gates Sugutta Fellowship Church"*.
* Stylized cards using royal purple surfaces, crisp contrast, and subtle QR code preview containers.

## 5. Verification Checklist
- [ ] `npm run build` compiles with zero TypeScript or ESLint errors.
- [ ] `lib/mpesa/daraja.ts` correctly computes timestamps, passwords, and phone formats.
- [ ] `/api/mpesa/stkpush` endpoint returns a valid CheckoutRequestID or handles sandbox credentials cleanly.
- [ ] `/api/mpesa/status` accurately reads transaction updates from Supabase.
- [ ] `/give` page renders both M-Pesa and international digital payment options responsively.
- [ ] `context/06-progress-tracker.md` is updated with Phase 6 marked as completed.