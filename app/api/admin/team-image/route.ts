import { put } from "@vercel/blob"
import { randomUUID } from "node:crypto"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"])

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: "Não autorizado." }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get("file")
  if (!(file instanceof File)) return NextResponse.json({ error: "Selecione uma imagem." }, { status: 400 })
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Formato não suportado. Use JPG, PNG, WebP ou AVIF." }, { status: 400 })
  }
  if (file.size === 0 || file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "A imagem deve ter até 5 MB." }, { status: 400 })
  }

  try {
    const extension = file.type.split("/")[1].replace("jpeg", "jpg")
    const blob = await put(`team/${randomUUID()}.${extension}`, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    })
    return NextResponse.json({ url: blob.url })
  } catch {
    return NextResponse.json({ error: "Não foi possível carregar a imagem." }, { status: 500 })
  }
}
