import { notFound } from "next/navigation";
import Link from "next/link";
import { getSellerBySlug, getAvailableProductsBySeller } from "@/lib/data";
import { getTemplate, getEffectiveColors } from "@/lib/templates";
import { ProductCard } from "@/components/store/product-card";
import type { ProductCategory } from "@/lib/data";

export default async function StoreHomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seller = getSellerBySlug(slug);
  if (!seller) notFound();

  const template = getTemplate(seller.template);
  const colors = getEffectiveColors(seller.template, seller.colors);
  const products = getAvailableProductsBySeller(seller.id);
  const featured = products.slice(0, 4);

  // Get unique categories
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ) as ProductCategory[];

  return (
    <div>
      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <h2
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{
            fontFamily: template.fonts.heading,
            color: colors.primary,
          }}
        >
          {seller.storeName}
        </h2>
        <p
          className="text-lg max-w-xl mx-auto mb-8"
          style={{ color: `${colors.primary}99` }}
        >
          {seller.aboutText || "Welcome to our store!"}
        </p>
        <Link
          href={`/store/${slug}/shop`}
          className="inline-flex items-center px-8 py-3 text-sm font-semibold rounded-lg transition-opacity hover:opacity-90"
          style={{
            backgroundColor: colors.primary,
            color: colors.secondary,
            borderRadius: template.borderRadius,
          }}
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-12">
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
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                storeSlug={slug}
                template={template}
                colors={colors}
              />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
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
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/store/${slug}/shop?category=${cat}`}
                className="p-4 text-center text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: `${colors.primary}10`,
                  color: colors.primary,
                  borderRadius: template.borderRadius,
                }}
              >
                {cat}
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
            <p className="text-sm leading-relaxed" style={{ color: `${colors.primary}99` }}>
              {seller.aboutText}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
