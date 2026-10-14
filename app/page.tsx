import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/faq";
import SideRays from "@/components/side-rays/side-rays";
import { TripElevenFeature } from "@/components/tripeleven";
import { CampaignBoard, KeywordCloud, LocalPack, ScoreRings } from "@/components/illustrations";
import { ClientLogos, CtaBand, PostCard, ReviewsMarquee, Stars } from "@/components/sections";
import { ArrowLink, ButtonLink, SectionHead, Tag } from "@/components/ui";
import { HUB_META, HUBS, hubChildren, posts, reviews, team } from "@/lib/content";
import { site } from "@/lib/site";

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
      <section className="relative isolate overflow-hidden bg-ink text-ink-text">
        <div aria-hidden className="absolute inset-0 -z-10">
          <SideRays speed={2.5} rayColor1="#1ab2f5" rayColor2="#96c8ff" intensity={2} spread={2} origin="top-right" saturation={1.5} blend={0.75} falloff={1.6} />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(38rem_22rem_at_50%_48%,var(--color-ink)_30%,transparent_100%)]" />
        <div className="container-x flex min-h-[min(46rem,calc(100dvh-6.75rem))] flex-col items-center justify-center py-24 text-center">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-[0.8125rem] text-ink-muted ring-1 ring-ink-line ring-inset">
            <Stars /> <span className="text-white">{reviews.rating.toFixed(1)}</span> on Google<span className="hidden sm:inline"> · Website design & SEO agency in Nepal</span>
          </p>
          <h1 className="font-serif text-display text-balance text-white">
            Websites that sell.
            <br />
            Search that ranks.
          </h1>
          <p className="mt-8 max-w-[34rem] text-[1.125rem] leading-[1.55] text-pretty text-ink-muted">
            Growfore <span className="text-white">builds websites</span>, runs <span className="text-white">SEO</span> and manages{" "}
            <span className="text-white">ads</span> for growing businesses — one team turning visibility into{" "}
            <span className="text-white">real customers</span>, from Pokhara to anywhere.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact-us/">Talk to a strategist</ButtonLink>
            <ButtonLink href="/services/" variant="ghost-dark">
              Explore services
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ logos */}
      <section aria-label="Clients" className="border-b border-line bg-paper py-10">
        <p className="container-x mb-6 text-center text-[0.9375rem] text-muted">
          Trusted by hotels, clinics, stores and schools across <span className="font-serif text-base text-ink italic">Nepal</span>
        </p>
        <ClientLogos />
      </section>

      {/* ------------------------------------------------------------ pick a service */}
      <section className="bg-ink text-ink-text">
        <div className="container-x py-24 lg:py-32">
          <SectionHead dark title="Pick what you need. See Growfore at work." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(26,178,245,0.35))] p-px md:grid-cols-3">
            {HUBS.map((hub) => {
              const children = hubChildren(hub);
              return (
                <article key={hub} className="relative flex flex-col bg-ink-2 p-6 lg:p-8">
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(26,178,245,0.14),transparent)]" />
                  <h3 className="font-serif text-[1.5rem] leading-tight text-white">{HUB_META[hub].label}</h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-ink-muted">{HUB_META[hub].blurb}</p>
                  <ul className="mt-8 flex flex-wrap gap-1.5">
                    {children.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/${c.slug}/`} className="inline-flex rounded-md bg-white/6 px-2.5 py-1.5 text-[0.8125rem] text-white/80 ring-1 ring-white/8 ring-inset transition-colors hover:bg-white/12 hover:text-white">
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-auto pt-14">
                    <ArrowLink dark href={`/${hub}/`}>
                      Explore {HUB_META[hub].label}
                    </ArrowLink>
                  </div>
                </article>
              );
            })}
          </div>
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
          <div className="ledger mt-14 md:grid-cols-2">
            {capabilities.map((c) => (
              <Link key={c.title} href={c.href} className="group reveal flex min-h-[28rem] flex-col bg-card p-6 transition-colors hover:bg-[#fdfdfc] lg:min-h-[32rem] lg:p-8">
                <div>
                  <Tag>{c.tag}</Tag>
                  <h3 className="mt-4 max-w-sm text-[1.125rem] leading-snug tracking-[-0.01em] text-ink">{c.title}</h3>
                </div>
                <div className="flex flex-1 items-center justify-center py-10">{c.art}</div>
                <span className="text-[0.875rem] text-muted transition-colors group-hover:text-ink">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TripElevenFeature />

      {/* ------------------------------------------------------------ method + proof */}

      <section className="py-24 lg:py-32">
        <div className="container-x">
          <div className="ledger">
            <div className="bg-card px-6 py-8 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-6 pb-8">
                <SectionHead title="The strategy we follow for every business." className="max-w-xl" />
                <p className="max-w-sm leading-relaxed text-muted">
                  Four questions, answered before a single page is designed or a single rupee is spent on ads.
                </p>
              </div>
              <ol className="border-t border-line md:hidden">
                {method.map((m, i) => (
                  <li key={m.step} className="border-b border-line py-5 last:border-0">
                    <p className="font-serif text-[1.25rem] text-ink">
                      <span className="mr-2 text-[0.875rem] text-faint tabular-nums">0{i + 1}</span>
                      {m.step}
                    </p>
                    <p className="mt-2 text-[0.9375rem] text-ink">{m.ask}</p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{m.do}</p>
                    <p className="mt-2 text-[0.9375rem] font-medium text-brand-ink">→ {m.get}</p>
                  </li>
                ))}
              </ol>
              <table className="hidden w-full text-left md:table">
                <thead>
                  <tr className="border-b border-line text-[0.75rem] text-faint">
                    <th className="w-36 py-3 font-normal">Step</th>
                    <th className="py-3 font-normal">The question</th>
                    <th className="py-3 font-normal">What we do</th>
                    <th className="w-48 py-3 font-normal">You get</th>
                  </tr>
                </thead>
                <tbody>
                  {method.map((m, i) => (
                    <tr key={m.step} className="border-b border-line last:border-0">
                      <td className="py-5 pr-4 align-top">
                        <span className="font-serif text-[1.25rem] text-ink">
                          <span className="mr-2 text-[0.875rem] text-faint tabular-nums">0{i + 1}</span>
                          {m.step}
                        </span>
                      </td>
                      <td className="py-5 pr-6 align-top text-[0.9375rem] text-ink">{m.ask}</td>
                      <td className="max-w-sm py-5 pr-6 align-top text-[0.9375rem] leading-relaxed text-muted">{m.do}</td>
                      <td className="py-5 align-top text-[0.9375rem] font-medium text-brand-ink">{m.get}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-1 md:grid-cols-3">
              {[
                {
                  title: "Expert guidance from people who do the work",
                  stat: String(team.length),
                  label: "in-house specialists across web, SEO and sales",
                },
                {
                  title: "A personalised approach for every business",
                  stat: reviews.rating.toFixed(1),
                  label: `Google rating from ${reviews.count} client reviews`,
                },
                {
                  title: "Vision and analysis — we don't guess",
                  stat: "20",
                  label: "services under one roof, from domains to Google Ads",
                },
              ].map((c) => (
                <div key={c.title} className="flex min-h-64 flex-col justify-between bg-card p-6 lg:p-8">
                  <h3 className="max-w-xs text-[1.1875rem] leading-snug tracking-[-0.01em] text-ink">{c.title}</h3>
                  <div className="mt-10">
                    <p className="font-serif text-[2.375rem] leading-none tracking-[-0.03em] text-ink">{c.stat}</p>
                    <p className="mt-2 text-[0.9375rem] text-muted">{c.label}</p>
                  </div>
                </div>
              ))}
            </div>

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
          <div className="ledger mt-12 lg:grid-cols-2">
            <PostCard post={featured} large />
            <div className="grid gap-1 sm:grid-cols-2">
              {rest.slice(0, 4).map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ faq */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead title="Frequently asked questions" lede="Can't find what you need? Call us — a real strategist picks up." />
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
