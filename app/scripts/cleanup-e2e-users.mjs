// Deletes all Supabase auth users with email starting with "e2e-" and
// any seller rows that reference them. Run with env vars from .env.local.
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    })
);

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const adminHeaders = {
  apikey: SERVICE_ROLE,
  Authorization: `Bearer ${SERVICE_ROLE}`,
  "Content-Type": "application/json",
};

// List users (first 1000 — more than enough for test cleanup)
const res = await fetch(
  `${SUPABASE_URL}/auth/v1/admin/users?per_page=1000`,
  { headers: adminHeaders }
);
if (!res.ok) {
  console.error("Failed to list users:", res.status, await res.text());
  process.exit(1);
}
const body = await res.json();
const users = body.users ?? [];
const testUsers = users.filter((u) => (u.email ?? "").startsWith("e2e-"));
console.log(`Found ${testUsers.length} e2e- test users out of ${users.length} total`);

for (const u of testUsers) {
  // Delete dependent seller rows via PostgREST (ON DELETE cascade might handle
  // this, but be explicit to avoid FK failures if it's RESTRICT).
  const sellerDel = await fetch(
    `${SUPABASE_URL}/rest/v1/sellers?id=eq.${u.id}`,
    { method: "DELETE", headers: adminHeaders }
  );
  if (!sellerDel.ok) {
    console.warn(`  seller row delete for ${u.email} -> ${sellerDel.status}: ${await sellerDel.text()}`);
  }

  const userDel = await fetch(
    `${SUPABASE_URL}/auth/v1/admin/users/${u.id}`,
    { method: "DELETE", headers: adminHeaders }
  );
  if (userDel.ok) {
    console.log(`  deleted ${u.email} (${u.id})`);
  } else {
    console.error(`  FAILED delete ${u.email}: ${userDel.status} ${await userDel.text()}`);
  }
}
console.log("Cleanup done.");
