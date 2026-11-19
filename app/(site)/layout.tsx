import { MessageCircle } from "lucide-react"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { getSettings } from "@/lib/data"
import { getCopy } from "@/lib/i18n"
import { getLocale } from "@/lib/locale-server"

export const dynamic = "force-dynamic"

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const copy = getCopy(locale)
  const settings = await getSettings(locale)
  return (
    <>
      <Navbar locale={locale} />
      <main>{children}</main>
      <Footer settings={settings} locale={locale} />
      <a
        href={settings.whatsapp_link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.whatsapp}
        className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="size-7" />
      </a>
    </>
  )
}
