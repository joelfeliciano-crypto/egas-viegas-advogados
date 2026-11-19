import type { Metadata } from "next"
import { PageHero } from "@/components/site/page-hero"
import { TeamGrid } from "@/components/site/team-grid"
import { getTeam } from "@/lib/data"
import { getCopy } from "@/lib/i18n"
import { getLocale } from "@/lib/locale-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const english = locale === "en"
  return {
    title: english ? "Our Team" : "Profissionais",
    alternates: { canonical: "/equipa" },
    description: english
      ? "Meet our experienced team of legal professionals at Egas Viegas. Expert attorneys specializing in various areas of law in Angola."
      : "Conheça a nossa equipa de profissionais jurídicos experientes na Egas Viegas. Advogados especializados em várias áreas do direito em Angola.",
    keywords: english
      ? "legal team, lawyers Angola, attorneys Luanda, law professionals, Bié"
      : "equipa jurídica, advogados Angola, juristas Luanda, profissionais de direito, Bié",
  }
}

export default async function TeamPage() {
  const locale = await getLocale()
  const copy = getCopy(locale)
  const team = await getTeam(locale)
  return (
    <>
      <PageHero eyebrow={copy.team.eyebrow} title={copy.team.title} subtitle={copy.team.subtitle} />
      <section className="mx-auto max-w-6xl px-4 py-20">
        <TeamGrid team={team} locale={locale} />
      </section>
    </>
  )
}
