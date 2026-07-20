create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.preferences (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  budget_min numeric,
  budget_max numeric,
  currency text not null default 'USD',
  favorite_categories text[] not null default '{}',
  preferred_marketplaces text[] not null default '{}',
  preferred_brands text[] not null default '{}',
  prioritize_price boolean not null default true,
  prioritize_quality boolean not null default true,
  prioritize_shipping boolean not null default false,
  prioritize_seller boolean not null default true,
  prioritize_reviews boolean not null default true,
  dark_mode boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint preferences_budget_range check (
    budget_min is null
    or budget_max is null
    or budget_min <= budget_max
  )
);

create table public.search_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  query text not null,
  search_type text not null,
  image_url text,
  status text not null default 'processing',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint search_sessions_search_type_check check (search_type in ('text', 'image')),
  constraint search_sessions_status_check check (status in ('processing', 'completed', 'failed'))
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz not null default now(),
  constraint messages_role_check check (role in ('user', 'assistant', 'system'))
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  normalized_name text not null,
  brand text,
  category text,
  image_url text,
  description text,
  specifications jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.recommendations (
  id uuid primary key default gen_random_uuid(),
  search_session_id uuid not null references public.search_sessions(id) on delete cascade,
  recommended_product_id uuid references public.products(id) on delete set null,
  confidence_score numeric not null default 0,
  recommendation_reason text not null,
  tradeoffs text,
  alternatives jsonb not null default '[]'::jsonb,
  ai_summary text not null,
  created_at timestamptz not null default now(),
  constraint recommendations_confidence_score_check check (
    confidence_score >= 0
    and confidence_score <= 100
  )
);

create table public.marketplace_results (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  recommendation_id uuid not null references public.recommendations(id) on delete cascade,
  marketplace text not null,
  listing_url text not null,
  title text not null,
  seller_name text,
  seller_rating numeric,
  price numeric not null,
  currency text not null,
  shipping_price numeric,
  shipping_days integer,
  product_rating numeric,
  review_count integer,
  availability boolean not null default true,
  condition text,
  image_url text,
  created_at timestamptz not null default now()
);

create table public.review_analysis (
  id uuid primary key default gen_random_uuid(),
  marketplace_result_id uuid not null unique references public.marketplace_results(id) on delete cascade,
  summary text not null,
  positives text[] not null default '{}',
  negatives text[] not null default '{}',
  sentiment_score numeric not null default 0,
  authenticity_score numeric not null default 0,
  created_at timestamptz not null default now()
);

create table public.seller_analysis (
  id uuid primary key default gen_random_uuid(),
  marketplace_result_id uuid not null unique references public.marketplace_results(id) on delete cascade,
  trust_score numeric not null default 0,
  risk_level text not null,
  reasoning text not null,
  created_at timestamptz not null default now()
);

