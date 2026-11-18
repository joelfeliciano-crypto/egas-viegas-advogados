import type { Area, Article, SiteSettings, TeamMember, Testimonial, Thought, Video } from "./types"

export const defaultSettings: SiteSettings = {
  hero_title: "Advocacia de Excelência",
  hero_subtitle: "Onde o seu interesse está em primeiro lugar.",
  hero_cta: "Agende uma Consulta",
  about_title: "Sobre o Escritório",
  about_intro: "Excelência jurídica com tradição e inovação desde 2020",
  history_p1:
    "A Firma atende nas mais diversas áreas do Direito, tendo como foco principal a busca por uma relação saudável com os consulentes, baseada sempre na confiança e transparência. Fundado em Julho de 2020, o escritório é constituído por vários quadros com preparo bastante para responder às necessidades nas distintas áreas do Direito.",
  history_p2:
    "A Firma prima pela prospecção e capacitação de jovens talentos, criando um ambiente laboral favorável para o crescimento pessoal e profissional. Outrossim, buscamos uma relação desburocratizada com os consulentes e parceiros.",
  history_p3:
    "Presença activa e actualizada no Instagram, Facebook e no LinkedIn. Com a chegada da nossa firma à província do Bié, em Janeiro de 2025, houve um crescimento da nossa equipa administrativa e jurídica.",
  mission:
    "Ser a primeira opção dos consulentes e dos talentos do mercado, bem como representar um diferencial competitivo nos negócios dos consulentes e parceiros.",
  vision:
    "Dar respostas práticas e de alta qualidade aos negócios e outras necessidades de todos aqueles que buscam pelos serviços.",
  values: ["Firma única", "Dinâmica", "Criatividade", "Compromisso com os clientes", "Transparência", "Pluralidade"],
  stats: [
    { value: "5", label: "Anos de Experiência" },
    { value: "200+", label: "Casos Resolvidos" },
    { value: "15", label: "Profissionais Especializados" },
    { value: "98%", label: "Taxa de Sucesso" },
  ],
  email: "evsociedadeadvogados@gmail.com",
  contact_phone: "(+244) 924 245 858",
  contact_phone_bie: "(+244) 975 446 451",
  whatsapp_link: "https://wa.me/244924245858",
  address_luanda: "Luanda, Kilamba, Quarteirão B, Prédio 22, 4º andar, Apartamento 41",
  address_bie: "Kuito, Rua Góis Pinto, Casa S/N",
  hours_week: "Segunda a Sexta: 8h às 20h",
  hours_saturday: "Sábado: 9h às 13h",
  hours_urgent: "Plantão 24h para casos urgentes",
  linkedin: "https://www.linkedin.com/in/egas-viegas-sociedade-de-advogados-rl-662a0920a",
  instagram: "https://www.instagram.com/ev_sociedade_de_advogados",
  facebook: "https://www.facebook.com/EVSOCIEDADEDADVOGADOS",
  youtube: "https://youtube.com/@evsociedadedeadvogadosrl7225",
  tiktok: "https://www.tiktok.com/@ev.sociedade.de.a",
}

type Seed<T> = Omit<T, "id">

export const defaultAreas: Seed<Area>[] = [
  {
    title: "Direito Civil",
    intro: "Consultoria e contencioso em diversas ramificações do Direito Civil, garantindo a protecção dos seus direitos e interesses privados.",
    services: ["Arrendamentos", "Contratos", "Seguros", "Acções de cobranças e execuções", "Contratos de fornecimento, agência, distribuição, franquia e transporte"],
  },
  {
    title: "Direito do Trabalho",
    intro: "Assessoria completa em relações laborais para empresas e trabalhadores, focada na prevenção e resolução de conflitos.",
    services: ["Elaboração e revisão de contratos", "Instrução de processo disciplinar", "Acções laborais", "Estratégias para redução de acções laborais", "Redacção de cartas de oferta de emprego"],
  },
  {
    title: "Direito Penal",
    intro: "Actuação especializada na defesa criminal, oferecendo assessoria completa e patrocínio judicial em todas as fases do processo.",
    services: ["Assessoria em geral", "Patrocínio judicial"],
  },
  {
    title: "Direito Imobiliário",
    intro: "Assessoria completa em transacções e questões imobiliárias, garantindo a segurança dos seus investimentos e propriedades.",
    services: ["Contrato de compra e venda", "Contrato de cedência", "Escritura pública", "Incorporação imobiliária"],
  },
  {
    title: "Direito da Família e Sucessório",
    intro: "Atendimento humanizado e discreto em questões familiares e sucessórias, buscando sempre a melhor resolução para a sua situação.",
    services: ["Divórcio (mútuo acordo e litigioso)", "Regulação do exercício do poder paternal", "União de facto", "Partilha de bens", "Inventário"],
  },
  {
    title: "Direito do Autor e Propriedade Intelectual",
    intro: "Defesa e registo de criações e invenções, protegendo os seus direitos em Angola e internacionalmente.",
    services: ["Direito artístico", "Desenhos industriais", "Registo de marcas, patentes e invenções", "Direitos de personalidade"],
  },
  {
    title: "Direito Empresarial",
    intro: "Assessoria para empresas de todos os portes, desde a constituição até à recuperação, garantindo segurança jurídica nas suas operações.",
    services: ["Constituição e alteração de sociedade", "Acções de recuperação de empresa", "Acordos de investimento", "Acordos de accionistas", "Contratos de compra e venda"],
  },
  {
    title: "Direito do Desporto",
    intro: "Especialização em questões legais desportivas, desde a constituição de entidades até ao patrocínio judicial de atletas e clubes.",
    services: ["Elaboração de estatutos e regulamentos", "Organização de processo eleitoral desportivo", "Constituição de clubes e sociedades desportivas", "Representação de atletas e treinadores"],
  },
  {
    title: "Direito Mineiro",
    intro: "Assessoria legal em todos os aspectos do sector mineiro, desde licenças e contratos até à constituição de cooperativas.",
    services: ["Solicitação de licença", "Estruturação de garantias", "Representação em procedimentos administrativos", "Contratos de venda de minério", "Constituição de cooperativas de mineração"],
  },
  {
    title: "Direito Notarial",
    intro: "Suporte em serviços notariais e registais, facilitando processos de partilha, requerimentos e obtenção de certidões.",
    services: ["Solicitação de certidão", "Entrega e levantamento de documentos", "Partilha extrajudicial", "Requerimentos em geral"],
  },
].map((a, i) => ({ ...a, order: i + 1 }))

