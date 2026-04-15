import type { Metadata } from "next";
import { ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Orders — ShopSync",
};

export default function OrdersPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Orders</h1>
        <p className="text-gray-600 mt-1">Track and manage customer orders</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-navy mb-2">No orders yet</h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          When customers purchase from your store, their orders will appear
          here.
        </p>
      </div>
    </div>
  );
}
