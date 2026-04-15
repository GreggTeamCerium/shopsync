"use client";

import { use } from "react";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { getSellerBySlug } from "@/lib/data";
import { getTemplate, getEffectiveColors } from "@/lib/templates";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/store/cart-provider";

export default function CartPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const seller = getSellerBySlug(slug);
  const { items, removeItem, total, clearCart } = useCart();

  if (!seller) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Store not found</p>
      </div>
    );
  }

  const template = getTemplate(seller.template);
  const colors = getEffectiveColors(seller.template, seller.colors);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href={`/store/${slug}/shop`}
        className="inline-flex items-center gap-1 text-sm mb-6 hover:opacity-80"
        style={{ color: `${colors.primary}80` }}
      >
        <ArrowLeft className="h-4 w-4" />
        Continue shopping
      </Link>

      <h2
        className="text-2xl font-bold mb-6"
        style={{
          fontFamily: template.fonts.heading,
          color: colors.primary,
        }}
      >
        Your Cart
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag
            className="h-12 w-12 mx-auto mb-4"
            style={{ color: `${colors.primary}30` }}
          />
          <p className="text-sm mb-4" style={{ color: `${colors.primary}60` }}>
            Your cart is empty
          </p>
          <Link
            href={`/store/${slug}/shop`}
            className="inline-flex items-center px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: colors.primary,
              color: colors.secondary,
              borderRadius: template.borderRadius,
            }}
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div
            className="border overflow-hidden mb-6"
            style={{
              borderColor: `${colors.primary}20`,
              borderRadius: template.borderRadius,
            }}
          >
            {items.map((item, idx) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 p-4"
                style={{
                  borderTop: idx > 0 ? `1px solid ${colors.primary}10` : undefined,
                }}
              >
                <div
                  className="w-16 h-16 bg-gray-100 overflow-hidden shrink-0"
                  style={{ borderRadius: template.borderRadius }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: colors.primary }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: `${colors.primary}60` }}
                  >
                    Size: {item.size}
                  </p>
                </div>
                <p
                  className="text-sm font-semibold shrink-0"
                  style={{ color: colors.primary }}
                >
                  {formatPrice(item.price)}
                </p>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="p-2 hover:opacity-80 cursor-pointer shrink-0"
                  style={{ color: `${colors.primary}60` }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div
            className="p-6"
            style={{
              backgroundColor: `${colors.primary}05`,
              borderRadius: template.borderRadius,
            }}
          >
            <div className="flex justify-between mb-4">
              <span className="text-sm" style={{ color: `${colors.primary}80` }}>
                Subtotal ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                {formatPrice(total)}
              </span>
            </div>
            <div
              className="flex justify-between mb-6 pt-4 border-t"
              style={{ borderColor: `${colors.primary}20` }}
            >
              <span
                className="font-semibold"
                style={{ color: colors.primary }}
              >
                Total
              </span>
              <span
                className="text-lg font-bold"
                style={{ color: colors.primary }}
              >
                {formatPrice(total)}
              </span>
            </div>
            <Link
              href={`/store/${slug}/checkout/success`}
              onClick={() => clearCart()}
              className="block w-full text-center py-3 px-6 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: colors.primary,
                color: colors.secondary,
                borderRadius: template.borderRadius,
              }}
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
