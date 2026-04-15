"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupSchema, type SignupInput } from "@/lib/validations";
import { getSupabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<SignupInput>({
    email: "",
    password: "",
    storeName: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupInput, string>>
  >({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = signupSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignupInput, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof SignupInput;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const supabase = getSupabase();
    if (!supabase) {
      setServerError(
        "Authentication is not configured. Please set up Supabase credentials."
      );
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          store_name: form.storeName,
        },
      },
    });

    if (error) {
      setServerError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-navy">Create your store</h1>
        <p className="text-sm text-gray-600 mt-1">
          Get started with ShopSync in 60 seconds
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="storeName"
          label="Store Name"
          placeholder="My Awesome Store"
          value={form.storeName}
          onChange={(e) => setForm({ ...form, storeName: e.target.value })}
          error={errors.storeName}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />

        {serverError && (
          <p className="text-sm text-accent text-center">{serverError}</p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-medium hover:text-primary-dark"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
