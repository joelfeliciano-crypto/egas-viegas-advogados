import { ArrowUpRight } from "lucide-react"
import type { Article } from "@/lib/types"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.imgUrl || "/images/article.png"}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {article.categoria && (
          <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs text-accent">{article.categoria}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-muted-foreground">
          {article.autor}
          {article.data && ` · ${article.data}`}
        </p>
        <h3 className="mt-2 text-balance font-serif text-xl font-semibold leading-snug">{article.titulo}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{article.resumo}</p>
        {article.pdfUrl && (
          <a
            href={article.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-ink hover:underline"
          >
            Ler artigo completo <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">: {article.titulo}</span>
          </a>
        )}
      </div>
    </article>
  )
}
