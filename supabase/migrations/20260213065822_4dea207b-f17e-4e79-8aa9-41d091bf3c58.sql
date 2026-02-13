-- Create Enum for Roles
do $$ begin
    create type public.app_role as enum ('admin', 'user');
exception
    when duplicate_object then null;
end $$;

-- Create user_roles table
create table if not exists public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone default now(),
    unique (user_id, role)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Create has_role function
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Create products table
create table if not exists public.products (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    price numeric not null,
    image_url text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Enable RLS on products
alter table public.products enable row level security;

-- Policies for products
create policy "Public can view products"
on public.products
for select
using (true);

create policy "Admins can manage products"
on public.products
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public can view product images"
on storage.objects
for select
using (bucket_id = 'product-images');

create policy "Admins can upload product images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images' 
  and public.has_role(auth.uid(), 'admin')
);

create policy "Admins can update product images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images' 
  and public.has_role(auth.uid(), 'admin')
);

create policy "Admins can delete product images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images' 
  and public.has_role(auth.uid(), 'admin')
);

-- Insert Demo Data (Samsung Galaxy S24) if not exists
INSERT INTO public.products (name, description, price, image_url)
SELECT 
  'Samsung Galaxy S24',
  'Experience the new era of mobile AI with the Galaxy S24. Featuring a stunning 6.2-inch FHD+ display, powerful Exynos 2400 processor, and all-day battery life. Capture life in detail with the 50MP triple camera system.',
  799.99,
  'https://images.unsplash.com/photo-1610945265078-386f3b58d86f?q=80&w=2670&auto=format&fit=crop'
WHERE NOT EXISTS (SELECT 1 FROM public.products LIMIT 1);