# Feature Spec 25: Outdoor Ministry & Praise Video Showcase

## 1. Objective
Integrate 9 authentic church ministry and outdoor praise videos into the platform. Provide an adaptive, responsive media showcase on the Homepage and in the Sermons/Media Hub (`/sermons`) supporting both vertical smartphone praise reels (9:16) and cinematic widescreen crusade footage (16:9) with an interactive modal player.

## 2. Identified Media Files & Metadata
The 9 `.mp4` video files in `public/videos/` have been analyzed for resolution, duration, and orientation:
1. `WhatsApp Video 2026-10-04 at 12.49.28.mp4` (478x850, 0:58) &rarr; **Vertical 9:16 (Praise Reel 1)**
2. `WhatsApp Video 2026-10-04 at 12.51.08.mp4` (848x478, 1:00) &rarr; **Widescreen 16:9 (Outdoor Crusade 1)**
3. `WhatsApp Video 2026-10-04 at 12.55.40.mp4` (848x478, 1:00) &rarr; **Widescreen 16:9 (Praise March 1)**
4. `WhatsApp Video 2026-10-04 at 12.57.21.mp4` (848x478, 0:50) &rarr; **Widescreen 16:9 (Street Ministration 1)**
5. `WhatsApp Video 2026-10-04 at 12.58.30.mp4` (478x850, 0:58) &rarr; **Vertical 9:16 (Praise Reel 2)**
6. `WhatsApp Video 2026-10-04 at 13.02.49.mp4` (848x478, 1:00) &rarr; **Widescreen 16:9 (Outdoor Worship 1)**
7. `WhatsApp Video 2026-10-04 at 13.10.40 (1).mp4` (848x478, 2:44) &rarr; **Widescreen 16:9 (Deliverance Crusade Gathering)**
8. `WhatsApp Video 2026-10-04 at 13.10.40.mp4` (848x478, 1:00) &rarr; **Widescreen 16:9 (Praise Procession 2)**
9. `WhatsApp Video 2026-10-04 at 13.10.41.mp4` (848x478, 5:47) &rarr; **Widescreen 16:9 (Full Outdoor Revival Crusade)**

## 3. Architecture & Components
1. **File Renaming / Web-Safe Mapping (`src/data/ministry-videos.ts`)**:
   - Provide clean titles, spiritual category tags, durations, orientation (`vertical` vs `widescreen`), and video paths.
2. **`MinistryVideoShowcase` Component (`src/components/home/ministry-video-showcase.tsx`)**:
   - Placed on the Homepage between **Categorized Activities** and **Weekly Service Schedule**.
   - Header with Scripture Anchor: *"Make a joyful noise unto the Lord, all ye lands! — Psalm 100:1"*.
   - Filter Tabs:
     - `All Highlights (9)`
     - `Praise Reels (2)` &mdash; Vertical 9:16 smartphone cards with reels badges.
     - `Outdoor Crusades (7)` &mdash; Widescreen 16:9 cinematic cards.
   - Cards with play icon overlays, length pills, category tags, and click-to-play.
3. **Adaptive Video Player Modal (`src/components/media/adaptive-video-modal.tsx`)**:
   - Detects video orientation:
     - Vertical (9:16): renders in an elegant mobile frame with rounded corners, dark glass backdrop, and touch/click controls.
     - Widescreen (16:9): renders in an expanded 16:9 cinematic player.
   - Progressive streaming via HTML5 `<video controls playsInline autoPlay>`.
4. **Media Hub Integration (`/sermons`)**:
   - Integrate the 9 videos into the Sermons archive tab under **"Outdoor Praise & Street Ministry"**.

## 4. Verification & Testing
- 0 TypeScript errors (`npx tsc --noEmit`).
- Port 3002 verified with dev server.
- Playback tested across vertical and widescreen cards.
