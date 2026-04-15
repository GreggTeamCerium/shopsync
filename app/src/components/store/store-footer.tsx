import type { Seller } from "@/lib/data";

interface StoreFooterProps {
  seller: Seller;
  colors: { primary: string; secondary: string; accent: string };
}

export function StoreFooter({ seller, colors }: StoreFooterProps) {
  return (
    <footer
      className="border-t mt-auto py-8"
      style={{ borderColor: `${colors.primary}20` }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm" style={{ color: `${colors.primary}80` }}>
          &copy; {new Date().getFullYear()} {seller.storeName}. Powered by{" "}
          <span className="font-semibold" style={{ color: colors.primary }}>
            ShopSync
          </span>
        </p>
      </div>
    </footer>
  );
}
