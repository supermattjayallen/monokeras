import { getApplicationFields } from "@/content/application-forms";
import { requireHiringUser } from "@/lib/hiring/guard";
import { createServiceClient } from "@/lib/supabase/service";

export type ApplicationSummary = {
  id: string;
  roleTitle: string;
  fullName: string;
  email: string;
  createdAt: string;
};

export type ApplicationDetail = ApplicationSummary & {
  roleSlug: string;
  phone: string;
  location: string;
  experience: string | null;
  techStack: string | null;
  salaryExpectation: string | null;
  engineeringLevel: string | null;
  engineeringCategory: string | null;
  opportunitySource: string | null;
  workAuthorization: string | null;
  focus: string | null;
  resumePath: string | null;
};

export type AnswerRow = {
  label: string;
  value: string | null;
  kind?: "email" | "phone";
};

const summaryColumns = "id, role_title, full_name, email, created_at";
const detailColumns = [
  "id",
  "role_slug",
  "role_title",
  "full_name",
  "email",
  "phone",
  "location",
  "experience",
  "tech_stack",
  "salary_expectation",
  "engineering_level",
  "engineering_category",
  "opportunity_source",
  "work_authorization",
  "focus",
  "resume_path",
  "created_at",
].join(", ");

const answerFields: {
  column: keyof ApplicationDetail;
  formName?: string;
  label: string;
  always: boolean;
  kind?: "email" | "phone";
}[] = [
  { column: "fullName", formName: "full_name", label: "Full name", always: true },
  {
    column: "email",
    formName: "email",
    label: "Email address",
    always: true,
    kind: "email",
  },
  {
    column: "phone",
    formName: "phone",
    label: "Phone",
    always: true,
    kind: "phone",
  },
  { column: "location", formName: "location", label: "Location", always: true },
  {
    column: "experience",
    formName: "years_experience",
    label: "Experience",
    always: false,
  },
  {
    column: "techStack",
    formName: "primary_stack",
    label: "Tech stack",
    always: false,
  },
  {
    column: "salaryExpectation",
    formName: "salary_expectation",
    label: "Salary expectation",
    always: false,
  },
  {
    column: "engineeringLevel",
    formName: "engineering_level",
    label: "Engineering level",
    always: false,
  },
  {
    column: "engineeringCategory",
    formName: "engineering_category",
    label: "Engineering category",
    always: false,
  },
  {
    column: "opportunitySource",
    formName: "opportunity_source",
    label: "Opportunity source",
    always: false,
  },
  {
    column: "workAuthorization",
    formName: "work_authorization",
    label: "Work authorization",
    always: false,
  },
  { column: "focus", label: "Focus", always: false },
];

export function formatSubmitted(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
  return `${formatted} CT`;
}

export function resumeFileName(path: string): string {
  const base = path.split("/").pop() || "resume";
  const cleaned = base.replace(/[\r\n"]/g, "").trim();
  return cleaned || "resume";
}

export function applicationAnswers(application: ApplicationDetail): AnswerRow[] {
  const fields = getApplicationFields(application.roleSlug);
  const labels = new Map(fields?.map((field) => [field.name, field.label]));

  return answerFields.flatMap((field) => {
    const value = application[field.column];
    const text = typeof value === "string" ? value : null;
    const asked = field.formName ? labels.has(field.formName) : false;
    if (!field.always && !asked && !text) return [];
    return [
      {
        label: (field.formName && labels.get(field.formName)) || field.label,
        value: text,
        kind: field.kind,
      },
    ];
  });
}

export async function listApplications(): Promise<
  { ok: true; applications: ApplicationSummary[] } | { ok: false }
> {
  await requireHiringUser();
  const supabase = createServiceClient();
  if (!supabase) return { ok: false };

  const { data, error } = await supabase
    .from("applications")
    .select(summaryColumns)
    .order("created_at", { ascending: false });

  if (error || !data) return { ok: false };

  const applications: ApplicationSummary[] = [];
  for (const row of data) {
    const summary = toSummary(row);
    if (summary) applications.push(summary);
  }
  return { ok: true, applications };
}

export async function getApplication(
  id: string,
): Promise<{ ok: true; application: ApplicationDetail | null } | { ok: false }> {
  await requireHiringUser();
  if (!isUuid(id)) return { ok: true, application: null };

  const supabase = createServiceClient();
  if (!supabase) return { ok: false };

  const { data, error } = await supabase
    .from("applications")
    .select(detailColumns)
    .eq("id", id)
    .maybeSingle();

  if (error) return { ok: false };
  if (!data) return { ok: true, application: null };

  const application = toDetail(data);
  if (!application) return { ok: false };
  return { ok: true, application };
}

export async function readResume(
  id: string,
): Promise<
  | { ok: true; fileName: string; bytes: Uint8Array }
  | { ok: false; status: 404 | 502 }
> {
  await requireHiringUser();
  if (!isUuid(id)) return { ok: false, status: 404 };

  const supabase = createServiceClient();
  if (!supabase) return { ok: false, status: 502 };

  const { data, error } = await supabase
    .from("applications")
    .select("resume_path")
    .eq("id", id)
    .maybeSingle();

  const resumePath =
    data && typeof data.resume_path === "string" ? data.resume_path : null;
  if (error || !resumePath) return { ok: false, status: 404 };

  const downloaded = await supabase.storage.from("resumes").download(resumePath);
  if (downloaded.error || !downloaded.data) return { ok: false, status: 404 };

  const bytes = new Uint8Array(await downloaded.data.arrayBuffer());
  return { ok: true, fileName: resumeFileName(resumePath), bytes };
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function toSummary(row: unknown): ApplicationSummary | null {
  if (!row || typeof row !== "object") return null;
  const record = row as Record<string, unknown>;
  const id = text(record.id);
  const roleTitle = text(record.role_title);
  const fullName = text(record.full_name);
  const email = text(record.email);
  const createdAt = text(record.created_at);
  if (!id || !roleTitle || !fullName || !email || !createdAt) return null;
  return { id, roleTitle, fullName, email, createdAt };
}

function toDetail(row: unknown): ApplicationDetail | null {
  const summary = toSummary(row);
  if (!summary || !row || typeof row !== "object") return null;
  const record = row as Record<string, unknown>;
  const roleSlug = text(record.role_slug);
  const phone = text(record.phone);
  const location = text(record.location);
  if (!roleSlug || !phone || !location) return null;
  return {
    ...summary,
    roleSlug,
    phone,
    location,
    experience: text(record.experience),
    techStack: text(record.tech_stack),
    salaryExpectation: text(record.salary_expectation),
    engineeringLevel: text(record.engineering_level),
    engineeringCategory: text(record.engineering_category),
    opportunitySource: text(record.opportunity_source),
    workAuthorization: text(record.work_authorization),
    focus: text(record.focus),
    resumePath: text(record.resume_path),
  };
}
