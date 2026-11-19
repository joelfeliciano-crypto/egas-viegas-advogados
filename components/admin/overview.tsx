"use client"

import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"
import { getAdminOverview, seedDefaultContent } from "@/lib/admin-actions"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { COLLECTIONS } from "@/lib/admin-config"

export function Overview() {
  const { data, error, mutate } = useSWR("overview", getAdminOverview)
  const [seeding, setSeeding] = useState(false)

  async function seed() {
    if (!data) return
    setSeeding(true)
    try {
      await seedDefaultContent()
      toast.success("Conteúdo original preparado no Neon.")
      mutate()
    } catch {
      toast.error("Não foi possível preparar o conteúdo. Tente novamente.")
    } finally {
      setSeeding(false)
    }
  }

  const needsSeed = data && (!data.hasSettings || Object.values(COLLECTIONS).some((c) => c.seed?.length && data.counts[c.name] === 0))

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Visão Geral</h1>
        <p className="text-sm text-muted-foreground">Gerir todo o conteúdo do site, armazenado no Neon.</p>
      </div>

      {error && <p className="text-sm text-destructive">Erro ao carregar: {String(error.message ?? error)}</p>}

      {needsSeed && (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-accent bg-card p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold">Importar conteúdo original</h2>
            <p className="text-sm text-muted-foreground">
              O conteúdo ainda não foi inicializado no Neon. Importe os dados predefinidos do site para poder editá-los.
            </p>
          </div>
          <Button onClick={seed} disabled={seeding}>
            {seeding ? "A importar..." : "Importar agora"}
          </Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/mensagens" className="rounded-xl border bg-primary p-6 text-primary-foreground hover:opacity-95">
          <p className="text-sm text-primary-foreground/70">Mensagens por ler</p>
          <p className="font-serif text-4xl text-accent">{data?.unread ?? "–"}</p>
          <p className="mt-1 text-xs text-primary-foreground/60">{data?.totalMessages ?? 0} no total</p>
        </Link>
        {Object.values(COLLECTIONS).map((c) => (
          <Link key={c.name} href={`/admin/${c.name}`} className="rounded-xl border bg-card p-6 hover:border-primary">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="font-serif text-4xl">{data?.counts[c.name] ?? "–"}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
