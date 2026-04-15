"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/dashboard/product-form";
import { getProductById, updateProduct } from "@/lib/data";
import { productSchema } from "@/lib/validations";
import type { ProductInput } from "@/lib/validations";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-xl font-bold text-navy mb-2">Product not found</h1>
        <Link href="/dashboard/products" className="text-primary text-sm">
          Back to Products
        </Link>
      </div>
    );
  }

  function handleSubmit(data: ProductInput) {
    const result = productSchema.safeParse(data);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    updateProduct(id, {
      ...result.data,
      description: result.data.description ?? "",
      images: result.data.images ?? [],
      status: result.data.status ?? "available",
    });
    router.push("/dashboard/products");
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
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-accent/10 text-accent text-sm">
          {error}
        </div>
      )}
      <ProductForm
        onSubmit={handleSubmit}
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
      <div className="mt-6 flex gap-3 justify-end">
        <Link href="/dashboard/products">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button type="submit" form="product-form">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
