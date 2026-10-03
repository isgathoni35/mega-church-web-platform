-- ==============================================================================
-- Heavens Gates Sugutta Fellowship Church International - Seed Data
-- ==============================================================================

-- 1. Insert Initial Sermons
INSERT INTO public.sermons (
  title,
  slug,
  speaker,
  youtube_url,
  thumbnail_url,
  category,
  is_featured,
  is_live,
  date_preached
) VALUES
(
  'Walking in Divine Overflow and Covenant Power',
  'walking-in-divine-overflow-and-covenant-power',
  'Pastor Jeannette Taylor',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1200',
  'Sunday Worship',
  true,
  false,
  CURRENT_DATE - INTERVAL '5 days'
),
(
  'Monday Inspiration Live: The Mystery of Prophetic Deliverance',
  'monday-inspiration-live-mystery-of-prophetic-deliverance',
  'Pastor Jeannette Taylor',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1510519138171-c70d7634f02c?auto=format&fit=crop&q=80&w=1200',
  'Monday Inspiration',
  false,
  true,
  CURRENT_DATE - INTERVAL '4 days'
),
(
  'Unlocking Spiritual Authority and Kingdom Righteousness',
  'unlocking-spiritual-authority-and-kingdom-righteousness',
  'Apostolic Teaching Ministry',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200',
  'Wednesday Bible Study',
  false,
  false,
  CURRENT_DATE - INTERVAL '2 days'
),
(
  'Grand Miracle Crusade: Freedom from Generational Curses',
  'grand-miracle-crusade-freedom-from-generational-curses',
  'Pastor Jeannette Taylor',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200',
  'Crusade & Deliverance',
  true,
  false,
  CURRENT_DATE - INTERVAL '12 days'
)
ON CONFLICT (slug) DO NOTHING;



-- 3. Insert Sample Initial Prayer Request
INSERT INTO public.prayer_requests (
  full_name,
  email,
  phone,
  request,
  is_confidential,
  status
) VALUES
(
  'Sarah Mwangi',
  'sarah.mwangi@example.com',
  '+254 712 345 678',
  'Praying for complete healing and supernatural job breakthrough for my family.',
  true,
  'pending'
);

-- 4. Insert Sample Initial Test Donation Record
INSERT INTO public.donations (
  provider,
  amount,
  currency,
  phone_number,
  checkout_request_id,
  merchant_request_id,
  mpesa_receipt_number,
  donor_name,
  status
) VALUES
(
  'mpesa',
  2500.00,
  'KES',
  '254712345678',
  'ws_CO_021020261234567890',
  '29115-3462011-1',
  'TKJ9876543',
  'Brother Peter K.',
  'completed'
);
