# 03. Code Standards & Best Practices

## 1. General Principles

- **Readability over cleverness:** Write clean, self-documenting code. Do not use overly complex one-liners if they sacrifice readability.
- **No Unnecessary Comments:** Do not write comments explaining what standard React/Next.js code does. Only use comments to explain why a specific business logic decision was made or to clarify complex M-Pesa integration math.
- **File Size:** Keep components small and focused. If a file exceeds 200 lines, consider breaking it down into smaller sub-components.

## 2. TypeScript Rules

- **Strict Mode:** TypeScript strict mode is mandatory.
- **No any:** Never use the `any` type. If a type is temporarily unknown, use `unknown` and properly narrow it down.
- **Interfaces & Types:**
  - Use `interface` for object shapes and component props.
  - Use `type` for unions and primitives.
- **Type Locations:** Global types (like database row types from Supabase) belong in `src/types`. Component-specific types (like local props) should be defined directly in the component file.

## 3. React & Next.js Conventions

- **Server Components First:** Every component in the app directory must be a Server Component by default.
- **"use client" Placement:** Push `"use client"` boundaries as far down the component tree as possible. (e.g., Do not make an entire page a client component just because it contains a single interactive button. Extract the button into a client component).
- **Prop Destructuring:** Always destructure props in the function signature.
- **Exporting:**
  - Use `export default` for Next.js Pages and Layouts (`page.tsx`, `layout.tsx`).
  - Use named exports (`export const ComponentName = ...`) for all other components to ensure consistent naming across the codebase.
- **No useEffect for Fetching:** Never use `useEffect` to fetch initial data. Use Next.js Server Components for data fetching.

## 4. Styling & Tailwind CSS

- **No Arbitrary Values:** Avoid arbitrary Tailwind classes (e.g., `text-[#FFD700]`). Always use the semantic theme variables defined in `tailwind.config.ts` (e.g., `text-accent-gold`).
- **Conditional Classes:** Always use a utility like `cn()` (which wraps `clsx` and `tailwind-merge`) when applying conditional Tailwind classes to avoid class clashes.

```tsx
// DO THIS
className={cn("bg-primary text-white", isHovered && "bg-primary-hover")}

// NEVER DO THIS
className={`bg-primary text-white ${isHovered ? 'bg-primary-hover' : ''}`}
```

- **Consistency:** Order Tailwind classes logically (Layout > Spacing > Typography > Colors > Effects).

## 5. Forms & Data Validation

- **Zod for Validation:** All forms (Prayer Requests, Contact, M-Pesa inputs) MUST use zod schemas for validation.
- **Server-Side Validation:** Never trust client-side validation alone. The corresponding Server Action must re-validate the incoming data using the exact same zod schema before interacting with Supabase or Daraja.
- **React Hook Form:** Use `react-hook-form` paired with `@hookform/resolvers/zod` for handling client-side form state.

## 6. Error Handling & Responses

- **Server Actions Standard:** All Server Actions must return a predictable object structure:

```typescript
type ActionResponse = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};
```

- **Try/Catch Blocks:** All external API calls (Supabase, Safaricom Daraja) must be wrapped in `try/catch` blocks.
- **User-Facing Errors:** Never expose raw database or API error logs to the client. Catch them, log them securely on the server if needed, and return a friendly, generic error message (e.g., "Unable to process payment at this time. Please try again.") to the UI.