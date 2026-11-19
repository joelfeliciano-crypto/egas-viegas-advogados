import type { Metadata } from "next"
import { count } from "drizzle-orm"
import { headers } from "next/headers"
import { AdminShell } from "@/components/admin/admin-shell"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user } from "@/lib/db-schema"

export const metadata: Metadata = { title: "Painel de Gestão", robots: { index: false, follow: false } }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })
  const [{ value: userCount }] = session ? [{ value: 1 }] : await db.select({ value: count() }).from(user)
  const authenticated = Boolean(session?.user)

  return (
    <AdminShell
      authenticated={authenticated}
      canBootstrap={!authenticated && userCount === 0 && Boolean(process.env.ADMIN_SETUP_CODE)}
      userEmail={session?.user.email}
    >
      {authenticated ? children : null}
    </AdminShell>
  )
}
