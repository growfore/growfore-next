import { NextResponse, type NextRequest } from "next/server";
import slugs from "@/content/slugs.json";

// app/[slug] is prerendered for every known service and post. Under Cache Components an unknown slug
// would stream a not-found page with HTTP 200 (a soft 404), so reject unknown slugs here, before render.
const known = new Set<string>([
  ...slugs,
  // static routes, redirects and metadata files at the top level
  ...["services", "about-us", "our-team", "careers", "contact-us", "blogs", "privacy-policy", "tripeleven"],
  ...["portfolio", "blog", "sitemap.xml", "robots.txt", "icon.png", "favicon.ico"],
]);

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/").filter(Boolean)[0];
  if (slug && !known.has(slug)) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:slug",
};
