import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostPage } from "@/components/post-page";
import { ServicePage } from "@/components/service-page";
import { allServices, getPost, getService, posts } from "@/lib/content";

// The old WordPress site served services and posts from the same flat namespace (/local-seo/,
// /semrush-vs-ahrefs/). One dynamic segment keeps every existing URL working.

export function generateStaticParams() {
  return [...allServices().map((s) => ({ slug: s.slug })), ...posts.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (service) {
    return {
      title: service.seoTitle ? { absolute: service.seoTitle } : `${service.title} in Nepal`,
      description: service.seoDescription || undefined,
      alternates: { canonical: `/${slug}/` },
    };
  }
  const post = getPost(slug);
  if (post) {
    return {
      title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
      description: post.description,
      alternates: { canonical: `/${slug}/` },
      openGraph: {
        type: "article",
        title: post.title,
        description: post.description,
        publishedTime: post.date,
        modifiedTime: post.modified,
        images: post.cover ? [post.cover] : undefined,
      },
    };
  }
  return {};
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (service) return <ServicePage service={service} />;
  const post = getPost(slug);
  if (post) return <PostPage post={post} />;
  notFound();
}
