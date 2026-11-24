import { site } from "@/content/site";
import { HeroVisual } from "@/components/HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(243,245,247,0.2),transparent)]" />

      <div className="site-shell section-pad relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div className="fade-rise max-w-xl">
          <p className="eyebrow mb-5">IT consulting · {site.locationShort}</p>
          <h1 className="text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl lg:text-[3.35rem]">
            {site.hero.headline}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {site.hero.supporting}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={site.cta.primary.href} className="btn btn-primary">
              {site.cta.primary.label}
            </a>
            <a href={site.cta.secondary.href} className="btn btn-secondary">
              {site.cta.secondary.label}
            </a>
          </div>
        </div>

        <div className="fade-rise" style={{ animationDelay: "120ms" }}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
