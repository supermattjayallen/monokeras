"use client";

import { useState, type FormEvent } from "react";

const fieldClass =
  "mt-2 w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-base text-ink";

const levels = [
  "Senior Software Engineer",
  "Lead Software Engineer",
  "Principal Software Engineer",
  "Staff Software Engineer",
  "Manager or Director",
];

export function ApplicationForm({
  roleTitle,
  roleSlug,
}: {
  roleTitle: string;
  roleSlug: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");
    const body = new FormData(form);
    body.set("roleTitle", roleTitle);
    body.set("roleSlug", roleSlug);

    try {
      const response = await fetch("/api/apply", { method: "POST", body });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "The application could not be sent.");
        return;
      }
      form.reset();
      setStatus("sent");
      setMessage("Your application was sent. The hiring team will be in touch if there is a next step.");
    } catch {
      setStatus("error");
      setMessage("The application could not be sent. Try again in a moment.");
    }
  }

  return (
    <form className="mt-6 grid gap-5" onSubmit={onSubmit} noValidate={false}>
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <label className="text-sm font-medium text-ink">
        Full name
        <input name="name" required autoComplete="name" className={fieldClass} />
      </label>
      <label className="text-sm font-medium text-ink">
        Email address
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </label>
      <label className="text-sm font-medium text-ink">
        Phone number
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className={fieldClass}
        />
      </label>
      <label className="text-sm font-medium text-ink">
        Location
        <input
          name="location"
          required
          placeholder="City and country"
          autoComplete="address-level2"
          className={fieldClass}
        />
      </label>
      <label className="text-sm font-medium text-ink">
        Years of experience
        <input name="experience" required className={fieldClass} />
      </label>
      <label className="text-sm font-medium text-ink">
        Primary tech stack
        <input
          name="stack"
          placeholder="For example: PHP, Laravel, Stripe"
          className={fieldClass}
        />
      </label>
      <label className="text-sm font-medium text-ink">
        Salary expectation
        <input
          name="salary"
          placeholder="Currency and period, for example USD 60/hour"
          className={fieldClass}
        />
      </label>
      <label className="text-sm font-medium text-ink">
        Engineering level
        <select name="level" className={fieldClass} defaultValue="">
          <option value="">Select a level</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium text-ink">
        How would you describe your focus?
        <input name="focus" required className={fieldClass} />
      </label>
      <label className="text-sm font-medium text-ink">
        Résumé
        <input
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className={`${fieldClass} file:mr-3 file:rounded-full file:border-0 file:bg-surface-muted file:px-3 file:py-1 file:text-sm file:text-ink`}
        />
        <span className="mt-2 block text-sm font-normal text-muted">
          PDF, DOC, or DOCX. Maximum 4 MB.
        </span>
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-ink">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>
          I agree that Monokeras may use this information to review my
          application for {roleTitle} and contact me about it.
        </span>
      </label>

      <button
        type="submit"
        className="btn btn-primary w-full sm:w-auto"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Submit application"}
      </button>
      {message ? (
        <p
          role="status"
          className={status === "error" ? "text-sm text-red-700" : "text-sm text-ink"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
