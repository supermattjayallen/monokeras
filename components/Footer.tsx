import { hasLegalLinks, site } from "@/content/site";
import { Wordmark } from "@/components/Wordmark";

export function Footer() {
  const legal = hasLegalLinks();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="site-shell flex flex-col gap-8 py-10 sm:py-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              {site.footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {site.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-ink-soft no-underline hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.legalName}
            <span aria-hidden="true"> · </span>
            {site.locationShort}
          </p>

          {legal ? (
            <nav aria-label="Legal" className="flex gap-4">
              {site.legal.privacyUrl ? (
                <a
                  href={site.legal.privacyUrl}
                  className="text-ink-soft no-underline hover:text-ink"
                >
                  Privacy
                </a>
              ) : null}
              {site.legal.termsUrl ? (
                <a
                  href={site.legal.termsUrl}
                  className="text-ink-soft no-underline hover:text-ink"
                >
                  Terms
                </a>
              ) : null}
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
