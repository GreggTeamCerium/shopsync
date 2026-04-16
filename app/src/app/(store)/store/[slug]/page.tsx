import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getSellerBySlug, getAvailableProductsBySeller } from "@/lib/data";
import { getTemplate, getEffectiveColors } from "@/lib/templates";
import { ProductCard } from "@/components/store/product-card";
import type { ProductCategory } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seller = await getSellerBySlug(slug);
  if (!seller) return {};
  return {
    title: `${seller.storeName} | ShopSync`,
    description: seller.aboutText || `Shop ${seller.storeName} on ShopSync`,
  };
}

const CATEGORY_ICONS: Record<ProductCategory, string> = {
  Dresses: "👗",
  Tops: "👚",
  Bottoms: "👖",
  Swimwear: "👙",
  Accessories: "👜",
  Outerwear: "🧥",
  Other: "✨",
};

function isNewArrival(createdAt: string): boolean {
  const created = new Date(createdAt).getTime();
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return created > sevenDaysAgo;
}

export default async function StoreHomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seller = await getSellerBySlug(slug);
  if (!seller) notFound();

  const template = getTemplate(seller.template);
  const colors = getEffectiveColors(seller.template, seller.colors);
  const products = await getAvailableProductsBySeller(seller.id);
  const featured = products.slice(0, 4);

  // Get unique categories with product counts
  const categoryMap = new Map<ProductCategory, number>();
  for (const p of products) {
    categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
  }
  const categories = Array.from(categoryMap.entries());

  return (
    <div>
      {/* Hero */}
      <section
        className="py-20 md:py-28 px-4 text-center"
        style={{ backgroundColor: `${colors.primary}05` }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              fontFamily: template.fonts.heading,
              color: colors.primary,
            }}
          >
            {seller.storeName}
          </h2>
          {seller.aboutText && (
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
              style={{ color: `${colors.primary}80` }}
            >
              {seller.aboutText}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/store/${slug}/shop`}
              className="inline-flex items-center px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: colors.primary,
                color: colors.secondary,
                borderRadius: template.borderRadius,
              }}
            >
              Shop All Products
            </Link>
            {products.length > 0 && (
              <span
                className="text-sm"
                style={{ color: `${colors.primary}60` }}
              >
                {products.length} {products.length === 1 ? "item" : "items"} available
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 ? (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-xl font-bold"
              style={{
                fontFamily: template.fonts.heading,
                color: colors.primary,
              }}
            >
              Featured
            </h3>
            <Link
              href={`/store/${slug}/shop`}
              className="text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: colors.primary }}
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                storeSlug={slug}
                template={template}
                colors={colors}
                showNewBadge={isNewArrival(product.createdAt)}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: `${colors.primary}10` }}
          >
            <ShoppingBag className="h-8 w-8" style={{ color: `${colors.primary}40` }} />
          </div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: colors.primary }}
          >
            Coming Soon
          </h3>
          <p
            className="text-sm"
            style={{ color: `${colors.primary}60` }}
          >
            We&apos;re adding new items — check back soon!
          </p>
        </section>
      )}

      {/* Shop by Category */}
      {categories.length > 1 && (
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <h3
            className="text-xl font-bold mb-6"
            style={{
              fontFamily: template.fonts.heading,
              color: colors.primary,
            }}
          >
            Shop by Category
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map(([cat, count]) => (
              <Link
                key={cat}
                href={`/store/${slug}/shop?category=${cat}`}
                className="flex flex-col items-center gap-2 p-5 text-center transition-all hover:opacity-80"
                style={{
                  backgroundColor: `${colors.primary}08`,
                  color: colors.primary,
                  borderRadius: template.borderRadius,
                }}
              >
                <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                <span className="text-sm font-medium">{cat}</span>
                <span
                  className="text-xs"
                  style={{ color: `${colors.primary}60` }}
                >
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      {seller.aboutText && (
        <section
          className="py-12 px-4"
          style={{ backgroundColor: `${colors.primary}05` }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3
              className="text-xl font-bold mb-4"
              style={{
                fontFamily: template.fonts.heading,
                color: colors.primary,
              }}
            >
              About Us
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: `${colors.primary}99` }}
            >
              {seller.aboutText}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
