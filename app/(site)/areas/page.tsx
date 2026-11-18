import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { PageHero } from "@/components/site/page-hero"
import { getAreas } from "@/lib/data"

export const metadata: Metadata = { title: "Áreas de Actuação" }

export default async function AreasPage() {
  const areas = await getAreas()
  return (
    <>
      <PageHero eyebrow="Especialidades" title="Áreas de Actuação" subtitle="Soluções jurídicas especializadas para cada necessidade." />
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {areas.map((a, i) => (
            <article key={a.id} className="rounded-xl border bg-card p-7">
              <span className="font-serif text-sm text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-1 font-serif text-2xl font-semibold">{a.title}</h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{a.intro}</p>
              {a.services?.length > 0 && (
                <>
                  <h3 className="mt-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">Serviços</h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {a.services.map((s) => (
                      <li key={s} className="flex gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden />
                        {s}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start gap-4 rounded-xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-2xl">Precisa de assessoria jurídica especializada?</p>
          <Link href="/contacto" className={buttonVariants({ className: "h-11 bg-accent px-5 text-accent-foreground hover:bg-accent/90" })}>
            Entre em Contacto
          </Link>
        </div>
      </section>
    </>
  )
}
