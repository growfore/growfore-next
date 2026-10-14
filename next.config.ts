import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // WordPress served every page at /slug/ — keep the same URLs so rankings and backlinks survive.
  trailingSlash: true,
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      { source: "/portfolio/", destination: "/about-us/", permanent: true },
      { source: "/blog/", destination: "/blogs/", permanent: true },
      { source: "/category/:path*", destination: "/blogs/", permanent: true },
      { source: "/author/:path*", destination: "/our-team/", permanent: true },
    ];
  },
  experimental: {
    // Vercel restores .next/cache between deploys, and the Tailwind loader's inputs (globals.css
    // and the scanned sources) aren't tracked by the Turbopack build cache, so it shipped stale CSS.
    turbopackFileSystemCacheForBuild: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
