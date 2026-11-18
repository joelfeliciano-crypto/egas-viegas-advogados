import type { Metadata } from "next"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/site/contact-form"
import { PageHero } from "@/components/site/page-hero"
import { getAreas, getSettings } from "@/lib/data"

export const metadata: Metadata = { title: "Contacto" }

export default async function ContactPage() {
  const [s, areas] = await Promise.all([getSettings(), getAreas()])
  const info = [
    { icon: MapPin, title: "Luanda", lines: [s.address_luanda, s.contact_phone] },
    { icon: MapPin, title: "Bié", lines: [s.address_bie, s.contact_phone_bie] },
    { icon: Mail, title: "E-mail", lines: [s.email] },
    { icon: Clock, title: "Horário", lines: [s.hours_week, s.hours_saturday, s.hours_urgent] },
  ]
  return (
    <>
      <PageHero eyebrow="Contacto" title="Fale connosco" subtitle="Estamos prontos para ouvir e encontrar a melhor solução para o seu caso." />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[1fr_2fr]">
        <ul className="flex flex-col gap-6">
          {info.map((i) => (
            <li key={i.title} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-accent">
                <i.icon className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-serif text-lg font-semibold">{i.title}</h2>
                {i.lines.filter(Boolean).map((l) => (
                  <p key={l} className="break-words text-sm text-muted-foreground">
                    {l}
                  </p>
                ))}
              </div>
            </li>
          ))}
          <li>
            <a href={s.whatsapp_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gold-ink hover:underline">
              <Phone className="size-4" aria-hidden /> Falar pelo WhatsApp
            </a>
          </li>
        </ul>
        <ContactForm areas={areas.map((a) => a.title)} />
      </section>
    </>
  )
}
