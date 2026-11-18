import { defaultAreas, defaultArticles, defaultTeam } from "./defaults"
import { TEAM_CATEGORIES } from "./types"

export type FieldType = "text" | "textarea" | "list" | "boolean" | "select" | "number" | "url"

export type Field = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  options?: { value: string; label: string }[]
  hint?: string
}

export type CollectionConfig = {
  name: string
  label: string
  singular: string
  titleField: string
  subtitleField?: string
  imageField?: string
  fields: Field[]
  seed?: Record<string, unknown>[]
}

const orderField: Field = { name: "order", label: "Ordem", type: "number", hint: "Números menores aparecem primeiro." }

export const COLLECTIONS: Record<string, CollectionConfig> = {
  areas: {
    name: "areas",
    label: "Áreas de Actuação",
    singular: "área",
    titleField: "title",
    subtitleField: "intro",
    seed: defaultAreas,
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "intro", label: "Descrição", type: "textarea", required: true },
      { name: "services", label: "Serviços", type: "list", hint: "Um serviço por linha." },
      orderField,
    ],
  },
  team: {
    name: "team",
    label: "Equipa",
    singular: "membro",
    titleField: "nome",
    subtitleField: "cargo",
    imageField: "imgUrl",
    seed: defaultTeam,
    fields: [
      { name: "nome", label: "Nome", type: "text", required: true },
      { name: "cargo", label: "Cargo", type: "text", required: true },
      { name: "categoria", label: "Categoria", type: "select", required: true, options: TEAM_CATEGORIES },
      { name: "imgUrl", label: "URL da fotografia", type: "url" },
      { name: "especialidades", label: "Especialidades", type: "list", hint: "Uma por linha." },
      { name: "desc", label: "Biografia", type: "textarea" },
      orderField,
    ],
  },
  articles: {
    name: "articles",
    label: "Artigos",
    singular: "artigo",
    titleField: "titulo",
    subtitleField: "autor",
    imageField: "imgUrl",
    seed: defaultArticles,
    fields: [
      { name: "titulo", label: "Título", type: "text", required: true },
      { name: "autor", label: "Autor", type: "text", required: true },
      { name: "categoria", label: "Categoria", type: "text" },
      { name: "data", label: "Data", type: "text", hint: "Ex.: 03 Jan 2025" },
      { name: "resumo", label: "Resumo", type: "textarea" },
      { name: "pdfUrl", label: "Link do PDF / artigo completo", type: "url" },
      { name: "imgUrl", label: "URL da imagem de capa", type: "url" },
      { name: "destaque", label: "Artigo em destaque", type: "boolean" },
      orderField,
    ],
  },
  videos: {
    name: "videos",
    label: "Vídeos",
    singular: "vídeo",
    titleField: "titulo",
    subtitleField: "youtubeUrl",
    fields: [
      { name: "titulo", label: "Título", type: "text", required: true },
      { name: "youtubeUrl", label: "Link do YouTube", type: "url", required: true },
      { name: "descricao", label: "Descrição", type: "textarea" },
      orderField,
    ],
  },
  thoughts: {
    name: "thoughts",
    label: "Pensamentos",
    singular: "pensamento",
    titleField: "texto",
    subtitleField: "autor",
    fields: [
      { name: "texto", label: "Pensamento", type: "textarea", required: true },
      { name: "autor", label: "Autor", type: "text", required: true },
      { name: "data", label: "Data", type: "text" },
      orderField,
    ],
  },
  testimonials: {
    name: "testimonials",
    label: "Avaliações",
    singular: "avaliação",
    titleField: "autor",
    subtitleField: "texto",
    fields: [
      { name: "autor", label: "Nome do cliente", type: "text", required: true },
      { name: "cargo", label: "Cargo / Empresa", type: "text" },
      { name: "texto", label: "Testemunho", type: "textarea", required: true },
      orderField,
    ],
  },
}
