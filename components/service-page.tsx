import Link from "next/link";
import { Faq } from "@/components/faq";
import { CtaBand, PageHero, ReviewsMarquee } from "@/components/sections";
import { ServiceIcon } from "@/components/service-icon";
import { Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { ArrowCircle, ButtonLink, Eyebrow, SectionHead } from "@/components/ui";
import { deliverableHref, getService, HUB_META, hubChildren, type Service } from "@/lib/content";
import { site } from "@/lib/site";
import { Check } from "lucide-react";

const ACRONYMS = /\b(seo|ui\/ux|ui|ux|cms|google|wordpress|nepal|pokhara|growfore)\b/gi;
const PROPER: Record<string, string> = { "ui/ux": "UI/UX", google: "Google", wordpress: "WordPress", nepal: "Nepal", pokhara: "Pokhara", growfore: "Growfore" };
const sentenceCase = (s = "") =>
  s === s.toUpperCase()
    ? (s.charAt(0) + s.slice(1).toLowerCase()).replace(ACRONYMS, (m) => PROPER[m.toLowerCase()] ?? m.toUpperCase())
    : s;
const firstPara = (s = "") => s.split(/\n\n+/)[0];
const norm = (s = "") => s.toLowerCase().replace(/[^a-z]/g, "").replace(/s/g, "");

export function ServicePage({ service }: { service: Service }) {
  const parent = service.parent ? getService(service.parent) : undefined;
  const hubSlug = (service.kind === "hub" ? service.slug : service.parent) as keyof typeof HUB_META;
  const siblings = hubChildren(hubSlug).filter((s) => s.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription || firstPara(service.intro),
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: "NP",
    url: `${site.url}/${service.slug}/`,
  };

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Services", href: "/services/" },
          ...(parent ? [{ label: HUB_META[hubSlug].label, href: `/${parent.slug}/` }] : []),
          { label: service.title, href: `/${service.slug}/` },
        ]}
        eyebrow={norm(service.eyebrow) === norm(service.headline) ? service.title : sentenceCase(service.eyebrow)}
        title={service.headline ?? service.title}
        lede={firstPara(service.intro)}
        aside={
          <div className="ledger rounded-md shadow-[0_24px_60px_-30px_rgba(22,22,22,0.25)]">
            <p className="bg-card px-5 py-3 text-[0.75rem] text-muted">What&apos;s included</p>
            {service.deliverables.map((d, i) => (
              <a key={d.id + d.title} href={`#${d.id}`} className="flex items-center gap-4 bg-card px-5 py-3.5 text-[0.9375rem] text-ink/85 transition-colors hover:bg-paper hover:text-ink">
                <span className="w-5 text-[0.75rem] text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <ServiceIcon name={d.icon} className="size-4 text-brand-ink" />
                {d.title}
              </a>
            ))}
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact-us/">Book a call</ButtonLink>
          <ButtonLink href="#deliverables" variant="outline">
            What&apos;s included
          </ButtonLink>
        </div>
      </PageHero>

      {/* in-page nav */}
      <nav aria-label="On this page" className="sticky top-16 z-30 border-b border-line bg-paper lg:top-[4.5rem]">
        <ul className="container-x flex gap-6 overflow-x-auto text-[0.875rem] text-muted [scrollbar-width:none]">
          {[
            ["deliverables", "Deliverables"],
            ["why-growfore", "Why Growfore"],
            ["reviews", "Reviews"],
            ["faqs", "FAQs"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="block border-b border-transparent py-3.5 whitespace-nowrap hover:border-ink hover:text-ink">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* deliverables */}
      <section id="deliverables" className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHead title={service.sectionTitle ?? service.title} lede={service.sectionBody} />
          <Stagger className="ledger mt-14 rounded-md md:grid-cols-2 xl:grid-cols-3">
            {service.deliverables.map((d) => {
              const href = service.kind === "hub" ? deliverableHref(d.id) : null;
              const Card = (
                <>
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-md bg-brand-soft text-brand-ink">
                      <ServiceIcon name={d.icon} className="size-5" />
                    </span>
                    <h3 className="text-[1.125rem] leading-snug tracking-[-0.01em] text-ink">{d.title}</h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-muted">{d.body}</p>
                  {d.included.length > 0 && (
                    <ul className="mt-6 space-y-2 border-t border-line pt-5">
                      {d.included.map((i) => (
                        <li key={i} className="flex gap-2.5 text-[0.9375rem] text-ink">
                          <Check className="mt-1 size-3.5 shrink-0 text-brand" strokeWidth={2.25} aria-hidden />
                          {i}
                        </li>
                      ))}
                    </ul>
                  )}
                  {d.outcome && <p className="mt-6 text-[0.875rem] leading-relaxed text-faint">{d.outcome}</p>}
                  {href && (
                    <span className="mt-auto flex items-center gap-2 pt-8 text-[0.875rem] font-medium text-ink">
                      Explore {d.title} <ArrowCircle />
                    </span>
                  )}
                </>
              );
              return (
                <StaggerItem key={d.id + d.title} className="flex">
                  {href ? (
                    <Link id={d.id} href={href} className="group flex w-full flex-col bg-card p-6 transition-colors hover:bg-[#fdfdfc] lg:p-8">
                      {Card}
                    </Link>
                  ) : (
                    <article id={d.id} className="flex w-full flex-col bg-card p-6 lg:p-8">
                      {Card}
                    </article>
                  )}
                </StaggerItem>
              );
            })}
            {service.deliverables.length % 3 !== 0 && (
              <StaggerItem className={`hidden xl:flex ${service.deliverables.length % 3 === 1 ? "xl:col-span-2" : ""}`}>
                <Link href="/contact-us/" className="group flex w-full flex-col justify-between bg-brand-soft p-6 text-ink lg:p-8">
                  <p className="font-serif text-h3 text-balance">Not sure which you need? Talk to a strategist.</p>
                  <span className="flex items-center gap-2 pt-8 text-[0.875rem] font-medium">
                    Get a free consultation <ArrowCircle />
                  </span>
                </Link>
              </StaggerItem>
            )}
          </Stagger>
        </div>
      </section>

      {/* why */}
      {service.why && (
        <section id="why-growfore" className="border-t border-line py-24 lg:py-32">
          <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              {service.why.eyebrow && <Eyebrow className="mb-5">{sentenceCase(service.why.eyebrow)}</Eyebrow>}
              <RevealText text={service.why.title} className="font-serif text-h2 text-balance text-ink" />
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{service.why.body}</p>
              </Reveal>
            </div>
            <div>
              {service.why.subtitle && <h3 className="text-[1.125rem] leading-snug tracking-[-0.01em] text-ink">{service.why.subtitle}</h3>}
              <Stagger as="ul" className="mt-6 border-t border-line" stagger={0.07}>
                {service.why.points.map((p, i) => (
                  <StaggerItem as="li" key={p} className="flex items-baseline gap-5 border-b border-line py-4">
                    <span className="w-6 shrink-0 text-[0.8125rem] text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-base text-ink">{p}</span>
                  </StaggerItem>
                ))}
              </Stagger>
              {service.why.closing && <p className="mt-6 leading-relaxed text-muted">{service.why.closing}</p>}
            </div>
          </div>
        </section>
      )}

      <div id="reviews">
        <ReviewsMarquee />
      </div>

      {/* faqs */}
      {service.faqs.length > 0 && (
        <section id="faqs" className="py-24 lg:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <SectionHead title="Frequently asked questions" lede={`Everything clients usually ask us about ${service.title.toLowerCase()}.`} />
            <Reveal delay={0.1}>
              <Faq items={service.faqs} />
            </Reveal>
          </div>
        </section>
      )}

      {/* related */}
      {siblings.length > 0 && (
        <section className="border-t border-line py-20">
          <div className="container-x">
            <h2 className="text-[0.8125rem] font-medium text-muted">
              {service.kind === "hub" ? "Explore each service" : `More in ${HUB_META[hubSlug].label}`}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}/`} className="inline-flex rounded-full bg-card px-4 py-2 text-[0.9375rem] text-ink ring-1 ring-line ring-inset transition-colors hover:ring-ink/30">
                    {s.title}
                  </Link>
                </li>
              ))}
              {service.kind === "leaf" && parent && (
                <li>
                  <Link href={`/${parent.slug}/`} className="inline-flex rounded-full bg-ink px-4 py-2 text-[0.9375rem] text-white">
                    All {HUB_META[hubSlug].label}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        lines={["Ready to get started?", "Let's talk about", "how you grow next."]}
        lede="Contact us for a free consultation and see what's possible when you partner with the right team."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
