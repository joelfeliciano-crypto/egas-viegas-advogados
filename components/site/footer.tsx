import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import type { SiteSettings } from "@/lib/types"
import { NAV_LINKS } from "@/lib/nav"
import { Logo } from "./navbar"

export function Footer({ settings }: { settings: SiteSettings }) {
  const socials = [
    { label: "LinkedIn", href: settings.linkedin },
    { label: "Instagram", href: settings.instagram },
    { label: "Facebook", href: settings.facebook },
    { label: "YouTube", href: settings.youtube },
    { label: "TikTok", href: settings.tiktok },
  ].filter((s) => s.href)

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Logo light />
          <p className="text-sm leading-relaxed text-primary-foreground/70">{settings.hero_subtitle}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/70 underline-offset-4 hover:text-accent hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-lg text-accent">Links Rápidos</h2>
          <ul className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-primary-foreground/70 hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-lg text-accent">Contacto</h2>
          <ul className="flex flex-col gap-3 text-sm text-primary-foreground/70">
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <a href={`mailto:${settings.email}`} className="break-all hover:text-accent">
                {settings.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span>
                {settings.contact_phone}
                <br />
                {settings.contact_phone_bie}
              </span>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span>{settings.address_luanda}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-primary-foreground/50">
          {"© "}
          {new Date().getFullYear()} Egas Viegas - Sociedade de Advogados, RL. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
