import { notFound } from "next/navigation";
import { getSellerBySlug } from "@/lib/data";
import { getTemplate, getEffectiveColors } from "@/lib/templates";
import { CartView } from "@/components/store/cart-view";

export default async function CartPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seller = await getSellerBySlug(slug);
  if (!seller) notFound();

  const template = getTemplate(seller.template);
  const colors = getEffectiveColors(seller.template, seller.colors);

  return <CartView slug={slug} template={template} colors={colors} />;
}
