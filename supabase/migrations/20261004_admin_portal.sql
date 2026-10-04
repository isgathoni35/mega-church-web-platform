-- ==============================================================================
-- Migration: Church Admin Portal & Dynamic Site Settings
-- Date: 2026-10-04
-- Heavens Gates Sugutta Fellowship Church International
-- ==============================================================================

-- 1. Create site_settings table for dynamic church configurations
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kcb_account_number TEXT NOT NULL DEFAULT '1234567890',
  kcb_account_name TEXT NOT NULL DEFAULT 'Heavens Gates Sugutta Fellowship Church',
  kcb_branch TEXT NOT NULL DEFAULT 'Nairobi Central Branch',
  kcb_swift TEXT NOT NULL DEFAULT 'KCBLKENX',
  mpesa_paybill TEXT NOT NULL DEFAULT '174379',
  mpesa_phone TEXT NOT NULL DEFAULT '+254 700 000 001',
  contact_email TEXT NOT NULL DEFAULT 'contact@heavensgatesugutta.org',
  is_service_live BOOLEAN NOT NULL DEFAULT false,
  live_stream_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to site_settings" ON public.site_settings;
CREATE POLICY "Allow public read access to site_settings"
  ON public.site_settings
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Allow service role full access to site_settings" ON public.site_settings;
CREATE POLICY "Allow service role full access to site_settings"
  ON public.site_settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 3. Seed default initial configuration if table is empty
INSERT INTO public.site_settings (
  kcb_account_number,
  kcb_account_name,
  kcb_branch,
  kcb_swift,
  mpesa_paybill,
  mpesa_phone,
  contact_email,
  is_service_live
)
SELECT
  '1234567890',
  'Heavens Gates Sugutta Fellowship Church',
  'Nairobi Central Branch',
  'KCBLKENX',
  '174379',
  '+254 700 000 001',
  'contact@heavensgatesugutta.org',
  false
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- 4. Update sermons category check constraint to support broader ministry categories
ALTER TABLE public.sermons DROP CONSTRAINT IF EXISTS sermons_category_check;
ALTER TABLE public.sermons ADD CONSTRAINT sermons_category_check CHECK (
  category IN (
    'Sunday Worship',
    'Monday Inspiration',
    'Wednesday Bible Study',
    'Crusade & Deliverance',
    'Outdoor Praise & Crusades',
    'Prophetic Impartation'
  )
);
