import Image from "next/image";
import { Marquee } from "@/components/marquee";
import { ArrowCircle, ButtonLink, cx, Eyebrow } from "@/components/ui";
import { hostOf, siteShot, tripeleven as t11 } from "@/lib/products";

export function TripElevenWordmark({ className }: { className?: string }) {
  // official lettermark is navy + blue; invert to white on dark surfaces
  return (
    <Image
      src="/products/tripeleven/wordmark.svg"
      alt="TripEleven"
      width={229}
      height={45}
      className={cx("h-7 w-auto brightness-0 invert", className)}
    />
  );
}

/** Product screenshot framed like a window, used on the home section and the product page. */
export function EditorShot({ priority }: { priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-md bg-ink-3 p-1.5 shadow-2xl shadow-black/50 ring-1 ring-ink-line">
      <Image
        src="/products/tripeleven/itinerary-editor.webp"
        alt="TripEleven trip editor: a drag-and-drop, day-by-day itinerary with a completeness meter"
        width={1926}
        height={1286}
        priority={priority}
        sizes="(min-width: 1024px) 46vw, 100vw"
        className="h-auto w-full rounded"
      />
    </div>
  );
}

export function SiteCard({ site, dark }: { site: (typeof t11.sites)[number]; dark?: boolean }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cx("group block p-2", dark ? "bg-ink-2 hover:bg-ink-3" : "bg-card hover:bg-[#fdfdfc]")}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
        <Image
          src={siteShot(site.shot)}
          alt={`${site.name} website, built on TripEleven`}
          fill
          sizes="(min-width: 1024px) 26rem, 80vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-1.5 pt-3 pb-1.5">
        <span>
          <span className={cx("block text-[0.9375rem]", dark ? "text-white" : "text-ink")}>{site.name}</span>
          <span className={cx("block text-[0.75rem]", dark ? "text-ink-muted" : "text-faint")}>{hostOf(site.url)}</span>
        </span>
        <ArrowCircle dark={dark} />
      </div>
    </a>
  );
}

/** Home page section introducing TripEleven. */
export function TripElevenFeature() {
  return (
    <section aria-labelledby="t11-title" className="overflow-hidden bg-ink text-ink-text">
      <div className="container-x grid gap-14 pt-24 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16 lg:pt-32">
        <div>
          <div className="flex items-center gap-3">
            <Eyebrow dark>Our product</Eyebrow>
            <span className="h-px w-8 bg-ink-line" />
            <TripElevenWordmark className="h-5" />
          </div>
          <h2 id="t11-title" className="mt-8 font-serif text-h2 text-balance text-white">
            We built the tool we wanted as an agency.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">
            Most trekking agencies juggle a website, a booking tool and a spreadsheet that disagrees with both. TripEleven
            is one place to build trips, publish a branded site and catch every inquiry — no code, no developers.
          </p>
          <ul className="mt-8 grid max-w-lg gap-px overflow-hidden rounded-sm bg-ink-line ring-1 ring-ink-line sm:grid-cols-2">
            {t11.pillars.map((p) => (
              <li key={p.title} className="bg-ink-2 px-4 py-3.5 text-[0.9375rem] text-white">
                {p.title}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/tripeleven/">Explore TripEleven</ButtonLink>
            <ButtonLink href={t11.signup} variant="ghost-dark" target="_blank" rel="noopener noreferrer">
              Start 7-day free trial
            </ButtonLink>
          </div>
        </div>
        <EditorShot />
      </div>

      <div className="pt-20 pb-24 lg:pb-32">
        <p className="container-x mb-6 text-[0.9375rem] text-ink-muted">
          Live today on <span className="text-white">{t11.sites.length} trekking & tour agency websites</span>
        </p>
        <Marquee duration={60} pauseOnHover>
          {t11.sites.map((s) => (
            <div key={s.shot} className="w-[min(24rem,78vw)] shrink-0 pr-1">
              <div className="ring-1 ring-ink-line">
                <SiteCard site={s} dark />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
