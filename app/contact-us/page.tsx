import type { Metadata } from "next";
import { PageHero, Stars } from "@/components/sections";
import { ArrowCircle } from "@/components/ui";
import { reviews } from "@/lib/content";
import { site } from "@/lib/site";
import { ProposalForm } from "./proposal-form";

export const metadata: Metadata = {
  title: "Contact Us — Get a Proposal",
  description: "Talk to a Growfore strategist about your website, SEO or ads. Call +977 9856085151, email info@growfore.com, or visit us on New Rd, Pokhara.",
  alternates: { canonical: "/contact-us/" },
};

const channels = [
  { title: "Chat with us", sub: "Our team replies within a working day.", value: site.email, href: `mailto:${site.email}` },
  { title: "Call us", sub: "Talk with a strategist.", value: site.phone, href: site.phoneHref },
  { title: "Visit us", sub: "Come meet the team.", value: site.address, href: site.mapsUrl },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's plan your growth."
        lede="Not sure what you need, or feeling overwhelmed? Tell us about your business and we'll come back with a plan tailored to your brand. The sooner you act, the better."
      />
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-h2 text-ink">Submit your proposal</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">Fill out the form and a strategist will get back to you — usually within one working day.</p>
            <ul className="mt-10 border-t border-line">
              {channels.map((c) => (
                <li key={c.title}>
                  <a
                    href={c.href}
                    className="group flex items-center justify-between gap-6 border-b border-line py-5"
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span>
                      <span className="block text-[0.8125rem] text-muted">
                        {c.title} · {c.sub}
                      </span>
                      <span className="mt-1 block text-base text-ink">{c.value}</span>
                    </span>
                    <ArrowCircle />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3 text-[0.875rem] text-muted">
              <Stars />
              <a href={reviews.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                Rated {reviews.rating.toFixed(1)} on Google by {reviews.count} clients
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem] text-muted">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-ink hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="ledger self-start">
            <ProposalForm />
          </div>
        </div>
      </section>
    </>
  );
}
