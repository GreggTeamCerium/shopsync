# Task 05: Stripe Subscription Integration

Read CLAUDE.md first. Work inside the app/ directory.

## Context
Stripe test mode is configured. Environment variables are set:
- `STRIPE_SECRET_KEY` — secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — publishable key
- `STRIPE_PRICE_STARTER` — price ID for Starter plan ($19/mo)
- `STRIPE_PRICE_PRO` — price ID for Pro plan ($39/mo)
- `STRIPE_WEBHOOK_SECRET` — placeholder, will be set after webhook endpoint is created

The `sellers` table already has `subscription_tier` (values: "free" | "starter" | "pro") and `stripe_account_id` (rename usage — actually used for Stripe customer ID).

## What to Build

### 1. Install Stripe SDK
```bash
npm install stripe
```

### 2. Add stripe_customer_id column
We need a column for the seller's Stripe customer ID (separate from stripe_account_id which was intended for Stripe Connect). Add via SQL migration in a new file `supabase-migration-stripe.sql`:

```sql
alter table public.sellers add column if not exists stripe_customer_id text;
alter table public.sellers add column if not exists stripe_subscription_id text;
create index if not exists sellers_stripe_customer_idx on public.sellers(stripe_customer_id);
```

Tell the user to run this in Supabase SQL editor.

### 3. Stripe Helper Lib
Create `src/lib/stripe.ts`:
- Initialize Stripe SDK with secret key
- Helper: `getOrCreateStripeCustomer(sellerId, email)` — creates customer if seller doesn't have one, saves to DB, returns customer ID
- Helper: `getPriceIdForTier(tier)` — maps "starter"/"pro" to the price env vars
- Helper: `getTierFromPriceId(priceId)` — reverse mapping for webhooks

### 4. Checkout Flow
Create API route `src/app/api/checkout/subscription/route.ts`:
- POST endpoint, authenticated
- Accepts `{ tier: "starter" | "pro" }` in body
- Gets/creates Stripe customer
- Creates a Stripe Checkout Session in subscription mode
- Success URL: `/dashboard?upgraded=true`
- Cancel URL: `/dashboard/billing`
- Returns `{ url }` — frontend redirects

### 5. Billing Portal
Create API route `src/app/api/billing/portal/route.ts`:
- POST endpoint, authenticated
- Creates Stripe Customer Portal session
- Return URL: `/dashboard/billing`
- Returns `{ url }` — frontend redirects

### 6. Webhook Handler
Create API route `src/app/api/webhooks/stripe/route.ts`:
- Verifies signature with STRIPE_WEBHOOK_SECRET
- Uses admin Supabase client (service role)
- Handles these events:
  - `checkout.session.completed` — when user completes subscription checkout, update seller's subscription_tier + stripe_subscription_id
  - `customer.subscription.updated` — when subscription changes (upgrade/downgrade), update tier
  - `customer.subscription.deleted` — when cancelled, set tier back to "free" and clear stripe_subscription_id
- Returns 200 quickly, logs details

### 7. Billing Page
Create `src/app/(dashboard)/dashboard/billing/page.tsx`:
- Shows current plan (Free/Starter/Pro) with features
- If on Free: "Upgrade" buttons for Starter and Pro — call checkout API, redirect
- If on Starter/Pro: "Manage Subscription" button — calls billing portal API, redirects to Stripe portal
- Handle `?upgraded=true` query param — show success toast/message
- Show feature comparison table

### 8. Feature Gating
Create `src/lib/feature-gates.ts`:
- `canAddProduct(tier, currentCount)` — Free: 10, Starter: 50, Pro: Infinity
- `canUseCustomDomain(tier)` — Starter+ only
- `canAutoSync(tier)` — Pro only
- `canUseAnalytics(tier)` — Pro only

Apply gates:
- In `createProductAction` — check product count against limit, return error if over
- On settings page — disable custom domain field with upgrade prompt for Free
- Show "Pro feature" badges on locked features

### 9. Dashboard Updates
- Add "Billing" link in sidebar (with credit card icon)
- Show current plan tier badge in topbar
- On the main dashboard, if on Free and approaching product limit (8+/10), show upgrade nudge

### 10. Update Settings Page
- Remove the "Subscription tier" field (now managed via billing page only)

## Rules
- All TypeScript, zero `any` types
- Use `stripe` package, not direct API calls
- Webhook must verify signatures
- Server actions for mutations when possible, API routes for Stripe redirects (they need a URL response)
- `next build` must pass clean
- Handle errors gracefully (Stripe timeouts, network issues, etc.)
- Don't expose secret keys to the client

When finished, make sure `npm run build` passes with zero errors.

Also at the end, output clear instructions for the user on:
1. The SQL migration they need to run in Supabase
2. How to set up the Stripe webhook endpoint (Stripe Dashboard → Developers → Webhooks → Add endpoint → URL → select events → copy signing secret)
