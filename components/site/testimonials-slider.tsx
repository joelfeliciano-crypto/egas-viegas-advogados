"use client"

import { useEffect, useState } from "react"
import { Quote } from "lucide-react"
import type { Testimonial } from "@/lib/types"
import { cn } from "@/lib/utils"
import { getCopy, type Locale } from "@/lib/i18n"

export function TestimonialsSlider({ items, locale }: { items: Testimonial[]; locale: Locale }) {
  const copy = getCopy(locale)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000)
    return () => clearInterval(id)
  }, [paused, items.length])

  const current = items[index]
  if (!current) return null

  return (
    <div
      className="mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <figure key={current.id} className="animate-in fade-in duration-700" aria-live="polite">
        <Quote className="mx-auto size-8 text-accent" aria-hidden />
        <blockquote className="mt-5 text-pretty font-serif text-2xl leading-relaxed md:text-3xl">{current.texto}</blockquote>
        <figcaption className="mt-6 text-sm">
          <span className="font-semibold">{current.autor}</span>
          {current.cargo && <span className="block text-muted-foreground">{current.cargo}</span>}
        </figcaption>
      </figure>
      {items.length > 1 && (
        <div className="mt-8 flex justify-center gap-2" role="group" aria-label={locale === "en" ? "Choose testimonial" : "Escolher avaliação"}>
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={locale === "en" ? `Testimonial ${i + 1} of ${items.length}` : `Avaliação ${i + 1} de ${items.length}`}
              aria-current={i === index}
              className={cn("h-2 rounded-full transition-all", i === index ? "w-8 bg-gold-ink" : "w-2 bg-border hover:bg-muted-foreground")}
            />
          ))}
        </div>
      )}
    </div>
  )
}
