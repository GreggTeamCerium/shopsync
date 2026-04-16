# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: full-flow.spec.ts >> 7. logout — sign out and protected routes redirect
- Location: e2e\full-flow.spec.ts:284:5

# Error details

```
Error: Session was lost between tests. The 500 from /api/checkout/subscription in test 6 appears to drop the Supabase auth cookie. The logout button itself could not be exercised. Bug: failed API routes should not corrupt the session.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - link "ShopSync" [ref=e3] [cursor=pointer]:
      - /url: /
      - img [ref=e4]
      - generic [ref=e8]: ShopSync
    - generic [ref=e10]:
      - generic [ref=e11]:
        - heading "Welcome back" [level=1] [ref=e12]
        - paragraph [ref=e13]: Log in to your ShopSync account
      - generic [ref=e14]:
        - generic [ref=e15]:
          - generic [ref=e16]: Email
          - textbox "Email" [ref=e17]:
            - /placeholder: you@example.com
        - generic [ref=e18]:
          - generic [ref=e19]: Password
          - textbox "Password" [ref=e20]:
            - /placeholder: Enter your password
        - link "Forgot password?" [ref=e22] [cursor=pointer]:
          - /url: /forgot-password
        - button "Log in" [ref=e23] [cursor=pointer]
      - paragraph [ref=e24]:
        - text: Don't have an account?
        - link "Sign up free" [ref=e25] [cursor=pointer]:
          - /url: /signup
  - alert [ref=e26]
```

# Test source

```ts
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
  261 |   let apiBody: { url?: string; error?: string } = {};
  262 |   try {
  263 |     apiBody = (await apiResponse.json()) as typeof apiBody;
  264 |   } catch {
  265 |     /* ignore */
  266 |   }
  267 |   console.log(
  268 |     `  POST /api/checkout/subscription -> ${apiStatus} ${JSON.stringify(apiBody).slice(0, 200)}`
  269 |   );
  270 | 
  271 |   await navigationPromise;
  272 |   expect(
  273 |     apiStatus,
  274 |     `Expected /api/checkout/subscription to return 200, got ${apiStatus}: ${apiBody.error ?? "(no error)"}`
  275 |   ).toBe(200);
  276 |   expect(apiBody.url).toBeTruthy();
  277 |   expect(apiBody.url).toContain("checkout.stripe.com");
  278 |   console.log(`  Stripe checkout URL: ${apiBody.url?.slice(0, 80)}...`);
  279 | 
  280 |   // Navigate back so subsequent test has a non-Stripe origin
  281 |   await sharedPage.goto("/dashboard");
  282 | });
  283 | 
  284 | test("7. logout — sign out and protected routes redirect", async () => {
  285 |   await sharedPage.goto("/dashboard", { waitUntil: "load" });
  286 |   console.log(`  test 7 start url after goto /dashboard: ${sharedPage.url()}`);
  287 | 
  288 |   // Sanity check: must still be authenticated. If the prior /api/checkout
  289 |   // failure dropped the session cookie (a separate production bug), the
  290 |   // logout flow can't be exercised — surface it clearly.
  291 |   if (/\/login/.test(sharedPage.url())) {
> 292 |     throw new Error(
      |           ^ Error: Session was lost between tests. The 500 from /api/checkout/subscription in test 6 appears to drop the Supabase auth cookie. The logout button itself could not be exercised. Bug: failed API routes should not corrupt the session.
  293 |       "Session was lost between tests. The 500 from /api/checkout/subscription " +
  294 |         "in test 6 appears to drop the Supabase auth cookie. The logout button " +
  295 |         "itself could not be exercised. Bug: failed API routes should not corrupt the session."
  296 |     );
  297 |   }
  298 | 
  299 |   const headerChevron = sharedPage.locator("header button").last();
  300 |   await expect(headerChevron).toBeVisible({ timeout: 15_000 });
  301 |   await headerChevron.click();
  302 | 
  303 |   const logoutButton = sharedPage.getByRole("button", { name: /Log Out/i });
  304 |   await expect(logoutButton).toBeVisible({ timeout: 5_000 });
  305 |   await logoutButton.click();
  306 | 
  307 |   // Should redirect to home (anywhere outside /dashboard)
  308 |   await sharedPage.waitForURL(
  309 |     (url) => !url.pathname.startsWith("/dashboard"),
  310 |     { timeout: 15_000 }
  311 |   );
  312 |   expect(sharedPage.url()).not.toMatch(/\/dashboard/);
  313 | 
  314 |   // Now visiting /dashboard should redirect to /login
  315 |   await sharedPage.goto("/dashboard");
  316 |   await sharedPage.waitForURL(/\/login/, { timeout: 15_000 });
  317 |   expect(sharedPage.url()).toMatch(/\/login/);
  318 | });
  319 | 
```