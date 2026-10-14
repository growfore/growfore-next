import type { ReactNode } from "react";
import { cx } from "@/components/ui";

/** CSS-only infinite marquee. Children are rendered twice; the second copy is hidden from AT. */
export function Marquee({
  children,
  duration = 40,
  className,
  pauseOnHover,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cx("mask-fade-x group overflow-hidden", className)}>
      <div
        className={cx("animate-marquee flex w-max", pauseOnHover && "group-hover:[animation-play-state:paused]")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
