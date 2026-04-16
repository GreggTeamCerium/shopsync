-- ShopSync — Stripe Subscriptions Migration
-- Run this in the Supabase SQL editor.
--
-- Adds Stripe billing identifiers to the sellers table. These are separate
-- from `stripe_account_id` (which is reserved for the seller's Stripe Connect
-- account used for store payments).

alter table public.sellers
  add column if not exists stripe_customer_id text;

alter table public.sellers
  add column if not exists stripe_subscription_id text;

create index if not exists sellers_stripe_customer_idx
  on public.sellers(stripe_customer_id);
