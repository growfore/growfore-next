import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/faq";
import { HeroGlow } from "@/components/hero-glow";
import { CountUp, MediaReveal, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { TripElevenFeature } from "@/components/tripeleven";
import { CampaignBoard, KeywordCloud, LocalPack, ScoreRings } from "@/components/illustrations";
import { ClientLogos, CtaBand, GoogleRating, PostCard, ReviewsMarquee } from "@/components/sections";
import { ArrowLink, ButtonLink, SectionHead, Tag } from "@/components/ui";
import { HUB_META, HUBS, hubChildren, posts, reviews, team } from "@/lib/content";
import { site } from "@/lib/site";
import { ArrowRight, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Best Website Design & SEO Agency in Nepal | Growfore" },
  description:
    "Growfore Solution is a website design & SEO agency in Pokhara, Nepal. We help local businesses grow online with responsive websites, data-driven SEO and ads that convert.",
  alternates: { canonical: "/" },
};

const capabilities = [
  {
    tag: "Web development",
    title: "Websites that turn traffic into paying customers",
    href: "/web-services/",
    art: <ScoreRings />,
  },
  {
    tag: "Local SEO",
    title: "Be the first name locals see — and the last one they need",
    href: "/local-seo/",
    art: <LocalPack />,
  },
  {
    tag: "Keyword research",
    title: "Find the words your customers are actually searching",
    href: "/keyword-research/",
    art: <KeywordCloud />,
  },
  {
    tag: "Ads management",
    title: "Every click tracked. Every rupee accounted for.",
    href: "/ads-services/",
    art: <CampaignBoard />,
  },
];

const method = [
  {
    step: "Vision",
    ask: "What are you building toward?",
    do: "We map your aspirations and values into a roadmap, so every decision lines up with your goals.",
    get: "A clear roadmap",
  },
  {
    step: "Market",
    ask: "Which customers do you want to win?",
    do: "We identify your target audience and what they search for, then plan how to reach them.",
    get: "Audience & channel plan",
  },
  {
    step: "Competition",
    ask: "How will you beat the business next door?",
    do: "We study who outranks you today and build a different strategy to get you on top.",
    get: "A competitive edge",
  },
  {
    step: "Target",
    ask: "How will we know it's working?",
    do: "We set measurable goals and report progress at a regular interval — no vague updates.",
    get: "Goals & regular reports",
  },
];

const faqs = [
  {
    q: "What services does Growfore provide?",
    a: "We cover the full digital stack under one roof: website design and development (WordPress, e-commerce, web and mobile apps, custom CMS, UI/UX), SEO (local, technical, on-page, off-page, keyword research, audits, content) and ads management (Google Ads and Google Local Service Ads).",
  },
  {
    q: "Why should I invest in digital marketing for my business?",
    a: "Digital marketing increases the visibility of your products and services, generates leads, reaches a larger audience and drives traffic that turns into revenue. Most customers research a business online before they ever call or visit.",
  },
  {
    q: "How much does it cost to hire a digital marketing agency in Nepal?",
    a: "It depends on the services you need, the size of your business, project duration and your goals. We scope every project individually and offer affordable plans for small businesses — ask for a proposal and you'll get an exact number.",
  },
  {
    q: "How do I choose the right agency?",
    a: "Look at expertise, working style, client reviews, past work and how clearly they report results. We hold a 5.0 rating on Google and share regular progress reports with every client.",
  },
  {
    q: "Do you work with businesses outside Pokhara?",
    a: "Yes. We're based on New Rd, Pokhara, and work with national and international businesses. Everything from strategy calls to reporting works remotely.",
  },
];

export default function Home() {
  const [featured, ...rest] = posts;
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative isolate overflow-hidden">
        <HeroGlow className="-z-10" />
        <div className="container-x flex min-h-[min(48rem,calc(100dvh-6.75rem))] flex-col items-center justify-center py-24 text-center">
          <RevealText as="h1" onLoad text={["Websites that sell.", "Search that ranks."]} className="font-serif text-display text-balance text-ink" />
          <Reveal delay={0.45}>
            <p className="mx-auto mt-8 max-w-[34rem] text-[1.125rem] leading-[1.55] text-pretty text-muted">
              Growfore <span className="text-ink">builds websites</span>, runs <span className="text-ink">SEO</span> and manages{" "}
              <span className="text-ink">ads</span> for growing businesses — one team turning visibility into{" "}
              <span className="text-ink">real customers</span>, from Pokhara to anywhere.
            </p>
          </Reveal>
          <Reveal delay={0.6} className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact-us/">Talk to a strategist</ButtonLink>
            <ButtonLink href="/services/" variant="outline">
              Explore services
            </ButtonLink>
          </Reveal>
          <Reveal delay={1} y={0} className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block">
            <a href="#clients" className="flex flex-col items-center gap-1 text-[0.8125rem] text-muted hover:text-ink">
              <ChevronDown className="size-4 animate-bounce motion-reduce:animate-none" strokeWidth={1.75} aria-hidden />
              Scroll
            </a>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ logos */}
      <section id="clients" aria-label="Clients" className="py-10">
        <Reveal>
          <p className="container-x mb-6 text-center text-[0.9375rem] text-muted">
            Trusted by hotels, clinics, stores and schools across <span className="font-serif text-base text-ink italic">Nepal</span>
          </p>
          <ClientLogos />
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ pick a service */}
      <section className="border-t border-line">
        <div className="container-x py-24 lg:py-32">
          <SectionHead title="Pick what you need. See Growfore at work." />
          <Stagger className="ledger mt-14 rounded-md md:grid-cols-3" stagger={0.12}>
            {HUBS.map((hub) => {
              const children = hubChildren(hub);
              return (
                <StaggerItem as="article" key={hub} className="flex flex-col bg-card p-6 lg:p-8">
                  <h3 className="font-serif text-[1.5rem] leading-tight text-ink">{HUB_META[hub].label}</h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-muted">{HUB_META[hub].blurb}</p>
                  <ul className="mt-8 flex flex-wrap gap-1.5">
                    {children.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/${c.slug}/`}
                          className="inline-flex rounded-md bg-paper px-2.5 py-1.5 text-[0.8125rem] text-ink/80 ring-1 ring-line ring-inset transition-colors hover:text-ink hover:ring-ink/30"
                        >
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-14">
                    <ArrowLink href={`/${hub}/`}>Explore {HUB_META[hub].label}</ArrowLink>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <ReviewsMarquee />

      {/* ------------------------------------------------------------ capabilities */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHead
            title="Everything your business needs to grow, under one roof."
            lede="Design, development, search and ads built by one team that talks to each other — so your website, rankings and campaigns pull in the same direction."
          />
          <Stagger className="ledger mt-14 rounded-md md:grid-cols-2" stagger={0.1}>
            {capabilities.map((c) => (
              <StaggerItem key={c.title}>
                <Link href={c.href} className="group flex h-full min-h-[28rem] flex-col bg-card p-6 transition-colors hover:bg-[#fdfdfc] lg:min-h-[32rem] lg:p-8">
                  <div>
                    <Tag>{c.tag}</Tag>
                    <h3 className="mt-4 max-w-sm text-[1.125rem] leading-snug tracking-[-0.01em] text-ink">{c.title}</h3>
                  </div>
                  <div className="flex flex-1 items-center justify-center py-10 transition-transform duration-700 ease-out group-hover:-translate-y-1">{c.art}</div>
                  <span className="inline-flex items-center gap-1.5 text-[0.875rem] text-muted transition-colors group-hover:text-ink">
                    Learn more <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <TripElevenFeature />

      {/* ------------------------------------------------------------ method + proof */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <div className="ledger rounded-md">
            <div className="bg-card px-6 py-8 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-6 pb-8">
                <SectionHead title="The strategy we follow for every business." className="max-w-xl" />
                <Reveal delay={0.2}>
                  <p className="max-w-sm leading-relaxed text-muted">
                    Four questions, answered before a single page is designed or a single rupee is spent on ads.
                  </p>
                </Reveal>
              </div>
              <Stagger as="ol" className="border-t border-line md:hidden">
                {method.map((m, i) => (
                  <StaggerItem as="li" key={m.step} className="border-b border-line py-5 last:border-0">
                    <p className="font-serif text-[1.25rem] text-ink">
                      <span className="mr-2 text-[0.875rem] text-faint tabular-nums">0{i + 1}</span>
                      {m.step}
                    </p>
                    <p className="mt-2 text-[0.9375rem] text-ink">{m.ask}</p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{m.do}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-[0.9375rem] font-medium text-brand-ink">
                      <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden /> {m.get}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="hidden md:block" role="table" aria-label="The strategy we follow">
                <div role="row" className="grid grid-cols-[9rem_1fr_1.3fr_12rem] gap-6 border-b border-line py-3 text-[0.75rem] text-faint">
                  <span role="columnheader">Step</span>
                  <span role="columnheader">The question</span>
                  <span role="columnheader">What we do</span>
                  <span role="columnheader">You get</span>
                </div>
                <Stagger stagger={0.1}>
                  {method.map((m, i) => (
                    <StaggerItem key={m.step}>
                      <div role="row" className="grid grid-cols-[9rem_1fr_1.3fr_12rem] gap-6 border-b border-line py-5 last:border-0">
                        <span role="cell" className="font-serif text-[1.25rem] text-ink">
                          <span className="mr-2 text-[0.875rem] text-faint tabular-nums">0{i + 1}</span>
                          {m.step}
                        </span>
                        <span role="cell" className="text-[0.9375rem] text-ink">{m.ask}</span>
                        <span role="cell" className="text-[0.9375rem] leading-relaxed text-muted">{m.do}</span>
                        <span role="cell" className="text-[0.9375rem] font-medium text-brand-ink">{m.get}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>

            <Stagger className="grid gap-px md:grid-cols-3" stagger={0.12}>
              {[
                {
                  title: "Expert guidance from people who do the work",
                  stat: String(team.length),
                  label: "in-house specialists across web, SEO and sales",
                },
                {
                  title: "A personalised approach for every business",
                  stat: reviews.rating.toFixed(1),
                  label: "google",
                },
                {
                  title: "Vision and analysis — we don't guess",
                  stat: "20",
                  label: "services under one roof, from domains to Google Ads",
                },
              ].map((c) => (
                <StaggerItem key={c.title} className="flex min-h-64 flex-col justify-between bg-card p-6 lg:p-8">
                  <h3 className="max-w-xs text-[1.1875rem] leading-snug tracking-[-0.01em] text-ink">{c.title}</h3>
                  <div className="mt-10">
                    <CountUp value={c.stat} className="block font-serif text-[2.375rem] leading-none tracking-[-0.03em] text-ink tabular-nums" />
                    {c.label === "google" ? (
                      <GoogleRating className="mt-3 text-[0.9375rem]" />
                    ) : (
                      <p className="mt-2 text-[0.9375rem] text-muted">{c.label}</p>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="flex flex-col gap-6 bg-card px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-8">
              <div>
                <h3 className="font-serif text-h3 text-ink">Based in Pokhara. Working everywhere.</h3>
                <p className="mt-2 max-w-lg text-muted">
                  Visit us on {site.address.split(",")[0]} or work with us remotely — strategy calls, reviews and reporting all happen online.
                </p>
              </div>
              <ArrowLink href="/about-us/">More about Growfore</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ blog */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead title="From the Growfore blog" lede="Practical guides on SEO, websites and digital marketing in Nepal — written by the team doing the work." />
            <ArrowLink href="/blogs/">All {posts.length} articles</ArrowLink>
          </div>
          <div className="ledger mt-12 rounded-md lg:grid-cols-2">
            <MediaReveal className="bg-card">
              <PostCard post={featured} large />
            </MediaReveal>
            <Stagger className="grid gap-px sm:grid-cols-2" stagger={0.1}>
              {rest.slice(0, 4).map((p) => (
                <StaggerItem key={p.slug}>
                  <PostCard post={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ faq */}
      <FaqSection items={faqs} className="border-t border-line" lede="The questions we hear most before a project starts." />

      <CtaBand />
    </>
  );
}
