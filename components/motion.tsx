"use client";

// Scroll + entrance animation primitives. Animations replay each time an element re-enters the
// viewport, scrolling up or down. Everything respects the visitor's reduce-motion setting
// via <MotionProvider> (reducedMotion="user"): transforms are skipped, opacity still fades.

import {
  animate,
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const; // easeOutQuint-ish: fast start, long soft settle

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade + lift + un-blur when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "p" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
};

/** Container whose <StaggerItem> children reveal one after another. Keeps the caller's grid classes. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={staggerParent} custom={stagger} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={staggerChild}>
      {children}
    </Tag>
  );
}

/**
 * Headline that rises in word by word from behind a mask. Screen readers get the plain sentence.
 * `lines` lets a heading keep deliberate line breaks.
 */
export function RevealText({
  text,
  as = "h2",
  className,
  delay = 0,
  onLoad = false,
}: {
  text: string | string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** animate on mount instead of on scroll (for above-the-fold heroes) */
  onLoad?: boolean;
}) {
  const lines = Array.isArray(text) ? text : [text];
  let i = 0;
  const trigger = onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: false, amount: 0.5 } };
  return createElement(
    as,
    { className, "aria-label": lines.join(" ") },
    <motion.span
      aria-hidden
      className="block"
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word) => {
            const k = i++;
            return (
              <span key={k} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: { y: "105%", opacity: 0 },
                    show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE } },
                  }}
                >
                  {word}
                  {" "}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </motion.span>,
  );
}

/** Number that counts up each time it scrolls into view. Keeps decimals of the target. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduce = useReducedMotion();
  const target = parseFloat(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reduce || Number.isNaN(target)) return;
    if (!inView) {
      // reset off-screen so the count replays on the next pass (scrolling up or down)
      const id = requestAnimationFrame(() => setShown((0).toFixed(decimals)));
      return () => cancelAnimationFrame(id);
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setShown(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, decimals]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}

/** Image/frame reveal: un-clips from the edges while settling from a slight zoom. */
export function MediaReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(8% 8% 8% 8% round 12px)", scale: 1.04, opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 6px)", scale: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Moves its content against the scroll for depth. `speed` is the travel in px across the viewport. */
export function Parallax({ children, speed = 60, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Vertical rule that draws downward as it enters view (timelines). */
export function GrowLine({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={className}
      style={{ originY: 0 }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 1.4, ease: EASE }}
    />
  );
}
