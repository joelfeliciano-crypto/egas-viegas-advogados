"use client"

import { useEffect, useState } from "react"

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
  const [{ activeIndex, previousIndex }, setSlide] = useState({ activeIndex: 0, previousIndex: 0 })

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSlide(({ activeIndex: currentIndex }) => ({
        previousIndex: currentIndex,
        activeIndex: (currentIndex + 1) % slides.length,
      }))
    }, 4000)
    return () => window.clearInterval(interval)
  }, [])

  const activeSlide = slides[activeIndex]
  const previousSlide = slides[previousIndex]

  return (
    <div className="relative isolate overflow-hidden rounded-xl">
      <img
        src={previousSlide.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 aspect-[4/5] size-full object-cover"
      />
      <img
        key={activeSlide.src}
        src={activeSlide.src}
        alt={locale === "en" ? `Egas Viegas office, photo ${activeIndex + 1} of ${slides.length}` : activeSlide.alt}
        className="about-slideshow-image relative aspect-[4/5] w-full object-cover"
      />
    </div>
  )
}
