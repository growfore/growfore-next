"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export interface WhyItem {
  title: string
  body: string
  image: string
}

export default function WhySection({ items }: { items: WhyItem[] }) {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = stepRefs.current.indexOf(entry.target as HTMLElement)
          if (index !== -1) setActive(index)
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )

    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-background py-28 text-foreground md:py-36">
      <div
        data-reveal
        className="container-page grid gap-16 md:grid-cols-2 md:gap-24"
      >
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Why Growfore
          </p>
          <h2 className="mt-6 max-w-md text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight text-pretty">
            Why clients stay past the first quarter.
          </h2>

          <div className="mt-12">
            {items.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  stepRefs.current[index] = el
                }}
                className="flex min-h-[45vh] flex-col justify-center py-10"
              >
                <div
                  className={
                    active === index
                      ? "opacity-100"
                      : "opacity-35 transition-opacity duration-300"
                  }
                >
                  <h3 className="text-2xl leading-tight text-balance md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="sticky top-28 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
            {items.map((item, index) => (
              <div
                key={item.image}
                aria-hidden={active !== index}
                className={
                  active === index
                    ? "absolute inset-0 opacity-100 transition-opacity duration-500"
                    : "absolute inset-0 opacity-0 transition-opacity duration-500"
                }
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