const assessorDesc =
  "Proporciona suporte técnico e estratégico aos advogados, elabora pareceres, analisa contratos e faz acompanhamento de processos, auxiliando na tomada de decisões de natureza jurídica."

export const defaultTeam: Seed<TeamMember>[] = [
  {
    nome: "Dr. Egas Piedade Viegas",
    cargo: "CEO, Advogado e Escritor",
    categoria: "fundador",
    especialidades: ["Direito Empresarial", "Direito Mineiro", "Direito Penal", "Direito do Desporto"],
    desc: "Fundador do escritório em 2020, o Dr. Egas Viegas é advogado especializado em Direito Desportivo, autor de 7 livros e CEO da Egas Viegas - Sociedade de Advogados. Com uma trajectória marcada pela dedicação, liderança e visão estratégica, alia o rigor jurídico à inovação na gestão. Idiomas: Português (nativo), Inglês (fluente).",
    imgUrl: "",
  },
  {
    nome: "Admira Herodina Miséria Sayoano",
    cargo: "Secretária Executiva – Bié",
    categoria: "administrativo",
    especialidades: ["Gestão de agendas", "Organização de reuniões", "Comunicação", "Elaboração de documentos", "Gestão de viagens"],
    desc: "Responsável por organizar a agenda da direcção e dos advogados, coordenar a logística de reuniões, servir de ponto de contacto entre departamentos, elaborar relatórios e documentos administrativos e manter a confidencialidade das informações sensíveis.",
    imgUrl: "",
  },
  {
    nome: "Samuel Sachimbili",
    cargo: "Assistente Administrativo – Bié",
    categoria: "administrativo",
    especialidades: ["Gestão de arquivos", "Suporte administrativo", "Relações públicas", "Auxiliar jurídico"],
    desc: "Organização e arquivamento de processos, suporte interno para a execução das tarefas da firma, apoio à comunicação externa e suporte administrativo à área jurídica.",
    imgUrl: "",
  },
  {
    nome: "Silvestre Tomás",
    cargo: "Assistente Administrativo – Luanda",
    categoria: "administrativo",
    especialidades: ["Gestão de arquivos", "Suporte administrativo", "Relações públicas", "Auxiliar jurídico"],
    desc: "Proporciona suporte às actividades administrativas, apoia a área logística e garante agilidade, organização e eficiência administrativa dos processos internos.",
    imgUrl: "",
  },
  {
    nome: "Célcia Muleleno",
    cargo: "Advogada",
    categoria: "advogados",
    especialidades: ["Direito Mineiro", "Direito Laboral", "Direito Empresarial", "Direito de Família", "Direito Penal"],
    desc: "Cédula Profissional n.º 2180. Consultora jurídica na empresa Códice Lda desde 2019. Prestou serviços como advogada no escritório Mendes da Silva & Advogados (2014–2024) e como consultora jurídica na NEXTBSS (2019–2023).",
    imgUrl: "",
  },
  { nome: "Emanuel Fernando Coutinho Receado", cargo: "Assessor Jurídico", categoria: "assessores", especialidades: ["Direito do Desporto", "Direito Penal", "Direito do Autor", "Direito Notarial", "Direito Imobiliário"], desc: assessorDesc, imgUrl: "" },
  { nome: "Alcides Victor Mujindo", cargo: "Assessor Jurídico", categoria: "assessores", especialidades: ["Direito do Autor", "Direito Fiscal", "Direito Empresarial", "Direito do Trabalho", "Direito Notarial"], desc: assessorDesc, imgUrl: "" },
  { nome: "Idelfonso Joaquim Baptista Siessoko", cargo: "Assessor Jurídico", categoria: "assessores", especialidades: ["Direito Civil", "Direito Fiscal", "Direito da Família", "Direito Imobiliário", "Direito Penal"], desc: assessorDesc, imgUrl: "" },
  { nome: "Valentino Essove Naviti Cussecala", cargo: "Assessor Jurídico", categoria: "assessores", especialidades: ["Direito Laboral", "Direito Penal", "Direito da Família", "Direito do Autor", "Direito Imobiliário"], desc: assessorDesc, imgUrl: "" },
  { nome: "Isabel Domingas Seteca Cahungo", cargo: "Assessora Jurídica", categoria: "assessores", especialidades: ["Direito Laboral", "Direito Fiscal", "Direito Empresarial", "Direito Mineiro", "Direito Imobiliário"], desc: assessorDesc, imgUrl: "" },
  { nome: "Edna Severina Chissingui Catota", cargo: "Assessora Jurídica", categoria: "assessores", especialidades: ["Direito Laboral", "Direito da Família", "Direito Empresarial", "Direito Notarial", "Direito Penal"], desc: assessorDesc, imgUrl: "" },
].map((m, i) => ({ ...m, order: i + 1 })) as Seed<TeamMember>[]

