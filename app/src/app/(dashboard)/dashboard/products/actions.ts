"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getCurrentSeller,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/data";
import { productSchema, type ProductInput } from "@/lib/validations";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
}

export async function createProductAction(
  data: ProductInput
): Promise<{ ok: boolean; error?: string }> {
  await requireUser();
  const seller = await getCurrentSeller();
  if (!seller) return { ok: false, error: "Not signed in" };

  const result = productSchema.safeParse(data);
  if (!result.success) {
    return { ok: false, error: result.error.issues[0].message };
  }

  const { error } = await createProduct({
    sellerId: seller.id,
    name: result.data.name,
    brand: result.data.brand,
    category: result.data.category,
    size: result.data.size,
    condition: result.data.condition,
    price: result.data.price,
    description: result.data.description ?? "",
    images: result.data.images ?? [],
    status: result.data.status ?? "available",
  });

  if (error) return { ok: false, error };
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function updateProductAction(
  id: string,
  data: ProductInput
): Promise<{ ok: boolean; error?: string }> {
  await requireUser();
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return { ok: false, error: result.error.issues[0].message };
  }

  const { error } = await updateProduct(id, {
    name: result.data.name,
    brand: result.data.brand,
    category: result.data.category,
    size: result.data.size,
    condition: result.data.condition,
    price: result.data.price,
    description: result.data.description ?? "",
    images: result.data.images ?? [],
    status: result.data.status ?? "available",
  });

  if (error) return { ok: false, error };
  revalidatePath("/dashboard/products");
  revalidatePath(`/dashboard/products/${id}/edit`);
  return { ok: true };
}

export async function markProductSoldAction(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  await requireUser();
  const { error } = await updateProduct(id, { status: "sold" });
  if (error) return { ok: false, error };
  revalidatePath("/dashboard/products");
  return { ok: true };
}

export async function deleteProductAction(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  await requireUser();
  const { error } = await deleteProduct(id);
  if (error) return { ok: false, error };
  revalidatePath("/dashboard/products");
  return { ok: true };
}
