"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"

export function ContactForm({ areas }: { areas: string[] }) {
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
      toast.success("Mensagem enviada! Entraremos em contacto em breve.")
    } catch (error) {
      console.error(error)
      toast.error("Não foi possível enviar a mensagem. Tente novamente ou contacte-nos por WhatsApp.")
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border bg-card p-8" role="status">
        <h2 className="font-serif text-2xl font-semibold">Obrigado pelo seu contacto</h2>
        <p className="mt-2 text-muted-foreground">Recebemos a sua mensagem e responderemos o mais rapidamente possível.</p>
        <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>
          Enviar outra mensagem
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2 md:p-8">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Nome completo *
        <input name="name" required maxLength={120} autoComplete="name" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        E-mail *
        <input name="email" type="email" required maxLength={160} autoComplete="email" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Telefone *
        <input name="phone" type="tel" required maxLength={40} autoComplete="tel" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Empresa
        <input name="company" maxLength={120} autoComplete="organization" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Área de interesse *
        <select name="area" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Seleccione
          </option>
          {areas.map((a) => (
            <option key={a}>{a}</option>
          ))}
          <option>Outra</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Assunto *
        <input name="subject" required maxLength={200} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium sm:col-span-2">
        Mensagem *
        <textarea name="message" required rows={6} maxLength={5000} className={inputClass} />
      </label>
      <label className="flex items-start gap-2 text-sm text-muted-foreground sm:col-span-2">
        <input type="checkbox" required className="mt-1 accent-[var(--primary)]" />
        Autorizo o tratamento dos meus dados pessoais para efeitos de resposta a este contacto.
      </label>
      <Button type="submit" size="lg" disabled={sending} className="h-11 sm:col-span-2 sm:justify-self-start sm:px-8">
        {sending ? "A enviar..." : "Enviar Mensagem"}
      </Button>
    </form>
  )
}
