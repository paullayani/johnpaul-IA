-- Gmail OAuth tokens
create table if not exists gmail_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id text not null unique,
  access_token text not null,
  refresh_token text,
  expiry_date bigint,
  scope text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Generated email drafts
create table if not exists email_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  email_id text not null,
  thread_id text,
  subject text not null,
  body text not null,
  to_address text not null,
  tone text default 'professional',
  status text default 'pending' check (status in ('pending', 'sent', 'discarded')),
  gmail_draft_id text,
  generated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Agent run logs
create table if not exists agent_logs (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  agent_type text not null,
  action text not null,
  metadata jsonb,
  status text default 'success',
  created_at timestamptz default now()
);

-- RLS (Row Level Security)
alter table gmail_tokens enable row level security;
alter table email_drafts enable row level security;
alter table agent_logs enable row level security;
