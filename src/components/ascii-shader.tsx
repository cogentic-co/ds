"use client"

import { useEffect, useRef } from "react"

import { cn } from "../lib/utils"

const CHARS = " .:-=+*#%@"
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768
const CELL = IS_MOBILE ? 20 : 14
const FONT_SIZE = IS_MOBILE ? 16 : 12

type AsciiShaderProps = React.ComponentProps<"canvas"> & {
  paused?: boolean
}

function isDark() {
  return document.documentElement.classList.contains("dark")
}

function AsciiShader({ paused = false, className, ...props }: AsciiShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const pausedRef = useRef(paused)
  const frameCount = useRef(0)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    let baseOpacity = isDark() ? 0.15 : 0.08
    let fgBase = isDark() ? "255,255,255" : "0,0,0"

    const updateColors = () => {
      baseOpacity = isDark() ? 0.15 : 0.08
      fgBase = isDark() ? "255,255,255" : "0,0,0"
    }

    const darkMq = window.matchMedia("(prefers-color-scheme: dark)")
    darkMq.addEventListener("change", updateColors)
    const mutObs = new MutationObserver(updateColors)
    mutObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const startTime = performance.now()
    let cols = 0
    let rows = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.scale(dpr, dpr)
      cols = Math.ceil(canvas.clientWidth / CELL)
      rows = Math.ceil(canvas.clientHeight / CELL)
    }

    resize()
    window.addEventListener("resize", resize)

    const render = (now: number) => {
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      frameCount.current++
      if (frameCount.current % 3 !== 0) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, w, h)
      ctx.font = `${FONT_SIZE}px var(--font-mono), monospace`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const t = ((now - startTime) / 1000) * 0.8
      const t3 = t / 3
      const aspect = w / h

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const u = (col / cols) * aspect * 4 + t3 * 0.2
          const v = (row / rows) * 4 + t3 * 0.15

          const k = Math.cos(v * 1.3 + Math.sin(t3 * 0.8 + u * 0.7)) * 2
          const w2 = Math.sin(u * 1.1 + Math.cos(t3 * 0.6 - v * 0.9)) * 2
          const d = Math.sqrt(u * u + v * v) * 0.3
          const field = Math.cos(d + k) * Math.sin(d + w2) * Math.cos(k * w2 * 0.3 + t3)

          const val = field * 0.5 + 0.5
          const charIdx = Math.floor(val * (CHARS.length - 1))
          const char = CHARS[Math.min(charIdx, CHARS.length - 1)]

          if (char !== " ") {
            const opacity = baseOpacity * (0.3 + 0.7 * (charIdx / (CHARS.length - 1)))
            ctx.fillStyle = `rgba(${fgBase},${opacity})`
            const x = col * CELL + CELL / 2
            const y = row * CELL + CELL / 2
            ctx.fillText(char, x, y)
          }
        }
      }

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      darkMq.removeEventListener("change", updateColors)
      mutObs.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      data-slot="ascii-shader"
      className={cn("absolute inset-0 h-full w-full", className)}
      {...props}
    />
  )
}

export { AsciiShader }
export type { AsciiShaderProps }
