export const SITE_NAME = "ShopSync";
export const SITE_DESCRIPTION =
  "Turn your Instagram into a real store in 60 seconds. Zero platform fees.";

export const PLANS = [
  {
    name: "Free",
    price: 0,
    description: "Get started with the basics",
    features: [
      "10 products",
      "ShopSync subdomain",
      "Basic template",
      "Mobile-optimized store",
      "Product management",
    ],
    limitations: [
      "No custom domain",
      "No Stripe payments",
      "No analytics",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Starter",
    price: 19,
    description: "Everything you need to sell",
    features: [
      "50 products",
      "Custom domain",
      "Stripe payments",
      "3 store templates",
      "Mobile-optimized store",
      "Product management",
      "Order management",
      "Zero transaction fees",
    ],
    limitations: ["No auto-sync", "No analytics", "No custom CSS"],
    cta: "Start Selling",
    highlighted: true,
  },
  {
    name: "Pro",
    price: 39,
    description: "Scale your business",
    features: [
      "Unlimited products",
      "Custom domain",
      "Stripe payments",
      "All store templates",
      "Auto-sync with Instagram",
      "Analytics dashboard",
      "Custom CSS",
      "Priority support",
      "Zero transaction fees",
    ],
    limitations: [],
    cta: "Go Pro",
    highlighted: false,
  },
] as const;
