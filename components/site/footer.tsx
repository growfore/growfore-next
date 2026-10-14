import Image from "next/image";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { HUB_META, HUBS, hubChildren, posts } from "@/lib/content";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-text">
      <div className="container-x grid gap-14 pt-20 pb-12 lg:grid-cols-[1fr_2fr] lg:gap-10 lg:pt-28">
        <div>
          <Image
            src="/wp-content/uploads/2025/06/growfore-logo-full.webp"
            alt="Growfore Solution"
            width={500}
            height={135}
            className="h-9 w-auto"
          />
          <p className="mt-10 max-w-sm font-serif text-[1.625rem] leading-[1.15] tracking-[-0.015em] text-white/45">
            Websites that sell.
            <br />
            <span className="text-white">Search that ranks.</span>
          </p>
          <ButtonLink href="/contact-us/" className="mt-8" size="sm">
            Work with us
          </ButtonLink>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {HUBS.map((hub) => (
            <FooterCol key={hub} title={HUB_META[hub].label} href={`/${hub}/`}>
              {hubChildren(hub).map((s) => (
                <FooterLink key={s.slug} href={`/${s.slug}/`}>
                  {s.title}
                </FooterLink>
              ))}
            </FooterCol>
          ))}
          <div className="space-y-12">
            <FooterCol title="Products">
              <FooterLink href="/tripeleven/">TripEleven</FooterLink>
            </FooterCol>
            <FooterCol title="Company">
              <FooterLink href="/about-us/">About us</FooterLink>
              <FooterLink href="/our-team/">Our team</FooterLink>
              <FooterLink href="/careers/">Careers</FooterLink>
              <FooterLink href="/blogs/">Blog</FooterLink>
              <FooterLink href="/contact-us/">Contact</FooterLink>
            </FooterCol>
            <FooterCol title="Reach us">
              <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
              <FooterLink href={site.phoneHref}>{site.phone}</FooterLink>
              <FooterLink href={site.mapsUrl}>New Rd, Pokhara</FooterLink>
            </FooterCol>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-4 border-t border-ink-line py-6 text-[0.8125rem] text-ink-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>© <CopyrightYear /> {site.name}</span>
            <Link href="/privacy-policy/" className="hover:text-white">
              Privacy Policy
            </Link>
            <span>{posts.length} guides on the blog</span>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.8125rem] font-medium text-white">
        {href ? (
          <Link href={href} className="hover:text-brand">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const cls = "text-[0.875rem] text-ink-muted transition-colors hover:text-white";
  return (
    <li>
      {external ? (
        <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </li>
  );
}

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
