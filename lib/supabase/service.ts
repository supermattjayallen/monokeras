import { createClient } from "@supabase/supabase-js";
import { supabaseServiceRoleKey, supabaseUrl } from "@/lib/supabase/env";

/**
 * Bypasses row level security. Call only after `requireHiringUser()` succeeds.
 * Never import this from a Client Component.
 */
export function createServiceClient() {
  const url = supabaseUrl();
  const serviceKey = supabaseServiceRoleKey();
  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
