-- ============================================================
-- SEAM — Initial Database Schema
-- Run this in the Supabase SQL Editor (supabase.com > SQL Editor)
-- ============================================================

-- ── Profiles (extends auth.users) ───────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  role        text not null check (role in ('customer', 'tailor', 'admin')) default 'customer',
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'customer'),
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Tailors ─────────────────────────────────────────────────
create table public.tailors (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles on delete cascade,
  studio_name      text not null,
  location         text not null,
  country          text,
  region           text,
  bio              text not null default '',
  verified         boolean not null default false,
  featured         boolean not null default false,
  price_min        integer not null default 0,
  price_max        integer not null default 0,
  currency         text not null default 'GBP',
  delivery_weeks   integer not null default 6,
  response_time    text not null default 'within 24 hours',
  rating           numeric(3,2) not null default 0,
  review_count     integer not null default 0,
  years_experience integer,
  website          text,
  instagram        text,
  created_at       timestamptz not null default now()
);

create table public.tailor_specialisms (
  tailor_id  uuid not null references public.tailors on delete cascade,
  specialism text not null,
  primary key (tailor_id, specialism)
);

create table public.tailor_garment_categories (
  tailor_id uuid not null references public.tailors on delete cascade,
  category  text not null,
  primary key (tailor_id, category)
);

create table public.portfolio_items (
  id           uuid primary key default gen_random_uuid(),
  tailor_id    uuid not null references public.tailors on delete cascade,
  title        text not null,
  garment_type text not null,
  image_url    text,
  emoji        text,
  created_at   timestamptz not null default now()
);

-- ── Enquiries ───────────────────────────────────────────────
create table public.enquiries (
  id                      uuid primary key default gen_random_uuid(),
  customer_id             uuid not null references public.profiles on delete cascade,
  tailor_id               uuid not null references public.tailors on delete cascade,
  garment_type            text not null,
  description             text,
  fit_preference          text,
  budget_min              integer,
  budget_max              integer,
  deadline                date,
  inspiration_notes       text,
  measurements            jsonb,
  measurement_notes       text,
  consultation_requested  boolean not null default false,
  consultation_notes      text,
  status                  text not null check (status in ('sent','quote_received','accepted','declined','expired')) default 'sent',
  created_at              timestamptz not null default now()
);

-- ── Quotes ──────────────────────────────────────────────────
create table public.quotes (
  id             uuid primary key default gen_random_uuid(),
  enquiry_id     uuid not null references public.enquiries on delete cascade,
  tailor_id      uuid not null references public.tailors on delete cascade,
  customer_id    uuid not null references public.profiles on delete cascade,
  amount         integer not null, -- pennies (GBP) or cents
  currency       text not null default 'GBP',
  delivery_weeks integer not null,
  notes          text,
  status         text not null check (status in ('sent','accepted','declined','expired','revised')) default 'sent',
  expires_at     timestamptz,
  created_at     timestamptz not null default now()
);

-- ── Orders ──────────────────────────────────────────────────
create table public.orders (
  id                       uuid primary key default gen_random_uuid(),
  quote_id                 uuid references public.quotes on delete set null,
  customer_id              uuid not null references public.profiles on delete cascade,
  tailor_id                uuid not null references public.tailors on delete cascade,
  garment_type             text not null,
  description              text,
  amount                   integer not null,
  tailor_payout            integer not null,
  currency                 text not null default 'GBP',
  status                   text not null check (status in ('pending_payment','in_production','shipped','delivered','issue_window','completed','disputed','cancelled')) default 'pending_payment',
  escrow_status            text not null check (escrow_status in ('unpaid','held','released','refunded','paused')) default 'unpaid',
  stripe_payment_intent_id text,
  tracking_number          text,
  tracking_carrier         text,
  paid_at                  timestamptz,
  shipped_at               timestamptz,
  delivered_at             timestamptz,
  issue_window_close_at    timestamptz,
  completed_at             timestamptz,
  created_at               timestamptz not null default now()
);

