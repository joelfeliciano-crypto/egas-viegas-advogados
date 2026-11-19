"use client"

import { useState } from "react"
import useSWR from "swr"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FieldInput } from "@/components/admin/field-input"
import { SETTINGS_TRANSLATABLE_FIELDS, type Field } from "@/lib/admin-config"
import { defaultSettings } from "@/lib/defaults"
import { getAdminSettings, saveAdminSettings } from "@/lib/admin-actions"
import type { SiteSettings } from "@/lib/types"

const SECTIONS: { title: string; fields: Field[] }[] = [
  {
    title: "Página Inicial",
    fields: [
      { name: "index_hero_title", label: "Título principal", type: "text", translatable: true },
      { name: "hero_subtitle", label: "Subtítulo", type: "textarea", translatable: true },
      { name: "hero_cta", label: "Texto do botão", type: "text", translatable: true },
      { name: "stats", label: "Estatísticas", type: "list", hint: "Uma por linha no formato: valor | rótulo (ex.: 500+ | Casos de Sucesso)", translatable: true },
    ],
  },
  {
    title: "Sobre Nós",
    fields: [
      { name: "about_title", label: "Título", type: "text", translatable: true },
      { name: "about_paragraph", label: "Introdução", type: "textarea", translatable: true },
      { name: "history_p1", label: "História — parágrafo 1", type: "textarea", translatable: true },
      { name: "history_p2", label: "História — parágrafo 2", type: "textarea", translatable: true },
      { name: "history_p3", label: "História — parágrafo 3", type: "textarea", translatable: true },
      { name: "mission", label: "Missão", type: "textarea", translatable: true },
      { name: "vision", label: "Visão", type: "textarea", translatable: true },
      { name: "values", label: "Valores", type: "list", hint: "Um por linha.", translatable: true },
    ],
  },
  {
    title: "Contactos",
    fields: [
      { name: "email", label: "E-mail", type: "text" },
      { name: "contact_phone", label: "Telefone Luanda", type: "text" },
      { name: "contact_phone_bie", label: "Telefone Bié", type: "text" },
      { name: "whatsapp_link", label: "Link WhatsApp", type: "url" },
      { name: "address_luanda", label: "Morada Luanda", type: "textarea" },
      { name: "address_bie", label: "Morada Bié", type: "textarea" },
      { name: "hours_week", label: "Horário — dias úteis", type: "text", translatable: true },
      { name: "hours_saturday", label: "Horário — sábado", type: "text", translatable: true },
      { name: "hours_urgent", label: "Atendimento urgente", type: "text", translatable: true },
    ],
  },
  {
    title: "Redes Sociais",
    fields: [
      { name: "linkedin", label: "LinkedIn", type: "url" },
      { name: "instagram", label: "Instagram", type: "url" },
      { name: "facebook", label: "Facebook", type: "url" },
      { name: "youtube", label: "YouTube", type: "url" },
      { name: "tiktok", label: "TikTok", type: "url" },
    ],
  },
]

type FormValues = Record<string, unknown>

function statsToLines(value: unknown) {
  return (Array.isArray(value) ? value : []).map((item) => {
    const stat = item as { value?: unknown; label?: unknown }
    return `${String(stat.value ?? "")} | ${String(stat.label ?? "")}`
  })
}

function linesToStats(value: unknown) {
  return (Array.isArray(value) ? value : []).map((line) => {
    const [statValue, ...label] = String(line).split("|")
    return { value: statValue.trim(), label: label.join("|").trim() }
  }).filter((stat) => stat.value || stat.label)
}

function toForm(s: SiteSettings): FormValues {
  const english = (s.translations?.en ?? {}) as Record<string, unknown>
  return {
    ...s,
    stats: statsToLines(s.stats),
    translations: {
      ...s.translations,
      en: { ...english, stats: statsToLines(english.stats) },
    },
  }
}

function fromForm(v: FormValues): SiteSettings {
  const lines = (x: unknown) => (Array.isArray(x) ? x : []).map((line) => String(line).trim()).filter(Boolean)
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(defaultSettings).filter((item) => item !== "translations")) {
    out[key] = typeof v[key] === "string" ? (v[key] as string).trim() : v[key]
  }
  out.values = lines(v.values)
  out.stats = linesToStats(v.stats)

  const englishSource = ((v.translations as { en?: Record<string, unknown> } | undefined)?.en ?? {})
  const english: Record<string, unknown> = { ...englishSource }
  english.values = lines(englishSource.values)
  english.stats = linesToStats(englishSource.stats)
  for (const field of SETTINGS_TRANSLATABLE_FIELDS) {
    if (field !== "values" && field !== "stats") english[field] = String(englishSource[field] ?? "").trim()
  }
  out.translations = { en: english }
  return out as SiteSettings
}

function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [values, setValues] = useState<FormValues>(() => toForm(initial))
  const [saving, setSaving] = useState(false)

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await saveAdminSettings(fromForm(values))
      toast.success("Conteúdo do site actualizado.")
    } catch {
      toast.error("Erro ao guardar as definições. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-6">
      {SECTIONS.map((section) => (
        <fieldset key={section.title} className="rounded-xl border bg-card p-6">
          <legend className="px-1 font-serif text-xl font-semibold">{section.title}</legend>
          <p className="mt-2 text-sm text-muted-foreground">Os campos em inglês são apresentados quando o visitante escolhe EN. Se deixar uma tradução vazia, será apresentado o conteúdo em português.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {section.fields.map((f) => {
              const englishValues = (values.translations as { en?: Record<string, unknown> } | undefined)?.en ?? {}
              return (
                <div key={f.name} className={f.type === "textarea" || f.type === "list" ? "md:col-span-2" : ""}>
                  <FieldInput field={f} value={values[f.name]} onChange={(v) => setValues((p) => ({ ...p, [f.name]: v }))} />
                  {f.translatable && (
                    <div className="mt-4">
                      <FieldInput
                        field={{ ...f, name: `en-${f.name}`, label: `Inglês — ${f.label}`, required: false, hint: undefined }}
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
        </fieldset>
      ))}
      <div className="sticky bottom-4 flex justify-end">
        <Button type="submit" size="lg" disabled={saving} className="h-11 px-8 shadow-lg">
          {saving ? "A guardar..." : "Guardar alterações"}
        </Button>
      </div>
    </form>
  )
}

export default function SettingsPage() {
  const { data, error } = useSWR("settings", getAdminSettings, { revalidateOnFocus: false })
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Conteúdo do Site</h1>
        <p className="text-sm text-muted-foreground">Textos, contactos e redes sociais apresentados no site.</p>
      </div>
      {error && <p className="text-sm text-destructive">Erro ao carregar: {String(error.message ?? error)}</p>}
      {data ? <SettingsForm initial={data} /> : !error && <p className="text-sm text-muted-foreground">A carregar...</p>}
    </div>
  )
}
