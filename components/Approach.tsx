import { site } from "@/content/site";

export function Approach() {
  return (
    <section
      id="approach"
      className="section-pad border-b border-border bg-surface"
      aria-labelledby="approach-heading"
    >
      <div className="site-shell">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">{site.approach.eyebrow}</p>
          <h2
            id="approach-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {site.approach.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            {site.approach.supporting}
          </p>
        </div>

        <ol className="mt-12 grid list-none gap-4 p-0 md:grid-cols-3">
          {site.approach.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-[var(--radius)] border border-border bg-background p-6"
            >
              {index < site.approach.steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute right-[-0.55rem] top-10 hidden h-px w-4 bg-border-strong md:block"
                />
              ) : null}
              <span className="font-mono text-sm text-accent">{step.step}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.975rem] leading-7 text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
