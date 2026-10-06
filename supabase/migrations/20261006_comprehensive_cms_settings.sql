-- ==============================================================================
-- Migration: Comprehensive Site Content, Media CMS & YouTube Settings
-- Heavens Gates Sugutta Fellowship Church International
--
-- Idempotent & Fully Self-Contained:
-- Safe to run in Supabase SQL Editor multiple times without errors.
-- ==============================================================================

-- 1. Ensure public.site_settings table exists
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Pastoral Profile & Church Identity
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_name TEXT NOT NULL DEFAULT 'Pastor Caesar Osebe Nyandwaro';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_title TEXT NOT NULL DEFAULT 'Resident Pastor & Visionary';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_image_url TEXT NOT NULL DEFAULT '/images/pastor-caesar.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_bio TEXT NOT NULL DEFAULT 'Called by God with an apostolic passion to set the captives free, build disciples through sound Biblical exposition, and lead Sugutta Fellowship Church into dynamic community transformation and global impact.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pastor_national_id TEXT NOT NULL DEFAULT '39966005';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS church_motto TEXT NOT NULL DEFAULT 'REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS church_slogan TEXT NOT NULL DEFAULT 'Come. Connect. Grow. Go.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS postal_address TEXT NOT NULL DEFAULT 'P.O BOX 405-40211, SUGGUTTA';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS physical_location TEXT NOT NULL DEFAULT 'Sugutta Sanctuary, Kenya';

-- 3. Communication, Social Channels & YouTube
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_phone TEXT NOT NULL DEFAULT '+254112656123';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_email TEXT NOT NULL DEFAULT 'caesarosebe@gmail.com';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS facebook_url TEXT NOT NULL DEFAULT 'https://facebook.com/SUGGUTTA-FELLOWSHIP-CHURCH';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/suggutta';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS youtube_channel_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/@Brianmbera';

-- 4. Banking & Remittances
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_account_number TEXT NOT NULL DEFAULT '1234567890';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_account_name TEXT NOT NULL DEFAULT 'Sugutta Fellowship Church';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_branch TEXT NOT NULL DEFAULT 'Nairobi Central Branch';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS kcb_swift TEXT NOT NULL DEFAULT 'KCBLKENX';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mpesa_paybill TEXT NOT NULL DEFAULT '174379';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS western_union_recipient TEXT NOT NULL DEFAULT 'Caesar Osebe Nyandwaro';

-- 5. Hero & Branding
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_1 TEXT NOT NULL DEFAULT 'Sugutta';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_2 TEXT NOT NULL DEFAULT 'Fellowship';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_3 TEXT NOT NULL DEFAULT 'Church';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_subtitle TEXT NOT NULL DEFAULT 'We are a Christ-centered, Spirit-filled family learning to follow Jesus faithfully and carry His Gospel into everyday life.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_promise TEXT NOT NULL DEFAULT 'Experience God''s power through deliverance and spiritual transformation.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_image_url TEXT NOT NULL DEFAULT '/images/pastor-caesar-hero.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_branches TEXT NOT NULL DEFAULT '50+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_lives TEXT NOT NULL DEFAULT '1M+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_years TEXT NOT NULL DEFAULT '25+';

-- 6. Mission & Vision Statements
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mission_statement TEXT NOT NULL DEFAULT 'To win souls to Christ, disciple believers in sound biblical doctrine, break spiritual bondages through the power of the Holy Spirit, and raise an empowered community walking in holiness and divine covenant purpose.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS vision_statement TEXT NOT NULL DEFAULT 'To be an apostolic beacon of worship and spiritual awakening across Kenya and the nations, demonstrating Christ''s compassion, planting praying families, and advancing the Kingdom of God.';

