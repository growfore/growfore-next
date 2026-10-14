import Image from "next/image";
import { Marquee } from "@/components/marquee";
import { MediaReveal, Parallax, Reveal, RevealText } from "@/components/motion";
import { ArrowCircle, ButtonLink, cx } from "@/components/ui";
import { hostOf, siteShot, tripeleven as t11 } from "@/lib/products";

export function TripElevenWordmark({ className }: { className?: string }) {
  // official navy + blue lettermark, used as-is on light surfaces
  return <Image src="/products/tripeleven/wordmark.svg" alt="TripEleven" width={229} height={45} className={cx("h-7 w-auto", className)} />;
}

/** Product screenshot framed like a window, used on the home section and the product page. */
export function EditorShot({ priority }: { priority?: boolean }) {
  return (
    <MediaReveal className="overflow-hidden rounded-lg bg-card p-1.5 shadow-[0_30px_80px_-30px_rgba(22,22,22,0.35)] ring-1 ring-line">
      <Image
        src="/products/tripeleven/itinerary-editor.webp"
        alt="TripEleven trip editor: a drag-and-drop, day-by-day itinerary with a completeness meter"
        width={1926}
        height={1286}
        priority={priority}
        sizes="(min-width: 1024px) 46vw, 100vw"
        className="h-auto w-full rounded"
      />
    </MediaReveal>
  );
}

export function SiteCard({ site }: { site: (typeof t11.sites)[number] }) {
  return (
    <a href={site.url} target="_blank" rel="noopener noreferrer" className="group block h-full bg-card p-2 transition-colors hover:bg-[#fdfdfc]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
        <Image
          src={siteShot(site.shot)}
          alt={`${site.name} website, built on TripEleven`}
          fill
          sizes="(min-width: 1024px) 26rem, 80vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-1.5 pt-3 pb-1.5">
        <span>
          <span className="block text-[0.9375rem] text-ink">{site.name}</span>
          <span className="block text-[0.75rem] text-faint">{hostOf(site.url)}</span>
        </span>
        <ArrowCircle />
      </div>
    </a>
  );
}

/** Home page section introducing TripEleven. */
export function TripElevenFeature() {
  return (
    <section aria-labelledby="t11-title" className="overflow-hidden border-y border-line bg-card">
      <div className="container-x grid gap-14 pt-24 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16 lg:pt-32">
        <div>
          <Reveal y={12}>
            <TripElevenWordmark className="h-6" />
          </Reveal>
          <RevealText text="We built the tool we wanted as an agency." className="mt-8 font-serif text-h2 text-balance text-ink" />
          <span id="t11-title" className="sr-only">
            TripEleven
          </span>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Most trekking agencies juggle a website, a booking tool and a spreadsheet that disagrees with both. TripEleven is one
              place to build trips, publish a branded site and catch every inquiry — no code, no developers.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/tripeleven/">Explore TripEleven</ButtonLink>
            <ButtonLink href={t11.signup} variant="outline" target="_blank" rel="noopener noreferrer">
              Start 7-day free trial
            </ButtonLink>
          </Reveal>
        </div>
        <Parallax speed={40}>
          <EditorShot />
        </Parallax>
      </div>

      <div className="pt-20 pb-24 lg:pb-32">
        <Reveal>
          <p className="container-x mb-6 text-[0.9375rem] text-muted">
            Live today on <span className="text-ink">{t11.sites.length} trekking & tour agency websites</span>
          </p>
          <Marquee duration={60} pauseOnHover>
            {t11.sites.map((s) => (
              <div key={s.shot} className="w-[min(24rem,78vw)] shrink-0 pr-3">
                <div className="overflow-hidden rounded-md ring-1 ring-line">
                  <SiteCard site={s} />
                </div>
              </div>
            ))}
          </Marquee>
        </Reveal>
      </div>
    </section>
  );
}
