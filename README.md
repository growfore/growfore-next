# growfore.com

Redesign of growfore.com — Next.js 16 (App Router, Cache Components) + Tailwind CSS v4. Visual direction follows v7labs.com: charcoal statement sections, warm off-white content, editorial serif headlines (Newsreader) over Inter, hairline "ledger" grids, one accent (Growfore sky blue).

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

## Content

All content was migrated from the old WordPress site and lives in `content/*.json` — no WordPress or database at runtime.

| file | source |
| --- | --- |
| `services.json` | 20 service pages (3 hubs, 17 leaves) parsed from Elementor data |
| `posts.json` | 26 published blog posts, sanitized HTML, TOC, reading time |
| `reviews.json` | Google reviews stored by the old reviews plugin |
| `team.json`, `clients.json`, `privacy.json`, `slugs.json` | team page, client logos, privacy policy, slug index for `proxy.ts` |

Images referenced by content are copied to `public/wp-content/uploads/…` with their original paths, so old image URLs keep working.

To re-run the migration (needs the SQL dump and the extracted `wp-content/uploads`):

```bash
python3 -m venv .venv && .venv/bin/pip install ftfy beautifulsoup4
python3 -I scripts/migrate-wp/parse_posts.py grow_fore.sql /tmp/wp/wp.json
python3 -I scripts/migrate-wp/extract_services.py /tmp/wp
.venv/bin/python -I scripts/migrate-wp/migrate.py /tmp/wp /path/to/wp-content/uploads .
```

## URLs

WordPress used `/%postname%/`, so services and posts share one flat namespace (`/local-seo/`, `/semrush-vs-ahrefs/`). `app/[slug]` serves both, `trailingSlash: true` matches the old URLs exactly, and `proxy.ts` returns a real 404 for unknown slugs.

## Contact form

`app/contact-us/actions.ts` POSTs submissions as JSON to `CONTACT_WEBHOOK_URL` (Formspree, Make, Zapier, a Worker…). Without it the form shows an error pointing to info@growfore.com — set it before launch.

## Products

`lib/products.ts` holds TripEleven's copy and the list of live client sites — it mirrors tripeleven.com, so update both together. Client site screenshots live in `public/products/tripeleven/sites/` (captured from the live sites; re-capture when they change). The product page is `app/tripeleven/`, and the home page section is `TripElevenFeature` in `components/tripeleven.tsx`.

> If a change to `app/globals.css` (e.g. a `@theme` token) doesn't show up after `pnpm build`, delete `.next/` and rebuild — Turbopack's persistent cache occasionally keeps the old stylesheet.
