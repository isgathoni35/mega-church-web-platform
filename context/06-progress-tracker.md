# 06. Progress Tracker

**Current Project Phase:** Setup & Foundation  
**Status:** 🟡 In Progress

## ✅ Completed Features

*(The AI will move completed feature specifications here once verified and committed.)*

- [x] `feature-specs/01-design-system.md`: Next.js setup, Tailwind config, CSS variables (Purple/Gold theme), Google Fonts (Montserrat & Great Vibes), and shadcn/ui primitives (`button`, `card`, `input`).
- [x] `feature-specs/02-layout-shell.md`: Persistent layout shell (Top Utility Bar, Sticky Navbar with mobile drawer, and 4-column Global Footer).

## 🚧 In Progress

*(The AI will list the currently active feature specification here.)*

None.

## ⏳ Pending Features

### Phase 1: Core Foundation

- [ ] `feature-specs/03-supabase-schema.md`: Database setup for Sermons, Events, and Forms. Types generation.

### Phase 2: Homepage & UI

- [ ] `feature-specs/04-homepage-hero.md`: Hero banner, massive CTA, and animated statistics.
- [ ] `feature-specs/05-homepage-founder.md`: Founder spotlight and core mission pillars.
- [ ] `feature-specs/06-homepage-schedule.md`: Weekly itinerary and structural layout.

### Phase 3: Media & Integrations

- [ ] `feature-specs/07-dynamic-media.md`: Media grid fetching past sermons/live streams from Supabase.
- [ ] `feature-specs/08-mpesa-integration.md`: Digital Giving portal with Daraja STK Push integration.
- [ ] `feature-specs/09-forms.md`: Prayer Request and Contact forms wired to Supabase server actions.

## 🏗️ Architectural Decisions Log

*(The AI will log any major structural decisions, package installations, or workarounds here to maintain a permanent record.)*

- **[2026-10-02]:** Decided to use Next.js App Router, Supabase (CMS/DB), and Tailwind CSS with a Royal Purple/Gold aesthetic inspired by the reference flyer.
- **[2026-10-02]:** Enforced 'Plan First' requirement across all scenarios and configured port 3002 as the default dev port (ports 3000 and 3001 are unavailable).
- **[2026-10-02]:** Completed Feature 01 (Design System & Tokens): established `src/` boundary structure, HSL theme custom properties, Montserrat & Great Vibes Google fonts, shadcn components (`Button`, `Card`, `Input`), and restored CLI binary shims for `next`.
- **[2026-10-02]:** Completed Feature 02 (Layout Shell): built Top Utility Bar with pulse live badge, sticky Navbar with Gold 'Give Online' CTA, mobile responsive slide-over drawer, and 4-column Global Footer. Marked interactive layout components as client boundaries to support React 19 icon context.