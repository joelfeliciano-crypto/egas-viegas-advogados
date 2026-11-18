"use client"

import { useState } from "react"
import { Quote } from "lucide-react"
import type { Article, Thought, Video } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ArticleCard } from "./article-card"

function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  return m?.[1]
}

export function ContentTabs({ articles, videos, thoughts }: { articles: Article[]; videos: Video[]; thoughts: Thought[] }) {
  const tabs = [
    { id: "artigos", label: "Artigos", count: articles.length },
    { id: "videos", label: "Vídeos", count: videos.length },
    { id: "pensamentos", label: "Pensamentos", count: thoughts.length },
  ]
  const [tab, setTab] = useState("artigos")
  const categories = ["Todos", ...Array.from(new Set(articles.map((a) => a.categoria).filter(Boolean)))]
  const [category, setCategory] = useState("Todos")
  const filtered = category === "Todos" ? articles : articles.filter((a) => a.categoria === category)

  return (
    <>
      <div role="tablist" aria-label="Tipo de conteúdo" className="mb-8 flex gap-6 border-b">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={cn(
              "-mb-px border-b-2 pb-3 font-medium transition-colors",
              tab === t.id ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label} <span className="text-sm text-muted-foreground">({t.count})</span>
          </button>
        ))}
      </div>

      {tab === "artigos" && (
        <div id="panel-artigos" role="tabpanel">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm",
                  category === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      )}

      {tab === "videos" && (
        <div id="panel-videos" role="tabpanel">
          {videos.length === 0 ? (
            <p className="text-muted-foreground">Ainda não há vídeos publicados.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((v) => {
                const id = youtubeId(v.youtubeUrl)
                return (
                  <article key={v.id} className="overflow-hidden rounded-xl border bg-card">
                    {id && (
                      <iframe
                        className="aspect-video w-full"
                        src={`https://www.youtube-nocookie.com/embed/${id}`}
                        title={v.titulo}
                        loading="lazy"
                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-semibold">{v.titulo}</h3>
                      {v.descricao && <p className="mt-1 text-sm text-muted-foreground">{v.descricao}</p>}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      )}

      {tab === "pensamentos" && (
        <div id="panel-pensamentos" role="tabpanel">
          {thoughts.length === 0 ? (
            <p className="text-muted-foreground">Ainda não há pensamentos publicados.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {thoughts.map((t) => (
                <figure key={t.id} className="rounded-xl bg-primary p-7 text-primary-foreground">
                  <Quote className="size-6 text-accent" aria-hidden />
                  <blockquote className="mt-3 font-serif text-xl leading-relaxed">{t.texto}</blockquote>
                  <figcaption className="mt-4 text-sm text-primary-foreground/70">
                    {t.autor}
                    {t.data && ` · ${t.data}`}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
