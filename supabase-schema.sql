-- ShopSync Database Schema
-- Run this in Supabase SQL Editor

-- Sellers table (linked to auth.users)
create table public.sellers (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  store_name text not null,
  store_slug text unique not null,
  template text not null default 'minimal',
  colors jsonb not null default '{"primary":"#111111","secondary":"#FFFFFF","accent":"#555555"}'::jsonb,
  logo text,
  about_text text default '',
  custom_domain text,
  stripe_account_id text,
  subscription_tier text not null default 'free',
  instagram_connected boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sellers_slug_idx on public.sellers(store_slug);

-- Products table
create table public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  name text not null,
  brand text not null,
  category text not null,
  size text not null,
  condition text not null,
  price integer not null, -- cents
  description text default '',
  images jsonb not null default '[]'::jsonb,
  status text not null default 'available',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_seller_idx on public.products(seller_id);
create index products_status_idx on public.products(status);

-- Orders table
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  customer_email text not null,
  customer_name text not null,
  items jsonb not null default '[]'::jsonb,
  total integer not null, -- cents
  status text not null default 'completed',
  stripe_session_id text,
  created_at timestamptz not null default now()
);

create index orders_seller_idx on public.orders(seller_id);

-- Row Level Security (RLS)
alter table public.sellers enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Sellers: anyone can read by slug (for public stores), only owner can write their row
create policy "Public sellers are viewable by everyone"
  on public.sellers for select
  using (true);

create policy "Users can insert their own seller row"
  on public.sellers for insert
  with check (auth.uid() = id);

create policy "Users can update their own seller row"
  on public.sellers for update
  using (auth.uid() = id);

-- Products: anyone can view available products, only owner can manage
create policy "Available products are viewable by everyone"
  on public.products for select
  using (status = 'available' or auth.uid() = seller_id);

create policy "Sellers can insert their own products"
  on public.products for insert
  with check (auth.uid() = seller_id);

create policy "Sellers can update their own products"
  on public.products for update
  using (auth.uid() = seller_id);

create policy "Sellers can delete their own products"
  on public.products for delete
  using (auth.uid() = seller_id);

-- Orders: only seller can view their orders
create policy "Sellers can view their own orders"
  on public.orders for select
  using (auth.uid() = seller_id);

create policy "Service role can insert orders"
  on public.orders for insert
  with check (true);

-- Trigger to create seller row on auth signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.sellers (id, email, store_name, store_slug)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'store_name', split_part(new.email, '@', 1)),
    lower(regexp_replace(
      coalesce(new.raw_user_meta_data->>'store_slug', split_part(new.email, '@', 1)),
      '[^a-z0-9]+', '-', 'g'
    )) || '-' || substr(new.id::text, 1, 8)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger sellers_updated_at
  before update on public.sellers
  for each row execute procedure public.handle_updated_at();

create trigger products_updated_at
  before update on public.products
  for each row execute procedure public.handle_updated_at();
