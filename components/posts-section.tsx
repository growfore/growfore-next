import Image from "next/image"
import Link from "next/link"

interface Post {
  title: string
  date: string
  excerpt: string
  image: string | undefined
  href: string
}

const FEED = "https://growfore.com/wp-json/wp/v2/posts?per_page=3&_embed"

// WordPress hands back escaped HTML — strip tags, then numeric/named entities.
function plain(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(+code))
    .replace(
      /&(amp|nbsp|quot|apos|lt|gt|hellip|rsquo|lsquo|rdquo|ldquo|mdash|ndash);/g,
      (_, name: string) =>
        ({
          amp: "&",
          nbsp: " ",
          quot: '"',
          apos: "'",
          lt: "<",
          gt: ">",
          hellip: "…",
          rsquo: "’",
          lsquo: "‘",
          rdquo: "”",
          ldquo: "“",
          mdash: "—",
          ndash: "–",
        })[name] ?? ""
    )
    .trim()
}

// ponytail: live WordPress feed, revalidated hourly. At launch this app
// replaces growfore.com, so /wp-json will 404 — the catch keeps the build
// green and the section simply hides. Swap FEED for your own CMS then.
async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(FEED, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const raw = (await res.json()) as {
      title: { rendered: string }
      date: string
      excerpt: { rendered: string }
      link: string
      _embedded?: Record<string, { source_url?: string }[]>
    }[]
    return raw.map((p) => ({
      title: p.title.rendered,
      date: p.date,
      excerpt: plain(p.excerpt.rendered),
      image: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
      href: p.link,
    }))
  } catch {
    return []
  }
}

export default async function PostsSection() {
  const posts = await getPosts()

  return (
    <section className="bg-background py-28 text-foreground md:py-36">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              From the blog
            </p>
            <h2 className="mt-6 max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight text-pretty">
              What we are writing about.
            </h2>
          </div>
          <Link
            href="/blogs"
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            View all posts
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </div>

        {posts.length > 0 && (
          <div
            data-reveal
            className="mt-16 grid grid-cols-1 border-t border-l border-border md:grid-cols-3"
          >
            {posts.map((post) => (
              <article
                key={post.href}
                className="flex flex-col border-r border-b border-border"
              >
                <Link
                  href={post.href}
                  className="group lift flex flex-1 flex-col"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <time
                      dateTime={post.date}
                      className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase"
                    >
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <h3 className="mt-4 text-xl leading-snug text-balance">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
