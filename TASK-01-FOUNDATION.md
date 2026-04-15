# Task 01: ShopSync Foundation Build

Read CLAUDE.md first for full project context.

## What to Build

### 1. Scaffold Next.js App
- Create a Next.js 15+ app in this directory with: TypeScript, Tailwind CSS, App Router, src directory
- Install: @supabase/supabase-js, stripe, lucide-react, clsx, zod
- Set up proper folder structure per CLAUDE.md

### 2. Landing Page (Marketing Site)
Route: `/`

A beautiful, conversion-focused landing page that sells the product. Design should be modern, bold, and exciting.

**Sections:**
- **Hero:** "Turn Your Instagram Into a Real Store — in 60 Seconds"
  - Subtext: "Stop paying 20% fees to marketplaces. Own your store. Keep your profits."
  - CTA button: "Get Started Free"
  - Mock screenshot/illustration of the product
- **How It Works:** 3-step visual (Connect Instagram → We Import Your Products → Your Store is Live)
- **Features Grid:** 
  - AI-powered product import
  - Beautiful store templates
  - Your own custom domain
  - Stripe payments (keep 97% of revenue)
  - Mobile-optimized stores
  - Auto-sync with Instagram
- **Pricing Section:**
  - Free: 10 products, shopsync subdomain, basic template
  - Starter $19/mo: 50 products, custom domain, Stripe, 3 templates
  - Pro $39/mo: Unlimited products, auto-sync, analytics, custom CSS
  - All plans: zero transaction fees
- **Social Proof:** Placeholder testimonials
- **FAQ Section:** Common questions
- **Footer CTA:** "Ready to own your store?" + email signup

### 3. Pricing Page
Route: `/pricing`
- Full pricing comparison table
- Feature breakdown per tier
- FAQ section
- CTA to sign up

### 4. Auth System (Supabase)
Routes: `/login`, `/signup`, `/forgot-password`
- Email + password auth via Supabase
- Clean, branded auth pages (not generic)
- Redirect to `/dashboard` after login
- Protected routes (dashboard, store management)
- Store seller profile in `sellers` table after signup

### 5. Seller Dashboard Shell
Route: `/dashboard`
- Protected route (must be logged in)
- Sidebar navigation:
  - Dashboard (overview)
  - Products (list/manage)
  - Orders
  - Store Settings
  - Import from Instagram (coming soon badge)
- Top bar with store name and account menu
- Dashboard home shows: quick stats placeholders, getting started checklist
- Getting Started Checklist:
  - [ ] Add your first product
  - [ ] Choose a template
  - [ ] Connect Stripe
  - [ ] Set up your domain

### 6. Environment Setup
Create `.env.example` and `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Design Guidelines
- **Brand colors:** Electric blue (#2563EB) primary, coral/pink (#F43F5E) accent, dark navy (#0F172A) text
- **Style:** Modern, bold, clean. Think Vercel/Linear design language.
- **Typography:** Inter font
- **Mobile-first responsive**

## Rules
- All TypeScript, zero `any` types
- Use Zod for form validation
- `next build` must pass clean with zero errors
- Supabase client should work in demo mode even without real credentials (graceful fallback)
- All pages must look good on mobile

When finished, make sure `npm run build` passes with zero errors.
