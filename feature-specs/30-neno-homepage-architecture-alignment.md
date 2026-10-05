# Feature Spec 30: Neno Evangelism Centre Homepage Architecture Alignment

## 1. Objective & Requirements
Re-architect the homepage of **Heavens Gates Sugutta Fellowship Church International** to mirror the exact section sequence, structural flow, and feature modules of **Neno Evangelism Centre** (`https://www.nenoevangelismcentre.org/`), while strictly preserving:
- All dynamic administrative settings (`site_settings`).
- All donation and remittance portals (M-Pesa, Sendwave, KCB Bank).
- The church's signature color palette: Vibrant Orange (`#ff6b35`), Soft Warm Cream (`#fbf8f3`), Crisp White (`#ffffff`), and Midnight Slate (`#0f172a`).
- Port 3002 development rule and zero TypeScript/Vercel build errors.

---

## 2. Neno Homepage Section-by-Section Roadmap

The homepage will follow Neno's exact 12-section rhythm:

```
[ Section 1: Sticky Navbar & TopBar ]
                  ↓
[ Hero Section + 3-Item Stats Bar ]
                  ↓
[ Section 2: Founder Testimony & Vision ("A Testimony of God's Grace & Power") ]
                  ↓
[ Section 3: Our Ministry Pillars + 3-Item Impact Counter ]
                  ↓
[ Section 4: Church Service Programme (Sunday 5 Sessions & Midweek) ]
                  ↓
[ Section 5: Latest Services & Sermons (Featured Media Showcase) ]
                  ↓
[ Section 6: Categorized Church Activities & Departments ]
                  ↓
[ Section 7: Sacred Prayer Mountain (Mai Mahiu Fasting & Prayer Cabins) ]
                  ↓
[ Section 8: Anointed Moments (4 Vertical 9:16 Video Reels Grid) ]
                  ↓
[ Section 9: Heavens Gates Children's Home (Compassion Mission) ]
                  ↓
[ Section 10: Give & Support the Ministry (Embedded 2-Tab M-Pesa & Sendwave Hub) ]
                  ↓
[ Section 11: Get In Touch (Sanctuary Location Details + Message Form) ]
                  ↓
[ Section 12: Global Midnight Slate Footer ]
```

---

## 3. Detailed Component Plan

### 3.1. Reorder Top Sequence (Sections 1 – 4)
- **Current problem:** Local site puts `ServiceSchedule` in Section 2, which breaks Neno's flow.
- **Solution:** 
  1. `HeroSection`: Top fold with Motto badge, curved orange underline headline, dual buttons (`Watch Live Service` & `Learn More`), Pastor Caesar framed portrait, and 3-item stat bar.
  2. `FounderSpotlight` moved to **Section 2** immediately following the hero: *"A Testimony of God's Grace & Power"*, with commission quote card, Pastor Caesar's 4 feature pillars, and twin Mission & Vision cards.
  3. `MinistryPillars` moved to **Section 3**: Deliverance & Healing, Global Crusades, Prophetic Word & Truth, Compassion & Outreach, augmented with Neno's 3-item impact counter strip (`1,200+ Deliverance Sessions`, `50+ Crusades Held`, `1M+ Lives Touched`).
  4. `ServiceSchedule` moved to **Section 4**: 5 authentic Sunday sessions and Hebrews 10:25 Scripture banner.

### 3.2. Section 5: Latest Services & Sermons
- Retain `RecentSermons` with high-contrast media cards, category pills, play modal, and orange CTA button to `/sermons`.

### 3.3. Section 6: Categorized Church Activities
- Retain `CategorizedActivities` with interactive category pills (All, Weekly Worship, Fellowships, Crusades & Keshas, Prayer Mountain, Mercy & Outreach) and 11 rich activity tracks.

### 3.4. Section 7: Sacred Prayer Mountain Feature (`HomePrayerMountain`)
- Benchmark: Neno's dedicated **"Jerusalem City (JCK)"** section.
- In Sugutta: **Mai Mahiu Sacred Prayer Mountain Retreat**.
- Content:
  - Eyebrow: `Sacred Consecration &bull; Mai Mahiu Altar`
  - Headline: `24/7 Sacred Prayer Mountain & Fasting Retreat`
  - Key Highlights: Private wilderness prayer cabins, continuous 24/7 altar fire, and secluded prayer rocks.
  - Action Button: `Learn About Prayer Mountain Retreats &rarr;`

### 3.5. Section 8: "Anointed Moments" Vertical 9:16 Video Reels (`AnointedReels`)
- Benchmark: Neno's **"Anointed Moments"** section.
- Content:
  - Eyebrow: `Holy Ghost Fire &bull; Outdoor Praising`
  - Headline: `Anointed Moments: Street Witnessing & Praise`
  - 4 vertical (9:16) cards using our verified video files (`praise-reel-01.mp4`, `praise-reel-02.mp4`, etc.) with duration tags, location badges, and click-to-play `AdaptiveVideoModal`.

### 3.6. Section 9: Children's Home Teaser
- Retain `OrphanageTeaser` linking directly to `/orphanage` and `/orphanage/donate`.

### 3.7. Section 10: Embedded Homepage Giving Module (`HomeGivingModule`)
- Benchmark: Neno's **"Give & Support the Ministry"** section embedded directly on the homepage.
- Content:
  - 2-Tab Switcher: `🇰🇪 For Kenyans` vs `🌍 For International Partners`
  - Tab 1: M-Pesa Send Money (`0700 000 001`), Paybill `174379` with 1-click copyable account reference codes, and KCB Bank wire info.
  - Tab 2: Sendwave remittance guide with direct app link.
  - Bottom CTA: `View Full Giving & Tithe Portal &rarr;`

### 3.8. Section 11: Embedded Contact Altar (`HomeContactModule`)
- Benchmark: Neno's **"Get In Touch"** section with contact information + form directly above the footer.
- Content:
  - Left column: Physical sanctuary address (Sugutta, Kenya), phone helpline, pastoral email, and Sunday worship times.
  - Right column: Clean, responsive message form connecting directly to `submitContactInquiry` with instant status feedback.

---

## 4. Verification & Testing Steps
1. **Type Checking:** Run `npx tsc --noEmit` to ensure 0 TypeScript errors.
2. **Build Validation:** Run `npm run build` to confirm static generation of all routes passes with exit code 0.
3. **Browser Subagent Visual Inspection:** Inspect `http://localhost:3002/` to verify every section's appearance, responsiveness, and exact sequence against `https://www.nenoevangelismcentre.org/`.
4. **Documentation:** Update `context/06-progress-tracker.md`.
