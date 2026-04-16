# Task 04: Supabase Integration

Read CLAUDE.md first for full project context. Work inside the app/ directory.

## Context
The Supabase project is set up and the database schema is created (see `../supabase-schema.sql` for reference). The env vars are in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Tables already exist in Supabase:
- `sellers` — linked to auth.users via id (uuid)
- `products` — linked to sellers via seller_id
- `orders` — linked to sellers via seller_id

A database trigger auto-creates a seller row when someone signs up via Supabase Auth.

## What to Build

### 1. Install Supabase Auth Helpers
```bash
npm install @supabase/ssr
```

### 2. Create Supabase Clients
- `src/lib/supabase/client.ts` — browser client (uses anon key)
- `src/lib/supabase/server.ts` — server client (uses anon key, reads cookies via next/headers)
- `src/lib/supabase/admin.ts` — admin client (uses service role key, server-only)
- Middleware: `src/middleware.ts` — refreshes auth tokens

Follow the official Next.js App Router pattern from Supabase docs.

### 3. Real Auth Flows

**Signup page (`/signup`):**
- User enters email + password + store name
- Call `supabase.auth.signUp()` with metadata: `{ store_name, store_slug }`
- Database trigger auto-creates the seller row
- Redirect to `/dashboard`

**Login page (`/login`):**
- User enters email + password
- Call `supabase.auth.signInWithPassword()`
- Redirect to `/dashboard`

**Logout:**
- Add logout button in dashboard topbar
- Calls `supabase.auth.signOut()`, redirects to `/`

**Forgot password:**
- Call `supabase.auth.resetPasswordForEmail()` with redirect URL

### 4. Replace In-Memory Data Layer with Supabase

Rewrite `src/lib/data/store.ts` to use Supabase instead of in-memory data:
- `getCurrentSeller()` — get seller for current logged-in user (server-side)
- `getSellerBySlug(slug)` — public, for store pages
- `getProductsBySeller(sellerId, filters?)` — with optional status filter
- `getProductById(id)` — fetch single product
- `createProduct(data)` — authenticated, returns new product
- `updateProduct(id, data)` — authenticated, owner only (RLS enforces)
- `deleteProduct(id)` — authenticated, owner only
- `getOrdersBySeller(sellerId)` — seller's orders
- `updateSeller(id, data)` — for settings page

Keep the function signatures similar so existing pages don't need big rewrites. Map snake_case DB fields to camelCase in TypeScript types.

### 5. Protected Routes
- Create a layout for `(dashboard)` that checks auth server-side
- If not logged in, redirect to `/login`
- Use server component for initial auth check

### 6. Store Settings Page Updates
When seller changes their slug, validate it's not taken (unique constraint).
Show a clear error if conflict.

### 7. Product Management
- Product list (`/dashboard/products`) — fetches from Supabase
- Add product — writes to Supabase
- Edit product — updates in Supabase
- Delete product — deletes from Supabase
- Mark sold — updates status in Supabase

### 8. Customer Store Pages
- `/store/[slug]` — fetch seller by slug (public)
- `/store/[slug]/shop` — fetch all available products for seller
- `/store/[slug]/product/[productSlug]` — fetch single product
- These are public pages — no auth required

Product slugs: since we don't have a slug column yet, generate it from the product name + id: `{slugified-name}-{first-8-chars-of-id}`. Or better: just use the product `id` as the "slug" param. Simpler and always unique.

### 9. Seed Data
Since the database is empty, we need a way to add demo data for showcase purposes. Options:
- Add a "Seed Demo Data" button in the admin settings that populates sample products
- Or: Write a seed script that can be run separately

Go with option 1 — a button on the settings page (maybe under "Developer" section) that calls an API route to seed 5-8 demo products for the current seller. Only show this button when in development OR when the seller has 0 products.

### 10. Update .env.example
Make sure `.env.example` matches `.env.local` structure (without real values).

## Important Notes
- Use the new `@supabase/ssr` package (NOT the deprecated `auth-helpers-nextjs`)
- All auth-protected pages should check auth server-side
- Use TypeScript types that match the database schema exactly
- Use snake_case in DB, camelCase in TypeScript (add mapping functions)
- RLS policies are already set up — the client will only be able to do what the policies allow

## Rules
- All TypeScript, zero `any` types
- `next build` must pass clean with zero errors
- Don't break existing UI — the pages should work the same, just with real data
- Handle loading states and errors gracefully
- Handle the case where a user is not logged in gracefully

When finished, make sure `npm run build` passes with zero errors.
