import type { Metadata } from "next"
import { Eye, Scale, Target } from "lucide-react"
import { PageHero, SectionHeading } from "@/components/site/page-hero"
import { AboutSlideshow } from "@/components/site/about-slideshow"
import { Counter } from "@/components/site/motion"
import { getSettings } from "@/lib/data"
import { getCopy } from "@/lib/i18n"
import { getLocale } from "@/lib/locale-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const english = locale === "en"
  return {
    title: english ? "About Us" : "Sobre Nós",
    alternates: { canonical: "/sobre" },
    description: english
      ? "Learn about Egas Viegas, a leading law firm in Angola with offices in Luanda and Bié. Expert legal services with commitment to excellence."
      : "Conheça a Egas Viegas, um escritório de advocacia líder em Angola com escritórios em Luanda e no Bié. Serviços jurídicos especializados com compromisso de excelência.",
    keywords: english
      ? "about law firm, legal professionals, Angola lawyers, law firm Luanda, Bié"
      : "sobre escritório jurídico, profissionais legais, advogados Angola, escritório Luanda, Bié",
  }
}

export default async function AboutPage() {
  const locale = await getLocale()
  const copy = getCopy(locale)
  const s = await getSettings(locale)
  const differentials = [
    { title: copy.about.team, text: copy.about.descriptions.team },
    { title: copy.about.technology, text: copy.about.descriptions.technology },
    { title: copy.about.personal, text: copy.about.descriptions.personal },
    { title: copy.about.national, text: copy.about.descriptions.national },
    { title: copy.about.international, text: copy.about.descriptions.international },
    { title: copy.about.social, text: copy.about.descriptions.social },
  ]
  return (
    <>
      <PageHero eyebrow={copy.about.eyebrow} title={s.about_title} subtitle={s.about_paragraph} />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading eyebrow={copy.about.story} title={copy.about.founded} />
          <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
            {[s.history_p1, s.history_p2, s.history_p3].filter(Boolean).map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
        </div>
        <AboutSlideshow locale={locale} />
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-7">
            <Target className="size-7 text-gold-ink" aria-hidden />
            <h2 className="mt-4 font-serif text-2xl font-semibold">{copy.about.mission}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.mission}</p>
          </div>
          <div className="rounded-xl border bg-card p-7">
            <Eye className="size-7 text-gold-ink" aria-hidden />
            <h2 className="mt-4 font-serif text-2xl font-semibold">{copy.about.vision}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.vision}</p>
          </div>
          <div className="rounded-xl border bg-card p-7">
            <Scale className="size-7 text-gold-ink" aria-hidden />
            <h2 className="mt-4 font-serif text-2xl font-semibold">{copy.about.values}</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {s.values.map((v) => (
                <li key={v} className="rounded-full bg-secondary px-3 py-1 text-sm">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading eyebrow={copy.about.differentiators} title={copy.about.whyChoose} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((d, i) => (
            <div key={d.title}>
              <span className="font-serif text-3xl text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-serif text-xl font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
          {s.stats.map((st) => (
            <div key={st.label} className="flex flex-col">
              <dt className="text-sm text-primary-foreground/70">{st.label}</dt>
              <Counter value={st.value} className="order-first font-serif text-5xl text-accent" />
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