create table public.saved_items (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  recommendation_id uuid not null references public.recommendations(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (profile_id, recommendation_id)
);

create table public.search_history (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  search_session_id uuid not null references public.search_sessions(id) on delete cascade,
  query text not null,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index profiles_email_idx on public.profiles(email);
create index profiles_auth_user_id_idx on public.profiles(auth_user_id);
create index search_sessions_profile_id_idx on public.search_sessions(profile_id);
create index search_sessions_created_at_idx on public.search_sessions(created_at desc);
create index search_sessions_status_idx on public.search_sessions(status);
create index conversations_profile_id_idx on public.conversations(profile_id);
create index conversations_updated_at_idx on public.conversations(updated_at desc);
create index messages_conversation_id_idx on public.messages(conversation_id);
create index messages_created_at_idx on public.messages(created_at);
create index recommendations_search_session_id_idx on public.recommendations(search_session_id);
create index recommendations_confidence_score_idx on public.recommendations(confidence_score);
create index marketplace_results_product_id_idx on public.marketplace_results(product_id);
create index marketplace_results_marketplace_idx on public.marketplace_results(marketplace);
create index marketplace_results_price_idx on public.marketplace_results(price);
create index marketplace_results_seller_rating_idx on public.marketplace_results(seller_rating);
create index products_normalized_name_idx on public.products(normalized_name);
create index products_brand_idx on public.products(brand);
create index products_category_idx on public.products(category);
create index saved_items_profile_id_idx on public.saved_items(profile_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_preferences_updated_at
before update on public.preferences
for each row execute function public.set_updated_at();

create trigger set_conversations_updated_at
before update on public.conversations
for each row execute function public.set_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  created_profile_id uuid;
begin
  insert into public.profiles (auth_user_id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)),
    coalesce(new.email, ''),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  returning id into created_profile_id;

  insert into public.preferences (profile_id)
  values (created_profile_id);

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

alter table public.profiles enable row level security;
alter table public.preferences enable row level security;
alter table public.search_sessions enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.products enable row level security;
alter table public.recommendations enable row level security;
alter table public.marketplace_results enable row level security;
alter table public.review_analysis enable row level security;
alter table public.seller_analysis enable row level security;
alter table public.saved_items enable row level security;
alter table public.search_history enable row level security;
alter table public.notifications enable row level security;

create or replace function public.current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.profiles where auth_user_id = auth.uid()
$$;

create policy "Users manage own profile"
on public.profiles
for all
using (auth_user_id = auth.uid())
with check (auth_user_id = auth.uid());

create policy "Users manage own preferences"
on public.preferences
for all
using (profile_id = public.current_profile_id())
with check (profile_id = public.current_profile_id());

create policy "Users manage own search sessions"
on public.search_sessions
for all
using (profile_id = public.current_profile_id())
with check (profile_id = public.current_profile_id());

create policy "Users manage own conversations"
on public.conversations
for all
using (profile_id = public.current_profile_id())
with check (profile_id = public.current_profile_id());

create policy "Users manage own messages"
on public.messages
for all
using (
  exists (
    select 1
    from public.conversations
    where conversations.id = messages.conversation_id
      and conversations.profile_id = public.current_profile_id()
  )
)
with check (
  exists (
    select 1
    from public.conversations
    where conversations.id = messages.conversation_id
      and conversations.profile_id = public.current_profile_id()
  )
);

create policy "Users read products from own recommendations"
on public.products
for select
using (
  exists (
    select 1
    from public.recommendations
    join public.search_sessions on search_sessions.id = recommendations.search_session_id
    where recommendations.recommended_product_id = products.id
      and search_sessions.profile_id = public.current_profile_id()
  )
  or exists (
    select 1
    from public.marketplace_results
    join public.recommendations on recommendations.id = marketplace_results.recommendation_id
    join public.search_sessions on search_sessions.id = recommendations.search_session_id
    where marketplace_results.product_id = products.id
      and search_sessions.profile_id = public.current_profile_id()
  )
);

create policy "Users manage products through authenticated requests"
on public.products
for insert
with check (auth.uid() is not null);

create policy "Users read own recommendations"
on public.recommendations
for select
using (
  exists (
    select 1
    from public.search_sessions
    where search_sessions.id = recommendations.search_session_id
      and search_sessions.profile_id = public.current_profile_id()
  )
);

create policy "Users create recommendations for own sessions"
on public.recommendations
for insert
with check (
  exists (
    select 1
    from public.search_sessions
    where search_sessions.id = recommendations.search_session_id
      and search_sessions.profile_id = public.current_profile_id()
  )
);

create policy "Users read own marketplace results"
on public.marketplace_results
for select
using (
  exists (
    select 1
    from public.recommendations
    join public.search_sessions on search_sessions.id = recommendations.search_session_id
    where recommendations.id = marketplace_results.recommendation_id
      and search_sessions.profile_id = public.current_profile_id()
  )
);

create policy "Users create marketplace results for own recommendations"
on public.marketplace_results
for insert
with check (
  exists (
    select 1
    from public.recommendations
    join public.search_sessions on search_sessions.id = recommendations.search_session_id
    where recommendations.id = marketplace_results.recommendation_id
      and search_sessions.profile_id = public.current_profile_id()
  )
);

create policy "Users read own review analysis"
on public.review_analysis
for select
using (
  exists (
    select 1
    from public.marketplace_results
    join public.recommendations on recommendations.id = marketplace_results.recommendation_id
    join public.search_sessions on search_sessions.id = recommendations.search_session_id
    where marketplace_results.id = review_analysis.marketplace_result_id
      and search_sessions.profile_id = public.current_profile_id()
  )
);

create policy "Users create own review analysis"
on public.review_analysis
for insert
with check (
  exists (
    select 1
    from public.marketplace_results
    join public.recommendations on recommendations.id = marketplace_results.recommendation_id
    join public.search_sessions on search_sessions.id = recommendations.search_session_id
    where marketplace_results.id = review_analysis.marketplace_result_id
      and search_sessions.profile_id = public.current_profile_id()
  )
);

create policy "Users read own seller analysis"
on public.seller_analysis
for select
using (
  exists (
    select 1
    from public.marketplace_results
    join public.recommendations on recommendations.id = marketplace_results.recommendation_id
    join public.search_sessions on search_sessions.id = recommendations.search_session_id
    where marketplace_results.id = seller_analysis.marketplace_result_id
      and search_sessions.profile_id = public.current_profile_id()
  )
);

create policy "Users create own seller analysis"
on public.seller_analysis
for insert
with check (
  exists (
    select 1
    from public.marketplace_results
    join public.recommendations on recommendations.id = marketplace_results.recommendation_id
    join public.search_sessions on search_sessions.id = recommendations.search_session_id
    where marketplace_results.id = seller_analysis.marketplace_result_id
      and search_sessions.profile_id = public.current_profile_id()
  )
);

create policy "Users manage own saved items"
on public.saved_items
for all
using (profile_id = public.current_profile_id())
with check (profile_id = public.current_profile_id());

create policy "Users manage own search history"
on public.search_history
for all
using (profile_id = public.current_profile_id())
with check (profile_id = public.current_profile_id());

create policy "Users manage own notifications"
on public.notifications
for all
using (profile_id = public.current_profile_id())
with check (profile_id = public.current_profile_id());
