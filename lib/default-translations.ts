import type { Stat } from "./types"

export const defaultSettingsEnglish: Record<string, unknown> = {
  index_hero_title: "Excellence in Legal Services",
  hero_subtitle: "Your interests come first.",
  hero_cta: "Schedule a Consultation",
  about_title: "About the Firm",
  about_paragraph: "Legal excellence, built on tradition and innovation since 2020",
  history_p1: "The Firm provides services across a wide range of legal fields, with a primary focus on building healthy relationships with clients based on trust and transparency. Founded in July 2020, the firm brings together a team equipped to meet the needs of clients across diverse areas of law.",
  history_p2: "The Firm is committed to identifying and developing young talent, creating a supportive workplace for personal and professional growth. We also strive to make our relationships with clients and partners straightforward and efficient.",
  history_p3: "We maintain an active presence on Instagram, Facebook and LinkedIn. With the opening of our office in Bié Province in January 2025, our administrative and legal teams have grown.",
  mission: "To be the first choice for clients and market talent, and to provide a competitive advantage to the businesses of our clients and partners.",
  vision: "To provide practical, high-quality answers to the business and other needs of everyone who seeks our services.",
  values: ["Distinctive", "Dynamic", "Creative", "Client Commitment", "Transparency", "Diversity"],
  stats: [
    { value: "5", label: "Years of Experience" },
    { value: "200+", label: "Cases Resolved" },
    { value: "15", label: "Legal Professionals" },
    { value: "98%", label: "Success Rate" },
  ] satisfies Stat[],
  hours_week: "Monday to Friday: 8:00 a.m. to 8:00 p.m.",
  hours_saturday: "Saturday: 9:00 a.m. to 1:00 p.m.",
  hours_urgent: "24-hour on-call service for urgent matters",
}

export const defaultAreasEnglish: Record<string, unknown>[] = [
  { title: "Civil Law", intro: "Advice and litigation across various areas of civil law, protecting your private rights and interests.", services: ["Leases", "Contracts", "Insurance", "Debt recovery and enforcement proceedings", "Supply, agency, distribution, franchising and transport agreements"] },
  { title: "Employment Law", intro: "Comprehensive advice on employment relationships for businesses and workers, focused on preventing and resolving disputes.", services: ["Drafting and reviewing contracts", "Disciplinary proceedings", "Employment claims", "Strategies to reduce employment disputes", "Drafting job offer letters"] },
  { title: "Criminal Law", intro: "Specialist criminal defence, with comprehensive advice and court representation at every stage of proceedings.", services: ["General legal advice", "Court representation"] },
  { title: "Real Estate Law", intro: "Comprehensive advice on real estate transactions and matters, helping protect your investments and property.", services: ["Sale and purchase agreements", "Property transfer agreements", "Public deeds", "Real estate development"] },
  { title: "Family and Succession Law", intro: "Sensitive and confidential support in family and succession matters, focused on finding the best outcome for your situation.", services: ["Divorce by mutual consent or contested", "Parental responsibility arrangements", "De facto unions", "Property division", "Estate inventories"] },
  { title: "Copyright and Intellectual Property", intro: "Registration and protection of creative works and inventions in Angola and internationally.", services: ["Arts and entertainment law", "Industrial designs", "Trademark, patent and invention registration", "Personality rights"] },
  { title: "Corporate Law", intro: "Business advice from incorporation through restructuring, supporting legal certainty in your operations.", services: ["Company formation and amendments", "Corporate recovery proceedings", "Investment agreements", "Shareholders' agreements", "Sale and purchase agreements"] },
  { title: "Sports Law", intro: "Specialist advice on sports law, from establishing organizations to representing athletes and clubs in court.", services: ["Drafting bylaws and regulations", "Managing sports election proceedings", "Formation of clubs and sports companies", "Representation of athletes and coaches"] },
  { title: "Mining Law", intro: "Legal advice across the mining sector, from licences and contracts to the formation of cooperatives.", services: ["Licence applications", "Structuring security arrangements", "Representation in administrative proceedings", "Mineral sales contracts", "Formation of mining cooperatives"] },
  { title: "Notarial Law", intro: "Support with notarial and registry services, including property division, applications and certificates.", services: ["Certificate applications", "Document filing and collection", "Out-of-court property division", "General applications"] },
]

