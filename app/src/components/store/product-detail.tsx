"use client";

import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import type { Product, Seller } from "@/lib/data";
import type { TemplateConfig } from "@/lib/templates";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/store/product-card";
import { AddToCartButton } from "@/components/store/add-to-cart-button";

interface ProductDetailProps {
  seller: Seller;
  product: Product;
  related: Product[];
  template: TemplateConfig;
  colors: { primary: string; secondary: string; accent: string };
}

export function ProductDetail({
  seller,
  product,
  related,
  template,
  colors,
}: ProductDetailProps) {
  const slug = seller.storeSlug;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <Link
        href={`/store/${slug}/shop`}
        className="inline-flex items-center gap-1 text-sm mb-4 md:mb-6 hover:opacity-80"
        style={{ color: `${colors.primary}80` }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Image Gallery */}
        <div className="space-y-3 -mx-4 md:mx-0">
          <div className="aspect-[3/4] overflow-hidden bg-gray-100">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-16 w-16 text-gray-300" />
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 px-4 md:px-0">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square overflow-hidden bg-gray-100"
                  style={{ borderRadius: template.borderRadius }}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p
            className="text-sm mb-1"
            style={{ color: colors.accent || "#6B7280" }}
          >
            {product.brand}
          </p>
          <h1
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{
              fontFamily: template.fonts.heading,
              color: colors.primary,
            }}
          >
            {product.name}
          </h1>
          <p
            className="text-2xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            {formatPrice(product.price)}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex gap-6 text-sm">
              <div>
                <span style={{ color: `${colors.primary}60` }}>Size: </span>
                <span
                  className="font-medium"
                  style={{ color: colors.primary }}
                >
                  {product.size}
                </span>
              </div>
              <div>
                <span style={{ color: `${colors.primary}60` }}>
                  Condition:{" "}
                </span>
                <span
                  className="font-medium"
                  style={{ color: colors.primary }}
                >
                  {product.condition}
                </span>
              </div>
            </div>
            <div>
              <span
                className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: `${colors.primary}10`,
                  color: colors.primary,
                }}
              >
                {product.category}
              </span>
            </div>
          </div>

          {product.status === "available" ? (
            <AddToCartButton
              product={product}
              colors={colors}
              borderRadius={template.borderRadius}
            />
          ) : (
            <div
              className="py-3 px-6 text-center text-sm font-medium rounded-lg"
              style={{
                backgroundColor: `${colors.primary}10`,
                color: `${colors.primary}80`,
                borderRadius: template.borderRadius,
              }}
            >
              Sold
            </div>
          )}

          {product.description && (
            <div className="mt-8">
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: colors.primary }}
              >
                Description
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: `${colors.primary}99` }}
              >
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h3
            className="text-xl font-bold mb-6"
            style={{
              fontFamily: template.fonts.heading,
              color: colors.primary,
            }}
          >
            You might also like
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                storeSlug={slug}
                template={template}
                colors={colors}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
