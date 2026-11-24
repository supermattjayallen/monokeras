import { site } from "@/content/site";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="section-pad border-b border-border"
      aria-labelledby="capabilities-heading"
    >
      <div className="site-shell">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">{site.capabilities.eyebrow}</p>
          <h2
            id="capabilities-heading"
            className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {site.capabilities.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            {site.capabilities.supporting}
          </p>
        </div>

        <ul className="mt-12 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
          {site.capabilities.items.map((item, index) => (
            <li
              key={item.id}
              className={`surface-card flex flex-col p-6 ${
                index === site.capabilities.items.length - 1
                  ? "sm:col-span-2 xl:col-span-1"
                  : ""
              }`}
            >
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.975rem] leading-7 text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