const legalAssociateBio = "Provides technical and strategic support to attorneys, prepares legal opinions, reviews contracts and monitors proceedings, helping inform legal decisions."

export const defaultTeamEnglish: Record<string, unknown>[] = [
  { cargo: "CEO, Attorney and Author", especialidades: ["Corporate Law", "Mining Law", "Criminal Law", "Sports Law"], desc: "Founder of the firm in 2020, Dr. Egas Viegas is a sports law attorney, author of seven books and CEO of Egas Viegas — Law Firm. His career is marked by dedication, leadership and strategic vision, combining legal rigor with innovation in management. Languages: Portuguese (native), English (fluent)." },
  { cargo: "Executive Secretary — Bié", especialidades: ["Calendar management", "Meeting coordination", "Communications", "Document preparation", "Travel management"], desc: "Manages the directors' and attorneys' schedules, coordinates meeting logistics, serves as a point of contact between departments, prepares reports and administrative documents, and protects the confidentiality of sensitive information." },
  { cargo: "Administrative Assistant — Bié", especialidades: ["Records management", "Administrative support", "Public relations", "Legal support"], desc: "Organizes and files case records, supports the firm's day-to-day operations, assists with external communications and provides administrative support to the legal team." },
  { cargo: "Administrative Assistant — Luanda", especialidades: ["Records management", "Administrative support", "Public relations", "Legal support"], desc: "Supports administrative activities and logistics, helping ensure efficient, well-organized internal processes." },
  { cargo: "Attorney", especialidades: ["Mining Law", "Employment Law", "Corporate Law", "Family Law", "Criminal Law"], desc: "Professional licence no. 2180. Legal adviser at Códice Lda since 2019. Previously practised as an attorney at Mendes da Silva & Advogados (2014–2024) and worked as a legal adviser at NEXTBSS (2019–2023)." },
  { cargo: "Legal Associate", especialidades: ["Sports Law", "Criminal Law", "Copyright", "Notarial Law", "Real Estate Law"], desc: legalAssociateBio },
  { cargo: "Legal Associate", especialidades: ["Copyright", "Tax Law", "Corporate Law", "Employment Law", "Notarial Law"], desc: legalAssociateBio },
  { cargo: "Legal Associate", especialidades: ["Civil Law", "Tax Law", "Family Law", "Real Estate Law", "Criminal Law"], desc: legalAssociateBio },
  { cargo: "Legal Associate", especialidades: ["Employment Law", "Criminal Law", "Family Law", "Copyright", "Real Estate Law"], desc: legalAssociateBio },
  { cargo: "Legal Associate", especialidades: ["Employment Law", "Tax Law", "Corporate Law", "Mining Law", "Real Estate Law"], desc: legalAssociateBio },
  { cargo: "Legal Associate", especialidades: ["Employment Law", "Family Law", "Corporate Law", "Notarial Law", "Criminal Law"], desc: legalAssociateBio },
]

export const defaultArticlesEnglish: Record<string, unknown>[] = [
  { titulo: "Civil Liability for Medical Negligence", categoria: "Civil Law", data: "2025", resumo: "This legal doctrine is of paramount importance and is protected under Article 75(1) of the Constitution of the Republic of Angola, which guarantees everyone the right to medical and healthcare services." },
  { titulo: "Child Maintenance", categoria: "Family Law", data: "2025", resumo: "The right to maintenance has deep roots in human society. Its legal history dates back to Roman law." },
  { titulo: "Passenger Rights", categoria: "Civil Law", data: "2025", resumo: "This article examines in depth a subjective right that has been violated in many ways." },
  { titulo: "Stolen Childhood: Child Exploitation in Cuito Municipality", categoria: "Family Law", data: "03 Jan 2025", resumo: "Children are still developing physically, emotionally, cognitively and socially. The need to work should never hinder their healthy growth." },
  { titulo: "Employer Violations of Workers' Rights and Duties", categoria: "Employment Law", data: "2025", resumo: "An analysis of workers' rights and duties and situations in which employers violate them." },
  { titulo: "Road Traffic Accidents", categoria: "Criminal Law", data: "20 Dec 2024", resumo: "This article examines several aspects of the road environment that motorists, pedestrians and other road users encounter every day." },
  { titulo: "Unfair Dismissal", categoria: "Employment Law", data: "2025", resumo: "An overview of unfair dismissal and the remedies available to workers who wish to challenge it." },
]
