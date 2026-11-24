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

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.CAREERS_REPO || "supermattjayallen/monokeras-applications";
  if (!token) {
    return Response.json(
      { error: "Applications are not being delivered yet." },
      { status: 503 },
    );
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const folder = `applications/${stamp}-${job.slug}`;
  const filename = safeName(resume.name);
  const bytes = Buffer.from(await resume.arrayBuffer());

  const uploaded = await fetch(
    `https://api.github.com/repos/${repo}/contents/${folder}/${filename}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "monokeras-careers",
      },
      body: JSON.stringify({
        message: `Store résumé for ${job.title}`,
        content: bytes.toString("base64"),
      }),
    },
  );

  if (!uploaded.ok) {
    return Response.json(
      { error: "The application could not be sent. Try again in a moment." },
      { status: 502 },
    );
  }

  const file = (await uploaded.json()) as { content?: { html_url?: string } };
  const issue = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "monokeras-careers",
    },
    body: JSON.stringify({
      title: `${job.title}: ${name}`,
      body: [
        `**Role:** ${job.title}`,
        `**Name:** ${name}`,
        `**Email:** ${email}`,
        `**Phone:** ${phone}`,
        `**Location:** ${location}`,
        `**Experience:** ${experience}`,
        `**Tech stack:** ${text(form.get("stack")) || "Not provided"}`,
        `**Salary expectation:** ${text(form.get("salary")) || "Not provided"}`,
        `**Engineering level:** ${text(form.get("level")) || "Not provided"}`,
        `**Focus:** ${focus}`,
        "",
        file.content?.html_url
          ? `**Résumé:** ${file.content.html_url}`
          : "**Résumé:** stored with this application",
      ].join("\n"),
    }),
  });

  if (!issue.ok) {
    return Response.json(
      { error: "The application could not be sent. Try again in a moment." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
