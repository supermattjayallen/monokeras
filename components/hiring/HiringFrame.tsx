import type { ReactNode } from "react";
import { Wordmark } from "@/components/Wordmark";
import { site } from "@/content/site";

export function HiringFrame({
  children,
  account,
}: {
  children: ReactNode;
  account?: ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-border/80 bg-[color-mix(in_srgb,var(--background)_86%,white)] backdrop-blur-md">
        <div className="site-shell flex h-[var(--header-height)] items-center justify-between gap-4">
          <Wordmark />
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
              Hiring
            </p>
            {account}
          </div>
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border bg-surface">
        <div className="site-shell py-6 text-sm text-muted">
          <p>
            © {site.copyrightYear} {site.legalName}
            <span aria-hidden="true"> · </span>
            {site.locationShort}
          </p>
        </div>
      </footer>
    </>
  );
}
