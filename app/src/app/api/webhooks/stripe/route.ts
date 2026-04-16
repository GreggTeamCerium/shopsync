import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, getTierFromPriceId } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SubscriptionTier } from "@/lib/data";

export const runtime = "nodejs";

/**
 * Stripe webhook handler.
 *
 * Verifies the signature, then updates the seller's subscription state.
 * Always returns quickly; logs failures so they're visible in Vercel logs.
 *
 * Set up in Stripe Dashboard → Developers → Webhooks. Listen for:
 *   - checkout.session.completed
 *   - customer.subscription.updated
 *   - customer.subscription.deleted
 */
export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // The raw body is required for signature verification.
  const rawBody = await request.text();

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe-webhook] signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log("[stripe-webhook] ignoring event:", event.type);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe-webhook] handler failed:", event.type, message);
    // Still respond 200 — Stripe will retry on non-2xx, but for handler bugs
    // we'd rather not loop. Errors are logged for follow-up.
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  const sellerId =
    session.client_reference_id ?? session.metadata?.seller_id ?? null;
  if (!sellerId) {
    console.warn(
      "[stripe-webhook] checkout.session.completed without seller_id"
    );
    return;
  }

  if (session.mode !== "subscription") {
    return;
  }

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id ?? null;

  if (!subscriptionId) {
    console.warn(
      "[stripe-webhook] checkout.session.completed missing subscription"
    );
    return;
  }

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const tier = tierFromSubscription(subscription);
  if (!tier) {
    console.warn(
      "[stripe-webhook] could not derive tier from subscription",
      subscriptionId
    );
    return;
  }

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id ?? null;

  await updateSellerSubscription(sellerId, {
    tier,
    stripeSubscriptionId: subscriptionId,
    stripeCustomerId: customerId,
  });

  console.log(
    "[stripe-webhook] checkout completed: seller",
    sellerId,
    "→",
    tier
  );
}

async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
): Promise<void> {
  const sellerId = await resolveSellerId(subscription);
  if (!sellerId) {
    console.warn(
      "[stripe-webhook] subscription.updated could not resolve seller",
      subscription.id
    );
    return;
  }

  // Cancellation that hasn't yet ended is treated as still active. When the
  // subscription actually ends, we'll get a `customer.subscription.deleted`.
  const isActive =
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    subscription.status === "past_due";

  if (!isActive) {
    await updateSellerSubscription(sellerId, {
      tier: "free",
      stripeSubscriptionId: null,
    });
    return;
  }

  const tier = tierFromSubscription(subscription);
  if (!tier) {
    console.warn(
      "[stripe-webhook] subscription.updated unknown tier for",
      subscription.id
    );
    return;
  }

  await updateSellerSubscription(sellerId, {
    tier,
    stripeSubscriptionId: subscription.id,
  });

  console.log(
    "[stripe-webhook] subscription updated: seller",
    sellerId,
    "→",
    tier
  );
}

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
): Promise<void> {
  const sellerId = await resolveSellerId(subscription);
  if (!sellerId) {
    console.warn(
      "[stripe-webhook] subscription.deleted could not resolve seller",
      subscription.id
    );
    return;
  }

  await updateSellerSubscription(sellerId, {
    tier: "free",
    stripeSubscriptionId: null,
  });

  console.log("[stripe-webhook] subscription deleted: seller", sellerId);
}

function tierFromSubscription(
  subscription: Stripe.Subscription
): SubscriptionTier | null {
  for (const item of subscription.items.data) {
    const priceId = item.price?.id;
    if (!priceId) continue;
    const tier = getTierFromPriceId(priceId);
    if (tier) return tier;
  }
  return null;
}

/**
 * Find the seller this subscription belongs to. Tries metadata first
 * (set during checkout), then falls back to the customer ID lookup.
 */
async function resolveSellerId(
  subscription: Stripe.Subscription
): Promise<string | null> {
  const metaSellerId = subscription.metadata?.seller_id;
  if (metaSellerId) return metaSellerId;

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id ?? null;
  if (!customerId) return null;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("sellers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (error || !data) return null;
  return (data as { id: string }).id;
}

interface SubscriptionUpdate {
  tier: SubscriptionTier;
  stripeSubscriptionId: string | null;
  stripeCustomerId?: string | null;
}

async function updateSellerSubscription(
  sellerId: string,
  update: SubscriptionUpdate
): Promise<void> {
  const admin = createAdminClient();
  const patch: Record<string, unknown> = {
    subscription_tier: update.tier,
    stripe_subscription_id: update.stripeSubscriptionId,
  };
  if (update.stripeCustomerId) {
    patch.stripe_customer_id = update.stripeCustomerId;
  }

  const { error } = await admin
    .from("sellers")
    .update(patch)
    .eq("id", sellerId);

  if (error) {
    throw new Error(`Failed to update seller ${sellerId}: ${error.message}`);
  }
}
