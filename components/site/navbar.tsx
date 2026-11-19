"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { getCopy, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function Logo({ light = false, locale = "pt" }: { light?: boolean; locale?: Locale }) {
  const copy = getCopy(locale)
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`Egas Viegas - ${copy.nav.home}`}>
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/evlogo1.jfif-dlF5HLMabuT5alyVWTMgjo4AbualZk.jpeg"
        alt={locale === "en" ? "Egas Viegas logo" : "Logótipo Egas Viegas"}
        className="h-11 w-12 shrink-0 object-contain"
      />
      <span className={cn("flex flex-col leading-tight", light ? "text-primary-foreground" : "text-foreground")}>
        <span className="font-serif text-lg font-semibold tracking-wide">Egas Viegas</span>
        <span className="text-[10px] uppercase tracking-[0.25em] opacity-70">{copy.brand}</span>
      </span>
    </Link>
  )
}

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const copy = getCopy(locale)
  const links = [
    { href: "/", label: copy.nav.home },
    { href: "/sobre", label: copy.nav.about },
    { href: "/areas", label: copy.nav.areas },
    { href: "/equipa", label: copy.nav.team },
    { href: "/conteudos", label: copy.nav.content },
    { href: "/contacto", label: copy.nav.contact },
  ]

  function switchLanguage() {
    const next = locale === "pt" ? "en" : "pt"
    const secure = window.location.protocol === "https:" ? "; Secure" : ""
    document.cookie = `site-locale=${next}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-primary/95 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 py-3" aria-label={copy.nav.main} style={{ color: "#000000" }}>
        <Logo light locale={locale} />
        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm text-primary-foreground/75 transition-colors hover:text-accent",
                    active && "text-accent",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={switchLanguage}
            aria-label={locale === "pt" ? copy.nav.switchToEnglish : copy.nav.switchToPortuguese}
            title={locale === "pt" ? copy.nav.switchToEnglish : copy.nav.switchToPortuguese}
            className="rounded-md border border-white/30 px-2.5 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {locale === "pt" ? "EN" : "PT"}
          </button>
          <button
            type="button"
            className="text-primary-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul id="mobile-menu" className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 lg:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2.5 text-primary-foreground/85 hover:bg-white/5 hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
