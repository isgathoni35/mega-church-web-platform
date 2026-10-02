# 02. Architecture & System Boundaries

## 1. System Overview

This project is a full-stack web application built on the Next.js App Router paradigm. It uses Server Components by default for optimal performance and SEO, relying on Supabase as a headless CMS and database, and the Safaricom Daraja API for M-Pesa payment processing.

## 2. Core Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database & Auth:** Supabase (PostgreSQL, Supabase JS Client)
- **Payments:** Safaricom Daraja API (M-Pesa Express / STK Push)
- **Icons:** Lucide React

## 3. STRICT ENVIRONMENT VARIABLE PROTOCOL

The AI Agent must strictly adhere to the following rules regarding API keys and environment variables:

- **NEVER GUESS OR MOCK KEYS:** Do not hardcode, guess, or create fake API keys for Supabase, Daraja, or any other service in the source code.
- **ASK FOR INPUT:** Whenever implementing a feature that requires environment variables, the AI must PAUSE execution and explicitly instruct the user: "Please add [VAR_NAME] to your .env.local file. Let me know when you have done this so I can proceed."
- **PREFIX RULES:**
  - Client-side variables must be prefixed with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_SUPABASE_URL`).
  - Server-side secrets must NEVER be prefixed with `NEXT_PUBLIC_` (e.g., `SUPABASE_SERVICE_ROLE_KEY`, `DARAJA_CONSUMER_KEY`).
- **VALIDATION:** Create an `env.ts` or `env.mjs` file at the root (using zod if necessary) to validate the presence of required environment variables at runtime.

## 4. Folder Structure & Boundaries

The application will follow a strict directory structure within the `src` folder:

- `src/app`: Next.js App Router pages and layouts. (Server Components by default).
- `src/components/ui`: Reusable, dumb UI primitives (shadcn components, buttons, inputs).
- `src/components/shared`: Complex, composite components used across multiple pages (e.g., Navbar, Footer, MediaGrid, WeeklySchedule).
- `src/actions`: Next.js Server Actions for handling all data mutations (e.g., `submitPrayerRequest.ts`, `initiateMpesaPayment.ts`).
- `src/lib`: Utility functions, configuration files, and API clients (e.g., `supabase.ts`, `daraja.ts`, `utils.ts`).
- `src/types`: Global TypeScript interfaces and type definitions (e.g., database schema types).

## 5. Data Fetching & Mutation Rules

- **Reads (Fetching):** Use Next.js Server Components to fetch data directly from Supabase. Pass the required data down to Client Components as props. Do not use `useEffect` for initial data fetching.
- **Writes (Mutations):** All form submissions (Prayer Requests, Contact Forms) and Payment Initiations MUST use Next.js Server Actions. Do not use traditional API routes (`src/app/api`) unless required for third-party webhooks (e.g., the Daraja M-Pesa callback URL).
- **Client-Side Interactivity:** Mark components with `"use client"` ONLY when absolutely necessary (e.g., handling `onClick` events, using React hooks like `useState`, `useFormStatus`, or managing video player state). Keep the client footprint as small as possible.

## 6. External Integrations Architecture

### A. Supabase

- Use `@supabase/ssr` or `@supabase/supabase-js`.
- We will utilize the Supabase REST API for CRUD operations on tables: `sermons`, `events`, `prayer_requests`.
- Since there is no user authentication, Row Level Security (RLS) policies on Supabase must allow anonymous `SELECT` for public content (sermons, events) and anonymous `INSERT` for form submissions (prayer requests), but restrict `UPDATE` and `DELETE` strictly to the Service Role.

### B. Daraja API (M-Pesa)

- M-Pesa STK push requests must be triggered securely from a Server Action to avoid exposing consumer keys.
- A dedicated Next.js Route Handler (`src/app/api/mpesa/callback/route.ts`) must be exposed to receive the asynchronous payment confirmation from Safaricom.

## 7. Styling Architecture

- All styling must use Tailwind CSS utility classes.
- The design system relies heavily on global CSS variables defined in `src/app/globals.css` (specifically the Purple, Gold, and White theme).
- Do not use arbitrary Tailwind values (e.g., `bg-[#5A2C8F]`) in components. Instead, map them to theme variables (e.g., `bg-primary`) defined in `tailwind.config.ts`.