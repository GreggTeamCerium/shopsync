import Link from "next/link";
import {
  Sparkles,
  Palette,
  Globe,
  CreditCard,
  Smartphone,
  RefreshCw,
  Camera,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShoppingBag,
  Star,
  Image,
  Store,
  TrendingUp,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Import",
    description:
      "Connect your Instagram and we'll scan your posts to extract prices, sizes, brands, and descriptions — automatically.",
  },
  {
    icon: Palette,
    title: "10 Beautiful Templates",
    description:
      "Pick from designer-quality store themes inspired by Reformation, Everlane, and Aritzia. Customize colors and fonts to match your brand.",
  },
  {
    icon: Globe,
    title: "Your Own Domain",
    description:
      "Get yourstore.com instead of a marketplace profile. Build real brand equity that you own.",
  },
  {
    icon: CreditCard,
    title: "Keep 97% of Every Sale",
    description:
      "Pay only standard Stripe fees (2.9% + 30¢). No ShopSync transaction fees, ever. Compare that to Poshmark's 20%.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description:
      "90% of your buyers shop on their phone. Every ShopSync store is designed to convert on mobile.",
  },
  {
    icon: RefreshCw,
    title: "Auto-Sync New Posts",
    description:
      "Post to Instagram and your store updates automatically. List once, sell everywhere.",
  },
];

const steps = [
  {
    number: "1",
    title: "Connect Your Instagram",
    description:
      "Link your business or creator account. Takes 30 seconds, no tech skills needed.",
    icon: Camera,
  },
  {
    number: "2",
    title: "We Build Your Store",
    description:
      "Our AI reads your posts, extracts product details, and creates your listings automatically.",
    icon: ShoppingBag,
  },
  {
    number: "3",
    title: "Start Selling",
    description:
      "Pick a template, customize your brand, and share your link. You're live.",
    icon: Star,
  },
];

const testimonials = [
  {
    name: "Rachel K.",
    role: "Reseller, @rachels.closet",
    quote:
      "I was copy-pasting listings between Poshmark, Depop, and my Instagram DMs. ShopSync pulled 47 products from my feed in under 2 minutes. My own site, my own brand, and I keep way more per sale.",
    avatar: "R",
  },
  {
    name: "Dani M.",
    role: "Vintage Seller, @danisfinds",
    quote:
      "My regulars used to DM me 'is this still available?' 50 times a day. Now I just send them my ShopSync link. They can see what's available, add to cart, and pay — no back and forth. Revenue up 40% in two months.",
    avatar: "D",
  },
  {
    name: "Priya S.",
    role: "Jewelry Designer, @priyacreates",
    quote:
      "I was paying Etsy $0.20 per listing plus 6.5% per sale. On ShopSync I pay $19/month flat and keep almost everything. The templates look better than my friend's Shopify site that cost $2K to build.",
    avatar: "P",
  },
];

const socialSellers = [
  {
    icon: Image,
    title: "Instagram Sellers",
    description:
      "Resellers, boutique owners, and creators selling through posts and stories. Import your entire catalog in one click.",
  },
  {
    icon: Heart,
    title: "Poshmark & Depop Sellers",
    description:
      "Tired of 20% fees and algorithm changes? Own your storefront and your customer relationships.",
  },
  {
    icon: Store,
    title: "Facebook Marketplace Sellers",
    description:
      "Graduate from local pickup to a professional online store with nationwide shipping.",
  },
  {
    icon: TrendingUp,
    title: "TikTok Shop Sellers",
    description:
      "Your followers already want to buy. Give them a real checkout experience, not just a link in bio.",
  },
];

