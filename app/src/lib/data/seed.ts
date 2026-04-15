import type { Seller, Product, Order } from "./types";

export const seedSellers: Seller[] = [
  {
    id: "seller-1",
    email: "hello@chomchom.store",
    storeName: "Chom Chom Store",
    storeSlug: "chom-chom-store",
    template: "resort",
    colors: { primary: "#FF3E9A", secondary: "#18B35D", accent: "#D4A853" },
    logo: null,
    aboutText:
      "Welcome to Chom Chom Store! We curate the prettiest Lilly Pulitzer pieces, resort wear, and preppy favorites. All items are carefully inspected and described honestly. Happy shopping!",
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
    colors: { primary: "#C2410C", secondary: "#FEF3C7", accent: "#365314" },
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
  // Chom Chom Store products
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
      "Gorgeous Essie dress in the Peelin' Out print. Never worn but tags removed. Perfect for brunch or a beach vacation. Flattering shift silhouette.",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-03-10T14:00:00Z",
    updatedAt: "2026-03-10T14:00:00Z",
  },
  {
    id: "prod-2",
    sellerId: "seller-1",
    name: "Lilly Pulitzer Elsa Top",
    brand: "Lilly Pulitzer",
    category: "Tops",
    size: "M",
    condition: "Like New",
    price: 4800,
    description:
      "Classic Elsa top in a beautiful blue and green print. Worn once for a photo shoot. Silk material, so comfortable and elegant.",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-03-11T10:00:00Z",
    updatedAt: "2026-03-11T10:00:00Z",
  },
  {
    id: "prod-3",
    sellerId: "seller-1",
    name: "Lilly Pulitzer Callahan Shorts",
    brand: "Lilly Pulitzer",
    category: "Bottoms",
    size: "4",
    condition: "NWT",
    price: 5200,
    description:
      "Brand new with tags Callahan shorts in Multi Swizzle. 5\" inseam, perfect length for summer. Classic Lilly fit.",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-03-12T08:00:00Z",
    updatedAt: "2026-03-12T08:00:00Z",
  },
  {
    id: "prod-4",
    sellerId: "seller-1",
    name: "Lilly Pulitzer Pippa Bikini",
    brand: "Lilly Pulitzer",
    category: "Swimwear",
    size: "S",
    condition: "NWT",
    price: 9800,
    description:
      "Adorable Pippa bikini set in Conch Shell Pink. Tags still attached. Top and bottom included. Fully lined.",
    images: [
      "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-03-13T16:00:00Z",
    updatedAt: "2026-03-13T16:00:00Z",
  },
  {
    id: "prod-5",
    sellerId: "seller-1",
    name: "Lilly Pulitzer Marlowe Dress",
    brand: "Lilly Pulitzer",
    category: "Dresses",
    size: "XS",
    condition: "Gently Used",
    price: 3500,
    description:
      "Super cute Marlowe boatneck T-shirt dress. Worn a few times, still in great condition. Great everyday dress.",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
    ],
    status: "sold",
    createdAt: "2026-03-05T11:00:00Z",
    updatedAt: "2026-03-20T09:00:00Z",
  },
  // Vintage Finds NYC products
  {
    id: "prod-6",
    sellerId: "seller-2",
    name: "90s Levi's 501 Jeans",
    brand: "Levi's",
    category: "Bottoms",
    size: "28",
    condition: "Gently Used",
    price: 6500,
    description:
      "Authentic vintage 90s Levi's 501 straight leg jeans. Perfect fade and worn-in feel. Button fly. Measured waist 28\", inseam 30\".",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-03-08T12:00:00Z",
    updatedAt: "2026-03-08T12:00:00Z",
  },
  {
    id: "prod-7",
    sellerId: "seller-2",
    name: "Vintage Silk Scarf",
    brand: "Unknown",
    category: "Accessories",
    size: "One Size",
    condition: "Like New",
    price: 2800,
    description:
      "Beautiful vintage silk scarf with floral pattern. Rich jewel tones of emerald, burgundy, and gold. Can be worn as a headscarf, necktie, or bag accessory.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-03-09T15:00:00Z",
    updatedAt: "2026-03-09T15:00:00Z",
  },
  {
    id: "prod-8",
    sellerId: "seller-2",
    name: "Burberry Trench Coat",
    brand: "Burberry",
    category: "Outerwear",
    size: "M",
    condition: "Gently Used",
    price: 28500,
    description:
      "Classic Burberry trench coat in khaki. Heritage check lining. Some minor wear on belt but overall excellent condition. A timeless investment piece.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-03-10T09:00:00Z",
    updatedAt: "2026-03-10T09:00:00Z",
  },
  {
    id: "prod-9",
    sellerId: "seller-2",
    name: "Vintage Band Tee - Fleetwood Mac",
    brand: "Vintage",
    category: "Tops",
    size: "L",
    condition: "Gently Used",
    price: 4500,
    description:
      "Authentic vintage Fleetwood Mac Rumours tour t-shirt. Perfectly faded black, super soft cotton. Single stitch hems. A collector's piece.",
    images: [
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-03-11T13:00:00Z",
    updatedAt: "2026-03-11T13:00:00Z",
  },
  {
    id: "prod-10",
    sellerId: "seller-2",
    name: "70s Floral Midi Dress",
    brand: "Vintage",
    category: "Dresses",
    size: "S",
    condition: "Like New",
    price: 5500,
    description:
      "Stunning 70s-era floral midi dress. Rust, mustard, and cream color palette. Empire waist, bell sleeves. Feels like it was never worn.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    ],
    status: "available",
    createdAt: "2026-03-12T10:00:00Z",
    updatedAt: "2026-03-12T10:00:00Z",
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
        productId: "prod-5",
        name: "Lilly Pulitzer Marlowe Dress",
        price: 3500,
        size: "XS",
      },
    ],
    total: 3500,
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
        productId: "prod-2",
        name: "Lilly Pulitzer Elsa Top",
        price: 4800,
        size: "M",
      },
      {
        productId: "prod-3",
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
