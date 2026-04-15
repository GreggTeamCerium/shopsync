"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/dashboard/product-form";
import { createProduct, getCurrentSellerId } from "@/lib/data";
import { productSchema } from "@/lib/validations";
import type { ProductInput } from "@/lib/validations";

export default function NewProductPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(data: ProductInput) {
    const result = productSchema.safeParse(data);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    createProduct({
      ...result.data,
      sellerId: getCurrentSellerId(),
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
        <h1 className="text-2xl font-bold text-navy">Add Product</h1>
      </div>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-accent/10 text-accent text-sm">
          {error}
        </div>
      )}
      <ProductForm onSubmit={handleSubmit} />
      <div className="mt-6 flex gap-3 justify-end">
        <Link href="/dashboard/products">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button type="submit" form="product-form">
          Save Product
        </Button>
      </div>
    </div>
  );
}
