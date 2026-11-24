import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
          <div className="site-shell grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
            <div>
              <p className="eyebrow mb-4">{site.careers.eyebrow}</p>
              <h1
                id="careers-heading"
                className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
              >
                {site.careers.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
                {site.careers.supporting}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={site.cta.primary.href} className="btn btn-primary">
                  {site.cta.primary.label}
                </a>
                <a href={site.cta.secondary.href} className="btn btn-secondary">
                  {site.cta.secondary.label}
                </a>
              </div>
            </div>

            <div className="space-y-5 text-base leading-8 text-muted sm:text-lg">
              {site.careers.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                    Open roles
                  </dt>
                  <dd className="mt-2 text-ink">None posted</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                    Location
                  </dt>
                  <dd className="mt-2 text-ink">{site.location}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
