import type { Metadata } from "next";
import { getCurrentSeller, getProductsBySeller } from "@/lib/data";
import { ProductsTable } from "@/components/dashboard/products-table";

export const metadata: Metadata = {
  title: "Products — ShopSync",
};

export default async function ProductsPage() {
  const seller = await getCurrentSeller();
  if (!seller) return null;

  const products = await getProductsBySeller(seller.id);

  return <ProductsTable products={products} />;
}
