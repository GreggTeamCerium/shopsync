# Task 02: Product Management + Store Template Engine

Read CLAUDE.md first for full project context. This builds on top of the Phase 1 foundation.

## What to Build

### 1. Local Data Layer (JSON-based, Supabase-ready)
Since we don't have Supabase credentials yet, build a local data layer that:
- Stores data in-memory with seed data (like Chom Chom store approach)
- Exposes the same API interface that Supabase would use
- Easy to swap later — just change the import source

**Data models needed:**

```typescript
// Seller
{
  id: string;
  email: string;
  storeName: string;
  storeSlug: string; // URL-friendly, unique
  template: "resort" | "minimal" | "vintage";
  colors: { primary: string; secondary: string; accent: string };
  logo: string | null;
  aboutText: string;
  customDomain: string | null;
  stripeAccountId: string | null;
  subscriptionTier: "free" | "starter" | "pro";
  instagramConnected: boolean;
  createdAt: string;
}

// Product (belongs to a seller)
{
  id: string;
  sellerId: string;
  name: string;
  brand: string;
  category: "Dresses" | "Tops" | "Bottoms" | "Swimwear" | "Accessories" | "Outerwear" | "Other";
  size: string;
  condition: "NWT" | "NWOT" | "Like New" | "Gently Used";
  price: number; // cents
  description: string;
  images: string[]; // URLs or paths
  status: "available" | "sold" | "draft";
  createdAt: string;
  updatedAt: string;
}

// Order
{
  id: string;
  sellerId: string;
  customerEmail: string;
  customerName: string;
  items: { productId: string; name: string; price: number; size: string }[];
  total: number;
  status: "completed" | "refunded";
  createdAt: string;
}
```

Create 2 demo sellers with seed data:
- **Seller 1:** "Chom Chom Store" — resort template, 5 products (dresses, Lilly Pulitzer style)
- **Seller 2:** "Vintage Finds NYC" — vintage template, 5 products (mix of categories/brands)

### 2. Dashboard: Product Management (CRUD)
Route: `/dashboard/products`

**Product List View:**
- Table/grid showing all seller's products
- Columns: Image thumbnail, Name, Brand, Size, Condition, Price, Status
- Quick actions: Edit, Mark as Sold, Delete
- "Add Product" button at top
- Filter by status (All, Available, Sold, Draft)
- Empty state with CTA to add first product

**Add/Edit Product Form:**
Route: `/dashboard/products/new` and `/dashboard/products/[id]/edit`
- Image upload area (drag & drop zone, multi-image, reorder by dragging)
  - For now, use placeholder/URL input since we don't have cloud storage yet
  - Show image previews
- Fields:
  - Name (text, required)
  - Brand (text with autocomplete from existing brands, required)
  - Category (dropdown, required)
  - Size (text, required)
  - Condition (dropdown: NWT, NWOT, Like New, Gently Used, required)
  - Price (number input with $ prefix, required)
  - Description (textarea, optional)
  - Status (Available / Draft toggle)
- Zod validation on all fields
- Save button → redirect to product list
- Cancel button → back to list
- For edit: pre-populate all fields

**Mark as Sold:**
- One-click button on product list
- Confirmation dialog: "Mark [product name] as sold?"
- Updates status to "sold"

**Delete Product:**
- Confirmation dialog: "Are you sure? This cannot be undone."
- Removes from list

### 3. Dashboard: Store Settings
Route: `/dashboard/settings`

- **Store Name** — editable text input
- **Store URL Slug** — editable, shows preview: `yourstore.shopsync.store`
- **Template Selection** — visual cards showing 3 templates:
  - "Resort" — pink/green tropical (like Chom Chom)
  - "Minimal" — black/white clean
  - "Vintage" — warm/earthy tones
  - Each card shows a mini preview/mockup
  - Click to select, highlight active one
- **Brand Colors** — color pickers for primary, secondary, accent
- **About Text** — textarea for "About your store" section
- **Logo Upload** — placeholder for now (URL input)
- Save Settings button

### 4. Customer-Facing Store (Multi-Tenant)
Route: `/store/[slug]` (for now — custom domains later)

This is the actual store that customers see. It renders based on the seller's template and data.

**Store Pages:**

**Store Home** — `/store/[slug]`
- Store header with logo/name
- Featured products grid
- Categories section
- About section
- Footer

**Store Shop** — `/store/[slug]/shop`
- Full product grid with filters (size, brand, category, condition)
- Sort options
- Search
- Responsive: 2 col mobile, 3 tablet, 4 desktop

**Store Product Detail** — `/store/[slug]/product/[productSlug]`
- Image gallery
- Product info (name, brand, price, size, condition, description)
- Add to Cart button
- Related products

**Store Cart** — `/store/[slug]/cart`
- Cart items list
- Order summary
- Checkout button (demo mode — redirect to success)

**Store Checkout Success** — `/store/[slug]/checkout/success`
- Confirmation message

### 5. Template System
Each template defines:
- Color scheme (overridden by seller's custom colors if set)
- Header style
- Product card style
- Typography choices
- Layout variations

**Template 1: "Resort"**
- Colors: Pink (#FF3E9A), Emerald (#18B35D), Gold (#D4A853)
- Script/serif brand name, clean sans body
- Rounded cards, soft shadows
- Tropical/feminine vibe

**Template 2: "Minimal"**
- Colors: Black (#000), White (#FFF), Gray (#6B7280)
- Clean sans-serif everything
- Sharp edges, minimal shadows
- Modern, editorial feel

**Template 3: "Vintage"**
- Colors: Rust (#C2410C), Cream (#FEF3C7), Forest (#365314)
- Serif headers, warm tones
- Slightly textured feel
- Cozy, curated boutique vibe

Each template is a configuration object — NOT separate component trees. Use one set of store components that read from the template config for styling.

### 6. Dashboard: Orders View
Route: `/dashboard/orders`
- Table of orders with: Date, Customer, Items count, Total, Status
- Click to expand order details
- Empty state: "No orders yet"
- Seed 2-3 demo orders for Seller 1

## Design Guidelines
- Dashboard: Continue the electric blue (#2563EB) + coral (#F43F5E) design from Phase 1
- Store templates: Each has its own personality (see above)
- All mobile-first responsive
- Product forms should be clean and easy to use on mobile

## Rules
- All TypeScript, zero `any` types
- Zod validation on all forms
- `next build` must pass clean with zero errors
- Keep data layer abstracted (easy Supabase swap)
- Store routes must work with slug-based routing
- Cart uses localStorage (per-store scoped)
- Don't break any existing Phase 1 pages

When finished, make sure `npm run build` passes with zero errors.
