"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentSeller, updateSeller, seedProductsForSeller } from "@/lib/data";
import { storeSettingsSchema, type StoreSettingsInput } from "@/lib/validations";
import { DEMO_SEED_PRODUCTS } from "@/lib/data/demo-products";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
}

export async function updateSettingsAction(
  data: StoreSettingsInput
): Promise<{ ok: boolean; error?: string; storeSlug?: string }> {
  await requireUser();
  const seller = await getCurrentSeller();
  if (!seller) return { ok: false, error: "Not signed in" };

  const result = storeSettingsSchema.safeParse(data);
  if (!result.success) {
    return { ok: false, error: result.error.issues[0].message };
  }

  const { seller: updated, error } = await updateSeller(seller.id, {
    storeName: result.data.storeName,
    storeSlug: result.data.storeSlug,
    template: result.data.template,
    colors: result.data.colors,
    aboutText: result.data.aboutText ?? "",
    logo: result.data.logo ?? null,
  });

  if (error) return { ok: false, error };
  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");
  if (updated) {
    revalidatePath(`/store/${updated.storeSlug}`);
  }
  return { ok: true, storeSlug: updated?.storeSlug };
}

export async function seedDemoDataAction(): Promise<{
  ok: boolean;
  error?: string;
  count?: number;
}> {
  await requireUser();
  const seller = await getCurrentSeller();
  if (!seller) return { ok: false, error: "Not signed in" };

  const { count, error } = await seedProductsForSeller(
    seller.id,
    DEMO_SEED_PRODUCTS
  );
  if (error) return { ok: false, error };
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard");
  revalidatePath(`/store/${seller.storeSlug}`);
  revalidatePath(`/store/${seller.storeSlug}/shop`);
  return { ok: true, count };
}
