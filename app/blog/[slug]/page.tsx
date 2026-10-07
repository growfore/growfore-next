import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const API = "https://growfore.com/wp-json/wp/v2/posts"

interface WpPost {
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  modified: string
  _embedded?: Record<string, { source_url?: string }[]>
}

// ponytail: same live-feed caveat as the posts section — this 404s once the
// Next app replaces growfore.com. Point API at your own CMS then.
async function getPost(slug: string): Promise<WpPost | null> {
  try {
    const res = await fetch(`${API}?slug=${encodeURIComponent(slug)}&_embed`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const [post] = (await res.json()) as WpPost[]
    return post ?? null
  } catch {
    return null
  }
}

function plain(html: string) {
  return html.replace(/<[^>]*>/g, "").trim()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Post not found" }

  return {
    title: plain(post.title.rendered),
    description: plain(post.excerpt.rendered).slice(0, 160),
    openGraph: {
      title: plain(post.title.rendered),
      description: plain(post.excerpt.rendered).slice(0, 160),
      type: "article",
      publishedTime: post.date,
      images: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        ? [post._embedded["wp:featuredmedia"][0].source_url]
        : [],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const cover = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url

  return (
    <article className="bg-background px-6 py-28 text-foreground md:py-36">
      <div className="container-page">
        <Link
          href="/blogs"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          &larr; All posts
        </Link>

        <header className="mt-8 max-w-3xl">
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
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-pretty">
            {plain(post.title.rendered)}
          </h1>
        </header>

        {cover && (
          <div className="relative mt-12 aspect-[2/1] w-full overflow-hidden bg-muted">
            <Image
              src={cover}
              alt=""
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover"
            />
          </div>
        )}

        {/* Content is authored in WordPress, rendered verbatim. Strip scripts
            and inline handlers so injected markup cannot run on our origin. */}
        <div
          className="prose-neutral mt-12 max-w-3xl
            [&_a]:text-foreground [&_a]:underline
            [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:tracking-tight
            [&_h3]:mt-10 [&_h3]:text-xl
            [&_img]:mt-8 [&_img]:w-full [&_img]:rounded-lg
            [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6
            [&_p]:mt-5 [&_p]:leading-relaxed
            [&_table]:mt-8 [&_table]:w-full [&_td]:border [&_td]:border-border [&_td]:p-3
            [&_th]:border [&_th]:border-border [&_th]:p-3
            [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered
              .replace(/<script[\s\S]*?<\/script>/gi, "")
              .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
              .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
              .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
              .replace(/javascript:/gi, ""),
          }}
        />

        <div className="mt-20 border-t border-border pt-10">
          <p className="text-lg">
            Want this kind of search footprint for your business?{" "}
            <Link href="/contact-us" className="underline">
              Book a call
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  )
}