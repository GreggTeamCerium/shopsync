import Link from "next/link";
import { Store } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="bg-navy text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to own your store?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Stop giving away 20% of your revenue. Create your own store in 60
            seconds and keep your profits.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Store className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">ShopSync</span>
            </Link>
            <p className="text-sm text-gray-400">
              Turn your Instagram into a real store. Zero platform fees.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <span className="cursor-default">About</span>
              </li>
              <li>
                <span className="cursor-default">Blog</span>
              </li>
              <li>
                <span className="cursor-default">Contact</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <span className="cursor-default">Privacy</span>
              </li>
              <li>
                <span className="cursor-default">Terms</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} ShopSync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
