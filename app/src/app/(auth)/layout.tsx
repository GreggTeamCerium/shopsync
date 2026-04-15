import Link from "next/link";
import { Store } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Store className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-navy">ShopSync</span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
