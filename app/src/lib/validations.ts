import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  storeName: z
    .string()
    .min(2, "Store name must be at least 2 characters")
    .max(50, "Store name must be under 50 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name is too long"),
  brand: z.string().min(1, "Brand is required").max(100, "Brand is too long"),
  category: z.enum([
    "Dresses",
    "Tops",
    "Bottoms",
    "Swimwear",
    "Accessories",
    "Outerwear",
    "Other",
  ]),
  size: z.string().min(1, "Size is required").max(20, "Size is too long"),
  condition: z.enum(["NWT", "NWOT", "Like New", "Gently Used"]),
  price: z
    .number()
    .min(1, "Price must be at least $0.01")
    .max(9999999, "Price is too high"),
  description: z.string().max(2000, "Description is too long").optional().default(""),
  images: z.array(z.string().url("Must be a valid URL")).default([]),
  status: z.enum(["available", "draft"]).default("available"),
});

export const storeSettingsSchema = z.object({
  storeName: z
    .string()
    .min(2, "Store name must be at least 2 characters")
    .max(50, "Store name must be under 50 characters"),
  storeSlug: z
    .string()
    .min(2, "URL slug must be at least 2 characters")
    .max(50, "URL slug must be under 50 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Only lowercase letters, numbers, and hyphens"
    ),
  template: z.enum(["resort", "minimal", "vintage", "gallery", "collective", "studio", "market", "vault", "bloom", "boardwalk"]),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
  }),
  aboutText: z.string().max(1000, "About text is too long").optional().default(""),
  logo: z.string().nullable().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type StoreSettingsInput = z.infer<typeof storeSettingsSchema>;
