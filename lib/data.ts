import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite"
import { db } from "./firebase"
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

export function serialize(value: unknown): unknown {
  if (value && typeof value === "object") {
    if ("toMillis" in value && typeof (value as { toMillis: unknown }).toMillis === "function") {
      return (value as { toMillis: () => number }).toMillis()
    }
    if (Array.isArray(value)) return value.map(serialize)
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, serialize(v)]))
  }
  return value
}

const byOrder = (a: { order?: number }, b: { order?: number }) => (a.order ?? 999) - (b.order ?? 999)

async function getCollection<T extends { id: string; order?: number }>(
  name: string,
  fallback: Omit<T, "id">[],
): Promise<T[]> {
  const withIds = () => fallback.map((item, i) => ({ ...item, id: `default-${i}` }) as T)
  try {
    const snap = await getDocs(collection(db, name))
    if (snap.empty) return withIds()
    return snap.docs.map((d) => ({ ...(serialize(d.data()) as object), id: d.id }) as T).sort(byOrder)
  } catch (error) {
    console.error(`[firestore] Falha ao ler "${name}":`, error)
    return withIds()
  }
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const snap = await getDoc(doc(db, "website_content", "general"))
    if (!snap.exists()) return defaultSettings
    return { ...defaultSettings, ...(serialize(snap.data()) as Partial<SiteSettings>) }
  } catch (error) {
    console.error("[firestore] Falha ao ler definições:", error)
    return defaultSettings
  }
}

export const getAreas = () => getCollection<Area>("areas", defaultAreas)
export const getTeam = () => getCollection<TeamMember>("team", defaultTeam)
export const getArticles = () => getCollection<Article>("articles", defaultArticles)
export const getVideos = () => getCollection<Video>("videos", defaultVideos)
export const getThoughts = () => getCollection<Thought>("thoughts", defaultThoughts)
export const getTestimonials = () => getCollection<Testimonial>("testimonials", defaultTestimonials)
