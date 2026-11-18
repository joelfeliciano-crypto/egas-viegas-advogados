"use client"

import { useState } from "react"
import useSWR from "swr"
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore/lite"
import { Mail, Phone, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
import { serialize } from "@/lib/data"
import { db } from "@/lib/firebase"
import type { ContactMessage } from "@/lib/types"
import { cn } from "@/lib/utils"

async function loadMessages(): Promise<ContactMessage[]> {
  const snap = await getDocs(query(collection(db, "contacts"), orderBy("timestamp", "desc")))
  return snap.docs.map((d) => ({ ...(serialize(d.data()) as object), id: d.id }) as ContactMessage)
}

export default function MessagesPage() {
  const { data, error, isLoading, mutate } = useSWR("contacts", loadMessages)
  const [openId, setOpenId] = useState<string | null>(null)
  const selected = data?.find((m) => m.id === openId)

  async function openMessage(m: ContactMessage) {
    setOpenId(m.id)
    if (!m.read) {
      await updateDoc(doc(db, "contacts", m.id), { read: true }).catch(console.error)
      mutate(data?.map((x) => (x.id === m.id ? { ...x, read: true } : x)), { revalidate: false })
    }
  }

  async function remove(id: string) {
    if (!confirm("Eliminar esta mensagem?")) return
    try {
      await deleteDoc(doc(db, "contacts", id))
      setOpenId(null)
      mutate()
      toast.success("Mensagem eliminada.")
    } catch {
      toast.error("Erro ao eliminar.")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Mensagens</h1>
        <p className="text-sm text-muted-foreground">Contactos recebidos através do formulário do site.</p>
      </div>
      {error && <p className="text-sm text-destructive">Erro ao carregar: {String(error.message ?? error)}</p>}
      {isLoading && <p className="text-sm text-muted-foreground">A carregar...</p>}
      {data?.length === 0 && <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">Ainda não há mensagens.</p>}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <ul className="flex flex-col divide-y self-start rounded-xl border bg-card">
          {data?.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => openMessage(m)}
                className={cn("flex w-full flex-col gap-0.5 p-4 text-left hover:bg-secondary", openId === m.id && "bg-secondary")}
              >
                <span className="flex items-center gap-2">
                  {!m.read && <span className="size-2 rounded-full bg-accent" aria-label="Por ler" />}
                  <span className={cn("truncate", !m.read && "font-semibold")}>{m.name}</span>
                  <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                    {m.timestamp ? new Date(m.timestamp).toLocaleDateString("pt-PT") : ""}
                  </span>
                </span>
                <span className="truncate text-sm">{m.subject}</span>
                <span className="truncate text-xs text-muted-foreground">{m.area}</span>
              </button>
            </li>
          ))}
        </ul>

        {selected && (
          <article className="flex flex-col gap-4 self-start rounded-xl border bg-card p-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold">{selected.subject}</h2>
              <p className="text-sm text-muted-foreground">
                {selected.name}
                {selected.company && ` · ${selected.company}`} · {selected.area}
              </p>
              {selected.timestamp && (
                <p className="text-xs text-muted-foreground">{new Date(selected.timestamp).toLocaleString("pt-PT")}</p>
              )}
            </div>
            <p className="whitespace-pre-wrap leading-relaxed">{selected.message}</p>
            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`} className={buttonVariants()}>
                <Mail /> Responder
              </a>
              {selected.phone && (
                <a href={`tel:${selected.phone}`} className={buttonVariants({ variant: "outline" })}>
                  <Phone /> {selected.phone}
                </a>
              )}
              <Button variant="ghost" className="text-destructive" onClick={() => remove(selected.id)}>
                <Trash2 /> Eliminar
              </Button>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}
