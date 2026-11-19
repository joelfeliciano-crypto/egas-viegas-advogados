"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
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
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/site/navbar"
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

function LoginForm({ canBootstrap }: { canBootstrap: boolean }) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    setLoading(true)
    setError("")

    try {
      if (canBootstrap) {
        const response = await fetch("/api/auth/sign-up/email", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-admin-setup-code": String(values.get("setupCode") ?? ""),
          },
          body: JSON.stringify({
            name: String(values.get("name") ?? "").trim(),
            email: String(values.get("email") ?? "").trim(),
            password: String(values.get("password") ?? ""),
          }),
        })
        if (!response.ok) throw new Error("Setup failed")
      } else {
        const result = await authClient.signIn.email({
          email: String(values.get("email") ?? "").trim(),
          password: String(values.get("password") ?? ""),
        })
        if (result.error) throw new Error("Sign-in failed")
      }

      router.replace("/admin")
      router.refresh()
    } catch {
      setError(canBootstrap ? "Não foi possível criar o acesso. Confirme o código e os dados introduzidos." : "E-mail ou palavra-passe inválidos.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary p-4">
      <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-card p-8">
        <div className="flex flex-col gap-4">
          <Logo />
          <h1 className="font-serif text-3xl font-semibold">Painel de Gestão</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {canBootstrap ? "Crie a primeira conta administrativa." : "Inicie sessão com a sua conta administrativa."}
          </p>
        </div>
        {canBootstrap && (
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Nome
            <input name="name" type="text" required maxLength={120} autoComplete="name" className={adminInput} />
          </label>
        )}
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          E-mail
          <input name="email" type="email" required autoComplete="email" className={adminInput} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Palavra-passe
          <input name="password" type="password" required minLength={12} autoComplete={canBootstrap ? "new-password" : "current-password"} className={adminInput} />
        </label>
        {canBootstrap && (
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Código inicial de administrador
            <input name="setupCode" type="password" required autoComplete="off" className={adminInput} />
          </label>
        )}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={loading} className="h-10">
          {loading ? "A processar..." : canBootstrap ? "Criar acesso" : "Entrar"}
        </Button>
        <Link href="/" className="text-center text-sm text-muted-foreground hover:underline">
          Voltar ao site
        </Link>
      </form>
    </main>
  )
}

export function AdminShell({
  children,
  authenticated,
  canBootstrap,
  userEmail,
}: {
  children: React.ReactNode
  authenticated: boolean
  canBootstrap: boolean
  userEmail?: string
}) {
  const pathname = usePathname()
  const router = useRouter()

  if (!authenticated) return <LoginForm canBootstrap={canBootstrap} />

  async function logout() {
    await authClient.signOut()
    router.replace("/admin")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen flex-col bg-secondary md:flex-row">
      <aside className="flex shrink-0 flex-col bg-primary text-primary-foreground md:sticky md:top-0 md:h-screen md:w-64">
        <div className="flex flex-col gap-3 p-5">
          <Logo light />
          <p className="font-serif text-xl">Painel de Gestão</p>
        </div>
        <nav aria-label="Painel" className="flex-1 overflow-x-auto md:overflow-y-auto">
          <ul className="flex gap-1 px-3 pb-3 md:flex-col">
            {NAV.map((item) => {
              const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm text-primary-foreground/75 hover:bg-white/5 hover:text-primary-foreground",
                      active && "bg-white/10 text-accent",
                    )}
                  >
                    <item.icon className="size-4" aria-hidden />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="hidden flex-col gap-2 border-t border-white/10 p-4 text-sm md:flex">
          <p className="truncate text-primary-foreground/60">{userEmail}</p>
          <Link href="/" target="_blank" className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
            <ExternalLink className="size-4" aria-hidden /> Ver site
          </Link>
          <button type="button" onClick={logout} className="flex items-center gap-2 text-left text-primary-foreground/80 hover:text-accent">
            <LogOut className="size-4" aria-hidden /> Terminar sessão
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-8">
        <div className="mb-4 flex justify-end md:hidden">
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut /> Sair
          </Button>
        </div>
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  )
}
