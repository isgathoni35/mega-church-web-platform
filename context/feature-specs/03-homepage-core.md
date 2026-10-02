# Feature Specification: 03 - Homepage Core Sections

## 1. Goal
Replace the test placeholders in `app/page.tsx` with the full homepage structure, benchmarked from the Neno Evangelism homepage architecture and styled with the royal purple, white, and gold aesthetic.

## 2. Structural Breakdown & Component Mapping
Build modular components inside `components/home/` and assemble them in sequence on `app/page.tsx`:

### A. Hero Section (`components/home/hero-section.tsx`)
* **Visuals:** Deep purple backdrop with subtle radial gold ambient glow.
* **Content:**
  * Tagline badge: *"Welcome to Heavens Gates Sugutta Fellowship Church International"*
  * Main Headline: *"Experience the Miraculous Power of God & Divine Deliverance"*
  * Subtext: *"Preaching the uncompromised Word, breaking chains, and raising a generation empowered in authority and faith."*
  * Dual CTAs:
    * Primary (Gold): **Watch Live Service** (links to `/sermons?live=true` with play icon).
    * Secondary (Outlined Purple/White): **Plan Your Visit** (links to `/contact`).
* **Live Ministry Stats Bar:** A horizontal bar beneath the CTAs displaying 4 key metrics:
  * `50+` Global Branches
  * `1M+` Souls Impacted
  * `25+` Years of Anointing
  * `24/7` Prayer & Deliverance Altar

### B. Founder & Leadership Spotlight (`components/home/founder-spotlight.tsx`)
* **Structure:** 2-column layout (Desktop) / Stacked (Mobile).
* **Left Column:** Framed portrait container with a gold metallic border and badge *"Anointed Vessel of God"*.
* **Right Column:**
  * Script Accent: *"A Testimony of Divine Grace"*
  * Headline: *"Leading Millions into Spiritual Freedom & Overflow"*
  * Quote Block in Great Vibes font: *"I have given you power to tread on serpents and scorpions, and over all the power of the enemy."*
  * Bio Paragraph: Highlighting a humble beginning transformed by divine intervention into a global deliverance ministry.
  * CTA: **Read Full Story** (button linking to `/about`).

### C. Ministry Pillars Grid (`components/home/ministry-pillars.tsx`)
* **Heading:** *"Our Divine Mandate"*
* **Subheading:** *"Four foundational pillars upholding our mission across nations."*
* **4-Card Grid:**
  1. **Deliverance & Healing:** Breaking curses, spiritual freedom, and supernatural breakthrough.
  2. **Global Crusades:** Massive outdoor evangelistic missions bringing lost souls to Christ.
  3. **Prophetic Word & Discipleship:** In-depth biblical teaching to establish believers in righteousness.
  4. **Compassion & Outreach:** Active humanitarian support for the broken, widows, and vulnerable communities.
* Each card must feature a distinct Lucide icon, hover elevation, and gold top border accent.

### D. Weekly Service Itinerary (`components/home/service-schedule.tsx`)
Directly reflecting the schedule established on the ministry flyer:
* **Sunday Explosive Worship:** `10:00 AM` (Main Sanctuary & Global Broadcast) + Children's Church (`10:00 AM`).
* **Monday Inspiration "Live":** `7:00 PM` (Prophetic Word & Interactive Broadcast).
* **Wednesday Prophetic Bible Study:** `7:00 PM` (Deep Exposition of Scripture & Prayer Altar).
* Card layout with quick "Set Reminder / Add to Calendar" and "Watch Online" action buttons.

### E. Campus & Branch Directory Preview (`components/home/branch-preview.tsx`)
* **Headline:** *"Find a Campus Near You"*
* Grid featuring key headquarters and regional branches (e.g., Sugutta Sanctuary Headquarters, Mombasa Coastal Sanctuary, Nakuru, Eldoret, St. Louis Campus).
* Card displays: Campus Name, Resident Pastor in charge, Service Times, and a "Get Directions" link.
* Bottom CTA: **View All 50+ Branches** (linking to `/branches`).

## 3. Implementation Guidelines
* All images should use Next.js `<Image />` with clean aspect ratios, fallbacks, or styled placeholder avatars if asset paths are not yet provided.
* Keep styling strictly tied to theme variables in `globals.css`.
* Zero external CSS files; use Tailwind utility classes.
* Every interactive button must have accessible labels and keyboard focus rings.

## 4. Verification Checklist
- [ ] `npm run build` compiles with zero TypeScript and ESLint errors.
- [ ] `app/page.tsx` renders all 5 sections in correct vertical hierarchy.
- [ ] Layout is fully responsive (stacks seamlessly on mobile viewports `375px` to `768px`).
- [ ] Buttons and links point to appropriate route paths (`/sermons`, `/about`, `/branches`, `/contact`).
- [ ] `context/06-progress-tracker.md` is updated with Phase 3 marked as completed.