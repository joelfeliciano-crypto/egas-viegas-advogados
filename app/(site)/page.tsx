import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Counter, Reveal } from "@/components/site/motion"
import { TestimonialsSlider } from "@/components/site/testimonials-slider"
import { buttonVariants } from "@/components/ui/button"
import { SectionHeading } from "@/components/site/page-hero"
import { ArticleCard } from "@/components/site/article-card"
import { getAreas, getArticles, getSettings, getTestimonials } from "@/lib/data"
import { cn } from "@/lib/utils"
import { getCopy } from "@/lib/i18n"
import { getLocale } from "@/lib/locale-server"

export default async function HomePage() {
  const locale = await getLocale()
  const copy = getCopy(locale)
  const [settings, areas, articles, testimonials] = await Promise.all([
    getSettings(locale),
    getAreas(locale),
    getArticles(locale),
    getTestimonials(locale),
  ])

  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero.png"
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full object-cover opacity-35"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/backgroundv1-5dehrN5UfoZIPPgz3bpi1UyenAMn5e.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-4 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">EV - {copy.brand}, RL</p>
          <h1 className="max-w-3xl text-balance font-serif text-5xl font-semibold leading-tight md:text-7xl">
            {settings.index_hero_title}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg text-primary-foreground/75">{settings.hero_subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contacto" className={cn(buttonVariants({ size: "lg" }), "h-12 bg-accent px-6 text-accent-foreground hover:bg-accent/90")}>
              {settings.hero_cta}
            </Link>
            <Link
              href="/areas"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 border-white/30 bg-transparent px-6 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground")}
            >
              {copy.home.ctaAreas}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading eyebrow={copy.home.about} title={settings.about_title} />
          <p className="text-pretty leading-relaxed text-muted-foreground">{settings.history_p1}</p>
          <Link href="/sobre" className="mt-6 inline-flex items-center gap-2 font-medium text-gold-ink hover:underline">
            {copy.home.ourStory} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <dl className="grid grid-cols-2 gap-4">
          {settings.stats.map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-6">
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <Counter value={s.value} className="order-first font-serif text-4xl font-semibold text-gold-ink" />
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-accent">{copy.home.principles}</p>
          <h2 className="mb-10 font-serif text-3xl font-semibold md:text-4xl">{copy.home.principlesTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.home.principleList.map((p, i) => (
              <div key={p.title} className="border-t border-accent/50 pt-5">
                <span className="font-serif text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-serif text-xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading eyebrow={copy.home.specialties} title={copy.areas.title} subtitle={copy.home.specialtiesSubtitle} />
        <ul className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {areas.slice(0, 6).map((a) => (
            <li key={a.id} className="bg-card">
              <Reveal className="h-full p-6">
                <h3 className="font-serif text-xl font-semibold">{a.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{a.intro}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <Link href="/areas" className="mt-6 inline-flex items-center gap-2 font-medium text-gold-ink hover:underline">
          {copy.home.seeAllAreas} <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      {articles.length > 0 && (
        <section className="bg-secondary py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading eyebrow={copy.home.content} title={copy.home.recentArticles} />
            <div className="grid gap-6 md:grid-cols-3">
              {articles.slice(0, 3).map((a) => (
                <ArticleCard key={a.id} article={a} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeading eyebrow={copy.home.reviews} title={copy.home.whatClientsSay} />
          <TestimonialsSlider items={testimonials} locale={locale} />
        </section>
      )}

      <section className="bg-accent">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-accent-foreground">{copy.home.needAdvice}</h2>
            <p className="mt-2 text-accent-foreground/80">{copy.home.teamReady}</p>
          </div>
          <Link href="/contacto" className={cn(buttonVariants({ size: "lg" }), "h-12 px-6")}>
            {copy.home.contactUs}
          </Link>
        </div>
      </section>
    </>
  )
}
