import { site } from "@/content/site";

export function About() {
  return (
    <section
      id="about"
      className="section-pad border-b border-border bg-surface"
      aria-labelledby="about-heading"
    >
      <div className="site-shell grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
        <div>
          <p className="eyebrow mb-4">{site.about.eyebrow}</p>
          <h2
            id="about-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {site.about.title}
          </h2>
        </div>

        <div className="space-y-5 text-base leading-8 text-muted sm:text-lg">
          {site.about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                Location
              </dt>
              <dd className="mt-2 text-ink">{site.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                Legal entity
              </dt>
              <dd className="mt-2 text-ink">
                {site.legalName} · Est. {site.foundedYear}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
