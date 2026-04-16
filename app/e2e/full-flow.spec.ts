import { test, expect, type Page } from "@playwright/test";

const TIMESTAMP = Date.now();
const TEST_EMAIL = `e2e-${TIMESTAMP}@shopsync-test.com`;
const TEST_PASSWORD = "testpass123";
const TEST_STORE_NAME = `E2E Test Store ${TIMESTAMP}`;
const TEST_STORE_SLUG = `e2e-test-store-${TIMESTAMP}`;

// Tests share a single browser page (so auth carries between them) and run in
// declaration order via workers:1 + fullyParallel:false in playwright.config.ts.
// We deliberately do NOT use serial mode so a failure in one test does not
// skip the rest — we want to surface every issue.

let sharedPage: Page;
let storeSlug = TEST_STORE_SLUG;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  sharedPage = await context.newPage();
  // Warm Vercel: cold starts can take 6+ seconds.
  // Subsequent navigations measure realistic warm load time.
  await sharedPage.goto("/", { waitUntil: "load" });
  await sharedPage.goto("/pricing", { waitUntil: "load" });
});

test.afterAll(async () => {
  await sharedPage?.context().close();
});

test("1. marketing pages — home and pricing render quickly", async () => {
  const homeStart = Date.now();
  await sharedPage.goto("/");
  const homeMs = Date.now() - homeStart;
  console.log(`  home loaded in ${homeMs}ms`);
  expect(homeMs).toBeLessThan(5000);

  // Hero headline contains the "Their Own Store" phrase
  await expect(
    sharedPage.getByRole("heading", { name: /Their Own Store/i, level: 1 })
  ).toBeVisible();

  const pricingStart = Date.now();
  await sharedPage.goto("/pricing");
  const pricingMs = Date.now() - pricingStart;
  console.log(`  pricing loaded in ${pricingMs}ms`);
  expect(pricingMs).toBeLessThan(5000);

  // All 3 pricing tiers visible (Free, Starter, Pro)
  await expect(
    sharedPage.getByRole("heading", { name: "Free", level: 3, exact: true })
  ).toBeVisible();
  await expect(
    sharedPage.getByRole("heading", { name: "Starter", level: 3, exact: true })
  ).toBeVisible();
  await expect(
    sharedPage.getByRole("heading", { name: "Pro", level: 3, exact: true })
  ).toBeVisible();
});

test("2. signup flow — create account and reach dashboard", async () => {
  await sharedPage.goto("/signup");

  await sharedPage.locator("#storeName").fill(TEST_STORE_NAME);
  await sharedPage.locator("#email").fill(TEST_EMAIL);
  await sharedPage.locator("#password").fill(TEST_PASSWORD);

  await Promise.all([
    sharedPage.waitForURL(/\/dashboard(\?|$|\/)/, { timeout: 30_000 }),
    sharedPage.getByRole("button", { name: /Create Account/i }).click(),
  ]);

  // Topbar should show store name
  await expect(
    sharedPage.getByRole("heading", { name: TEST_STORE_NAME, level: 1 })
  ).toBeVisible({ timeout: 15_000 });

  // Free tier badge
  await expect(
    sharedPage.getByRole("link", { name: /Free/, exact: false })
  ).toBeVisible();
});

