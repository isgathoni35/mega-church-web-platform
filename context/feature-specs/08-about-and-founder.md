# Feature Specification: 07 - About Ministry & Founder's Journey (/about)

## 1. Goal
Build the comprehensive `/about` page detailing the ministry's founding story, the Lead Pastor's personal testimony of breakthrough and grace, the ministry's Statement of Faith (What We Believe), the leadership structure, and a Prayer Mountain / Special Project spotlight.

## 2. Design & Architecture Decisions
* **Visual Theme:** Deep royal purple backgrounds, metallic gold accents, framed portrait borders, and Great Vibes script accent typography (*"Get Ready for the Overflow!"*).
* **Content Sourcing:** Static, polished editorial content with clean structured data for SEO.
* **Component Boundaries:**
  * Assemble modular components inside `components/about/`.
  * Ensure full mobile responsiveness with accessible card structures.

## 3. Structural Breakdown & Sections

### A. About Hero Banner (`components/about/about-hero.tsx`)
* **Script Accent:** *"The Story of Divine Mandate"*
* **Headline:** *"From a Humble Beginning to a Global Ministry of Deliverance"*
* **Subtext:** *"Discover how God transformed a life and birthed an apostolic movement committed to breaking chains and releasing covenant overflow across nations."*
* **Visual Badge:** *"Est. 2000 • 25+ Years of Supernatural Impact"*

### B. Founder's Detailed Testimony (`components/about/founder-story.tsx`)
* **Layout:** 2-Column editorial magazine layout.
* **Left Column:** Framed high-resolution portrait container with metallic gold borders and floating quotation badge:
  * *"I have given you power; go and set My people free."*
* **Right Column:**
  * Script Sub-header: *"A Testimony of Uncompromised Faith"*
  * Multi-paragraph biographical narrative highlighting:
    * The Calling: Humble beginnings transformed through an encounter with the Holy Spirit.
    * The Mandate: A specific divine commission for deliverance, prophetic preaching, and open-air crusades.
    * The Explosion: Growth from a small fellowship into a multi-campus cathedral and international broadcast.

### C. Statement of Faith / What We Believe (`components/about/statement-of-faith.tsx`)
* **Headline:** *"Pillars of Our Faith"*
* **Subtext:** *"Unshakable biblical truths anchoring our doctrine and ministry."*
* **6-Card Interactive Grid:**
  1. **The Holy Scriptures:** The infallible, inspired Word of God as our supreme authority.
  2. **The Triune God:** Father, Son, and Holy Spirit — co-equal and eternal.
  3. **Salvation by Grace:** Justification solely through faith in the finished work of Jesus Christ.
  4. **The Baptism of the Holy Spirit:** Empowering believers with spiritual gifts and signs following.
  5. **Divine Healing & Deliverance:** Total victory over spiritual oppression, curses, and sickness.
  6. **The Second Coming:** The imminent return of Christ and eternal life for the redeemed.

### D. Leadership & Pastoral Council (`components/about/leadership-team.tsx`)
* **Headline:** *"Our Pastoral Leadership"*
* Grid showcasing key leadership roles:
  * Lead Pastor / General Overseer
  * Resident Associate Pastors
  * Intercessory & Prayer Altar Directors
  * Youth & Children's Ministry Leads
* Clean card presentation with title, brief bio, and ministry focus.

### E. Prayer Mountain & Sacred Retreat Spotlight (`components/about/prayer-mountain.tsx`)
* Benchmarked from Neno's Jerusalem City (JCK) prayer mountain:
  * Section dedicated to the church's sacred retreat ground / 24/7 prayer mountain.
  * Focus on fasting retreats, all-night prayer vigils (Kesha), and personal divine encounters.
  * Action Button (Metallic Gold): **"Learn About Prayer Retreats"** (links to `/contact`).

## 4. Verification Checklist
- [ ] `npm run build` compiles with zero TypeScript and ESLint errors.
- [ ] `/about` page renders all 5 sections in correct vertical order.
- [ ] Images, portrait frames, and typography match the royal purple & gold aesthetic.
- [ ] Statement of faith cards and leadership cards adapt seamlessly to mobile viewports (`375px` - `768px`).
- [ ] All internal CTA buttons link correctly to `/contact`, `/sermons`, and `/prayer-request`.
- [ ] `context/06-progress-tracker.md` is updated with Phase 7 marked as completed.