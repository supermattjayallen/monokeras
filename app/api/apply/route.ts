import { createClient } from "@supabase/supabase-js";
import { getJob } from "@/content/jobs";

export const runtime = "nodejs";

const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-|-$/g, "") || "resume";
}

export async function POST(request: Request) {
  const form = await request.formData();
  if (text(form.get("company_website"))) {
    return Response.json({ ok: true });
  }

  const job = getJob(text(form.get("roleSlug")));
  if (!job) {
    return Response.json({ error: "That role is not open." }, { status: 400 });
  }

  const name = text(form.get("name"));
  const email = text(form.get("email"));
  const phone = text(form.get("phone"));
  const location = text(form.get("location"));
  const experience = text(form.get("experience"));
  const focus = text(form.get("focus"));
  const resume = form.get("resume");

  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !phone ||
    !location ||
    !experience ||
    !focus ||
    !form.get("consent")
  ) {
    return Response.json(
      { error: "Fill in the required fields before submitting." },
      { status: 400 },
    );
  }

  if (!(resume instanceof File) || resume.size === 0) {
    return Response.json({ error: "Attach your résumé." }, { status: 400 });
  }
  const extension = resume.name.split(".").pop()?.toLowerCase() || "";
  if (resume.size > MAX_RESUME_BYTES || !ALLOWED_EXTENSIONS.has(extension)) {
    return Response.json(
      { error: "Upload a PDF, DOC, or DOCX résumé of 4 MB or less." },
      { status: 400 },
    );
  }

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return Response.json(
      { error: "Applications are not being delivered yet." },
      { status: 503 },
    );
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const resumePath = `${stamp}-${job.slug}/${safeName(resume.name)}`;
  const bytes = Buffer.from(await resume.arrayBuffer());
  const uploaded = await supabase.storage.from("resumes").upload(resumePath, bytes, {
    contentType: resume.type || "application/octet-stream",
    upsert: false,
  });
  if (uploaded.error) {
    return Response.json(
      { error: "The application could not be sent. Try again in a moment." },
      { status: 502 },
    );
  }

  const inserted = await supabase.from("applications").insert({
    role_slug: job.slug,
    role_title: job.title,
    full_name: name,
    email,
    phone,
    location,
    experience,
    tech_stack: text(form.get("stack")) || null,
    salary_expectation: text(form.get("salary")) || null,
    engineering_level: text(form.get("level")) || null,
    focus,
    resume_path: resumePath,
  });

  if (inserted.error) {
    await supabase.storage.from("resumes").remove([resumePath]);
    return Response.json(
      { error: "The application could not be sent. Try again in a moment." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
