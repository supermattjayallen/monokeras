alter table public.applications
  alter column experience drop not null,
  alter column focus drop not null,
  alter column resume_path drop not null,
  add column if not exists engineering_category text,
  add column if not exists opportunity_source text,
  add column if not exists work_authorization text;
