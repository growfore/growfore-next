import { sanitize } from "@/lib/wp"

// Styles WordPress-authored HTML without a prose plugin dependency.
export default function WpContent({ html }: { html: string }) {
  return (
    <div
      className="wp-content mt-12 max-w-3xl [&_a]:underline [&_blockquote]:mt-8 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-6 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_details]:mt-6 [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:tracking-tight [&_h3]:mt-10 [&_h3]:scroll-mt-28 [&_h3]:text-xl [&_h4]:mt-8 [&_h4]:font-semibold [&_hr]:mt-10 [&_iframe]:mt-8 [&_iframe]:aspect-video [&_iframe]:w-full [&_img]:mt-8 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-lg [&_li]:my-1 [&_li]:leading-relaxed [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6 [&_p]:mt-5 [&_p]:leading-relaxed [&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_strong]:font-semibold [&_table]:mt-8 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_td]:border [&_td]:border-border [&_td]:p-3 [&_th]:border [&_th]:border-border [&_th]:p-3 [&_th]:text-left [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6"
      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
    />
  )
}