test("3. product management — add a product", async () => {
  // Snapshot product count from dashboard
  await sharedPage.goto("/dashboard");
  // Find the "Products" stat card value
  const productsStatCard = sharedPage.locator("div", {
    has: sharedPage.locator("span", { hasText: /^Products$/ }),
  });
  // We don't strictly need the count, but verify it shows 0 initially
  await expect(sharedPage.getByText(/^Products$/).first()).toBeVisible();

  // Navigate to products page
  await sharedPage.goto("/dashboard/products");
  await expect(
    sharedPage.getByRole("heading", { name: "Products", level: 1 })
  ).toBeVisible();

  // Click Add Product
  await sharedPage.getByRole("link", { name: /Add Product/i }).first().click();
  await sharedPage.waitForURL(/\/dashboard\/products\/new/);

  // Fill the form
  await sharedPage.locator("#name").fill("Test Dress");
  await sharedPage.locator("#brand").fill("Test Brand");
  await sharedPage.locator("#category").selectOption("Dresses");
  await sharedPage.locator("#size").fill("M");
  await sharedPage.locator("#condition").selectOption("NWT");
  await sharedPage.locator("#price").fill("89.99");
  await sharedPage
    .locator("#description")
    .fill("Test description");

  // Add image URL
  await sharedPage
    .locator('input[placeholder="Paste image URL..."]')
    .fill(
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600"
    );
  await sharedPage.getByRole("button", { name: /^Add$/ }).click();

  // Save the product
  await Promise.all([
    sharedPage.waitForURL(/\/dashboard\/products(\?|$)/, { timeout: 30_000 }),
    sharedPage.getByRole("button", { name: /Save Product/i }).click(),
  ]);

  // Verify product appears in list
  await expect(sharedPage.getByText("Test Dress").first()).toBeVisible({
    timeout: 15_000,
  });

  // Dashboard product count should increment
  await sharedPage.goto("/dashboard");
  // Products stat card value should be at least "1"
  const productsStatLabel = sharedPage.locator("span", {
    hasText: /^Products$/,
  });
  await expect(productsStatLabel.first()).toBeVisible();
  // Find the parent card and look for "1" (or higher)
  const productCountValue = sharedPage
    .locator("div.bg-white", { has: productsStatLabel })
    .locator("p.text-2xl");
  await expect(productCountValue).toHaveText(/^[1-9]\d*$/, { timeout: 5_000 });
  void productsStatCard;
});

test("4. settings — change template to The Atelier and persist", async () => {
  await sharedPage.goto("/dashboard/settings");
  await expect(
    sharedPage.getByRole("heading", { name: "Store Settings", level: 1 })
  ).toBeVisible();

  // Capture the actual store slug created on signup (used by Test 5)
  const slugInput = sharedPage.locator("#storeSlug");
  await expect(slugInput).toBeVisible();
  storeSlug = (await slugInput.inputValue()) || TEST_STORE_SLUG;
  console.log(`  store slug: ${storeSlug}`);

  // Click The Atelier template card
  await sharedPage
    .getByRole("button")
    .filter({ hasText: "The Atelier" })
    .click();

  // Save settings
  await sharedPage.getByRole("button", { name: /Save Settings/i }).click();

  // Saved confirmation
  await expect(sharedPage.getByText(/Settings saved/i)).toBeVisible({
    timeout: 10_000,
  });

  // Navigate away and back to verify persistence
  await sharedPage.goto("/dashboard");
  await sharedPage.goto("/dashboard/settings");

  // The Atelier template card should still be selected (border-primary class)
  const atelierCard = sharedPage
    .getByRole("button")
    .filter({ hasText: "The Atelier" });
  await expect(atelierCard).toBeVisible();
  // Verify it's the active one — check it has the selected class
  const className = await atelierCard.getAttribute("class");
  expect(className).toContain("border-primary");
});

test("5. public store page — store is visible to customers", async () => {
  await sharedPage.goto(`/store/${storeSlug}`);

  // Store name should appear
  await expect(
    sharedPage.getByRole("heading", { name: TEST_STORE_NAME }).first()
  ).toBeVisible({ timeout: 15_000 });

  // Either the test product is featured on the home page, or we navigate to /shop
  const productOnHome = sharedPage.getByText("Test Dress").first();
  if (await productOnHome.isVisible().catch(() => false)) {
    // Click through
    await productOnHome.click();
  } else {
    // Navigate to /shop and click from there
    await sharedPage.getByRole("link", { name: /Shop All Products/i }).click();
    await sharedPage.waitForURL(new RegExp(`/store/${storeSlug}/shop`));
    await sharedPage.getByText("Test Dress").first().click();
  }

  // Wait for product detail page
  await sharedPage.waitForURL(
    new RegExp(`/store/${storeSlug}/product/`),
    { timeout: 15_000 }
  );

  // Verify product details
  await expect(sharedPage.getByText("Test Dress").first()).toBeVisible();
  await expect(sharedPage.getByText("Test Brand").first()).toBeVisible();
  await expect(sharedPage.getByText(/\$89\.99/).first()).toBeVisible();
});

