-- ==============================================================================
-- Migration: 20261007_cleanup_placeholders.sql
-- Description: Purge AI placeholder sermons and reset site_settings media arrays
-- ==============================================================================

-- 1. Remove initial AI seed placeholder sermons (Rick Astley / placeholder URLs)
DELETE FROM public.sermons 
WHERE youtube_url LIKE '%dQw4w9WgXcQ%' 
   OR youtube_url LIKE '%placeholder%'
   OR speaker = 'Pastor Jeannette Taylor';

-- 2. Reset site_settings JSON arrays if they contain old AI placeholder mock items
UPDATE public.site_settings 
SET orphanage_photos_json = '[]'::jsonb,
    orphanage_videos_json = '[]'::jsonb,
    events_json = '[]'::jsonb
WHERE id = (SELECT id FROM public.site_settings LIMIT 1);
