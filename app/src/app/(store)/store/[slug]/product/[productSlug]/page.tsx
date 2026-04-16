import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getSellerBySlug,
  getProductById,
  getAvailableProductsBySeller,
} from "@/lib/data";
import { getTemplate, getEffectiveColors } from "@/lib/templates";
import { ProductDetail } from "@/components/store/product-detail";

type Props = {
  params: Promise<{ slug: string; productSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const seller = getSellerBySlug(slug);
  const product = getProductById(productSlug);
  if (!seller || !product) return {};
  return {
    title: `${product.name} - ${seller.storeName}`,
    description: product.description || `${product.name} available at ${seller.storeName}`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug, productSlug } = await params;
  const seller = getSellerBySlug(slug);
  if (!seller) notFound();

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
    <ProductDetail
      seller={seller}
      product={product}
      related={related}
      template={template}
      colors={colors}
    />
  );
}
