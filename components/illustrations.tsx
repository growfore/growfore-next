"use client";

// Small product-style illustrations for the capability grid. Pure markup, no images.
// They depict what each service works on — not client results — so no numbers are claimed as outcomes.
// Each one animates in once when scrolled into view (rings draw, pins drop, chips pop, bars grow).
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { cx } from "@/components/ui";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: false, amount: 0.5 } as const; // replay on every pass

export function ScoreRings() {
  const scores = [
    { label: "Performance", v: 98 },
    { label: "Accessibility", v: 96 },
    { label: "Best practices", v: 100 },
    { label: "SEO", v: 100 },
  ];
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-md bg-card shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.18)] ring-1 ring-line">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-line" />
        ))}
        <span className="ml-3 flex-1 truncate rounded bg-paper px-2 py-1 text-[0.6875rem] text-faint">yourbusiness.com.np</span>
      </div>
      <div className="grid grid-cols-4 gap-2 px-4 py-6">
        {scores.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center gap-2 text-center">
            <svg viewBox="0 0 36 36" className="size-12 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-brand-soft)" strokeWidth="3" />
              <motion.circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 97.4" }}
                whileInView={{ strokeDasharray: `${(s.v / 100) * 97.4} 97.4` }}
                viewport={viewport}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.12, ease: EASE }}
              />
              <text x="18" y="18" dy="0.35em" textAnchor="middle" className="fill-ink text-[10px] font-medium" transform="rotate(90 18 18)">
                {s.v}
              </text>
            </svg>
            <span className="text-[0.625rem] leading-tight text-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LocalPack() {
  const rows = [
    { name: "Your Business", meta: "Web design · New Rd, Pokhara", you: true },
    { name: "Competitor A", meta: "Web design · Lakeside" },
    { name: "Competitor B", meta: "Marketing agency · Chipledhunga" },
  ];
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-md bg-card shadow-[0_12px_32px_-12px_rgba(0,0,0,0.18)] ring-1 ring-line">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2.5 text-[0.75rem] text-muted">
        <Search className="size-3.5" strokeWidth={1.75} aria-hidden />
        web design near me
      </div>
      <div className="relative h-20 bg-[#eaf1f5]">
        {[
          ["30%", "40%", true],
          ["62%", "55%", false],
          ["78%", "28%", false],
        ].map(([l, t, you], i) => (
          <motion.span
            key={i}
            className={cx("absolute -mt-2.5 -ml-2.5 grid size-5 place-items-center rounded-full text-[0.5625rem] font-semibold text-white ring-2 ring-white", you ? "z-10 bg-brand" : "bg-faint")}
            style={{ left: l as string, top: t as string }}
            initial={{ y: -14, opacity: 0, scale: 0.6 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.3 + (you ? 0.45 : i * 0.12) }}
          >
            {i + 1}
          </motion.span>
        ))}
      </div>
      <ul>
        {rows.map((r, i) => (
          <motion.li
            key={r.name}
            className={cx("flex items-center gap-3 border-t border-line px-3 py-2.5", r.you && "bg-brand-soft/60")}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: EASE }}
          >
            <span className={cx("grid size-5 place-items-center rounded-full text-[0.625rem] font-semibold", r.you ? "bg-brand text-white" : "bg-paper text-muted")}>{i + 1}</span>
            <span className="min-w-0 flex-1">
              <span className={cx("block truncate text-[0.8125rem]", r.you ? "font-medium text-ink" : "text-muted")}>{r.name}</span>
              <span className="block truncate text-[0.6875rem] text-faint">{r.meta}</span>
            </span>
            {r.you && <span className="rounded bg-brand px-1.5 py-0.5 text-[0.625rem] font-medium text-white">Top 3</span>}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function KeywordCloud() {
  const kws: [string, "high" | "mid" | "low"][] = [
    ["website design pokhara", "high"],
    ["seo agency nepal", "high"],
    ["ecommerce website cost", "mid"],
    ["local seo near me", "high"],
    ["wordpress developer", "mid"],
    ["how to rank on google maps", "low"],
    ["web hosting in nepal", "mid"],
    ["google ads management", "high"],
    ["domain registration .np", "low"],
    ["best digital marketing agency", "mid"],
    ["mobile app development", "mid"],
  ];
  const tone = {
    high: "bg-brand text-white ring-brand",
    mid: "bg-card text-ink ring-line",
    low: "bg-paper text-faint ring-line",
  };
  return (
    <div className="flex max-w-md flex-wrap justify-center gap-2">
      {kws.map(([k, t], i) => (
        <motion.span
          key={k}
          className={cx("rounded-md px-2.5 py-1.5 text-[0.75rem] ring-1 ring-inset", tone[t])}
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: EASE }}
        >
          {k}
        </motion.span>
      ))}
      <div className="mt-3 flex w-full justify-center gap-4 text-[0.6875rem] text-faint">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-brand" /> High intent
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-card ring-1 ring-line" /> Supporting
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-paper ring-1 ring-line" /> Informational
        </span>
      </div>
    </div>
  );
}

export function CampaignBoard() {
  const bars = [22, 30, 26, 38, 35, 46, 44, 58, 54, 66, 72, 80];
  const camps = ["Search", "Shopping", "Video", "Local Services"];
  return (
    <div className="w-full max-w-sm rounded-md bg-card p-4 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.18)] ring-1 ring-line">
      <div className="flex items-baseline justify-between">
        <span className="text-[0.75rem] text-muted">Conversions · tracked weekly</span>
        <span className="text-[0.6875rem] text-faint">12 wks</span>
      </div>
      <div className="mt-4 flex h-24 items-end gap-1.5">
        {bars.map((b, i) => (
          <motion.span
            key={i}
            className={cx("flex-1 rounded-t-[2px]", i === bars.length - 1 ? "bg-brand" : "bg-brand/25")}
            initial={{ height: "0%" }}
            whileInView={{ height: `${b}%` }}
            viewport={viewport}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.05, ease: EASE }}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3">
        {camps.map((c) => (
          <span key={c} className="flex items-center gap-1.5 rounded bg-paper px-2 py-1 text-[0.6875rem] text-muted ring-1 ring-line ring-inset">
            <span className="size-1.5 rounded-full bg-[#16a34a]" /> {c}
          </span>
        ))}
      </div>
    </div>
  );
}
