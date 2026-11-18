import { MessageCircle } from "lucide-react"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { getSettings } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer settings={settings} />
      <a
        href={settings.whatsapp_link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar connosco pelo WhatsApp"
        className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="size-7" />
      </a>
    </>
  )
}