test("6. billing page — Free is current, upgrade button creates checkout session", async () => {
  await sharedPage.goto("/dashboard/billing");

  await expect(
    sharedPage.getByRole("heading", { name: /Billing/i, level: 1 })
  ).toBeVisible();

  // Current plan should be Free
  await expect(sharedPage.getByText(/Current plan/i).first()).toBeVisible();
  // The "Free" plan card should have "Current" tag
  const freeCard = sharedPage
    .locator("div")
    .filter({
      has: sharedPage.getByRole("heading", { name: "Free", level: 3 }),
    })
    .first();
  await expect(freeCard.getByText(/Current/i).first()).toBeVisible();

  // Starter and Pro upgrade buttons
  const starterUpgrade = sharedPage.getByRole("button", {
    name: /Upgrade to Starter/i,
  });
  const proUpgrade = sharedPage.getByRole("button", {
    name: /Upgrade to Pro/i,
  });
  await expect(starterUpgrade).toBeVisible();
  await expect(proUpgrade).toBeVisible();

  // Capture the API response to know exactly what Stripe returned
  const apiResponsePromise = sharedPage.waitForResponse(
    (r) => r.url().includes("/api/checkout/subscription"),
    { timeout: 30_000 }
  );
  const navigationPromise = sharedPage
    .waitForURL(/checkout\.stripe\.com/, { timeout: 30_000 })
    .catch(() => null);

  await starterUpgrade.click();

  const apiResponse = await apiResponsePromise;
  const apiStatus = apiResponse.status();
  let apiBody: { url?: string; error?: string } = {};
  try {
    apiBody = (await apiResponse.json()) as typeof apiBody;
  } catch {
    /* ignore */
  }
  console.log(
    `  POST /api/checkout/subscription -> ${apiStatus} ${JSON.stringify(apiBody).slice(0, 200)}`
  );

  await navigationPromise;
  expect(
    apiStatus,
    `Expected /api/checkout/subscription to return 200, got ${apiStatus}: ${apiBody.error ?? "(no error)"}`
  ).toBe(200);
  expect(apiBody.url).toBeTruthy();
  expect(apiBody.url).toContain("checkout.stripe.com");
  console.log(`  Stripe checkout URL: ${apiBody.url?.slice(0, 80)}...`);

  // Navigate back so subsequent test has a non-Stripe origin
  await sharedPage.goto("/dashboard");
});

test("7. logout — sign out and protected routes redirect", async () => {
  await sharedPage.goto("/dashboard", { waitUntil: "load" });
  console.log(`  test 7 start url after goto /dashboard: ${sharedPage.url()}`);

  // Sanity check: must still be authenticated. If the prior /api/checkout
  // failure dropped the session cookie (a separate production bug), the
  // logout flow can't be exercised — surface it clearly.
  if (/\/login/.test(sharedPage.url())) {
    throw new Error(
      "Session was lost between tests. The 500 from /api/checkout/subscription " +
        "in test 6 appears to drop the Supabase auth cookie. The logout button " +
        "itself could not be exercised. Bug: failed API routes should not corrupt the session."
    );
  }

  const headerChevron = sharedPage.locator("header button").last();
  await expect(headerChevron).toBeVisible({ timeout: 15_000 });
  await headerChevron.click();

  const logoutButton = sharedPage.getByRole("button", { name: /Log Out/i });
  await expect(logoutButton).toBeVisible({ timeout: 5_000 });
  await logoutButton.click();

  // Should redirect to home (anywhere outside /dashboard)
  await sharedPage.waitForURL(
    (url) => !url.pathname.startsWith("/dashboard"),
    { timeout: 15_000 }
  );
  expect(sharedPage.url()).not.toMatch(/\/dashboard/);

  // Now visiting /dashboard should redirect to /login
  await sharedPage.goto("/dashboard");
  await sharedPage.waitForURL(/\/login/, { timeout: 15_000 });
  expect(sharedPage.url()).toMatch(/\/login/);
});
