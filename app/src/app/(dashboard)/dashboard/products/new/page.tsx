import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductForm } from "@/components/dashboard/product-form";
import { getCurrentSeller, getUniqueBrandsBySeller } from "@/lib/data";
import { createProductAction } from "../actions";

export default async function NewProductPage() {
  const seller = await getCurrentSeller();
  if (!seller) return null;
  const existingBrands = await getUniqueBrandsBySeller(seller.id);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/products"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-navy">Add Product</h1>
      </div>
      <ProductForm
        onSubmit={createProductAction}
        existingBrands={existingBrands}
        submitLabel="Save Product"
      />
    </div>
  );
}
