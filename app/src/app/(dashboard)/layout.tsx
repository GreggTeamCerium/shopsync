import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentSeller } from "@/lib/data";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const seller = await getCurrentSeller();

  // If somehow auth user exists but seller row doesn't, sign them out.
  if (!seller) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DashboardSidebar
        storeName={seller.storeName}
        subscriptionTier={seller.subscriptionTier}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar
          storeName={seller.storeName}
          storeSlug={seller.storeSlug}
          email={seller.email}
        />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
