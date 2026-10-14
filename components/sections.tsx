import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Mail, Phone, Star } from "lucide-react";
import { GoogleG } from "@/components/brand-icons";
import { clients, formatDate, type Post, reviews } from "@/lib/content";
import { site } from "@/lib/site";
import { HeroGlow } from "@/components/hero-glow";
import { Marquee } from "@/components/marquee";
import { GrowLine, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { ButtonLink, cx, Eyebrow } from "@/components/ui";

/* ------------------------------------------------------------------ page hero (inner pages) */

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  crumbs,
  aside,
}: {
  aside?: ReactNode;
  eyebrow?: ReactNode;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
  crumbs?: { label: string; href: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <HeroGlow compact className="-z-10" />
      <div className={cx("container-x relative pt-16 pb-20 lg:pt-24 lg:pb-28", !!aside && "lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16")}>
        <div>
          {crumbs && (
            <Reveal y={12}>
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-muted">
                  {crumbs.map((c, i) => (
                    <li key={c.href} className="flex items-center gap-2">
                      {i > 0 && <span aria-hidden>/</span>}
                      <Link href={c.href} className="hover:text-ink">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          )}
          {eyebrow && (
            <Reveal y={12}>
              <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <RevealText as="h1" onLoad text={title} className="max-w-4xl font-serif text-h1 text-balance text-ink" />
          {lede && (
            <Reveal delay={0.25}>
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-pretty text-muted">{lede}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.4} className="mt-10">
              {children}
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal delay={0.3} className="mt-14 hidden lg:mt-0 lg:block">
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ closing CTA */

export function CtaBand({
  lines = ["Build it right.", "Rank it higher.", "Grow it every month."],
  lede = "Tell us where you want to be. We'll come back with a plan, a timeline and an honest price.",
}: {
  lines?: string[];
  lede?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-line">
      <HeroGlow compact className="-z-10 rotate-180" />
      <div className="container-x grid gap-14 py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-36">
        <div>
          <h2 className="font-serif text-h2 text-balance" aria-label={lines.join(" ")}>
            {lines.map((l, i) => (
              <RevealText key={l} as="p" text={l} delay={i * 0.12} className={cx("block", i === 0 && "text-ink/35", i === 1 && "text-ink/60", i === 2 && "text-ink")} />
            ))}
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md leading-relaxed text-muted">{lede}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact-us/">Get a proposal</ButtonLink>
              <ButtonLink href={site.phoneHref} variant="outline">
                Call {site.phone}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <NextSteps />
      </div>
    </section>
  );
}

/** Right-hand side of the closing CTA: what happens after someone gets in touch. */
const steps = [
  { title: "Tell us where you want to be", body: "Fill in the form or give us a call. Five minutes, no jargon." },
  { title: "Free strategy call", body: "We look at your website, rankings and competitors together." },
  { title: "Your plan, in writing", body: "Scope, timeline and an honest price before any work starts." },
];

function NextSteps() {
  return (
    <Reveal className="rounded-xl bg-card p-6 shadow-[0_30px_80px_-40px_rgba(22,22,22,0.35)] ring-1 ring-line sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.8125rem] font-medium text-muted">What happens next</p>
        <GoogleRating compact />
      </div>
      <div className="relative mt-8">
        <span aria-hidden className="absolute top-4 bottom-4 left-4 w-px bg-line" />
        <GrowLine className="absolute top-4 bottom-4 left-4 w-px bg-brand" />
        <Stagger as="ol" className="relative space-y-7" stagger={0.18}>
          {steps.map((step, i) => (
            <StaggerItem as="li" key={step.title} className="flex gap-5">
              <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full bg-brand text-[0.8125rem] font-medium text-white ring-4 ring-card tabular-nums">
                {i + 1}
              </span>
              <span className="pt-1">
                <span className="block text-base text-ink">{step.title}</span>
                <span className="mt-1 block text-[0.875rem] leading-relaxed text-muted">{step.body}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <div className="mt-8 grid gap-2 border-t border-line pt-6 sm:grid-cols-2">
        <a href={site.phoneHref} className="group flex items-center gap-3 rounded-lg border border-line px-4 py-3 transition-colors hover:border-ink/30">
          <Phone className="size-4 text-brand-ink" strokeWidth={1.75} aria-hidden />
          <span className="min-w-0">
            <span className="block text-[0.75rem] text-muted">Call us</span>
            <span className="block truncate text-[0.9375rem] text-ink">{site.phone}</span>
          </span>
        </a>
        <a href={`mailto:${site.email}`} className="group flex items-center gap-3 rounded-lg border border-line px-4 py-3 transition-colors hover:border-ink/30">
          <Mail className="size-4 text-brand-ink" strokeWidth={1.75} aria-hidden />
          <span className="min-w-0">
            <span className="block text-[0.75rem] text-muted">Email us</span>
            <span className="block truncate text-[0.9375rem] text-ink">{site.email}</span>
          </span>
        </a>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ reviews */

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cx("flex gap-0.5 text-[#f5a524]", className)} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-3 fill-current" strokeWidth={0} aria-hidden />
      ))}
    </span>
  );
}

/** "Rated 5 stars on Google" with the Google mark; links to the Google Business profile. */
export function GoogleRating({ compact, className }: { compact?: boolean; className?: string }) {
  return (
    <a
      href={reviews.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cx("inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors hover:text-ink", className)}
    >
      <GoogleG className="size-4 shrink-0" />
      <Stars />
      {compact ? <span className="sr-only">Rated 5 stars on Google</span> : <span>Rated 5 stars on Google</span>}
    </a>
  );
}

export function ReviewsMarquee() {
  return (
    <section aria-label="Client reviews" className="border-y border-line bg-card py-20 lg:py-24">
      <Reveal>
        <Marquee duration={70} pauseOnHover>
          {reviews.items.map((r) => (
            <figure key={r.author} className="w-[min(34rem,85vw)] shrink-0 pr-12 sm:pr-20">
              <blockquote className="font-serif text-[1.1875rem] leading-[1.35] text-ink sm:text-[1.375rem]">
                <span className="text-brand">“</span>
                {r.text}
                <span className="text-brand">”</span>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-[0.9375rem] text-muted">
                <Stars /> {r.author}
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ client logos */

export function ClientLogos({ className }: { className?: string }) {
  return (
    <Marquee duration={50} className={className}>
      {clients
        .filter((c) => c.logo)
        .map((c) => (
          <div key={c.name} className="grid h-16 w-40 shrink-0 place-items-center px-6 sm:w-48">
            <Image
              src={c.logo!}
              alt={c.name}
              width={160}
              height={64}
              className="max-h-14 w-auto object-contain opacity-60 mix-blend-multiply grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
    </Marquee>
  );
}

/* ------------------------------------------------------------------ blog card */

export function PostCard({ post, large }: { post: Post; large?: boolean }) {
  return (
    <Link href={`/${post.slug}/`} className="group flex h-full flex-col bg-card p-4 transition-colors hover:bg-[#fcfbfa]">
      {post.cover && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-paper">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col px-1 pt-5 pb-2">
        <p className="text-[0.75rem] text-faint">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </p>
        <h3 className={cx("mt-2 text-ink text-balance", large ? "font-serif text-h3" : "text-base leading-snug font-medium")}>{post.title}</h3>
        {large && <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{post.description}</p>}
      </div>
    </Link>
  );
}
