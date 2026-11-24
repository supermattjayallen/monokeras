"use client";

import { useActionState } from "react";
import { signIn, type AuthFormState } from "@/app/hiring/sign-in/actions";

const initialState: AuthFormState = { error: "" };
const fieldClass =
  "mt-2 w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-base text-ink";

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, initialState);

  return (
    <form className="grid gap-5" action={action}>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldClass}
        />
      </div>
      {state.error ? (
        <p role="alert" className="text-sm text-ink">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={pending}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
