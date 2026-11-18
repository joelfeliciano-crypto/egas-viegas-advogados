"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth"
import {
  BookOpen,
  Briefcase,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquareQuote,
  Settings,
  Sparkles,
  Users,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase-auth"
import { cn } from "@/lib/utils"
import { adminInput } from "./field-input"

const NAV = [
  { href: "/admin", label: "Visão Geral", icon: LayoutDashboard },
  { href: "/admin/mensagens", label: "Mensagens", icon: Mail },
  { href: "/admin/definicoes", label: "Conteúdo do Site", icon: Settings },
  { href: "/admin/areas", label: "Áreas", icon: Briefcase },
  { href: "/admin/team", label: "Equipa", icon: Users },
  { href: "/admin/articles", label: "Artigos", icon: BookOpen },
  { href: "/admin/videos", label: "Vídeos", icon: Video },
  { href: "/admin/thoughts", label: "Pensamentos", icon: Sparkles },
  { href: "/admin/testimonials", label: "Avaliações", icon: MessageSquareQuote },
]

function LoginForm() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setLoading(true)
    setError("")
    try {
      await signInWithEmailAndPassword(auth, String(fd.get("email")), String(fd.get("password")))
    } catch {
      setError("E-mail ou palavra-passe inválidos.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary p-4">
      <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-card p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-ink">Egas Viegas</p>
          <h1 className="font-serif text-3xl font-semibold">Painel de Gestão</h1>
          <p className="mt-1 text-sm text-muted-foreground">Inicie sessão com a sua conta Firebase.</p>
        </div>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          E-mail
          <input name="email" type="email" required autoComplete="email" className={adminInput} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Palavra-passe
          <input name="password" type="password" required autoComplete="current-password" className={adminInput} />
        </label>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" disabled={loading} className="h-10">
          {loading ? "A entrar..." : "Entrar"}
        </Button>
        <Link href="/" className="text-center text-sm text-muted-foreground hover:underline">
          Voltar ao site
        </Link>
      </form>
    </main>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const pathname = usePathname()

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  if (user === undefined) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">A carregar...</div>
  }
  if (!user) return <LoginForm />

  return (
    <div className="flex min-h-screen flex-col bg-secondary md:flex-row">
      <aside className="flex shrink-0 flex-col bg-primary text-primary-foreground md:sticky md:top-0 md:h-screen md:w-64">
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Egas Viegas</p>
          <p className="font-serif text-xl">Painel de Gestão</p>
        </div>
        <nav aria-label="Painel" className="flex-1 overflow-x-auto md:overflow-y-auto">
          <ul className="flex gap-1 px-3 pb-3 md:flex-col">
            {NAV.map((n) => {
              const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm text-primary-foreground/75 hover:bg-white/5 hover:text-primary-foreground",
                      active && "bg-white/10 text-accent",
                    )}
                  >
                    <n.icon className="size-4" aria-hidden />
                    {n.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="hidden flex-col gap-2 border-t border-white/10 p-4 text-sm md:flex">
          <p className="truncate text-primary-foreground/60">{user.email}</p>
          <Link href="/" target="_blank" className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
            <ExternalLink className="size-4" aria-hidden /> Ver site
          </Link>
          <button type="button" onClick={() => signOut(auth)} className="flex items-center gap-2 text-left text-primary-foreground/80 hover:text-accent">
            <LogOut className="size-4" aria-hidden /> Terminar sessão
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-8">
        <div className="mb-4 flex justify-end md:hidden">
          <Button variant="outline" size="sm" onClick={() => signOut(auth)}>
            <LogOut /> Sair
          </Button>
        </div>
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  )
}
