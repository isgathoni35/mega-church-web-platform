-- ==============================================================================
-- Migration: Add Children's Home Media Gallery & TopBar Live Broadcast Controls
-- Date: 2026-10-07
-- Sugutta Fellowship Church International
-- ==============================================================================

-- 1. Ensure site_settings table exists
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Standardize Contact Email to official church email
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS contact_email TEXT NOT NULL DEFAULT 'sugutafellowshipchurch@gmail.com';

-- 3. TopBar & Live Broadcast Banner Controls
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS topbar_live_active BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS topbar_live_label TEXT NOT NULL DEFAULT 'Watch Live Broadcast';

ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS topbar_live_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/@Brianmbera';

ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS topbar_announcement TEXT NOT NULL DEFAULT 'Sunday Service: 8:00 AM – 11:45 AM | Sanctuary & Online';

-- 4. Children's Home Photo Gallery (JSONB Array)
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS orphanage_photos_json JSONB NOT NULL DEFAULT '[
  {
    "id": "photo-1",
    "title": "Daily Morning Devotions & Scripture Reading",
    "caption": "Every morning at our children''s home begins with worship songs, Bible reading, and prayer for our partners.",
    "imageUrl": "/images/orphanage-hero.png",
    "category": "Spiritual Life"
  },
  {
    "id": "photo-2",
    "title": "Nutritious Hot Meals Served Every Day",
    "caption": "Ensuring every boy and girl receives 3 balanced, wholesome meals prepared with love by our kitchen staff.",
    "imageUrl": "/images/community-outreach.jpg",
    "category": "Nutrition"
  },
  {
    "id": "photo-3",
    "title": "100% Formal School Education Sponsorship",
    "caption": "Equipping our children with uniforms, books, and school tuition to build brilliant futures and careers.",
    "imageUrl": "/images/church-programme-flyer.jpg",
    "category": "Education"
  },
  {
    "id": "photo-4",
    "title": "Safe Shelter, Warm Beds & Family Fellowship",
    "caption": "A joyful and protective sanctuary where every child feels loved, secure, and part of God''s family.",
    "imageUrl": "/images/hero-worship.jpg",
    "category": "Family Life"
  }
]'::jsonb;

-- 5. Children's Home Video Stories & Testimonies (JSONB Array)
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS orphanage_videos_json JSONB NOT NULL DEFAULT '[
  {
    "id": "video-1",
    "title": "A Day of Joy at Heavens Gates Children''s Home",
    "description": "Follow along for an inspiring walkthrough of daily life, classes, hot meals, and evening praise fellowship with our children.",
    "videoUrl": "https://www.youtube.com/@Brianmbera",
    "badge": "Daily Life Story"
  },
  {
    "id": "video-2",
    "title": "Children''s Choir Praise Ministration",
    "description": "Our children ministering before the Lord with heartfelt thanksgiving during Sunday Main Service.",
    "videoUrl": "https://www.youtube.com/@Brianmbera",
    "badge": "Worship Ministration"
  }
]'::jsonb;

-- 6. Update existing rows with official email and dynamic TopBar defaults
UPDATE public.site_settings
SET
  contact_email = CASE 
    WHEN contact_email IS NULL OR contact_email = '' OR contact_email = 'caesarosebe@gmail.com' OR contact_email = 'contact@heavensgatesugutta.org' 
    THEN 'sugutafellowshipchurch@gmail.com' 
    ELSE contact_email 
  END,
  topbar_live_active = COALESCE(topbar_live_active, true),
  topbar_live_label = COALESCE(NULLIF(topbar_live_label, ''), 'Watch Live Broadcast'),
  topbar_live_url = COALESCE(NULLIF(topbar_live_url, ''), 'https://www.youtube.com/@Brianmbera'),
  topbar_announcement = COALESCE(NULLIF(topbar_announcement, ''), 'Sunday Service: 8:00 AM – 11:45 AM | Sanctuary & Online'),
  orphanage_photos_json = COALESCE(orphanage_photos_json, '[
    {
      "id": "photo-1",
      "title": "Daily Morning Devotions & Scripture Reading",
      "caption": "Every morning at our children''s home begins with worship songs, Bible reading, and prayer for our partners.",
      "imageUrl": "/images/orphanage-hero.png",
      "category": "Spiritual Life"
    },
    {
      "id": "photo-2",
      "title": "Nutritious Hot Meals Served Every Day",
      "caption": "Ensuring every boy and girl receives 3 balanced, wholesome meals prepared with love by our kitchen staff.",
      "imageUrl": "/images/community-outreach.jpg",
      "category": "Nutrition"
    },
    {
      "id": "photo-3",
      "title": "100% Formal School Education Sponsorship",
      "caption": "Equipping our children with uniforms, books, and school tuition to build brilliant futures and careers.",
      "imageUrl": "/images/church-programme-flyer.jpg",
      "category": "Education"
    },
    {
      "id": "photo-4",
      "title": "Safe Shelter, Warm Beds & Family Fellowship",
      "caption": "A joyful and protective sanctuary where every child feels loved, secure, and part of God''s family.",
      "imageUrl": "/images/hero-worship.jpg",
      "category": "Family Life"
    }
  ]'::jsonb),
  orphanage_videos_json = COALESCE(orphanage_videos_json, '[
    {
      "id": "video-1",
      "title": "A Day of Joy at Heavens Gates Children''s Home",
      "description": "Follow along for an inspiring walkthrough of daily life, classes, hot meals, and evening praise fellowship with our children.",
      "videoUrl": "https://www.youtube.com/@Brianmbera",
      "badge": "Daily Life Story"
    },
    {
      "id": "video-2",
      "title": "Children''s Choir Praise Ministration",
      "description": "Our children ministering before the Lord with heartfelt thanksgiving during Sunday Main Service.",
      "videoUrl": "https://www.youtube.com/@Brianmbera",
      "badge": "Worship Ministration"
    }
  ]'::jsonb),
  updated_at = NOW();
