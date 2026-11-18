"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

function useInView<T extends Element>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Counter({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/)
  const target = match ? Number(match[2]) : 0
  const { ref, inView } = useInView<HTMLElement>(0.5)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView || !target) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 2000, 1)
      setCurrent(Math.floor(target * progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  return (
    <dd ref={ref as React.Ref<HTMLElement>} className={className}>
      {match ? `${match[1]}${inView ? current : 0}${match[3]}` : value}
    </dd>
  )
}
