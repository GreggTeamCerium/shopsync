"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  Camera,
  Store,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { SubscriptionTier } from "@/lib/data";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/settings", label: "Store Settings", icon: Settings },
  {
    href: "/dashboard/import",
    label: "Import from Instagram",
    icon: Camera,
    badge: "Soon",
  },
];

const TIER_LABEL: Record<SubscriptionTier, string> = {
  free: "Free Plan",
  starter: "Starter Plan",
  pro: "Pro Plan",
};

interface DashboardSidebarProps {
  storeName: string;
  subscriptionTier: SubscriptionTier;
}

export function DashboardSidebar({
  storeName,
  subscriptionTier,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const initial = (storeName.charAt(0) || "S").toUpperCase();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-navy" />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-navy">ShopSync</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-navy"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto text-xs bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-navy truncate">
                {storeName}
              </p>
              <p className="text-xs text-gray-500">
                {TIER_LABEL[subscriptionTier]}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
