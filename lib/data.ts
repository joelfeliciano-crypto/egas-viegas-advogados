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

const byOrder = (a: { order?: number }, b: { order?: number }) => (a.order ?? 999) - (b.order ?? 999)

async function getCollection<T extends { id: string; order?: number }>(
  name: string,
  fallback: Omit<T, "id">[],
): Promise<T[]> {
  const rows = await db.select({ id: siteContent.id, data: siteContent.data }).from(siteContent).where(eq(siteContent.collection, name))
  if (!rows.length) return fallback.map((item, index) => ({ ...item, id: `default-${index}` }) as T).sort(byOrder)
  return rows.map((row) => ({ ...row.data, id: row.id }) as T).sort(byOrder)
}

export async function getSettings(): Promise<SiteSettings> {
  const [row] = await db.select({ data: siteSettings.data }).from(siteSettings).where(eq(siteSettings.id, "general")).limit(1)
  return { ...defaultSettings, ...(row?.data as Partial<SiteSettings> | undefined) }
}

export const getAreas = () => getCollection<Area>("areas", defaultAreas)

const LEGACY_SECTIONS: Record<string, TeamMember["section"]> = {
  fundador: "founders",
  administrativo: "partners",
  assessores: "associates",
}

export async function getTeam(): Promise<TeamMember[]> {
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
  })
}

export async function getArticles(): Promise<Article[]> {
  const rows = await getCollection<Omit<Article, "data"> & { id: string; data: string | number }>("artigos", defaultArticles)
  return rows.map((article) => ({
    ...article,
    data: typeof article.data === "number" ? new Date(article.data).toLocaleDateString("pt-PT") : (article.data ?? ""),
  }))
}

export const getVideos = () => getCollection<Video>("videos", defaultVideos)
export const getThoughts = () => getCollection<Thought>("thoughts", defaultThoughts)
export const getTestimonials = () => getCollection<Testimonial>("testimonials", defaultTestimonials)
