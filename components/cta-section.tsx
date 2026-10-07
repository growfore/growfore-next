import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function CtaSection() {
  return (
    <section className="bg-background py-32 text-foreground md:py-44">
      <div
        data-reveal
        className="container-page flex max-w-5xl flex-col items-center text-center"
      >
        <Image
          src="/growfore-icon.svg"
          alt=""
          width={72}
          height={72}
          className="size-16"
        />

        <h2 className="mt-10 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
          <span className="block">Six months from now,</span>
          <span className="block text-muted-foreground">
            your site should cost less to run
          </span>
        </h2>

        <div
          aria-hidden="true"
          className="my-12 h-px w-full max-w-md border-t border-dotted border-border"
        />

        <p className="max-w-lg text-lg leading-relaxed text-balance text-muted-foreground">
          That is the whole job. Book thirty minutes and we&apos;ll look at your
          site and your search footprint, then tell you the three things worth
          changing first — whether or not you hire us.
        </p>

        <a
          href="#book"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-10 rounded-full px-8 py-5 text-base"
          )}
        >
          Book a Meeting
        </a>
      </div>
    </section>
  )
}
