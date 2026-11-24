import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getJob, jobs } from "@/content/jobs";
import { site } from "@/content/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return {
    title: job.title,
    description: job.summary,
    alternates: {
      canonical: `/careers/${job.slug}`,
    },
  };
}

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

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
        <article className="section-pad">
          <div className="site-shell">
            <p className="mb-6">
              <a
                href="/careers"
                className="text-sm font-medium text-ink-soft no-underline hover:text-ink"
              >
                All opportunities
              </a>
            </p>
            <p className="eyebrow mb-4">{job.department}</p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
              {job.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted sm:text-lg">
              {job.summary}
            </p>

            <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Location", job.location],
                ["Work arrangement", job.arrangement],
                ["Employment type", job.type],
                ["Experience", job.experience],
                ["Compensation", job.compensation],
                job.extraPay ? ["Additional pay", job.extraPay] : null,
              ]
                .filter((item): item is [string, string] => item !== null)
                .map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                      {label}
                    </dt>
                    <dd className="mt-2 text-ink">{value}</dd>
                  </div>
                ))}
            </dl>

            <div className="mt-10 max-w-3xl space-y-10">
              {job.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-base leading-7 text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-muted">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="surface-card mt-12 max-w-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink">
                Apply for this role
              </h2>
              <p className="mt-3 text-base leading-7 text-muted">
                {site.careers.body[1]} Name the role “{job.title}” so it is
                clear which opening you mean.
              </p>
              <a href="/#contact" className="btn btn-primary mt-6">
                Start a conversation
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
