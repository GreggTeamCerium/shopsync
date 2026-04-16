import type { Metadata } from "next";
import {
  Package,
  ShoppingCart,
  Eye,
  DollarSign,
  CheckCircle2,
  Circle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { getCurrentSeller, getProductsBySeller, getOrdersBySeller } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Dashboard — ShopSync",
};

export default async function DashboardPage() {
  const seller = await getCurrentSeller();
  // Layout already redirects if no seller, so this is for type narrowing.
  if (!seller) return null;

  const [products, orders] = await Promise.all([
    getProductsBySeller(seller.id),
    getOrdersBySeller(seller.id),
  ]);

  const completedOrders = orders.filter((o) => o.status === "completed");
  const revenue = completedOrders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      label: "Products",
      value: String(products.length),
      icon: Package,
    },
    {
      label: "Orders",
      value: String(orders.length),
      icon: ShoppingCart,
    },
    {
      label: "Store Views",
      value: "—",
      icon: Eye,
    },
    {
      label: "Revenue",
      value: revenue > 0 ? formatPrice(revenue) : "$0",
      icon: DollarSign,
    },
  ];

  const checklist = [
    {
      label: "Add your first product",
      done: products.length > 0,
      href: "/dashboard/products",
    },
    {
      label: "Choose a template",
      done: seller.template !== "minimal" || seller.aboutText.length > 0,
      href: "/dashboard/settings",
    },
    {
      label: "Connect Stripe",
      done: Boolean(seller.stripeAccountId),
      href: "/dashboard/settings",
    },
    {
      label: "Set up your domain",
      done: Boolean(seller.customDomain),
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-navy">
          Welcome to ShopSync
        </h1>
        <p className="text-gray-600 mt-1">
          Get your store up and running with the checklist below.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <stat.icon className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-navy">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Getting Started Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-navy mb-1">
          Getting Started
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Complete these steps to launch your store
        </p>
        <div className="space-y-3">
          {checklist.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {item.done ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
                <span
                  className={`text-sm font-medium ${
                    item.done ? "text-gray-400 line-through" : "text-navy"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/products"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary/30 hover:shadow-md transition-all group"
        >
          <Package className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-semibold text-navy mb-1">Add Products</h3>
          <p className="text-sm text-gray-600">
            Start adding products to your store manually or import from
            Instagram.
          </p>
        </Link>
        <Link
          href="/dashboard/settings"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary/30 hover:shadow-md transition-all group"
        >
          <Eye className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-semibold text-navy mb-1">Customize Store</h3>
          <p className="text-sm text-gray-600">
            Choose a template, set your brand colors, and make it yours.
          </p>
        </Link>
      </div>
    </div>
  );
}
