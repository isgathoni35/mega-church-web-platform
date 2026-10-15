-- ==============================================================================
-- Migration: Complete CMS Media Columns & Payment Details
-- Date: 2026-10-15
-- Sugutta Fellowship Church International
--
-- Instructions:
-- Run this in Supabase SQL Editor (Dashboard -> SQL Editor -> New Query -> Run)
-- Safe & Idempotent: can be executed multiple times without errors.
-- ==============================================================================

-- 1. Ensure public.site_settings table exists
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Children's Home Secondary Images
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS orphanage_donate_image_url TEXT NOT NULL DEFAULT '/images/orphanage-hero.png';

ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS orphanage_story_image TEXT NOT NULL DEFAULT '/images/community-outreach.jpg';

-- 3. Ministry Pillars Video Story Links (Optional Video Overlays)
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS pillar_1_video TEXT;

ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS pillar_2_video TEXT;

ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS pillar_3_video TEXT;

ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS pillar_4_video TEXT;

-- 4. Banking & Payment Explicit Reconciled Columns
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS mpesa_paybill_account TEXT NOT NULL DEFAULT '8146952';

ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS mpesa_paybill_name TEXT NOT NULL DEFAULT 'SUGGUTTA FELLOWSHIP CHURCH';

ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS kcb_bank_qr_image TEXT;

-- 5. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
