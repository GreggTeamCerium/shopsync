import type { Metadata } from "next";
import { Package, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Products — ShopSync",
};

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors cursor-pointer">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-navy mb-2">
          No products yet
        </h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Add your first product to get started. You can add products manually
          or import them from Instagram.
        </p>
      </div>
    </div>
  );
}
