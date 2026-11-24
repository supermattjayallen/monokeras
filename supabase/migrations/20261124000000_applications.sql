create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  role_slug text not null,
  role_title text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  location text not null,
  experience text not null,
  tech_stack text,
  salary_expectation text,
  engineering_level text,
  focus text not null,
  resume_path text not null,
  created_at timestamptz not null default now()
);

alter table public.applications enable row level security;

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;
