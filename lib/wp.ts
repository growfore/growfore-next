// Single access point for the WordPress REST feed on growfore.com.
// ponytail: at launch this app replaces growfore.com, so /wp-json goes away.
// Swap WP_ORIGIN for your own CMS and these routes keep working.

const WP_ORIGIN = "https://growfore.com"
const API = `${WP_ORIGIN}/wp-json/wp/v2`
const REVALIDATE = 3600

export interface WpRendered {
  rendered: string
}

interface WpBase {
  slug: string
  title: WpRendered
  excerpt: WpRendered
  content: WpRendered
  date: string
  modified: string
  link: string
  _embedded?: Record<string, { source_url?: string }[]>
}

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      next: { revalidate: REVALIDATE },
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

async function getOne(path: string) {
  const rows = await get<WpBase[]>(path)
  return rows?.[0] ?? null
}

export function getPage(slug: string) {
  return getOne(`/pages?slug=${encodeURIComponent(slug)}`)
}

export function getPost(slug: string) {
  return getOne(`/posts?slug=${encodeURIComponent(slug)}&_embed`)
}

export function listPosts(perPage = 12) {
  return get<WpBase[]>(`/posts?per_page=${perPage}&_embed`)
}

export function coverOf(item: WpBase) {
  return item._embedded?.["wp:featuredmedia"]?.[0]?.source_url
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  nbsp: " ",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  mdash: "—",
  ndash: "–",
}

// WP returns escaped HTML; strip tags then numeric and common named entities.
export function plain(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(+code))
    .replace(
      /&(amp|nbsp|quot|apos|lt|gt|hellip|rsquo|lsquo|rdquo|ldquo|mdash|ndash);/g,
      (_, name: string) => NAMED_ENTITIES[name] ?? ""
    )
    .replace(/\s+/g, " ")
    .trim()
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// Content is authored in WordPress and rendered verbatim, so strip anything
// executable before it reaches the DOM: scripts, frames, inline handlers and
// javascript: URLs.
export function sanitize(html: string) {
  return toFlow(html)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "")
}

// WordPress serves service/blog bodies as Elementor output: ~90KB of divs
// whose classes only resolve against the old theme's stylesheet. Porting that
// markup verbatim gives broken layout, so strip the skin and keep the words —
// unwrap layout tags, drop every presentational attribute. ponytail: regex
// HTML rewriting, fine for WP output; move to a parser if bodies gain inline
// widgets that survive this pass.
const DROP_BLOCKS = [
  "script",
  "style",
  "iframe",
  "noscript",
  "form",
  "input",
  "button",
  "select",
  "textarea",
  "svg",
  "picture",
  "source",
  "video",
  "audio",
]

const UNWRAP = new Set([
  "div",
  "span",
  "section",
  "header",
  "footer",
  "main",
  "aside",
  "nav",
  "article",
  "figure",
  "figcaption",
  "u",
  "small",
  "label",
])

const KEEP_ATTRS = [
  "href",
  "src",
  "srcset",
  "sizes",
  "alt",
  "title",
  "width",
  "height",
  "datetime",
]

export function toFlow(html: string) {
  let out = html

  for (const tag of DROP_BLOCKS) {
    out = out.replace(new RegExp(`<${tag}\\b[\\s\\S]*?</${tag}>`, "gi"), "")
    out = out.replace(new RegExp(`<${tag}\\b[^>]*\\/?>`, "gi"), "")
  }

  // Lazy-loading placeholders from WP: keep the real src, drop the data URI.
  out = out.replace(
    /<img\b[^>]*data-src="([^"]+)"[^>]*>/gi,
    (_, src: string) => `<img src="${src}" alt="">`
  )
  out = out.replace(/<img\b[^>]*src="data:[^"]*"[^>]*>/gi, "")

  // Keep only href/src/alt and friends; drop class, style, id and data-*.
  out = out.replace(
    /<([a-z][a-z0-9]*)\b([^>]*)>/gi,
    (match, tag: string, attrs: string) => {
      const kept = KEEP_ATTRS.map((name) => {
        const found = attrs.match(
          new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, "i")
        )
        return found ? ` ${name}="${found[1]}"` : ""
      }).join("")
      return `<${tag}${kept}>`
    }
  )

  // Elementor drops an in-page anchor menu into the body. It is not content,
  // so drop lists whose every item is just a same-page link.
  out = out.replace(/<ul\b[^>]*>(?:(?!<\/ul>)[\s\S])*?<\/ul>/gi, (block) => {
    const items = block.match(/<li\b[^>]*>[\s\S]*?<\/li>/gi) ?? []
    if (!items.length) return block
    const allAnchors = items.every((li) => {
      const label = li.replace(/<[^>]*>/g, "").trim()
      const href = li.match(/href="(#[^"]*)"/i)?.[1]
      return Boolean(href) && !label
    })
    return allAnchors ? "" : block
  })

  // Unwrap layout containers, then close any stray tags they left behind.
  for (const tag of UNWRAP) {
    out = out.replace(new RegExp(`</?${tag}\\b[^>]*>`, "gi"), "")
  }

  return out
    .replace(/<p>\s*(?:<br\s*\/?>)?\s*<\/p>/gi, "")
    .replace(/<br\s*\/?>/gi, "<br />")
    .trim()
}
