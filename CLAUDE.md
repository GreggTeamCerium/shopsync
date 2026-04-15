# ShopSync — Social Media to Online Store

## Project Overview
SaaS tool that converts social media stores (Instagram, TikTok, Facebook) into standalone e-commerce websites. Sellers connect their social account, we auto-import their products, and generate a professional store they own — with custom domain, Stripe payments, and zero platform fees.

## Mission
Help social media sellers escape 15-20% marketplace fees by giving them their own store in 60 seconds.

## Target Market
- Instagram resellers (clothing, accessories, vintage)
- Poshmark/Depop sellers who want their own site
- Small business owners selling through social media
- Anyone with an Instagram shop who wants a real website

## Revenue Model
- **Free:** 10 products, shopsync subdomain, basic template
- **Starter $19/mo:** 50 products, custom domain, Stripe, 3 templates
- **Pro $39/mo:** Unlimited products, auto-sync, analytics, custom CSS, priority support
- **No transaction fees** (key differentiator)
- Target: 200 paying users = ~$5,000/month

## Tech Stack
- Next.js 15+ (App Router) + TypeScript + Tailwind CSS
- Supabase (PostgreSQL + Auth + Storage)
- Stripe for billing (subscription) AND for seller store payments
- Vercel for hosting
- Meta Graph API (Instagram import)
- OpenAI API (caption parsing, product categorization)

## Core Features (MVP)

### 1. Onboarding Flow
- Sign up with email
- Connect Instagram business/creator account (Meta Graph API)
- We scan their posts, extract product data via AI
- Preview imported products — user confirms/edits
- Choose template, set store name
- Store generated instantly

### 2. AI Product Import
- Pull images from Instagram posts
- Parse captions for: price, size, brand, condition, description
- Auto-categorize (Dresses, Tops, Bottoms, etc.)
- Handle multiple images per post (carousel posts)
- Confidence scoring — flag uncertain imports for manual review

### 3. Store Templates
- Start with 3 templates (inspired by Chom Chom store design):
  - "Resort" — pink/green tropical (Lilly Pulitzer vibe)
  - "Minimal" — black/white clean modern
  - "Vintage" — warm tones, serif fonts
- Customizable: colors, logo, about text
- All mobile-first responsive

### 4. Store Features (per seller)
- Product grid with filters (size, brand, category, condition, price)
- Product detail pages with image gallery
- Shopping cart with localStorage
- Stripe Checkout (seller's own Stripe account)
- Custom domain support
- Basic analytics (views, cart adds, sales)

### 5. Seller Dashboard
- Product management (add/edit/delete/mark sold)
- Order management
- Instagram sync status
- Store settings (domain, colors, template)
- Subscription/billing management

### 6. Admin Panel (our internal)
- User management
- Subscription analytics
- Support tools

## Architecture

### Multi-tenant Design
- Single Next.js app serves all stores
- Routing: `[store-slug].shopsync.store` or custom domain
- Each seller's data isolated in Supabase (row-level security)
- Store rendering uses dynamic templates with seller's config

### Database Schema (Supabase)
```
sellers — id, email, store_name, store_slug, template, colors, logo, custom_domain, stripe_account_id, subscription_tier, instagram_connected, created_at
products — id, seller_id, name, brand, category, size, condition, price, description, images[], status, instagram_post_id, imported_at, created_at
orders — id, seller_id, stripe_session_id, customer_email, customer_name, items[], total, status, created_at
subscriptions — id, seller_id, stripe_subscription_id, tier, status, current_period_end
```

## Build Phases

### Phase 1 — MVP (Weeks 1-2)
- Landing page explaining the product
- Sign up / login (Supabase Auth)
- Manual product import (upload images + fill form) — no Instagram API yet
- Store generation with 1 template
- Stripe checkout for store customers
- Deploy on Vercel

### Phase 2 — Instagram Import (Weeks 3-4)
- Meta Graph API integration
- AI-powered caption parsing
- Bulk import with review/confirm step
- Auto-sync (new posts → new products)

### Phase 3 — Subscriptions + Polish (Weeks 5-6)
- Stripe subscription billing
- 3 template options
- Custom domain support
- Seller analytics dashboard
- Store SEO (meta tags, sitemap)

### Phase 4 — Growth (Month 2-3)
- TikTok Shop import
- Facebook Marketplace import
- Email notifications (new order alerts)
- Marketing site + content

## File Structure
```
projects/shopsync/
├── CLAUDE.md          (this file)
├── BUSINESS-PLAN.md   (detailed business analysis)
├── app/               (Next.js application — created during Phase 1)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (marketing)/    — landing page, pricing
│   │   │   ├── (dashboard)/    — seller dashboard
│   │   │   ├── (store)/        — customer-facing store pages
│   │   │   └── api/            — API routes
│   │   ├── components/
│   │   ├── lib/
│   │   └── templates/          — store template configs
│   └── ...
└── docs/              (API research, competitive analysis)
```

## Rules
- All TypeScript, zero `any` types
- Mobile-first responsive design
- `next build` must pass clean
- Multi-tenant from day one — no single-store shortcuts
- Supabase row-level security for data isolation
- Never store Stripe secret keys in the database
- Keep Instagram API tokens encrypted
