export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        {eyebrow && <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</p>}
        <h1 className="max-w-3xl text-balance font-serif text-4xl font-semibold md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-pretty text-lg text-primary-foreground/70">{subtitle}</p>}
      </div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-gold-ink">{eyebrow}</p>}
      <h2 className="text-balance font-serif text-3xl font-semibold md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-pretty text-muted-foreground">{subtitle}</p>}
    </div>
  )
}

export function Avatar({ name, src, className = "" }: { name: string; src?: string; className?: string }) {
  const initials = String(name ?? "")
    .replace(/^(Dr|Dra)\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
  if (src) {
    return <img src={src || "/placeholder.svg"} alt={name} className={`object-cover ${className}`} crossOrigin="anonymous" />
  }
  return (
    <div className={`flex items-center justify-center bg-primary font-serif text-3xl text-accent ${className}`} aria-hidden>
      {initials}
    </div>
  )
}
