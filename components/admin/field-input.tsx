"use client"

import type { Field } from "@/lib/admin-config"

export const adminInput =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"

export function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const id = `field-${field.name}`
  const label = (
    <span className="text-sm font-medium">
      {field.label}
      {field.required && <span className="text-destructive"> *</span>}
    </span>
  )

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2" htmlFor={id}>
        <input id={id} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="size-4" />
        {label}
      </label>
    )
  }

  let control: React.ReactNode
  if (field.type === "textarea" || field.type === "list") {
    const text = field.type === "list" && Array.isArray(value) ? value.join("\n") : String(value ?? "")
    control = (
      <textarea
        id={id}
        required={field.required}
        rows={field.type === "list" ? 5 : 4}
        value={text}
        onChange={(e) =>
          onChange(field.type === "list" ? e.target.value.split("\n") : e.target.value)
        }
        className={adminInput}
      />
    )
  } else if (field.type === "select") {
    control = (
      <select id={id} required={field.required} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={adminInput}>
        <option value="" disabled>
          Seleccione
        </option>
        {field.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    )
  } else {
    control = (
      <input
        id={id}
        type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
        required={field.required}
        value={value === undefined || value === null ? "" : String(value)}
        onChange={(e) => onChange(field.type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)}
        className={adminInput}
      />
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id}>{label}</label>
      {control}
      {field.hint && <p className="text-xs text-muted-foreground">{field.hint}</p>}
    </div>
  )
}

export function normalize(fields: Field[], values: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const f of fields) {
    const v = values[f.name]
    if (f.type === "list") out[f.name] = (Array.isArray(v) ? v : []).map((s) => String(s).trim()).filter(Boolean)
    else if (f.type === "boolean") out[f.name] = Boolean(v)
    else if (f.type === "number") out[f.name] = v === "" || v === undefined ? 999 : Number(v)
    else out[f.name] = String(v ?? "").trim()
  }
  return out
}
