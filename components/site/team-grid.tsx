"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { TEAM_CATEGORIES, type TeamMember } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Avatar } from "./page-hero"

export function TeamGrid({ team }: { team: TeamMember[] }) {
  const [filter, setFilter] = useState<string>("all")
  const [selected, setSelected] = useState<TeamMember | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  const categories = TEAM_CATEGORIES.filter((c) => team.some((m) => m.section === c.value))
  const visible = filter === "all" ? team : team.filter((m) => m.section === filter)

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
        {[{ value: "all", label: "Todos" }, ...categories].map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setFilter(c.value)}
            aria-pressed={filter === c.value}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              filter === c.value ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => setSelected(m)}
              className="group flex w-full flex-col overflow-hidden rounded-xl border bg-card text-left transition-shadow hover:shadow-lg"
            >
              <Avatar name={m.nome} src={m.img} className="aspect-square w-full" />
              <span className="flex flex-col p-5">
                <span className="font-serif text-lg font-semibold group-hover:text-gold-ink">{m.nome}</span>
                <span className="text-sm text-muted-foreground">{m.cargo}</span>
                <span className="mt-3 flex flex-wrap gap-1.5">
                  {m.especialidades?.slice(0, 3).map((e) => (
                    <span key={e} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">
                      {e}
                    </span>
                  ))}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelected(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-name"
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              autoFocus
              onClick={() => setSelected(null)}
              aria-label="Fechar"
              className="absolute top-3 right-3 rounded-full bg-card/90 p-2 hover:bg-secondary"
            >
              <X className="size-5" />
            </button>
            <div className="grid md:grid-cols-[220px_1fr]">
              <Avatar name={selected.nome} src={selected.img} className="aspect-square w-full md:h-full" />
              <div className="p-6">
                <h2 id="member-name" className="font-serif text-2xl font-semibold">
                  {selected.nome}
                </h2>
                <p className="text-sm text-gold-ink">{selected.cargo}</p>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{selected.desc}</p>
                {selected.especialidades?.length > 0 && (
                  <>
                    <h3 className="mt-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">Especialidades</h3>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {selected.especialidades.map((e) => (
                        <li key={e} className="rounded-full bg-secondary px-2.5 py-1 text-xs">
                          {e}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
