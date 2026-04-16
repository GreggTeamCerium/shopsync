import Link from "next/link";
import { Package } from "lucide-react";
import type { Product } from "@/lib/data";
import type { TemplateConfig } from "@/lib/templates";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  product: Product;
  storeSlug: string;
  template: TemplateConfig;
  colors: { primary: string; secondary: string; accent: string };
  showNewBadge?: boolean;
}

export function ProductCard({
  product,
  storeSlug,
  template,
  colors,
  showNewBadge,
}: ProductCardProps) {
  const productSlug = product.id;

  return (
    <Link
      href={`/store/${storeSlug}/product/${productSlug}`}
      className="group block min-w-0"
    >
      <div
        className="overflow-hidden bg-white"
        style={{
          borderRadius: template.borderRadius,
          boxShadow: template.cardShadow,
        }}
      >
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-10 w-10 text-gray-300" />
            </div>
          )}
          {showNewBadge && (
            <span
              className="absolute top-2 left-2 px-2 py-0.5 text-xs font-semibold rounded-full"
              style={{
                backgroundColor: colors.accent || colors.primary,
                color: colors.secondary,
              }}
            >
              New
            </span>
          )}
        </div>
        <div className="p-3">
          <p
            className="text-xs mb-1 truncate"
            style={{ color: colors.accent || "#6B7280" }}
          >
            {product.brand}
          </p>
          <h3
            className="text-sm font-medium truncate"
            style={{
              fontFamily: template.fonts.body,
              color: colors.primary,
            }}
          >
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <p
              className="font-semibold text-sm"
              style={{ color: colors.primary }}
            >
              {formatPrice(product.price)}
            </p>
            <span
              className="text-xs px-2 py-0.5 rounded-full shrink-0"
              style={{
                backgroundColor: `${colors.primary}10`,
                color: colors.primary,
              }}
            >
              {product.size}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
