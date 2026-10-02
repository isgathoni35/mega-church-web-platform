# Feature Specification: 04 - Supabase Schema & Backend Foundation

## 1. Goal
Set up the complete Supabase database layer, SQL schema migrations, typed models, and client/server helper instances for sermons, ministry branches, prayer requests, and donation tracking.

## 2. Environment Variables & Security Protocol
* **Strict Rule:** The AI agent must NOT invent, guess, or hardcode Supabase credentials.
* If `.env.local` does not already contain valid values, the agent must check for `.env.example`, prompt the user for the actual keys, and safely write:
  * `NEXT_PUBLIC_SUPABASE_URL`
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  * `SUPABASE_SERVICE_ROLE_KEY` (Server-side operations only)

## 3. Database Schema Definitions (SQL)
The agent must generate a migration file `supabase/schema.sql` containing the following tables with Row Level Security (RLS) enabled:

### A. Table: `sermons`
* `id`: UUID (Primary Key, default `gen_random_uuid()`)
* `title`: TEXT NOT NULL
* `slug`: TEXT UNIQUE NOT NULL
* `speaker`: TEXT NOT NULL (Default: 'Pastor Jeannette Taylor')
* `youtube_url`: TEXT NOT NULL
* `thumbnail_url`: TEXT
* `category`: TEXT NOT NULL CHECK (category IN ('Sunday Worship', 'Monday Inspiration', 'Wednesday Bible Study', 'Crusade & Deliverance'))
* `is_featured`: BOOLEAN DEFAULT false
* `is_live`: BOOLEAN DEFAULT false
* `date_preached`: DATE NOT NULL DEFAULT CURRENT_DATE
* `created_at`: TIMESTAMPTZ DEFAULT NOW()

### B. Table: `branches`
* `id`: UUID (Primary Key, default `gen_random_uuid()`)
* `name`: TEXT NOT NULL
* `slug`: TEXT UNIQUE NOT NULL
* `resident_pastor`: TEXT NOT NULL
* `city`: TEXT NOT NULL
* `country`: TEXT NOT NULL DEFAULT 'Kenya'
* `address`: TEXT NOT NULL
* `phone`: TEXT NOT NULL
* `email`: TEXT
* `service_times`: JSONB NOT NULL DEFAULT '[]'::jsonb
* `is_hq`: BOOLEAN DEFAULT false
* `created_at`: TIMESTAMPTZ DEFAULT NOW()

### C. Table: `prayer_requests`
* `id`: UUID (Primary Key, default `gen_random_uuid()`)
* `full_name`: TEXT NOT NULL
* `email`: TEXT NOT NULL
* `phone`: TEXT
* `request`: TEXT NOT NULL
* `is_confidential`: BOOLEAN DEFAULT true
* `status`: TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'prayed_for', 'archived'))
* `created_at`: TIMESTAMPTZ DEFAULT NOW()

### D. Table: `donations`
* `id`: UUID (Primary Key, default `gen_random_uuid()`)
* `provider`: TEXT NOT NULL CHECK (provider IN ('mpesa', 'paypal', 'cashapp', 'card'))
* `amount`: NUMERIC(10, 2) NOT NULL
* `currency`: TEXT DEFAULT 'KES'
* `phone_number`: TEXT
* `checkout_request_id`: TEXT UNIQUE
* `merchant_request_id`: TEXT
* `mpesa_receipt_number`: TEXT
* `donor_name`: TEXT
* `status`: TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed'))
* `created_at`: TIMESTAMPTZ DEFAULT NOW()

### E. Row Level Security (RLS) Policies
* `sermons` & `branches`: Public SELECT access (`anon` role allowed to read). INSERT/UPDATE/DELETE restricted to `service_role`.
* `prayer_requests`: Public INSERT access only (`anon` can submit). SELECT/UPDATE restricted to `service_role`.
* `donations`: Public INSERT access for transaction tracking. SELECT restricted to `service_role`.

## 4. Implementation Details
* **Dependencies:** Install `@supabase/supabase-js` and `@supabase/ssr`.
* **Files to Create:**
  * `supabase/schema.sql`: Raw SQL ready to be run in the Supabase SQL editor.
  * `supabase/seed.sql`: Seed data containing at least 4 realistic sermons, 5 church branches (Nairobi HQ, Mombasa, Nakuru, Eldoret, St. Louis), and initial dummy records.
  * `types/database.types.ts`: TypeScript definitions matching all 4 tables.
  * `lib/supabase/client.ts`: Browser-safe client using `createBrowserClient`.
  * `lib/supabase/server.ts`: Server-side client using `createServerClient` for Server Components and Server Actions.
  * `lib/supabase/admin.ts`: Admin client utilizing `SUPABASE_SERVICE_ROLE_KEY` for secure backend mutations.

## 5. Verification Checklist
- [ ] Dependencies `@supabase/supabase-js` and `@supabase/ssr` installed successfully.
- [ ] `supabase/schema.sql` and `supabase/seed.sql` generated and syntactically valid.
- [ ] `types/database.types.ts` exports exact interfaces for `Sermon`, `Branch`, `PrayerRequest`, and `Donation`.
- [ ] `lib/supabase/client.ts` and `lib/supabase/server.ts` export initialized clients that respect environment variables.
- [ ] `npm run build` passes with zero TypeScript compilation errors.
- [ ] `context/06-progress-tracker.md` updated with Phase 4 marked completed.