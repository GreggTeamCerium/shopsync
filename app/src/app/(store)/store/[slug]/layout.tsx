import { notFound } from "next/navigation";
import { getSellerBySlug } from "@/lib/data";
import { getTemplate, getEffectiveColors } from "@/lib/templates";
import { StoreHeader } from "@/components/store/store-header";
import { StoreFooter } from "@/components/store/store-footer";
import { CartProvider } from "@/components/store/cart-provider";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seller = getSellerBySlug(slug);

  if (!seller) {
    notFound();
  }

  const template = getTemplate(seller.template);
  const colors = getEffectiveColors(seller.template, seller.colors);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: template.id === "minimal" ? "#FFFFFF" : `${colors.secondary}`,
        fontFamily: template.fonts.body,
      }}
    >
      <CartProvider storeSlug={slug}>
        <StoreHeader seller={seller} template={template} colors={colors} />
        <main className="flex-1">{children}</main>
        <StoreFooter seller={seller} colors={colors} />
      </CartProvider>
    </div>
  );
}
