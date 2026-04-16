export type TemplateId = "resort" | "minimal" | "vintage" | "gallery" | "collective" | "studio" | "market" | "vault" | "bloom" | "boardwalk";
export type SubscriptionTier = "free" | "starter" | "pro";
export type ProductCategory =
  | "Dresses"
  | "Tops"
  | "Bottoms"
  | "Swimwear"
  | "Accessories"
  | "Outerwear"
  | "Other";
export type ProductCondition = "NWT" | "NWOT" | "Like New" | "Gently Used";
export type ProductStatus = "available" | "sold" | "draft";
export type OrderStatus = "completed" | "refunded";

export interface Seller {
  id: string;
  email: string;
  storeName: string;
  storeSlug: string;
  template: TemplateId;
  colors: { primary: string; secondary: string; accent: string };
  logo: string | null;
  aboutText: string;
  customDomain: string | null;
  stripeAccountId: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionTier: SubscriptionTier;
  instagramConnected: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  brand: string;
  category: ProductCategory;
  size: string;
  condition: ProductCondition;
  price: number; // cents
  description: string;
  images: string[];
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  size: string;
}

export interface Order {
  id: string;
  sellerId: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
