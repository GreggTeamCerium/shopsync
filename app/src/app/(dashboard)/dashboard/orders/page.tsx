import type { Metadata } from "next";
import { getCurrentSeller, getOrdersBySeller } from "@/lib/data";
import { OrdersList } from "@/components/dashboard/orders-list";

export const metadata: Metadata = {
  title: "Orders — ShopSync",
};

export default async function OrdersPage() {
  const seller = await getCurrentSeller();
  if (!seller) return null;
  const orders = await getOrdersBySeller(seller.id);

  return <OrdersList orders={orders} />;
}
