# Feature Spec: 01-design-system

## 1. Goal

Initialize the core Next.js frontend structure, configure Tailwind CSS with our specific Royal Purple and Gold aesthetic, set up the Google Fonts, and initialize shadcn/ui with base components.

## 2. Architecture & Tech Decisions

- **Framework:** Next.js App Router with TypeScript.
- **Fonts:** Montserrat (Primary/Body) and Great Vibes (Accent/Script) via `next/font/google`.
- **UI Library:** shadcn/ui (using New York style, CSS variables enabled).
- **Icons:** `lucide-react`.

## 3. Implementation Steps

### Step 1: Dependency Setup

- Ensure `lucide-react`, `tailwind-merge`, and `clsx` are installed.
- Run the shadcn/ui init command if not already initialized (`npx shadcn@latest init`). Use the default settings but ensure CSS variables are set to true.
- Install the following shadcn components: `button`, `card`, `input`.

### Step 2: Global CSS Configuration (`src/app/globals.css`)

Replace the default boilerplate variables in `@layer base` with our thematic colors:

```css
--primary: 272 76% 17%; /* (Deep Royal Purple) */
--primary-foreground: 0 0% 100%; /* (White) */
--accent: 43 74% 49%; /* (Metallic Gold) */
--accent-foreground: 272 76% 17%; /* (Purple text on gold) */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--secondary: 272 30% 95%; /* (Light purple tint) */
```

Keep standard shadcn radius, border, and ring configurations, but ensure `--ring` uses the primary or accent color.

### Step 3: Tailwind Configuration (`tailwind.config.ts`)

- Ensure the theme extends the CSS variables properly.
- Add font families to the theme extension (e.g., `fontFamily: { sans: ['var(--font-montserrat)'], script: ['var(--font-great-vibes)'] }`).

### Step 4: Font Setup (`src/app/layout.tsx`)

- Import `Montserrat` and `Great Vibes` from `next/font/google`.
- Configure both fonts to load with CSS variables (`--font-montserrat`, `--font-great-vibes`).
- Inject these font variables into the `` tag's className.
- Apply a generic dark purple background and white text class to a temporary div in the `page.tsx` just to visually verify the theme is working.

## 4. Success Criteria

- [ ] Next.js app compiles successfully (`npm run dev`).
- [ ] No TypeScript or ESLint errors.
- [ ] The global CSS variables match the Deep Purple and Gold theme.
- [ ] Both Google Fonts are successfully loaded in the DOM.
- [ ] Button, Card, and Input components from shadcn/ui exist in `src/components/ui/`.