import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  Seller,
  Product,
  Order,
  ProductStatus,
  TemplateId,
  SubscriptionTier,
  ProductCategory,
  ProductCondition,
  OrderStatus,
  OrderItem,
} from "./types";

// ─── Database row shapes (snake_case from Supabase) ─────────────────────────

interface SellerRow {
  id: string;
  email: string;
  store_name: string;
  store_slug: string;
  template: string;
  colors: { primary: string; secondary: string; accent: string };
  logo: string | null;
  about_text: string | null;
  custom_domain: string | null;
  stripe_account_id: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_tier: string;
  instagram_connected: boolean;
  created_at: string;
}

interface ProductRow {
  id: string;
  seller_id: string;
  name: string;
  brand: string;
  category: string;
  size: string;
  condition: string;
  price: number;
  description: string | null;
  images: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

interface OrderRow {
  id: string;
  seller_id: string;
  customer_email: string;
  customer_name: string;
  items: OrderItem[];
  total: number;
  status: string;
  stripe_session_id: string | null;
  created_at: string;
}

// ─── Mappers ────────────────────────────────────────────────────────────────

function mapSeller(row: SellerRow): Seller {
  return {
    id: row.id,
    email: row.email,
    storeName: row.store_name,
    storeSlug: row.store_slug,
    template: row.template as TemplateId,
    colors: row.colors,
    logo: row.logo,
    aboutText: row.about_text ?? "",
    customDomain: row.custom_domain,
    stripeAccountId: row.stripe_account_id,
    stripeCustomerId: row.stripe_customer_id ?? null,
    stripeSubscriptionId: row.stripe_subscription_id ?? null,
    subscriptionTier: row.subscription_tier as SubscriptionTier,
    instagramConnected: row.instagram_connected,
    createdAt: row.created_at,
  };
}

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    sellerId: row.seller_id,
    name: row.name,
    brand: row.brand,
    category: row.category as ProductCategory,
    size: row.size,
    condition: row.condition as ProductCondition,
    price: row.price,
    description: row.description ?? "",
    images: row.images ?? [],
    status: row.status as ProductStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    sellerId: row.seller_id,
    customerEmail: row.customer_email,
    customerName: row.customer_name,
    items: row.items ?? [],
    total: row.total,
    status: row.status as OrderStatus,
    createdAt: row.created_at,
  };
}

// ─── Sellers ────────────────────────────────────────────────────────────────

export async function getCurrentSeller(): Promise<Seller | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return mapSeller(data as SellerRow);
}

export async function getSellerBySlug(slug: string): Promise<Seller | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .eq("store_slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapSeller(data as SellerRow);
}

export interface UpdateSellerInput {
  storeName?: string;
  storeSlug?: string;
  template?: TemplateId;
  colors?: { primary: string; secondary: string; accent: string };
  aboutText?: string;
  logo?: string | null;
  customDomain?: string | null;
  subscriptionTier?: SubscriptionTier;
  instagramConnected?: boolean;
}

export async function updateSeller(
  id: string,
  data: UpdateSellerInput
): Promise<{ seller?: Seller; error?: string }> {
  const supabase = await createClient();
  const update: Record<string, unknown> = {};
  if (data.storeName !== undefined) update.store_name = data.storeName;
  if (data.storeSlug !== undefined) update.store_slug = data.storeSlug;
  if (data.template !== undefined) update.template = data.template;
  if (data.colors !== undefined) update.colors = data.colors;
  if (data.aboutText !== undefined) update.about_text = data.aboutText;
  if (data.logo !== undefined) update.logo = data.logo;
  if (data.customDomain !== undefined) update.custom_domain = data.customDomain;
  if (data.subscriptionTier !== undefined)
    update.subscription_tier = data.subscriptionTier;
  if (data.instagramConnected !== undefined)
    update.instagram_connected = data.instagramConnected;

  const { data: row, error } = await supabase
    .from("sellers")
    .update(update)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    // Postgres unique violation
    if (error.code === "23505") {
      return { error: "That store URL is already taken. Try a different one." };
    }
    return { error: error.message };
  }
  if (!row) return { error: "Seller not found" };
  return { seller: mapSeller(row as SellerRow) };
}

