import type { Metadata } from "next"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/site/contact-form"
import { PageHero } from "@/components/site/page-hero"
import { getAreas, getSettings } from "@/lib/data"
import { getCopy } from "@/lib/i18n"
import { getLocale } from "@/lib/locale-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const english = locale === "en"
  return {
    title: english ? "Contact Us" : "Contacte-nos",
    alternates: { canonical: "/contacto" },
    description: english
      ? "Contact Egas Viegas law firm in Luanda or Bié, Angola. Get in touch with our team for legal consultation and services."
      : "Contacte o escritório de advocacia Egas Viegas em Luanda ou no Bié, Angola. Entre em contacto com a nossa equipa para consulta e serviços jurídicos.",
    keywords: english
      ? "contact law firm, legal consultation, Angola, Luanda, Bié, lawyer contact"
      : "contacto escritório, consulta jurídica, Angola, Luanda, Bié, contacto advogado",
  }
}

export default async function ContactPage() {
  const locale = await getLocale()
  const copy = getCopy(locale)
  const [s, areas] = await Promise.all([getSettings(locale), getAreas(locale)])
  const info = [
    { icon: MapPin, title: copy.contact.luanda, lines: [s.address_luanda, s.contact_phone] },
    { icon: MapPin, title: copy.contact.bie, lines: [s.address_bie, s.contact_phone_bie] },
    { icon: Mail, title: copy.contact.email, lines: [s.email] },
    { icon: Clock, title: copy.contact.hours, lines: [s.hours_week, s.hours_saturday, s.hours_urgent] },
  ]
  return (
    <>
      <PageHero eyebrow={copy.contact.eyebrow} title={copy.contact.title} subtitle={copy.contact.subtitle} />
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
              <Phone className="size-4" aria-hidden /> {copy.contact.whatsapp}
            </a>
          </li>
        </ul>
        <ContactForm areas={areas.map((a) => a.title)} locale={locale} />
      </section>
    </>
  )
}
