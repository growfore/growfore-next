import type { Metadata, Viewport } from "next";
import { Google_Sans } from "next/font/google";
import Link from "next/link";
import { MotionProvider } from "@/components/motion";
import { Footer } from "@/components/site/footer";
import { Header, type NavGroup, type NavPost } from "@/components/site/header";
import { formatDate, HUB_META, HUBS, hubChildren, posts, reviews } from "@/lib/content";
import { site } from "@/lib/site";
import "./globals.css";
import { ArrowRight } from "lucide-react";

const googleSans = Google_Sans({ variable: "--font-google-sans", subsets: ["latin"], display: "swap" });

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

export const viewport: Viewport = { themeColor: "#f7f5f2" };

const nav: NavGroup[] = HUBS.map((hub) => ({
  label: HUB_META[hub].label,
  href: `/${hub}/`,
  blurb: HUB_META[hub].blurb,
  items: hubChildren(hub).map((s) => ({ label: s.title, href: `/${s.slug}/` })),
}));

const navPosts: NavPost[] = posts.slice(0, 3).map((p) => ({ title: p.title, href: `/${p.slug}/`, date: formatDate(p.date) }));

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
    <html lang="en" className={googleSans.variable}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <div className="border-b border-line bg-card text-center text-[0.8125rem] text-ink">
          <Link href={`/${latest.slug}/`} className="container-x flex h-9 items-center justify-center gap-2 truncate">
            <span className="truncate">{latest.title}</span>
            <span className="hidden items-center gap-1 text-muted sm:inline-flex">
              Read the guide <ArrowRight className="size-3.5" strokeWidth={1.75} aria-hidden />
            </span>
          </Link>
        </div>
        <MotionProvider>
          <Header services={nav} posts={navPosts} />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
