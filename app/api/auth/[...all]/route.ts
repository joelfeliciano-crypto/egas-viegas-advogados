import { timingSafeEqual } from "node:crypto"
import { count } from "drizzle-orm"
import { toNextJsHandler } from "better-auth/next-js"
import { auth } from "@/lib/auth"
import { user } from "@/lib/db-schema"
import { db } from "@/lib/db"

const handlers = toNextJsHandler(auth)

export const GET = handlers.GET

export async function POST(request: Request) {
  if (new URL(request.url).pathname.endsWith("/sign-up/email")) {
    const expected = process.env.ADMIN_SETUP_CODE
    const provided = request.headers.get("x-admin-setup-code") ?? ""
    const matches = Boolean(expected && expected.length === provided.length && timingSafeCodeMatch(expected, provided))
    const [{ value: userCount }] = await db.select({ value: count() }).from(user)
    if (!matches || userCount > 0) {
      return Response.json({ message: "Registo inicial não autorizado." }, { status: 403 })
    }
  }

  return handlers.POST(request)
}

function timingSafeCodeMatch(expected: string, provided: string) {
  return timingSafeEqual(Buffer.from(expected), Buffer.from(provided))
}
