import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { LucideArrowRight } from "lucide-react"

const features = [
  {
    title: "A trip builder that asks the right questions",
    body: "Guided steps for itinerary, altitude, capacity, pricing tiers and FAQs — instead of one long form nobody finishes.",
  },
  {
    title: "AI drafts, your team finishes",
    body: "Drop in your trip topics, get day-by-day itineraries back in one batch. Every draft opens in the editor for a human pass before it goes live.",
  },
  {
    title: "Your domain, with the SEO already done",
    body: "Canonicals, sitemap, schema markup, and a 301 redirect whenever a trip slug changes — so rankings survive the edits.",
  },
  {
    title: "Inquiries and bookings in the same place",
    body: "Every trip takes enquiries by email or WhatsApp, tracked from first click to confirmed booking. Nothing lands in a personal inbox and disappears.",
  },
]

export default function ProductSection() {
  return (
    <section className="bg-background py-28 text-foreground md:py-36">
      <div className="container-page">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Our product — TripEleven
        </p>

        <div data-reveal className="mt-8 grid gap-14 md:grid-cols-2 md:gap-24">
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight text-pretty">
              We built the tool we wanted as an agency.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Most trekking agencies run a website, a booking tool and a
              spreadsheet that disagrees with both. TripEleven is one place to
              build trips, publish the site, and catch the enquiry.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://app.tripeleven.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  size: "lg",
                  className: "p-4 px-6",
                })}
              >
                Start free
              </a>
              <a
                href="https://walkthroughnepal.com"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "p-4 px-6",
                })}
              >
                See a live site
                <LucideArrowRight />
              </a>
            </div>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
            <Image
              src="/mockups/tripeleven-itinerary-form.webp"
              alt="TripEleven trip editor with a drag-and-drop day-by-day itinerary"
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        <div
          data-reveal
          className="mt-20 grid grid-cols-1 border-t border-l border-border md:grid-cols-2"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="lift border-r border-b border-border p-8"
            >
              <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground/60">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 max-w-xs text-xl leading-snug text-balance">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
