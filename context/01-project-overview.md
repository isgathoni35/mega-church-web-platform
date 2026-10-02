# 01. Project Overview: Heavens Gates Sugutta Fellowship Church International

## 1. Project Summary

This project is a modern, high-performance web platform designed for Heavens Gates Sugutta Fellowship Church International. The application serves as the digital front door for the church, built to broadcast live services, host on-demand sermons, communicate weekly schedules, and—critically—facilitate frictionless digital giving across multiple platforms.

## 2. Visual & Thematic Identity (The "Vibe")

Based on the reference flyer (image_3ce4ba.jpg), the AI agent must enforce the following thematic direction in the UI:

- **Primary Colors:** Deep Royal Purple and stark White to create high contrast and a regal, spiritual atmosphere.
- **Accent Colors:** Gold/Brass for buttons, highlights, and borders to convey excellence and overflow.
- **Typography:** A blend of elegant, flowing script fonts for section headers and quotes (e.g., "Join Us!", "Get Ready for the Overflow!"), paired with clean, highly readable Sans-Serif/Serif fonts for body copy and scheduling details.
- **Imagery:** Professional, cutout-style portrait photography of the leadership against themed backgrounds, alongside high-quality ministry action shots.

## 3. Core Goals & Priorities

- **Prominent Digital Giving:** Maximize donor conversion by making digital giving unavoidable and effortless. The UI must support multiple distinct giving avenues (e.g., M-Pesa STK push, PayPal, external gateway links/QR codes) presented cleanly, similar to the reference flyer.
- **Clear Schedule Communication:** A highly visible, beautifully formatted weekly itinerary (Sundays, Mondays, Wednesdays) prominently displayed on the homepage.
- **Media & Authority:** Establish the founder/lead pastor's authority through a dedicated spotlight section and a dynamic media grid for live streams and past sermons.
- **Community Connection:** Securely capture visitor information and prayer requests.

## 4. Key User Flows

- **The Giver's Journey:** User clicks a globally persistent "Give/Donate" button. They are presented with a multi-option modal or page (M-Pesa, PayPal, Cards). They select their preferred method, see clear instructions (or a QR code), and complete the transaction.
- **The Visitor's Journey:** User lands on the homepage, immediately understands the church's schedule via a stylized "Join Us" section, reads the founder's welcome, and fills out a "Plan a Visit" or "Contact" form.
- **The Worshipper's Journey:** User navigates to the Media/Live Stream section to watch a current broadcast or browse a categorized grid of previous teachings.

## 5. Technical Stack Overview

- **Frontend:** Next.js (App Router), React, TypeScript.
- **Styling:** Tailwind CSS combined with shadcn/ui components (styled to match the purple/gold theme).
- **Backend/Database:** Supabase (PostgreSQL) for managing Sermon links, Events/Schedules, and Form Submissions.
- **Integrations:** Safaricom Daraja API for local M-Pesa giving, plus standard external links for international gateways.

## 6. Strict Anti-Goals (Out of Scope)

To prevent the AI agent from hallucinating or over-engineering, the following are STRICTLY OUT OF SCOPE:

- **NO user authentication, user accounts, or member login portals** (the site is public-facing only).
- **NO custom video hosting or streaming infrastructure** (all videos will be embedded via YouTube/Facebook iframes).
- **NO e-commerce store or physical merchandise sales.**
- **NO complex seating reservation systems.**
- **NO custom admin dashboard built from scratch** (church staff will use the Supabase dashboard or a simple secure route for basic data entry).

## 7. Definition of Done

- The application builds successfully with zero TypeScript or ESLint errors.
- The UI strictly adheres to the Purple/White/Gold color palette and typography rules.
- All forms (Contact, Prayer Request) successfully write data to Supabase.
- The digital giving UI successfully displays all payment options, and the M-Pesa integration triggers a successful test STK push.
- The site is 100% fully responsive, ensuring complex elements like the weekly schedule and giving grids look perfect on mobile devices.