"use client";

import { useEffect, useState } from "react";
import { Check, Sparkles, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SubscriptionTier } from "@/lib/data";
import { cn } from "@/lib/utils";

interface BillingClientProps {
  tier: SubscriptionTier;
  upgraded: boolean;
  canceled: boolean;
}

interface PlanDef {
  id: SubscriptionTier;
  name: string;
  price: number;
  description: string;
  features: string[];
}

const PLANS: PlanDef[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Get started",
    features: [
      "10 products",
      "ShopSync subdomain",
      "Basic templates",
      "Mobile-optimized store",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 19,
    description: "Everything you need to sell",
    features: [
      "50 products",
      "Custom domain",
      "Stripe payments",
      "All templates",
      "Zero transaction fees",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 39,
    description: "Scale your business",
    features: [
      "Unlimited products",
      "Custom domain",
      "Auto-sync with Instagram",
      "Analytics dashboard",
      "Custom CSS",
      "Priority support",
    ],
  },
];

const COMPARISON: Array<{
  feature: string;
  free: string | boolean;
  starter: string | boolean;
  pro: string | boolean;
}> = [
  { feature: "Products", free: "10", starter: "50", pro: "Unlimited" },
  { feature: "Custom domain", free: false, starter: true, pro: true },
  { feature: "Store templates", free: "Basic", starter: "All", pro: "All" },
  { feature: "Stripe payments", free: false, starter: true, pro: true },
  { feature: "Analytics dashboard", free: false, starter: false, pro: true },
  {
    feature: "Auto-sync from Instagram",
    free: false,
    starter: false,
    pro: true,
  },
  { feature: "Custom CSS", free: false, starter: false, pro: true },
  { feature: "Priority support", free: false, starter: false, pro: true },
  {
    feature: "Transaction fees",
    free: "—",
    starter: "0%",
    pro: "0%",
  },
];

export function BillingClient({ tier, upgraded, canceled }: BillingClientProps) {
  const [loading, setLoading] = useState<SubscriptionTier | "portal" | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(upgraded);

  useEffect(() => {
    if (!showSuccess) return;
    const id = setTimeout(() => setShowSuccess(false), 6000);
    return () => clearTimeout(id);
  }, [showSuccess]);

  async function startCheckout(target: "starter" | "pro") {
    setError(null);
    setLoading(target);
    try {
      const res = await fetch("/api/checkout/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: target }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Could not start checkout");
        setLoading(null);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Network error. Please try again.");
      setLoading(null);
    }
  }

  async function openPortal() {
    setError(null);
    setLoading("portal");
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Could not open billing portal");
        setLoading(null);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Network error. Please try again.");
      setLoading(null);
    }
  }

  const currentPlan = PLANS.find((p) => p.id === tier) ?? PLANS[0];
  const isPaid = tier !== "free";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy">Billing &amp; Plan</h1>
        <p className="text-gray-600 mt-1">
          Manage your subscription and unlock more features.
        </p>
      </div>

      {showSuccess && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-900">
              Thanks for upgrading!
            </p>
            <p className="text-sm text-green-800 mt-0.5">
              Your subscription is active. New features are unlocked
              immediately.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSuccess(false)}
            className="text-green-600 hover:text-green-800 cursor-pointer"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {canceled && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
          Checkout canceled. No changes were made to your plan.
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-accent/20 bg-accent/10 text-accent p-4 text-sm">
          {error}
        </div>
      )}

      {/* Current plan */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Current plan</p>
            <h2 className="text-xl font-bold text-navy mt-1">
              {currentPlan.name}{" "}
              {currentPlan.price > 0 && (
                <span className="text-gray-500 font-normal">
                  · ${currentPlan.price}/mo
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {currentPlan.description}
            </p>
          </div>
          {isPaid && (
            <Button
              variant="outline"
              onClick={openPortal}
              disabled={loading === "portal"}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {loading === "portal" ? "Opening..." : "Manage Subscription"}
            </Button>
          )}
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === tier;
          const isUpgrade =
            (tier === "free" && plan.id !== "free") ||
            (tier === "starter" && plan.id === "pro");
          return (
            <div
              key={plan.id}
              className={cn(
                "rounded-xl border p-6 flex flex-col",
                isCurrent
                  ? "border-primary ring-2 ring-primary/20 bg-white"
                  : "border-gray-200 bg-white"
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-navy">{plan.name}</h3>
                {isCurrent && (
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-navy mt-3">
                ${plan.price}
                <span className="text-sm text-gray-500 font-normal">/mo</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
              <ul className="mt-4 space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {plan.id === "free" ? (
                  isCurrent ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={openPortal}
                      disabled={loading === "portal"}
                    >
                      {loading === "portal" ? "Opening..." : "Downgrade"}
                    </Button>
                  )
                ) : isCurrent ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={openPortal}
                    disabled={loading === "portal"}
                  >
                    {loading === "portal" ? "Opening..." : "Manage"}
                  </Button>
                ) : isUpgrade ? (
                  <Button
                    className="w-full"
                    onClick={() => startCheckout(plan.id as "starter" | "pro")}
                    disabled={loading !== null}
                  >
                    {loading === plan.id ? "Loading..." : `Upgrade to ${plan.name}`}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={openPortal}
                    disabled={loading === "portal"}
                  >
                    {loading === "portal" ? "Opening..." : "Switch Plan"}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-navy">Plan comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 font-medium text-gray-600">Feature</th>
                <th className="px-6 py-3 font-medium text-gray-600">Free</th>
                <th className="px-6 py-3 font-medium text-gray-600">Starter</th>
                <th className="px-6 py-3 font-medium text-gray-600">Pro</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-t border-gray-100">
                  <td className="px-6 py-3 text-navy font-medium">
                    {row.feature}
                  </td>
                  <td className="px-6 py-3">{renderCell(row.free)}</td>
                  <td className="px-6 py-3">{renderCell(row.starter)}</td>
                  <td className="px-6 py-3">{renderCell(row.pro)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function renderCell(value: string | boolean) {
  if (value === true) {
    return <Check className="h-4 w-4 text-primary" aria-label="Included" />;
  }
  if (value === false) {
    return <X className="h-4 w-4 text-gray-300" aria-label="Not included" />;
  }
  return <span className="text-gray-700">{value}</span>;
}
