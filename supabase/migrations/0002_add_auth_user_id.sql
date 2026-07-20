-- supabase_migration_2024_10_21_add_auth_user_id.sql
-- Fix migration error: ensure auth_user_id column exists on profiles and update RLS policies.

-- Add auth_user_id column if it doesn't exist (some projects may have created profiles without it).
alter table public.profiles
  add column if not exists auth_user_id uuid;

-- Ensure the column is NOT NULL and UNIQUE (as per schema).
alter table public.profiles
  alter column auth_user_id set not null;
create unique index if not exists idx_profiles_auth_user_id on public.profiles(auth_user_id);

-- Drop existing policies that might reference a missing column (if they exist) and recreate them.
set check_function_bodies = false; -- allow dropping policies safely
drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
drop policy if exists profiles_delete on public.profiles;
set check_function_bodies = true;

-- Recreate RLS policies using the correct column.
alter table public.profiles enable row level security;
create policy "profiles_select" on public.profiles for select using (auth.uid() = auth_user_id);
create policy "profiles_insert" on public.profiles for insert with check (auth.uid() = auth_user_id);
create policy "profiles_update" on public.profiles for update using (auth.uid() = auth_user_id);
create policy "profiles_delete" on public.profiles for delete using (auth.uid() = auth_user_id);

-- End of fix migration
