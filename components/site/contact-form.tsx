"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { getCopy, type Locale } from "@/lib/i18n"

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"

export function ContactForm({ areas, locale }: { areas: string[]; locale: Locale }) {
  const copy = getCopy(locale)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    const clean = (v: string | undefined, max: number) => (v ?? "").trim().slice(0, max)
    setSending(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: clean(data.name, 120),
          email: clean(data.email, 160),
          phone: clean(data.phone, 40),
          company: clean(data.company, 120),
          area: clean(data.area, 120),
          subject: clean(data.subject, 200),
          message: clean(data.message, 5000),
        }),
      })
      if (!response.ok) throw new Error("Contact request failed")
      form.reset()
      setSent(true)
      toast.success(copy.form.successToast)
    } catch (error) {
      console.error(error)
      toast.error(copy.form.errorToast)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border bg-card p-8" role="status">
        <h2 className="font-serif text-2xl font-semibold">{copy.form.sent}</h2>
        <p className="mt-2 text-muted-foreground">{copy.form.sentDescription}</p>
        <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>
          {copy.form.sendAnother}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2 md:p-8">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        {copy.form.fullName} *
        <input name="name" required maxLength={120} autoComplete="name" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        {copy.form.email} *
        <input name="email" type="email" required maxLength={160} autoComplete="email" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        {copy.form.phone} *
        <input name="phone" type="tel" required maxLength={40} autoComplete="tel" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        {copy.form.company}
        <input name="company" maxLength={120} autoComplete="organization" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        {copy.form.area} *
        <select name="area" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            {copy.form.select}
          </option>
          {areas.map((a) => (
            <option key={a}>{a}</option>
          ))}
          <option>{copy.form.other}</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        {copy.form.subject} *
        <input name="subject" required maxLength={200} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium sm:col-span-2">
        {copy.form.message} *
        <textarea name="message" required rows={6} maxLength={5000} className={inputClass} />
      </label>
      <label className="flex items-start gap-2 text-sm text-muted-foreground sm:col-span-2">
        <input type="checkbox" required className="mt-1 accent-[var(--primary)]" />
        {copy.form.consent}
      </label>
      <Button type="submit" size="lg" disabled={sending} className="h-11 sm:col-span-2 sm:justify-self-start sm:px-8">
        {sending ? copy.form.sending : copy.form.send}
      </Button>
    </form>
  )
}
