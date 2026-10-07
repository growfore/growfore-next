"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { NavigationMenuDemo } from "../molecules/navigation-menu"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background/70 text-foreground backdrop-blur-md transition-colors duration-300 supports-[backdrop-filter]:bg-background/60",
        scrolled && "bg-background/90 shadow-[0_1px_0_0_var(--border)]"
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Image
          src="/growfore-logo-full.png"
          alt="Growfore"
          width={150}
          height={40}
          className="h-10 w-auto"
          priority
        />
        <NavigationMenuDemo />
        <div className="flex gap-2">
          <Button className={"p-4 px-6"}>Get Started</Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
