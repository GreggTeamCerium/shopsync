import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, X, ChevronDown } from "lucide-react";
import { PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing — ShopSync",
  description:
    "Simple, transparent pricing with zero transaction fees. Start free and upgrade as you grow.",
};

const comparisonFeatures = [
  { name: "Products", free: "10", starter: "50", pro: "Unlimited" },
  { name: "Store templates", free: "1", starter: "3", pro: "All" },
  { name: "Custom domain", free: false, starter: true, pro: true },
  { name: "Stripe payments", free: false, starter: true, pro: true },
  { name: "Instagram auto-sync", free: false, starter: false, pro: true },
  { name: "Analytics dashboard", free: false, starter: false, pro: true },
  { name: "Custom CSS", free: false, starter: false, pro: true },
  { name: "Priority support", free: false, starter: false, pro: true },
  { name: "Transaction fees", free: "0%", starter: "0%", pro: "0%" },
  { name: "Mobile-optimized store", free: true, starter: true, pro: true },
  { name: "Product management", free: true, starter: true, pro: true },
  { name: "Order management", free: true, starter: true, pro: true },
  { name: "SSL certificate", free: true, starter: true, pro: true },
];

const faqs = [
  {
    question: "Can I change plans later?",
    answer:
      "Yes! You can upgrade, downgrade, or cancel at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "The Free plan is available forever with no credit card required. When you're ready to upgrade, your first 14 days on a paid plan are free.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards via Stripe. We also support Apple Pay and Google Pay.",
  },
  {
    question: "What happens if I exceed my product limit?",
    answer:
      "We'll notify you when you're approaching your limit. You can upgrade to a higher plan or remove products to stay within your current plan.",
  },
  {
    question: "Do you take a cut of my sales?",
    answer:
      "Never. ShopSync charges zero transaction fees. You only pay standard Stripe processing fees (2.9% + 30¢).",
  },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium text-navy">{value}</span>;
  }
  return value ? (
    <CheckCircle2 className="h-5 w-5 text-primary mx-auto" />
  ) : (
    <X className="h-5 w-5 text-gray-300 mx-auto" />
  );
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Zero transaction fees on every plan. Start free and upgrade as your
            business grows.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? "border-2 border-primary shadow-lg shadow-primary/10 relative"
                    : "border border-gray-200 bg-white"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-navy">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-navy">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`mt-8 block w-full text-center py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                    plan.highlighted
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "border-2 border-gray-300 text-navy hover:border-primary hover:text-primary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-12">
            Feature Comparison
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-6 text-sm font-semibold text-navy">
                      Feature
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-navy text-center">
                      Free
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-primary text-center">
                      Starter
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-navy text-center">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <tr
                      key={feature.name}
                      className={
                        i < comparisonFeatures.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }
                    >
                      <td className="py-3.5 px-6 text-sm text-gray-700">
                        {feature.name}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <CellValue value={feature.free} />
                      </td>
                      <td className="py-3.5 px-6 text-center bg-primary/[0.02]">
                        <CellValue value={feature.starter} />
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <CellValue value={feature.pro} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-12">
            Pricing FAQ
          </h2>
          <div>
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-gray-200"
              >
                <summary className="flex items-center justify-between py-5 cursor-pointer list-none">
                  <span className="font-medium text-navy pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Ready to start selling?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Create your store in 60 seconds. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </>
  );
}
