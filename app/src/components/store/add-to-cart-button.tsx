"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "./cart-provider";
import type { Product } from "@/lib/data";

interface AddToCartButtonProps {
  product: Product;
  colors: { primary: string; secondary: string; accent: string };
  borderRadius: string;
}

export function AddToCartButton({
  product,
  colors,
  borderRadius,
}: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const alreadyInCart = items.some((i) => i.productId === product.id);

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: product.size,
      image: product.images[0] ?? "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (alreadyInCart || added) {
    return (
      <div
        className="py-3 px-6 text-center text-sm font-medium flex items-center justify-center gap-2"
        style={{
          backgroundColor: `${colors.primary}10`,
          color: colors.primary,
          borderRadius,
        }}
      >
        <Check className="h-4 w-4" />
        Added to Cart
      </div>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full py-3 px-6 text-sm font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
      style={{
        backgroundColor: colors.primary,
        color: colors.secondary,
        borderRadius,
      }}
    >
      <ShoppingBag className="h-4 w-4" />
      Add to Cart
    </button>
  );
}
