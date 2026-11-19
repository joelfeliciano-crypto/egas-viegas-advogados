import type { Metadata } from "next"
import { ContentTabs } from "@/components/site/content-tabs"
import { PageHero } from "@/components/site/page-hero"
import { getArticles, getThoughts, getVideos } from "@/lib/data"
import { getCopy } from "@/lib/i18n"
import { getLocale } from "@/lib/locale-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const english = locale === "en"
  return {
    title: english ? "Legal Insights & Articles" : "Conteúdos Jurídicos",
    alternates: { canonical: "/conteudos" },
    description: english
      ? "Read legal insights, articles, and thought leadership from Egas Viegas law firm. Stay informed on legal trends in Angola."
      : "Leia conteúdos jurídicos, artigos e pensamento de liderança da Egas Viegas. Mantenha-se informado sobre as tendências jurídicas em Angola.",
    keywords: english
      ? "legal insights, law articles, Angola legal news, attorney articles, legal trends"
      : "conteúdos jurídicos, artigos de direito, notícias jurídicas Angola, artigos advogados, tendências legais",
  }
}

export default async function ContentsPage() {
  const locale = await getLocale()
  const copy = getCopy(locale)
  const [articles, videos, thoughts] = await Promise.all([getArticles(locale), getVideos(locale), getThoughts(locale)])
  return (
    <>
      <PageHero eyebrow={copy.content.eyebrow} title={copy.content.title} subtitle={copy.content.subtitle} />
      <section className="mx-auto max-w-6xl px-4 py-20">
        <ContentTabs articles={articles} videos={videos} thoughts={thoughts} locale={locale} />
      </section>
    </>
  )
}
