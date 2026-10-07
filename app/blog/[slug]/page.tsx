import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import WpContent from "@/components/wp-content"
import { coverOf, formatDate, getPost, plain } from "@/lib/wp"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Post not found" }

  const description = plain(post.excerpt.rendered).slice(0, 160)
  const cover = coverOf(post)

  return {
    title: plain(post.title.rendered),
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: plain(post.title.rendered),
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: cover ? [cover] : [],
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

  const cover = coverOf(post)

  return (
    <article className="bg-background px-6 py-28 text-foreground md:py-36">
      <div className="container-page">
        <Link
          href="/blogs"
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
          All posts
        </Link>

        <header className="mt-8 max-w-3xl">
          <time
            dateTime={post.date}
            className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-pretty">
            {plain(post.title.rendered)}
          </h1>
        </header>

        {cover && (
          <div className="relative mt-12 aspect-[2/1] w-full overflow-hidden rounded-xl bg-muted">
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

        <WpContent html={post.content.rendered} toc />

        <div className="mt-20 max-w-3xl border-t border-border pt-10">
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
