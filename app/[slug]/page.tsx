import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import WpContent from "@/components/wp-content"
import { getPage, plain } from "@/lib/wp"

// growfore.com serves services at flat paths (/local-seo/), and the nav,
// footer and live site all link to them. Keeping the flat URLs preserves the
// existing link graph; app/blog/[slug] handles posts.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return { title: "Not found" }

  const description = plain(page.excerpt.rendered).slice(0, 160)
  return {
    title: plain(page.title.rendered),
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: plain(page.title.rendered),
      description,
      type: "article",
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  const summary = plain(page.excerpt.rendered)

  return (
    <article className="bg-background px-6 py-28 text-foreground md:py-36">
      <div className="container-page">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Growfore
        </p>

        <header className="mt-6 max-w-3xl">
          <h1 className="text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-pretty">
            {plain(page.title.rendered)}
          </h1>
          {summary && (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {summary}
            </p>
          )}
        </header>

        <WpContent html={page.content.rendered} />

        <div className="mt-20 max-w-3xl border-t border-border pt-10">
          <p className="text-lg">
            Want this done properly?{" "}
            <Link href="/contact-us" className="underline">
              Book a call
            </Link>{" "}
            — we&apos;ll audit what you have and tell you the first three things
            to fix.
          </p>
        </div>
      </div>
    </article>
  )
}
