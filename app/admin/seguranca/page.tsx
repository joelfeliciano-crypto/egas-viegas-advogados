import { ChangePasswordForm } from "@/components/admin/change-password-form"

export default function SecurityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Segurança</h1>
        <p className="text-sm text-muted-foreground">Atualize a palavra-passe da sua conta administrativa.</p>
      </div>
      <ChangePasswordForm />
    </div>
  )
}
