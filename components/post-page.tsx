import Image from "next/image";
import Link from "next/link";
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
      <header className="bg-ink text-ink-text">
        <div className="container-x pt-14 pb-16 lg:pt-20 lg:pb-20">
          <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-ink-muted">
            <Link href="/blogs/" className="hover:text-white">
              Blog
            </Link>
          </nav>
          <h1 className="mt-6 max-w-4xl font-serif text-h1 text-balance text-white">{post.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted">{post.description}</p>
          <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-ink-muted">
            <span>Growfore Team</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingMinutes} min read</span>
          </p>
        </div>
      </header>

      <div className="container-x">
        {post.cover && (
          <div className="relative -mt-px aspect-[2/1] max-h-[34rem] w-full overflow-hidden rounded-b-sm bg-ink-2 lg:aspect-[21/9]">
            <Image src={post.cover} alt="" fill priority sizes="(min-width: 1344px) 1240px, 100vw" className="object-cover" />
          </div>
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
                <div className="mt-10 rounded-sm bg-ink p-5 text-ink-text">
                  <p className="font-serif text-[1.25rem] leading-snug text-white">Want this done for you?</p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">Our team handles SEO, websites and ads end to end.</p>
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
          <div className="ledger mt-8 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