const faqs = [
  {
    question: "How does ShopSync work?",
    answer:
      "Connect your Instagram account, and our AI automatically scans your posts to extract product details like price, size, and description. We then generate a professional e-commerce store you can customize and share with customers.",
  },
  {
    question: "Do I need a business Instagram account?",
    answer:
      "Yes, you need an Instagram Business or Creator account to use the auto-import feature. However, you can also manually add products without connecting Instagram.",
  },
  {
    question: "What are the transaction fees?",
    answer:
      "ShopSync charges zero transaction fees. You only pay standard Stripe processing fees (2.9% + 30¢ per transaction). Compare that to the 15-20% most marketplaces take.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes! On the Starter and Pro plans, you can connect your own custom domain. Free plan stores get a yourname.shopsync.store subdomain.",
  },
  {
    question: "How long does it take to set up?",
    answer:
      "Most sellers have their store live within 60 seconds of connecting their Instagram. The AI handles the heavy lifting — you just review and publish.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. No contracts, no cancellation fees. You can downgrade to the free plan or cancel your subscription at any time.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-gray-200">
      <summary className="flex items-center justify-between py-5 cursor-pointer list-none">
        <span className="font-medium text-navy pr-4">{question}</span>
        <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
      </summary>
      <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
    </details>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Now in beta — free to get started
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy leading-[1.1]">
              Your Instagram Products Deserve{" "}
              <span className="text-primary">Their Own Store</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              You&apos;re already selling on Instagram. But between DM negotiations,
              20% marketplace fees, and no-show buyers — you&apos;re leaving money on
              the table. ShopSync turns your posts into a professional store in
              60 seconds.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 gap-2"
              >
                Start Your Free Store <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-lg border-2 border-gray-300 text-navy hover:border-primary hover:text-primary transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required. Free plan available forever.
            </p>
          </div>

          {/* Mock Screenshot */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white rounded-md px-4 py-1 text-xs text-gray-500 border border-gray-200">
                    yourstore.shopsync.store
                  </div>
                </div>
              </div>
              <div className="p-8 sm:p-12 bg-gradient-to-br from-gray-50 to-white">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                    >
                      <ShoppingBag className="h-8 w-8 text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Live in 60 Seconds. Seriously.
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              No coding. No design skills. No Shopify tutorials.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Social Sellers */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Built for Social Sellers
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              Whether you sell vintage, handmade, or designer — if you&apos;re selling
              on social media, ShopSync is built for you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {socialSellers.map((seller) => (
              <div
                key={seller.title}
                className="flex gap-4 p-6 rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                  <seller.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-1">
                    {seller.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {seller.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Everything You Need to Sell Online
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              No marketplace restrictions. No hidden fees. Just your products, your brand, your rules.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              No transaction fees. No hidden costs. Cancel anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-navy">Free</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-navy">$0</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Perfect for testing the waters
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "10 products",
                  "ShopSync subdomain",
                  "Basic template",
                  "Mobile-optimized",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-8 block w-full text-center py-2.5 rounded-lg border-2 border-gray-300 text-navy font-semibold hover:border-primary hover:text-primary transition-colors text-sm"
              >
                Start Your Free Store
              </Link>
            </div>

            {/* Starter */}
            <div className="bg-white rounded-2xl border-2 border-primary p-8 relative shadow-lg shadow-primary/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold text-navy">Starter</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-navy">$19</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Everything you need to sell seriously
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "50 products",
                  "Custom domain",
                  "Stripe payments",
                  "3 templates",
                  "Zero transaction fees",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-8 block w-full text-center py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors text-sm"
              >
                Start Your Free Store
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-navy">Pro</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-navy">$39</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                For full-time sellers ready to scale
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Unlimited products",
                  "Everything in Starter",
                  "Auto-sync Instagram",
                  "Analytics dashboard",
                  "Custom CSS",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-8 block w-full text-center py-2.5 rounded-lg border-2 border-gray-300 text-navy font-semibold hover:border-primary hover:text-primary transition-colors text-sm"
              >
                Start Your Free Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Sellers Who Made the Switch
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Real sellers, real results
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl border border-gray-200 bg-white"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-navy text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Frequently Asked Questions
            </h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
