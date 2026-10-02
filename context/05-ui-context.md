# 05. UI Context & Design System

## 1. Aesthetic Vision

The visual identity of this platform must reflect a Royal, Traditional Pentecostal atmosphere, inspired directly by the provided reference flyer. The design should feel authoritative, spiritual, and welcoming, characterized by high contrast, elegant typography, and a heavy emphasis on digital giving accessibility.

## 2. Color Palette (Global CSS Variables)

The AI agent MUST use the following color variables in `src/app/globals.css` and map them in `tailwind.config.ts`. Do NOT use raw hex codes in component classes.

### Primary (Deep Royal Purple)
The dominant color for headers, footers, and primary sections.

```css
--primary: 272 76% 17%; /* Approx #1a0a3a or a rich deep purple */
--primary-foreground: 0 0% 100%; /* White text on purple */
```

### Accent (Gold/Brass)
Used for Call-to-Action buttons (Donate, Give), borders, and highlighting key text.

```css
--accent: 43 74% 49%; /* Metallic Gold / #D4AF37 */
--accent-foreground: 272 76% 17%; /* Dark purple text on gold buttons for contrast */
```

### Backgrounds

```css
--background: 0 0% 100%; /* White for clean body areas */
--foreground: 222.2 84% 4.9%; /* Dark text for readability */
--secondary: 272 30% 95%; /* A very light, subtle purple tint for alternating sections */
```

## 3. Typography

We are mixing elegant, flowing script (for the "overflow" and "join us" vibe) with highly legible, strong sans-serif for information and schedules.

- **Primary Font (Body & UI):** Montserrat or Inter. Used for all standard text, navigation, schedules, and form inputs. It communicates strength and clarity.
- **Script/Display Font (Accents):** Great Vibes, Playball, or Dancing Script (loaded via `next/font/google`).
- **Usage Rule:** ONLY use the script font for specific aesthetic headers (e.g., "Join Us", "Welcome Home", signature quotes like "Get Ready for the Overflow!"). NEVER use the script font for body paragraphs, giving instructions, or buttons.

## 4. shadcn/ui Component Styling Rules

When implementing shadcn/ui components, modify their default styles to match this aesthetic:

### Buttons (Button)

- **Primary (Donate/Give):** Must use the Gold `--accent` color with bold, dark text. Add a slight shadow or hover effect to make it pop.
- **Secondary:** Deep Purple background with White text.
- **Shape:** Use `rounded-md` (medium rounding) to maintain a structured, traditional feel rather than heavily pill-shaped buttons.

### Cards (Card)

Used extensively for the Weekly Schedule, Sermon Grid, and Giving Options.

- **Style A (Light):** White background, subtle drop shadow (`shadow-md`), with a very thin Gold (`border-accent`) top border.
- **Style B (Dark):** Deep Purple background, White text, often used to highlight the most important element (like the primary M-Pesa giving card).

### Form Inputs (Input, Textarea)

- Clean, accessible, and high contrast.
- White background, light gray borders.
- **Focus State:** When a user clicks an input (e.g., entering their phone number for M-Pesa), the focus ring MUST be the Gold or Primary Purple color (`ring-primary` or `ring-accent`), overriding the default shadcn blue/gray ring.

## 5. Layout & Spacing Defaults

- **Hero Section:** Must be massive (min-height 80vh to 100vh), utilizing a dark overlay over a high-quality church/worship background image, ensuring the White and Gold text pops instantly.
- **Sections:** Use generous vertical padding (`py-16` to `py-24`) between major blocks (Founder Spotlight -> Media Grid -> Schedule).
- **Giving Section:** Must be highly visible, utilizing a grid layout to display various giving methods (M-Pesa, PayPal, CashApp) with their respective logos or QR codes clearly, mimicking the layout of the reference flyer.

## 6. Imagery Guidelines

- **Cut-out Portraits:** Leadership photos (like Pastor Jeannette Taylor from the flyer) should be professional, background-removed cutouts placed over the deep purple branding.
- **Action Shots:** Use high-quality imagery of the congregation worshiping, hands raised, and the pastor preaching dynamically. No sterile stock photos.