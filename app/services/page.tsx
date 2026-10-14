import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/sections";
import { ArrowLink, ButtonLink } from "@/components/ui";
import { getService, HUB_META, HUBS, hubChildren } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services — Web, SEO & Ads",
  description: "Website design and development, SEO and ads management from one team in Pokhara, Nepal. Explore all 20 Growfore services.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Growth-focused solutions, made for you."
        lede="A website that shows off your brand, SEO that gets you ranked, or ads that drive leads and clicks — everything you need to grow, under one roof."
      >
        <ButtonLink href="/contact-us/">Talk to a strategist</ButtonLink>
      </PageHero>

      {HUBS.map((hub, i) => {
        const s = getService(hub)!;
        return (
          <section key={hub} className={i ? "border-t border-line py-20 lg:py-28" : "py-20 lg:py-28"}>
            <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
              <div>
                <p className="text-[0.8125rem] text-faint tabular-nums">0{i + 1}</p>
                <h2 className="mt-3 font-serif text-h2 text-ink">{HUB_META[hub].label}</h2>
                <p className="mt-5 max-w-md leading-relaxed text-muted">{s.sectionBody || HUB_META[hub].blurb}</p>
                <ArrowLink href={`/${hub}/`} className="mt-8">
                  Overview of {HUB_META[hub].label}
                </ArrowLink>
              </div>
              <ul className="ledger sm:grid-cols-2">
                {hubChildren(hub).map((c) => (
                  <li key={c.slug} className="flex">
                    <Link href={`/${c.slug}/`} className="group flex w-full flex-col bg-card p-5 transition-colors hover:bg-[#fdfdfc] lg:p-6">
                      <span className="flex items-center justify-between gap-4 text-[1.125rem] text-ink">
                        {c.title}
                        <ArrowRight aria-hidden className="size-4 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" strokeWidth={1.75} />
                      </span>
                      <span className="mt-2 line-clamp-2 text-[0.875rem] leading-relaxed text-muted">{c.headline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
      <CtaBand />
    </>
  );
}
