-- ==============================================================================
-- Migration: Comprehensive Site Content & Media CMS Settings
-- Heavens Gates Sugutta Fellowship Church International
--
-- Adds dynamic columns to public.site_settings for:
--  - Hero section headline, subtitle, promise, image, and 3-stat counters
--  - Church Mission & Vision statements
--  - Twin Ongoing Projects (Sanctuary Construction & Children's Home)
--  - Grassroots Community Fellowship photo & narrative
--  - 4 Ministry Pillars (titles, descriptions, images) and 3 impact counters
--  - Dynamic Mission Events (JSONB array)
-- ==============================================================================

-- 1. Hero & Branding
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_1 TEXT NOT NULL DEFAULT 'Sugutta';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_2 TEXT NOT NULL DEFAULT 'Fellowship';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_3 TEXT NOT NULL DEFAULT 'Church';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_subtitle TEXT NOT NULL DEFAULT 'We are a Christ-centered, Spirit-filled family learning to follow Jesus faithfully and carry His Gospel into everyday life.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_promise TEXT NOT NULL DEFAULT 'Experience God''s power through deliverance and spiritual transformation.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_image_url TEXT NOT NULL DEFAULT '/images/pastor-caesar-hero.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_branches TEXT NOT NULL DEFAULT '50+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_lives TEXT NOT NULL DEFAULT '1M+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_stat_years TEXT NOT NULL DEFAULT '25+';

-- 2. Mission & Vision Statements
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS mission_statement TEXT NOT NULL DEFAULT 'To win souls to Christ, disciple believers in sound biblical doctrine, break spiritual bondages through the power of the Holy Spirit, and raise an empowered community walking in holiness and divine covenant purpose.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS vision_statement TEXT NOT NULL DEFAULT 'To be an apostolic beacon of worship and spiritual awakening across Kenya and the nations, demonstrating Christ''s compassion, planting praying families, and advancing the Kingdom of God.';

-- 3. Twin Ongoing Projects (Sanctuary Construction & Children's Home)
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

-- 4. Grassroots Community & Elder Care
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_title TEXT NOT NULL DEFAULT 'Rooted in Our Community, Walking Alongside Families';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_narrative TEXT NOT NULL DEFAULT 'True Christian ministry is never confined to sanctuary walls. In Sugutta and neighboring villages, our pastoral team and church workers meet regularly with village elders, struggling families, and young children in their homesteads.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS community_image_url TEXT NOT NULL DEFAULT '/images/community-outreach.jpg';

-- 5. 4 Ministry Pillars & Impact Counters
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

-- 6. Dynamic Events Data (JSONB array)
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

-- 7. Official YouTube Channel
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS youtube_channel_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/@Brianmbera';


-- 8. Ensure church-media storage bucket exists and is public

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
