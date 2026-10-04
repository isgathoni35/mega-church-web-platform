# Feature Spec 26: Church Administrative Management Portal

## 1. Objective
Build a dedicated, secure, and private Church Admin Portal (`/admin`) for Heavens Gates Sugutta Fellowship Church International. Church leaders, pastors, and media administrators can manage sermons, YouTube broadcasts, prayer petitions, incoming sanctuary visitors, and church bank/contact settings without touching code.

The public website remains 100% clean and free of login clutter.

## 2. Architecture & Security
1. **Protected Route Hierarchy**:
   - `/admin/login`: Publicly accessible login page with church visual theme (Deep Royal Navy `#0A2240` + Radiant Gold `#C59B27`).
   - `/admin`: Overview dashboard with executive KPIs.
   - `/admin/sermons`: Add YouTube videos & Shorts, toggle Sunday "Live Now" status, edit/delete sermons.
   - `/admin/prayers`: Pastoral altar inbox, category tags, 1-click WhatsApp messaging, status tracking.
   - `/admin/visitors`: Plan a Visit hospitality tracking.
   - `/admin/settings`: Church KCB Bank credentials, M-Pesa Paybill, and contact information.
2. **Authentication & Session Management**:
   - Secure server-side HTTP-only session cookie (`sugutta_admin_session`).
   - Environment variable: `ADMIN_SECRET_KEY` (configured in `.env.local`).
   - Session verification utility in `src/lib/auth/admin-auth.ts`.
   - Next.js route protection middleware ensuring unauthenticated requests to `/admin/*` redirect to `/admin/login`.
3. **Database Schema Enhancements (`supabase/migrations/20261004_admin_portal.sql`)**:
   - `public.site_settings` table to persist dynamic church bank details, contact phone, and master live status.
   - Update `category` check constraint on `public.sermons` to allow outdoor praise and street ministry categories.

## 3. UI/UX Specifications
- **Design System:** Deep Royal Navy (`#0A2240`), Divine Radiant Gold (`#C59B27`), Crisp White, Dark Slate (`#0f172a`), Sunset Orange (`#ff6b35`).
- **Sidebar & Mobile Navigation:** Responsive slide-over drawer on mobile, persistent sidebar on desktop.
- **Top Utility Bar:** Quick links to "View Live Website", Administrator status, and "Sign Out" button.
- **Form Interactivity:** Real-time YouTube link preview, 1-click clipboard actions, and toast feedback.

## 4. Verification & Acceptance Criteria
- 0 TypeScript compilation errors (`npx tsc --noEmit`).
- Dev server running on port 3002.
- Direct navigation to `/admin` without session redirects to `/admin/login`.
- Successful login grants access to the dashboard and preserves session across navigation.
- Adding a sermon or toggling live status in `/admin/sermons` reflects immediately on the public website.
