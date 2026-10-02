-- ==============================================================================
-- Heavens Gates Sugutta Fellowship Church International - Database Schema
-- Supabase PostgreSQL Migration
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. Sermons Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.sermons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  speaker TEXT NOT NULL DEFAULT 'Pastor Jeannette Taylor',
  youtube_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT NOT NULL CHECK (
    category IN (
      'Sunday Worship',
      'Monday Inspiration',
      'Wednesday Bible Study',
      'Crusade & Deliverance'
    )
  ),
  is_featured BOOLEAN DEFAULT false,
  is_live BOOLEAN DEFAULT false,
  date_preached DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for performant filtering
CREATE INDEX IF NOT EXISTS idx_sermons_category ON public.sermons (category);
CREATE INDEX IF NOT EXISTS idx_sermons_is_featured ON public.sermons (is_featured);
CREATE INDEX IF NOT EXISTS idx_sermons_date_preached ON public.sermons (date_preached DESC);

-- ==============================================================================
-- 3. Branches Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  resident_pastor TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Kenya',
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_times JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_hq BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_branches_city ON public.branches (city);
CREATE INDEX IF NOT EXISTS idx_branches_is_hq ON public.branches (is_hq);

-- ==============================================================================
-- 4. Prayer Requests Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  request TEXT NOT NULL,
  is_confidential BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'pending' CHECK (
    status IN ('pending', 'prayed_for', 'archived')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON public.prayer_requests (status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created_at ON public.prayer_requests (created_at DESC);

-- ==============================================================================
-- 5. Donations Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL CHECK (
    provider IN ('mpesa', 'paypal', 'cashapp', 'card')
  ),
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  phone_number TEXT,
  checkout_request_id TEXT UNIQUE,
  merchant_request_id TEXT,
  mpesa_receipt_number TEXT,
  donor_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (
    status IN ('pending', 'completed', 'failed')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations (status);
CREATE INDEX IF NOT EXISTS idx_donations_provider ON public.donations (provider);
CREATE INDEX IF NOT EXISTS idx_donations_checkout_req ON public.donations (checkout_request_id);

-- ==============================================================================
-- 6. Row Level Security (RLS) Configuration
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Sermons Policies: Public read, service_role write
CREATE POLICY "Allow public read access to sermons"
  ON public.sermons
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role full access to sermons"
  ON public.sermons
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Branches Policies: Public read, service_role write
CREATE POLICY "Allow public read access to branches"
  ON public.branches
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role full access to branches"
  ON public.branches
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Prayer Requests Policies: Public anonymous insert, service_role read/manage
CREATE POLICY "Allow public insert of prayer requests"
  ON public.prayer_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to prayer requests"
  ON public.prayer_requests
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Donations Policies: Public anonymous insert, service_role read/manage
CREATE POLICY "Allow public insert of donations"
  ON public.donations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to donations"
  ON public.donations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
