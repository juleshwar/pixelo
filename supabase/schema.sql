-- Run once in the Supabase SQL editor (or psql) to create Pixelo's table.
create table if not exists public.preset_drawings (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 100),
  -- 10x10 grid of palette color names, e.g. ["WHITE","BLACK",...]
  template jsonb not null check (jsonb_typeof(template) = 'array' and jsonb_array_length(template) = 100
    -- every cell must be a palette color name (see src/constants/PixeloConstants.js)
    and template <@ '["WHITE","BLACK","GREY","GREEN","BLUE","RED","PINK","ORANGE","PURPLE"]'::jsonb),
  created_at timestamptz not null default now()
);

-- Submissions from /design wait for approval; approve them in the dashboard (Table Editor) to make them playable.
alter table public.preset_drawings add column if not exists approved boolean not null default false;

alter table public.preset_drawings enable row level security;

-- Anyone can play approved drawings and submit new ones, which start unapproved.
-- No update or delete policies, so the anon key cannot approve, change or remove drawings.
drop policy if exists "preset_drawings read" on public.preset_drawings;
create policy "preset_drawings read" on public.preset_drawings
  for select to anon, authenticated using (approved);

drop policy if exists "preset_drawings insert" on public.preset_drawings;
create policy "preset_drawings insert" on public.preset_drawings
  for insert to anon, authenticated with check (not approved);

grant select, insert on public.preset_drawings to anon, authenticated;
