import { type NextRequest, NextResponse } from "next/server";
import { getStripe, getOrCreateStripeCustomer } from "@/lib/stripe";
import { getCurrentSeller } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const seller = await getCurrentSeller();
  if (!seller) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const origin =
    request.nextUrl.origin || process.env.NEXT_PUBLIC_SITE_URL || "";

  try {
    const customerId = await getOrCreateStripeCustomer(
      seller.id,
      seller.email,
      seller.stripeCustomerId
    );
    const stripe = getStripe();

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[billing-portal] failed", message);
    return NextResponse.json(
      { error: "Could not open billing portal. Please try again." },
      { status: 500 }
    );
  }
}