create table public.order_milestones (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references public.orders on delete cascade,
  label        text not null,
  description  text not null,
  completed_at timestamptz,
  sort_order   integer not null default 0
);

-- ── Conversations & Messages ─────────────────────────────────
create table public.conversations (
  id          uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles on delete cascade,
  tailor_id   uuid not null references public.tailors on delete cascade,
  order_id    uuid references public.orders on delete set null,
  created_at  timestamptz not null default now(),
  unique (customer_id, tailor_id, order_id)
);

create table public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations on delete cascade,
  sender_id       uuid not null references public.profiles on delete cascade,
  body            text not null,
  read_at         timestamptz,
  created_at      timestamptz not null default now()
);

-- ── Reviews ─────────────────────────────────────────────────
create table public.reviews (
  id                   uuid primary key default gen_random_uuid(),
  order_id             uuid not null references public.orders on delete cascade,
  customer_id          uuid not null references public.profiles on delete cascade,
  tailor_id            uuid not null references public.tailors on delete cascade,
  overall_rating       integer not null check (overall_rating between 1 and 5),
  fit_rating           integer check (fit_rating between 1 and 5),
  quality_rating       integer check (quality_rating between 1 and 5),
  communication_rating integer check (communication_rating between 1 and 5),
  delivery_rating      integer check (delivery_rating between 1 and 5),
  comment              text not null,
  display_name         text,
  created_at           timestamptz not null default now(),
  unique (order_id, customer_id)
);

-- Update tailor rating after review insert/update
create or replace function public.update_tailor_rating()
returns trigger language plpgsql as $$
begin
  update public.tailors
  set
    rating       = (select round(avg(overall_rating)::numeric, 2) from public.reviews where tailor_id = new.tailor_id),
    review_count = (select count(*) from public.reviews where tailor_id = new.tailor_id)
  where id = new.tailor_id;
  return new;
end;
$$;

create trigger on_review_upsert
  after insert or update on public.reviews
  for each row execute procedure public.update_tailor_rating();

-- ── Disputes ────────────────────────────────────────────────
create table public.disputes (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references public.orders on delete cascade,
  raised_by       uuid not null references public.profiles on delete cascade,
  issue           text not null,
  customer_detail text not null,
  tailor_response text,
  admin_notes     text,
  status          text not null check (status in ('open','under_review','resolved_release','resolved_refund','resolved_partial')) default 'open',
  created_at      timestamptz not null default now()
);

create table public.dispute_events (
  id          uuid primary key default gen_random_uuid(),
  dispute_id  uuid not null references public.disputes on delete cascade,
  actor_id    uuid references public.profiles on delete set null,
  actor_name  text not null,
  role        text not null check (role in ('customer','tailor','admin')),
  action      text not null,
  detail      text,
  created_at  timestamptz not null default now()
);

