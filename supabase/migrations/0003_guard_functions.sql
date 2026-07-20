-- 0003_guard_functions.sql
-- Ensure the helper that gives the current profile id exists only once.
do $$
begin
  if not exists (select 1 from pg_proc where proname = 'current_profile_id') then
    create function public.current_profile_id() returns uuid
    language sql stable as $func$
      select auth.uid()
    $func$;
  end if;
end $$;

-- Re‑create RLS policies (they reference auth_user_id)
-- Drop any existing ones first – safe because we guard with set check_function_bodies.
set check_function_bodies = false;
drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
drop policy if exists profiles_delete on public.profiles;
set check_function_bodies = true;

alter table public.profiles enable row level security;
create policy "profiles_select"  on public.profiles for select using (auth.uid() = auth_user_id);
create policy "profiles_insert"  on public.profiles for insert with check (auth.uid() = auth_user_id);
create policy "profiles_update"  on public.profiles for update using (auth.uid() = auth_user_id);
create policy "profiles_delete"  on public.profiles for delete using (auth.uid() = auth_user_id);
