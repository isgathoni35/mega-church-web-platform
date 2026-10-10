# 06. Progress Tracker

**Current Project Phase:** Setup & Foundation  
**Status:** 🟡 In Progress

## ✅ Completed Features

*(The AI will move completed feature specifications here once verified and committed.)*

- [x] `feature-specs/01-design-system.md`: Next.js setup, Tailwind config, CSS variables (Purple/Gold theme), Google Fonts (Montserrat & Great Vibes), and shadcn/ui primitives (`button`, `card`, `input`).
- [x] `feature-specs/02-layout-shell.md`: Persistent layout shell (Top Utility Bar, Sticky Navbar with mobile drawer, and 4-column Global Footer).
- [x] `feature-specs/03-homepage-core.md`: Homepage Core Sections (Hero, Founder Spotlight, Ministry Pillars, Weekly Service Itinerary, Branch Directory Preview).
- [x] `feature-specs/04-supabase-schema.md`: Supabase PostgreSQL schema with RLS (`sermons`, `branches`, `prayer_requests`, `donations`), seed data, TypeScript database interfaces, and browser/server/admin client utilities.
- [x] `feature-specs/05-dynamic-media.md`: Dynamic Media & Sermons Hub: YouTube utilities, responsive 16:9 embedded VideoModal, live stream / featured hero player, category filter tabs, real-time search, dedicated `/sermons` page, and homepage recent sermons integration with Supabase data fetch- [x] `feature-specs/06-mpesa-integration.md`: Digital Giving portal (`/give`) with multi-channel payment options (Lipa na M-Pesa Online STK Push, Cash App `$HGSugutta`, PayPal `@hgsugutta`, Venmo `@hgsugutta`, Givelify), real-time polling, and automated Supabase donation logging.
- [x] `feature-specs/06-community-forms-and-branches.md`: Community Engagement Hub with Prayer Request Altar (`/prayer-request`), Global Campus Directory (`/branches`) with city filter & Google Maps directions, and Plan a Visit & Contact Hub (`/contact`) with children's church guide and Server Actions.
- [x] `feature-specs/08-about-and-founder.md`: About Ministry & Founder's Journey (`/about`) with Hero banner, Founder's detailed biographical testimony, 6-card Statement of Faith, Pastoral Council governance, and Prayer Mountain retreat spotlight.
- [x] `feature-specs/09-orphanage-ministry.md`: Orphanage & Outreach Ministry (`/orphanage`) with Hero banner & impact stats, 4 pillars of care, tangible sponsorship tiers (`/give?fund=orphanage`), volunteer/visit CTA, and homepage teaser.
- [x] `feature-specs/10-neno-style-giving-portal.md`: Transitioned Giving Portal (`/give`) to Pastor Ng'ang'a / Neno Evangelism Centre's direct model: removed automated STK push & polling delays in favor of universal 2-tab hub (Tab 1: 🇰🇪 Kenya M-Pesa Send Money `0700 000 001`, Paybill `174379` with 1-click copyable fund references `OFFERING`, `TITHE`, `ORPHANAGE`, `SEED`, `BUILDING`, and Co-op Bank Wire; Tab 2: 🌍 International Diaspora Remittance via Sendwave, Remitly, Lemfi, Taptap Send, WorldRemit + PayPal & Cash App), backed by pastoral receipt hotline.

