-- ==============================================================================
-- Migration: Add Pastoral Profile, Church Identity, Coordinates & Remittances
-- Date: 2026-10-04
-- Sugutta Fellowship Church
-- ==============================================================================

-- 1. Ensure site_settings table exists
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Add all dynamic columns idempotently
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_name TEXT NOT NULL DEFAULT 'Pastor Caesar O. Nyandwaro';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_title TEXT NOT NULL DEFAULT 'Resident Pastor & Visionary';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_image_url TEXT NOT NULL DEFAULT '/images/pastor-caesar.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_bio TEXT NOT NULL DEFAULT 'Called by God with an apostolic passion to set the captives free, build disciples through sound Biblical exposition, and lead Sugutta Fellowship Church into dynamic community transformation and global impact.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_national_id TEXT NOT NULL DEFAULT '39966005';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS church_motto TEXT NOT NULL DEFAULT 'REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS church_slogan TEXT NOT NULL DEFAULT 'Come. Connect. Grow. Go.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS postal_address TEXT NOT NULL DEFAULT 'P.O BOX 405-40211, SUGGUTTA';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS physical_location TEXT NOT NULL DEFAULT 'Sugutta Sanctuary, Kenya';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_phone TEXT NOT NULL DEFAULT '+254112656123';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_email TEXT NOT NULL DEFAULT 'caesarosebe@gmail.com';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS facebook_url TEXT NOT NULL DEFAULT 'https://facebook.com/SUGGUTTA-FELLOWSHIP-CHURCH';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/suggutta';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_account_number TEXT NOT NULL DEFAULT '1234567890';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_account_name TEXT NOT NULL DEFAULT 'Sugutta Fellowship Church';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_branch TEXT NOT NULL DEFAULT 'Nairobi Central Branch';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_swift TEXT NOT NULL DEFAULT 'KCBLKENX';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_paybill TEXT NOT NULL DEFAULT '174379';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS western_union_recipient TEXT NOT NULL DEFAULT 'Caesar O. Nyandwaro';

-- 3. If there is an existing row, upgrade placeholder fields with authentic defaults
UPDATE public.site_settings
SET
  pastor_name = COALESCE(NULLIF(pastor_name, ''), 'Pastor Caesar O. Nyandwaro'),
  pastor_title = COALESCE(NULLIF(pastor_title, ''), 'Resident Pastor & Visionary'),
  pastor_image_url = COALESCE(NULLIF(pastor_image_url, ''), '/images/pastor-caesar.jpg'),
  pastor_national_id = COALESCE(NULLIF(pastor_national_id, ''), '39966005'),
  church_motto = COALESCE(NULLIF(church_motto, ''), 'REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD'),
  church_slogan = COALESCE(NULLIF(church_slogan, ''), 'Come. Connect. Grow. Go.'),
  postal_address = COALESCE(NULLIF(postal_address, ''), 'P.O BOX 405-40211, SUGGUTTA'),
  physical_location = COALESCE(NULLIF(physical_location, ''), 'Sugutta Sanctuary, Kenya'),
  mpesa_phone = CASE WHEN mpesa_phone = '+254 700 000 001' THEN '+254112656123' ELSE mpesa_phone END,
  contact_email = CASE WHEN contact_email = 'contact@heavensgatesugutta.org' THEN 'caesarosebe@gmail.com' ELSE contact_email END,
  western_union_recipient = COALESCE(NULLIF(western_union_recipient, ''), 'Caesar O. Nyandwaro');

-- 4. Seed if row doesn't exist
INSERT INTO public.site_settings (
  pastor_name, pastor_title, pastor_image_url, pastor_bio, pastor_national_id,
  church_motto, church_slogan, postal_address, physical_location,
  mpesa_phone, contact_email, facebook_url, instagram_url,
  kcb_account_number, kcb_account_name, kcb_branch, kcb_swift, mpesa_paybill, western_union_recipient
)
SELECT
  'Pastor Caesar O. Nyandwaro',
  'Resident Pastor & Visionary',
  '/images/pastor-caesar.jpg',
  'Called by God with an apostolic passion to set the captives free, build disciples through sound Biblical exposition, and lead Sugutta Fellowship Church into dynamic community transformation and global impact.',
  '39966005',
  'REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD',
  'Come. Connect. Grow. Go.',
  'P.O BOX 405-40211, SUGGUTTA',
  'Sugutta Sanctuary, Kenya',
  '+254112656123',
  'caesarosebe@gmail.com',
  'https://facebook.com/SUGGUTTA-FELLOWSHIP-CHURCH',
  'https://instagram.com/suggutta',
  '1234567890',
  'Sugutta Fellowship Church',
  'Nairobi Central Branch',
  'KCBLKENX',
  '174379',
  'Caesar O. Nyandwaro'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- 5. Enable RLS and public policies
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to site_settings" ON public.site_settings;
CREATE POLICY "Allow public read access to site_settings"
  ON public.site_settings FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Allow service role full access to site_settings" ON public.site_settings;
CREATE POLICY "Allow service role full access to site_settings"
  ON public.site_settings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
