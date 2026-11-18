export type Stat = { value: string; label: string }

export type SiteSettings = {
  index_hero_title: string
  hero_subtitle: string
  hero_cta: string
  about_title: string
  about_paragraph: string
  history_p1: string
  history_p2: string
  history_p3: string
  mission: string
  vision: string
  values: string[]
  stats: Stat[]
  email: string
  contact_phone: string
  contact_phone_bie: string
  whatsapp_link: string
  address_luanda: string
  address_bie: string
  hours_week: string
  hours_saturday: string
  hours_urgent: string
  linkedin: string
  instagram: string
  facebook: string
  youtube: string
  tiktok: string
}

export type Area = {
  id: string
  title: string
  intro: string
  services: string[]
  order: number
}

export type TeamCategory = "founders" | "partners" | "advogados" | "estagiarios" | "associates"

export type TeamMember = {
  id: string
  nome: string
  cargo: string
  section: TeamCategory
  especialidades: string[]
  desc: string
  img: string
  order: number
}

export type Article = {
  id: string
  titulo: string
  autor: string
  categoria: string
  resumo: string
  data: string
  pdfUrl: string
  imgUrl: string
  destaque: boolean
  order: number
}

export type Video = { id: string; titulo: string; descricao: string; youtubeUrl: string; order: number }
export type Thought = { id: string; texto: string; autor: string; data: string; order: number }
export type Testimonial = { id: string; texto: string; autor: string; cargo: string; order: number }

export type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  area: string
  subject: string
  message: string
  read: boolean
  timestamp?: number
}

export const TEAM_CATEGORIES: { value: TeamCategory; label: string }[] = [
  { value: "founders", label: "Fundador" },
  { value: "partners", label: "Administrativo" },
  { value: "advogados", label: "Advogados" },
  { value: "estagiarios", label: "Advogados Estagiários" },
  { value: "associates", label: "Assessores Jurídicos" },
]
