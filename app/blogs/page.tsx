import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { coverOf, formatDate, listPosts, plain } from "@/lib/wp"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical writing on local SEO, technical SEO, WordPress and paid search from the Growfore team.",
  alternates: { canonical: "/blogs" },
}

export default async function BlogsPage() {
  const posts = (await listPosts(12)) ?? []

  return (
    <div className="bg-background px-6 py-28 text-foreground md:py-36">
      <div className="container-page">
        <header className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Blog
          </p>
          <h1 className="mt-6 text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-pretty">
            Writing about search, sites and ads.
          </h1>
        </header>

        {posts.length === 0 ? (
          <p className="mt-16 text-muted-foreground">
            No posts available right now.
          </p>
        ) : (
          <div className="mt-16 grid grid-cols-1 border-t border-l border-border md:grid-cols-3">
            {posts.map((post) => {
              const cover = coverOf(post)
              return (
                <article
                  key={post.slug}
                  className="border-r border-b border-border"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col"
                  >
                    <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
                      {cover && (
                        <Image
                          src={cover}
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
                        {formatDate(post.date)}
                      </time>
                      <h2 className="mt-4 text-xl leading-snug text-balance">
                        {plain(post.title.rendered)}
                      </h2>
                      <p className="mt-3 line-clamp-3 leading-relaxed text-muted-foreground">
                        {plain(post.excerpt.rendered)}
                      </p>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
