"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { adminInput } from "@/components/admin/field-input"

export function ChangePasswordForm() {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    const currentPassword = String(values.get("currentPassword") ?? "")
    const newPassword = String(values.get("newPassword") ?? "")
    const confirmation = String(values.get("confirmation") ?? "")

    if (newPassword.length < 12) {
      setError("A nova palavra-passe deve ter pelo menos 12 caracteres.")
      return
    }

    if (newPassword !== confirmation) {
      setError("A confirmação não corresponde à nova palavra-passe.")
      return
    }

    setSaving(true)
    setError("")

    try {
      const result = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      })

      if (result.error) throw new Error("Password change failed")

      form.reset()
      toast.success("Palavra-passe alterada. As outras sessões foram terminadas.")
    } catch {
      setError("Não foi possível alterar a palavra-passe. Confirme a palavra-passe atual e tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5 rounded-xl border bg-card p-6">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Palavra-passe atual
        <input name="currentPassword" type="password" required autoComplete="current-password" className={adminInput} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Nova palavra-passe
        <input name="newPassword" type="password" required minLength={12} autoComplete="new-password" className={adminInput} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Confirmar nova palavra-passe
        <input name="confirmation" type="password" required minLength={12} autoComplete="new-password" className={adminInput} />
      </label>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <p className="text-sm text-muted-foreground">A nova palavra-passe deve ter pelo menos 12 caracteres. As outras sessões serão terminadas.</p>
      <div>
        <Button type="submit" disabled={saving}>
          {saving ? "A alterar..." : "Alterar palavra-passe"}
        </Button>
      </div>
    </form>
  )
}
