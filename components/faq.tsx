import type { ReactNode } from "react";
import { Mail, Phone, Plus } from "lucide-react";
import { Reveal } from "@/components/motion";
import { GoogleRating } from "@/components/sections";
import { cx, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

type Item = { q: string; a: string };

/**
 * FAQ list using native <details>; no JS, keyboard accessible, and emits FAQPage JSON-LD.
 * Items share a `name`, so opening one closes the others; the open/close height animation is
 * CSS-only (`.faq-item` in globals.css) and falls back to an instant toggle in older browsers.
 */
export function Faq({ items, className }: { items: Item[]; className?: string }) {
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
      {items.map((item, i) => (
        <details key={item.q} name="faq" open={i === 0} className="faq-item group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start gap-4 py-6 text-ink sm:gap-6 [&::-webkit-details-marker]:hidden">
            <span aria-hidden className="w-6 shrink-0 pt-0.5 text-[0.8125rem] text-faint tabular-nums transition-colors group-open:text-brand-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 text-[1.0625rem] leading-snug font-medium text-balance transition-colors group-hover:text-brand-ink group-open:text-ink">
              {item.q}
            </span>
            <span
              aria-hidden
              className="grid size-7 shrink-0 place-items-center rounded-full bg-[#ebe9e6] text-ink transition-[rotate,background-color,color] duration-300 group-hover:bg-[#e1dfdb] group-open:rotate-45 group-open:bg-ink group-open:text-white"
            >
              <Plus className="size-3.5" strokeWidth={2} />
            </span>
          </summary>
          <p className="max-w-2xl pb-7 pl-10 leading-relaxed sm:pr-11 text-pretty text-muted sm:pl-12">{item.a}</p>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </div>
  );
}

/** FAQ section: sticky heading + contact card on the left, accordion on the right. */
export function FaqSection({ items, lede, id, className }: { items: Item[]; lede?: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={cx("py-24 lg:py-32", className)}>
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead title="Frequently asked questions" lede={lede} />
          <ContactCard className="mt-10 hidden lg:block" />
        </div>
        <Reveal delay={0.1}>
          <Faq items={items} />
        </Reveal>
        {/* on small screens the card follows the questions instead of preceding them */}
        <ContactCard className="lg:hidden" />
      </div>
    </section>
  );
}

function ContactCard({ className }: { className?: string }) {
  return (
    <Reveal delay={0.2} className={cx("max-w-sm rounded-md bg-card p-6 ring-1 ring-line", className)}>
      <p className="text-[1.0625rem] font-medium text-ink">Still have a question?</p>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">Talk to a strategist directly.</p>
      <div className="mt-5 flex flex-col gap-2">
        <ContactLink href={site.phoneHref} icon={<Phone className="size-4" strokeWidth={1.75} />} label="Call us" value={site.phone} />
        <ContactLink href={`mailto:${site.email}`} icon={<Mail className="size-4" strokeWidth={1.75} />} label="Email us" value={site.email} />
      </div>
      <GoogleRating className="mt-5" />
    </Reveal>
  );
}

function ContactLink({ href, icon, label, value }: { href: string; icon: ReactNode; label: string; value: string }) {
  return (
    <a href={href} className="group flex items-center gap-3 rounded-md px-3 py-2.5 ring-1 ring-line transition-colors hover:bg-paper hover:ring-ink/20">
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-ink">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.75rem] text-faint">{label}</span>
        <span className="block truncate text-[0.9375rem] text-ink">{value}</span>
      </span>
    </a>
  );
}
