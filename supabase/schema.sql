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

alter table public.preset_drawings enable row level security;

-- Anyone can play (read) and submit drawings from /design (insert), as with the old Airtable setup.
-- No update or delete policies, so the anon key cannot change or remove existing drawings.
drop policy if exists "preset_drawings read" on public.preset_drawings;
create policy "preset_drawings read" on public.preset_drawings
  for select to anon, authenticated using (true);

drop policy if exists "preset_drawings insert" on public.preset_drawings;
create policy "preset_drawings insert" on public.preset_drawings
  for insert to anon, authenticated with check (true);

grant select, insert on public.preset_drawings to anon, authenticated;
