// Content migrated from the old WordPress site (see scripts/migrate-wp). Everything is static JSON
// so the site builds without WordPress or a database.
import servicesJson from "@/content/services.json";
import postsJson from "@/content/posts.json";
import teamJson from "@/content/team.json";
import clientsJson from "@/content/clients.json";
import reviewsJson from "@/content/reviews.json";
import privacyJson from "@/content/privacy.json";

export type Deliverable = {
  id: string;
  title: string;
  icon: string | null;
  body: string;
  included: string[];
  outcome: string;
};

export type Service = {
  slug: string;
  title: string;
  kind: "hub" | "leaf";
  parent?: string;
  children?: string[];
  eyebrow?: string;
  headline?: string;
  intro?: string;
  sectionTitle?: string;
  sectionBody?: string;
  deliverables: Deliverable[];
  why?: {
    eyebrow: string;
    title: string;
    body: string;
    subtitle: string;
    points: string[];
    closing: string;
  };
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
};

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  modified: string;
  cover: string | null;
  readingMinutes: number;
  toc: { id: string; text: string }[];
  html: string;
};

// A few headings on the old site were typed in caps with typos; tidy them once here.
const COPY_FIXES: [RegExp, string][] = [
  [/WEBSTIES/g, "WEBSITES"],
  [/SERVCIES/g, "SERVICES"],
  [/APPS THAT RUNS/g, "APPS THAT RUN"],
  [/DESIGN THAT DO MORE THAT LOOK/g, "DESIGN THAT DOES MORE THAN LOOK"],
  [/Your Websites isn't/g, "Your Website Isn't"],
  [/Googles Language/g, "Google's Language"],
  [/WEBSITES THAT BRINGS/g, "WEBSITES THAT BRING"],
  [/Wordpress/g, "WordPress"],
];
const tidy = (s = "") => COPY_FIXES.reduce((acc, [re, to]) => acc.replace(re, to), s).replace(/\s*\n\s*/g, " ");

const services = Object.fromEntries(
  Object.entries(servicesJson as unknown as Record<string, Service>).map(([k, s]) => [
    k,
    {
      ...s,
      title: tidy(s.title),
      deliverables: s.deliverables.map((d) => ({ ...d, title: tidy(d.title), included: d.included.map(tidy) })),
      eyebrow: tidy(s.eyebrow),
      headline: tidy(s.headline),
      why: s.why && { ...s.why, eyebrow: tidy(s.why.eyebrow), title: tidy(s.why.title) },
    },
  ]),
) as Record<string, Service>;

export const HUBS = ["web-services", "seo-services", "ads-services"] as const;

export const HUB_META: Record<(typeof HUBS)[number], { label: string; short: string; blurb: string }> = {
  "web-services": {
    label: "Web Services",
    short: "Web",
    blurb: "Websites, stores and apps built to turn visitors into customers.",
  },
  "seo-services": {
    label: "SEO Services",
    short: "SEO",
    blurb: "Rank for the searches your customers actually make — locally and beyond.",
  },
  "ads-services": {
    label: "Ads Management",
    short: "Ads",
    blurb: "Google Ads and Local Service Ads that turn spend into calls and sales.",
  },
};

// Hub deliverable anchors that correspond to a dedicated leaf page.
const DELIVERABLE_TO_SLUG: Record<string, string> = {
  "uiux-design": "ui-ux-design",
  "domain-registration-and-web-hosting": "domain-registration-with-web-hosting",
  "wordpress-with-seo": "wordpress-seo",
};

export function deliverableHref(id: string): string | null {
  const slug = DELIVERABLE_TO_SLUG[id] ?? id;
  return services[slug] ? `/${slug}/` : null;
}

export const getService = (slug: string): Service | undefined => services[slug];
export const allServices = (): Service[] => Object.values(services);
export const hubChildren = (hub: string): Service[] =>
  (services[hub]?.children ?? []).map((s) => services[s]).filter(Boolean);

export const posts = postsJson as Post[];
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const team = teamJson as { name: string; role: string; photo: string | null }[];
export const clients = clientsJson as { name: string; logo: string | null }[];
export const reviews = reviewsJson as {
  rating: number;
  count: number;
  url: string;
  items: { author: string; rating: number; text: string; time: number }[];
};
export const privacy = privacyJson as { modified: string; html: string };

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
