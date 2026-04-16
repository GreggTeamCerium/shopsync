import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  getStripe,
  getPriceIdForTier,
  getOrCreateStripeCustomer,
} from "@/lib/stripe";
import { getCurrentSeller } from "@/lib/data";

export const runtime = "nodejs";

const bodySchema = z.object({
  tier: z.enum(["starter", "pro"]),
});

export async function POST(request: NextRequest) {
  const seller = await getCurrentSeller();
  if (!seller) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let parsed: z.infer<typeof bodySchema>;
  try {
    const json = (await request.json()) as unknown;
    const result = bodySchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid plan selection" },
        { status: 400 }
      );
    }
    parsed = result.data;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const origin =
    request.nextUrl.origin || process.env.NEXT_PUBLIC_SITE_URL || "";

  try {
    const customerId = await getOrCreateStripeCustomer(
      seller.id,
      seller.email,
      seller.stripeCustomerId
    );
    const priceId = getPriceIdForTier(parsed.tier);
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/dashboard?upgraded=true`,
      cancel_url: `${origin}/dashboard/billing`,
      allow_promotion_codes: true,
      client_reference_id: seller.id,
      metadata: {
        seller_id: seller.id,
        tier: parsed.tier,
      },
      subscription_data: {
        metadata: {
          seller_id: seller.id,
          tier: parsed.tier,
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[checkout] failed", message);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}
