import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero } from "@/components/sections";
import { ArrowLink } from "@/components/ui";
import { team } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the people behind Growfore — strategists, engineers and SEO specialists in Pokhara, Nepal.",
  alternates: { canonical: "/our-team/" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero eyebrow="Our team" title="Meet the team." lede="Creative minds behind amazing experiences — the people who'll actually build, rank and run your work." />
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <ul className="ledger grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name} className="bg-card p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-paper">
                  {m.photo && (
                    <Image src={m.photo} alt={m.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover grayscale-[35%] transition duration-500 hover:grayscale-0" />
                  )}
                </div>
                <div className="px-1 pt-4 pb-2">
                  <h2 className="text-base text-ink">{m.name}</h2>
                  <p className="mt-0.5 text-[0.875rem] text-muted">{m.role}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="font-serif text-h3 text-ink">Want to work with us?</p>
            <ArrowLink href="/careers/">See careers at Growfore</ArrowLink>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
