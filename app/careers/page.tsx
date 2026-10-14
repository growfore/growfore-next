import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/sections";
import { ButtonLink, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build your career while building brands. Join Growfore's team of strategists, developers and SEO specialists in Pokhara.",
  alternates: { canonical: "/careers/" },
};

const values = [
  {
    title: "Growth-focused environment",
    body: "Your career trajectory matters as much as our clients' growth. We invest in your development through mentorship, industry certifications and conferences. Many of our senior team members started in junior roles and grew with us.",
  },
  {
    title: "Cutting-edge work",
    body: "From emerging social platforms to the latest search algorithms, you'll work with tools and strategies that keep you ahead of the curve. We're early adopters who love testing new approaches.",
  },
  {
    title: "Collaborative culture",
    body: "No ego-driven rockstars. The best ideas come from diverse perspectives working together. An open-door policy and weekly brainstorms make sure every voice is heard, regardless of seniority.",
  },
  {
    title: "Work–life balance that works",
    body: "Flexible schedules, remote work options and unlimited PTO aren't perks — they're part of how we operate. Well-rested, happy people do their best work.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career while building brands."
        lede="We craft digital experiences that transform businesses. Our strategists, creators and growth hackers work where data meets creativity."
      >
        <ButtonLink href={`mailto:${site.careersEmail}?subject=Application`}>Send us your CV</ButtonLink>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="ledger">
            <div className="flex flex-col gap-6 bg-card p-6 md:flex-row md:items-center md:justify-between lg:p-8">
              <div>
                <p className="text-[0.8125rem] text-muted">Open roles</p>
                <p className="mt-2 text-[1.25rem] text-ink">No openings at the moment.</p>
                <p className="mt-1 text-muted">
                  Interested anyway? Send your CV to{" "}
                  <a className="text-brand-ink underline underline-offset-4" href={`mailto:${site.careersEmail}`}>
                    {site.careersEmail}
                  </a>{" "}
                  and we&apos;ll keep you in mind.
                </p>
              </div>
              <ButtonLink href={`mailto:${site.careersEmail}?subject=Application`} variant="dark">
                Apply now
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <SectionHead title="Where strategy meets creativity." />
          <div className="ledger mt-14 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="bg-card p-6 lg:p-8">
                <h3 className="font-serif text-h3 text-ink">{v.title}</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lines={["Have some queries?", "Hop on a call.", "We'll answer instantly."]} />
    </>
  );
}
