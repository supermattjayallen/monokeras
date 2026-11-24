"use client";

import { useEffect, useId, useState } from "react";
import { site } from "@/content/site";
import { Wordmark } from "@/components/Wordmark";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-[color-mix(in_srgb,var(--background)_86%,white)] backdrop-blur-md">
      <div className="site-shell flex h-[var(--header-height)] items-center justify-between gap-4">
        <Wordmark />

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {site.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft no-underline transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <a href={site.cta.primary.href} className="btn btn-primary">
              {site.cta.primary.label}
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-4 bg-current transition-transform ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-0.5 w-4 bg-current transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] block h-0.5 w-4 bg-current transition-transform ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={`border-t border-border bg-background lg:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav
          className="site-shell flex flex-col gap-1 py-4"
          aria-label="Mobile"
        >
          {site.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-ink no-underline hover:bg-surface-muted"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.cta.primary.href}
            className="btn btn-primary mt-2 w-full"
            onClick={closeMenu}
          >
            {site.cta.primary.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
