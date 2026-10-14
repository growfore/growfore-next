import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Header, type NavGroup } from "@/components/site/header";
import { HUB_META, HUBS, hubChildren, posts, reviews } from "@/lib/content";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Website Design & SEO Agency in Nepal | Growfore",
    template: "%s | Growfore",
  },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.png" },
};

export const viewport: Viewport = { themeColor: "#161616" };

const nav: NavGroup[] = HUBS.map((hub) => ({
  label: HUB_META[hub].label,
  href: `/${hub}/`,
  blurb: HUB_META[hub].blurb,
  items: hubChildren(hub).map((s) => ({ label: s.title, href: `/${s.slug}/` })),
}));

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  logo: `${site.url}/wp-content/uploads/2025/04/growforelogo.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "New Rd",
    addressLocality: "Pokhara",
    postalCode: "33700",
    addressCountry: "NP",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: reviews.rating, reviewCount: reviews.count },
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const latest = posts[0];
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <div className="bg-[#0f0f0f] text-center text-[0.8125rem] text-white">
          <Link href={`/${latest.slug}/`} className="container-x flex h-9 items-center justify-center gap-2 truncate">
            <span className="truncate">{latest.title}</span>
            <span className="hidden text-ink-muted sm:inline">Read the guide →</span>
          </Link>
        </div>
        <Header services={nav} />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
