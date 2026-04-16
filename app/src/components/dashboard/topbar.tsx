"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, User, LogOut, ExternalLink, CreditCard } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SubscriptionTier } from "@/lib/data";
import { cn } from "@/lib/utils";

interface DashboardTopbarProps {
  storeName: string;
  storeSlug: string;
  email: string;
  subscriptionTier: SubscriptionTier;
}

const TIER_BADGE: Record<
  SubscriptionTier,
  { label: string; className: string }
> = {
  free: {
    label: "Free",
    className: "bg-gray-100 text-gray-600",
  },
  starter: {
    label: "Starter",
    className: "bg-primary/10 text-primary",
  },
  pro: {
    label: "Pro",
    className: "bg-accent/10 text-accent",
  },
};

export function DashboardTopbar({
  storeName,
  storeSlug,
  email,
  subscriptionTier,
}: DashboardTopbarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore — fall through to redirect
    }
    router.push("/");
    router.refresh();
  }

  const initial = (storeName.charAt(0) || email.charAt(0) || "S").toUpperCase();
  const tierBadge = TIER_BADGE[subscriptionTier];

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
      <div className="lg:hidden w-10" />
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold text-navy">{storeName}</h1>
        <Link
          href={`/store/${storeSlug}`}
          target="_blank"
          className="text-xs text-gray-500 hover:text-primary flex items-center gap-1"
        >
          <ExternalLink className="h-3 w-3" />
          View Store
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/billing"
          className={cn(
            "hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity",
            tierBadge.className
          )}
        >
          <CreditCard className="h-3 w-3" />
          {tierBadge.label}
        </Link>

        {/* Account Menu */}
        <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
            {initial}
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-navy truncate">
                {storeName}
              </p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              Account Settings
            </Link>
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left cursor-pointer disabled:opacity-50"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              <LogOut className="h-4 w-4" />
              {loggingOut ? "Logging out..." : "Log Out"}
            </button>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}
