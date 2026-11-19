"use server"

import { randomUUID, timingSafeEqual } from "node:crypto"
import { and, count, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { COLLECTIONS, SETTINGS_TRANSLATABLE_FIELDS } from "@/lib/admin-config"
import { defaultSettings } from "@/lib/defaults"
import { contactMessages, siteContent, siteSettings } from "@/lib/db-schema"
import { db } from "@/lib/db"
import type { ContactMessage, SiteSettings } from "@/lib/types"

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user
}

function configForCollection(name: string) {
  const config = Object.values(COLLECTIONS).find((item) => item.name === name)
  if (!config) throw new Error("Unknown collection")
  return config
}

function validatePayload(collection: string, input: unknown) {
  const config = configForCollection(collection)
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid content")
  const source = input as Record<string, unknown>
  const result: Record<string, unknown> = {}

  for (const field of config.fields) {
    const value = source[field.name]
    if (field.required && (value === undefined || value === null || String(value).trim() === "")) {
      throw new Error(`${field.label} is required`)
    }
    if (value === undefined || value === null) continue

    if (field.type === "boolean") {
      if (typeof value !== "boolean") throw new Error(`Invalid ${field.name}`)
      result[field.name] = value
    } else if (field.type === "number") {
      const number = Number(value)
      if (!Number.isFinite(number)) throw new Error(`Invalid ${field.name}`)
      result[field.name] = number
    } else if (field.type === "list") {
      if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) throw new Error(`Invalid ${field.name}`)
      result[field.name] = (value as string[]).map((entry) => entry.trim()).filter(Boolean).slice(0, 100)
    } else {
      if (typeof value !== "string" || value.length > 10000) throw new Error(`Invalid ${field.name}`)
      const trimmed = value.trim()
      if (field.type === "url" && trimmed) {
        const url = new URL(trimmed)
        if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error(`Invalid ${field.name}`)
      }
      if (field.type === "select" && field.options && !field.options.some((option) => option.value === trimmed)) {
        throw new Error(`Invalid ${field.name}`)
      }
      result[field.name] = trimmed
    }
  }

  const rawTranslations = source.translations
  if (rawTranslations !== undefined) {
    if (!rawTranslations || typeof rawTranslations !== "object" || Array.isArray(rawTranslations)) throw new Error("Invalid translations")
    const englishSource = (rawTranslations as Record<string, unknown>).en
    if (englishSource !== undefined) {
      if (!englishSource || typeof englishSource !== "object" || Array.isArray(englishSource)) throw new Error("Invalid English translations")
      const english: Record<string, unknown> = {}
      for (const field of config.fields.filter((item) => item.translatable)) {
        const value = (englishSource as Record<string, unknown>)[field.name]
        if (value === undefined || value === null) continue
        if (field.type === "list") {
          if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string" || entry.length > 10000)) throw new Error(`Invalid English ${field.name}`)
          english[field.name] = (value as string[]).map((entry) => entry.trim()).filter(Boolean).slice(0, 100)
        } else {
          if (typeof value !== "string" || value.length > 10000) throw new Error(`Invalid English ${field.name}`)
          english[field.name] = value.trim()
        }
      }
      result.translations = { en: english }
    }
  }

  return result
}

export async function getAdminOverview() {
  await requireAdmin()
  const collections = Object.values(COLLECTIONS)
  const [contentCounts, messageCounts, unreadCounts, settings] = await Promise.all([
    Promise.all(collections.map(async (config) => {
      const [result] = await db.select({ value: count() }).from(siteContent).where(eq(siteContent.collection, config.name))
      return [config.name, result.value] as const
    })),
    db.select({ value: count() }).from(contactMessages),
    db.select({ value: count() }).from(contactMessages).where(eq(contactMessages.read, false)),
    db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.id, "general")).limit(1),
  ])

  return {
    counts: Object.fromEntries(contentCounts) as Record<string, number>,
    totalMessages: messageCounts[0]?.value ?? 0,
    unread: unreadCounts[0]?.value ?? 0,
    hasSettings: settings.length > 0,
  }
}

export async function seedDefaultContent() {
  await requireAdmin()
  const [existingSettings] = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.id, "general")).limit(1)
  if (!existingSettings) {
    await db.insert(siteSettings).values({ id: "general", data: defaultSettings as unknown as Record<string, unknown> }).onConflictDoNothing()
  }

  for (const config of Object.values(COLLECTIONS)) {
    if (!config.seed?.length) continue
    const [existing] = await db.select({ id: siteContent.id }).from(siteContent).where(eq(siteContent.collection, config.name)).limit(1)
    if (existing) continue
    await db.insert(siteContent).values(config.seed.map((item, index) => ({
      id: `default-${index}`,
      collection: config.name,
      data: item,
    }))).onConflictDoNothing()
  }

  revalidatePath("/")
  return getAdminOverview()
}

