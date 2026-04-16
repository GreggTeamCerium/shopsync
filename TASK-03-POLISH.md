# Task 03: Polish & Demo Content

Read CLAUDE.md first for full project context. This builds on top of Phases 1 and 2.

Work inside the app/ directory.

## What to Improve

### 1. Better Demo Products
Update seed.ts to have more realistic and varied products:
- **Chom Chom Store (seller-1):** Change to 8 products with better variety (not all Lilly Pulitzer). Include: 3 dresses, 2 tops, 1 bottom, 1 swimwear, 1 accessory. Mix of NWT/NWOT/Like New/Gently Used. Price range $25-$150. Use high-quality Unsplash fashion images.
- **Vintage Finds NYC (seller-2):** Keep at 5 products but improve descriptions. More compelling copy that tells a story about each piece.

### 2. Store Homepage Improvements
For `/store/[slug]` (the store homepage):
- Add a proper hero section with the store's about text styled nicely, not just plain text
- Show "Shop by Category" section with category cards (only show categories that have products)
- Make the featured products section more visually appealing
- Add a "New Arrivals" label or badge on recently added items
- Better empty states if no products exist

### 3. Mobile Experience Polish
Review ALL store pages on mobile viewport (375px wide):
- Ensure product grid is properly 2 columns with no overflow
- Cart page should stack cleanly
- Product detail image should be full-width on mobile
- Navigation should be clean and not cramped
- Test filter drawer on shop page

### 4. Store SEO
Add proper metadata to store pages:
- Store homepage: title = "{storeName} | ShopSync", description from aboutText
- Product pages: title = "{productName} - {storeName}", description from product description
- Shop page: title = "Shop {storeName}"
- Use generateMetadata() in the page files

### 5. Landing Page Copy Improvements
The landing page at / needs:
- More specific, compelling copy (not generic SaaS speak)
- Replace placeholder testimonials with more believable ones (use made-up but realistic quotes from "Instagram sellers")
- Add a "Built for Social Sellers" section that specifically calls out: Instagram sellers, Poshmark/Depop sellers, Facebook Marketplace sellers, TikTok Shop sellers
- Better CTA text — "Start Your Free Store" instead of generic "Get Started"

### 6. README.md
Create/update README.md in the app directory with:
- Project description
- Tech stack
- Getting started (npm install, env setup, npm run dev)
- Project structure
- Available templates list
- Deployment instructions

## Rules
- All TypeScript, zero `any` types
- Mobile-first responsive design
- `next build` must pass clean with zero errors
- Don't break any existing functionality
- Keep all existing routes and features working

When finished, make sure `npm run build` passes with zero errors.
