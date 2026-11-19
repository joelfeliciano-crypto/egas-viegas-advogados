import { contactMessages } from "@/lib/db-schema"
import { db } from "@/lib/db"

const limits = {
  name: 120,
  email: 160,
  phone: 40,
  company: 120,
  area: 120,
  subject: 200,
  message: 5000,
} as const

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  if (!origin || !host || new URL(origin).host !== host) {
    return Response.json({ error: "Origem não autorizada." }, { status: 403 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Pedido inválido." }, { status: 400 })
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Pedido inválido." }, { status: 400 })
  }

  const source = body as Record<string, unknown>
  const values = Object.fromEntries(Object.entries(limits).map(([key, max]) => [
    key,
    typeof source[key] === "string" ? source[key].trim().slice(0, max) : "",
  ])) as Record<keyof typeof limits, string>

  if (!values.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || !values.phone || !values.area || !values.subject || !values.message) {
    return Response.json({ error: "Preencha os campos obrigatórios corretamente." }, { status: 400 })
  }

  try {
    await db.insert(contactMessages).values(values)
    return Response.json({ success: true }, { status: 201 })
  } catch {
    return Response.json({ error: "Não foi possível guardar a mensagem." }, { status: 500 })
  }
}
