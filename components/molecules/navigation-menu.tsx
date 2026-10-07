"use client"

import * as React from "react"
import Link from "next/link"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// Hrefs mirror the live growfore.com routes so redirects stay one-to-one.
const services: { group: string; items: { label: string; href: string }[] }[] =
  [
    {
      group: "Web Services",
      items: [
        { label: "Web Services", href: "/web-services" },
        { label: "Wordpress Development", href: "/wordpress-development" },
        {
          label: "Domain Registration with Web Hosting",
          href: "/domain-registration-with-web-hosting",
        },
        { label: "Wordpress SEO", href: "/wordpress-seo" },
        {
          label: "Ecommerce Website Development",
          href: "/ecommerce-website-development",
        },
        {
          label: "Web Application Development",
          href: "/web-application-development",
        },
        { label: "Mobile App Development", href: "/mobile-app-development" },
        { label: "Custom CMS Website", href: "/custom-cms-website" },
        { label: "UI/UX Design", href: "/ui-ux-design" },
      ],
    },
    {
      group: "SEO Services",
      items: [
        { label: "SEO Services", href: "/seo-services" },
        { label: "SEO Audit", href: "/seo-audit" },
        { label: "Local SEO", href: "/local-seo" },
        { label: "Keyword Research", href: "/keyword-research" },
        { label: "On-Page SEO", href: "/on-page-seo" },
        { label: "Off-Page SEO", href: "/off-page-seo" },
        { label: "Technical SEO", href: "/technical-seo" },
        { label: "Content Optimization", href: "/content-optimization" },
      ],
    },
    {
      group: "Ads Services",
      items: [
        { label: "Ads Services", href: "/ads-services" },
        {
          label: "Google Local Service Ads (LSAs)",
          href: "/google-local-service-ads",
        },
        { label: "Google Ads", href: "/google-ads" },
      ],
    },
  ]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built with Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[640px] gap-8 p-4 md:grid-cols-3">
              {services.map((column) => (
                <li key={column.group} className="flex flex-col gap-1">
                  <p className="px-2 pb-2 font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
                    {column.group}
                  </p>
                  {column.items.map((item) => (
                    <NavigationMenuLink
                      key={item.href}
                      render={
                        <Link href={item.href}>
                          <div className="line-clamp-2 text-sm">
                            {item.label}
                          </div>
                        </Link>
                      }
                    />
                  ))}
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/docs">Docs</Link>}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  )
}
