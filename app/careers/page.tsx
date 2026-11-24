import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { jobs } from "@/content/jobs";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: site.careers.supporting,
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <section
          className="section-pad border-b border-border"
          aria-labelledby="careers-heading"
        >
          <div className="site-shell">
            <p className="eyebrow mb-4">{site.careers.eyebrow}</p>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h1
                  id="careers-heading"
                  className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
                >
                  {site.careers.title}
                </h1>
                <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
                  {site.careers.supporting}
                </p>
              </div>
              <p className="font-mono text-sm uppercase tracking-[0.08em] text-accent">
                {jobs.length} open roles
              </p>
            </div>

            <ul className="mt-10 flex list-none flex-col gap-4 p-0">
              {jobs.map((job) => (
                <li key={job.slug}>
                  <a
                    href={`/careers/${job.slug}`}
                    className="surface-card block p-6 no-underline transition-colors hover:border-border-strong sm:p-8"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                      {job.department}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
                      {job.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
                      {job.summary}
                    </p>
                    <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
                      <div>
                        <dt className="sr-only">Location</dt>
                        <dd>{job.location}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Arrangement</dt>
                        <dd>{job.arrangement}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Type</dt>
                        <dd>{job.type}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Experience</dt>
                        <dd>{job.experience}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Pay</dt>
                        <dd>{job.compensation}</dd>
                      </div>
                    </dl>
                    <p className="mt-5 text-sm font-medium text-ink">
                      View role
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
