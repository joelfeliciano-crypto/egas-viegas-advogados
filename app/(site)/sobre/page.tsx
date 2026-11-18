import type { Metadata } from "next"
import { Eye, Scale, Target } from "lucide-react"
import { PageHero, SectionHeading } from "@/components/site/page-hero"
import { getSettings } from "@/lib/data"

export const metadata: Metadata = { title: "Sobre Nós" }

const DIFFERENTIALS = [
  { title: "Equipa Multidisciplinar", text: "Mais de 10 profissionais especializados em diversas áreas do direito, garantindo atendimento completo e integrado." },
  { title: "Tecnologia Avançada", text: "Ferramentas modernas de gestão jurídica e análise de dados para soluções mais ágeis e precisas." },
  { title: "Atendimento Personalizado", text: "Cada cliente recebe atenção individualizada, com estratégias jurídicas adaptadas aos seus objectivos." },
  { title: "Actuação Nacional", text: "Presença em Luanda e no Bié, com parcerias estratégicas que garantem suporte jurídico onde estiver." },
  { title: "Experiência Internacional", text: "Parcerias com escritórios internacionais para assessoria em operações transnacionais." },
  { title: "Compromisso Social", text: "Consultoria jurídica gratuita para comunidades carentes e apoio a projectos educacionais." },
]

export default async function AboutPage() {
  const s = await getSettings()
  return (
    <>
      <PageHero eyebrow="Sobre" title={s.about_title} subtitle={s.about_intro} />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading eyebrow="A nossa história" title="Fundada em Julho de 2020" />
          <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
            {[s.history_p1, s.history_p2, s.history_p3].filter(Boolean).map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
        </div>
        <img src="/images/about.png" alt="Equipa da Egas Viegas em reunião" className="aspect-[4/5] w-full rounded-xl object-cover" />
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-7">
            <Target className="size-7 text-gold-ink" aria-hidden />
            <h2 className="mt-4 font-serif text-2xl font-semibold">Missão</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.mission}</p>
          </div>
          <div className="rounded-xl border bg-card p-7">
            <Eye className="size-7 text-gold-ink" aria-hidden />
            <h2 className="mt-4 font-serif text-2xl font-semibold">Visão</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.vision}</p>
          </div>
          <div className="rounded-xl border bg-card p-7">
            <Scale className="size-7 text-gold-ink" aria-hidden />
            <h2 className="mt-4 font-serif text-2xl font-semibold">Valores</h2>
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
        <SectionHeading eyebrow="Diferenciais" title="Porque escolher a EV" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((d, i) => (
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
              <dd className="order-first font-serif text-5xl text-accent">{st.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
