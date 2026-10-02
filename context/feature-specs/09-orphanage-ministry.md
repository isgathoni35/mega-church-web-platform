# Feature Specification: 08 - Orphanage & Outreach Ministry

## 1. Goal
Build a dedicated, emotionally compelling page for the church's Children's Home / Orphanage (`/orphanage`), update the navigation and footer to include links to this ministry, and add an outreach teaser section to the homepage.

## 2. Design & Architecture Decisions
* **Visual Tone:** Maintain the royal purple and gold theme, but incorporate softer white/cream backgrounds in the core content areas to feel nurturing, warm, and approachable.
* **Typography:** Use the Great Vibes script font for emotive headers (e.g., *"Pure and undefiled religion..."*).
* **Component Boundaries:** 
  * Create modular components within `components/orphanage/`.
  * Ensure the page flows logically from the mission, to the areas of care, to tangible giving options.

## 3. Structural Breakdown & Sections

### A. Orphanage Hero Banner (`components/orphanage/orphanage-hero.tsx`)
* **Script Accent:** *"A Haven of Hope & Restoration"*
* **Headline:** *"Empowering the Next Generation"*
* **Subtext:** *"Our Children's Home is dedicated to rescuing vulnerable, orphaned, and abandoned children, providing them with a safe home, quality education, and the unconditional love of Christ."*
* **Impact Stats Bar (Gold accented):**
  * `Sheltered Children` (e.g., "60+")
  * `Daily Meals Provided` (e.g., "100%")
  * `School Enrollment` (e.g., "100%")

### B. The 4 Pillars of Care Grid (`components/orphanage/care-pillars.tsx`)
* **Headline:** *"Comprehensive Care"*
* **4-Card Grid (with Lucide icons):**
  1. **Nurturing Shelter (Home Icon):** Safe, clean dormitories and dedicated house mothers providing daily pastoral and maternal care.
  2. **Quality Education (BookOpen Icon):** Full tuition, uniforms, and supplies from early childhood through secondary school.
  3. **Health & Nutrition (HeartPulse Icon):** Three balanced meals daily and regular medical check-ups.
  4. **Spiritual Grounding (Cross/Church Icon):** Daily devotions, mentorship, and raising children in the fear of the Lord.

### C. Tangible Support & Wishlist (`components/orphanage/support-needs.tsx`)
* **Headline:** *"Partner With Us: How You Can Help"*
* **Layout:** A clean, 3-column pricing-style card layout showing tangible impact:
  1. **Feed a Child:** e.g., KES 3,000 / $25 per month.
  2. **Education Pack:** e.g., KES 5,000 / $40 for uniforms and books.
  3. **Full Sponsorship:** e.g., KES 10,000 / $80 covering all living and educational expenses for one child.
* **Action:** Each card contains a button saying **"Sponsor Now"** linking to `/give?fund=orphanage`.

### D. Visit & Volunteer CTA (`components/orphanage/volunteer-cta.tsx`)
* A full-width banner with a deep purple background.
* **Text:** *"Want to spend time with the children or arrange a group visit? We welcome partners, volunteers, and well-wishers."*
* **Button (Outlined Gold):** **"Arrange a Visit"** linking to `/contact?subject=orphanage_visit`.

### E. Global Navigation & Homepage Updates
* **Header & Footer:** Add a link to "Children's Home" in the desktop dropdown (or main navbar) and under "Ministries" in the footer.
* **Homepage Teaser (`app/page.tsx`):** Insert a small banner section between the Ministry Pillars and the Branch preview stating *"Discover Our Children's Home"* with a button linking to `/orphanage`.

## 4. Verification Checklist
- [ ] `npm run build` compiles with zero TypeScript and ESLint errors.
- [ ] `/orphanage` page renders cleanly with responsive hero, pillars, needs, and CTA sections.
- [ ] The Navbar and Footer successfully link to `/orphanage`.
- [ ] The Homepage now includes the Outreach/Orphanage teaser.
- [ ] All "Sponsor Now" buttons successfully pass the `?fund=orphanage` query parameter to the `/give` route.
- [ ] `context/06-progress-tracker.md` is updated with Phase 8 marked as completed.