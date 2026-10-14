import { cx } from "@/components/ui";
import { Plus } from "lucide-react";

/** FAQ list using native <details>; no JS, keyboard accessible, and emits FAQPage JSON-LD. */
export function Faq({ items, className }: { items: { q: string; a: string }[]; className?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <div className={cx("border-t border-line", className)}>
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden
              className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-[#ebe9e6] transition-transform duration-200 group-open:rotate-45"
            >
              <Plus className="size-3" strokeWidth={2} />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </div>
  );
}
