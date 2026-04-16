# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: full-flow.spec.ts >> 6. billing page — Free is current, upgrade button creates checkout session
- Location: e2e\full-flow.spec.ts:220:5

# Error details

```
Error: Expected /api/checkout/subscription to return 200, got 500: Could not start checkout. Please try again.

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - link "ShopSync" [ref=e5] [cursor=pointer]:
        - /url: /
        - img [ref=e6]
        - generic [ref=e10]: ShopSync
      - navigation [ref=e11]:
        - link "Dashboard" [ref=e12] [cursor=pointer]:
          - /url: /dashboard
          - img [ref=e13]
          - text: Dashboard
        - link "Products" [ref=e18] [cursor=pointer]:
          - /url: /dashboard/products
          - img [ref=e19]
          - text: Products
        - link "Orders" [ref=e23] [cursor=pointer]:
          - /url: /dashboard/orders
          - img [ref=e24]
          - text: Orders
        - link "Store Settings" [ref=e28] [cursor=pointer]:
          - /url: /dashboard/settings
          - img [ref=e29]
          - text: Store Settings
        - link "Billing" [ref=e32] [cursor=pointer]:
          - /url: /dashboard/billing
          - img [ref=e33]
          - text: Billing
        - link "Import from Instagram Soon" [ref=e35] [cursor=pointer]:
          - /url: /dashboard/import
          - img [ref=e36]
          - text: Import from Instagram
          - generic [ref=e39]: Soon
      - generic [ref=e41]:
        - generic [ref=e42]: E
        - generic [ref=e43]:
          - paragraph [ref=e44]: E2E Test Store 1776355521611
          - paragraph [ref=e45]: Free Plan
    - generic [ref=e46]:
      - banner [ref=e47]:
        - generic [ref=e48]:
          - heading "E2E Test Store 1776355521611" [level=1] [ref=e49]
          - link "View Store" [ref=e50] [cursor=pointer]:
            - /url: /store/e2e-test-store-1776355521611-59977fcc
            - img [ref=e51]
            - text: View Store
        - generic [ref=e55]:
          - link "Free" [ref=e56] [cursor=pointer]:
            - /url: /dashboard/billing
            - img [ref=e57]
            - text: Free
          - button "E" [ref=e60] [cursor=pointer]:
            - generic [ref=e61]: E
            - img [ref=e62]
      - main [ref=e64]:
        - generic [ref=e65]:
          - generic [ref=e66]:
            - heading "Billing & Plan" [level=1] [ref=e67]
            - paragraph [ref=e68]: Manage your subscription and unlock more features.
          - generic [ref=e69]: Could not start checkout. Please try again.
          - generic [ref=e72]:
            - paragraph [ref=e73]: Current plan
            - heading "Free" [level=2] [ref=e74]
            - paragraph [ref=e75]: Get started
          - generic [ref=e76]:
            - generic [ref=e77]:
              - generic [ref=e78]:
                - heading "Free" [level=3] [ref=e79]
                - generic [ref=e80]: Current
              - paragraph [ref=e81]: $0/mo
              - paragraph [ref=e82]: Get started
              - list [ref=e83]:
                - listitem [ref=e84]:
                  - img [ref=e85]
                  - generic [ref=e87]: 10 products
                - listitem [ref=e88]:
                  - img [ref=e89]
                  - generic [ref=e91]: ShopSync subdomain
                - listitem [ref=e92]:
                  - img [ref=e93]
                  - generic [ref=e95]: Basic templates
                - listitem [ref=e96]:
                  - img [ref=e97]
                  - generic [ref=e99]: Mobile-optimized store
              - button "Current Plan" [disabled] [ref=e101]
            - generic [ref=e102]:
              - heading "Starter" [level=3] [ref=e104]
              - paragraph [ref=e105]: $19/mo
              - paragraph [ref=e106]: Everything you need to sell
              - list [ref=e107]:
                - listitem [ref=e108]:
                  - img [ref=e109]
                  - generic [ref=e111]: 50 products
                - listitem [ref=e112]:
                  - img [ref=e113]
                  - generic [ref=e115]: Custom domain
                - listitem [ref=e116]:
                  - img [ref=e117]
                  - generic [ref=e119]: Stripe payments
                - listitem [ref=e120]:
                  - img [ref=e121]
                  - generic [ref=e123]: All templates
                - listitem [ref=e124]:
                  - img [ref=e125]
                  - generic [ref=e127]: Zero transaction fees
              - button "Upgrade to Starter" [ref=e129] [cursor=pointer]
            - generic [ref=e130]:
              - heading "Pro" [level=3] [ref=e132]
              - paragraph [ref=e133]: $39/mo
              - paragraph [ref=e134]: Scale your business
              - list [ref=e135]:
                - listitem [ref=e136]:
                  - img [ref=e137]
                  - generic [ref=e139]: Unlimited products
                - listitem [ref=e140]:
                  - img [ref=e141]
                  - generic [ref=e143]: Custom domain
                - listitem [ref=e144]:
                  - img [ref=e145]
                  - generic [ref=e147]: Auto-sync with Instagram
                - listitem [ref=e148]:
                  - img [ref=e149]
                  - generic [ref=e151]: Analytics dashboard
                - listitem [ref=e152]:
                  - img [ref=e153]
                  - generic [ref=e155]: Custom CSS
                - listitem [ref=e156]:
                  - img [ref=e157]
                  - generic [ref=e159]: Priority support
              - button "Upgrade to Pro" [ref=e161] [cursor=pointer]
          - generic [ref=e162]:
            - heading "Plan comparison" [level=2] [ref=e164]
            - table [ref=e166]:
              - rowgroup [ref=e167]:
                - row "Feature Free Starter Pro" [ref=e168]:
                  - columnheader "Feature" [ref=e169]
                  - columnheader "Free" [ref=e170]
                  - columnheader "Starter" [ref=e171]
                  - columnheader "Pro" [ref=e172]
              - rowgroup [ref=e173]:
                - row "Products 10 50 Unlimited" [ref=e174]:
                  - cell "Products" [ref=e175]
                  - cell "10" [ref=e176]
                  - cell "50" [ref=e177]
                  - cell "Unlimited" [ref=e178]
                - row "Custom domain Not included Included Included" [ref=e179]:
                  - cell "Custom domain" [ref=e180]
                  - cell "Not included" [ref=e181]:
                    - img "Not included" [ref=e182]
                  - cell "Included" [ref=e185]:
                    - img "Included" [ref=e186]
                  - cell "Included" [ref=e188]:
                    - img "Included" [ref=e189]
                - row "Store templates Basic All All" [ref=e191]:
                  - cell "Store templates" [ref=e192]
                  - cell "Basic" [ref=e193]
                  - cell "All" [ref=e194]
                  - cell "All" [ref=e195]
                - row "Stripe payments Not included Included Included" [ref=e196]:
                  - cell "Stripe payments" [ref=e197]
                  - cell "Not included" [ref=e198]:
                    - img "Not included" [ref=e199]
                  - cell "Included" [ref=e202]:
                    - img "Included" [ref=e203]
                  - cell "Included" [ref=e205]:
                    - img "Included" [ref=e206]
                - row "Analytics dashboard Not included Not included Included" [ref=e208]:
                  - cell "Analytics dashboard" [ref=e209]
                  - cell "Not included" [ref=e210]:
                    - img "Not included" [ref=e211]
                  - cell "Not included" [ref=e214]:
                    - img "Not included" [ref=e215]
                  - cell "Included" [ref=e218]:
                    - img "Included" [ref=e219]
                - row "Auto-sync from Instagram Not included Not included Included" [ref=e221]:
                  - cell "Auto-sync from Instagram" [ref=e222]
                  - cell "Not included" [ref=e223]:
                    - img "Not included" [ref=e224]
                  - cell "Not included" [ref=e227]:
                    - img "Not included" [ref=e228]
                  - cell "Included" [ref=e231]:
                    - img "Included" [ref=e232]
                - row "Custom CSS Not included Not included Included" [ref=e234]:
                  - cell "Custom CSS" [ref=e235]
                  - cell "Not included" [ref=e236]:
                    - img "Not included" [ref=e237]
                  - cell "Not included" [ref=e240]:
                    - img "Not included" [ref=e241]
                  - cell "Included" [ref=e244]:
                    - img "Included" [ref=e245]
                - row "Priority support Not included Not included Included" [ref=e247]:
                  - cell "Priority support" [ref=e248]
                  - cell "Not included" [ref=e249]:
                    - img "Not included" [ref=e250]
                  - cell "Not included" [ref=e253]:
                    - img "Not included" [ref=e254]
                  - cell "Included" [ref=e257]:
                    - img "Included" [ref=e258]
                - row "Transaction fees — 0% 0%" [ref=e260]:
                  - cell "Transaction fees" [ref=e261]
                  - cell "—" [ref=e262]
                  - cell "0%" [ref=e263]
                  - cell "0%" [ref=e264]
  - alert [ref=e265]
```

