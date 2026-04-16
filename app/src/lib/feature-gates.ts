import type { SubscriptionTier } from "@/lib/data";

/**
 * Per-tier product limits. Free is 10, Starter is 50, Pro is unlimited.
 * Exposed for UI display (e.g. "8 of 10 products used") and gating.
 */
export const PRODUCT_LIMITS: Record<SubscriptionTier, number> = {
  free: 10,
  starter: 50,
  pro: Number.POSITIVE_INFINITY,
};

export function productLimitFor(tier: SubscriptionTier): number {
  return PRODUCT_LIMITS[tier];
}

export function canAddProduct(
  tier: SubscriptionTier,
  currentCount: number
): boolean {
  return currentCount < PRODUCT_LIMITS[tier];
}

export function canUseCustomDomain(tier: SubscriptionTier): boolean {
  return tier === "starter" || tier === "pro";
}

export function canAutoSync(tier: SubscriptionTier): boolean {
  return tier === "pro";
}

export function canUseAnalytics(tier: SubscriptionTier): boolean {
  return tier === "pro";
}
