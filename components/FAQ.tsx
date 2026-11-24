import { site } from "@/content/site";

export function FAQ() {
  return (
    <section
      id="faq"
      className="section-pad border-b border-border"
      aria-labelledby="faq-heading"
    >
      <div className="site-shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="max-w-md">
          <p className="eyebrow mb-4">{site.faq.eyebrow}</p>
          <h2
            id="faq-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {site.faq.title}
          </h2>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {site.faq.items.map((item) => (
            <details
              key={item.question}
              className="group py-5 open:pb-6"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-lg font-semibold tracking-[-0.02em] text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-sm text-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[0.975rem] leading-7 text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
