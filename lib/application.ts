import type { ApplicationField } from "@/content/application-forms";

const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);
const NUMBER_PATTERN = /^\d+(\.\d+)?$/;

export type CollectedApplication = {
  answers: Record<string, string | null>;
  resume: File | null;
};

export function collectApplication(
  form: FormData,
  fields: ApplicationField[],
): { ok: true; value: CollectedApplication } | { ok: false; error: string } {
  const answers: Record<string, string | null> = {};

  for (const field of fields) {
    if (field.type === "file") continue;

    if (field.type === "checkbox") {
      const selected = [
        ...new Set(
          form
            .getAll(field.name)
            .filter((entry): entry is string => typeof entry === "string")
            .map((entry) => entry.trim())
            .filter(Boolean),
        ),
      ];
      if (field.required && selected.length === 0) {
        return { ok: false, error: "Fill in the required fields before submitting." };
      }
      if (selected.some((value) => !field.options?.includes(value))) {
        return { ok: false, error: "Choose one of the listed options." };
      }
      answers[field.name] = selected.length > 0 ? selected.join(", ") : null;
      continue;
    }

    const value = text(form.get(field.name));
    if (field.required && !value) {
      return { ok: false, error: "Fill in the required fields before submitting." };
    }
    if (value && field.maxLength && value.length > field.maxLength) {
      return { ok: false, error: "One of the answers is too long." };
    }
    if (field.type === "email" && value && !value.includes("@")) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (field.type === "number" && value && !NUMBER_PATTERN.test(value)) {
      return { ok: false, error: "Enter a number for years of experience." };
    }
    if (field.type === "radio" && value && !field.options?.includes(value)) {
      return { ok: false, error: "Choose one of the listed options." };
    }
    answers[field.name] = value || null;
  }

  const resumeField = fields.find((field) => field.type === "file");
  const resume = readResume(form.get("resume"));
  if (resumeField?.required && !resume) {
    return { ok: false, error: "Attach your résumé." };
  }
  if (resume) {
    const extension = resume.name.split(".").pop()?.toLowerCase() || "";
    if (resume.size > MAX_RESUME_BYTES || !ALLOWED_EXTENSIONS.has(extension)) {
      return {
        ok: false,
        error: "Upload a PDF, DOC, or DOCX résumé of 4 MB or less.",
      };
    }
  }

  return { ok: true, value: { answers, resume } };
}

function readResume(value: FormDataEntryValue | null): File | null {
  if (!(value instanceof File) || value.size === 0) return null;
  return value;
}

function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}
