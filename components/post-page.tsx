import Image from "next/image";
import Link from "next/link";
import { HeroGlow } from "@/components/hero-glow";
import { MediaReveal, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { CtaBand, PostCard } from "@/components/sections";
import { ButtonLink } from "@/components/ui";
import { formatDate, posts, type Post } from "@/lib/content";
import { site } from "@/lib/site";

export function PostPage({ post }: { post: Post }) {
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.cover ? `${site.url}${post.cover}` : undefined,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/${post.slug}/`,
  };

  return (
    <>
      <header className="relative isolate overflow-hidden">
        <HeroGlow compact className="-z-10" />
        <div className="container-x pt-14 pb-16 lg:pt-20 lg:pb-20">
          <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
            <Link href="/blogs/" className="hover:text-ink">
              Blog
            </Link>
          </nav>
          <RevealText as="h1" onLoad text={post.title} className="mt-6 max-w-4xl font-serif text-h1 text-balance text-ink" />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">{post.description}</p>
            <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-muted">
              <span>Growfore Team</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readingMinutes} min read</span>
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-x">
        {post.cover && (
          <MediaReveal className="relative aspect-[2/1] max-h-[34rem] w-full overflow-hidden rounded-md bg-paper lg:aspect-[21/9]">
            <Image src={post.cover} alt="" fill priority sizes="(min-width: 1344px) 1240px, 100vw" className="object-cover" />
          </MediaReveal>
        )}

        <div className="grid gap-12 py-16 lg:grid-cols-[15rem_minmax(0,44rem)] lg:justify-center lg:gap-16 lg:py-20">
          {post.toc.length > 2 && (
            <aside className="hidden lg:block">
              <nav aria-label="Contents" className="sticky top-28">
                <p className="text-[0.75rem] font-medium text-faint">On this page</p>
                <ol className="mt-4 space-y-2.5 border-l border-line">
                  {post.toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-[0.8125rem] leading-snug text-muted hover:border-ink hover:text-ink">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
                <div className="mt-10 rounded-md bg-brand-soft p-5">
                  <p className="font-serif text-[1.25rem] leading-snug text-ink">Want this done for you?</p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">Our team handles SEO, websites and ads end to end.</p>
                  <ButtonLink href="/contact-us/" size="sm" className="mt-4">
                    Get a proposal
                  </ButtonLink>
                </div>
              </nav>
            </aside>
          )}
          <article className="prose-gf min-w-0 lg:col-start-2" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>

      <section className="border-t border-line py-20">
        <div className="container-x">
          <h2 className="font-serif text-h3 text-ink">Keep reading</h2>
          <Stagger className="ledger mt-8 rounded-md md:grid-cols-3">
            {related.map((p) => (
              <StaggerItem key={p.slug}>
                <PostCard post={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
