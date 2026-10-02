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

-- 2. Insert 5 Branch Locations
INSERT INTO public.branches (
  name,
  slug,
  resident_pastor,
  city,
  country,
  address,
  phone,
  email,
  service_times,
  is_hq
) VALUES
(
  'Sugutta Sanctuary (Headquarters)',
  'sugutta-hq',
  'Senior Apostolic Presbytery',
  'Nairobi',
  'Kenya',
  'Sugutta Main Sanctuary, Haile Selassie Ave Corridor, Nairobi, Kenya',
  '+254 700 000 001',
  'sugutta.hq@heavensgates.org',
  '[
    {"service": "Sunday Explosive Worship", "time": "10:00 AM"},
    {"service": "Monday Inspiration Live", "time": "7:00 PM"},
    {"service": "Wednesday Bible Exposition", "time": "7:00 PM"}
  ]'::jsonb,
  true
),
(
  'Mombasa Coastal Sanctuary',
  'mombasa-coastal-sanctuary',
  'Pastor David M. & Pastoral Council',
  'Mombasa',
  'Kenya',
  'Nyali Road, Near Links Plaza, Mombasa, Kenya',
  '+254 700 000 002',
  'mombasa@heavensgates.org',
  '[
    {"service": "First Worship Service", "time": "9:30 AM"},
    {"service": "Deliverance & Miracle Service", "time": "11:30 AM"},
    {"service": "Midweek Prayer Altar", "time": "Wed 6:30 PM"}
  ]'::jsonb,
  false
),
(
  'Nakuru Great Rift Tabernacle',
  'nakuru-great-rift-tabernacle',
  'Pastor Grace K. & Ministry Team',
  'Nakuru',
  'Kenya',
  'Kenyatta Avenue Extension, Central District, Nakuru, Kenya',
  '+254 700 000 003',
  'nakuru@heavensgates.org',
  '[
    {"service": "Sunday Celebration", "time": "10:00 AM"},
    {"service": "Prophetic Prayer Altar", "time": "Wed 6:00 PM"}
  ]'::jsonb,
  false
),
(
  'Eldoret Grace Altar',
  'eldoret-grace-altar',
  'Pastor Samuel O. & Elders Council',
  'Eldoret',
  'Kenya',
  'Uganda Road, Opposite Highland Mall, Eldoret, Kenya',
  '+254 700 000 004',
  'eldoret@heavensgates.org',
  '[
    {"service": "Sunday Anointing Service", "time": "10:00 AM"},
    {"service": "Midweek Deliverance Altar", "time": "Wed 6:00 PM"}
  ]'::jsonb,
  false
),
(
  'St. Louis USA Campus',
  'st-louis-usa-campus',
  'Apostolic Diaspora Outreach Team',
  'St. Louis',
  'United States',
  'Metropolitan Boulevard Sanctuary, St. Louis, MO, USA',
  '+1 (314) 555-0199',
  'stlouis@heavensgates.org',
  '[
    {"service": "Sunday Revival Service", "time": "11:00 AM CST"},
    {"service": "Global Online Intercession", "time": "Wed 7:00 PM CST"}
  ]'::jsonb,
  false
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
