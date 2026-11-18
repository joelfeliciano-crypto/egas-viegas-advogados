import type { Metadata } from "next"
import { PageHero } from "@/components/site/page-hero"
import { TeamGrid } from "@/components/site/team-grid"
import { getTeam } from "@/lib/data"

export const metadata: Metadata = { title: "Profissionais" }

export default async function TeamPage() {
  const team = await getTeam()
  return (
    <>
      <PageHero eyebrow="Equipa" title="Os Nossos Profissionais" subtitle="Uma equipa multidisciplinar dedicada aos interesses dos nossos consulentes." />
      <section className="mx-auto max-w-6xl px-4 py-20">
        <TeamGrid team={team} />
      </section>
    </>
  )
}
