import type { Metadata } from "next";
import { CtaBand, PageHero, PostCard } from "@/components/sections";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — SEO, Web & Digital Marketing Guides",
  description: "Practical guides on SEO tools, websites, hosting and digital marketing in Nepal from the Growfore team.",
  alternates: { canonical: "/blogs/" },
};

export default function BlogIndex() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="From the Growfore blog."
        lede="Honest comparisons, step-by-step guides and what's actually working in search right now — written by the people running the campaigns."
      />
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="ledger">
            <PostCard post={featured} large />
          </div>
          <div className="ledger -mt-px sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
