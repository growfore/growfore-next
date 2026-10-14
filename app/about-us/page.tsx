import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero, ReviewsMarquee } from "@/components/sections";
import { ArrowLink, ButtonLink, SectionHead } from "@/components/ui";
import { team } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Growfore Solution empowers businesses to grow through smart web development and SEO. Meet the Pokhara team behind tailored digital strategies that drive measurable results.",
  alternates: { canonical: "/about-us/" },
};

const strategy = [
  {
    title: "Vision",
    sub: "Business aspiration and value.",
    body: "We identify your business aspirations and values, then work with you to create a roadmap and make decisions in line with your goals.",
  },
  {
    title: "Market",
    sub: "Which part of the market you want to capture.",
    body: "We identify your target audience and understand what they are looking for, then create a marketing strategy that reaches them.",
  },
  {
    title: "Competition",
    sub: "How you will beat your competition.",
    body: "Our team works with you on a different strategy to win more customers online and put your business on top.",
  },
  {
    title: "Target",
    sub: "Set clear goals.",
    body: "We help you set clear business goals, measure progress, and know whether you're on track for the outcome you want.",
  },
];

const why = [
  {
    title: "Dedicated team",
    body: "Experienced web developers, designers and SEO experts who keep communication honest and consistent, so results keep improving.",
  },
  {
    title: "Tech savvy",
    body: "We stay current with the latest technology and adopt what's genuinely useful for better deliverables.",
  },
  {
    title: "Regular reporting",
    body: "Crystal-clear reports on progress and the present status of your website, delivered at a fixed interval.",
  },
];

export default function AboutPage() {
  const founder = team[0];
  return (
    <>
      <PageHero
        eyebrow="About Growfore"
        title="We are all about growth."
        lede="Growfore Solution empowers businesses to grow through smart web development and SEO. We deliver tailored digital strategies that drive real, measurable results."
      >
        <ButtonLink href="/contact-us/">Connect with us</ButtonLink>
      </PageHero>

      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-serif text-h2 text-ink">Who are we?</h2>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted">
              <p>
                We are a disciplined, creative and strong team of web developers, designers and SEO experts. We lead web development,
                WordPress development and SEO campaigns for national and international businesses ready to move to the next level.
              </p>
              <p>
                Our services are tailored to your business, delivered as an all-in-one solution with consistent communication and
                transparency about the pace of work. Our dedication is simple: quality work that helps our clients grow.
              </p>
            </div>
          </div>
          {founder?.photo && (
            <figure className="ledger self-start">
              <div className="bg-card p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-paper">
                  <Image src={founder.photo} alt={founder.name} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="px-2 pt-4 pb-1">
                  <span className="block text-ink">{founder.name}</span>
                  <span className="text-[0.875rem] text-muted">CEO & Founder, Growfore Solution</span>
                </figcaption>
              </div>
            </figure>
          )}
        </div>
      </section>

      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <SectionHead title="The strategy we follow for every business." />
          <ol className="ledger mt-14 md:grid-cols-2 lg:grid-cols-4">
            {strategy.map((s, i) => (
              <li key={s.title} className="flex min-h-72 flex-col bg-card p-6 lg:p-7">
                <span className="text-[0.8125rem] text-faint tabular-nums">0{i + 1}</span>
                <h3 className="mt-8 font-serif text-[1.75rem] leading-none text-ink">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] font-medium text-brand-ink">{s.sub}</p>
                <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHead title="Why choose us?" />
            <ArrowLink href="/our-team/" className="mt-8">
              Meet the team
            </ArrowLink>
          </div>
          <ul className="border-t border-line">
            {why.map((w) => (
              <li key={w.title} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <h3 className="text-[1.125rem] text-ink">{w.title}</h3>
                <p className="leading-relaxed text-muted">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ReviewsMarquee />
      <CtaBand lines={["Let's talk about", "your startup,", "or your next step."]} />
    </>
  );
}
