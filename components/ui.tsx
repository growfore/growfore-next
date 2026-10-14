import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

type Variant = "light" | "dark" | "ghost-dark" | "ghost-light";

const variants: Record<Variant, string> = {
  // white pill on dark surfaces
  light: "bg-white text-ink hover:bg-white/85",
  // ink pill on paper surfaces
  dark: "bg-ink text-white hover:bg-ink-3",
  "ghost-dark": "bg-white/8 text-white ring-1 ring-inset ring-white/14 hover:bg-white/14",
  "ghost-light": "bg-transparent text-ink ring-1 ring-inset ring-line hover:bg-black/4",
};

export function ButtonLink({
  variant = "light",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: "sm" | "md" }) {
  return (
    <Link
      {...props}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200",
        size === "sm" ? "h-9 px-4 text-[0.875rem]" : "h-11 px-5 text-[0.9375rem]",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Underlined text link with a small circled arrow, as used for "Explore …" links. */
export function ArrowLink({
  dark,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { dark?: boolean }) {
  return (
    <Link
      {...props}
      className={cx(
        "group inline-flex items-center gap-2 text-[0.9375rem] font-medium",
        dark ? "text-white" : "text-ink",
        className,
      )}
    >
      <span
        className={cx(
          "border-b pb-0.5 transition-colors",
          dark ? "border-white/30 group-hover:border-white" : "border-ink/25 group-hover:border-ink",
        )}
      >
        {children}
      </span>
      <ArrowCircle dark={dark} />
    </Link>
  );
}

export function ArrowCircle({ dark }: { dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={cx(
        "grid size-5 place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
        dark ? "bg-white/12 text-white" : "bg-black/6 text-ink",
      )}
    >
      <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
      </svg>
    </span>
  );
}

export function Tag({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md px-2 py-1 text-[0.75rem] leading-none",
        dark ? "bg-white/7 text-ink-muted ring-1 ring-inset ring-white/8" : "bg-paper text-muted ring-1 ring-inset ring-line",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cx(
        "text-[0.8125rem] font-medium tracking-[0.01em]",
        dark ? "text-ink-muted" : "text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Section heading block: serif title + optional lede. */
export function SectionHead({
  title,
  lede,
  dark,
  center,
  className,
  as: As = "h2",
}: {
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  center?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cx("max-w-3xl", center && "mx-auto text-center", className)}>
      <As className={cx("font-serif text-h2 text-balance", dark ? "text-ink-text" : "text-ink")}>{title}</As>
      {lede && (
        <p
          className={cx(
            "mt-6 max-w-xl text-base leading-relaxed text-pretty",
            center && "mx-auto",
            dark ? "text-ink-muted" : "text-muted",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export { cx };
