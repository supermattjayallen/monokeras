export function supabaseUrl(): string | null {
  const url = process.env.SUPABASE_URL?.trim();
  return url || null;
}

export function supabaseAnonKey(): string | null {
  const key = process.env.SUPABASE_ANON_KEY?.trim();
  return key || null;
}

export function supabaseServiceRoleKey(): string | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return key || null;
}
