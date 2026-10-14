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
