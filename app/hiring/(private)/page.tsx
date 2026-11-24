import Link from "next/link";
import { formatSubmitted, listApplications } from "@/lib/hiring/applications";

export default async function ApplicationsPage() {
  const result = await listApplications();

  return (
    <section className="section-pad" aria-labelledby="applications-heading">
      <div className="site-shell">
        <p className="eyebrow mb-4">Hiring</p>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h1
              id="applications-heading"
              className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
            >
              Applications
            </h1>
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              Newest first.
            </p>
          </div>
          {result.ok ? (
            <p className="font-mono text-sm uppercase tracking-[0.08em] text-accent">
              {result.applications.length}{" "}
              {result.applications.length === 1 ? "application" : "applications"}
            </p>
          ) : null}
        </div>

        {!result.ok ? (
          <div className="surface-card mt-10 p-6 sm:p-8" role="alert">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-ink">
              Applications are unavailable right now
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              Try again in a moment.
            </p>
          </div>
        ) : result.applications.length === 0 ? (
          <div className="surface-card mt-10 p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-ink">
              No applications yet
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              When someone applies, their application will show up here.
            </p>
          </div>
        ) : (
          <ul className="mt-10 flex list-none flex-col gap-4 p-0">
            {result.applications.map((application) => (
              <li key={application.id}>
                <Link
                  href={`/hiring/${application.id}`}
                  className="surface-card block p-6 no-underline transition-colors hover:border-border-strong sm:p-8"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                    {application.roleTitle}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
                    {application.fullName}
                  </h2>
                  <p className="mt-3 break-all text-base leading-7 text-muted">
                    {application.email}
                  </p>
                  <p className="mt-5 text-sm text-ink">
                    {formatSubmitted(application.createdAt)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
