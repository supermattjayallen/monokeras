import { createClient } from "@supabase/supabase-js";
import { getApplicationFields } from "@/content/application-forms";
import { getJob } from "@/content/jobs";
import { collectApplication } from "@/lib/application";

export const runtime = "nodejs";

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
  const fields = job ? getApplicationFields(job.slug) : undefined;
  if (!job || !fields) {
    return Response.json({ error: "That role is not open." }, { status: 400 });
  }
  if (!form.get("consent")) {
    return Response.json(
      { error: "Fill in the required fields before submitting." },
      { status: 400 },
    );
  }

  const collected = collectApplication(form, fields);
  if (!collected.ok) {
    return Response.json({ error: collected.error }, { status: 400 });
  }

  const { answers, resume } = collected.value;
  const fullName = answers.full_name;
  const email = answers.email;
  const phone = answers.phone;
  const location = answers.location;
  if (!fullName || !email || !phone || !location) {
    return Response.json(
      { error: "Fill in the required fields before submitting." },
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

  let resumePath: string | null = null;
  if (resume) {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    resumePath = `${stamp}-${job.slug}/${safeName(resume.name)}`;
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
  }

  const inserted = await supabase.from("applications").insert({
    role_slug: job.slug,
    role_title: job.title,
    full_name: fullName,
    email,
    phone,
    location,
    experience: answers.years_experience ?? null,
    tech_stack: answers.primary_stack ?? null,
    salary_expectation: answers.salary_expectation ?? null,
    engineering_level: answers.engineering_level ?? null,
    engineering_category: answers.engineering_category ?? null,
    opportunity_source: answers.opportunity_source ?? null,
    work_authorization: answers.work_authorization ?? null,
    resume_path: resumePath,
  });

  if (inserted.error) {
    if (resumePath) {
      await supabase.storage.from("resumes").remove([resumePath]);
    }
    return Response.json(
      { error: "The application could not be sent. Try again in a moment." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
