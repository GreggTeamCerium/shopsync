import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Seller } from "@/lib/data";
import type { TemplateConfig } from "@/lib/templates";

interface StoreHeaderProps {
  seller: Seller;
  template: TemplateConfig;
  colors: { primary: string; secondary: string; accent: string };
}

export function StoreHeader({ seller, template, colors }: StoreHeaderProps) {
  const baseSlug = `/store/${seller.storeSlug}`;

  return (
    <header
      className="border-b"
      style={{ borderColor: `${colors.primary}20` }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={baseSlug}>
          <h1
            className="text-2xl font-bold"
            style={{
              fontFamily: template.fonts.heading,
              color: colors.primary,
            }}
          >
            {seller.storeName}
          </h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href={`${baseSlug}/shop`}
            className="text-sm font-medium hover:opacity-80 transition-opacity hidden sm:inline"
            style={{ color: colors.primary }}
          >
            Shop
          </Link>
          <Link
            href={`${baseSlug}/cart`}
            className="relative p-2 hover:opacity-80 transition-opacity"
            style={{ color: colors.primary }}
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
