"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import {
  getSellerBySlug,
  getProductById,
  getAvailableProductsBySeller,
} from "@/lib/data";
import { getTemplate, getEffectiveColors } from "@/lib/templates";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/store/product-card";
import { AddToCartButton } from "@/components/store/add-to-cart-button";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  const { slug, productSlug } = use(params);
  const seller = getSellerBySlug(slug);

  if (!seller) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Store not found</p>
      </div>
    );
  }

  const template = getTemplate(seller.template);
  const colors = getEffectiveColors(seller.template, seller.colors);
  const product = getProductById(productSlug);

  if (!product || product.sellerId !== seller.id) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-sm" style={{ color: `${colors.primary}60` }}>
          Product not found
        </p>
        <Link
          href={`/store/${slug}/shop`}
          className="text-sm mt-4 inline-block hover:opacity-80"
          style={{ color: colors.primary }}
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const related = getAvailableProductsBySeller(seller.id)
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href={`/store/${slug}/shop`}
        className="inline-flex items-center gap-1 text-sm mb-6 hover:opacity-80"
        style={{ color: `${colors.primary}80` }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div
            className="aspect-[3/4] overflow-hidden bg-gray-100"
            style={{ borderRadius: template.borderRadius }}
          >
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
            <div className="grid grid-cols-4 gap-2">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
