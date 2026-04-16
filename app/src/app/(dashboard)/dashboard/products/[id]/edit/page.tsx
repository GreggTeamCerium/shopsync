import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  getCurrentSeller,
  getProductById,
  getUniqueBrandsBySeller,
} from "@/lib/data";
import { ProductForm } from "@/components/dashboard/product-form";
import { updateProductAction } from "../../actions";
import type { ProductInput } from "@/lib/validations";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seller = await getCurrentSeller();
  if (!seller) return null;

  const product = await getProductById(id);

  if (!product || product.sellerId !== seller.id) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-xl font-bold text-navy mb-2">Product not found</h1>
        <Link href="/dashboard/products" className="text-primary text-sm">
          Back to Products
        </Link>
      </div>
    );
  }

  const existingBrands = await getUniqueBrandsBySeller(seller.id);

  // Bind id to the action so the form can call it with just the data.
  async function handleUpdate(data: ProductInput) {
    "use server";
    return updateProductAction(id, data);
  }

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
        <h1 className="text-2xl font-bold text-navy">Edit Product</h1>
      </div>
      <ProductForm
        onSubmit={handleUpdate}
        existingBrands={existingBrands}
        submitLabel="Save Changes"
        defaultValues={{
          name: product.name,
          brand: product.brand,
          category: product.category,
          size: product.size,
          condition: product.condition,
          price: product.price,
          description: product.description,
          images: product.images,
          status: product.status === "sold" ? "available" : product.status,
        }}
      />
    </div>
  );
}
