import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealText } from "@/components/motion";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

type Variant = "primary" | "outline";

// Flat buttons only: solid ink, or a 1px outline. No translucency, no gloss.
const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-[#333]",
  outline: "border border-ink/20 bg-transparent text-ink hover:border-ink/60",
};

export function ButtonLink({
  variant = "primary",
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
export function ArrowLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link {...props} className={cx("group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink", className)}>
      <span className="border-b border-ink/25 pb-0.5 transition-colors group-hover:border-ink">{children}</span>
      <ArrowCircle />
    </Link>
  );
}

export function ArrowCircle() {
  return (
    <span
      aria-hidden
      className="grid size-5 place-items-center rounded-full bg-[#ebe9e6] text-ink transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <ArrowUpRight className="size-3" strokeWidth={2} />
    </span>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx("inline-flex items-center rounded-md bg-paper px-2 py-1 text-[0.75rem] leading-none text-muted ring-1 ring-line ring-inset", className)}>
      {children}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("text-[0.8125rem] font-medium tracking-[0.01em] text-muted", className)}>{children}</p>;
}

/** Section heading block: serif title (revealed word by word) + optional lede. */
export function SectionHead({
  title,
  lede,
  center,
  className,
  as = "h2",
}: {
  title: string;
  lede?: ReactNode;
  center?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cx("max-w-3xl", center && "mx-auto text-center", className)}>
      <RevealText as={as} text={title} className="font-serif text-h2 text-balance text-ink" />
      {lede && (
        <Reveal delay={0.15}>
          <p className={cx("mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted", center && "mx-auto")}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

export { cx };
