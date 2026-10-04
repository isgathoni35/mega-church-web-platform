# Feature Spec 24: Sendwave to KCB Bank International Payment Integration

## 1. Objective
Enable international donors and diaspora church partners to send tithes, offerings, seeds, and children's home donations directly into the church's **Kenya Commercial Bank (KCB)** bank account using **Sendwave** with zero transfer fees. Standardize all bank wire references across the platform to KCB Bank (`KCBLKENX`).

## 2. Scope & Technical Architecture
1. **Sendwave Direct-to-KCB Walkthrough**:
   - In Sendwave (available in USA, UK, Canada, and Europe), donors choose:
     - Country: **Kenya 🇰🇪**
     - Delivery Method: **Bank Transfer**
     - Bank: **Kenya Commercial Bank (KCB)**
     - Account Number: *[KCB Account Number]* (configured with placeholder `1234567890`)
     - Account Name: *Heavens Gates Sugutta Fellowship Church*
     - SWIFT Code: `KCBLKENX`
     - Branch: *Nairobi Central Branch*
2. **General Giving Portal (`src/components/giving/direct-giving-portal.tsx`)**:
   - In Tab 2 (International):
     - Update Step 2 to instruct users to choose **Bank Transfer -> Kenya Commercial Bank (KCB)**.
     - Update Step 3 to provide full KCB Bank Account credentials with 1-click **Copy** buttons for Account Number, Account Name, and SWIFT Code.
     - Provide a clean secondary option for donors who still prefer sending directly to the church's M-Pesa line (`+254 700 000 001`).
   - In Tab 1 (Kenyan Giving):
     - Replace any lingering Co-op Bank card under Tab 1 with the KCB Bank Wire details (KCB Account, Branch, SWIFT) so all church banking is 100% unified to KCB.
3. **Children's Home Donation Portal (`src/components/orphanage/orphanage-donate-view.tsx`)**:
   - In Tab 2 (International / Sendwave):
     - Guide donors through the Sendwave -> Bank Transfer -> KCB Bank Account workflow.
     - Provide 1-click copy buttons for KCB Account Number, Name (*Heavens Gates Children's Home*), and SWIFT Code.
4. **Sendwave QR Code (`src/components/giving/sendwave-qr.tsx`)**:
   - Update helper text and badge to explicitly highlight direct KCB Bank Account deposits and zero transfer fees.
5. **Global Footer (`src/components/layout/footer.tsx`)**:
   - Update Column 4 Digital Giving tile from "Direct Wire Co-op Bank" to "Direct Wire KCB Bank" (`KCBLKENX`).

## 3. Verification & Acceptance Criteria
- 0 TypeScript compilation errors (`npx tsc --noEmit`).
- Dev server running on port 3002.
- 1-click copy buttons copy correct KCB values to clipboard.
- Both `/give` and `/orphanage/donate` render clean Sendwave to KCB bank instructions.
- Footer displays KCB Bank.
