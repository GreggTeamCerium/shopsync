import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSellerBySlug, getAvailableProductsBySeller } from "@/lib/data";
import { getTemplate, getEffectiveColors } from "@/lib/templates";
import { ShopContent } from "@/components/store/shop-content";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seller = getSellerBySlug(slug);
  if (!seller) return {};
  return {
    title: `Shop ${seller.storeName}`,
    description: `Browse all products at ${seller.storeName}`,
  };
}

export default async function ShopPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const seller = getSellerBySlug(slug);

  if (!seller) {
    notFound();
  }

  const template = getTemplate(seller.template);
  const colors = getEffectiveColors(seller.template, seller.colors);
  const products = getAvailableProductsBySeller(seller.id);
  const initialCategory =
    typeof resolvedSearchParams.category === "string"
      ? resolvedSearchParams.category
      : undefined;

  return (
    <ShopContent
      seller={seller}
      products={products}
      template={template}
      colors={colors}
      initialCategory={initialCategory}
    />
  );
}