export const defaultArticles: Seed<Article>[] = [
  {
    titulo: "Responsabilidade Civil por Erro Médico",
    autor: "Dra. Regina Suraia Cuhuma Vaz Neto",
    categoria: "Direito Civil",
    resumo: "Este instituto é de suprema importância e ganha protecção jurídica no n.º 1 do Art.º 75.º da Constituição da República de Angola, que garante a todos o direito à assistência médica e sanitária.",
    data: "2025",
    pdfUrl: "",
    imgUrl: "",
    destaque: true,
  },
  {
    titulo: "Prestação de Alimentos",
    autor: "Dra. Landercia Nunes",
    categoria: "Direito da Família",
    resumo: "O direito à prestação de alimentos possui raízes profundas, intrínsecas à natureza humana. A sua história jurídica remonta ao Direito Romano.",
    data: "2025",
    pdfUrl: "",
    imgUrl: "",
    destaque: false,
  },
  {
    titulo: "Direito dos Passageiros",
    autor: "Dr. Alcides Victor Mujindo Chissanga",
    categoria: "Direito Civil",
    resumo: "O presente artigo visa analisar com alguma profundidade um direito subjectivo que muito e de muitas maneiras tem sido violado.",
    data: "2025",
    pdfUrl: "",
    imgUrl: "",
    destaque: false,
  },
  {
    titulo: "Roubo de Infância: a Exploração Infantil no Município do Cuito",
    autor: "Dra. Edna Chissingui",
    categoria: "Direito da Família",
    resumo: "O menor é um ser em pleno desenvolvimento físico, emocional, cognitivo e sociocultural, de forma que a necessidade de trabalhar não deve prejudicar o seu regular crescimento.",
    data: "03 Jan 2025",
    pdfUrl: "",
    imgUrl: "",
    destaque: false,
  },
  {
    titulo: "Violação dos Direitos e Deveres dos Trabalhadores pela Entidade Patronal",
    autor: "Dra. Isabel Domingas Seteca",
    categoria: "Direito do Trabalho",
    resumo: "Uma análise dos direitos e deveres dos trabalhadores e das situações em que são violados pela entidade empregadora.",
    data: "2025",
    pdfUrl: "",
    imgUrl: "",
    destaque: false,
  },
  {
    titulo: "Sinistralidade Rodoviária",
    autor: "Dr. Idelfonso Siessoko",
    categoria: "Direito Penal",
    resumo: "O presente artigo visa retratar vários aspectos do ambiente rodoviário que hodiernamente saltam à vista dos automobilistas, transeuntes e outros agentes.",
    data: "20 Dez 2024",
    pdfUrl: "",
    imgUrl: "",
    destaque: false,
  },
  {
    titulo: "Despedimento sem Justa Causa",
    autor: "Dr. Valentino Essove Naviti Cussecala",
    categoria: "Direito do Trabalho",
    resumo: "Desenvolvimento do tema do despedimento sem justa causa e das vias de impugnação disponíveis ao trabalhador.",
    data: "2025",
    pdfUrl: "",
    imgUrl: "",
    destaque: false,
  },
].map((a, i) => ({ ...a, order: i + 1 }))

export const defaultVideos: Seed<Video>[] = []
export const defaultThoughts: Seed<Thought>[] = []
export const defaultTestimonials: Seed<Testimonial>[] = []