export async function listCollection(name: string): Promise<(Record<string, unknown> & { id: string })[]> {
  await requireAdmin()
  configForCollection(name)
  const rows = await db.select({ id: siteContent.id, data: siteContent.data }).from(siteContent).where(eq(siteContent.collection, name))
  const config = configForCollection(name)
  const items: (Record<string, unknown> & { id: string })[] = rows.map((row) => {
    const defaultIndex = /^default-(\d+)$/.exec(row.id)?.[1]
    const seededTranslations = defaultIndex === undefined ? undefined : config.seed?.[Number(defaultIndex)]?.translations
    return { ...row.data, translations: row.data.translations ?? seededTranslations, id: row.id }
  })
  return items.sort((a, b) => Number(a.order ?? 999) - Number(b.order ?? 999))
}

export async function saveCollectionItem(collection: string, id: string | null, input: unknown) {
  await requireAdmin()
  const data = validatePayload(collection, input)
  const itemId = id ?? randomUUID()
  await db.insert(siteContent).values({ id: itemId, collection, data }).onConflictDoUpdate({
    target: [siteContent.collection, siteContent.id],
    set: { data, updatedAt: new Date() },
  })
  revalidatePath("/")
  return { ...data, id: itemId }
}

export async function deleteCollectionItem(collection: string, id: string) {
  await requireAdmin()
  configForCollection(collection)
  if (!id || id.length > 128) throw new Error("Invalid ID")
  await db.delete(siteContent).where(and(eq(siteContent.collection, collection), eq(siteContent.id, id)))
  revalidatePath("/")
}

export async function getAdminSettings(): Promise<SiteSettings> {
  await requireAdmin()
  const [row] = await db.select({ data: siteSettings.data }).from(siteSettings).where(eq(siteSettings.id, "general")).limit(1)
  const stored = row?.data as Partial<SiteSettings> | undefined
  return {
    ...defaultSettings,
    ...stored,
    translations: {
      ...defaultSettings.translations,
      ...stored?.translations,
      en: { ...defaultSettings.translations?.en, ...stored?.translations?.en },
    },
  } as SiteSettings
}

export async function saveAdminSettings(input: unknown) {
  await requireAdmin()
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid settings")
  const source = input as Record<string, unknown>
  const data: Record<string, unknown> = {}

  for (const key of Object.keys(defaultSettings).filter((item) => item !== "translations")) {
    const value = source[key]
    if (key === "values") {
      if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) throw new Error("Invalid values")
      data[key] = value.map((item) => item.trim()).filter(Boolean).slice(0, 100)
    } else if (key === "stats") {
      if (!Array.isArray(value) || value.some((item) => !item || typeof item !== "object" || typeof item.value !== "string" || typeof item.label !== "string")) {
        throw new Error("Invalid stats")
      }
      data[key] = value.slice(0, 50)
    } else {
      if (typeof value !== "string" || value.length > 10000) throw new Error(`Invalid ${key}`)
      data[key] = value.trim()
    }
  }

  const translationsSource = source.translations
  if (!translationsSource || typeof translationsSource !== "object" || Array.isArray(translationsSource)) throw new Error("Invalid translations")
  const englishSource = (translationsSource as Record<string, unknown>).en
  if (!englishSource || typeof englishSource !== "object" || Array.isArray(englishSource)) throw new Error("Invalid English translations")
  const english: Record<string, unknown> = {}
  for (const key of SETTINGS_TRANSLATABLE_FIELDS) {
    const value = (englishSource as Record<string, unknown>)[key]
    if (key === "values") {
      if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.length > 10000)) throw new Error("Invalid English values")
      english[key] = value.map((item: string) => item.trim()).filter(Boolean).slice(0, 100)
    } else if (key === "stats") {
      if (!Array.isArray(value) || value.some((item) => !item || typeof item !== "object" || typeof item.value !== "string" || typeof item.label !== "string")) throw new Error("Invalid English stats")
      english[key] = value.slice(0, 50)
    } else {
      if (typeof value !== "string" || value.length > 10000) throw new Error(`Invalid English ${key}`)
      english[key] = value.trim()
    }
  }
  data.translations = { en: english }

  await db.insert(siteSettings).values({ id: "general", data }).onConflictDoUpdate({
    target: siteSettings.id,
    set: { data, updatedAt: new Date() },
  })
  revalidatePath("/")
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  await requireAdmin()
  const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt))
  return messages.map((message) => ({
    ...message,
    timestamp: message.createdAt.getTime(),
  }))
}

export async function markContactMessageRead(id: string) {
  await requireAdmin()
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error("Invalid ID")
  await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id))
}

export async function deleteContactMessage(id: string) {
  await requireAdmin()
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error("Invalid ID")
  await db.delete(contactMessages).where(eq(contactMessages.id, id))
}
