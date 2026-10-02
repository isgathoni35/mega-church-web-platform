# Feature Specification: 02 - Layout Shell (Navbar & Footer)

## 1. Goal
Build the persistent layout shell across the entire application, including the Top Utility Bar, Main Navigation Bar with a mobile responsive drawer, and the Global Footer, styled with the royal purple, white, and gold theme.

## 2. Design Decisions & Component Boundaries
* **Theme Tokens:** Rely strictly on CSS variables defined in `globals.css` (primary purple backgrounds, crisp text, and gold accents for primary CTAs).
* **Header Structure:**
  * **Top Utility Bar:** Thin top banner displaying contact details (Phone, Email) and quick links for "Live Stream" (with a subtle pulse badge) and "Prayer Request". Hidden on smaller mobile screens if space is constrained.
  * **Main Navbar:** Sticky header containing the Church Logo/Name placeholder, main navigation links, and a prominent "Give Online" CTA button.
  * **Mobile Navigation:** Slide-over sheet/drawer (using shadcn/ui Sheet or Dialog) triggered by an accessible hamburger icon button.
* **Footer Structure:**
  * 4-column layout on desktop, stacked on mobile:
    1. Ministry Mission & Founder tagline.
    2. Quick Navigation Links.
    3. Service Times & Worship Schedule (referencing Sunday Explosive Worship, Monday Live, Wednesday Bible Study).
    4. Digital Giving Highlight (Cash App, PayPal, M-Pesa placeholders) and social links.
  * Bottom copyright bar: "© 2026 [Church Name]. All Rights Reserved."

## 3. Implementation Details
* **Files to Create:**
  * `components/layout/top-bar.tsx`: Utility bar with contact info and live badge.
  * `components/layout/navbar.tsx`: Desktop navigation links and "Give" button.
  * `components/layout/mobile-nav.tsx`: Mobile toggle button and slide-out menu.
  * `components/layout/site-header.tsx`: Wrapper orchestrating the Top Bar, Navbar, and Mobile Nav.
  * `components/layout/footer.tsx`: Four-column responsive footer.
* **Modifications:**
  * Update `app/layout.tsx` to wrap `{children}` with `` and `