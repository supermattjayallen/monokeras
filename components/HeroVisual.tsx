export function HeroVisual() {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[1rem] border border-border bg-surface shadow-soft tech-grid"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(15,107,92,0.10),transparent_42%),radial-gradient(circle_at_78%_72%,rgba(12,18,34,0.06),transparent_40%)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 640 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <line
          className="hero-visual-line"
          x1="96"
          y1="120"
          x2="250"
          y2="210"
          stroke="#9AA3B2"
          strokeWidth="1.25"
        />
        <line
          className="hero-visual-line"
          x1="250"
          y1="210"
          x2="420"
          y2="150"
          stroke="#9AA3B2"
          strokeWidth="1.25"
          style={{ animationDelay: "120ms" }}
        />
        <line
          className="hero-visual-line"
          x1="250"
          y1="210"
          x2="320"
          y2="330"
          stroke="#9AA3B2"
          strokeWidth="1.25"
          style={{ animationDelay: "220ms" }}
        />
        <line
          className="hero-visual-line"
          x1="420"
          y1="150"
          x2="530"
          y2="260"
          stroke="#9AA3B2"
          strokeWidth="1.25"
          style={{ animationDelay: "320ms" }}
        />
        <line
          className="hero-visual-line"
          x1="320"
          y1="330"
          x2="530"
          y2="260"
          stroke="#9AA3B2"
          strokeWidth="1.25"
          style={{ animationDelay: "420ms" }}
        />

        <circle className="hero-visual-node" cx="96" cy="120" r="7" fill="#0F6B5C" />
        <circle
          className="hero-visual-node"
          cx="250"
          cy="210"
          r="10"
          fill="#0C1222"
          style={{ animationDelay: "0.4s" }}
        />
        <circle
          className="hero-visual-node"
          cx="420"
          cy="150"
          r="7"
          fill="#0F6B5C"
          style={{ animationDelay: "0.8s" }}
        />
        <circle
          className="hero-visual-node"
          cx="320"
          cy="330"
          r="8"
          fill="#3A4254"
          style={{ animationDelay: "1.2s" }}
        />
        <circle
          className="hero-visual-node"
          cx="530"
          cy="260"
          r="9"
          fill="#0C1222"
          style={{ animationDelay: "1.6s" }}
        />

        <rect
          x="72"
          y="88"
          width="88"
          height="28"
          rx="6"
          fill="white"
          stroke="#D9DEE7"
        />
        <text
          x="84"
          y="106"
          fill="#5C6578"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
        >
          assess
        </text>

        <rect
          x="486"
          y="292"
          width="96"
          height="28"
          rx="6"
          fill="white"
          stroke="#D9DEE7"
        />
        <text
          x="498"
          y="310"
          fill="#5C6578"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
        >
          evolve
        </text>
      </svg>

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-white/90 px-3 py-2.5 backdrop-blur-sm">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">
          Systems · Cloud · Security · AI
        </p>
        <p className="text-xs font-medium text-ink-soft">
          Infrastructure-minded delivery
        </p>
      </div>
    </div>
  );
}
