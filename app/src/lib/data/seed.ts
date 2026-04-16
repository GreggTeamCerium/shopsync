import type { Seller, Product, Order } from "./types";

export const seedSellers: Seller[] = [
  {
    id: "seller-1",
    email: "hello@chomchom.store",
    storeName: "Chom Chom Store",
    storeSlug: "chom-chom-store",
    template: "resort",
    colors: { primary: "#1B1B1B", secondary: "#FBF8F4", accent: "#C8956C" },
    logo: null,
    aboutText:
      "Welcome to Chom Chom Store! We curate the prettiest resort wear, preppy favorites, and designer pieces at prices that make you smile. Every item is carefully inspected and photographed so you know exactly what you're getting. Based in Palm Beach, shipping nationwide.",
    customDomain: null,
    stripeAccountId: null,
    subscriptionTier: "starter",
    instagramConnected: false,
    createdAt: "2026-03-01T12:00:00Z",
  },
  {
    id: "seller-2",
    email: "shop@vintagefindsnyc.com",
    storeName: "Vintage Finds NYC",
    storeSlug: "vintage-finds-nyc",
    template: "vintage",
    colors: { primary: "#1A1A2E", secondary: "#F5F0EB", accent: "#B8860B" },
    logo: null,
    aboutText:
      "Hand-picked vintage and secondhand treasures from New York City. We believe in sustainable fashion and giving beautiful clothes a second life. Every piece tells a story.",
    customDomain: null,
    stripeAccountId: null,
    subscriptionTier: "pro",
    instagramConnected: false,
    createdAt: "2026-02-15T09:30:00Z",
  },
];

