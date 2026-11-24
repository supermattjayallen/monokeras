import { site } from "@/content/site";

export function WhyMonokeras() {
  return (
    <section
      id="why"
      className="section-pad border-b border-border"
      aria-labelledby="why-heading"
    >
      <div className="site-shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="max-w-md">
          <p className="eyebrow mb-4">{site.why.eyebrow}</p>
          <h2
            id="why-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {site.why.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            {site.why.supporting}
          </p>
        </div>

        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
          {site.why.items.map((item) => (
            <li
              key={item.title}
              className="rounded-[var(--radius)] border border-border bg-surface p-5"
            >
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.95rem] leading-7 text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
