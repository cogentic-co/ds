"use client"

import { useEffect, useRef } from "react"

import { cn } from "../lib/utils"

// 4×4 Bayer dithering matrix (normalised to 0–1)
const BAYER = [
  0 / 16,
  8 / 16,
  2 / 16,
  10 / 16,
  12 / 16,
  4 / 16,
  14 / 16,
  6 / 16,
  3 / 16,
  11 / 16,
  1 / 16,
  9 / 16,
  15 / 16,
  7 / 16,
  13 / 16,
  5 / 16,
]

const BAYER_SCALE = 4
const DOWNSAMPLE = 4

function parseCssColor(value: string): [number, number, number] | null {
  // Handles "rgb(r, g, b)" and "rgba(r, g, b, a)" returned by getComputedStyle
  const match = value.match(/[\d.]+/g)
  if (match && match.length >= 3) {
    return [
      Math.round(Number(match[0])),
      Math.round(Number(match[1])),
      Math.round(Number(match[2])),
    ]
  }
  return null
}

function resolveColors(): { fg: [number, number, number]; bg: [number, number, number] } {
  // Use a probe element to force the browser to resolve CSS custom properties
  // into computed rgb() values that the canvas pixel renderer can consume.
  const probe = document.createElement("div")
  probe.style.display = "none"
  probe.style.color = "var(--foreground)"
  probe.style.backgroundColor = "var(--background)"
  document.body.appendChild(probe)
  const probeStyle = getComputedStyle(probe)
  const fgRgb = parseCssColor(probeStyle.color)
  const bgRgb = parseCssColor(probeStyle.backgroundColor)
  document.body.removeChild(probe)

  // Fallback values (light mode defaults)
  const fg: [number, number, number] = fgRgb ?? [0xdc, 0xdf, 0xe3]
  const bg: [number, number, number] = bgRgb ?? [0xfa, 0xfa, 0xfa]
  return { fg, bg }
}

interface BgShaderProps {
  className?: string
}

function BgShader({ className }: BgShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(false)
  const frameCount = useRef(0)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const reducedMotion = mq.matches

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let { fg, bg } = resolveColors()

    const updateColors = () => {
      const resolved = resolveColors()
      fg = resolved.fg
      bg = resolved.bg
    }

    const darkMq = window.matchMedia("(prefers-color-scheme: dark)")
    darkMq.addEventListener("change", updateColors)

    const mutObs = new MutationObserver(updateColors)
    mutObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const ioObs = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          rafRef.current = requestAnimationFrame(render)
        }
      },
      { rootMargin: "100px" },
    )
    ioObs.observe(canvas)

    const startTime = performance.now()

    const render = (now: number) => {
      if (!visibleRef.current || reducedMotion) return

      frameCount.current++
      if (frameCount.current % 2 !== 0) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const cw = Math.ceil(w / DOWNSAMPLE)
      const ch = Math.ceil(h / DOWNSAMPLE)

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw
        canvas.height = ch
      }

      const imageData = ctx.createImageData(cw, ch)
      const data = imageData.data

      const time = ((now - startTime) / 1000) * 0.5
      const t3 = time / 3
      const aspect = w / h

      for (let py = 0; py < ch; py++) {
        for (let px = 0; px < cw; px++) {
          const u = (px / cw) * aspect * 3.5 + t3 * 0.3
          const v = (py / ch) * 3.5 + t3 * 0.3

          const k = 0.1 + Math.cos(v + Math.sin(0.148 - t3)) + 2.4 * t3
          const w2 = 0.9 + Math.sin(u + Math.cos(0.628 + t3)) - 0.7 * t3
          const d = Math.sqrt(u * u + v * v)
          const s = 7.0 * Math.cos(d + w2) * Math.sin(k + w2)

          const r = 0.5 + 0.5 * Math.cos(s + 0.2)
          const g = 0.5 + 0.5 * Math.cos(s + 0.5)
          const b = 0.5 + 0.5 * Math.cos(s + 0.9)

          const gray = 0.299 * r + 0.587 * g + 0.114 * b

          const ox = px * DOWNSAMPLE
          const oy = py * DOWNSAMPLE
          const bx = Math.floor(ox / BAYER_SCALE) & 3
          const by = Math.floor(oy / BAYER_SCALE) & 3
          const threshold = BAYER[bx + by * 4]

          const idx = (py * cw + px) * 4
          if (gray > threshold) {
            data[idx] = fg[0]
            data[idx + 1] = fg[1]
            data[idx + 2] = fg[2]
          } else {
            data[idx] = bg[0]
            data[idx + 1] = bg[1]
            data[idx + 2] = bg[2]
          }
          data[idx + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
      rafRef.current = requestAnimationFrame(render)
    }

    if (reducedMotion) {
      requestAnimationFrame(() => {
        visibleRef.current = true
        frameCount.current = 1
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        if (w === 0 || h === 0) return
        const cw = Math.ceil(w / DOWNSAMPLE)
        const ch = Math.ceil(h / DOWNSAMPLE)
        canvas.width = cw
        canvas.height = ch
        const imageData = ctx.createImageData(cw, ch)
        const data = imageData.data
        const aspect = w / h
        for (let py = 0; py < ch; py++) {
          for (let px = 0; px < cw; px++) {
            const u = (px / cw) * aspect * 3.5
            const v = (py / ch) * 3.5
            const k = 0.1 + Math.cos(v + Math.sin(0.148))
            const w2 = 0.9 + Math.sin(u + Math.cos(0.628))
            const d = Math.sqrt(u * u + v * v)
            const s = 7.0 * Math.cos(d + w2) * Math.sin(k + w2)
            const gray =
              0.299 * (0.5 + 0.5 * Math.cos(s + 0.2)) +
              0.587 * (0.5 + 0.5 * Math.cos(s + 0.5)) +
              0.114 * (0.5 + 0.5 * Math.cos(s + 0.9))
            const ox = px * DOWNSAMPLE
            const oy = py * DOWNSAMPLE
            const bx = Math.floor(ox / BAYER_SCALE) & 3
            const by = Math.floor(oy / BAYER_SCALE) & 3
            const threshold = BAYER[bx + by * 4]
            const idx = (py * cw + px) * 4
            const c = gray > threshold ? fg : bg
            data[idx] = c[0]
            data[idx + 1] = c[1]
            data[idx + 2] = c[2]
            data[idx + 3] = 255
          }
        }
        ctx.putImageData(imageData, 0, 0)
      })
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      ioObs.disconnect()
      mutObs.disconnect()
      darkMq.removeEventListener("change", updateColors)
    }
  }, [])

  return (
    <section className={cn("absolute inset-0 opacity-50", className)} data-slot="bg-shader">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />
    </section>
  )
}

export { BgShader }
