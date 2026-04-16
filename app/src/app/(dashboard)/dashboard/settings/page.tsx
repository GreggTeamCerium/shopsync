import type { Metadata } from "next";
import { getCurrentSeller, getProductsBySeller } from "@/lib/data";
import { SettingsForm } from "@/components/dashboard/settings-form";

export const metadata: Metadata = {
  title: "Store Settings — ShopSync",
};

export default async function SettingsPage() {
  const seller = await getCurrentSeller();
  if (!seller) return null;
  const products = await getProductsBySeller(seller.id);

  return (
    <SettingsForm
      seller={seller}
      productCount={products.length}
      isDevelopment={process.env.NODE_ENV === "development"}
    />
  );
}