-- 7. Twin Ongoing Projects (Sanctuary Construction & Children's Home)
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_title TEXT NOT NULL DEFAULT 'Building a Permanent House of Prayer in Sugutta';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_subtitle TEXT NOT NULL DEFAULT 'Concrete foundation blocks, steel pillar reinforcement & roof trussing.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_narrative TEXT NOT NULL DEFAULT 'With five vibrant Sunday services and midweek teachings overflowing our temporary hall, our congregation is constructing a permanent sanctuary to shelter worshippers from the rains and house youth discipleship.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_image_url TEXT NOT NULL DEFAULT '/images/church-construction.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS construction_badge TEXT NOT NULL DEFAULT 'Sanctuary Construction';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_title TEXT NOT NULL DEFAULT 'Sheltering & Sponsoring 50+ Vulnerable Children';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_subtitle TEXT NOT NULL DEFAULT 'Hot nutritious meals, quality education, medical care & parental love.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_narrative TEXT NOT NULL DEFAULT 'Putting faith into tangible action. Every day, our home feeds, clothes, and educates orphaned boys and girls in Sugutta. Sponsoring a child or sending food donations preserves a destiny and fulfills James 1:27.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_image_url TEXT NOT NULL DEFAULT '/images/orphanage-hero.png';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS orphanage_badge TEXT NOT NULL DEFAULT 'Children''s Home Mission';

-- 8. Grassroots Community & Elder Care
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_title TEXT NOT NULL DEFAULT 'Rooted in Our Community, Walking Alongside Families';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_narrative TEXT NOT NULL DEFAULT 'True Christian ministry is never confined to sanctuary walls. In Sugutta and neighboring villages, our pastoral team and church workers meet regularly with village elders, struggling families, and young children in their homesteads.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_image_url TEXT NOT NULL DEFAULT '/images/community-outreach.jpg';

-- 9. 4 Ministry Pillars & Impact Counters
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_1_title TEXT NOT NULL DEFAULT 'Deliverance & Healing';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_1_desc TEXT NOT NULL DEFAULT 'Treading upon the works of darkness, breaking generational curses, casting out demonic afflictions, and witnessing total physical restoration through the authority of Jesus Christ.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_1_image TEXT NOT NULL DEFAULT '/images/ministry-healing.jpg';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_2_title TEXT NOT NULL DEFAULT 'Global Crusades';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_2_desc TEXT NOT NULL DEFAULT 'Conducting massive outdoor evangelistic campaigns, stadium crusades, and open-air meetings that gather hundreds of thousands to repent and accept the saving power of the Cross.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_2_image TEXT NOT NULL DEFAULT '/images/hero-worship.jpg';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_3_title TEXT NOT NULL DEFAULT 'Prophetic Word & Truth';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_3_desc TEXT NOT NULL DEFAULT 'Expositional teaching of the Holy Scriptures to equip the saints, ground believers in apostolic doctrine, and build resilient Christian families anchored in holiness.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_3_image TEXT NOT NULL DEFAULT '/images/ministry-healing.jpg';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_4_title TEXT NOT NULL DEFAULT 'Compassion & Outreach';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_4_desc TEXT NOT NULL DEFAULT 'Feeding the hungry, sheltering orphans, providing medical support, and clothing widows across underserved communities as an active demonstration of Christ''s compassion.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS pillar_4_image TEXT NOT NULL DEFAULT '/images/community-outreach.jpg';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_1_val TEXT NOT NULL DEFAULT '1,200+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_1_lbl TEXT NOT NULL DEFAULT 'Deliverance Sessions';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_2_val TEXT NOT NULL DEFAULT '50+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_2_lbl TEXT NOT NULL DEFAULT 'Miracle Crusades';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_3_val TEXT NOT NULL DEFAULT '1,000,000+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS impact_stat_3_lbl TEXT NOT NULL DEFAULT 'Believers Impacted';

-- 10. Dynamic Events Data (JSONB array)
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS events_json JSONB NOT NULL DEFAULT '[
  {
    "id": "sugutta-crusade-2026",
    "badge": "MISSION 2026",
    "title": "Sugutta Miracle & Deliverance Crusade",
    "location": "Sugutta Sanctuary, Kenya",
    "dates": "April 24-26, 2026",
    "format": "In-Person & Live Broadcast",
    "description": "Join Pastor Caesar Osebe Nyandwaro for three powerful days of deliverance, healing, and supernatural transformation.",
    "imageUrl": "/images/hero-worship.jpg",
    "whatsappMessage": "Hello Pastor Caesar, I would like to join the WhatsApp group for the Sugutta Miracle & Deliverance Crusade (April 24-26, 2026)."
  },
  {
    "id": "prayer-mountain-retreat-2026",
    "badge": "RETREAT 2026",
    "title": "Sacred Prayer Mountain Fasting Retreat",
    "location": "Sugutta Prayer Mountain Sanctuary",
    "dates": "May 15-17, 2026",
    "format": "In-Person Retreat",
    "description": "An intensive spiritual retreat dedicated to deep fasting, mountain intercession, and personal revival away from all worldly distractions.",
    "imageUrl": "/images/ministry-healing.jpg",
    "whatsappMessage": "Hello Pastor Caesar, I would like to register for the Sacred Prayer Mountain Fasting Retreat (May 15-17, 2026)."
  }
]'::jsonb;

-- 11. Row Level Security & Policies
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Public Read Site Settings'
  ) THEN
    CREATE POLICY "Public Read Site Settings" ON public.site_settings
      FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Service Role All Site Settings'
  ) THEN
    CREATE POLICY "Service Role All Site Settings" ON public.site_settings
      FOR ALL USING (true);
  END IF;
END $$;

-- 12. Ensure at least one configuration row exists
INSERT INTO public.site_settings (id, youtube_channel_url)
SELECT gen_random_uuid(), 'https://www.youtube.com/@Brianmbera'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- 13. Update existing row(s) with the YouTube channel
UPDATE public.site_settings
SET youtube_channel_url = 'https://www.youtube.com/@Brianmbera';

-- 14. Ensure church-media storage bucket exists and is public
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'church-media',
  'church-media',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760;

-- Ensure public SELECT policy exists on church-media bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Access Church Media'
  ) THEN
    CREATE POLICY "Public Access Church Media" ON storage.objects
      FOR SELECT USING (bucket_id = 'church-media');
  END IF;
END $$;
