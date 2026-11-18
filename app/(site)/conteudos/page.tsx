import type { Metadata } from "next"
import { ContentTabs } from "@/components/site/content-tabs"
import { PageHero } from "@/components/site/page-hero"
import { getArticles, getThoughts, getVideos } from "@/lib/data"

export const metadata: Metadata = { title: "Conteúdos" }

export default async function ContentsPage() {
  const [articles, videos, thoughts] = await Promise.all([getArticles(), getVideos(), getThoughts()])
  return (
    <>
      <PageHero eyebrow="Conteúdos" title="Artigos, Vídeos e Pensamentos" subtitle="Partilhamos conhecimento jurídico produzido pela nossa equipa." />
      <section className="mx-auto max-w-6xl px-4 py-20">
        <ContentTabs articles={articles} videos={videos} thoughts={thoughts} />
      </section>
    </>
  )
}
