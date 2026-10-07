"use client"

import { useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  image: string
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const railRef = useRef<HTMLDivElement>(null)

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.firstElementChild as HTMLElement | null
    if (!card) return
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0
    rail.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    })
  }, [])

  return (
    <section className="py-28 md:py-36">
      <div className="container-page">
        <div className="flex items-start justify-between gap-8">
          <div>
            <h2 className="max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight text-pretty">
              What clients say after a few months.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Nothing we write ourselves.
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous testimonials"
              className="grid size-10 place-items-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next testimonials"
              className="grid size-10 place-items-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          data-reveal
          ref={railRef}
          role="region"
          aria-label="Client testimonials"
          tabIndex={0}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {items.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex w-[85%] shrink-0 snap-start flex-col sm:w-[360px]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <Image
                  src={testimonial.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 85vw, 360px"
                  className="object-cover"
                />
              </div>

              <blockquote className="mb-6 text-lg leading-relaxed text-balance">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-auto border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">
                  {testimonial.name}
                </span>
                <span
                  aria-hidden="true"
                  className="mx-2 text-muted-foreground/50"
                >
                  |
                </span>
                <span>
                  {testimonial.role}, {testimonial.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
