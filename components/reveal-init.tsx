"use client"

import { useEffect } from "react"

// Scroll reveals. Marks the document ready before hiding anything so content
// still shows if JS never runs, and respects prefers-reduced-motion in CSS.
export default function RevealInit() {
  useEffect(() => {
    const root = document.documentElement
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]")

    if (!targets.length) return

    root.classList.add("reveal-ready")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-revealed")
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      root.classList.remove("reveal-ready")
    }
  }, [])

  return null
}
