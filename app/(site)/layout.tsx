import { MessageCircle } from "lucide-react"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { getSettings } from "@/lib/data"
import { getCopy } from "@/lib/i18n"
import { getLocale } from "@/lib/locale-server"
import { SITE_URL } from "@/lib/seo"

export const dynamic = "force-dynamic"

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const copy = getCopy(locale)
  const settings = await getSettings(locale)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Egas Viegas Sociedade de Advogados",
    url: SITE_URL,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/evlogo1.jfif-dlF5HLMabuT5alyVWTMgjo4AbualZk.jpeg",
    description:
      locale === "en"
        ? "A law firm serving clients in Luanda and Bié, Angola."
        : "Sociedade de advogados com serviços em Luanda e no Bié, Angola.",
    areaServed: [
      { "@type": "City", name: "Luanda", containedInPlace: { "@type": "Country", name: "Angola" } },
      { "@type": "AdministrativeArea", name: "Bié", containedInPlace: { "@type": "Country", name: "Angola" } },
    ],
    telephone: [settings.contact_phone, settings.contact_phone_bie].filter(Boolean),
    email: settings.email || undefined,
    address: [
      { "@type": "PostalAddress", addressLocality: "Luanda", addressCountry: "AO", streetAddress: settings.address_luanda },
      { "@type": "PostalAddress", addressLocality: "Bié", addressCountry: "AO", streetAddress: settings.address_bie },
    ].filter((address) => address.streetAddress),
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
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
