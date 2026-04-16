import "server-only";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SubscriptionTier } from "@/lib/data";

let cachedStripe: Stripe | null = null;

/**
 * Lazily-initialised Stripe client. Throws if `STRIPE_SECRET_KEY` is missing
 * so misconfigured environments fail loudly at request time.
 */
export function getStripe(): Stripe {
  if (cachedStripe) return cachedStripe;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "Stripe is not configured. Set STRIPE_SECRET_KEY in your environment."
    );
  }

  cachedStripe = new Stripe(secretKey, {
    typescript: true,
  });
  return cachedStripe;
}

export type PaidTier = "starter" | "pro";

/**
 * Maps a paid tier to its Stripe Price ID env var. Throws if the env var is
 * missing — checkout cannot proceed without it.
 */
export function getPriceIdForTier(tier: PaidTier): string {
  const priceId =
    tier === "starter"
      ? process.env.STRIPE_PRICE_STARTER
      : process.env.STRIPE_PRICE_PRO;

  if (!priceId) {
    throw new Error(
      `Missing Stripe price for ${tier} plan. Set STRIPE_PRICE_${tier.toUpperCase()}.`
    );
  }
  return priceId;
}

/**
 * Reverse mapping for webhook handlers. Returns the tier whose price ID
 * matches, or null if it doesn't match either configured price.
 */
export function getTierFromPriceId(priceId: string): SubscriptionTier | null {
  if (priceId === process.env.STRIPE_PRICE_STARTER) return "starter";
  if (priceId === process.env.STRIPE_PRICE_PRO) return "pro";
  return null;
}

/**
 * Returns the seller's Stripe customer ID, creating one if it doesn't exist.
 * Persists the new ID to the sellers table via the admin client so it bypasses
 * RLS (this can be called from webhook context).
 */
export async function getOrCreateStripeCustomer(
  sellerId: string,
  email: string,
  existingCustomerId: string | null
): Promise<string> {
  if (existingCustomerId) return existingCustomerId;

  const stripe = getStripe();
  const customer = await stripe.customers.create({
    email,
    metadata: { seller_id: sellerId },
  });

  const admin = createAdminClient();
  const { error } = await admin
    .from("sellers")
    .update({ stripe_customer_id: customer.id })
    .eq("id", sellerId);

  if (error) {
    // Best-effort cleanup: we still return the ID so the request can
    // continue, but log so future requests reuse it via the same lookup path.
    console.error(
      "[stripe] failed to persist stripe_customer_id",
      error.message
    );
  }

  return customer.id;
}
