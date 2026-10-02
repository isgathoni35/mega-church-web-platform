# Feature Specification: 06 - Community Engagement Hub (Prayer Requests, Branches & Contact)

## 1. Goal
Implement the interactive community touchpoints: a confidential Prayer Request Altar (`/prayer-request`) that writes submissions to Supabase, a dynamic Church Branch Directory (`/branches`) querying regional campuses, and a "Plan a Visit / Contact Us" page (`/contact`) with service schedules and inquiry routing.

## 2. Design & Architecture Decisions
* **Theme & Styling:** Deep royal purple surfaces, crisp contrast cards, subtle gold focus rings for inputs, and Great Vibes script accent headers.
* **Database Integration:**
  * Read branch data directly from the Supabase `branches` table via Server Components.
  * Write prayer request submissions and contact inquiries directly to the Supabase `prayer_requests` table via Next.js Server Actions.
* **Component Boundaries:**
  * Server Components for initial data queries (SEO-optimized branch directory).
  * Client Components for interactive form state handling, form validation, and instant submission feedback.

## 3. Page Breakdown & Implementation Details

### A. Prayer Request Page (`app/prayer-request/page.tsx`)
* **Hero Banner:**
  * Script Accent: *"The Altar of Intercession"*
  * Headline: *"Submit Your Prayer Request"*
  * Scripture Anchor: *"The prayer of a righteous person is powerful and effective."* (James 5:16)
* **Interactive Prayer Form (`components/community/prayer-form.tsx`):**
  * Fields: Full Name, Email, Phone Number (optional), Category (Healing, Financial Deliverance, Family & Marriage, Spiritual Growth, General), and Prayer Request text area.
  * Confidentiality Toggle: Switch/Checkbox for *"Keep this request confidential to the Intercessory Pastoral Team only"* (defaults to checked).
  * Submit Action: Invokes Server Action in `app/actions/prayer.ts` to insert into Supabase `prayer_requests`.
  * Feedback State: Clear loading spinner, followed by a confirmed altar submission card with an encouraging pastoral blessing.

### B. Campus & Branch Directory (`app/branches/page.tsx`)
* **Hero Banner:**
  * Script Accent: *"Expanding Across Nations"*
  * Headline: *"Our Global Campuses & Ministries"*
  * Subtext: *"Find a family of believers and experience the anointing near you."*
* **Directory Grid & Filter (`components/community/branch-list.tsx`):**
  * Server Component query fetching from `branches` ordered by `is_hq DESC, name ASC`.
  * Quick search input to filter branches by city, country, or pastor name.
  * Interactive Campus Cards:
    * Campus Name and "Headquarters" gold badge if `is_hq === true`.
    * Resident Pastor title and name.
    * Physical location address and contact phone.
    * Weekly service times list (Sunday, Monday, Wednesday hours)[cite: 1].
    * Action button: **Get Directions** (opening Google Maps query link) and **Contact Campus**.

### C. Contact & Plan Your Visit (`app/contact/page.tsx`)
* **Layout:** Responsive 2-column layout (Desktop) / Stacked (Mobile).
* **Column 1: Plan Your Visit & Logistics:**
  * What to expect on your first visit (Warm greeting, dynamic explosive worship, spirit-led preaching)[cite: 1].
  * Children's church details (Ages, security check-in, dedicated curriculum)[cite: 1].
  * Main Sanctuary physical address and contact phone numbers.
* **Column 2: General Inquiries Form (`components/community/contact-form.tsx`):**
  * Inputs: Full Name, Email, Phone, Inquiry Type (First-time visitor, Pastoral counsel, Media/TV Broadcast, General inquiry), and Message.
  * Validates inputs, handles submission state, and logs the inquiry.

## 4. Verification Checklist
- [ ] `npm run build` compiles with zero TypeScript and ESLint errors.
- [ ] `/prayer-request` successfully writes new requests to Supabase with proper RLS enforcement.
- [ ] Confidentiality flag defaults to `true` and is recorded in Supabase.
- [ ] `/branches` dynamically renders seeded church locations from the database with functional search filtering.
- [ ] `/contact` renders all logistical information, children's church schedule, and the contact inquiry form[cite: 1].
- [ ] `context/06-progress-tracker.md` is updated with Phase 6 (Community Hub) marked as completed.