import Link from "next/link";
import {
  applicationAnswers,
  formatSubmitted,
  getApplication,
  resumeFileName,
  type ApplicationDetail,
} from "@/lib/hiring/applications";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ApplicationPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getApplication(id);

  return (
    <section className="section-pad" aria-labelledby="application-heading">
      <div className="site-shell max-w-3xl">
        <p className="mb-6">
          <Link
            href="/hiring"
            className="text-sm font-medium text-ink-soft no-underline hover:text-ink"
          >
            All applications
          </Link>
        </p>

        {!result.ok ? (
          <div className="surface-card p-6 sm:p-8" role="alert">
            <h1
              id="application-heading"
              className="text-3xl font-semibold tracking-[-0.03em] text-ink"
            >
              This application is unavailable right now
            </h1>
            <p className="mt-3 text-base leading-7 text-muted">
              Try again in a moment.
            </p>
          </div>
        ) : !result.application ? (
          <div className="surface-card p-6 sm:p-8">
            <h1
              id="application-heading"
              className="text-3xl font-semibold tracking-[-0.03em] text-ink"
            >
              Application not found
            </h1>
            <p className="mt-3 text-base leading-7 text-muted">
              That application is not in the workspace.
            </p>
          </div>
        ) : (
          <ApplicationView application={result.application} />
        )}
      </div>
    </section>
  );
}

function ApplicationView({
  application,
}: {
  application: ApplicationDetail;
}) {
  const answers = applicationAnswers(application);

  return (
    <>
      <p className="eyebrow mb-4">{application.roleTitle}</p>
      <h1
        id="application-heading"
        className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
      >
        {application.fullName}
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">
        Submitted {formatSubmitted(application.createdAt)}
      </p>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-accent">
        {application.roleSlug}
      </p>

      <dl className="surface-card mt-8 grid gap-0 p-6 sm:p-8">
        {answers.map((answer) => (
          <div key={answer.label} className="border-t border-border py-5 first:border-t-0 first:pt-0">
            <dt className="text-sm text-muted">{answer.label}</dt>
            <dd className="mt-1 whitespace-pre-wrap break-words text-base leading-7 text-ink">
              <AnswerValue value={answer.value} kind={answer.kind} />
            </dd>
          </div>
        ))}
        <div className="border-t border-border py-5">
          <dt className="text-sm text-muted">Résumé</dt>
          <dd className="mt-3 text-base leading-7 text-ink">
            {application.resumePath ? (
              <a
                href={`/hiring/${application.id}/resume`}
                className="btn btn-primary"
              >
                Open résumé
              </a>
            ) : (
              "Not provided"
            )}
            {application.resumePath ? (
              <p className="mt-3 break-all text-sm text-muted">
                {resumeFileName(application.resumePath)}
              </p>
            ) : null}
          </dd>
        </div>
      </dl>
    </>
  );
}

function AnswerValue({
  value,
  kind,
}: {
  value: string | null;
  kind?: "email" | "phone";
}) {
  if (!value) return "Not provided";
  if (kind === "email" && /^[^\s@]+@[^\s@]+$/.test(value)) {
    return (
      <a href={`mailto:${value}`} className="text-ink">
        {value}
      </a>
    );
  }
  if (kind === "phone" && /^[0-9+().\-\s]+$/.test(value)) {
    return (
      <a href={`tel:${value.replace(/\s/g, "")}`} className="text-ink">
        {value}
      </a>
    );
  }
  return value;
}
