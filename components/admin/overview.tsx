"use client"

import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"
import { collection, doc, getDoc, getDocs, query, setDoc, where, writeBatch, type Query } from "firebase/firestore/lite"

const getCountFromServer = async (q: Query) => {
  const snap = await getDocs(q)
  return { data: () => ({ count: snap.size }) }
}
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { COLLECTIONS } from "@/lib/admin-config"
import { defaultSettings } from "@/lib/defaults"
import { db } from "@/lib/firebase"

async function loadCounts() {
  const names = [...Object.keys(COLLECTIONS), "messages"]
  const counts = await Promise.all(names.map((n) => getCountFromServer(collection(db, n)).then((s) => s.data().count)))
  const unread = await getCountFromServer(query(collection(db, "messages"), where("read", "==", false)))
  const settings = await getDoc(doc(db, "website_content", "general"))
  return {
    counts: Object.fromEntries(names.map((n, i) => [n, counts[i]])) as Record<string, number>,
    unread: unread.data().count,
    hasSettings: settings.exists(),
  }
}

export function Overview() {
  const { data, error, mutate } = useSWR("overview", loadCounts)
  const [seeding, setSeeding] = useState(false)

  async function seed() {
    if (!data) return
    setSeeding(true)
    try {
      if (!data.hasSettings) await setDoc(doc(db, "website_content", "general"), defaultSettings)
      for (const config of Object.values(COLLECTIONS)) {
        if (data.counts[config.name] > 0 || !config.seed?.length) continue
        const batch = writeBatch(db)
        config.seed.forEach((item) => batch.set(doc(collection(db, config.name)), item))
        await batch.commit()
      }
      toast.success("Conteúdo original importado para o Firebase.")
      mutate()
    } catch (err) {
      console.error(err)
      toast.error("Erro ao importar. Verifique as regras do Firestore.")
    } finally {
      setSeeding(false)
    }
  }

  const needsSeed = data && (!data.hasSettings || Object.values(COLLECTIONS).some((c) => c.seed?.length && data.counts[c.name] === 0))

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Visão Geral</h1>
        <p className="text-sm text-muted-foreground">Gerir todo o conteúdo do site, ligado em tempo real ao Firebase.</p>
      </div>

      {error && <p className="text-sm text-destructive">Erro ao carregar: {String(error.message ?? error)}</p>}

      {needsSeed && (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-accent bg-card p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold">Importar conteúdo original</h2>
            <p className="text-sm text-muted-foreground">
              Algumas secções ainda não existem no Firebase. Importe o conteúdo do site original para poder editá-lo.
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
          <p className="mt-1 text-xs text-primary-foreground/60">{data?.counts.messages ?? 0} no total</p>
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
