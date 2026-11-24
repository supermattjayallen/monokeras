import Link from "next/link";

type WordmarkProps = {
  className?: string;
  href?: string;
};

export function Wordmark({ className = "", href = "/" }: WordmarkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 no-underline ${className}`}
      aria-label="Monokeras home"
    >
      <span
        aria-hidden="true"
        className="relative flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 14.5V3.5L9 10.25L15 3.5V14.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink"
          />
          <path
            d="M9 3.25V6.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="text-accent"
          />
        </svg>
      </span>
      <span className="text-[1.05rem] font-semibold tracking-[-0.03em] text-ink">
        Monokeras
      </span>
    </Link>
  );
}
