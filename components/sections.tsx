import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { clients, formatDate, type Post, reviews } from "@/lib/content";
import { site } from "@/lib/site";
import { Marquee } from "@/components/marquee";
import { ArrowCircle, ButtonLink, cx, Eyebrow } from "@/components/ui";

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
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  crumbs?: { label: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-text">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_28rem_at_85%_0%,rgba(26,178,245,0.13),transparent_70%)]" />
      <div className={cx("container-x relative pt-16 pb-20 lg:pt-24 lg:pb-28", !!aside && "lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16")}>
        <div>
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-ink-muted">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <Eyebrow dark className="mb-5">{eyebrow}</Eyebrow>}
        <h1 className="max-w-4xl font-serif text-h1 text-balance text-white">{title}</h1>
        {lede && <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-pretty text-ink-muted">{lede}</p>}
        {children && <div className="mt-10">{children}</div>}
        </div>
        {aside && <div className="mt-14 hidden lg:mt-0 lg:block">{aside}</div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ closing CTA */

export function CtaBand({
  lines = ["Build it right.", "Rank it higher.", "Grow it every month."],
  lede = "Tell us where you want to be. We'll come back with a plan, a timeline and an honest price — usually within a day.",
}: {
  lines?: string[];
  lede?: string;
}) {
  return (
    <section className="bg-ink text-ink-text">
      <div className="container-x grid gap-14 py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-36">
        <div>
          <h2 className="font-serif text-h2 text-balance">
            {lines.map((l, i) => (
              <span key={l} className={cx("block", i === 0 && "text-white/35", i === 1 && "text-white/65", i === 2 && "text-white")}>
                {l}
              </span>
            ))}
          </h2>
          <p className="mt-8 max-w-md leading-relaxed text-ink-muted">{lede}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact-us/">Get a proposal</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="ghost-dark">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
        <div className="ledger-dark rounded-sm">
          {[
            { k: "Email", v: site.email, href: `mailto:${site.email}` },
            { k: "Phone", v: site.phone, href: site.phoneHref },
            { k: "Office", v: site.address, href: site.mapsUrl },
          ].map((row) => (
            <a
              key={row.k}
              href={row.href}
              className="group flex items-center justify-between gap-6 bg-ink-2 px-6 py-6 transition-colors hover:bg-ink-3"
              {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span>
                <span className="block text-[0.75rem] text-ink-muted">{row.k}</span>
                <span className="mt-1 block text-base text-white">{row.v}</span>
              </span>
              <ArrowCircle dark />
            </a>
          ))}
          <div className="flex items-center gap-3 bg-ink-2 px-6 py-5 text-[0.8125rem] text-ink-muted">
            <Stars />
            <span>
              <span className="text-white">{reviews.rating.toFixed(1)}</span> on Google from {reviews.count} reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ reviews */

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cx("flex gap-0.5 text-brand", className)} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="size-3" fill="currentColor" aria-hidden>
          <path d="M6 .8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L.8 4.6l3.6-.5z" />
        </svg>
      ))}
    </span>
  );
}

export function ReviewsMarquee() {
  return (
    <section aria-label="Client reviews" className="border-t border-ink-line bg-ink py-20 text-ink-text lg:py-24">
      <Marquee duration={70} pauseOnHover>
        {reviews.items.map((r) => (
          <figure key={r.author} className="w-[min(34rem,85vw)] shrink-0 pr-12 sm:pr-20">
            <blockquote className="font-serif text-[1.1875rem] leading-[1.35] text-white sm:text-[1.375rem]">
              <span className="text-brand">“</span>
              {r.text}
              <span className="text-brand">”</span>
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-[0.9375rem] text-ink-muted">
              <Stars /> {r.author}
            </figcaption>
          </figure>
        ))}
      </Marquee>
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
    <Link href={`/${post.slug}/`} className="group flex h-full flex-col bg-card p-4 transition-colors hover:bg-white/60">
      {post.cover && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-paper">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col px-1 pt-5 pb-2">
        <p className="text-[0.75rem] text-faint">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </p>
        <h3 className={cx("mt-2 text-ink text-balance", large ? "font-serif text-h3" : "text-base leading-snug font-medium")}>
          {post.title}
        </h3>
        {large && <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{post.description}</p>}
      </div>
    </Link>
  );
}
