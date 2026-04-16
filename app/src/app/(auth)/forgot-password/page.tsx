"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState<ForgotPasswordInput>({ email: "" });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ForgotPasswordInput, string>>
  >({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = forgotPasswordSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ForgotPasswordInput, string>> =
        {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ForgotPasswordInput;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setServerError(
        "Authentication is not configured. Please set up Supabase credentials."
      );
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setServerError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-navy mb-2">Check your email</h1>
        <p className="text-gray-600 text-sm mb-6">
          We sent a password reset link to{" "}
          <span className="font-medium text-navy">{form.email}</span>
        </p>
        <Link
          href="/login"
          className="text-sm text-primary font-medium hover:text-primary-dark"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-navy">Reset your password</h1>
        <p className="text-sm text-gray-600 mt-1">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />

        {serverError && (
          <p className="text-sm text-accent text-center">{serverError}</p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        <Link
          href="/login"
          className="text-primary font-medium hover:text-primary-dark"
        >
          Back to login
        </Link>
      </p>
    </div>
  );
}
