# Task 06: End-to-End Testing (v2)

Work inside the app/ directory. The app is deployed at https://shopsync-livid.vercel.app

## Goal
Run comprehensive browser-based E2E tests against the production site using Playwright. Report results clearly.

## Setup

1. Install Playwright if not already installed:
```bash
npm install -D @playwright/test
npx playwright install chromium
```

2. Create `playwright.config.ts`:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'https://shopsync-livid.vercel.app',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

3. Set env vars for the test to use (create `.env.e2e` or just load from `.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Tests to Write

Create `e2e/full-flow.spec.ts` with these tests in ORDER (tests share state via a single account):

### Test A: Marketing Pages (quick, isolated)
- GET `/` → expect hero headline text containing "Instagram" or "Store"
- GET `/pricing` → expect "Starter" and "Pro" text

### Test B: Signup + Dashboard
- GO to `/signup`
- Use a unique email like `e2e-${Date.now()}@shopsync-test.com`
- Password: `TestPass123!`
- Store name: `E2E Test Store`
- Click submit
- Expect URL to contain `/dashboard` within 20 seconds
- Expect page to contain `E2E Test Store` (or similar verification)

Save the test email + user ID for later cleanup.

### Test C: Product Creation
- From the dashboard, navigate to `/dashboard/products`
- Click "Add Product" (or visit `/dashboard/products/new` directly)
- Fill the form:
  - Name: `Test Dress`
  - Brand: `Test Brand`
  - Category: `Dresses`
  - Size: `M`
  - Condition: `NWT`
  - Price: `89.99` (or 8999 cents depending on input format)
  - Description: `Test description for e2e testing`
  - Images: add `https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600`
- Submit
- Expect redirect to `/dashboard/products`
- Expect to see `Test Dress` in the product list

### Test D: Settings (Template Change)
- Navigate to `/dashboard/settings`
- Find the template picker section
- Click on one of the templates that is NOT currently selected (e.g., "The Atelier")
- Click save
- Expect a success indicator (toast, checkmark, "Saved" message — anything)

### Test E: Public Store Page
- Navigate to `/dashboard/settings` and capture the store slug from the URL preview or input
- Open `/store/{slug}` in the same browser context
- Expect the store name to appear
- Expect the product list page `/store/{slug}/shop` to show the `Test Dress` product

### Test F: Billing Page (no actual payment)
- Navigate to `/dashboard/billing`
- Expect "Free" text to be visible as the current tier
- Expect an "Upgrade" or "Starter" or "Pro" button to be present
- Click the "Upgrade to Starter" button
- Wait for either:
  - A navigation to a `checkout.stripe.com` URL (success — don't complete payment)
  - Or a new tab/window opening to Stripe
- Take a screenshot of whatever happens
- Do NOT fill in card details. Just verify the redirect occurred.

### Test G: Logout
- Navigate back to the dashboard (if not already)
- Find and click logout (probably in topbar or sidebar menu)
- Expect redirect away from `/dashboard`
- Try to visit `/dashboard` → expect redirect to `/login`

## Cleanup (run once after all tests)

Using the SUPABASE_SERVICE_ROLE_KEY, delete the test user so we don't leave junk in the DB:

```typescript
// In a test.afterAll or separate cleanup script
const { data: users } = await fetch(
  `${SUPABASE_URL}/auth/v1/admin/users`,
  { headers: { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}` } }
).then(r => r.json());

const testUsers = users.users.filter((u: any) => u.email.startsWith('e2e-'));
for (const u of testUsers) {
  await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${u.id}`, {
    method: 'DELETE',
    headers: { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}` },
  });
}
```

## Run

```bash
npx playwright test
```

## Output Format

At the end, output a CLEAR summary like:

```
=== E2E Test Results ===

✅ Test A: Marketing Pages — PASSED
✅ Test B: Signup + Dashboard — PASSED
❌ Test C: Product Creation — FAILED
  - Reason: could not find "Add Product" button
  - Screenshot: test-results/...
  - Likely issue: button selector may have changed

Summary: 5/7 passed

Issues found:
1. ... description of each failure
```

## Important

- Don't fix bugs yourself. Just report them.
- Use Playwright's built-in locators (getByRole, getByText, getByLabel) for resilience
- Screenshots will be saved automatically on failure — mention the paths
- If a test fails early, still attempt later tests that don't depend on it
- Make tests print descriptive logs so we can see what happened
- Kill any lingering browser sessions at the end
