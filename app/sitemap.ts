import type { MetadataRoute } from "next";
import { allServices, posts } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "services", "about-us", "our-team", "careers", "contact-us", "blogs", "privacy-policy", "tripeleven"];
  return [
    ...pages.map((p) => ({ url: `${site.url}/${p ? p + "/" : ""}`, priority: p ? 0.6 : 1 })),
    ...allServices().map((s) => ({ url: `${site.url}/${s.slug}/`, priority: s.kind === "hub" ? 0.9 : 0.8 })),
    ...posts.map((p) => ({ url: `${site.url}/${p.slug}/`, lastModified: p.modified, priority: 0.6 })),
  ];
}
