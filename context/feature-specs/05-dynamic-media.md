# Feature Specification: 05 - Dynamic Media & Sermons Hub

## 1. Goal
Connect the frontend to Supabase to fetch real sermon and service data, build the dedicated `/sermons` page with category filtering and an inline video player modal, and update the homepage to display the latest sermon broadcasts dynamically.

## 2. Design & Architecture Decisions
* **Data Fetching:** Fetch sermon records on the server via `lib/supabase/server.ts` with Next.js revalidation (ISR or dynamic rendering).
* **Media Handling:** Extract YouTube Video IDs from stored URLs and render clean, high-performance responsive embeds with zero third-party player bloat.
* **Theme & UI:** Royal purple surfaces, crisp white headings, and metallic gold accents for "Live Now" badges and active filter pills.
* **Component Boundaries:**
  * Server components handle data retrieval from the `sermons` table.
  * Client components manage category tab switching, search input, and modal playback state.

## 3. Component Breakdown & Implementation Details

### A. YouTube Embed Helper (`lib/utils/youtube.ts`)
* Utility function `getYouTubeId(url: string): string | null` supporting standard, short (`youtu.be`), and embed URL formats.
* Utility function `getYouTubeThumbnail(videoId: string): string` to generate high-resolution fallback thumbnails (`https://img.youtube.com/vi/{id}/hqdefault.jpg`).

### B. Live Stream & Featured Service Hero (`components/sermons/live-hero-player.tsx`)
* Checks for an active live stream (`is_live = true`) or falls back to the most recent `is_featured = true` sermon.
* Prominent banner displaying:
  * Pulsing red/gold badge: *"🔴 LIVE BROADCAST"* or *"FEATURED SERMON"*
  * Sermon Title, Preacher name, and Date
  * Embedded responsive 16:9 YouTube iframe player
  * Quick links: "Watch on YouTube" and "Share Broadcast"

### C. Sermons Archive & Category Filter (`components/sermons/sermon-archive.tsx`)
* Interactive filter tabs corresponding to the ministry pillars and flyer itinerary:
  * `All Sermons`
  * `Sunday Worship`
  * `Monday Inspiration`
  * `Wednesday Bible Study`
  * `Crusade & Deliverance`
* Text search input to filter sermons by title or speaker.
* Responsive 3-column grid of `` components.

### D. Sermon Card & Modal Player (`components/sermons/sermon-card.tsx` & `components/sermons/video-modal.tsx`)
* Card layout:
  * High-res thumbnail with a gold hover overlay and play icon.
  * Category badge and date.
  * Sermon title and speaker name.
  * Clicking card triggers `` to stream inline without navigating away.

### E. Dedicated Media Page (`app/sermons/page.tsx`)
* Assembles the Live Hero Player, category filtering bar, and the sermon grid.
* Server-side query:
  ```typescript
  const { data: sermons } = await supabase
    .from('sermons')
    .select('*')
    .order('date_preached', { ascending: false });