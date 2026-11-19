export type Locale = "pt" | "en"

type Copy = {
  brand: string
  nav: { home: string; about: string; areas: string; team: string; content: string; contact: string; main: string; openMenu: string; closeMenu: string; switchToEnglish: string; switchToPortuguese: string }
  footer: { quickLinks: string; contact: string; rights: string }
  whatsapp: string
  home: {
    areas: string; about: string; ourStory: string; principles: string; principlesTitle: string
    specialties: string; specialtiesSubtitle: string; seeAllAreas: string; content: string
    recentArticles: string; reviews: string; whatClientsSay: string; needAdvice: string
    teamReady: string; contactUs: string; ctaAreas: string
    principleList: { title: string; text: string }[]
  }
  about: {
    eyebrow: string; story: string; founded: string; mission: string; vision: string; values: string
    differentiators: string; whyChoose: string; team: string; technology: string; personal: string
    national: string; international: string; social: string
    descriptions: { team: string; technology: string; personal: string; national: string; international: string; social: string }
  }
  areas: { eyebrow: string; title: string; subtitle: string; services: string; cta: string; contact: string }
  team: { eyebrow: string; title: string; subtitle: string; filter: string; all: string; close: string; specialties: string; categories: Record<string, string> }
  content: {
    eyebrow: string; title: string; subtitle: string; tabLabel: string; articles: string; videos: string
    thoughts: string; all: string; noVideos: string; noThoughts: string; readFull: string
  }
  contact: { eyebrow: string; title: string; subtitle: string; luanda: string; bie: string; email: string; hours: string; whatsapp: string }
  form: {
    fullName: string; email: string; phone: string; company: string; area: string; select: string; other: string
    subject: string; message: string; consent: string; sending: string; send: string; sent: string
    sentDescription: string; sendAnother: string; successToast: string; errorToast: string
  }
  article: { read: string }
}

