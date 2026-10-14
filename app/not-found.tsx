import { PageHero } from "@/components/sections";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page didn't rank." lede="The page you're looking for has moved or never existed. Try the services overview or the blog.">
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/services/" variant="outline">
          Services
        </ButtonLink>
        <ButtonLink href="/blogs/" variant="outline">
          Blog
        </ButtonLink>
      </div>
    </PageHero>
  );
}
