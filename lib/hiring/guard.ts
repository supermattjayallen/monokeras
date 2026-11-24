import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createAuthClient } from "@/lib/supabase/auth";

export async function getHiringUser(): Promise<User | null> {
  const supabase = await createAuthClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function requireHiringUser(): Promise<User> {
  const user = await getHiringUser();
  if (!user) redirect("/hiring/sign-in");
  return user;
}
