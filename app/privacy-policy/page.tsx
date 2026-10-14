import type { Metadata } from "next";
import { PageHero } from "@/components/sections";
import { formatDate, privacy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Growfore collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow={`Last updated ${formatDate(privacy.modified)}`} title="Privacy Policy" />
      <div className="container-x py-16 lg:py-24">
        <article className="prose-gf mx-auto max-w-[44rem]" dangerouslySetInnerHTML={{ __html: privacy.html }} />
      </div>
    </>
  );
}
