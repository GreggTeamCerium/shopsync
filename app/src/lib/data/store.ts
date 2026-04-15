import type { Seller, Product, Order, ProductStatus } from "./types";
import { seedSellers, seedProducts, seedOrders } from "./seed";

// In-memory data store — same API shape that Supabase queries would return.
// Swap this file for a Supabase client later.

let sellers: Seller[] = [...seedSellers];
let products: Product[] = [...seedProducts];
let orders: Order[] = [...seedOrders];

// ─── Sellers ────────────────────────────────────────────────────────────────

export function getSellers(): Seller[] {
  return sellers;
}

export function getSellerById(id: string): Seller | undefined {
  return sellers.find((s) => s.id === id);
}

export function getSellerBySlug(slug: string): Seller | undefined {
  return sellers.find((s) => s.storeSlug === slug);
}

export function updateSeller(id: string, data: Partial<Seller>): Seller | undefined {
  const idx = sellers.findIndex((s) => s.id === id);
  if (idx === -1) return undefined;
  sellers[idx] = { ...sellers[idx], ...data };
  return sellers[idx];
}

// ─── Products ───────────────────────────────────────────────────────────────

export function getProductsBySeller(
  sellerId: string,
  statusFilter?: ProductStatus
): Product[] {
  let result = products.filter((p) => p.sellerId === sellerId);
  if (statusFilter) {
    result = result.filter((p) => p.status === statusFilter);
  }
  return result.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getAvailableProductsBySeller(sellerId: string): Product[] {
  return products
    .filter((p) => p.sellerId === sellerId && p.status === "available")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function createProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">
): Product {
  const now = new Date().toISOString();
  const product: Product = {
    ...data,
    id: `prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    updatedAt: now,
  };
  products.push(product);
  return product;
}

export function updateProduct(
  id: string,
  data: Partial<Product>
): Product | undefined {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  products[idx] = {
    ...products[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return products[idx];
}

export function deleteProduct(id: string): boolean {
  const len = products.length;
  products = products.filter((p) => p.id !== id);
  return products.length < len;
}

export function getUniqueBrandsBySeller(sellerId: string): string[] {
  const brands = new Set(
    products.filter((p) => p.sellerId === sellerId).map((p) => p.brand)
  );
  return Array.from(brands).sort();
}

// ─── Orders ─────────────────────────────────────────────────────────────────

export function getOrdersBySeller(sellerId: string): Order[] {
  return orders
    .filter((o) => o.sellerId === sellerId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function createOrder(
  data: Omit<Order, "id" | "createdAt">
): Order {
  const order: Order = {
    ...data,
    id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

// ─── Current seller helper (mock auth) ──────────────────────────────────────

const CURRENT_SELLER_ID = "seller-1";

export function getCurrentSeller(): Seller {
  return sellers.find((s) => s.id === CURRENT_SELLER_ID)!;
}

export function getCurrentSellerId(): string {
  return CURRENT_SELLER_ID;
}
