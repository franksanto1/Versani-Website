# Versani Website — Supabase Schema Requirements

This document lists all tables and columns the Versani marketing site + admin console expects in the shared Supabase instance. Since the website shares a database with the main Versani app (salon-muse-pro), some columns may already exist from app migrations. Others need to be added.

---

## `profiles` table (required)

| Column | Type | Purpose | Required for |
|---|---|---|---|
| `id` | uuid (PK) | Supabase auth user ID | Core auth |
| `email` | text | User email | Admin user list |
| `is_admin` | boolean | Gate for `/admin` routes | Admin middleware |
| `stripe_customer_id` | text | Links user to Stripe customer | Checkout, portal |
| `subscription_tier` | text | 'pro' / 'studio' | Billing, admin dashboard |
| `subscription_status` | text | 'active' / 'trialing' / 'canceled' / 'past_due' | Billing, dashboard |
| `current_period_end` | timestamptz | When current subscription period ends | Dashboard, reports |
| `created_at` | timestamptz | Account creation time | Dashboard |
| `last_sign_in_at` | timestamptz | Last auth event (managed by Supabase Auth) | Activity tracking |

### Migration SQL (if needed)

```sql
-- Add columns to profiles if missing
alter table profiles add column if not exists is_admin boolean default false;
alter table profiles add column if not exists stripe_customer_id text;
alter table profiles add column if not exists subscription_tier text;
alter table profiles add column if not exists subscription_status text;
alter table profiles add column if not exists current_period_end timestamptz;

-- Index for Stripe lookups
create index if not exists profiles_stripe_customer_id_idx on profiles(stripe_customer_id);
```

---

## `partners` table (optional — placeholder until first partner signed)

```sql
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  contact_email text,
  tier text check (tier in ('anchor', 'standard', 'category')),
  category text,
  status text default 'prospect' check (status in ('prospect', 'negotiating', 'signed', 'active', 'churned')),
  year_started int,
  monthly_fee numeric default 0,
  exclusive_category boolean default false,
  notes text,
  created_at timestamptz default now()
);
```

---

## `ambassadors` table (optional)

```sql
create table if not exists ambassadors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  handle text,
  email text,
  tier text check (tier in ('founding', 'platinum', 'gold', 'silver')),
  affiliate_code text unique,
  affiliate_rate numeric default 0.20,
  status text default 'prospect',
  signed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists ambassador_attributions (
  id uuid primary key default gen_random_uuid(),
  ambassador_id uuid references ambassadors(id),
  user_id uuid references profiles(id),
  attributed_at timestamptz default now(),
  first_payment_at timestamptz,
  lifetime_revenue numeric default 0
);
```

---

## `full_ai_usage_logs` table (inherited from app)

If this already exists in the shared Supabase from the main Versani app, the admin dashboard will read from it automatically. Required columns:

- `id` uuid
- `user_id` uuid
- `feature` text (consultation / client_update / ask_versani / rendering / scoring / voice)
- `model` text
- `cost_usd` numeric
- `created_at` timestamptz

---

## RLS (Row Level Security) policies

### `profiles`

```sql
-- Users can read/update their own profile
create policy "users read own profile" on profiles
  for select using (auth.uid() = id);

create policy "users update own profile" on profiles
  for update using (auth.uid() = id);

-- Admins can read all profiles
create policy "admins read all profiles" on profiles
  for select using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );
```

### `partners`, `ambassadors`

Admin-only access:

```sql
create policy "admins only partners" on partners
  for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

create policy "admins only ambassadors" on ambassadors
  for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );
```

---

## First-admin bootstrap

After creating the `is_admin` column, manually flip your own account:

```sql
update profiles set is_admin = true where email = 'your@email.com';
```

---

## Graceful degradation

The website is designed to handle missing schema gracefully:
- Missing columns → admin pages show "No data yet — connect Supabase" state
- Missing tables → empty arrays returned, no crashes
- Missing RLS → defaults to restrictive (safe)

All admin queries are wrapped in try/catch. No schema mismatch should crash the site.
