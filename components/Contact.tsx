import {
  hasConfiguredContact,
  hasSocialLinks,
  site,
} from "@/content/site";

export function Contact() {
  const configured = hasConfiguredContact();
  const social = hasSocialLinks();

  return (
    <section
      id="contact"
      className="section-pad"
      aria-labelledby="contact-heading"
    >
      <div className="site-shell">
        <div className="surface-card overflow-hidden">
          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="border-b border-border p-8 sm:p-10 lg:border-b-0 lg:border-r">
              <p className="eyebrow mb-4">{site.contactSection.eyebrow}</p>
              <h2
                id="contact-heading"
                className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
              >
                {site.contactSection.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg">
                {site.contactSection.supporting}
              </p>
            </div>

            <div className="bg-surface-muted/60 p-8 sm:p-10">
              {configured ? (
                <ul className="m-0 flex list-none flex-col gap-4 p-0">
                  {site.contact.email ? (
                    <li>
                      <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                        Email
                      </p>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="mt-2 inline-block text-lg font-medium text-ink"
                      >
                        {site.contact.email}
                      </a>
                    </li>
                  ) : null}
                  {site.contact.phone ? (
                    <li>
                      <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                        Phone
                      </p>
                      <a
                        href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                        className="mt-2 inline-block text-lg font-medium text-ink"
                      >
                        {site.contact.phone}
                      </a>
                    </li>
                  ) : null}
                  {site.contact.bookingUrl ? (
                    <li>
                      <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                        Booking
                      </p>
                      <a
                        href={site.contact.bookingUrl}
                        className="btn btn-primary mt-3"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Schedule a conversation
                      </a>
                    </li>
                  ) : null}
                </ul>
              ) : (
                <div className="rounded-[var(--radius)] border border-dashed border-border-strong bg-surface p-5">
                  <p className="text-sm leading-6 text-muted">
                    {site.contactSection.unconfiguredNote}
                  </p>
                </div>
              )}

              {social ? (
                <ul className="mt-8 flex list-none flex-wrap gap-3 p-0">
                  {site.social.linkedin ? (
                    <li>
                      <a
                        href={site.social.linkedin}
                        className="btn btn-secondary"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        LinkedIn
                      </a>
                    </li>
                  ) : null}
                  {site.social.github ? (
                    <li>
                      <a
                        href={site.social.github}
                        className="btn btn-secondary"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        GitHub
                      </a>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
