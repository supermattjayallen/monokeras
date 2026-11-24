"use client";

import { useActionState } from "react";
import { setPassword, type AuthFormState } from "@/app/hiring/sign-in/actions";

const initialState: AuthFormState = { error: "" };
const fieldClass =
  "mt-2 w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-base text-ink";

export function PasswordForm() {
  const [state, action, pending] = useActionState(setPassword, initialState);

  return (
    <form className="grid gap-5" action={action}>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="confirm" className="text-sm font-medium text-ink">
          Confirm password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
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
        {pending ? "Saving…" : "Save password"}
      </button>
    </form>
  );
}
