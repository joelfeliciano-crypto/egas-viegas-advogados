import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: {
    default: "Egas Viegas | Sociedade de Advogados, RL",
    template: "%s | Egas Viegas Advogados",
  },
  description: "Onde o seu interesse está em primeiro lugar. Escritório de advocacia em Luanda e no Bié, Angola.",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/evlogo1.jfif-dlF5HLMabuT5alyVWTMgjo4AbualZk.jpeg",
    shortcut: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/evlogo1.jfif-dlF5HLMabuT5alyVWTMgjo4AbualZk.jpeg",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/evlogo1.jfif-dlF5HLMabuT5alyVWTMgjo4AbualZk.jpeg",
  },
  verification: { google: "2swuBHVfQ3vxyhw4cJ-ML5NtnyETGKFLP208Zzci-2Y" },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-right" />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
