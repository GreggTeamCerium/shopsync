import Link from "next/link";
import { Store } from "lucide-react";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-navy">ShopSync</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm text-gray-600 hover:text-navy transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-600 hover:text-navy transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-sm text-gray-600 hover:text-navy transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-navy transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
