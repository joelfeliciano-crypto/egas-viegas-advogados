"use client"

import { useState } from "react"
import useSWR from "swr"
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc, type DocumentData } from "firebase/firestore/lite"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import type { CollectionConfig } from "@/lib/admin-config"
import { serialize } from "@/lib/data"
import { db } from "@/lib/firebase"
import { FieldInput, normalize } from "./field-input"

type Row = Record<string, unknown> & { id: string }

export async function fetchCollection(name: string): Promise<Row[]> {
  const snap = await getDocs(collection(db, name))
  return snap.docs
    .map((d) => ({ ...(serialize(d.data()) as object), id: d.id }) as Row)
    .sort((a, b) => Number(a.order ?? 999) - Number(b.order ?? 999))
}

export function CollectionManager({ config }: { config: CollectionConfig }) {
  const { data, error, isLoading, mutate } = useSWR(["collection", config.name], () => fetchCollection(config.name))
  const [editing, setEditing] = useState<Row | "new" | null>(null)
  const [values, setValues] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)

  function open(row: Row | "new") {
    setEditing(row)
    setValues(row === "new" ? { order: (data?.length ?? 0) + 1 } : row)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const payload = normalize(config.fields, values)
    try {
      if (editing === "new") await addDoc(collection(db, config.name), { ...payload, timestamp: serverTimestamp() })
      else if (editing) await updateDoc(doc(db, config.name, editing.id), payload as DocumentData)
      toast.success("Guardado com sucesso.")
      setEditing(null)
      mutate()
    } catch (err) {
      console.error(err)
      toast.error("Erro ao guardar. Verifique as permissões do Firestore.")
    } finally {
      setSaving(false)
    }
  }

  async function remove(row: Row) {
    if (!confirm(`Eliminar "${String(row[config.titleField] ?? "")}"?`)) return
    try {
      await deleteDoc(doc(db, config.name, row.id))
      toast.success("Eliminado.")
      mutate()
    } catch (err) {
      console.error(err)
      toast.error("Erro ao eliminar.")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-semibold">{config.label}</h1>
          <p className="text-sm text-muted-foreground">{data ? `${data.length} registo(s)` : "A carregar..."}</p>
        </div>
        <Button onClick={() => open("new")}>
          <Plus /> Adicionar {config.singular}
        </Button>
      </div>

      {editing && (
        <form onSubmit={save} className="flex flex-col gap-4 rounded-xl border bg-card p-6">
          <h2 className="font-serif text-xl font-semibold">{editing === "new" ? `Novo ${config.singular}` : `Editar ${config.singular}`}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {config.fields.map((f) => (
              <div key={f.name} className={f.type === "textarea" || f.type === "list" ? "md:col-span-2" : ""}>
                <FieldInput field={f} value={values[f.name]} onChange={(v) => setValues((prev) => ({ ...prev, [f.name]: v }))} />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "A guardar..." : "Guardar"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
          </div>
        </form>
      )}

      {error && <p className="text-sm text-destructive">Erro ao carregar dados: {String(error.message ?? error)}</p>}
      {isLoading && <p className="text-sm text-muted-foreground">A carregar...</p>}
      {data && data.length === 0 && (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Ainda não há registos. O site está a mostrar o conteúdo original. Use &quot;Importar conteúdo original&quot; na Visão Geral para editá-lo aqui.
        </p>
      )}

      <ul className="flex flex-col divide-y rounded-xl border bg-card">
        {data?.map((row) => {
          const img = config.imageField ? String(row[config.imageField] ?? "") : ""
          return (
            <li key={row.id} className="flex items-center gap-4 p-4">
              {config.imageField && (
                img ? (
                  <img src={img || "/placeholder.svg"} alt="" className="size-12 shrink-0 rounded-md object-cover" />
                ) : (
                  <div className="size-12 shrink-0 rounded-md bg-secondary" aria-hidden />
                )
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{String(row[config.titleField] ?? "Sem título")}</p>
                {config.subtitleField && (
                  <p className="truncate text-sm text-muted-foreground">{String(row[config.subtitleField] ?? "")}</p>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={() => open(row)} aria-label="Editar">
                <Pencil />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(row)} aria-label="Eliminar" className="text-destructive">
                <Trash2 />
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
