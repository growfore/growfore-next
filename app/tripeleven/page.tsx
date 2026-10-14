import type { Metadata } from "next";
import { CtaBand } from "@/components/sections";
import { EditorShot, SiteCard, TripElevenWordmark } from "@/components/tripeleven";
import { HeroGlow } from "@/components/hero-glow";
import { Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { ArrowLink, ButtonLink, SectionHead, Tag } from "@/components/ui";
import { tripeleven as t11 } from "@/lib/products";
import { site } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "TripEleven — Website & Booking Platform for Trekking and Tour Operators",
  description: `${t11.summary} Built by Growfore in Pokhara, live on ${t11.sites.length} agency websites.`,
  alternates: { canonical: "/tripeleven/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: t11.name,
  url: t11.url,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: t11.summary,
  offers: { "@type": "Offer", url: t11.pricing, description: "7-day free trial" },
  publisher: { "@type": "Organization", name: site.name, url: site.url },
};

export default function TripElevenPage() {
  return (
    <>
      {/* hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <HeroGlow compact className="-z-10" />
        <div className="container-x relative grid gap-14 pt-16 pb-20 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 lg:pt-24 lg:pb-28">
          <div>
            <Reveal y={12}>
              <TripElevenWordmark className="h-6" />
            </Reveal>
            <RevealText as="h1" onLoad text="More trips sold. Less admin." className="mt-8 font-serif text-h1 text-balance text-ink" />
            <Reveal delay={0.3}>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-muted">{t11.summary}</p>
            </Reveal>
            <Reveal delay={0.45} className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={t11.signup} target="_blank" rel="noopener noreferrer">
                Start 7-day free trial
              </ButtonLink>
              <ButtonLink href={t11.url} variant="outline" target="_blank" rel="noopener noreferrer">
                Visit tripeleven.com
              </ButtonLink>
            </Reveal>
            <p className="mt-6 text-[0.8125rem] text-muted">Built for tour & trekking operators · Live on {t11.sites.length} agency websites</p>
          </div>
          <EditorShot priority />
        </div>
      </section>

      {/* pillars */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHead
            title="One workspace for your whole travel business."
            lede="Build your catalog, publish your website and take bookings — without stitching tools together."
          />
          <Stagger className="ledger mt-14 rounded-md sm:grid-cols-2 lg:grid-cols-4">
            {t11.pillars.map((p, i) => (
              <StaggerItem key={p.title} className="flex min-h-56 flex-col bg-card p-6 lg:p-7">
                <span className="text-[0.8125rem] text-faint tabular-nums">0{i + 1}</span>
                <h3 className="mt-10 text-[1.125rem] leading-snug tracking-[-0.01em] text-ink">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* trip builder */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <RevealText text="Built for real operators, not generic listings." className="font-serif text-h2 text-balance text-ink" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              A structured trip builder with everything a trekking or adventure operator actually needs — and AI that drafts
              day-by-day itineraries for your team to finish.
            </p>
            <ul className="mt-8 flex flex-wrap gap-1.5">
              {t11.builder.map((b) => (
                <li key={b}>
                  <Tag className="px-2.5 py-1.5 text-[0.8125rem]">{b}</Tag>
                </li>
              ))}
            </ul>
          </div>
          <Stagger as="ul" className="border-t border-line" stagger={0.06}>
            {t11.workspace.map((f, i) => (
              <StaggerItem as="li" key={f.title} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[2.5rem_14rem_1fr] sm:gap-6">
                <span className="hidden text-[0.8125rem] text-faint tabular-nums sm:block">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-base text-ink">{f.title}</h3>
                <p className="leading-relaxed text-muted">{f.body}</p>
              </StaggerItem>
            ))}
            <StaggerItem as="li" className="flex flex-wrap items-center gap-2 py-5 text-[0.875rem] text-muted">
              Plus: {t11.extras.join(" · ")}
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* live sites */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              title="Made for tour operators like you."
              lede="Real websites, run today by trekking and tour agencies on TripEleven."
            />
            <ArrowLink href={t11.url} target="_blank" rel="noopener noreferrer">
              More on tripeleven.com
            </ArrowLink>
          </div>
          <Stagger className="ledger mt-12 rounded-md sm:grid-cols-2 lg:grid-cols-3">
            {t11.sites.map((s) => (
              <StaggerItem key={s.shot}>
                <SiteCard site={s} />
              </StaggerItem>
            ))}
            <StaggerItem className="flex lg:col-span-2">
              <a
                href={t11.signup}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-64 w-full flex-col justify-between bg-brand-soft p-6 text-ink lg:p-8"
              >
                <p className="max-w-md font-serif text-h3 text-balance">Your agency could be next. Launch on your own domain.</p>
                <span className="inline-flex items-center gap-1.5 text-[0.9375rem] text-ink/70 group-hover:text-ink">
                  Start a 7-day free trial <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
                </span>
              </a>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* pricing pointer */}
      <section className="border-t border-line py-20">
        <div className="container-x">
          <div className="ledger">
            <div className="flex flex-col gap-6 bg-card p-6 md:flex-row md:items-center md:justify-between lg:p-8">
              <div>
                <h2 className="font-serif text-h3 text-ink">Simple plans, 7 days free.</h2>
                <p className="mt-2 max-w-xl text-muted">
                  Launch and Business plans with monthly or yearly billing, plus Enterprise with white-label and dedicated onboarding.
                </p>
              </div>
              <ButtonLink href={t11.pricing} variant="primary" target="_blank" rel="noopener noreferrer">
                See pricing
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        lines={["Run a trekking agency?", "Want a site that sells", "while you're on the trail?"]}
        lede="Start a free trial yourself, or talk to our team about getting TripEleven set up for your agency."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
