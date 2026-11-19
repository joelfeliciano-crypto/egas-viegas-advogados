"use client"

import { useEffect, useState } from "react"
import { Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slide1-zKOrGegHWa1UcxQqSkOLOAzeayepud.jpg",
    alt: "Sala de espera da Egas Viegas, com a representação da Justiça na parede.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12345-k5Wb887g5MlrvBn1p9qBE3Osb3flF2.jpg",
    alt: "Balcão de recepção preto e dourado com a identidade da Egas Viegas.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/123-hBON4aeezqvNVebrPaMJyGNs6flq1x.jpg",
    alt: "Entrada do escritório com uma imagem de Londres na parede.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1234-jzrbNcIh9Btt1u7pLGUxNS0lm1auSX.jpg",
    alt: "Sala de trabalho com secretárias, computadores portáteis e cortinas claras.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slide13.jfif-nPpmhMvbzUPTZH5sByUTq5JY3airl6.jpeg",
    alt: "Corredor interior do escritório da Egas Viegas.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slide10.jfif-ui4QX92bpwzqbXYCqF3cJywmHdM1pN.jpeg",
    alt: "Vista ampla da sala de espera com sofás e decoração institucional.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slide11.jfif-9ilG3o7979iV2zsTbDnwJcy4nzBd8l.jpeg",
    alt: "Balcão de atendimento da recepção do escritório.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slide2-tq1bPECzkTDAWQLGzCYmSNfgsbOJi3.jpg",
    alt: "Sofá da sala de espera sob a representação da Justiça.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slide12.jfif-58fcVB7CfcEf00kcDvntzWcf7Bonpx.jpeg",
    alt: "Estante com livros e documentos jurídicos do escritório.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slide14.jfif-ek1DuHXejokyDnjbxLcCQoLcPWNWnv.jpeg",
    alt: "Armário com livros e arquivos jurídicos da sociedade.",
  },
]

export function AboutSlideshow({ locale }: { locale: "pt" | "en" }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length)
    }, 4000)
    return () => window.clearInterval(interval)
  }, [isPlaying])

  const activeSlide = slides[activeIndex]

  return (
    <div className="relative">
      <img
        key={activeSlide.src}
        src={activeSlide.src}
        alt={locale === "en" ? `Egas Viegas office, photo ${activeIndex + 1} of ${slides.length}` : activeSlide.alt}
        className="aspect-[4/5] w-full rounded-xl object-cover motion-safe:animate-[about-fade-in_500ms_ease-out]"
      />
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 px-4">
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={locale === "en" ? "Choose office photo" : "Escolher fotografia do escritório"}>
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={locale === "en" ? `Show photo ${index + 1}` : `Mostrar fotografia ${index + 1}`}
            aria-pressed={activeIndex === index}
            className={cn(
              "size-2.5 rounded-full border border-white/90 shadow-sm transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
              activeIndex === index ? "scale-125 bg-white" : "bg-black/35 hover:bg-white/80",
            )}
          />
        ))}
        </div>
        <button
          type="button"
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={isPlaying ? (locale === "en" ? "Pause slideshow" : "Pausar apresentação") : (locale === "en" ? "Play slideshow" : "Retomar apresentação")}
          className="absolute right-4 bottom-0 grid size-9 place-items-center rounded-full bg-black/55 text-white shadow-sm backdrop-blur-sm transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {isPlaying ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
        </button>
      </div>
    </div>
  )
}
