import Image from "next/image"
import Link from "next/link"

const columns: { heading: string; links: { label: string; href: string }[] }[] =
  [
    {
      heading: "Web Services",
      links: [
        { label: "Web Services", href: "/web-services" },
        { label: "Wordpress Development", href: "/wordpress-development" },
        {
          label: "Domain Registration with Web Hosting",
          href: "/domain-registration-with-web-hosting",
        },
        { label: "Wordpress SEO", href: "/wordpress-seo" },
        {
          label: "Ecommerce Website Development",
          href: "/ecommerce-website-development",
        },
        {
          label: "Web Application Development",
          href: "/web-application-development",
        },
        { label: "Mobile App Development", href: "/mobile-app-development" },
        { label: "Custom CMS Website", href: "/custom-cms-website" },
        { label: "UI/UX Design", href: "/ui-ux-design" },
      ],
    },
    {
      heading: "SEO Services",
      links: [
        { label: "SEO Services", href: "/seo-services" },
        { label: "SEO Audit", href: "/seo-audit" },
        { label: "Local SEO", href: "/local-seo" },
        { label: "Keyword Research", href: "/keyword-research" },
        { label: "On-Page SEO", href: "/on-page-seo" },
        { label: "Off-Page SEO", href: "/off-page-seo" },
        { label: "Technical SEO", href: "/technical-seo" },
        { label: "Content Optimization", href: "/content-optimization" },
      ],
    },
    {
      heading: "Ads Services",
      links: [
        { label: "Ads Services", href: "/ads-services" },
        {
          label: "Google Local Service Ads (LSAs)",
          href: "/google-local-service-ads",
        },
        { label: "Google Ads", href: "/google-ads" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About us", href: "/about-us" },
        { label: "Our Work", href: "/portfolio" },
        { label: "Our Team", href: "/our-team" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact-us" },
      ],
    },
    {
      heading: "More",
      links: [
        { label: "TripEleven", href: "https://tripeleven.com" },
        { label: "Blog", href: "/blogs" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Get a Proposal", href: "/contact-us" },
      ],
    },
  ]

const socials = [
  { label: "Facebook", href: "https://facebook.com/growfore" },
  { label: "Instagram", href: "https://instagram.com/growfore" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/growfore/" },
]

export default function Footer() {
  return (
    <footer className="bg-background pt-24 pb-16 text-foreground">
      <div className="container-page">
        <div className="flex flex-col gap-10 border-b border-border pb-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Image
              src="/growfore-logo-full.png"
              alt="Growfore"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-6 leading-relaxed text-muted-foreground">
              We focus on the needs of small to middle market businesses to
              improve and grow their return.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <a href="tel:+9779856085151" className="text-lg hover:underline">
              +977 9856085151
            </a>
            <div className="flex gap-5 text-sm text-muted-foreground">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground hover:underline"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5"
        >
          {columns.map((column) => (
            <div key={column.heading}>
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {column.heading}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-sweep text-sm"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; Copyright {new Date().getFullYear()} Growfore Solution</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact-us"
              className="hover:text-foreground hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
