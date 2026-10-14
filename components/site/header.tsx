"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink, cx } from "@/components/ui";

export type NavGroup = { label: string; href: string; blurb: string; items: { label: string; href: string }[] };

const company = [
  { label: "About us", href: "/about-us/" },
  { label: "Our team", href: "/our-team/" },
  { label: "Careers", href: "/careers/" },
  { label: "Contact", href: "/contact-us/" },
];

export function Header({ services }: { services: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // close the mobile menu after navigating (adjust state during render, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 text-white transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-ink-line bg-ink/85 backdrop-blur-xl" : "border-b border-transparent bg-ink",
      )}
    >
      <div className="container-x flex h-16 items-center gap-8 lg:h-[4.5rem]">
        <Link href="/" className="shrink-0" aria-label="Growfore home">
          <Image
            src="/wp-content/uploads/2025/06/growfore-logo-full.webp"
            alt="Growfore Solution"
            width={500}
            height={135}
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <Dropdown label="Services" href="/services/">
            <div className="grid w-[46rem] grid-cols-3 gap-px bg-ink-line">
              {services.map((g) => (
                <div key={g.href} className="bg-ink-2 p-5">
                  <Link href={g.href} className="group block">
                    <span className="font-serif text-xl text-white group-hover:text-brand">{g.label}</span>
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-muted">{g.blurb}</span>
                  </Link>
                  <ul className="mt-4 space-y-0.5 border-t border-ink-line pt-3">
                    {g.items.map((i) => (
                      <li key={i.href}>
                        <Link
                          href={i.href}
                          className="block rounded px-2 py-1.5 -mx-2 text-[0.875rem] text-white/80 hover:bg-white/6 hover:text-white"
                        >
                          {i.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Dropdown>
          <Dropdown label="Company" href="/about-us/">
            <ul className="w-56 bg-ink-2 p-2">
              {company.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="block rounded px-3 py-2 text-[0.875rem] text-white/80 hover:bg-white/6 hover:text-white">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Dropdown>
          <NavLink href="/tripeleven/">
            TripEleven <span className="ml-1 hidden rounded bg-brand/15 px-1.5 py-0.5 text-[0.6875rem] text-brand xl:inline">Product</span>
          </NavLink>
          <NavLink href="/blogs/">Blog</NavLink>
          <NavLink href="/contact-us/">Contact</NavLink>
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <ButtonLink href="tel:+9779856085151" variant="ghost-dark" size="sm" className="max-xl:hidden">
            Call +977 9856085151
          </ButtonLink>
          <ButtonLink href="/contact-us/" size="sm">
            Get a proposal
          </ButtonLink>
        </div>

        <button
          type="button"
          className="ml-auto -mr-2 grid size-10 place-items-center rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span className={cx("absolute left-0 h-px w-5 bg-white transition-transform", open ? "top-1.5 rotate-45" : "top-0")} />
            <span className={cx("absolute left-0 h-px w-5 bg-white transition-transform", open ? "top-1.5 -rotate-45" : "top-3")} />
          </span>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink-line bg-ink lg:hidden">
          <nav aria-label="Mobile" className="container-x py-6">
            {services.map((g) => (
              <div key={g.href} className="border-b border-ink-line py-4">
                <Link href={g.href} className="font-serif text-2xl text-white">
                  {g.label}
                </Link>
                <ul className="mt-2 grid grid-cols-2 gap-x-4">
                  {g.items.map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} className="block py-1.5 text-[0.9375rem] text-ink-muted">
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className="py-4">
              {[{ label: "TripEleven — our product", href: "/tripeleven/" }, ...company, { label: "Blog", href: "/blogs/" }].map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="block py-2 text-lg text-white">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3">
              <ButtonLink href="/contact-us/">Get a proposal</ButtonLink>
              <ButtonLink href="tel:+9779856085151" variant="ghost-dark">
                Call +977 9856085151
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cx("rounded-full px-3.5 py-2 text-[0.9375rem] whitespace-nowrap transition-colors hover:text-white", active ? "text-white" : "text-white/80")}
    >
      {children}
    </Link>
  );
}

function Dropdown({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] text-white/80 transition-colors hover:text-white group-focus-within:text-white"
        aria-haspopup="true"
      >
        {label}
        <svg viewBox="0 0 10 6" className="size-2.5 opacity-60 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M1 1l4 4 4-4" />
        </svg>
      </Link>
      <div className="invisible absolute top-full left-0 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-md shadow-2xl shadow-black/50 ring-1 ring-ink-line">{children}</div>
      </div>
    </div>
  );
}
