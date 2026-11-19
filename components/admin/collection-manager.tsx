"use client"

import { useState } from "react"
import useSWR from "swr"
import { ImagePlus, Pencil, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import type { CollectionConfig } from "@/lib/admin-config"
import { deleteCollectionItem, listCollection, saveCollectionItem } from "@/lib/admin-actions"
import { FieldInput, normalize } from "./field-input"

type Row = Record<string, unknown> & { id: string }

export function CollectionManager({ config }: { config: CollectionConfig }) {
  const { data, error, isLoading, mutate } = useSWR(["collection", config.name], () => listCollection(config.name))
  const [editing, setEditing] = useState<Row | "new" | null>(null)
  const [values, setValues] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState("")

  async function uploadTeamImage(file: File) {
    setUploadingImage(true)
    setUploadError("")
    try {
      const formData = new FormData()
      formData.set("file", file)
      const response = await fetch("/api/admin/team-image", { method: "POST", body: formData })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Não foi possível carregar a imagem.")
      setValues((current) => ({ ...current, img: result.url }))
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Não foi possível carregar a imagem.")
    } finally {
      setUploadingImage(false)
    }
  }

  function open(row: Row | "new") {
    setEditing(row)
    setValues(row === "new" ? { order: (data?.length ?? 0) + 1 } : row)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const payload = normalize(config.fields, values)
    const englishValues = (values.translations as { en?: Record<string, unknown> } | undefined)?.en ?? {}
    payload.translations = {
      en: Object.fromEntries(
        config.fields
          .filter((field) => field.translatable)
          .map((field) => [field.name, englishValues[field.name] ?? (field.type === "list" ? [] : "")]),
      ),
    }
    try {
      if (editing === "new") await saveCollectionItem(config.name, null, payload)
      else if (editing) await saveCollectionItem(config.name, editing.id, payload)
      toast.success("Guardado com sucesso.")
      setEditing(null)
      mutate()
    } catch {
      toast.error("Erro ao guardar o conteúdo. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  async function remove(row: Row) {
    if (!confirm(`Eliminar "${String(row[config.titleField] ?? "")}"?`)) return
    try {
      await deleteCollectionItem(config.name, row.id)
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
          <p className="text-sm text-muted-foreground">
            Os campos em inglês são apresentados quando o visitante escolhe EN. Se deixar uma tradução vazia, será apresentado o conteúdo em português.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {config.fields.map((f) => {
              const englishValues = (values.translations as { en?: Record<string, unknown> } | undefined)?.en ?? {}
              return (
                <div key={f.name} className={f.type === "textarea" || f.type === "list" ? "md:col-span-2" : ""}>
                  {config.name === "membros" && f.name === "img" ? (
                    <div className="flex flex-col gap-3">
                      <FieldInput field={f} value={values[f.name]} onChange={(v) => setValues((prev) => ({ ...prev, [f.name]: v }))} />
                      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-secondary">
                        <ImagePlus className="size-4" aria-hidden />
                        {uploadingImage ? "A carregar imagem..." : "Carregar imagem"}
                        <input
                          className="sr-only"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/avif"
                          disabled={uploadingImage}
                          aria-label="Escolher fotografia da equipa"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0]
                            if (file) void uploadTeamImage(file)
                            event.currentTarget.value = ""
                          }}
                        />
                      </label>
                      <p className="text-xs text-muted-foreground">JPG, PNG, WebP ou AVIF, até 5 MB. Também pode colar um URL acima.</p>
                      {uploadError && <p role="alert" className="text-sm text-destructive">{uploadError}</p>}
                      {typeof values.img === "string" && values.img && (
                        <img src={values.img} alt="Pré-visualização da fotografia" className="size-24 rounded-md border object-cover" />
                      )}
                    </div>
                  ) : (
                    <FieldInput field={f} value={values[f.name]} onChange={(v) => setValues((prev) => ({ ...prev, [f.name]: v }))} />
                  )}
                  {f.translatable && (
                    <div className="mt-4">
                      <FieldInput
                        field={{ ...f, name: `en-${f.name}`, label: `English — ${f.label}`, required: false, hint: undefined }}
                        value={englishValues[f.name]}
                        onChange={(value) => setValues((prev) => {
                          const translations = (prev.translations as { en?: Record<string, unknown> } | undefined) ?? {}
                          return { ...prev, translations: { ...translations, en: { ...translations.en, [f.name]: value } } }
                        })}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving || uploadingImage}>
              {saving ? "A guardar..." : uploadingImage ? "A carregar imagem..." : "Guardar"}
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
          Ainda não há registos. O site está a mostrar o conteúdo de demonstração. Use &quot;Importar conteúdo original&quot; na Visão Geral para editá-lo aqui.
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
