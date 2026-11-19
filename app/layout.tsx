import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Toaster } from "sonner"
import { getLocale } from "@/lib/locale-server"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const english = locale === "en"
  const logo = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/evlogo1.jfif-dlF5HLMabuT5alyVWTMgjo4AbualZk.jpeg"
  const baseUrl = "https://egas-viegas-advogados.vercel.app"
  return {
    title: {
      default: english ? "Egas Viegas | Law Firm, RL" : "Egas Viegas | Sociedade de Advogados, RL",
      template: english ? "%s | Egas Viegas" : "%s | Egas Viegas Advogados",
    },
    description: english
      ? "Your interests come first. A law firm serving clients in Luanda and Bié, Angola."
      : "Onde o seu interesse está em primeiro lugar. Escritório de advocacia em Luanda e no Bié, Angola.",
    keywords: english
      ? "law firm Angola, legal services, corporate law, attorney, Luanda, Bié"
      : "escritório de advocacia Angola, serviços jurídicos, direito corporativo, advogado, Luanda, Bié",
    icons: { icon: logo, shortcut: logo, apple: logo },
    verification: { google: "2swuBHVfQ3vxyhw4cJ-ML5NtnyETGKFLP208Zzci-2Y" },
    generator: "v0.app",
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "website",
      locale: english ? "en_US" : "pt_PT",
      url: baseUrl,
      title: english ? "Egas Viegas - Law Firm in Angola" : "Egas Viegas - Escritório de Advocacia em Angola",
      description: english
        ? "Your interests come first. A law firm serving clients in Luanda and Bié, Angola."
        : "Onde o seu interesse está em primeiro lugar. Escritório de advocacia em Luanda e no Bié, Angola.",
      siteName: "Egas Viegas",
      images: [
        {
          url: logo,
          width: 1200,
          height: 630,
          alt: "Egas Viegas Law Firm",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: english ? "Egas Viegas - Law Firm, RL" : "Egas Viegas - Sociedade de Advogados, RL",
      description: english
        ? "Your interests come first. A law firm serving clients in Luanda and Bié, Angola."
        : "Onde o seu interesse está em primeiro lugar. Escritório de advocacia em Luanda e no Bié, Angola.",
      images: [logo],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        "en-US": `${baseUrl}?lang=en`,
        "pt-PT": `${baseUrl}?lang=pt`,
      },
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()
  return (
    <html lang={locale === "en" ? "en" : "pt"} className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-right" />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