-- ── Tailor Applications ──────────────────────────────────────
create table public.tailor_applications (
  id                 uuid primary key default gen_random_uuid(),
  studio_name        text not null,
  owner_name         text not null,
  email              text not null,
  phone              text,
  location           text not null,
  region             text,
  bio                text not null,
  specialisms        text[] not null default '{}',
  garment_categories text[] not null default '{}',
  price_min          integer,
  price_max          integer,
  years_experience   integer,
  website            text,
  instagram          text,
  status             text not null check (status in ('pending','approved','rejected')) default 'pending',
  created_at         timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles               enable row level security;
alter table public.tailors                enable row level security;
alter table public.tailor_specialisms     enable row level security;
alter table public.tailor_garment_categories enable row level security;
alter table public.portfolio_items        enable row level security;
alter table public.enquiries              enable row level security;
alter table public.quotes                 enable row level security;
alter table public.orders                 enable row level security;
alter table public.order_milestones       enable row level security;
alter table public.conversations          enable row level security;
alter table public.messages               enable row level security;
alter table public.reviews                enable row level security;
alter table public.disputes               enable row level security;
alter table public.dispute_events         enable row level security;
alter table public.tailor_applications    enable row level security;

-- Profiles: own row + admin sees all
create policy "profiles_self_select" on public.profiles for select using (auth.uid() = id);
create policy "profiles_self_insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_self_update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_admin" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Tailors: public read, tailor edits own, admin edits all
create policy "tailors_public_read" on public.tailors for select using (true);
create policy "tailors_owner_insert" on public.tailors for insert with check (user_id = auth.uid());
create policy "tailors_owner_update" on public.tailors for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "tailors_owner_delete" on public.tailors for delete using (user_id = auth.uid());
create policy "tailors_admin" on public.tailors for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
) with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Specialism/category/portfolio: public read, owner write
create policy "tailor_specialisms_read" on public.tailor_specialisms for select using (true);
create policy "tailor_specialisms_insert" on public.tailor_specialisms for insert with check (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "tailor_specialisms_delete" on public.tailor_specialisms for delete using (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "tailor_categories_read" on public.tailor_garment_categories for select using (true);
create policy "tailor_categories_insert" on public.tailor_garment_categories for insert with check (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "tailor_categories_delete" on public.tailor_garment_categories for delete using (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "portfolio_read" on public.portfolio_items for select using (true);
create policy "portfolio_insert" on public.portfolio_items for insert with check (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "portfolio_update" on public.portfolio_items for update using (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
) with check (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "portfolio_delete" on public.portfolio_items for delete using (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);

-- Enquiries: customer sees own, tailor sees theirs, admin sees all
create policy "enquiries_customer_select" on public.enquiries for select using (customer_id = auth.uid());
create policy "enquiries_customer_insert" on public.enquiries for insert with check (customer_id = auth.uid());
create policy "enquiries_tailor_select" on public.enquiries for select using (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "enquiries_admin" on public.enquiries for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
) with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Quotes: customer sees theirs, tailor sees theirs, admin sees all
create policy "quotes_customer_select" on public.quotes for select using (customer_id = auth.uid());
create policy "quotes_tailor_select" on public.quotes for select using (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "quotes_tailor_insert" on public.quotes for insert with check (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "quotes_tailor_update" on public.quotes for update using (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
) with check (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "quotes_admin" on public.quotes for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
) with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Orders: customer sees own, tailor sees theirs, admin sees all
create policy "orders_customer_select" on public.orders for select using (customer_id = auth.uid());
create policy "orders_tailor_select" on public.orders for select using (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "orders_tailor_update" on public.orders for update using (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
) with check (
  exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "orders_admin" on public.orders for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
) with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "milestones_parties" on public.order_milestones for select using (
  exists (
    select 1 from public.orders o
    where o.id = order_id
    and (o.customer_id = auth.uid() or exists (select 1 from public.tailors where id = o.tailor_id and user_id = auth.uid()))
  )
);
create policy "milestones_admin" on public.order_milestones for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
) with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Messages: only conversation parties
create policy "conversations_select" on public.conversations for select using (
  customer_id = auth.uid()
  or exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "conversations_insert" on public.conversations for insert with check (
  customer_id = auth.uid()
  or exists (select 1 from public.tailors where id = tailor_id and user_id = auth.uid())
);
create policy "messages_select" on public.messages for select using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id
    and (c.customer_id = auth.uid() or exists (select 1 from public.tailors where id = c.tailor_id and user_id = auth.uid()))
  )
);
create policy "messages_insert" on public.messages for insert with check (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id
    and (c.customer_id = auth.uid() or exists (select 1 from public.tailors where id = c.tailor_id and user_id = auth.uid()))
  )
);

-- Reviews: public read, customer writes own
create policy "reviews_public_read" on public.reviews for select using (true);
create policy "reviews_customer_insert" on public.reviews for insert with check (customer_id = auth.uid());

-- Disputes: parties + admin
create policy "disputes_customer_select" on public.disputes for select using (raised_by = auth.uid());
create policy "disputes_customer_insert" on public.disputes for insert with check (raised_by = auth.uid());
create policy "disputes_tailor_select" on public.disputes for select using (
  exists (
    select 1 from public.orders o join public.tailors t on t.id = o.tailor_id
    where o.id = order_id and t.user_id = auth.uid()
  )
);
create policy "disputes_tailor_update" on public.disputes for update using (
  exists (
    select 1 from public.orders o join public.tailors t on t.id = o.tailor_id
    where o.id = order_id and t.user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from public.orders o join public.tailors t on t.id = o.tailor_id
    where o.id = order_id and t.user_id = auth.uid()
  )
);
create policy "disputes_admin" on public.disputes for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
) with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "dispute_events_select" on public.dispute_events for select using (
  exists (
    select 1 from public.disputes d
    join public.orders o on o.id = d.order_id
    where d.id = dispute_id
    and (d.raised_by = auth.uid() or o.customer_id = auth.uid()
         or exists (select 1 from public.tailors where id = o.tailor_id and user_id = auth.uid()))
  )
);
create policy "dispute_events_insert" on public.dispute_events for insert with check (
  actor_id = auth.uid()
  or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Applications: anyone inserts; only admin reads/updates
create policy "applications_insert" on public.tailor_applications for insert with check (true);
create policy "applications_admin_select" on public.tailor_applications for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "applications_admin_update" on public.tailor_applications for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
) with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- SEED DATA (6 tailors matching the mock data)
-- Run after creating your first admin user and setting their role
-- ============================================================

-- Seed user: a synthetic auth user that owns all demo tailor rows.
-- We insert directly into auth.users so the seed is fully self-contained.
insert into auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, aud, role)
values (
  '00000000-0000-0000-0000-000000000000',
  'seed@seam.internal',
  '',
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Seed Account","role":"tailor"}',
  'authenticated',
  'authenticated'
) on conflict (id) do nothing;

insert into public.tailors (id, user_id, studio_name, location, country, region, bio, verified, featured, price_min, price_max, currency, delivery_weeks, response_time, rating, review_count) values
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'Lagos Bespoke Studio', 'Lagos, Nigeria', 'Nigeria', 'West Africa', 'Three generations of tailoring excellence from Lagos Island. We specialise in bespoke suits and formal African wear, blending traditional craftsmanship with contemporary silhouettes.', true, true, 180, 1200, 'GBP', 6, 'within 24 hours', 4.9, 48),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'Nairobi Tailors Co.', 'Nairobi, Kenya', 'Kenya', 'East Africa', 'East Africa''s premier bespoke studio. Known for immaculate construction and stunning bridal work.', true, true, 220, 1800, 'GBP', 8, 'within 12 hours', 4.8, 34),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'Accra Threads', 'Accra, Ghana', 'Ghana', 'West Africa', 'Specialists in Kente and Ankara bespoke. We source hand-woven kente directly from Bonwire weavers.', true, false, 120, 800, 'GBP', 5, 'within 24 hours', 4.7, 29),
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'Dakar Couture House', 'Dakar, Senegal', 'Senegal', 'West Africa', 'Haute couture from the heart of Dakar. Evening gowns and grand boubou in bazin riche are our signature.', true, false, 200, 1400, 'GBP', 7, 'within 48 hours', 4.6, 21),
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'Cairo Bespoke', 'Cairo, Egypt', 'Egypt', 'North Africa', 'Cairo''s finest menswear studio. Shirts, suits, and tailored trousers crafted from Egyptian cotton and finest imports.', true, false, 80, 600, 'GBP', 4, 'within 24 hours', 4.5, 17),
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000', 'Kampala Stitch Co.', 'Kampala, Uganda', 'Uganda', 'East Africa', 'Quality everyday wear and smart-casual tailoring from Kampala. Fast turnaround, honest prices.', false, false, 60, 400, 'GBP', 3, 'within 24 hours', 4.3, 12);
