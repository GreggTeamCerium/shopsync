# ShopSync

Turn your Instagram into a real online store in 60 seconds. Zero platform fees.

ShopSync is a SaaS tool that converts social media stores (Instagram, TikTok, Facebook) into standalone e-commerce websites. Sellers connect their social account, we auto-import their products via AI, and generate a professional store they own — with custom domain, Stripe payments, and zero transaction fees.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Payments:** Stripe (subscriptions + seller store payments)
- **Hosting:** Vercel
- **APIs:** Meta Graph API (Instagram import), OpenAI (caption parsing)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Meta/Instagram (optional for dev)
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
```

> **Note:** The app runs with mock data if Supabase credentials are not provided.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the marketing site.

Demo stores are available at:
- [http://localhost:3000/store/chom-chom-store](http://localhost:3000/store/chom-chom-store)
- [http://localhost:3000/store/vintage-finds-nyc](http://localhost:3000/store/vintage-finds-nyc)

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/            # Login, signup, forgot password
│   ├── (dashboard)/       # Seller dashboard (products, orders, settings)
│   ├── (marketing)/       # Landing page, pricing
│   ├── (store)/           # Customer-facing store pages
│   │   └── store/[slug]/
│   │       ├── page.tsx          # Store homepage
│   │       ├── shop/page.tsx     # Product grid with filters
│   │       ├── product/[id]/     # Product detail
│   │       ├── cart/page.tsx     # Shopping cart
│   │       └── checkout/         # Checkout flow
│   └── layout.tsx         # Root layout
├── components/
│   ├── store/             # Store-facing components
│   ├── marketing/         # Marketing site components
│   ├── dashboard/         # Dashboard components
│   └── ui/                # Shared UI primitives
└── lib/
    ├── data/              # Data layer (types, seed data, in-memory store)
    ├── templates.ts       # Store template configurations
    ├── constants.ts       # App constants and pricing plans
    ├── format.ts          # Price/date formatting utilities
    ├── supabase.ts        # Supabase client
    └── validations.ts     # Zod schemas
```

## Available Templates

| Template | Style | Inspired By |
|----------|-------|-------------|
| The Cabana | Warm, relaxed, sun-kissed | Reformation |
| The Edit | Sharp, clean, confident | Everlane, COS |
| The Atelier | Elevated, editorial, luxe | Aritzia, NET-A-PORTER |
| The Gallery | All-white, gallery grid | Zara |
| The Collective | Earthy, organic | Sustainable brands |
| The Studio | Modern feminine | Charcoal + blush |
| The Market | Classic Americana | Navy + warm white |
| The Vault | Luxury, high-end | Black + gold |
| The Bloom | Soft, delicate | Lavender + ivory |
| The Boardwalk | Coastal, casual | Sandy + ocean blue |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Manual

```bash
npm run build
npm start
```

## License

Proprietary — all rights reserved.
