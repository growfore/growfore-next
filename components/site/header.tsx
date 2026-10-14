"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowCircle, ButtonLink, cx } from "@/components/ui";
import { ChevronDown, Menu, X } from "lucide-react";

export type NavGroup = { label: string; href: string; blurb: string; items: { label: string; href: string }[] };
export type NavPost = { title: string; href: string; date: string };

const company = [
  { label: "About us", href: "/about-us/", blurb: "Who we are and the strategy we follow" },
  { label: "Our team", href: "/our-team/", blurb: "The people who build, rank and run your work" },
  { label: "Careers", href: "/careers/", blurb: "Build your career while building brands" },
  { label: "Contact", href: "/contact-us/", blurb: "Get a proposal or book a call" },
];

type MenuId = "services" | "company" | null;

export function Header({ services, posts }: { services: NavGroup[]; posts: NavPost[] }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // close menus after navigating (adjust state during render, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(null);
  }
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  // small delay on close so moving the pointer from trigger to panel doesn't flicker
  const show = (id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(id);
  };
  // clicking any link in a menu closes it immediately, including links to the current page
  const close = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(null);
    (document.activeElement as HTMLElement | null)?.blur();
  };
  const hide = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 120);
  };

  return (
    <header
      onMouseLeave={hide}
      className={cx(
        "sticky top-0 z-50 text-ink transition-[border-color] duration-300",
        "border-b border-line bg-white",
      )}
    >
      <div className="container-x flex h-16 items-center gap-8 lg:h-[4.5rem]">
        <Link href="/" className="shrink-0" aria-label="Growfore home">
          <Image
            src="/wp-content/uploads/2025/04/growforelogo.webp"
            alt="Growfore Solution"
            width={923}
            height={270}
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        <nav aria-label="Main" className="hidden h-full items-center gap-1 lg:flex">
          <Trigger id="services" label="Services" href="/services/" menu={menu} show={show} close={close} />
          <Trigger id="company" label="Company" href="/about-us/" menu={menu} show={show} close={close} />
          <NavLink href="/tripeleven/" onEnter={() => show(null)}>
            TripEleven <span className="ml-1 hidden rounded bg-brand-soft px-1.5 py-0.5 text-[0.6875rem] text-brand-ink xl:inline">Product</span>
          </NavLink>
          <NavLink href="/blogs/" onEnter={() => show(null)}>
            Blog
          </NavLink>
          <NavLink href="/contact-us/" onEnter={() => show(null)}>
            Contact
          </NavLink>
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex" onMouseEnter={() => show(null)}>
          <ButtonLink href="tel:+9779856085151" variant="outline" size="sm" className="max-xl:hidden">
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
          {open ? <X className="size-5" strokeWidth={1.75} aria-hidden /> : <Menu className="size-5" strokeWidth={1.75} aria-hidden />}
        </button>
      </div>

      {/* ---------------------------------------------------------- full-width mega menus */}
      <div className="hidden lg:block">
        <div
          aria-hidden
          onMouseEnter={hide}
          className={cx(
            "absolute inset-x-0 top-full -z-10 h-dvh bg-ink/20 transition-opacity duration-200",
            menu ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
        <Panel id="services" menu={menu} show={show} close={close}>
          <div className="grid grid-cols-[1.05fr_1fr_1fr_0.8fr_1.25fr] gap-10">
            <div>
              <p className="font-serif text-[1.75rem] leading-tight text-ink">Services</p>
              <p className="mt-3 max-w-[15rem] text-[0.875rem] leading-relaxed text-muted">
                Websites, search and ads from one team — everything you need to grow, under one roof.
              </p>
              <Link href="/services/" className="group mt-6 inline-flex items-center gap-2 text-[0.875rem] text-ink">
                All services <ArrowCircle />
              </Link>
            </div>
            {services.map((g) => (
              <div key={g.href}>
                <Link href={g.href} className="group block border-b border-line pb-3">
                  <span className="text-[0.9375rem] font-medium text-ink group-hover:text-brand-ink">{g.label}</span>
                </Link>
                <ul className="mt-3 space-y-0.5">
                  {g.items.map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} className="-mx-2 block rounded px-2 py-1.5 text-[0.875rem] text-ink/70 transition-colors hover:bg-paper hover:text-ink">
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link href="/tripeleven/" className="group flex flex-col overflow-hidden rounded-md bg-paper ring-1 ring-line transition-colors hover:bg-paper">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/products/tripeleven/sites/walkthrough-nepal.jpg"
                  alt=""
                  fill
                  sizes="20rem"
                  className="object-cover object-top opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                />
              </div>
              <div className="p-4">
                <p className="text-[0.9375rem] text-ink">TripEleven</p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-muted">Website & booking platform for trekking and tour operators.</p>
              </div>
            </Link>
          </div>
        </Panel>

        <Panel id="company" menu={menu} show={show} close={close}>
          <div className="grid grid-cols-[1.05fr_1.6fr_1.4fr_1.15fr] gap-10">
            <div>
              <p className="font-serif text-[1.75rem] leading-tight text-ink">Company</p>
              <p className="mt-3 max-w-[15rem] text-[0.875rem] leading-relaxed text-muted">
                A website design & SEO agency on New Rd, Pokhara — working with businesses everywhere.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="-mx-3 block rounded-md px-3 py-3 transition-colors hover:bg-paper">
                    <span className="block text-[0.9375rem] text-ink">{c.label}</span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{c.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <Link href="/blogs/" className="group flex items-center justify-between border-b border-line pb-3 text-[0.9375rem] font-medium text-ink">
                From the blog <ArrowCircle />
              </Link>
              <ul className="mt-2">
                {posts.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="-mx-2 block rounded px-2 py-2 transition-colors hover:bg-paper">
                      <span className="line-clamp-1 text-[0.875rem] text-ink/75">{p.title}</span>
                      <span className="text-[0.75rem] text-muted">{p.date}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-md bg-paper p-5 ring-1 ring-line">
              <div>
                <p className="text-[0.75rem] text-muted">Talk to a strategist</p>
                <a href="tel:+9779856085151" className="mt-2 block text-[0.9375rem] text-ink hover:text-brand-ink">
                  +977 9856085151
                </a>
                <a href="mailto:info@growfore.com" className="mt-1 block text-[0.9375rem] text-ink hover:text-brand-ink">
                  info@growfore.com
                </a>
              </div>
              <ButtonLink href="/contact-us/" size="sm" className="mt-6 self-start">
                Get a proposal
              </ButtonLink>
            </div>
          </div>
        </Panel>
      </div>

      {open && (
        <div id="mobile-nav" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-card lg:hidden">
          <nav aria-label="Mobile" className="container-x py-6">
            {services.map((g) => (
              <div key={g.href} className="border-b border-line py-4">
                <Link href={g.href} className="font-serif text-2xl text-ink">
                  {g.label}
                </Link>
                <ul className="mt-2 grid grid-cols-2 gap-x-4">
                  {g.items.map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} className="block py-1.5 text-[0.9375rem] text-muted">
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
                  <Link href={i.href} className="block py-2 text-lg text-ink">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3">
              <ButtonLink href="/contact-us/">Get a proposal</ButtonLink>
              <ButtonLink href="tel:+9779856085151" variant="outline">
                Call +977 9856085151
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children, onEnter }: { href: string; children: React.ReactNode; onEnter?: () => void }) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);
  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={cx("rounded-full px-3.5 py-2 text-[0.9375rem] whitespace-nowrap transition-colors hover:text-ink", active ? "text-ink" : "text-ink/75")}
    >
      {children}
    </Link>
  );
}

function Trigger({
  id,
  label,
  href,
  menu,
  show,
  close,
}: {
  id: Exclude<MenuId, null>;
  label: string;
  href: string;
  menu: MenuId;
  show: (id: MenuId) => void;
  close: () => void;
}) {
  const active = menu === id;
  return (
    // full header height so the pointer never crosses a gap between trigger and panel
    <div className="flex h-full items-center" onMouseEnter={() => show(id)}>
      <Link
        href={href}
        onFocus={() => show(id)}
        onClick={close}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            show(id);
            document.querySelector<HTMLElement>(`#mega-${id} a`)?.focus();
          }
        }}
        aria-expanded={active}
        aria-controls={`mega-${id}`}
        className={cx(
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors hover:text-ink",
          active ? "text-ink" : "text-ink/75",
        )}
      >
        {label}
        <ChevronDown className={cx("size-3.5 opacity-60 transition-transform", active && "rotate-180")} strokeWidth={2} aria-hidden />
      </Link>
    </div>
  );
}

function Panel({
  id,
  menu,
  show,
  close,
  children,
}: {
  id: Exclude<MenuId, null>;
  menu: MenuId;
  show: (id: MenuId) => void;
  close: () => void;
  children: React.ReactNode;
}) {
  const active = menu === id;
  return (
    <div
      id={`mega-${id}`}
      onMouseEnter={() => show(id)}
      onFocus={() => show(id)}
      onClick={(e) => (e.target as Element).closest("a") && close()}
      inert={!active}
      className={cx(
        "absolute inset-x-0 top-full border-y border-line bg-card shadow-2xl shadow-ink/10 transition-[opacity,transform,visibility] duration-200",
        active ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
      )}
    >
      <div className="container-x py-10">{children}</div>
    </div>
  );
}