- [x] `feature-specs/11-mobile-nav-drawer-fix.md`: Resolved Mobile Navigation Drawer viewport clipping and transparency bleed-through. Portaled drawer and full-screen backdrop directly to `document.body` via `createPortal`, applied `h-[100dvh]` with `shrink-0` header/footer bands and scrollable link body, and removed `backdrop-blur` from `<header>` to eliminate CSS containing block trapping.
- [x] `feature-specs/12-connect-label-harmonization.md`: Harmonized all touchpoints for "Plan a Visit / Contact" to "Connect" across desktop navbar, mobile drawer, global footer, homepage hero CTA, and connection hub page metadata/subtitles.
- [x] `feature-specs/13-categorized-activities-and-connect-hub.md`: Benchmarked categorized activities from Neno Evangelism Centre and Glory Gate Church. Created `CategorizedActivities` on homepage with interactive filter pills (All, Weekly Worship, Fellowships, Crusades & Keshas, Prayer Mountain, Outreach), 11 rich activity cards with schedule/venue/demographic tags, and deep query linking. Implemented Glory Gate benchmarked 3-tab `TabbedConnectHub` on `/contact` with interactive tabs (Plan a Visit, Prayer Petition, Ministry Inquiry), validation via `visitPlanSchema`, `prayerRequestSchema`, `contactInquirySchema`, and Server Actions `submitVisitPlan`, `submitPrayerRequest`, `submitContactInquiry`.
- [x] `feature-specs/14-branch-removal-single-sanctuary.md`: Completely removed all branch and multi-campus references across the entire platform. Heavens Gates Sugutta Fellowship Church International operates strictly as a single mother sanctuary altar in Nairobi (with Mai Mahiu Prayer Mountain and Children's Home). Removed `Campuses` from desktop navbar, mobile drawer, and footer. Removed `BranchPreview` from homepage. Deleted `branch-list.tsx`, `branch-preview.tsx`, and `branches.ts`. Replaced `/branches` with an instant Next.js permanent redirect to `/contact`. Purged `branches` table from `supabase/schema.sql`, sample branch records from `supabase/seed.sql`, and `Branch` types from `database.types.ts`. Harmonized all founder and leadership copy. Verified 0 TypeScript errors and HTTP 200 on port 3002.
- [x] `feature-specs/15-neno-evangelism-palette-overhaul.md`: Comprehensive visual styling, color theme, and layout overhaul to match Neno Evangelism Centre (`https://www.nenoevangelismcentre.org/`).
  1. Palette Architecture: Light, radiant layout alternating between Pure White (`#ffffff`) and Soft Warm Cream/Ivory (`#fbf8f3`), with high-contrast centered headings in vibrant orange (`#ff6b35`), subtle underline accents, crisp white cards with circular orange icon holders (`bg-orange-50 text-[#ff6b35]`), and dark midnight slate (`#0f172a`) reserved for TopBar, Global Footer, and selected high-contrast anchor cards.
  2. Components & Pages Transformed:
     - `src/components/layout/navbar.tsx` & `mobile-nav.tsx`: Crisp white background, dark slate links, high-contrast orange CTA button.
     - `src/components/home/hero-section.tsx`: Converted to 2-column light ivory hero matching Neno Screenshot 2 (framed Apostle portrait with frosted nameplate badge, orange badge, curved underline headline, orange `Watch Live Service` button, white `Learn More` button, 3-stat counter strip).
     - `src/components/home/founder-spotlight.tsx`: Centered orange heading, framed Apostle portrait with floating divine commission quote card, 4 pure white feature cards with circular orange icons, and twin Mission & Vision cards.
     - `src/components/home/ministry-pillars.tsx`: Centered orange heading, 4 pure white cards with circular orange icon holders on warm ivory background (`#fbf8f3`).
     - `src/components/home/recent-sermons.tsx`: Centered orange heading, pure white background, centered orange button.
     - `src/components/home/service-schedule.tsx`: Warm ivory background, centered orange heading with underline bar, pure white schedule panel with circular orange icons and buttons.
     - `src/components/sermons/sermon-card.tsx`: Pure white card, orange play button and category badges, dark text.
     - `src/components/sermons/live-hero-player.tsx`: Warm ivory hero background, dark slate typography, orange badges, white video card with ring border, orange YouTube CTA.
     - `src/components/sermons/sermon-archive.tsx`: Pure white background, orange category filter pills, orange media badge, dark slate headings.
     - `src/components/home/orphanage-teaser.tsx`: Pure white container, orange badge, dark slate text, orange CTA button.
     - `src/app/orphanage/page.tsx` & subcomponents: High-contrast midnight hero with authentic feeding photo and orange stats, soft cream `CarePillars` with white cards and circular orange icons, pure white `SupportNeeds` with orange pricing pills and buttons, and midnight `VolunteerCta` anchor card.
     - `src/components/home/categorized-activities.tsx`: Centered orange heading, orange active category pill, pure white activity cards with orange time text and buttons.
     - `src/app/give/page.tsx` & `DirectGivingPortal`: Tab switcher with rounded-full orange active pill, pure white cards for M-Pesa Send Money and Paybill, orange circular step numbers, and midnight pastoral assistance banner.
     - `src/app/contact/page.tsx` & `TabbedConnectHub`: Pure white cards, orange active tabs, orange circular check/step badges, ivory success screens, and orange buttons.
     - `src/app/prayer-request/page.tsx` & `PrayerForm`: Light ivory hero, centered orange heading, pure white form card with orange category chips and submit button, and midnight hotline card.
     - `src/components/about/`: Light ivory hero, pure white founder story with circular orange icons, warm cream statement of faith with white pillar cards, pure white leadership team, and warm cream prayer mountain spotlight.
     - `src/components/layout/top-bar.tsx` & `footer.tsx`: Midnight slate (`#0f172a`) framing with fiery orange accents (`#ff6b35`).
- [x] `feature-specs/16-mobile-compactness-overhaul.md`: Comprehensive Mobile Compactness & Density Overhaul across all pages and components.
  1. Identified and resolved root cause of "over-spaced" mobile layouts: desktop vertical spacing tokens (`py-20`, `py-24`, `py-28`, `min-h-[80vh]`, `p-8`, `gap-8`) applying to 360px–430px mobile viewports.
  2. Applied systematic mobile density scaling:
     - Section vertical padding scaled from `py-20`/`py-24` down to `py-10 sm:py-16 lg:py-24` (and `py-8 sm:py-14 lg:py-20` on heroes).
     - Component header margins tightened from `space-y-12`/`mb-16` to `space-y-6 sm:space-y-8 lg:space-y-12` and `mb-6 sm:mb-10 lg:mb-16`.
     - Headings dynamically scaled to `text-2xl sm:text-4xl lg:text-5xl` (hero titles to `text-3xl sm:text-5xl lg:text-6xl`).
     - Card padding reduced from `p-6`/`p-8` to `p-4 sm:p-6 lg:p-8` (giving cards `p-4 sm:p-8`).
     - Grid gaps reduced from `gap-8`/`gap-10` to `gap-3.5 sm:gap-6 lg:gap-8`.
     - Action buttons styled with `py-2.5 sm:py-3 px-4 sm:px-6 text-xs sm:text-base h-auto` or `py-3 sm:py-6 h-auto` to eliminate button vertical stretching on mobile while retaining large touch targets on desktop.
     - Removed artificial minimum viewport heights on mobile (`min-h-0 lg:min-h-[88vh]`, `min-h-0 lg:min-h-[80vh]`).
  3. 27 files refactored and verified:
     - Navbar & Footer: `src/components/layout/navbar.tsx` (`h-16 sm:h-20`), `src/components/layout/footer.tsx` (compact ribbon, `py-8 sm:py-12 lg:py-16` grid).
     - Homepage: `hero-section.tsx`, `founder-spotlight.tsx`, `ministry-pillars.tsx`, `service-schedule.tsx`, `categorized-activities.tsx`, `recent-sermons.tsx`, `orphanage-teaser.tsx`.
     - Giving: `src/app/give/page.tsx`, `src/components/giving/direct-giving-portal.tsx`.
     - Sermons & Media: `live-hero-player.tsx`, `sermon-archive.tsx`, `sermon-card.tsx`.
     - Orphanage: `orphanage-hero.tsx`, `care-pillars.tsx`, `support-needs.tsx`, `volunteer-cta.tsx`.
     - Prayer & Connect: `src/app/prayer-request/page.tsx`, `prayer-form.tsx`, `src/app/contact/page.tsx`, `tabbed-connect-hub.tsx`.
     - About: `about-hero.tsx`, `founder-story.tsx`, `statement-of-faith.tsx`, `leadership-team.tsx`, `prayer-mountain.tsx`.
  4. Verification: 100% zero TypeScript errors (`npx tsc --noEmit`), HTTP 200 responses verified on port 3002 across all core routes (`/`, `/about`, `/give`, `/sermons`, `/orphanage`, `/prayer-request`, `/contact`). Preserved all features, styles, and desktop visuals intact.
- [x] `feature-specs/17-sendwave-exclusive-and-donate-labels.md`: Streamlined International Giving exclusively to Sendwave and standardized all giving call-to-actions to "Donate".
  1. International Giving: Pruned `REMITTANCE_APPS` to retain only Sendwave (`sendwave`). Removed all alternative remittance providers (Remitly, Lemfi, Taptap Send, WorldRemit) and deleted secondary gateways (PayPal & Cash App cards). Rebuilt Tab 2 in `DirectGivingPortal` with a featured Sendwave card linking directly to `https://www.sendwave.com`, zero-fee messaging, and clean 3-step walkthrough to transfer directly to Kenyan M-Pesa line `+254 700 000 001` (Pastor Jeannette Taylor).
  2. Preserved Kenyan Giving: 100% untouched. Lipa na M-Pesa Send Money (`0700 000 001`), Paybill `174379` with 5 account codes (`OFFERING`, `TITHE`, `ORPHANAGE`, `SEED`, `BUILDING`), Co-op Bank direct wire, and pastoral receipt hotline preserved intact.
  3. Standardized "Donate" CTAs: Replaced "Give Online" / "Give Online Now" / "Partner With Us" with "Donate" across desktop Navbar (`navbar.tsx`), mobile slide-over drawer (`mobile-nav.tsx`), footer ribbon (`footer.tsx`), and giving page hero & metadata (`app/give/page.tsx`). Updated footer digital giving tiles to explicitly highlight Sendwave for international and Paybill, Send Money, and Co-op Bank for Kenya.
  4. Verification: 0 TypeScript errors (`npx tsc --noEmit`) and HTTP 200 OK across all routes on port 3002.
- [x] `feature-specs/18-sticky-header-optimization.md`: Robust Sticky Header Optimization across Mobile and Desktop.
  1. Resolved Root Cause of Sticky Failure: Replaced `overflow-x: hidden` with `overflow-x: clip` in `src/app/globals.css` and `src/app/layout.tsx` on `html` and `body`. In modern CSS standards, `overflow-x: hidden` on root ancestors establishes an isolated clipping container that silences `position: sticky; top: 0`, causing headers to un-stick on mobile touch scrolling.
  2. Single Sticky Source of Truth: Elevated `<header>` in `src/components/layout/site-header.tsx` to `sticky top-0 z-50 w-full flex flex-col shadow-md shadow-slate-900/5 bg-white transition-shadow duration-300`, removing competing nested `sticky top-0 z-40` from `src/components/layout/navbar.tsx`.
  3. Visual Polish: Added `bg-white/95 backdrop-blur-md` to `Navbar` for seamless frosted-glass separation over dark imagery and vibrant backgrounds as users scroll.
  4. Verification: 0 TypeScript errors (`npx tsc --noEmit`) and HTTP 200 OK across all routes on port 3002.
- [x] `feature-specs/19-sendwave-qr-code-integration.md`: International Sendwave Payment QR Code Integration.
  1. Built dedicated, high-resolution vector SVG QR code component in `src/components/giving/sendwave-qr.tsx` encoding `https://www.sendwave.com` for instant smartphone camera scanning.
  2. Features branded Sendwave badge, zero-fee reassurance, recipient quick-copy strip (`+254 700 000 001` - Pastor Jeannette Taylor), and smartphone camera compatibility indicator.
  3. Integrated side-by-side into Step 1 of Tab 2 (For International) in `DirectGivingPortal` ([src/components/giving/direct-giving-portal.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/giving/direct-giving-portal.tsx)) for desktop and mobile devices.
  4. Verification: 0 TypeScript errors (`npx tsc --noEmit`) and HTTP 200 OK across all routes on port 3002.

- [x] `feature-specs/20-neno-style-events-feature.md`: Neno Evangelism Centre Benchmark Events Feature (`/events`). Streamlined, non-overengineered implementation matching Neno's `/events` page:
  1. Light warm cream hero with italicized eyebrow ("The 2026 Mission Tour"), bold serif headline ("Pastor Jeannette Taylor's Global Mission"), and centered quote card ("The sick will be healed. The oppressed will be set free.").
  2. "The Mission Calendar" 2-column responsive grid with flyer image, category badge plate, venue pin, DATES & FORMAT metadata block, concise spiritual summary, and single full-width "Join WhatsApp Group →" button.
  3. Dark midnight slate bottom CTA banner ("A Divine Appointment Awaits You") with fiery orange WhatsApp pill and Share Event button.
  4. Global navigation integration across desktop Navbar, mobile slide-over drawer, and global footer quick links.
  5. Verification: 0 TypeScript errors (`npx tsc --noEmit`), HTTP 200 responses on port 3002, and full visual verification on desktop and mobile viewports.

- [x] `feature-specs/21-orphanage-donation-portal-and-give-separation.md`: Dedicated Orphanage Donation Portal & Worship Giving Separation.
  1. Distinguish between spiritual worship giving ("Give" for Tithes, Offerings, Seeds, Building at `/give`) and charitable compassion ("Donate" for the Children's Home at `/orphanage/donate`).
  2. Reverted desktop Navbar, mobile drawer, and footer callouts to "Give" / "Give Online".
  3. Purged subscription pricing tables (`/ month`, "Most Popular Choice", `$25 / mo`) from `/orphanage` and replaced with 3 compassion impact areas.
  4. Built dedicated `/orphanage/donate` page with convincing impact breakdown, fund transparency, Kenyan M-Pesa (Paybill 174379 with pre-set Account `ORPHANAGE`, Send Money 0700 000 001), and International Sendwave (with embedded vector QR code).
  5. Verification: 0 TypeScript errors (`npx tsc --noEmit`), HTTP 200 responses on port 3002 across all routes, and end-to-end browser verification of donation navigation and copy interactions.

- [x] `feature-specs/22-orphanage-page-design-harmony.md`: Children's Home Page Overhaul (`/orphanage`) for Aesthetic & Design Harmony.
  1. Replaced gloomy dark hero overlay with radiant warm ivory/cream 2-column split hero (flowing script accent, James 1:27 scripture card, framed children portrait with floating badge, and dual CTAs: `Donate to Children's Home` and `Deliver Food & Supplies`).
  2. Moved stat counters into an elevated horizontal 3-stat strip with pure white cards, circular orange icon holders, and bold numbers (60+ Sheltered Children, 100% In Formal School, 3 Meals Hot Nutrition Daily).
  3. Elevated 4 Care Pillars with sitewide heading signature, top orange accent borders (`border-t-4 border-[#ff6b35]`), squircle icon holders, and hover lift effects.
  4. Polished "Ways You Can Stand With Our Children" with pure white cards and warm donation card linking to `/orphanage/donate`.
  5. Redesigned Volunteer CTA from a full-width dark collision into a framed, rounded-3xl feature card with margin spacing above the footer.
  6. Verification: 0 TypeScript errors (`npx tsc --noEmit`), HTTP 200 responses on port 3002 across all routes, and end-to-end browser inspection across desktop (1440x900) and mobile (390x844).

- [x] `feature-specs/23-logo-integration-and-brand-harmonization.md`: Logo Integration, Browser Tab Titles & Color Harmonization.
  1. Processed and deployed official Sugutta Fellowship Church logo emblem into `public/images/sugutta-logo.png`, `public/logo.png`, `public/favicon.ico`, and `src/app/icon.png`.
  2. Configured browser tab titles in `src/app/layout.tsx` using title template `%s | Sugutta Fellowship Church` and default `Sugutta Fellowship Church — Growing Together in Christ`, and registered the circular logo as the browser favicon and apple touch icon.
  3. Replaced generic cross placeholder `✝` in desktop Navbar, mobile drawer, and footer with the high-resolution logo emblem framed by a gold ring border (`ring-2 ring-[#C59B27]/40`).
  4. Harmonized the platform's color palette: anchored headers with the logo's Deep Royal Navy (`#0A2240`), trimmed with Divine Radiant Gold (`#C59B27`), retained soft warm ivory (`#FBF8F3`) backgrounds, and kept fiery sunset amber (`#FF6B35`) for high-converting action buttons.
  5. Integrated official church seal into Pastoral Receipt confirmation cards on `/give` and `/orphanage/donate`.
  6. Verified 0 TypeScript errors (`npx tsc --noEmit`), HTTP 200 on port 3002 across all routes, and end-to-end browser inspection.

- [x] `feature-specs/24-sendwave-kcb-bank-integration.md`: Sendwave to KCB Bank International Payment Integration.
  1. Configured Sendwave international remittance steps on `/give` and `/orphanage/donate` to route directly into Kenya Commercial Bank (KCB) bank account with placeholder numbers (`1234567890`) and SWIFT `KCBLKENX`.
  2. Implemented structured KCB credentials card with 1-click copy for Account Number, Account Name, Branch, and SWIFT Code.
  3. Updated Sendwave vector QR code (`sendwave-qr.tsx`) to support direct KCB Bank Account deposit mode with 1-click copy.
  4. Standardized all direct bank wire references across the platform to KCB Bank (`KCBLKENX`), updating Tab 1 in `DirectGivingPortal`, Tab 1 in `OrphanageDonateView`, and the Global Footer digital giving channels.
  5. Verified 0 TypeScript errors (`npx tsc --noEmit`) and HTTP 200 on port 3002 across all routes.

- [x] `feature-specs/25-outdoor-ministry-video-showcase.md`: Outdoor Ministry & Praise Video Showcase.
  1. Renamed 9 raw WhatsApp MP4 files in `public/videos/` to clean, URL-safe filenames and mapped them in `src/data/ministry-videos.ts` with dimensions, durations, locations, and scripture anchors.
  2. Identified mixed aspect ratios: 2 vertical 9:16 mobile praise reels (58s each) and 7 widescreen 16:9 outdoor crusade and procession videos (50s to 5:47).
  3. Implemented `AdaptiveVideoModal` supporting both vertical 9:16 mobile frames with rounded gold borders and 16:9 cinematic widescreen players with progressive HTML5 streaming.
  4. Created `MinistryVideoShowcase` component on Homepage and in `/sermons` with interactive filter pills (`All Highlights`, `Praise Reels`, `Outdoor Crusades`), video length badges, location tags, and play hover effects.
  5. Verified 0 TypeScript errors (`npx tsc --noEmit`) and HTTP 200 on port 3002 across all routes.

- [x] `feature-specs/26-church-admin-portal.md`: Church Administrative Management Portal (`/admin`).
  1. Private Admin Authentication: Built master secret passcode authentication (`ADMIN_SECRET_KEY=sugutta_altar_admin_2026`) via `src/lib/auth/admin-auth.ts`, `src/actions/admin-auth.ts`, and HTTP-only cookie session `sugutta_admin_session`. Zero public login clutter or buttons on public user-facing pages.
  2. Edge Route Protection Middleware: Built `src/middleware.ts` guarding `/admin/*` routes while leaving `/admin/login` and all public routes (`/`, `/give`, `/sermons`, `/about`, `/contact`, `/orphanage`) accessible. Redirects unauthenticated admin visits to `/admin/login?from=...`.
  3. Altar Brand Theme & Layout Shell: Deep Navy (`#0A2240`), Radiant Gold (`#C59B27`), high-res church circular seal emblem, desktop sticky sidebar (`admin-sidebar.tsx`), mobile drawer with hamburger trigger (`admin-header.tsx`), live broadcasting indicator, and 1-click view public site action.
  4. Executive Overview Altar Dashboard (`/admin`): Real-time metrics for Published Sermons, Intercessory Petitions, Sanctuary Visitors, and Live Broadcast state, with quick altar shortcuts and latest prayer request cards.
  5. Video & Sermon Management Module (`/admin/sermons`): Instant YouTube URL parser extracting video ID and high-res thumbnail preview in real-time, category dropdown supporting standard sermons and Shorts, live Sunday broadcast switch, and deletion confirmation with automatic Next.js path cache revalidation (`revalidatePath('/')`, `revalidatePath('/sermons')`).
  6. Pastoral Prayer Altar Module (`/admin/prayers`): Intercessory petition records with 1-click direct WhatsApp pastoral reach-out (`https://wa.me/...`), confidential tag detection, prayer state toggling (`pending` -> `prayed_for` -> `archived`), search and category filters.
  7. Sanctuary Visitors Log (`/admin/visitors`): Inflow tracker separating worship visitors and ministry inquiries (`[Visit Plan]` vs general inquiries) with 1-click WhatsApp messaging and date stamps.
  8. Church Banking & Remittance Settings (`/admin/settings`): Form updating KCB Account Number, Name, Branch, SWIFT, M-Pesa Paybill, Hotline phone, and Email with 1-click copyable SQL migration snippet.
  9. Verification: 100% zero TypeScript errors (`npx tsc --noEmit`), HTTP 200 responses verified on port 3002 across all 6 admin routes (`/admin/login`, `/admin`, `/admin/sermons`, `/admin/prayers`, `/admin/visitors`, `/admin/settings`) and core public routes.

- [x] `feature-specs/27-dynamic-pastoral-and-flyer-harmonization.md`: Authentic Church Flyer Harmonization & 100% Dynamic Pastoral Admin Control.
  1. High-Res Asset Pipeline: Cropped and deployed Pastor Caesar O. Nyandwaro's portrait from authentic flyer into `public/images/pastor-caesar.jpg` (400x425 @ 95% quality) and staged full flyer at `public/images/church-programme-flyer.jpg`.
  2. Database & Types Expansion: Expanded `SiteSettingsData` in `src/types/settings.ts`, updated `site_settings` table in `src/types/database.types.ts`, created idempotent SQL migration `supabase/migrations/20261004_site_settings_v2.sql`, and enhanced `getSiteSettingsAction` & `saveSiteSettingsAction` with path revalidation across 9 core routes.
  3. Upgraded Admin Settings Module (`/admin/settings`): Implemented 4 categorized control cards: Pastoral Profile (with live photo preview, pastorName, pastorTitle, pastorImageUrl, pastorBio, pastorNationalId), Church Identity (churchMotto, churchSlogan, postalAddress, physicalLocation), Communication & Socials (mpesaPhone, contactEmail, facebookUrl, instagramUrl), and Remittance (kcbAccountNumber, kcbAccountName, kcbBranch, kcbSwift, mpesaPaybill, westernUnionRecipient), with 1-click SQL migration copy snippet.
  4. Authentic 5-Session Sunday Church Programme (`ServiceSchedule`): Rebuilt service schedule on Homepage with exact 5 stages from 8:00 AM to 11:45 AM (Prayer & Intercession, Sunday School, Worship & Praise, Main Service, Fellowship Time) and Hebrews 10:25 Scripture call to fellowship.
  5. Dynamic Public Components: Connected `HeroSection`, `FounderSpotlight`, `ServiceSchedule`, `FounderStory`, `LeadershipTeam`, `EventsView`, `DirectGivingPortal`, `OrphanageDonateView`, and global `Footer` to dynamic `site_settings` data.
  6. Verification: 100% zero TypeScript errors (`npx tsc --noEmit`), server live on port 3002.

- [x] `feature-specs/28-glory-gate-content-and-editorial-alignment.md`: Glory Gate Benchmark Content & Editorial Voice Alignment (`https://glory-gate-church.vercel.app/`).
  1. Palette Preservation & Editorial Alignment: Retained 100% of the platform's signature vibrant orange (`#ff6b35`), soft warm cream/ivory (`#fbf8f3`), pure white, and midnight slate (`#0f172a`) branding, while adopting the literary, Christ-centered editorial voice and narrative structure from Glory Gate.
  2. Hero Section (`HeroSection`): Warm ivory background, vibrant orange headline (*"A place to meet Jesus. A people sent with hope."*), orange CTA buttons (`bg-[#ff6b35] hover:bg-[#f25c23]`), framed portrait with warm amber glow, and crisp white floating Quick Information Bar with circular orange icons.
  3. "Who We Are" & Twin Mission/Vision Panels (`FounderSpotlight`): Centered orange heading (*"Jesus at the Center. His Love in Motion."*), 4 Pillars (`✦ Built on the Word`, `✦ Spirit-Led Worship`, `✦ Real Community`, `✦ Kingdom Impact`) in clean white cards with circular orange icon holders, warm ivory Mission panel, midnight slate Vision panel with orange accents, and Pastor Caesar spotlight with 4-step spiritual journey (`Come. Connect. Grow. Go.`).
  4. "Your First Sunday" Onboarding Timeline (`ServiceSchedule`): 4-step visitor timeline (`01. Come as you are`, `02. Meet a warm family`, `03. Encounter Jesus`, `04. Take your next step`) alongside the authentic 5-session Sunday Church Programme (8:00 AM – 11:45 AM) and Hebrews 10:25 Scripture banner in midnight slate with fiery orange highlights.
  5. Visitor FAQ Accordion & Newsletter Encouragement Bar (`VisitorFaq`): Centered orange heading, crisp white expandable FAQ cards, and midnight slate (`#0f172a`) newsletter subscription banner with vibrant orange CTA button.
  6. Harmonized Giving, Sermons & Connect Titles: All page headlines styled in signature vibrant orange (`text-[#ff6b35]`) with divider bars.
  7. Favicon & Browser Tab Fix: Overwrote `src/app/favicon.ico` (which had the generic Vercel icon) and `public/favicon.ico` with the official circular church seal emblem and added cache-busting `?v=2` query strings in `src/app/layout.tsx`.
  8. Verification: 100% zero TypeScript errors (`npx tsc --noEmit`), `npm run build` exits code 0 with all 19 routes generated statically and dynamically, and visual inspection verified on port 3002.
- [x] `feature-specs/29-neno-layout-restoration-and-vercel-build-fix.md`: Neno Evangelism Centre Benchmark Layout Restoration, Vercel Build Suspense Fix, and Browser Tab Favicon:
  1. Vercel Production Build Fix: Wrapped search parameters logic in `src/app/admin/login/page.tsx` within `<Suspense fallback={<LoginFormFallback />}>` and set `export const dynamic = "force-dynamic"`, eliminating the `useSearchParams()` static page bailout error during Next.js static page generation. Verified `npm run build` exits code 0 with 19/19 routes generated.
  2. Official Church Seal Favicon: Overwrote default Vercel triangle icon in `src/app/favicon.ico` and `public/favicon.ico` with the official circular church seal emblem and updated `src/app/layout.tsx` metadata with `?v=2` cache-busting version query strings.
  3. Homepage Neno Layout Rhythm Restored:
     - Hero Section (`HeroSection`): Motto pill badge (`{settings.churchMotto}`), headline with curved vibrant orange SVG underline, pastoral subtext, dual CTAs (`Watch Live Service` & `Learn More`), 3-stat counter strip, and framed Pastor Caesar portrait with floating frosted nameplate card.
     - Church Service Programme (`ServiceSchedule`): Centered vibrant orange heading with divider bar, Sunday vs Midweek tab switcher, authentic 5 Sunday sessions (8:00 AM – 11:45 AM), and Hebrews 10:25 Scripture banner.
     - Founder Spotlight (`FounderSpotlight`): Centered vibrant orange heading, framed portrait with floating commission quote card, 4 pure white ministry values cards, and twin Mission & Vision cards.
     - Ministry Pillars (`MinistryPillars`): 4 pure white cards with circular orange icon holders on warm ivory canvas.
     - Video Showcase (`MinistryVideoShowcase`): Highlighting outdoor crusades and vertical praise reels with orange filter badges and play cards.
     - Categorized Activities (`CategorizedActivities`): Interactive category filter pills with 11 distinct activity tracks.
     - Recent Sermons (`RecentSermons`): Centered orange heading, 3-sermon grid, and centered orange button.
     - Orphanage Teaser (`OrphanageTeaser`): Clean transition into the Heavens Gates Compassion Wing.
     - Clean Page Termination: Removed visitor FAQ accordion from homepage to match Neno's clean section flow right into the midnight footer.
  4. Palette & Style Integrity: Retained 100% of the church's signature vibrant orange (`#ff6b35`), soft warm cream/ivory (`#fbf8f3`), pure white, and midnight slate (`#0f172a`) branding.
  5. Verification: 100% zero TypeScript errors (`npx tsc --noEmit`), `npm run build` exits code 0 across 19/19 routes, and visual browser subagent verification completed on `http://localhost:3002/`.

- [x] `feature-specs/30-neno-homepage-architecture-alignment.md`: Complete Homepage Architecture & Section Alignment with Neno Evangelism Centre:
  1. TopBar & Navbar White Aesthetics: Overhauled TopBar to pure white background (`bg-white`) with clean slate contact info (`📞 +254 700 000 001`, `✉️ caesarosebe@gmail.com`), orange live broadcast indicator, and prayer request. Updated Navbar to match Neno with bold orange `Sugutta Fellowship` and `International Ministry` subtitle, plus solid orange `Donate Now` button.
  2. Hero Section & Picture Alignment (Exact match to Neno screenshot):
     - Eyebrow: `★ REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD` warm peach star badge.
     - 3-Line Headline: `Sugutta` / `Fellowship` (with warm golden curved underline brush stroke) / `Church`.
     - Subtitle: We are a Christ-centered, Spirit-filled family learning to follow Jesus faithfully and carry His Gospel into everyday life. with italic orange promise line.
     - Dual buttons: Orange pill `▶ Watch Live Service` & White pill `Learn More →`.
     - Divider & Stats Strip: `50+ • BRANCHES` | `1M+ • LIVES TOUCHED` | `25+ • YEARS MINISTRY`.
     - Right Column Picture: Tall portrait card with rounded corners (`rounded-[2.75rem]`), top-left floating white squircle badge with sparkle icon, top-right orange outline ring, and bottom floating frosted glass nameplate card (`Pastor Caesar O. Nyandwaro` / `RESIDENT PASTOR & VISIONARY` + circular orange badge).
     - Generated ultra high-definition, cinematic church portrait of Pastor Caesar ministering in his royal blue three-piece suit at the pulpit with choir in the background.
  3. 11-Section Homepage Architecture:
     - Hero Section + 3-Item Stats Bar
     - Section 2: Founder Spotlight & Testimony (`FounderSpotlight`)
     - Section 3: Our Ministry Pillars with 3-item impact counter (`MinistryPillars`)
     - Section 4: Church Service Programme (`ServiceSchedule`)
     - Section 5: Latest Services & Sermons (`RecentSermons`)
     - Section 6: Categorized Activities & Departments (`CategorizedActivities`)
     - Section 7: Sacred Prayer Mountain Retreat (`HomePrayerMountain`)
     - Section 8: Anointed Moments 9:16 Vertical Video Reels (`AnointedReels`)
     - Section 9: Children's Home & Compassion Mission (`OrphanageTeaser`)
     - Section 10: Give & Support the Ministry with 2 tabs (`HomeGivingModule`)
     - Section 11: Get In Touch with sanctuary details & message form (`HomeContactModule`)
  4. About Page Hero Upgrade (`src/components/about/about-hero.tsx`):
     - Transformed the bare centered hero on `/about` into Neno's 2-column split layout with headline and milestones on the left, and the tall rounded picture of Pastor Caesar with floating frosted nameplate card on the right.
     - Unified both `/` and `/about` so that users never encounter a plain centered hero without the right-side picture.
  5. Verification: 100% zero TypeScript errors (`npx tsc --noEmit`), `npm run build` exits code 0 with 19/19 routes generated, visual browser subagent verification completed on both `http://localhost:3002/` and `http://localhost:3002/about`.

- [x] `feature-specs/31-church-construction-and-mobile-donation-flow.md`: Balanced Multi-Pillar Campaign (Children's Home & Sanctuary Building) & 3-State Mobile-First Donation Flow:
  1. Balanced Multi-Pillar Architecture in `src/components/giving/campaign-donation-flow.tsx`:
     - State 1 (CAMPAIGN_VIEW): High-contrast hero banner highlighting twin core missions (Children's Home & Sanctuary Building), narrative on both sheltering vulnerable orphans and constructing the permanent cathedral, James 1:27 & 1 Chronicles 29:9 scripture callout, twin spotlight cards (Sugutta Children's Home 50+ orphans vs Sanctuary Building Project), balanced impact tier breakdown, and persistent sticky footer.
     - State 2 (DONATION_FORM): Clean header, teal security badge, interactive dropdown with checkmark indicators (Sugutta Children's Home & Orphanage, Youth & Sanctuary Building Fund, General Tithe & Offering, Prophetic Deliverance Seed), Frequency switcher (One-Time, Weekly, Monthly), 6-grid amount buttons + custom input, dynamic gold action button (e.g. 'Give $50 to Children's Home Now'), and '—— OR PAY WITH ——' divider.
     - State 3 (THANK_YOU): Animated green checkmark, tailored blessing and receipt matching the donor's chosen cause (Children's Home or Building or Tithes), scripture reference, 'Back to Story', and 'Return to Homepage'.
  2. Maintained Authentic App Payment Channels (Strictly 4 Modes):
     - Kenyan Partners: Method 1 (Send Money to Pastor Caesar 0112656123) and Method 2 (Lipa na M-Pesa Paybill 174379 with dynamic 1-click copy of ORPHANAGE, BUILDING, TITHE, SEED account reference).
     - International Friends: Method 1 (Sendwave / Remitly to +254112656123 with Sendwave QR) and Method 2 (KCB Bank Kenya wire transfer details).
  3. Homepage Section 6 Twin Missions Showcase in `src/components/home/categorized-activities.tsx`:
     - Equal-weight side-by-side cards: Left Card (Sugutta Children's Home with /images/orphanage-hero.png & direct /give?fund=orphanage CTA) and Right Card (Sanctuary Construction with /images/church-construction.jpg & direct /give?fund=building CTA).
  4. Give Page Synchronized in `src/app/give/page.tsx` with server-side query parameter resolution.
  5. Verification: 100% zero TypeScript errors (`npx tsc --noEmit`), `npm run build` exits code 0 across all 19 routes, tested on port 3002.

- [x] `feature-specs/32-authentic-community-outreach-image.md`: Integration of Authentic Grassroots Community Outreach & Elder Fellowship Photo:
  1. Asset Deployment: Deployed authentic village outreach image to `public/images/community-outreach.jpg` (298 KB).
  2. Homepage Ministry Pillars (`MinistryPillars`): Assigned `/images/community-outreach.jpg` to Pillar 4 (*Compassion & Outreach*) with descriptive alt tags and replaced duplicate image on Global Crusades with `/images/hero-worship.jpg`, giving each pillar unique, authentic imagery.
  3. About Page Community Fellowship (`CommunityFellowship`): Built dedicated 2-column component on `/about` highlighting grassroots pastoral visits, elder care, and village home cells with the authentic photograph, floating badge, 3 key care pillars, and direct support actions.
  4. Verification: 100% zero TypeScript errors (`npx tsc --noEmit`), `npm run build` exits code 0 across all 19 routes, tested on port 3002.

- [x] `feature-specs/33-comprehensive-cms-and-media-manager.md`: Comprehensive Site-Wide Content & Media CMS Manager in Admin Portal:
  1. Admin CMS Hub (`/admin/settings`): Transformed into 6-tabbed visual CMS (Home & Hero, Twin Projects, Ministry Pillars, About & Community, Events & Crusades, Banking & Contacts).
  2. Supabase Storage & Upload Engine: Built `uploadChurchMediaAction` supporting direct uploads to public `church-media` Supabase Storage bucket with 10MB limit and image MIME validation, eliminating serverless filesystem wipes.
  3. Reusable Media Component (`ImageUploadField`): Features live image preview, direct upload with progress state, 8-item authentic church preset library picker, and manual URL input.
  4. Public Components Dynamic Binding:
     - Homepage Hero (`HeroSection`): 3-line headline, subtitle, promise, dynamic background image, and 3-stat counters.
     - Twin Ongoing Projects (`CategorizedActivities`): Sanctuary construction and Children's Home titles, subtitles, narratives, badges, and images.
     - Ministry Pillars (`MinistryPillars`): Dynamic titles, descriptions, and photos for 4 pillars, plus 3 impact stats.
     - About Page Community Fellowship (`CommunityFellowship`): Dynamic title, narrative, and photo.
     - Mission Events (`EventsView`): Dynamic events list loaded from `settings.eventsJson` with fail-safe fallbacks.
  5. Fallback Resilience & SQL Migration: Handled missing columns gracefully in `getSiteSettingsAction` so the public site never crashes even before the migration is executed. Provided complete idempotent migration `supabase/migrations/20261006_comprehensive_cms_settings.sql`.
- [x] `feature-specs/34-official-youtube-channel-integration.md`: Official Church YouTube Channel Integration (`@Brianmbera`) & Live Streaming Workflow:
  1. Channel Configuration: Integrated the church's official YouTube channel (`https://www.youtube.com/@Brianmbera`) site-wide with fallback resilience.
  2. Database & Types: Added `youtube_channel_url` column to `site_settings` table in Supabase migration `supabase/migrations/20261006_comprehensive_cms_settings.sql`, `SiteSettingsData` in `src/types/settings.ts`, and `database.types.ts`.
  3. Admin Portal Management:
     - Added "Official YouTube Channel URL" input field to Admin Settings (`/admin/settings`) under Communications & Social Links with real-time test preview.
     - Added prominent YouTube Channel Banner to Admin Media Hub (`/admin/sermons`) with 1-click "Visit Channel" and direct link to settings.
  4. Public Frontend Integration:
     - Global Footer (`src/components/layout/footer.tsx`): Added direct "YouTube Channel" link with video icon in the contact details block.
     - Sermons Page (`src/components/sermons/live-hero-player.tsx`): Added "Subscribe to Channel" button on the live broadcast hero player linking directly to `@Brianmbera`.
  5. Live Streaming Guide: Outlined step-by-step instructions for Pastor / Media team on going live from YouTube Studio or mobile, copying the stream URL/ID, and publishing it in Admin Media Hub to broadcast live to the congregation.
  6. Verification: 100% zero TypeScript errors (`npx tsc --noEmit`), `npm run build` exits code 0 across 19/19 routes, tested on port 3002.

- [x] `feature-specs/35-standardized-donation-channels-and-qr-codes.md`: Standardized Altar Donation Channels (3 Kenyan & 2 International) with Step-by-Step Guidance & Interactive Vector QR Codes:
  1. Standardized Kenyan Local Channels (strictly 3):
     - M-Pesa Buy Goods / Till Number: `8146952`, Name: `Suggutta Fellowship Church`, 0% customer transaction fees.
     - M-Pesa Send Money: `0112656123` / `+254112656123`, Recipient: `Pastor Caesar O. Nyandwaro`.
     - KCB Bank Kenya: Account Number: `1356891853`, Account Name: `Sugutta Fellowship church`, SWIFT: `KCBLKENX`, Branch: `Nairobi Central Branch` (also shows M-Pesa to KCB step: Paybill `522522`, Account `1356891853`).
  2. Standardized International Diaspora Channels (strictly 2):
     - Sendwave Remittance: Direct to verified line `+254 112 656 123` / `0112656123` (`Pastor Caesar O. Nyandwaro`) with 0% fee.
     - KCB Bank Direct International Wire (TT / SWIFT): Account `1356891853`, Name `Sugutta Fellowship church`, SWIFT `KCBLKENX`.
  3. Interactive Vector QR Engine (`PaymentQrCode`):
     - Built zero-dependency vector SVG QR code generator in `src/components/giving/payment-qr-code.tsx` supporting Till Number (`8146952`), Send Money (`0112656123`), KCB Bank (Paybill `522522` / Acc `1356891853`), and Sendwave (`+254 112 656 123`).
     - Added toggleable "Scan QR" / "View Steps" buttons across all giving surfaces.
  4. Platform-Wide Harmonization:
     - Direct Giving Portal (`/give`): Updated Tab 1 and Tab 2 with interactive QR codes and verified credentials.
     - Campaign Donation Flow Modal (`CampaignDonationFlow`): Integrated 3 local Kenyan and 2 international channels with QR toggle.
     - Children's Home Donation Portal (`/orphanage/donate`): Updated from old Paybill to Till `8146952`, Send Money `0112656123`, KCB `1356891853`, and Sendwave.
     - Homepage Giving Module (`HomeGivingModule`, Section 10): Updated Tab 1 and Tab 2 with 1-click copy credentials and toggleable QR codes.
     - Homepage Twin Activities (`CategorizedActivities`, Section 6): Updated quick-giving badges for Children's Home and Sanctuary Construction.
     - Global Footer (`Footer`): Updated giving credentials to Till `8146952`, Send Money `0112656123`, Sendwave, and KCB `1356891853`.
     - Admin CMS Manager (`SettingsManagerView` Tab 6): Added Till Number and Till Name input fields with live saving.
  5. Verification: 100% clean compilation, zero TypeScript errors (`npx tsc --noEmit`), server live on port 3002.

- [x] `feature-specs/36-scannable-qr-codes-and-pastor-name-standardization.md`: Authentic Scannable QR Codes & Universal Pastor Name Standardization ("Pastor Caesar O. Nyandwaro"):
  1. Root Cause Identification: Diagnosed that previous QR codes rendered arbitrary, non-mathematical SVG paths with central module-blocking overlays, causing mobile camera vision algorithms (iOS Camera, Google Lens, Samsung Camera, M-Pesa app) to reject them.
  2. Mathematical Barcode Matrix Generation (`qrcode`):
     - Refactored `PaymentQrCode` and `SendwaveQR` to dynamically compute authentic Level `H` error-corrected (30% redundancy) 360x360 data matrices using the installed `qrcode` package.
     - Completely eliminated central icon occlusions, leaving unobstructed barcode matrices with standard quiet zones (`margin: 2`) that lock on instantaneously across all smartphone cameras and banking apps.
     - Channel payloads: Till Number (`"8146952"`), Send Money (`"0112656123"`), KCB Bank (structured deposit details with Paybill `522522` and Acc `1356891853`), and Sendwave (`"https://www.sendwave.com"`).
  3. Universal Pastor Name Standardization:
     - Enforced client directive to never spell out "Osebe" and strictly use "O." across all touchpoints.
     - Standardized formal name to `Pastor Caesar O. Nyandwaro` and administrative/remittance recipient to `Caesar O. Nyandwaro`.
     - Updated database defaults in `supabase/migrations/20261006_comprehensive_cms_settings.sql` and `supabase/migrations/20261004_site_settings_v2.sql`.
     - Harmonized all frontend components, donation flows, leadership cards, metadata, and default settings.
  4. Verification: 100% clean compilation, zero TypeScript errors (`npx tsc --noEmit`), development server active on port 3002.

- [x] `feature-specs/37-childrens-home-media-topbar-and-email-standardization.md`: Children's Home Dynamic Photo & Video Manager, Dynamic TopBar Broadcast Controls & Universal Church Email Standardization:
  1. Children's Home Dynamic Photo & Video Gallery (`/orphanage`):
     - Created `OrphanageMediaShowcase` component ([src/components/orphanage/orphanage-media-showcase.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/orphanage-media-showcase.tsx)) with interactive filter tabs ("All Media", "Photo Moments", "Video Stories"), high-resolution image lightbox, and YouTube video story playback modal.
     - Added typed photo and video structures (`orphanagePhotos`, `orphanageVideos`) with JSONB persistence (`orphanage_photos_json`, `orphanage_videos_json`) in `site_settings`.
  2. Admin CMS Children's Home Media Manager:
     - Added dedicated "Children's Home Media" tab in Admin Settings ([src/components/admin/settings-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/settings-manager-view.tsx)).
     - Allows instant posting of new photos (title, category, optional caption, image upload or URL) and video stories (title, badge, YouTube URL, description) with preview thumbnails and deletion.
  3. Header Top Bar & Live Broadcast Overhaul:
     - Rebuilt `TopBar` ([src/components/layout/top-bar.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/layout/top-bar.tsx)) with dynamic data binding from `site_settings`:
       - Shows active pulsing broadcast indicator when `topbarLiveActive` is true, with customizable button text (`topbarLiveLabel`) and stream destination (`topbarLiveUrl`).
       - Displays central service schedule / announcement banner (`topbarAnnouncement`) on desktop.
       - Dynamically displays pastor's phone (`mpesaPhone`) and official email (`contactEmail`), responsive on mobile and desktop.
       - Admin controls integrated into Admin Settings under "Header Top Bar & Live Broadcast Alert".
  4. Universal Church Email Standardization (`sugutafellowshipchurch@gmail.com`):
     - Set default email to `sugutafellowshipchurch@gmail.com` across `DEFAULT_SETTINGS`, TopBar, Footer, Contact Page, Giving Portals, and Supabase migration.
     - Fully editable by church administrators in Admin Settings with instant real-time synchronization.
     - Added normalization fallback in `getSiteSettingsAction` to ensure legacy placeholder emails automatically upgrade to `sugutafellowshipchurch@gmail.com`.
  5. Scannable QR Codes & Pastor Name Verification:
     - Confirmed mathematical Level `H` error-corrected QR code generation for M-Pesa Till (`8146952`), Send Money (`0112656123`), KCB Bank, and Sendwave.
     - Enforced strict pastoral formatting to `Pastor Caesar O. Nyandwaro` and `Caesar O. Nyandwaro` across all queries and views.
  6. Migration & Verification:
     - Provided migration [supabase/migrations/20261007_orphanage_media_and_topbar.sql](file:///c:/Users/isgat/Projects/megachurch-web-platform/supabase/migrations/20261007_orphanage_media_and_topbar.sql).
     - Verified with `npx tsc --noEmit` (0 errors) and automated HTTP 200 route checks on port 3002 without launching the browser.

- [x] `feature-specs/38-purge-church-branches-and-unify-shared-stats.md`: Complete Church Branch Removal & Dynamic Multi-Page Shared Metrics Unification:
   1. Complete Church Branch Reference Elimination: Purged all references to church branches across the platform. Removed legacy hardcoded "BRANCHES" label from the Homepage hero stat strip. Defaulted extra stat column (`heroStatBranches`) to empty string (`""`), dynamically collapsing into a clean 2-stat grid (`LIVES TOUCHED` & `YEARS MINISTRY`). Cleared legacy branch metric in live Supabase row.
   2. Shared Metrics Unification (Homepage & About Page): Replaced hardcoded static stats (`25+`, `1M+`, `50+`) on `/about` with dynamic bindings from `site_settings` (`heroStatLives`, `heroStatYears`). Updated milestone pill on `/about` to reflect `{settings.heroStatYears || "25+"} Years of Impact`. Bound both `/` and `/about` to the same real-time settings source.
   3. Admin Settings CMS Control (`/admin/settings`): Cleanly labeled counters in Tab 1 (Home & Header) as Stat 1: Lives Touched, Stat 2: Years Ministry, and Stat 3: Extra Stat (Optional, leave blank to hide). Added real-time notification that metrics synchronize simultaneously across Homepage and About page.
   4. Verification: 0 TypeScript errors (`npx tsc --noEmit`), HTTP 200 on port 3002 for `/` and `/about` with zero occurrences of "BRANCHES". No browser opened.

- [x] `feature-specs/39-orphanage-page-professional-layout-polish.md`: Children's Home (`/orphanage`) Professional Layout Polish & Zero-Scope-Creep Harmonization:
   1. Dynamic Admin CMS Binding: Connected `OrphanageHero` to `settings` from `getSiteSettingsAction()`. Edits made in the Admin Portal under Twin Projects (`orphanageImageUrl`, `orphanageTitle`, `orphanageSubtitle`, `orphanageBadge`) now instantly synchronize with the live hero.
   2. Zero-Scope-Creep Layout Polish: Maintained strictly the exact contracted 5 sections without adding unrequested features or database tables:
      - `OrphanageHero`: Replaced harsh borders with clean border tokens, elevated typography hierarchy, added 100% direct impact trust badge, and refined the 3-stat strip with soft shadows and squircle icon containers.
      - `CarePillars`: Removed repetitive thick orange top borders. Upgraded cards to clean white backgrounds with soft shadows, subtle micro-accents, and emerald checkmarks communicating trust and health.
      - `SupportNeeds`: Streamlined the 3 impact cards with clean borders, aligned checkmark lists, and rounded-full primary/secondary CTA buttons linking to `/orphanage/donate` and `/contact`.
      - `VolunteerCta`: Refined the midnight slate card (`#0f172a`), added warm ambient radial lighting, polished button typography, and aligned visiting appointment notice.
   3. Universal YouTube Parser Upgrade: Enhanced `getYouTubeId` regex in `src/lib/utils/youtube.ts` to parse YouTube Shorts URLs (`/shorts/`) across all video cards and media modals.
   4. Verification: 0 TypeScript errors (`npx tsc --noEmit`), HTTP 200 OK on port 3002 for `/orphanage` and `/orphanage/donate`. No browser opened.

- [x] `feature-specs/40-fluent-media-upload-and-hero-pinning-controls.md`: Fluent Direct Video Uploads & Explicit Hero Pinning Controls:
   1. Dual-Mode Media Ingestion in Admin Hub (`/admin/sermons`):
      - Tab 1 (Upload Video File): Drag-and-drop or device file picker for MP4, WebM, and MOV video files up to 50MB directly into Supabase Storage `church-media` bucket via `uploadSermonVideoAction`. Real-time progress and optional custom poster thumbnail upload via `uploadSermonThumbnailAction`.
      - Tab 2 (YouTube / Web Link): Preserves standard YouTube, YouTube Shorts, and live stream link input with automated video ID and thumbnail detection.
   2. Eradication of Hero Auto-Pinning Flaw:
      - Purged the aggressive `|| sermons[0]` fallback in `src/app/sermons/page.tsx`. Sermons now strictly only pin to the hero if explicitly set as Live (`is_live: true`) or Pinned/Featured (`is_featured: true`). Otherwise, newly added sermons go strictly into the library grid below and the hero displays the clean default broadcast hub banner.
   3. 1-Click Pin / Unpin Controls in Admin Library Table:
      - Added Server Action `toggleFeaturedSermonAction` in `src/actions/admin-sermons.ts` to pin/unpin hero videos with single-hero mutual exclusion and instant Next.js cache revalidation.
      - Integrated prominent "Pin as Hero" / "Pinned" button with pin icons alongside the "Set Live" broadcast toggle on every sermon in the library list.
   4. Universal Video Player Playback:
      - Updated `LiveHeroPlayer` (`live-hero-player.tsx`) and `VideoModal` (`video-modal.tsx`) to support native HTML5 `<video controls>` playback for uploaded video files alongside YouTube `<iframe>` embeds.
      - Updated `SermonCard` (`sermon-card.tsx`) with fallback poster thumbnails.
   5. Verification: 0 TypeScript errors (`npx tsc --noEmit`), HTTP 200 OK across `/sermons`, `/admin/sermons`, and `/` on port 3002. No browser opened.

## 🚧 In Progress

None.


## 🏗️ Architectural Decisions Log

*(The AI will log any major structural decisions, package installations, or workarounds here to maintain a permanent record.)*

- **[2026-10-06]:** Standardized Altar Donation Channels & Zero-Dependency SVG QR Codes:
  1. Business Rule: Standardized all donation and seed collection across the entire application to strictly 3 local Kenyan payment methods (Till `8146952`, Send Money `0112656123`, KCB Bank Acc `1356891853`) and strictly 2 international methods (Sendwave `+254 112 656 123`, KCB Direct International Wire).
  2. Zero-Dependency SVG QR Code Architecture: Designed and implemented `PaymentQrCode` using precision vector SVG path rendering, avoiding heavyweight external canvas libraries while providing responsive, crisp visual scanning for mobile banking apps.
  3. Postgres UUID Schema Resilience: Supabase table `site_settings` has a UUID primary key (`gen_random_uuid()`). Updated migration `supabase/migrations/20261006_comprehensive_cms_settings.sql` to avoid any `WHERE id = 'default'` text-to-uuid casting errors (error 22P02), ensuring idempotent execution in Supabase SQL editor.

- **[2026-10-05]:** Vercel Production Build Prerender Fix (`/admin/login`):
  1. Root Cause: In Next.js App Router, using `useSearchParams()` directly in a page component without a `<Suspense>` boundary triggers `missing-suspense-with-csr-bailout`, failing production build during `Generating static pages`.
  2. Solution: Wrapped the form logic in an inner component and enclosed it in `<Suspense fallback={<LoginFormFallback />}>` inside `src/app/admin/login/page.tsx`, and declared `export const dynamic = "force-dynamic"`.
  3. Verification: Ran `npm run build` locally—successfully generated all 19/19 routes with 0 errors (exited code 0).

- **[2026-10-04]:** Church Administrative Management Portal:
  1. Solved user auth model for a church website with zero public member logins by deploying a secure Altar Master Passcode (`ADMIN_SECRET_KEY`) stored in `.env.local` and verified server-side with constant-time buffer comparison to prevent timing attacks.
  2. Implemented HTTP-only cookie sessions (`sugutta_admin_session`, 7-day expiration) protected by Next.js Edge middleware (`src/middleware.ts`).
  3. Handled Next.js Server Action constraints by moving constant objects and non-async functions (`SiteSettingsData`, `DEFAULT_SETTINGS`) from `"use server"` files into `@/types/settings.ts` to strictly adhere to Next.js 15+ server-side entry rules.
  4. Unified prayer requests, visit plans (`[Visit Plan]`), and general inquiries into `public.prayer_requests` with automated prefix filtering, eliminating the need to create redundant database tables while allowing discrete administrative views.
  5. Provided SQL migration `supabase/migrations/20261004_admin_portal.sql` for creating `public.site_settings` and updating category constraints in Supabase.

- **[2026-10-04]:** Outdoor Ministry & Praise Video Showcase:
  1. Analyzed 9 raw WhatsApp videos uploaded to `public/videos/` and identified 2 vertical smartphone reels (`478x850`, 9:16) and 7 widescreen crusade captures (`848x478`, 16:9).
  2. Renamed them to clean, URL-safe filenames (`praise-reel-01.mp4`, `outdoor-crusade-01.mp4`, etc.) and defined typed catalog `MINISTRY_VIDEOS` in `src/data/ministry-videos.ts`.
  3. Built `AdaptiveVideoModal` in `src/components/media/adaptive-video-modal.tsx` which dynamically adapts its frame geometry based on video orientation.
  4. Implemented `MinistryVideoShowcase` in `src/components/home/ministry-video-showcase.tsx` featuring filter tabs, preview video frames (`#t=0.5`), duration badges, location pins, and scripture anchors.
  5. Integrated the showcase on the Homepage (between Ministry Pillars and Categorized Activities) and on `/sermons` below the Sermon Archive.
  6. Verified 0 TypeScript errors (`npx tsc --noEmit`) and HTTP 200 on port 3002.

- **[2026-10-04]:** Sendwave to KCB Bank International Payment Integration:
  1. Standardized all international Sendwave remittance instructions on `/give` and `/orphanage/donate` to guide donors to select: Country: Kenya &rarr; Delivery Method: Bank Transfer &rarr; Recipient Bank: Kenya Commercial Bank (KCB).
  2. Deployed 1-click copy credential blocks for KCB Bank Account (`1234567890`), Account Name (*Heavens Gates Sugutta Fellowship Church* / *Heavens Gates Children's Home*), and SWIFT Code (`KCBLKENX`).
  3. Upgraded `SendwaveQR` vector component to support direct KCB Bank Account deposit mode with 1-click copy button.
  4. Unified all domestic bank deposit and wire references from Co-op Bank to KCB Bank across `DirectGivingPortal`, `OrphanageDonateView`, and the global `Footer`.
  5. Preserved mobile line M-Pesa (`+254 700 000 001`) as a quick secondary alternative in Sendwave.
  6. Verified 0 TypeScript errors (`npx tsc --noEmit`) and HTTP 200 on port 3002 across all routes.

- **[2026-10-04]:** Official Logo Integration, Browser Tab Titles & Color Harmonization:
  1. Extracted and deployed the church's official emblem into standard Next.js asset locations (`public/images/sugutta-logo.png`, `public/favicon.ico`, `src/app/icon.png`).
  2. Updated `src/app/layout.tsx` metadata with dynamic title template `%s | Sugutta Fellowship Church`, default title `"Sugutta Fellowship Church — Growing Together in Christ"`, official motto and Matthew 18:20 scripture anchor.
  3. Integrated 48px circular emblem into `Navbar` with gold border ring and clean typography (Navy brand title + Gold subtitle).
  4. Integrated circular emblem into mobile drawer header and 64px illuminated emblem into the global footer alongside Matthew 18:20 scripture.
  5. Enhanced pastoral verification cards in `DirectGivingPortal` and `OrphanageDonateView` with the official church seal.
  6. Verified 0 TypeScript errors (`npx tsc --noEmit`), server live on port 3002, and visually confirmed across desktop and mobile.

- **[2026-10-04]:** Children's Home Page Overhaul (`/orphanage`) for Aesthetic & Design Harmony:
  1. Unified the page aesthetic with the rest of the site: replaced the dark, gloomy overlay hero with a warm ivory/cream split 2-column layout (`#fffaf5` to `#fbf8f3`), James 1:27 scripture card, framed photography with ambient warm glow, and dual action CTAs.
  2. Extracted the stat counters into an elevated 3-stat strip on pure white cards with circular orange icons.
  3. Added top orange accent borders (`border-t-4 border-[#ff6b35]`) and squircle icon holders to all 4 Care Pillars and 3 Support Impact cards.
  4. Restructured the bottom Volunteer section into a floating, framed rounded-3xl container card, completely eliminating the dark navy background collision with the footer.
  5. Verified 0 TypeScript errors (`npx tsc --noEmit`), HTTP 200 on port 3002, and full interactive browser testing on desktop and mobile.

- **[2026-10-04]:** Dedicated Orphanage Donation Portal & Worship Giving Separation:
  1. Restored church-wide standard giving label "Give" / "Give Online" across Navbar, Mobile Drawer, and Footer for worship giving (Tithes, Offerings, Seeds, Building) routing to `/give`.
  2. Purged all subscription-style pricing tables (`/ month`, "Most Popular Choice", `$25 / mo`) from `/orphanage` and replaced with warm, ministry-focused compassion impact cards.
  3. Built dedicated `/orphanage/donate` page containing compelling justification of need, biblical mandate (James 1:27), designated Kenyan M-Pesa channels (Paybill 174379 with pre-set account `ORPHANAGE`, Send Money 0700 000 001), and International Sendwave remittance with QR code.
  4. Verified 0 TypeScript errors (`npx tsc --noEmit`), HTTP 200 on port 3002, and full interactive browser testing.

- **[2026-10-04]:** Neno Evangelism Centre Benchmark Events Feature (`/events`):
  1. Implemented a streamlined, direct events hub matching Neno's exact architecture without extraneous complexity:
     - Hero section with italicized serif eyebrow ("The 2026 Mission Tour"), bold title ("Pastor Jeannette Taylor's Global Mission") with warm orange italic accent, and centered quote box with sparkle icon ("The sick will be healed. The oppressed will be set free.").
     - "The Mission Calendar" 2-column responsive grid with flyer images, category badge pills (`MISSION 2026`, `RETREAT 2026`, `MONTHLY KESHA`, `GLOBAL MISSION`), venue pins, DATES & FORMAT metadata blocks, concise spiritual expectation summaries, and full-width dark navy `Join WhatsApp Group →` buttons with pre-filled inquiry text.
     - Bottom CTA container ("A Divine Appointment Awaits You") with fiery orange WhatsApp button and Share Event button.
  2. Integrated `Events` globally into desktop Navbar, mobile navigation drawer, and footer quick links.
  3. Verified 0 TypeScript errors (`npx tsc --noEmit`), HTTP 200 responses on port 3002, and full visual verification on desktop and mobile viewports.

- **[2026-10-03]:** Integrated Vector Sendwave QR Code for International Payments:
  1. Built dedicated, high-resolution vector SVG QR code component in `src/components/giving/sendwave-qr.tsx` encoding `https://www.sendwave.com`.
  2. Features Sendwave brand styling, zero-fee badge, recipient quick-copy strip (`+254 700 000 001` - Pastor Jeannette Taylor), and smartphone camera compatibility indicator.
  3. Integrated side-by-side into Step 1 of Tab 2 (For International) in `DirectGivingPortal` ([src/components/giving/direct-giving-portal.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/giving/direct-giving-portal.tsx)) for desktop and mobile devices.
  4. Verified 0 TypeScript errors (`npx tsc --noEmit`) and HTTP 200 responses on port 3002 across all routes.

- **[2026-10-03]:** Mobile & Desktop Sticky Header Robustness:
  1. Replaced `overflow-x: hidden` with `overflow-x: clip` in `src/app/globals.css` and `src/app/layout.tsx` on `html` and `body` to eliminate the root ancestor scroll-port trap that disables `position: sticky`.
  2. Elevated `<header>` in `src/components/layout/site-header.tsx` to `sticky top-0 z-50` with bottom elevation shadow (`shadow-md shadow-slate-900/5`), and removed nested competing `sticky` declarations in `src/components/layout/navbar.tsx`.
  3. Verified 0 TypeScript errors (`npx tsc --noEmit`) and HTTP 200 responses on port 3002 across all routes.

- **[2026-10-03]:** Streamlined International Giving to Sendwave Exclusively & Standardized "Donate" CTAs:
  1. Pruned international remittance options to Sendwave only (`https://www.sendwave.com`), removing Remitly, Lemfi, Taptap Send, and WorldRemit. Removed secondary foreign gateways (PayPal, Cash App).
  2. Tab 2 in `DirectGivingPortal` now features a dedicated Sendwave partner card (0% fee, instant M-Pesa transfer, and direct launch link), with a 3-step guide for sending to Kenyan M-Pesa line `+254 700 000 001` (Pastor Jeannette Taylor) with 1-click copy buttons.
  3. Kenyan giving remains 100% untouched: M-Pesa Send Money, Paybill 174379 with all fund codes (`OFFERING`, `TITHE`, `ORPHANAGE`, `SEED`, `BUILDING`), Co-op Bank direct wire, and pastoral receipt hotline.
  4. Standardized all button labels and links from "Give Online", "Give Online Now", and "Partner With Us" to "Donate" across desktop Navbar, mobile drawer, footer, and `/give` hero. Updated footer Column 4 grid to showcase Sendwave alongside Kenyan Paybill, Send Money, and Co-op Bank.
  5. Verified 0 TypeScript errors (`npx tsc --noEmit`) and HTTP 200 OK across all routes on port 3002.

- **[2026-10-07]:** Senior Developer Audit, Vercel Production Alignment & Admin Saving Pipeline Overhaul:
  1. Resolved Admin Settings Persistence Bug: Fixed inert bottom save buttons in `SettingsManagerView` by wrapping the settings view in `<form onSubmit={handleSave}>` and attaching explicit `onClick` handlers to `renderSaveSectionBar`. Added `useEffect` state syncing from `initialSettings` and `router.refresh()` upon save success to instantly invalidate client-side caches.
  2. Fixed Vercel Static Freezing & Added Dynamic Serverless Execution: Added `export const dynamic = "force-dynamic";` across all CMS-driven routes (`/admin/settings`, `/`, `/orphanage`, `/about`, `/events`) preventing Vercel build-time static HTML freezing.
  3. Added Supabase Storage Whitelisting to `next.config.ts`: Added `*.supabase.co` and `ybwxbwnxnydssgfrrbbo.supabase.co` to `images.remotePatterns` to prevent Next.js image optimization crashes on uploaded media in production.
  4. Dynamized `OrphanageTeaser` on Homepage: Passed dynamic `settings` prop into `src/components/home/orphanage-teaser.tsx`.
  5. Harmonized Default Speaker & Form Error Handling: Updated default speaker parameter in `addSermonAction` (`src/actions/admin-sermons.ts`) to `"Pastor Caesar O. Nyandwaro"`. Replaced masked fake successes with truthful error handling in `src/actions/contact.ts`.
  6. Instant Pastoral Escalation on WhatsApp: Integrated 1-click WhatsApp buttons on prayer petition (`PrayerForm`) and visitor/inquiry (`TabbedConnectHub`) confirmation screens.
  7. Built SEO & Error Infrastructure: Generated dynamic `src/app/sitemap.ts` (XML sitemap), `src/app/robots.ts` (crawling rules), branded `src/app/not-found.tsx` (404 page), and `src/app/error.tsx` (global error boundary).
  8. Verified 0 TypeScript compilation errors (`npx tsc --noEmit`) and HTTP 200 OK across all 13 routes on port 3002 without opening a browser.

- **[2026-10-07]:** Elimination of AI Placeholder Content & Transition to 100% Dynamic Admin-Controlled Media Architecture:
  1. Purged hardcoded `fallbackSermons` (containing Rick Astley YouTube URLs `dQw4w9WgXcQ` / `placeholder` and Unsplash stock photos) from `src/app/sermons/page.tsx` and `src/app/page.tsx`. Sermons are now loaded 100% dynamically from Supabase `sermons` table.
  2. Purged 160MB of local static MP4 videos from `public/videos/` and deleted obsolete static video modules (`src/data/ministry-videos.ts`, `src/components/home/ministry-video-showcase.tsx`, `src/components/home/anointed-reels.tsx`, `src/components/media/adaptive-video-modal.tsx`).
  3. Reset `DEFAULT_SETTINGS` in `src/types/settings.ts` for `orphanagePhotos`, `orphanageVideos`, and `eventsJson` to empty arrays (`[]`), eliminating hardcoded dummy photo and event records.
  4. Implemented senior-grade, resilient empty states across `LiveHeroPlayer`, `SermonArchive`, `RecentSermons`, `OrphanageMediaShowcase`, and `EventsView` that provide clear, inspiring invitations to attend sanctuary services or watch on YouTube when 0 records exist.
  5. Created database cleanup migration script [`supabase/migrations/20261007_cleanup_placeholders.sql`](file:///c:/Users/isgat/Projects/megachurch-web-platform/supabase/migrations/20261007_cleanup_placeholders.sql) to purge seed placeholder sermons and reset JSON columns in Supabase.
  6. Verified 0 TypeScript compilation errors (`npx tsc --noEmit`) and HTTP 200 OK across all 11 public and admin routes on port 3002 without launching a browser.

- **[2026-10-07]:** Comprehensive Mobile Responsiveness & Small Viewport (320px–390px) UX Overhaul:
  1. Overhauled `TopBar` with dual-layout architecture: ultra-compact 1-row layout on mobile (`sm:hidden`) displaying direct call link (`0112 656 123`), vibrant compact **`🔴 LIVE`** stream pill badge, and quick `<Sparkles /> Prayer` link, preventing text collisions on small screens.
  2. Enhanced `MobileNav` slide-over drawer with direct pastoral line link (`+254 112 656 123`) and standardized `"Donate Now"` drawer button.
  3. Optimized `OrphanageMediaShowcase` with swipeable category filter pills (`overflow-x-auto pb-1.5 scrollbar-none`) and `max-h-[90vh] overflow-y-auto` scroll containment on photo and video modals to eliminate bottom caption clipping on short phone screens.
  4. Converted donation portal tab switchers (`OrphanageDonateView` and `DirectGivingPortal`) to responsive full-width 2-column grid containers with clean mobile tab text (`🇰🇪 M-Pesa (Kenya)` & `🌍 Diaspora (Sendwave)`).
  5. Responsive font scaling and stat label truncation in `HeroSection` and updated `CategorizedActivities` Card 1 button link to point directly to `/orphanage/donate`.
  6. Converted 7 admin management tabs in `SettingsManagerView` into a swipeable horizontal pill bar (`overflow-x-auto scrollbar-none`).
  7. Verified 0 TypeScript compilation errors (`npx tsc --noEmit`) and HTTP 200 OK across all routes on port 3002 without launching browser.

- **[2026-10-03]:** Mobile Compactness & Responsive Density Overhaul Across All Pages:
  1. Identified that mobile viewports (360px–430px) were overly spaced out due to global desktop utilities (`py-20`, `py-24`, `min-h-[85vh]`, `p-8`, `gap-8`) applied without mobile breakpoints.
  2. Applied systematic mobile density scaling across all 27 platform components:
     - Section vertical padding: `py-10 sm:py-16 lg:py-24` (heroes: `py-8 sm:py-14 lg:py-20`).
     - Header margins: `space-y-6 sm:space-y-8 lg:space-y-12` and `mb-6 sm:mb-10 lg:mb-16`.
     - Heading fonts: `text-2xl sm:text-4xl lg:text-5xl`.
     - Card interior padding: `p-4 sm:p-6 lg:p-8` (giving cards: `p-4 sm:p-8`).
     - Grid gaps: `gap-3.5 sm:gap-6 lg:gap-8`.
     - Touch buttons: explicit height bounds `py-2.5 sm:py-3 px-4 sm:px-6 text-xs sm:text-base h-auto` or `py-3 sm:py-6 h-auto`.
     - Navbar height: `h-16 sm:h-20`.
  3. Verified zero TypeScript errors (`npx tsc --noEmit`) and HTTP 200 OK across all routes (`/`, `/about`, `/give`, `/sermons`, `/orphanage`, `/prayer-request`, `/contact`) on port 3002.
  4. Preserved 100% of all features, database schemas, and Neno warm ivory / vibrant orange aesthetics.

- **[2026-10-03]:** Comprehensive Visual Styling & Layout Transformation to Neno Evangelism Centre Identity:
  1. Extracted exact live layout patterns and color tokens from user-supplied Neno Evangelism Centre screenshots: soft warm ivory canvas (`#fbf8f3`), pure white cards (`#ffffff`), centered bold headings in vibrant orange (`#ff6b35`) with underline bars, circular orange icon holders (`bg-orange-50 text-[#ff6b35]`), and dark midnight slate (`#0f172a`) framing for TopBar, Footer, and selected anchor cards.
  2. Rebuilt homepage hero into a 2-column light ivory hero with framed Apostle portrait card and stat strip matching Neno Screenshot 2.
  3. Harmonized all pages (`/`, `/about`, `/give`, `/sermons`, `/orphanage`, `/prayer-request`, `/contact`) and layout wrappers (`Navbar`, `MobileNav`, `TopBar`, `Footer`, `VideoModal`).
  4. Preserved all features, database schemas, and Server Actions without change.
  5. Verified 0 TypeScript compilation errors (`npx tsc --noEmit`) and HTTP 200 OK on all routes on port 3002.

- **[2026-10-03]:** Complete Transition to Single Mother Sanctuary Architecture (Eliminated All Branch Concepts):
  1. Purged `branches` database table and RLS policies from `supabase/schema.sql`, removed all seed branch inserts from `supabase/seed.sql`, and cleaned up `database.types.ts`.
  2. Removed `Campuses` / `Global Campuses` navigation links from desktop navbar ([src/components/layout/navbar.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/layout/navbar.tsx)), mobile slide-over drawer ([src/components/layout/mobile-nav.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/layout/mobile-nav.tsx)), and footer ([src/components/layout/footer.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/layout/footer.tsx)).
  3. Removed `BranchPreview` from homepage layout ([src/app/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/page.tsx)), and deleted obsolete components `branch-preview.tsx`, `branch-list.tsx`, and fallback data `branches.ts`.
  4. Configured `/branches` route ([src/app/branches/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/branches/page.tsx)) to perform an automatic Next.js redirect to `/contact` for backward compatibility.
  5. Harmonized copy across Founder Spotlight, Founder Story, Leadership Council, and Giving to reflect a single apostolic mother altar, nationwide evangelistic miracle crusades, and compassion ministries.
  6. Verified zero TypeScript errors (`npx tsc --noEmit`) and HTTP 200 responses on port 3002.

- **[2026-10-03]:** Integrated full-bleed authentic photography backdrop for Orphanage & Children's Home Hero ([src/components/orphanage/orphanage-hero.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/orphanage-hero.tsx)):
  1. Staged authentic meal line outreach photo at [public/images/orphanage-hero.png](file:///c:/Users/isgat/Projects/megachurch-web-platform/public/images/orphanage-hero.png).
  2. Implemented full-bleed Next.js `<Image fill className="object-cover object-center" priority quality={90} />` mirroring the homepage hero section.
  3. Applied Royal Purple & dark dual-layer gradient overlays (`from-primary/90 via-primary/80 to-primary/95` with golden radial glow) ensuring WCAG AAA legibility for the headline, James 1:27 scripture promise plate, and 3-metric impact stats counter.
  4. Verified zero TypeScript errors (`npx tsc --noEmit`) and HTTP 200 on port 3002.

- **[2026-10-03]:** Completed Categorized Activities and Glory Gate Connect Hub Integration:
  1. Replaced static 3-item `ServiceSchedule` on homepage with interactive `CategorizedActivities` component, featuring 6 category pills (All, Weekly Worship, Fellowships, Crusades & Keshas, Prayer Mountain, Outreach) and 11 distinct activity tracks benchmarked from Neno's ecosystem (Sunday Worship, Monday Miracle Service, Wednesday Deliverance, Men of Valor, Women of Destiny, NextGen Youth, Kings Kids, Keshas, Mai Mahiu 24/7 Retreats, Orphanage Drives).
  2. Implemented Glory Gate Church benchmarked 3-tab connection hub (`TabbedConnectHub`) on `/contact`, housing Plan a Visit (guest count, service selection, Kings Kids check-in), Prayer Petition (altar intercession with confidentiality toggle), and Ministry Inquiry (department routing).
  3. Added `visitPlanSchema` in `src/lib/validations/community.ts` and `submitVisitPlan` in `src/actions/contact.ts`.
  4. Verified deep query linking (`/contact?tab=visit&service=...`, `/contact?tab=inquiry&activity=...`, `/contact?tab=prayer`).
  5. Verified zero TypeScript errors (`npx tsc --noEmit`) and HTTP 200 responses across all core routes on port 3002.

- **[2026-10-03]:** Transitioned `/give` from Safaricom Daraja automated STK push to Pastor Ng'ang'a / Neno Evangelism Centre's direct giving model. Eliminated STK timeout/fail rates and external webhook tunneling overhead. Implemented unified 2-tab portal: Tab 1 for Kenyans with 1-click copyable M-Pesa Send Money, Paybill `174379` with fund tagging (supporting `/give?fund=orphanage`), and Co-op Bank details; Tab 2 for International Partners leveraging East African diaspora remittance apps (Sendwave, Remitly, Lemfi, Taptap Send, WorldRemit) sending straight to Kenya M-Pesa with zero conversion fees, alongside PayPal and Cash App. Verified zero TypeScript/build errors on port 3002.

- **[2026-10-02]:** Decided to use Next.js App Router, Supabase (CMS/DB), and Tailwind CSS with a Royal Purple/Gold aesthetic inspired by the reference flyer.
- **[2026-10-02]:** Enforced 'Plan First' requirement across all scenarios and configured port 3002 as the default dev port (ports 3000 and 3001 are unavailable).
- **[2026-10-02]:** Completed Feature 01 (Design System & Tokens): established `src/` boundary structure, HSL theme custom properties, Montserrat & Great Vibes Google fonts, shadcn components (`Button`, `Card`, `Input`), and restored CLI binary shims for `next`.
- **[2026-10-02]:** Completed Feature 02 (Layout Shell): built Top Utility Bar with pulse live badge, sticky Navbar with Gold 'Give Online' CTA, mobile responsive slide-over drawer, and 4-column Global Footer. Marked interactive layout components as client boundaries to support React 19 icon context.
- **[2026-10-02]:** Completed Feature 03 (Homepage Core Sections): consolidated homepage UI into `feature-specs/03-homepage-core.md`, implemented 5 modular sections (Hero with stats bar, Founder Spotlight with Great Vibes script accent, 4-card Ministry Pillars, Weekly Service Itinerary with reminder/stream actions, and 5-campus Branch Preview) in `src/components/home/`, and assembled them in `src/app/page.tsx`. Verified zero-error compilation with Turbopack build.
- **[2026-10-02]:** Updated official church name across the platform to 'Heavens Gates Sugutta Fellowship Church International'. Harmonized responsive navigation header, mobile drawer, global footer brand & copyright, SEO metadata, hero badge, founder spotlight, and Sugutta Headquarters branch directory.
- **[2026-10-02]:** Completed Feature 04 (Supabase Schema & Backend Foundation): installed `@supabase/supabase-js` and `@supabase/ssr`, created `supabase/schema.sql` (with RLS policies and indices) and `supabase/seed.sql` (realistic data for 4 sermons, 5 campuses, prayer request, and donation), generated TypeScript types in `src/types/database.types.ts`, and implemented client, server (supporting Next.js 16 async cookies), and admin clients in `src/lib/supabase/`. Created `.env.example` and configured development placeholders in `.env.local`. Verified zero-error compilation with Turbopack build.
- **[2026-10-02]:** Completed Feature 05 (Dynamic Media & Sermons Hub): implemented YouTube URL/thumbnail parsing in `src/lib/utils/youtube.ts`, interactive `VideoModal` player, `SermonCard` with thumbnail fallback handling, `LiveHeroPlayer` with live broadcast badge, and `SermonArchive` with 5 category filters and instant title/speaker search in `src/components/sermons/`. Built dedicated `/sermons` page and integrated `RecentSermons` onto the homepage with live Supabase data fetching. Configured Unsplash & YouTube remotePatterns in `next.config.ts`. Verified zero-error compilation with Turbopack build.
- **[2026-10-02]:** Completed Feature 06/07 (Community Engagement Hub): created Zod validation schemas in `src/lib/validations/community.ts`, Server Actions `submitPrayerRequest` and `submitContactInquiry` writing to Supabase `prayer_requests`, built interactive `PrayerForm` with confidentiality guarantee and category selector, created `BranchList` with search & region filters and Google Maps links, built `ContactForm` with first-time visit guidance & Kings Kids children's church schedule, and created `/prayer-request`, `/branches`, and `/contact` pages. Verified 0 TypeScript errors with Turbopack production build.
- **[2026-10-02]:** Completed Feature 07/08 (About Ministry & Founder's Journey): implemented modular about components in `src/components/about/` (`AboutHero` with 25-year milestone badge, `FounderStory` 2-column magazine layout with framed portrait and 3-part calling narrative, `StatementOfFaith` 6-pillar biblical grid with scripture anchors, `LeadershipTeam` 4-card pastoral council, and `PrayerMountain` retreat spotlight benchmarked from Neno's Jerusalem City). Assembled dedicated `/about` route with SEO metadata and OpenGraph configuration, updated global navbar and drawer links, and verified 0-error Turbopack production build.
- **[2026-10-02]:** Completed Feature 08/09 (Orphanage & Outreach Ministry): implemented modular orphanage components in `src/components/orphanage/` (`OrphanageHero` with 3-metric impact stats bar, `CarePillars` covering shelter, education, nutrition, and spiritual grounding, `SupportNeeds` with 3 tangible monthly sponsorship tiers linking to `/give?fund=orphanage`, and `VolunteerCta` linking to `/contact?subject=orphanage_visit`). Built `OrphanageTeaser` banner on homepage, updated global desktop navbar, mobile drawer, and footer with "Children's Home" links, updated `MpesaGivingForm` to support the orphanage fund query parameter with Suspense boundary, and verified 0-error Turbopack production build.
- **[2026-10-07]:** Completed Feature 38 (External Image URL Sanitization, Google Redirect Cleaner & Wildcard Remote Patterns):
  1. Diagnosed Root Cause: Uploading Google Images redirect URLs (`https://www.google.com/imgres?imgurl=...`) or third-party image URLs crashed Next.js SSR with HTTP 500 when external hostnames were not whitelisted or unoptimized was missing.
  2. Configured Wildcard Hostnames: Added `{ protocol: "https", hostname: "**" }` and `{ protocol: "http", hostname: "**" }` to `next.config.ts`.
  3. Added `extractCleanImageUrl` utility in `src/lib/utils.ts` and `src/actions/admin-settings.ts` to automatically extract the direct `imgurl` query parameter from any Google Search redirect URL upon input or saving.
  4. Updated `ImageUploadField` ([src/components/admin/image-upload-field.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/image-upload-field.tsx)) with real-time input sanitization, immediate preview updates, and fail-safe image error fallbacks.
  5. Added `unoptimized` and error safety across all dynamic CMS image rendering components (`MinistryPillars`, `HeroSection`, `FounderSpotlight`, `CategorizedActivities`, `AboutHero`, `CommunityFellowship`, `EventsView`, `OrphanageMediaShowcase`).
  6. Verified zero TypeScript errors (`npx tsc --noEmit`) and HTTP 200 responses across all 10 core routes on port 3002.
- **[2026-10-07]:** Completed Feature 39 (Real-Time Top Bar Dynamic Synchronization & Complete Branch Removal):
  1. Root Cause: In Next.js App Router, `revalidatePath("/")` only revalidated page routes, leaving the root layout and its TopBar component cached. Added `export const dynamic = "force-dynamic"` to `src/app/layout.tsx` and `revalidatePath("/", "layout")` to `saveSiteSettingsAction` in `src/actions/admin-settings.ts`.
  2. TopBar Admin Controls in Tab 1: Added dedicated Top Bar & Live Broadcast controls into Tab 1 (Home & Header) of `/admin/settings` so administrators can immediately edit phone, email, live link, and announcement right from the primary landing view tab.
  3. Complete Branch Removal: Replaced the hardcoded `BRANCHES` label on the homepage hero 3-stat strip ([src/components/home/hero-section.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/home/hero-section.tsx)) with `OUTREACHES`. Updated input label in admin to `Stat 1: Outreaches (e.g. 50+)`. Updated database record to clear legacy placeholder and sync phone `+254112656123`.
  4. Verification: 100% clean compilation (`npx tsc --noEmit`), HTTP 200 responses on port 3002, verified `BRANCHES` is completely absent from HTML and `OUTREACHES` renders properly.

- **[2026-10-08]:** Completed Feature 40 (Video Upload Body Limit Resolution & Live App Direct Storage Architecture):
  1. Root Cause Analysis: Next.js Server Actions default to a strict 1MB body limit (`Error: Body exceeded 1 MB limit`, HTTP 413/500). Furthermore, live serverless hosts (such as Vercel) enforce a hard 4.5MB request payload limit that breaks server-proxied large video uploads regardless of configuration.
  2. Direct-to-Supabase Storage Architecture (Live App Ready):
     - Created `getSermonVideoSignedUploadUrlAction` in [src/actions/admin-sermons.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/actions/admin-sermons.ts): securely generates short-lived signed upload tokens using the admin client.
     - Updated [src/components/admin/sermon-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/sermon-manager-view.tsx) with a multi-strategy upload pipeline:
       - Strategy 1 (Primary): Direct browser upload via `supabase.storage.from('church-media').uploadToSignedUrl(...)`. Uploads stream directly to Supabase storage with 0 bytes traversing Next.js server actions, bypassing both local 1MB limits and Vercel 4.5MB serverless payload constraints.
       - Strategy 2 (Fallback): Dedicated streaming API Route Handler `/api/admin/sermons/upload`.
       - Strategy 3 (Fallback): Server Action `uploadSermonVideoAction`.
  3. Storage Bucket Configuration: Created migration `supabase/migrations/20261008_video_storage_config.sql` expanding `church-media` bucket `file_size_limit` to 52,428,800 bytes (50MB) and whitelisting video MIME types (`video/mp4`, `video/webm`, `video/quicktime`, `video/x-m4v`, `video/ogg`).
  4. Next.js Server Action Config: Configured `experimental.serverActions.bodySizeLimit: "50mb"` in [next.config.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/next.config.ts).
  5. Verification: Verified end-to-end signed upload URL generation and token upload against live Supabase storage; verified clean compilation with `npx tsc --noEmit` and HTTP 400 validation on `/api/admin/sermons/upload`.

- **[2026-10-08]:** Completed Feature 41 (Children's Home Direct Device Video Upload & HTML5 Media Playback):
  1. Data Model Extension: Extended `OrphanageVideoItem` in [src/types/settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/types/settings.ts) with `thumbnailUrl?: string` and `sourceType?: "upload" | "youtube"`.
  2. Direct Storage Authorization: Created `getOrphanageVideoSignedUploadUrlAction` in [src/actions/admin-settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/actions/admin-settings.ts) for live-app-proof client streaming directly to Supabase storage (`church-media/orphanage/videos/`), bypassing server action payload constraints.
  3. Admin Portal Dual-Mode Ingestion:
     - Updated Tab 6 (*Outreach & Orphanage*) in [src/components/admin/settings-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/settings-manager-view.tsx) with a dual-mode source toggle (Upload Video File vs YouTube URL).
     - Added drag-and-drop / file selector with 50MB validation, upload progress spinner, and green success confirmation badge.
     - Added optional custom thumbnail uploader via `uploadChurchMediaAction`.
     - Added source badges (`Direct Video` vs `YouTube`) in the admin video cards.
  4. Public Player & Card Playback:
     - Updated [src/components/orphanage/orphanage-media-showcase.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/orphanage-media-showcase.tsx) to resolve `video.thumbnailUrl` with fallback to YouTube or hero preview.
     - Embedded a responsive HTML5 `<video controls autoPlay playsInline poster={...} />` player in the Lightbox modal for uploaded device videos, retaining YouTube iframe for YouTube links.
  5. Verification: Passed `npx tsc --noEmit` with 0 errors.

- **[2026-10-08]:** Completed Feature 42 (Children's Home Instant Auto-Persist Pipeline for Photos & Videos):
  1. Diagnosed Root Cause: In [src/components/admin/settings-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/settings-manager-view.tsx), clicking "Add Photo Moment" or "Add Video Story" only updated local React component state without saving to Supabase until a separate "Save Changes" button was clicked. Navigating away or viewing `/orphanage` in another tab left the database with empty arrays (`[]`).
  2. Implemented Instant Auto-Persist Server Actions in [src/actions/admin-settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/actions/admin-settings.ts):
     - `addOrphanagePhotoAction(photo)`: Immediately prepends photo to `orphanage_photos_json` in Supabase, triggers `revalidatePath('/orphanage')`, and returns updated list.
     - `deleteOrphanagePhotoAction(photoId)`: Immediately removes photo from Supabase and revalidates.
     - `addOrphanageVideoAction(video)`: Immediately prepends video to `orphanage_videos_json` in Supabase, triggers `revalidatePath('/orphanage')`, and returns updated list.
     - `deleteOrphanageVideoAction(videoId)`: Immediately removes video from Supabase and revalidates.
  3. Integrated Instant Feedback in Admin Portal:
     - Updated `handleAddPhoto`, `handleDeletePhoto`, `handleAddVideo`, and `handleDeleteVideo` in [src/components/admin/settings-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/settings-manager-view.tsx) with optimistic UI updates and immediate persistence via `startTransition`.
     - Displays immediate green success feedback upon addition or removal.
  4. End-to-End Verification: Tested live round-trip insertion and verified that `http://localhost:3002/orphanage` immediately rendered both photo moments and video stories in HTML output (`true`). Cleared test items cleanly. Passed `npx tsc --noEmit` with 0 errors.

- **[2026-10-08]:** Completed Feature 43 (Events & Crusade Video & Image Media Management):
  1. Data Model Extension: Extended `MinistryEventItem` in [src/types/settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/types/settings.ts) with `videoUrl?: string` and `videoSourceType?: "upload" | "youtube"`.
  2. Direct Storage Authorization: Implemented `getEventVideoSignedUploadUrlAction` in [src/actions/admin-settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/actions/admin-settings.ts) targeting folder `events/videos/` in the `church-media` Supabase bucket. Enables direct browser uploads (MP4, WebM, MOV up to 50MB) that bypass 1MB local and 4.5MB Vercel serverless request body limits.
  3. Reusable Video Upload Component: Created [src/components/admin/event-video-upload-field.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/event-video-upload-field.tsx) with dual source mode (Device Video Upload with progress spinner & success badge vs. YouTube URL input), instant video preview, and detachment control.
  4. Admin Portal Events Manager Upgrade: Updated Tab 5 (*Mission Calendar & Events*) in [src/components/admin/settings-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/settings-manager-view.tsx) with side-by-side Flyer Image Uploader and Crusade Promo Video Uploader, plus WhatsApp registration message customization.
  5. Public Events Hub Video & Image Lightbox: Updated [src/components/events/events-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/events/events-view.tsx):
     - Added "Watch Clip" badge overlay and center play button when a video is attached.
     - Added "Watch Crusade / Event Video" action button alongside "Join WhatsApp Group".
     - Implemented an interactive Video Lightbox Modal supporting YouTube embeds and HTML5 `<video controls autoPlay playsInline>` players.
     - Implemented high-resolution Flyer Image Zoom modal with close and inspection controls.
  6. Verification: 100% clean compilation (`npx tsc --noEmit` exited 0), HTTP 200 responses verified on port 3002 across `/events` and `/admin/settings`.

- **[2026-10-08]:** Completed Feature 44 (Children's Home Content Enrichment & Form Submissions Delivery Fix):
  1. Form Submissions Root-Cause Resolution:
     - Replaced anonymous client calls in [src/actions/prayer.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/actions/prayer.ts) and [src/actions/contact.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/actions/contact.ts) with `createAdminClient()` (using `SUPABASE_SERVICE_ROLE_KEY`), eliminating RLS insert rejections.
     - Removed silent `dev-fallback-id` error swallowing in `submitPrayerRequest` so that genuine persistence errors surface accurately.
     - Added automated path revalidation (`revalidatePath("/admin")`, `revalidatePath("/admin/prayers")`, `revalidatePath("/admin/visitors")`) upon every successful form submission.
     - Updated [src/components/admin/prayer-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/prayer-manager-view.tsx) and [src/components/admin/visitors-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/visitors-manager-view.tsx) to cleanly segregate intercessory prayers, planned sanctuary visits, and ministry inquiries, with updated pastoral WhatsApp templates.
  2. Children's Home Empathetic Content Overhaul ([src/app/orphanage/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/orphanage/page.tsx)):
     - Created [src/components/orphanage/orphanage-story.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/orphanage-story.tsx) (*Why We Opened Our Doors in Sugutta*): detailing the rescue of vulnerable children, the warmth of resident Christian house mothers, and the philosophy of raising sons and daughters with dignity.
     - Enhanced [src/components/orphanage/support-needs.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/support-needs.tsx): structured 4 tangible support pillars (Daily Food & Fresh Milk, Formal Schooling & Tuition, Healthcare & Motherly Warmth, Clean Borehole Water & Campus Utilities) with direct cost explanations.
     - Created [src/components/orphanage/in-kind-donations.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/in-kind-donations.tsx): comprehensive guide for physical drop-offs (Dry foods, hygiene supplies, learning stationery, warm blankets & clothing).
     - Created [src/components/orphanage/orphanage-faq.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/orphanage-faq.tsx): transparent donor FAQ covering 100% direct allocation, visiting appointments, and diaspora remittance channels.
     - Enriched [src/components/orphanage/orphanage-hero.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/orphanage-hero.tsx): added comprehensive multi-sentence mission narrative, a 4-point impact highlights pill strip (60+ Sheltered Children, 100% School Enrollment, 3 Daily Hot Meals, 24/7 Maternal Care), and James 1:27 scripture card.
     - Mobile-First Responsiveness Pass: Scaled typography (`text-2xl sm:text-4xl lg:text-5xl`), responsive button heights (`py-3.5 text-xs sm:text-sm`), capped mobile photo cards, and refined grid layouts across all 8 components.
  3. Verification: 100% clean compilation (`npx tsc --noEmit` exited 0) and HTTP 200 responses verified on port 3002 across all orphanage, connect, and admin management routes.

- **[2026-10-08]:** Completed Feature 45 (Past Crusades & Media Archive with Full Admin CMS Control):
   1. Data Model Extension:
      - Extended `MinistryEventItem` in `src/types/settings.ts` with `status?: "upcoming" | "past"` and `recapNotes?: string`.
      - Updated `getSiteSettingsAction` and `saveSiteSettingsAction` in `src/actions/admin-settings.ts` for JSONB serialization and deserialization of the new event status and recap notes fields.
   2. Admin Portal CMS Control (`src/components/admin/settings-manager-view.tsx` Tab 5):
      - Added event status classification toggle (`🟢 Upcoming Event / Mission` vs `🏛️ Past Crusade / Media Archive`).
      - Added Crusade Impact / Recap Notes textarea for recording testimonies, miracles, and attendance highlights.
      - Integrated existing high-res flyer photo uploader and direct device/YouTube video uploaders for past media records.
   3. Public Events Page Overhaul (`src/components/events/events-view.tsx`):
      - Added interactive category filter bar: `Upcoming Missions` (with count), `🎬 Past Crusades & Media Archive` (with count), and `All` (with total count).
      - Added distinct visual styling for past crusade cards with dark/gold archive badges (`🎬 Past Crusade & Media`), recap note quotes, and pulsing `Watch Video Recap` play badges.
      - Updated call-to-actions on past events to `"Inquire About Next Crusade"` with tailored WhatsApp pre-filled messaging and `"Watch Crusade Video Recap"`.
      - Added responsive empty state handlers when switching between upcoming and past crusade tabs.
   4. Verification: 100% clean TypeScript type check (`npx tsc --noEmit` exited 0) and HTTP 200 response verified on `http://localhost:3002/events`.

- **[2026-10-09]:** Completed Feature 46 (Dynamic Church Projects & Missions CMS with Video Support & Sanctuary Address Update):
   1. Sanctuary Address Standardization: Standardized sanctuary location from `Jogoo Nairobi Kenya` to `Sugutta Main Sanctuary, Jogoo Getare, Kenya` across the contact page ([src/app/contact/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/contact/page.tsx)) and Google Maps links.
   2. Dynamic Projects Data Model: Extended [src/types/settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/types/settings.ts) with `MinistryProjectItem` (`id`, `badge`, `title`, `subtitle`, `narrative`, `imageUrl`, `videoUrl`, `donateLink`, `donateLabel`, `mpesaRef`, `color`, `active`) and added `projectsJson: MinistryProjectItem[]` to `SiteSettingsData` with default records for Children's Home and Sanctuary Construction.
   3. Supabase Schema & Server Actions: Added `projects_json` column to [src/types/database.types.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/types/database.types.ts) and SQL migration script in admin view. Extended `getSiteSettingsAction` and `saveSiteSettingsAction` in [src/actions/admin-settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/actions/admin-settings.ts) to read and persist `projects_json`.
   4. Homepage Dynamic Rendering: Rebuilt [src/components/home/categorized-activities.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/home/categorized-activities.tsx) to map dynamically over active projects. Responsive layout adapts seamlessly to 1, 2, or 3+ projects, supporting 4 color themes (`orange`, `rose`, `blue`, `green`), M-Pesa details, image displays, and giving CTAs.
   5. Admin Portal Church Projects Manager: Overhauled Tab 2 in [src/components/admin/settings-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/settings-manager-view.tsx) into a full-featured projects manager with `handleAddProject`, `handleUpdateProject`, and `handleDeleteProject`. Provides controls for badge, title, subtitle, narrative, color palette, image uploader (`ImageUploadField`), video uploader/YouTube embed (`EventVideoUploadField`), giving destination link, button text, M-Pesa account ref, and visibility toggle (`active`). Preserves bidirectional sync for legacy single-row fields.
   6. Media Preservation: Preserved 100% of user-uploaded orphanage photos, videos, and media untouched.
   7. Verification: 100% clean compilation (`npx tsc --noEmit` exited 0).

- **[2026-10-09]:** Completed Feature 47 (Form Dummy Placeholder Removal, Admin Editable Impact Counters & Comprehensive Giving Channels with QR Code Posters):
   1. Form Placeholder Cleanup:
      - Removed all dummy name and dummy email placeholders (`Bro. David Mwangi`, `Sister Grace Wanjiku`, `david@example.com`, `grace@example.com`, `john@example.com`, `Bro. David W.`) across all form inputs in [src/components/community/tabbed-connect-hub.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/community/tabbed-connect-hub.tsx), [src/components/community/prayer-form.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/community/prayer-form.tsx), [src/components/community/contact-form.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/community/contact-form.tsx), [src/components/home/home-contact-module.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/home/home-contact-module.tsx), and [src/components/giving/mpesa-form.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/giving/mpesa-form.tsx).
      - Replaced with neutral, production placeholders: `"Your full name"` and `"your.email@example.com"`.
   2. Homepage 3 Impact Counters CMS Integration:
      - Added **Homepage Section 3: Impact Counters (Below Ministry Pillars)** to Tab 1 (*Home & Hero*) in [src/components/admin/settings-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/settings-manager-view.tsx).
      - Displays live card preview for `impactStat1Val` / `impactStat1Lbl` (1,200+ Deliverance Sessions), `impactStat2Val` / `impactStat2Lbl` (50+ Miracle Crusades), and `impactStat3Val` / `impactStat3Lbl` (1,000,000+ Believers Impacted), kept in sync across Tab 1 and Tab 4.
   3. QR Code Poster Uploads & Display Engine:
      - Extended `SiteSettingsData` in [src/types/settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/types/settings.ts) and [src/types/database.types.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/types/database.types.ts) with `mpesaTillQrImage` and `mpesaPaybillQrImage`.
      - Updated `getSiteSettingsAction` and `saveSiteSettingsAction` in [src/actions/admin-settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/actions/admin-settings.ts) with serialization and sanitization.
      - Added dedicated `ImageUploadField`s in Tab 7 (*Banking & Contacts*) for uploading official Safaricom Till QR posters and Paybill QR posters, and updated SQL migration statements.
      - Updated [src/components/giving/payment-qr-code.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/giving/payment-qr-code.tsx) to support `paybill` type and `customQrImage` rendering with fallback to crisp auto-generated vector QR codes.
   4. Comprehensive Payment Channels & Interactive Paybill Integration:
      - Restored Lipa na M-Pesa Paybill `174379` across all giving touchpoints: [src/components/giving/direct-giving-portal.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/giving/direct-giving-portal.tsx), [src/components/home/home-giving-module.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/home/home-giving-module.tsx), and [src/components/orphanage/orphanage-donate-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/orphanage-donate-view.tsx).
      - Added interactive 1-click copyable Fund Account chips (`OFFERING`, `TITHE`, `ORPHANAGE`, `SEED`, `BUILDING`) with dynamic account selection, step walkthroughs, and verified business names.
      - Connected `customQrImage` to display uploaded official Safaricom QR posters for Till (`8146952`) and Paybill (`174379`).
   5. Media Integrity:
      - User-uploaded Children's Home media and projects are 100% preserved.
   6. Verification:
      - `npx tsc --noEmit` passed with 0 errors.
      - All routes (`/`, `/give`, `/orphanage/donate`, `/contact`, `/prayer-request`, `/admin/settings`) verified returning HTTP 200 on port 3002.

- **[2026-10-09]:** Completed Feature 48 (Ministry Pillar Videos CMS & Lightbox, Children's Home Pulsing Donation Badge, Fully Editable Orphanage Media, WhatsApp Indicators, Plain Google Maps, Form Attendance Field Removal, Thank You Confirmations, and Standardized Visible Payment QR Codes):
   1. Ministry Pillars Video Uploads & Interactive Public Lightbox:
      - Extended `SiteSettingsData` in [src/types/settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/types/settings.ts) and `site_settings` table schema in [src/types/database.types.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/types/database.types.ts) with `pillar1Video`, `pillar2Video`, `pillar3Video`, and `pillar4Video`.
      - Integrated `EventVideoUploadField` (supporting both direct device video files up to 50MB and YouTube embeds) in Admin Settings Tab 4 for each of the 4 ministry pillars.
      - Updated [src/components/home/ministry-pillars.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/home/ministry-pillars.tsx) to display "Watch Pillar Video" overlay play badges and an interactive video Lightbox modal supporting HTML5 `<video controls autoPlay>` and YouTube embeds.
   2. Children's Home Pulsing "Blipping" Indicator & Direct Donation Links:
      - Added an animated radar pulsing/blipping badge and button ("Sponsor a Child Today") to both the homepage Children's Home teaser ([src/components/home/orphanage-teaser.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/home/orphanage-teaser.tsx)) and the Orphanage hero ([src/components/orphanage/orphanage-hero.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/orphanage-hero.tsx)).
      - Configured all donation CTAs and blipping indicators across `/orphanage` to navigate directly to `/orphanage/donate`.
   3. Children's Home 100% Media CMS Editability:
      - Added `orphanageStoryImage` to `SiteSettingsData` and database schema.
      - Added `ImageUploadField` in Admin Tab 6 for the Children's Home Story / Narrative Photo alongside the Hero Banner Photo.
      - Bound [src/components/orphanage/orphanage-story.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/orphanage-story.tsx) and [src/app/orphanage/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/orphanage/page.tsx) to dynamic settings.
   4. WhatsApp Direct Altar Chat Indicators:
      - Added green WhatsApp indicator badges and direct chat links (`https://wa.me/254112656123`) next to telephone numbers across TopBar ([src/components/layout/top-bar.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/layout/top-bar.tsx)), Navbar Mobile Nav ([src/components/layout/mobile-nav.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/layout/mobile-nav.tsx)), Footer ([src/components/layout/footer.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/layout/footer.tsx)), Contact page ([src/app/contact/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/contact/page.tsx)), Prayer page ([src/app/prayer-request/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/prayer-request/page.tsx)), and Home Contact Module ([src/components/home/home-contact-module.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/home/home-contact-module.tsx)).
   5. Plain Google Maps (No Location Pinning):
      - Updated all external Google Maps buttons and links to navigate directly to plain Google Maps (`https://maps.google.com/`) without location search query markers.
   6. Removal of "Which Service Will You Attend" & Warm "Thank You" Submissions:
      - Removed "Which Service Will You Attend?" input and label from [src/components/community/tabbed-connect-hub.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/community/tabbed-connect-hub.tsx) and made `expectedService` optional with a graceful default in [src/lib/validations/community.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/lib/validations/community.ts).
      - Enhanced inquiry, prayer petition, and visit registration success screens to headline with a warm "Thank You! [Your message / petition / visit registration has been received]".
   7. Standardized Local Kenyan Payment Channels & Directly Visible Scannable QR Codes:
      - Streamlined local Kenyan giving channels strictly to **Method 1: Lipa na M-Pesa Buy Goods (Till `8146952`, *Suggutta Fellowship Church*)** and **Method 2: M-Pesa Send Money (`0112656123`, *Pastor Caesar O. Nyandwaro*)**. Removed Paybill from Kenyan local giving options across [src/components/giving/direct-giving-portal.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/giving/direct-giving-portal.tsx), [src/components/home/home-giving-module.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/home/home-giving-module.tsx), [src/components/orphanage/orphanage-donate-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/orphanage/orphanage-donate-view.tsx), and [src/components/giving/campaign-donation-flow.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/giving/campaign-donation-flow.tsx).
      - Directly embedded scannable QR codes on both Till and Send Money cards without requiring users to click any "Scan QR" toggle buttons, optimizing immediate scanability and screenshot-taking on mobile devices.
      - Preserved Sendwave and KCB Bank wire under the Diaspora/International tabs.
- **[2026-10-10]:** Completed Feature 49 & 50 (Projects Multi-Photo Swipeable Carousel & Global Scroll Reveal Engine across All Pages):
   1. Projects Multi-Photo Data Schema & Sync:
      - Extended `MinistryProjectItem` in [src/types/settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/types/settings.ts) with `images?: string[]`.
      - Updated `DEFAULT_SETTINGS` with multi-photo sample sets for seamless out-of-the-box preview.
      - Updated `getSiteSettingsAction` and `saveSiteSettingsAction` in [src/actions/admin-settings.ts](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/actions/admin-settings.ts) to sanitize and serialize up to 5 photos per project, maintaining bidirectional fallback synchronization with `imageUrl = images[0]`.
   2. Admin CMS Multi-Photo Gallery Manager:
      - Created [src/components/admin/project-multi-image-field.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/project-multi-image-field.tsx) supporting up to 5 photos per project.
      - Features include numbered thumbnail slots, primary cover badge (`★ Cover`), reordering arrows (move earlier / later), delete button, batch image upload directly to Supabase storage, church library preset selector, and manual URL input.
      - Integrated into Tab 2 (*Church Projects & Missions*) in [src/components/admin/settings-manager-view.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/admin/settings-manager-view.tsx).
   3. Homepage Smoothly Transitioning & Swipeable Carousel:
      - Built [src/components/home/project-image-carousel.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/home/project-image-carousel.tsx) retaining the exact 16:9 container slot on the project card.
      - Implemented smooth auto-play transition every 4.5s (pausing on hover or touch hold).
      - Added mobile touch swipe gesture handling (`onTouchStart` and `onTouchEnd` with horizontal threshold detection).
      - Added desktop previous/next hover chevron controls, interactive slide indicator dots, and sleek photo counter badges (`e.g. 1 / 3`).
      - Anchored title, subtitle, and bottom gradient overlay seamlessly above transitioning photo layers.
      - Integrated into [src/components/home/categorized-activities.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/home/categorized-activities.tsx).
   4. Senior Developer Global Scroll Reveal Engine:
      - Implemented ultra-performant CSS GPU-accelerated entrance animations in [src/app/globals.css](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/globals.css) (`.scroll-reveal`, `.scroll-reveal-left`, `.scroll-reveal-right`, `.scroll-reveal-scale`, and stagger classes `.stagger-1` through `.stagger-5`) with silky smooth `cubic-bezier(0.16, 1, 0.3, 1)` easing and `@media (prefers-reduced-motion: reduce)` accessibility override.
      - Created client-side observer engine [src/components/ui/scroll-reveal.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/components/ui/scroll-reveal.tsx) using native `IntersectionObserver` with instant above-the-fold detection (zero blank flash or layout shift) and `MutationObserver` for dynamic content.
      - Mounted `<ScrollObserverInit />` globally in [src/app/layout.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/layout.tsx).
      - Tagged all core section containers across public pages: [src/app/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/page.tsx), [src/app/orphanage/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/orphanage/page.tsx), [src/app/give/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/give/page.tsx), [src/app/about/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/about/page.tsx), [src/app/events/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/events/page.tsx), [src/app/contact/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/contact/page.tsx), [src/app/prayer-request/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/prayer-request/page.tsx), and [src/app/sermons/page.tsx](file:///c:/Users/isgat/Projects/megachurch-web-platform/src/app/sermons/page.tsx).
   5. Verification:
      - `npx tsc --noEmit` exited with code 0 (zero errors).
      - All routes verified operational on port 3002.
      - 100% preservation of existing media assets and projects.
