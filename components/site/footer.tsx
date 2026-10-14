import Image from "next/image";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { BrandIcon } from "@/components/brand-icons";
import { HUB_META, HUBS, hubChildren } from "@/lib/content";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui";

export function Footer() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="container-x grid gap-14 pt-20 pb-12 lg:grid-cols-[1fr_2fr] lg:gap-10 lg:pt-28">
        <div>
          <Image src="/wp-content/uploads/2025/04/growforelogo.webp" alt="Growfore Solution" width={923} height={270} className="h-9 w-auto" />
          <p className="mt-10 max-w-sm font-serif text-[1.625rem] leading-[1.15] tracking-[-0.015em] text-ink/40">
            Websites that sell.
            <br />
            <span className="text-ink">Search that ranks.</span>
          </p>
          <ButtonLink href="/contact-us/" className="mt-8" size="sm">
            Work with us
          </ButtonLink>
          <SocialLinks className="mt-10" />
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
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line py-6 text-[0.8125rem] text-muted">
          <span>
            © <CopyrightYear /> {site.name}
          </span>
          <Link href="/privacy-policy/" className="hover:text-ink">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

/** Brand-coloured social icons; label is for screen readers and the hover tooltip. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {site.social.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Growfore on ${s.label}`}
            title={s.label}
            className="grid size-10 place-items-center rounded-full border border-line bg-card transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ink/30"
          >
            <BrandIcon name={s.label} className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function FooterCol({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.8125rem] font-medium text-ink">
        {href ? (
          <Link href={href} className="hover:text-brand-ink">
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
  const cls = "text-[0.875rem] text-muted transition-colors hover:text-ink";
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