# Test source

```ts
  189 |   await sharedPage.goto(`/store/${storeSlug}`);
  190 | 
  191 |   // Store name should appear
  192 |   await expect(
  193 |     sharedPage.getByRole("heading", { name: TEST_STORE_NAME }).first()
  194 |   ).toBeVisible({ timeout: 15_000 });
  195 | 
  196 |   // Either the test product is featured on the home page, or we navigate to /shop
  197 |   const productOnHome = sharedPage.getByText("Test Dress").first();
  198 |   if (await productOnHome.isVisible().catch(() => false)) {
  199 |     // Click through
  200 |     await productOnHome.click();
  201 |   } else {
  202 |     // Navigate to /shop and click from there
  203 |     await sharedPage.getByRole("link", { name: /Shop All Products/i }).click();
  204 |     await sharedPage.waitForURL(new RegExp(`/store/${storeSlug}/shop`));
  205 |     await sharedPage.getByText("Test Dress").first().click();
  206 |   }
  207 | 
  208 |   // Wait for product detail page
  209 |   await sharedPage.waitForURL(
  210 |     new RegExp(`/store/${storeSlug}/product/`),
  211 |     { timeout: 15_000 }
  212 |   );
  213 | 
  214 |   // Verify product details
  215 |   await expect(sharedPage.getByText("Test Dress").first()).toBeVisible();
  216 |   await expect(sharedPage.getByText("Test Brand").first()).toBeVisible();
  217 |   await expect(sharedPage.getByText(/\$89\.99/).first()).toBeVisible();
  218 | });
  219 | 
  220 | test("6. billing page — Free is current, upgrade button creates checkout session", async () => {
  221 |   await sharedPage.goto("/dashboard/billing");
  222 | 
  223 |   await expect(
  224 |     sharedPage.getByRole("heading", { name: /Billing/i, level: 1 })
  225 |   ).toBeVisible();
  226 | 
  227 |   // Current plan should be Free
  228 |   await expect(sharedPage.getByText(/Current plan/i).first()).toBeVisible();
  229 |   // The "Free" plan card should have "Current" tag
  230 |   const freeCard = sharedPage
  231 |     .locator("div")
  232 |     .filter({
  233 |       has: sharedPage.getByRole("heading", { name: "Free", level: 3 }),
  234 |     })
  235 |     .first();
  236 |   await expect(freeCard.getByText(/Current/i).first()).toBeVisible();
  237 | 
  238 |   // Starter and Pro upgrade buttons
  239 |   const starterUpgrade = sharedPage.getByRole("button", {
  240 |     name: /Upgrade to Starter/i,
  241 |   });
  242 |   const proUpgrade = sharedPage.getByRole("button", {
  243 |     name: /Upgrade to Pro/i,
  244 |   });
  245 |   await expect(starterUpgrade).toBeVisible();
  246 |   await expect(proUpgrade).toBeVisible();
  247 | 
  248 |   // Capture the API response to know exactly what Stripe returned
  249 |   const apiResponsePromise = sharedPage.waitForResponse(
  250 |     (r) => r.url().includes("/api/checkout/subscription"),
  251 |     { timeout: 30_000 }
  252 |   );
  253 |   const navigationPromise = sharedPage
  254 |     .waitForURL(/checkout\.stripe\.com/, { timeout: 30_000 })
  255 |     .catch(() => null);
  256 | 
  257 |   await starterUpgrade.click();
  258 | 
  259 |   const apiResponse = await apiResponsePromise;
  260 |   const apiStatus = apiResponse.status();
  261 |   const apiBodyText = await apiResponse.text();
  262 |   console.log("\n========================================================");
  263 |   console.log(`  POST /api/checkout/subscription -> ${apiStatus}`);
  264 |   console.log("  FULL RESPONSE BODY:");
  265 |   console.log(apiBodyText);
  266 |   console.log("========================================================\n");
  267 |   let apiBody: {
  268 |     url?: string;
  269 |     error?: string;
  270 |     debug?:
  271 |       | string
  272 |       | { message?: string; type?: string; code?: string; param?: string };
  273 |   } = {};
  274 |   try {
  275 |     apiBody = JSON.parse(apiBodyText) as typeof apiBody;
  276 |   } catch {
  277 |     /* ignore */
  278 |   }
  279 |   if (apiStatus >= 400 && apiBody.debug) {
  280 |     console.log("  DEBUG FIELD (parsed):");
  281 |     console.log(JSON.stringify(apiBody.debug, null, 2));
  282 |     console.log("========================================================\n");
  283 |   }
  284 | 
  285 |   await navigationPromise;
  286 |   expect(
  287 |     apiStatus,
  288 |     `Expected /api/checkout/subscription to return 200, got ${apiStatus}: ${apiBody.error ?? "(no error)"}`
> 289 |   ).toBe(200);
      |     ^ Error: Expected /api/checkout/subscription to return 200, got 500: Could not start checkout. Please try again.
  290 |   expect(apiBody.url).toBeTruthy();
  291 |   expect(apiBody.url).toContain("checkout.stripe.com");
  292 |   console.log(`  Stripe checkout URL: ${apiBody.url?.slice(0, 80)}...`);
  293 | 
  294 |   // Navigate back so subsequent test has a non-Stripe origin
  295 |   await sharedPage.goto("/dashboard");
  296 | });
  297 | 
  298 | test("7. logout — sign out and protected routes redirect", async () => {
  299 |   await sharedPage.goto("/dashboard", { waitUntil: "load" });
  300 |   console.log(`  test 7 start url after goto /dashboard: ${sharedPage.url()}`);
  301 | 
  302 |   // Sanity check: must still be authenticated. If the prior /api/checkout
  303 |   // failure dropped the session cookie (a separate production bug), the
  304 |   // logout flow can't be exercised — surface it clearly.
  305 |   if (/\/login/.test(sharedPage.url())) {
  306 |     throw new Error(
  307 |       "Session was lost between tests. The 500 from /api/checkout/subscription " +
  308 |         "in test 6 appears to drop the Supabase auth cookie. The logout button " +
  309 |         "itself could not be exercised. Bug: failed API routes should not corrupt the session."
  310 |     );
  311 |   }
  312 | 
  313 |   const headerChevron = sharedPage.locator("header button").last();
  314 |   await expect(headerChevron).toBeVisible({ timeout: 15_000 });
  315 |   await headerChevron.click();
  316 | 
  317 |   const logoutButton = sharedPage.getByRole("button", { name: /Log Out/i });
  318 |   await expect(logoutButton).toBeVisible({ timeout: 5_000 });
  319 |   await logoutButton.click();
  320 | 
  321 |   // Should redirect to home (anywhere outside /dashboard)
  322 |   await sharedPage.waitForURL(
  323 |     (url) => !url.pathname.startsWith("/dashboard"),
  324 |     { timeout: 15_000 }
  325 |   );
  326 |   expect(sharedPage.url()).not.toMatch(/\/dashboard/);
  327 | 
  328 |   // Now visiting /dashboard should redirect to /login
  329 |   await sharedPage.goto("/dashboard");
  330 |   await sharedPage.waitForURL(/\/login/, { timeout: 15_000 });
  331 |   expect(sharedPage.url()).toMatch(/\/login/);
  332 | });
  333 | 
```