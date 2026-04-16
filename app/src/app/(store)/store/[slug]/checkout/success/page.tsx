import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { getSellerBySlug } from "@/lib/data";
import { getTemplate, getEffectiveColors } from "@/lib/templates";

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seller = await getSellerBySlug(slug);
  if (!seller) notFound();

  const template = getTemplate(seller.template);
  const colors = getEffectiveColors(seller.template, seller.colors);

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
        style={{ backgroundColor: `${colors.primary}10` }}
      >
        <CheckCircle className="h-8 w-8" style={{ color: colors.primary }} />
      </div>
      <h1
        className="text-2xl font-bold mb-3"
        style={{
          fontFamily: template.fonts.heading,
          color: colors.primary,
        }}
      >
        Order Confirmed!
      </h1>
      <p
        className="text-sm mb-8"
        style={{ color: `${colors.primary}80` }}
      >
        Thank you for your purchase! You&apos;ll receive an email confirmation
        shortly with your order details.
      </p>
      <Link
        href={`/store/${slug}/shop`}
        className="inline-flex items-center px-6 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
        style={{
          backgroundColor: colors.primary,
          color: colors.secondary,
          borderRadius: template.borderRadius,
        }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
