import { eq } from "drizzle-orm"
import { db } from "./db"
import { siteContent, siteSettings } from "./db-schema"
import {
  defaultAreas,
  defaultArticles,
  defaultSettings,
  defaultTeam,
  defaultTestimonials,
  defaultThoughts,
  defaultVideos,
} from "./defaults"
import type { Area, Article, SiteSettings, TeamMember, Testimonial, Thought, Video } from "./types"
import { localize, type Locale } from "./i18n"

const byOrder = (a: { order?: number }, b: { order?: number }) => (a.order ?? 999) - (b.order ?? 999)

async function getCollection<T extends { id: string; order?: number; translations?: { en?: Record<string, unknown> } }>(
  name: string,
  fallback: Omit<T, "id">[],
): Promise<T[]> {
  const rows = await db.select({ id: siteContent.id, data: siteContent.data }).from(siteContent).where(eq(siteContent.collection, name))
  if (!rows.length) return fallback.map((item, index) => ({ ...item, id: `default-${index}` }) as T).sort(byOrder)
  return rows.map((row) => {
    const defaultIndex = /^default-(\d+)$/.exec(row.id)?.[1]
    const defaultTranslations = defaultIndex === undefined ? undefined : fallback[Number(defaultIndex)]?.translations
    return { ...row.data, translations: row.data.translations ?? defaultTranslations, id: row.id } as T
  }).sort(byOrder)
}

export async function getSettings(locale: Locale = "pt"): Promise<SiteSettings> {
  const [row] = await db.select({ data: siteSettings.data }).from(siteSettings).where(eq(siteSettings.id, "general")).limit(1)
  const stored = row?.data as Partial<SiteSettings> | undefined
  const settings = {
    ...defaultSettings,
    ...stored,
    translations: {
      ...defaultSettings.translations,
      ...stored?.translations,
      en: { ...defaultSettings.translations?.en, ...stored?.translations?.en },
    },
  } as SiteSettings
  return localize(settings, locale)
}

export const getAreas = async (locale: Locale = "pt") => (await getCollection<Area>("areas", defaultAreas)).map((area) => localize(area, locale))

const LEGACY_SECTIONS: Record<string, TeamMember["section"]> = {
  fundador: "founders",
  administrativo: "partners",
  assessores: "associates",
}

export async function getTeam(locale: Locale = "pt"): Promise<TeamMember[]> {
  const rows = await getCollection<TeamMember & { categoria?: string; imgUrl?: string; descricao?: string }>("membros", defaultTeam)
  return rows.map(({ categoria, imgUrl, descricao, ...member }) => {
    const raw = member.section ?? categoria ?? "advogados"
    return {
      ...member,
      section: LEGACY_SECTIONS[raw] ?? raw,
      img: member.img || imgUrl || "",
      desc: member.desc || descricao || "",
      especialidades: Array.isArray(member.especialidades) ? member.especialidades : [],
    }
  }).map((member) => localize(member, locale))
}

export async function getArticles(locale: Locale = "pt"): Promise<Article[]> {
  const rows = await getCollection<Omit<Article, "data"> & { id: string; data: string | number }>("artigos", defaultArticles)
  return rows.map((article) => localize({
    ...article,
    data: typeof article.data === "number" ? new Date(article.data).toLocaleDateString(locale === "en" ? "en-GB" : "pt-PT") : (article.data ?? ""),
  }, locale))
}

export const getVideos = async (locale: Locale = "pt") => (await getCollection<Video>("videos", defaultVideos)).map((item) => localize(item, locale))
export const getThoughts = async (locale: Locale = "pt") => (await getCollection<Thought>("thoughts", defaultThoughts)).map((item) => localize(item, locale))
export const getTestimonials = async (locale: Locale = "pt") => (await getCollection<Testimonial>("testimonials", defaultTestimonials)).map((item) => localize(item, locale))
