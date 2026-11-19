"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { NAV_LINKS } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Egas Viegas - Início">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/evlogo1.jfif-dlF5HLMabuT5alyVWTMgjo4AbualZk.jpeg"
        alt="Logótipo Egas Viegas"
        className="h-11 w-12 shrink-0 object-contain"
      />
      <span className={cn("flex flex-col leading-tight", light ? "text-primary-foreground" : "text-foreground")}>
        <span className="font-serif text-lg font-semibold tracking-wide">Egas Viegas</span>
        <span className="text-[10px] uppercase tracking-[0.25em] opacity-70">Sociedade de Advogados</span>
      </span>
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-primary/95 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 py-3" aria-label="Principal" style={{ color: "#000000" }}>
        <Logo light />
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
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
        <button
          type="button"
          className="text-primary-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>
      {open && (
        <ul id="mobile-menu" className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 lg:hidden">
          {NAV_LINKS.map((link) => (
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
