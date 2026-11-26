-- ==============================================================================
-- SQL Schema untuk Portfolio Database di Supabase
-- Salin dan jalankan (RUN) script ini di menu "SQL Editor" di dashboard Supabase Anda.
-- ==============================================================================

-- 1. Buat tabel 'portfolio'
create table if not exists public.portfolio (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Aktifkan Row Level Security (RLS)
alter table public.portfolio enable row level security;

-- 3. Kebijakan (Policy) 1: Siapapun (publik/anon) boleh membaca data (SELECT)
create policy "Public Read Access"
  on public.portfolio
  for select
  using (true);

-- 4. Kebijakan (Policy) 2: Izinkan INSERT & UPDATE melalui API Next.js
create policy "Allow All Modifications"
  on public.portfolio
  for all
  using (true)
  with check (true);
