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
  return {
    title: {
      default: english ? "Egas Viegas | Law Firm, RL" : "Egas Viegas | Sociedade de Advogados, RL",
      template: english ? "%s | Egas Viegas" : "%s | Egas Viegas Advogados",
    },
    description: english
      ? "Your interests come first. A law firm serving clients in Luanda and Bié, Angola."
      : "Onde o seu interesse está em primeiro lugar. Escritório de advocacia em Luanda e no Bié, Angola.",
    icons: { icon: logo, shortcut: logo, apple: logo },
    verification: { google: "2swuBHVfQ3vxyhw4cJ-ML5NtnyETGKFLP208Zzci-2Y" },
    generator: "v0.app",
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
