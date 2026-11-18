"use client"

import { useState } from "react"
import useSWR from "swr"
import { doc, getDoc, setDoc } from "firebase/firestore/lite"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FieldInput } from "@/components/admin/field-input"
import type { Field } from "@/lib/admin-config"
import { defaultSettings } from "@/lib/defaults"
import { db } from "@/lib/firebase"
import type { SiteSettings } from "@/lib/types"

const SECTIONS: { title: string; fields: Field[] }[] = [
  {
    title: "Página Inicial",
    fields: [
      { name: "hero_title", label: "Título principal", type: "text" },
      { name: "hero_subtitle", label: "Subtítulo", type: "textarea" },
      { name: "hero_cta", label: "Texto do botão", type: "text" },
      { name: "stats", label: "Estatísticas", type: "list", hint: "Uma por linha no formato: valor | rótulo (ex.: 500+ | Casos de Sucesso)" },
    ],
  },
  {
    title: "Sobre Nós",
    fields: [
      { name: "about_title", label: "Título", type: "text" },
      { name: "about_intro", label: "Introdução", type: "textarea" },
      { name: "history_p1", label: "História — parágrafo 1", type: "textarea" },
      { name: "history_p2", label: "História — parágrafo 2", type: "textarea" },
      { name: "history_p3", label: "História — parágrafo 3", type: "textarea" },
      { name: "mission", label: "Missão", type: "textarea" },
      { name: "vision", label: "Visão", type: "textarea" },
      { name: "values", label: "Valores", type: "list", hint: "Um por linha." },
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
      { name: "hours_week", label: "Horário — dias úteis", type: "text" },
      { name: "hours_saturday", label: "Horário — sábado", type: "text" },
      { name: "hours_urgent", label: "Atendimento urgente", type: "text" },
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

function toForm(s: SiteSettings): FormValues {
  return { ...s, stats: s.stats.map((st) => `${st.value} | ${st.label}`) }
}

function fromForm(v: FormValues): SiteSettings {
  const lines = (x: unknown) => (Array.isArray(x) ? x : []).map((l) => String(l).trim()).filter(Boolean)
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(defaultSettings)) out[key] = typeof v[key] === "string" ? (v[key] as string).trim() : v[key]
  out.values = lines(v.values)
  out.stats = lines(v.stats).map((l) => {
    const [value, ...label] = l.split("|")
    return { value: value.trim(), label: label.join("|").trim() }
  })
  return out as SiteSettings
}

async function loadSettings() {
  const snap = await getDoc(doc(db, "website_content", "general"))
  return { ...defaultSettings, ...(snap.exists() ? (snap.data() as Partial<SiteSettings>) : {}) }
}

function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [values, setValues] = useState<FormValues>(() => toForm(initial))
  const [saving, setSaving] = useState(false)

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await setDoc(doc(db, "website_content", "general"), fromForm(values))
      toast.success("Conteúdo do site actualizado.")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao guardar. Verifique as permissões do Firestore.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-6">
      {SECTIONS.map((section) => (
        <fieldset key={section.title} className="rounded-xl border bg-card p-6">
          <legend className="px-1 font-serif text-xl font-semibold">{section.title}</legend>
          <div className="mt-2 grid gap-4 md:grid-cols-2">
            {section.fields.map((f) => (
              <div key={f.name} className={f.type === "textarea" || f.type === "list" ? "md:col-span-2" : ""}>
                <FieldInput field={f} value={values[f.name]} onChange={(v) => setValues((p) => ({ ...p, [f.name]: v }))} />
              </div>
            ))}
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
  const { data, error } = useSWR("settings", loadSettings, { revalidateOnFocus: false })
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
