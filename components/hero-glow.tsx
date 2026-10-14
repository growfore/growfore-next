"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cx } from "@/components/ui";

/**
 * Light hero backdrop (after elementor.com/mcp): large blurred colour fields on warm off-white,
 * slowly drifting, with hairline concentric rings. Fields drift apart and fade as the hero scrolls away.
 * `compact` is the quieter version for inner-page heroes.
 */
export function HeroGlow({ compact, className }: { compact?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const sink = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <div ref={ref} aria-hidden className={cx("pointer-events-none absolute inset-0 overflow-hidden bg-[#f7f5f2]", className)}>
      <motion.div style={{ opacity: fade }} className="absolute inset-0">
        {/* centre: Growfore sky blue */}
        <motion.div style={{ y: sink }} className={cx("glow-blob animate-[drift-a_22s_ease-in-out_infinite] bg-[#1ab2f5]", compact ? "top-[-30%] left-[45%] size-[38rem] opacity-25" : "top-[18%] left-[50%] size-[46rem] -translate-x-1/2 opacity-45")} />
        {/* left: periwinkle */}
        <motion.div style={{ y: lift }} className={cx("glow-blob animate-[drift-b_26s_ease-in-out_infinite] bg-[#8e9bff]", compact ? "top-[-20%] left-[-8%] size-[30rem] opacity-25" : "top-[-6%] left-[2%] size-[36rem] opacity-40")} />
        {/* top right: fresh lime, the warm counterpoint */}
        <motion.div style={{ y: lift }} className={cx("glow-blob animate-[drift-c_30s_ease-in-out_infinite] bg-[#d4f27a]", compact ? "top-[-40%] right-[-6%] size-[28rem] opacity-35" : "top-[-10%] right-[4%] size-[30rem] opacity-55")} />
        {/* bottom: pale aqua so the fields fade into the page */}
        {!compact && <motion.div style={{ y: sink }} className="glow-blob animate-[drift-b_28s_ease-in-out_infinite_reverse] bottom-[-25%] left-[22%] size-[34rem] bg-[#7fe0e6] opacity-30" />}
      </motion.div>

      {!compact && (
        <motion.svg
          style={{ scale: ringScale }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          viewBox="0 0 1000 1000"
          className="absolute top-1/2 left-1/2 h-[150%] max-h-[72rem] w-auto -translate-x-1/2 -translate-y-1/2"
          fill="none"
        >
          {[210, 300, 390, 480].map((r, i) => (
            <circle key={r} cx="500" cy="500" r={r} stroke="#1ab2f5" strokeOpacity={0.32 - i * 0.06} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          ))}
        </motion.svg>
      )}

      {/* soft fade into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