// ─── Products ───────────────────────────────────────────────────────────────

export async function getProductsBySeller(
  sellerId: string,
  statusFilter?: ProductStatus
): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });
  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }
  const { data, error } = await query;
  if (error || !data) return [];
  return (data as ProductRow[]).map(mapProduct);
}

export async function getAvailableProductsBySeller(
  sellerId: string
): Promise<Product[]> {
  return getProductsBySeller(sellerId, "available");
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return mapProduct(data as ProductRow);
}

export async function countProductsBySeller(sellerId: string): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("seller_id", sellerId);
  if (error) return 0;
  return count ?? 0;
}

export async function getUniqueBrandsBySeller(
  sellerId: string
): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("brand")
    .eq("seller_id", sellerId);
  if (error || !data) return [];
  const brands = new Set<string>();
  for (const row of data as { brand: string }[]) {
    if (row.brand) brands.add(row.brand);
  }
  return Array.from(brands).sort();
}

export interface CreateProductInput {
  sellerId: string;
  name: string;
  brand: string;
  category: ProductCategory;
  size: string;
  condition: ProductCondition;
  price: number;
  description?: string;
  images?: string[];
  status?: ProductStatus;
}

export async function createProduct(
  data: CreateProductInput
): Promise<{ product?: Product; error?: string }> {
  const supabase = await createClient();
  const { data: row, error } = await supabase
    .from("products")
    .insert({
      seller_id: data.sellerId,
      name: data.name,
      brand: data.brand,
      category: data.category,
      size: data.size,
      condition: data.condition,
      price: data.price,
      description: data.description ?? "",
      images: data.images ?? [],
      status: data.status ?? "available",
    })
    .select()
    .maybeSingle();

  if (error) return { error: error.message };
  if (!row) return { error: "Failed to create product" };
  return { product: mapProduct(row as ProductRow) };
}

export interface UpdateProductInput {
  name?: string;
  brand?: string;
  category?: ProductCategory;
  size?: string;
  condition?: ProductCondition;
  price?: number;
  description?: string;
  images?: string[];
  status?: ProductStatus;
}

export async function updateProduct(
  id: string,
  data: UpdateProductInput
): Promise<{ product?: Product; error?: string }> {
  const supabase = await createClient();
  const update: Record<string, unknown> = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.brand !== undefined) update.brand = data.brand;
  if (data.category !== undefined) update.category = data.category;
  if (data.size !== undefined) update.size = data.size;
  if (data.condition !== undefined) update.condition = data.condition;
  if (data.price !== undefined) update.price = data.price;
  if (data.description !== undefined) update.description = data.description;
  if (data.images !== undefined) update.images = data.images;
  if (data.status !== undefined) update.status = data.status;

  const { data: row, error } = await supabase
    .from("products")
    .update(update)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) return { error: error.message };
  if (!row) return { error: "Product not found" };
  return { product: mapProduct(row as ProductRow) };
}

export async function deleteProduct(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ─── Orders ─────────────────────────────────────────────────────────────────

export async function getOrdersBySeller(sellerId: string): Promise<Order[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as OrderRow[]).map(mapOrder);
}

// ─── Seed helper (admin) ────────────────────────────────────────────────────

export interface SeedProductInput {
  name: string;
  brand: string;
  category: ProductCategory;
  size: string;
  condition: ProductCondition;
  price: number;
  description: string;
  images: string[];
}

export async function seedProductsForSeller(
  sellerId: string,
  products: SeedProductInput[]
): Promise<{ count: number; error?: string }> {
  const admin = createAdminClient();
  const rows = products.map((p) => ({
    seller_id: sellerId,
    name: p.name,
    brand: p.brand,
    category: p.category,
    size: p.size,
    condition: p.condition,
    price: p.price,
    description: p.description,
    images: p.images,
    status: "available",
  }));
  const { data, error } = await admin.from("products").insert(rows).select();
  if (error) return { count: 0, error: error.message };
  return { count: data?.length ?? 0 };
}
