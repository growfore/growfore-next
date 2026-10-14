import type { ReactNode } from "react";
import { cx } from "@/components/ui";

/**
 * CSS-only infinite marquee. Children are rendered twice; the second copy is hidden from AT.
 * With "reduce motion" on (iOS Reduce Motion, Android "Remove animations") nothing moves on its own:
 * the strip becomes a swipeable row instead, so every item is still reachable.
 */
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
    <div
      className={cx(
        "mask-fade-x group overflow-hidden",
        "motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto motion-reduce:overscroll-x-contain motion-reduce:[mask-image:none] motion-reduce:[scrollbar-width:none]",
        className,
      )}
    >
      <div
        className={cx("animate-marquee flex w-max", pauseOnHover && "group-hover:[animation-play-state:paused]")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 motion-reduce:[&>*]:snap-start">{children}</div>
        <div className="flex shrink-0 motion-reduce:hidden" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
