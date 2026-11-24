"use client";

import { useState, type FormEvent } from "react";
import type { ApplicationField } from "@/content/application-forms";

const fieldClass =
  "mt-2 w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-base text-ink";

export function ApplicationForm({
  roleTitle,
  roleSlug,
  fields,
}: {
  roleTitle: string;
  roleSlug: string;
  fields: ApplicationField[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setChoiceValidity(form, fields);
    if (!form.reportValidity()) return;

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
      setMessage(
        "Your application was sent. The hiring team will be in touch if there is a next step.",
      );
    } catch {
      setStatus("error");
      setMessage("The application could not be sent. Try again in a moment.");
    }
  }

  return (
    <form className="mt-6 grid gap-5" onSubmit={onSubmit}>
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <p className="text-sm text-muted">Questions marked with * are required.</p>

      {fields.map((field) => (
        <Field key={field.name} field={field} />
      ))}

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

function Field({ field }: { field: ApplicationField }) {
  const hintId = field.help ? `${field.name}-hint` : undefined;

  if (field.type === "radio" || field.type === "checkbox") {
    return (
      <fieldset
        className="min-w-0 border-0 p-0"
        onChange={(event) => {
          const boxes = event.currentTarget.querySelectorAll("input");
          boxes.forEach((box) => box.setCustomValidity(""));
        }}
      >
        <legend className="text-sm font-medium text-ink">
          {field.label}
          {field.required ? <RequiredMark /> : null}
        </legend>
        <div className="mt-2 grid gap-2">
          {field.options?.map((option) => (
            <label
              key={option}
              className="flex items-start gap-3 text-sm font-normal leading-6 text-ink"
            >
              <input
                type={field.type === "radio" ? "radio" : "checkbox"}
                name={field.name}
                value={option}
                required={field.type === "radio" ? field.required : undefined}
                className="mt-1"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === "file") {
    return (
      <label className="text-sm font-medium text-ink" htmlFor={field.name}>
        {field.label}
        {field.required ? <RequiredMark /> : null}
        <input
          id={field.name}
          name={field.name}
          type="file"
          required={field.required}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          aria-describedby={hintId}
          className={`${fieldClass} file:mr-3 file:rounded-full file:border-0 file:bg-surface-muted file:px-3 file:py-1 file:text-sm file:text-ink`}
        />
        {field.help ? <Hint id={hintId} text={field.help} /> : null}
      </label>
    );
  }

  return (
    <label className="text-sm font-medium text-ink" htmlFor={field.name}>
      {field.label}
      {field.required ? <RequiredMark /> : null}
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        required={field.required}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        maxLength={field.maxLength}
        min={field.type === "number" ? 0 : undefined}
        step={field.type === "number" ? "any" : undefined}
        aria-describedby={hintId}
        className={fieldClass}
      />
      {field.help ? <Hint id={hintId} text={field.help} /> : null}
    </label>
  );
}

function RequiredMark() {
  return (
    <span className="text-accent" aria-label="required">
      {" "}
      *
    </span>
  );
}

function Hint({ id, text }: { id?: string; text: string }) {
  return (
    <span id={id} className="mt-2 block text-sm font-normal text-muted">
      {text}
    </span>
  );
}

function setChoiceValidity(form: HTMLFormElement, fields: ApplicationField[]) {
  for (const field of fields) {
    if (field.type !== "checkbox") continue;
    const boxes = [
      ...form.querySelectorAll<HTMLInputElement>(
        `input[name="${CSS.escape(field.name)}"]`,
      ),
    ];
    if (boxes.length === 0) continue;
    const message =
      field.required && !boxes.some((box) => box.checked)
        ? "Select at least one option."
        : "";
    for (const box of boxes) box.setCustomValidity(message);
  }
}