const messages: Record<Locale, Copy> = {
  pt: {
    brand: "Sociedade de Advogados",
    nav: { home: "Início", about: "Sobre", areas: "Áreas de Actuação", team: "Profissionais", content: "Conteúdos", contact: "Contacto", main: "Principal", openMenu: "Abrir menu", closeMenu: "Fechar menu", switchToEnglish: "Mudar idioma para inglês", switchToPortuguese: "Mudar idioma para português" },
    footer: { quickLinks: "Links Rápidos", contact: "Contacto", rights: "Todos os direitos reservados." },
    whatsapp: "Falar connosco pelo WhatsApp",
    home: {
      areas: "Áreas de Actuação", about: "01 — Quem somos", ourStory: "Conhecer a nossa história", principles: "02 — Princípios",
      principlesTitle: "Os nossos princípios", specialties: "03 — Especialidades", specialtiesSubtitle: "Soluções jurídicas especializadas para cada necessidade.",
      seeAllAreas: "Ver todas as áreas", content: "04 — Conteúdos", recentArticles: "Artigos recentes", reviews: "05 — Avaliações",
      whatClientsSay: "O que dizem os nossos clientes", needAdvice: "Precisa de assessoria jurídica?",
      teamReady: "A nossa equipa está pronta para oferecer a melhor solução para o seu caso.", contactUs: "Entre em Contacto", ctaAreas: "Áreas de Actuação",
      principleList: [
        { title: "Ética", text: "Conduta irrepreensível e transparência em todas as nossas acções, respeitando os mais altos padrões profissionais." },
        { title: "Excelência", text: "Busca constante pela perfeição técnica e actualização contínua para oferecer as melhores soluções jurídicas." },
        { title: "Compromisso", text: "Dedicação integral aos interesses dos nossos clientes, tratando cada caso com a importância que merece." },
        { title: "Inovação", text: "Utilização de tecnologia e métodos modernos para optimizar processos e alcançar resultados superiores." },
      ],
    },
    about: {
      eyebrow: "Sobre", story: "A nossa história", founded: "Fundada em Julho de 2020", mission: "Missão", vision: "Visão", values: "Valores",
      differentiators: "Diferenciais", whyChoose: "Porque escolher a EV", team: "Equipa Multidisciplinar", technology: "Tecnologia Avançada",
      personal: "Atendimento Personalizado", national: "Actuação Nacional", international: "Experiência Internacional", social: "Compromisso Social",
      descriptions: {
        team: "Mais de 10 profissionais especializados em diversas áreas do direito, garantindo atendimento completo e integrado.",
        technology: "Ferramentas modernas de gestão jurídica e análise de dados para soluções mais ágeis e precisas.",
        personal: "Cada cliente recebe atenção individualizada, com estratégias jurídicas adaptadas aos seus objectivos.",
        national: "Presença em Luanda e no Bié, com parcerias estratégicas que garantem suporte jurídico onde estiver.",
        international: "Parcerias com escritórios internacionais para assessoria em operações transnacionais.",
        social: "Consultoria jurídica gratuita para comunidades carentes e apoio a projectos educacionais.",
      },
    },
    areas: { eyebrow: "Especialidades", title: "Áreas de Actuação", subtitle: "Soluções jurídicas especializadas para cada necessidade.", services: "Serviços", cta: "Precisa de assessoria jurídica especializada?", contact: "Entre em Contacto" },
    team: { eyebrow: "Equipa", title: "Os Nossos Profissionais", subtitle: "Uma equipa multidisciplinar dedicada aos interesses dos nossos consulentes.", filter: "Filtrar por categoria", all: "Todos", close: "Fechar", specialties: "Especialidades", categories: { founders: "Fundador", partners: "Administrativo", advogados: "Advogados", estagiarios: "Advogados Estagiários", associates: "Assessores Jurídicos" } },
    content: { eyebrow: "Conteúdos", title: "Artigos, Vídeos e Pensamentos", subtitle: "Partilhamos conhecimento jurídico produzido pela nossa equipa.", tabLabel: "Tipo de conteúdo", articles: "Artigos", videos: "Vídeos", thoughts: "Pensamentos", all: "Todos", noVideos: "Ainda não há vídeos publicados.", noThoughts: "Ainda não há pensamentos publicados.", readFull: "Ler artigo completo" },
    contact: { eyebrow: "Contacto", title: "Fale connosco", subtitle: "Estamos prontos para ouvir e encontrar a melhor solução para o seu caso.", luanda: "Luanda", bie: "Bié", email: "E-mail", hours: "Horário", whatsapp: "Falar pelo WhatsApp" },
    form: { fullName: "Nome completo", email: "E-mail", phone: "Telefone", company: "Empresa", area: "Área de interesse", select: "Seleccione", other: "Outra", subject: "Assunto", message: "Mensagem", consent: "Autorizo o tratamento dos meus dados pessoais para efeitos de resposta a este contacto.", sending: "A enviar...", send: "Enviar Mensagem", sent: "Obrigado pelo seu contacto", sentDescription: "Recebemos a sua mensagem e responderemos o mais rapidamente possível.", sendAnother: "Enviar outra mensagem", successToast: "Mensagem enviada! Entraremos em contacto em breve.", errorToast: "Não foi possível enviar a mensagem. Tente novamente ou contacte-nos por WhatsApp." },
    article: { read: "Ler artigo completo" },
  },
  en: {
    brand: "Law Firm",
    nav: { home: "Home", about: "About", areas: "Practice Areas", team: "Our Team", content: "Insights", contact: "Contact", main: "Main", openMenu: "Open menu", closeMenu: "Close menu", switchToEnglish: "Switch language to English", switchToPortuguese: "Switch language to Portuguese" },
    footer: { quickLinks: "Quick Links", contact: "Contact", rights: "All rights reserved." },
    whatsapp: "Contact us on WhatsApp",
    home: {
      areas: "Practice Areas", about: "01 — Who we are", ourStory: "Discover our story", principles: "02 — Principles",
      principlesTitle: "Our Principles", specialties: "03 — Expertise", specialtiesSubtitle: "Specialized legal solutions for every need.",
      seeAllAreas: "View all practice areas", content: "04 — Insights", recentArticles: "Recent Articles", reviews: "05 — Testimonials",
      whatClientsSay: "What our clients say", needAdvice: "Need legal advice?",
      teamReady: "Our team is ready to find the best solution for your case.", contactUs: "Contact Us", ctaAreas: "Practice Areas",
      principleList: [
        { title: "Integrity", text: "Upholding the highest professional standards through transparency and principled conduct in every matter." },
        { title: "Excellence", text: "Pursuing technical excellence and continuous learning to deliver the best legal solutions." },
        { title: "Commitment", text: "Dedicated to our clients' interests, giving every matter the attention it deserves." },
        { title: "Innovation", text: "Using modern technology and methods to streamline processes and achieve better outcomes." },
      ],
    },
    about: {
      eyebrow: "About Us", story: "Our Story", founded: "Founded in July 2020", mission: "Mission", vision: "Vision", values: "Values",
      differentiators: "What Sets Us Apart", whyChoose: "Why choose EV", team: "Multidisciplinary Team", technology: "Advanced Technology",
      personal: "Personalized Service", national: "National Reach", international: "International Experience", social: "Social Commitment",
      descriptions: {
        team: "More than 10 professionals specialized in diverse areas of law, providing comprehensive and integrated service.",
        technology: "Modern legal management and data analysis tools for faster, more precise solutions.",
        personal: "Every client receives individual attention, with legal strategies tailored to their goals.",
        national: "Offices in Luanda and Bié, with strategic partnerships that provide legal support wherever you are.",
        international: "Partnerships with international law firms for advice on cross-border transactions.",
        social: "Free legal advice for underserved communities and support for educational projects.",
      },
    },
    areas: { eyebrow: "Expertise", title: "Practice Areas", subtitle: "Specialized legal solutions for every need.", services: "Services", cta: "Need specialized legal advice?", contact: "Contact Us" },
    team: { eyebrow: "Our Team", title: "Our Professionals", subtitle: "A multidisciplinary team dedicated to our clients' interests.", filter: "Filter by category", all: "All", close: "Close", specialties: "Areas of expertise", categories: { founders: "Founder", partners: "Administration", advogados: "Attorneys", estagiarios: "Trainee Attorneys", associates: "Legal Associates" } },
    content: { eyebrow: "Insights", title: "Articles, Videos & Insights", subtitle: "Legal knowledge and perspectives from our team.", tabLabel: "Content type", articles: "Articles", videos: "Videos", thoughts: "Perspectives", all: "All", noVideos: "No videos have been published yet.", noThoughts: "No perspectives have been published yet.", readFull: "Read full article" },
    contact: { eyebrow: "Contact", title: "Get in touch", subtitle: "We are ready to listen and find the best solution for your case.", luanda: "Luanda", bie: "Bié", email: "Email", hours: "Office Hours", whatsapp: "Chat on WhatsApp" },
    form: { fullName: "Full name", email: "Email", phone: "Phone", company: "Company", area: "Area of interest", select: "Select an area", other: "Other", subject: "Subject", message: "Message", consent: "I consent to the processing of my personal data for the purpose of responding to this inquiry.", sending: "Sending...", send: "Send Message", sent: "Thank you for contacting us", sentDescription: "We have received your message and will respond as soon as possible.", sendAnother: "Send another message", successToast: "Message sent! We will be in touch soon.", errorToast: "We couldn't send your message. Please try again or contact us on WhatsApp." },
    article: { read: "Read full article" },
  },
}

export function getCopy(locale: Locale): Copy {
  return messages[locale]
}

export function localize<T extends { translations?: { en?: Record<string, unknown> } }>(item: T, locale: Locale): T {
  if (locale !== "en" || !item.translations?.en) return item
  const fields = Object.fromEntries(
    Object.entries(item.translations.en).filter(([, value]) =>
      value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0),
    ),
  )
  return { ...item, ...fields }
}