export const seedProducts: Product[] = [
  // ── Chom Chom Store (seller-1): 8 products ──────────────────────────────
  // 3 dresses
  {
    id: "prod-1",
    sellerId: "seller-1",
    name: "Lilly Pulitzer Essie Dress",
    brand: "Lilly Pulitzer",
    category: "Dresses",
    size: "S",
    condition: "NWOT",
    price: 8500,
    description:
      "Gorgeous Essie dress in the Peelin' Out print. Never worn but tags removed. Perfect for brunch or a beach vacation. Flattering shift silhouette with a fun pop of color.",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-10T14:00:00Z",
    updatedAt: "2026-04-10T14:00:00Z",
  },
  {
    id: "prod-2",
    sellerId: "seller-1",
    name: "Reformation Juliette Midi Dress",
    brand: "Reformation",
    category: "Dresses",
    size: "M",
    condition: "Like New",
    price: 12800,
    description:
      "The dress that sells out every summer. Fitted bodice with a sweetheart neckline and flowy midi skirt. Worn once to an outdoor wedding — got so many compliments I almost kept it. Smoke-free home.",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-12T10:00:00Z",
    updatedAt: "2026-04-12T10:00:00Z",
  },
  {
    id: "prod-3",
    sellerId: "seller-1",
    name: "Free People Adella Maxi Slip Dress",
    brand: "Free People",
    category: "Dresses",
    size: "XS",
    condition: "NWT",
    price: 6800,
    description:
      "Brand new with tags! Beautiful lace-detailed maxi in ivory. Bought for a bachelorette party and plans changed. Fully lined, adjustable straps. Retails for $128.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-13T16:00:00Z",
    updatedAt: "2026-04-13T16:00:00Z",
  },
  // 2 tops
  {
    id: "prod-4",
    sellerId: "seller-1",
    name: "Lilly Pulitzer Elsa Silk Top",
    brand: "Lilly Pulitzer",
    category: "Tops",
    size: "M",
    condition: "Like New",
    price: 4800,
    description:
      "Classic Elsa top in a beautiful blue and green print. Worn once for a photo shoot. 100% silk, so comfortable and elegant. A closet staple for resort season.",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-08T10:00:00Z",
    updatedAt: "2026-04-08T10:00:00Z",
  },
  {
    id: "prod-5",
    sellerId: "seller-1",
    name: "Anthropologie Smocked Peplum Top",
    brand: "Anthropologie",
    category: "Tops",
    size: "S",
    condition: "NWOT",
    price: 3400,
    description:
      "The cutest smocked peplum in a sage green. Removed tags to try on, decided it wasn't my color. Pairs perfectly with white jeans or linen shorts. Cotton blend, machine washable.",
    images: [
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-05T11:00:00Z",
    updatedAt: "2026-04-05T11:00:00Z",
  },
  // 1 bottom
  {
    id: "prod-6",
    sellerId: "seller-1",
    name: "Lilly Pulitzer Callahan Shorts",
    brand: "Lilly Pulitzer",
    category: "Bottoms",
    size: "4",
    condition: "NWT",
    price: 5200,
    description:
      "Brand new with tags Callahan shorts in Multi Swizzle. 5\" inseam, perfect length for summer. Classic Lilly fit — these are the shorts that started it all.",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-06T08:00:00Z",
    updatedAt: "2026-04-06T08:00:00Z",
  },
  // 1 swimwear
  {
    id: "prod-7",
    sellerId: "seller-1",
    name: "Solid & Striped Anne-Marie One-Piece",
    brand: "Solid & Striped",
    category: "Swimwear",
    size: "S",
    condition: "NWT",
    price: 9800,
    description:
      "Stunning one-piece in classic navy and white stripes. Tags still on — bought on final sale and it's slightly too small. Fully lined, adjustable straps. Retails for $168.",
    images: [
      "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-07T16:00:00Z",
    updatedAt: "2026-04-07T16:00:00Z",
  },
  // 1 accessory
  {
    id: "prod-8",
    sellerId: "seller-1",
    name: "Tory Burch Kira Crossbody Bag",
    brand: "Tory Burch",
    category: "Accessories",
    size: "One Size",
    condition: "Gently Used",
    price: 14500,
    description:
      "The perfect everyday crossbody in 'Classic Sand'. Chevron quilted leather, gold-tone hardware, adjustable chain strap. Minor scuffing on the bottom corners — priced accordingly. Includes dust bag.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-03-28T09:00:00Z",
    updatedAt: "2026-03-28T09:00:00Z",
  },

  // ── Vintage Finds NYC (seller-2): 5 products ────────────────────────────
  {
    id: "prod-9",
    sellerId: "seller-2",
    name: "90s Levi's 501 Jeans",
    brand: "Levi's",
    category: "Bottoms",
    size: "28",
    condition: "Gently Used",
    price: 6500,
    description:
      "Found these beauties at an estate sale in Williamsburg. Authentic 90s Levi's 501 straight leg with the perfect sun-bleached fade you can't fake. Button fly, no rips or stains. Measured: waist 28\", inseam 30\". The holy grail of vintage denim.",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-08T12:00:00Z",
    updatedAt: "2026-04-08T12:00:00Z",
  },
  {
    id: "prod-10",
    sellerId: "seller-2",
    name: "Burberry Heritage Trench Coat",
    brand: "Burberry",
    category: "Outerwear",
    size: "M",
    condition: "Gently Used",
    price: 28500,
    description:
      "The trench coat dreams are made of. Sourced from a collector in the Upper East Side who kept her closet in museum condition. Classic honey khaki, iconic check lining, horn-toggle buttons. Belt has minor patina that only adds character. This is the kind of piece you'll pass down to your daughter.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-10T09:00:00Z",
    updatedAt: "2026-04-10T09:00:00Z",
  },
  {
    id: "prod-11",
    sellerId: "seller-2",
    name: "Vintage Fleetwood Mac Rumours Tour Tee",
    brand: "Vintage",
    category: "Tops",
    size: "L",
    condition: "Gently Used",
    price: 4500,
    description:
      "A true collector's find — not a reprint. This 1977 Rumours tour tee has been perfectly broken in over decades: faded black cotton, single-stitch hems, and a soft hand-feel that new tees just can't replicate. Found at a record store closing sale in the East Village. Authenticated by graphic and stitching details.",
    images: [
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-11T13:00:00Z",
    updatedAt: "2026-04-11T13:00:00Z",
  },
  {
    id: "prod-12",
    sellerId: "seller-2",
    name: "70s Floral Empire-Waist Midi Dress",
    brand: "Vintage",
    category: "Dresses",
    size: "S",
    condition: "Like New",
    price: 5500,
    description:
      "This dress stopped me in my tracks at a Brooklyn flea market. Rust, mustard, and cream florals on a lightweight cotton — the colors are as vivid as the day it was made. Empire waist, bell sleeves, and a midi hem that moves beautifully when you walk. No tags but feels like it was never worn. True 1970s craftsmanship.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-12T10:00:00Z",
    updatedAt: "2026-04-12T10:00:00Z",
  },
  {
    id: "prod-13",
    sellerId: "seller-2",
    name: "Italian Silk Scarf — Jewel Tones",
    brand: "Unknown",
    category: "Accessories",
    size: "One Size",
    condition: "Like New",
    price: 2800,
    description:
      "Picked this up from a vintage dealer who spent 20 years sourcing accessories in Florence. Hand-rolled edges, rich emerald, burgundy, and gold floral print on pure silk. Wear it as a headscarf à la Audrey Hepburn, tie it on your handbag, or knot it at the neck with a white tee. The kind of piece that makes any outfit feel intentional.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-04-09T15:00:00Z",
    updatedAt: "2026-04-09T15:00:00Z",
  },
];

export const seedOrders: Order[] = [
  {
    id: "order-1",
    sellerId: "seller-1",
    customerEmail: "sarah@example.com",
    customerName: "Sarah Johnson",
    items: [
      {
        productId: "prod-3",
        name: "Free People Adella Maxi Slip Dress",
        price: 6800,
        size: "XS",
      },
    ],
    total: 6800,
    status: "completed",
    createdAt: "2026-03-20T09:00:00Z",
  },
  {
    id: "order-2",
    sellerId: "seller-1",
    customerEmail: "emily@example.com",
    customerName: "Emily Chen",
    items: [
      {
        productId: "prod-4",
        name: "Lilly Pulitzer Elsa Silk Top",
        price: 4800,
        size: "M",
      },
      {
        productId: "prod-6",
        name: "Lilly Pulitzer Callahan Shorts",
        price: 5200,
        size: "4",
      },
    ],
    total: 10000,
    status: "completed",
    createdAt: "2026-03-22T14:30:00Z",
  },
  {
    id: "order-3",
    sellerId: "seller-1",
    customerEmail: "jessica@example.com",
    customerName: "Jessica Park",
    items: [
      {
        productId: "prod-1",
        name: "Lilly Pulitzer Essie Dress",
        price: 8500,
        size: "S",
      },
    ],
    total: 8500,
    status: "refunded",
    createdAt: "2026-03-25T11:15:00Z",
  },
];
