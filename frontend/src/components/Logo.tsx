export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#C45B28" />
      <path
        d="M10 27 24 13l14 14"
        fill="none"
        stroke="#FAF7F2"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 26v9h5v-6h4v6h5v-9"
        fill="none"
        stroke="#FAF7F2"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" data-testid="logo-link" className="flex items-center gap-3">
      <LogoMark />
      <span className="leading-none">
        <span
          className={`block font-heading text-xl font-semibold tracking-tight ${
            dark ? "text-[#FAF7F2]" : "text-foreground"
          }`}
        >
          Haus Winter
        </span>
        <span
          className={`mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] ${
            dark ? "text-[#A8A29E]" : "text-muted-foreground"
          }`}
        >
          Kirchheim
        </span>
      </span>
    </a>
  );
}
