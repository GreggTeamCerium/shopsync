import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentSeller } from "@/lib/data";
import { BillingClient } from "@/components/dashboard/billing-client";

export const metadata: Metadata = {
  title: "Billing — ShopSync",
};

interface BillingPageProps {
  searchParams: Promise<{ upgraded?: string; canceled?: string }>;
}

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const seller = await getCurrentSeller();
  if (!seller) redirect("/login");

  const params = await searchParams;

  return (
    <BillingClient
      tier={seller.subscriptionTier}
      upgraded={params.upgraded === "true"}
      canceled={params.canceled === "true"}
    />
  );
}
