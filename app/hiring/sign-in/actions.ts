"use server";

import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/auth";
import { getHiringUser } from "@/lib/hiring/guard";

export type AuthFormState = {
  error: string;
};

export async function signIn(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = text(formData.get("email"));
  const password = raw(formData.get("password"));
  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createAuthClient();
  if (!supabase) {
    return { error: "Sign-in is unavailable right now." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "Email or password is incorrect." };
  }

  redirect("/hiring");
}

export async function setPassword(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const user = await getHiringUser();
  if (!user) redirect("/hiring/sign-in");

  const password = raw(formData.get("password"));
  const confirm = raw(formData.get("confirm"));
  if (password.length < 8) {
    return { error: "Use at least 8 characters." };
  }
  if (password !== confirm) {
    return { error: "Those passwords do not match." };
  }

  const supabase = await createAuthClient();
  if (!supabase) {
    return { error: "Sign-in is unavailable right now." };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: "The password could not be saved. Try again." };
  }

  redirect("/hiring");
}

function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function raw(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}
